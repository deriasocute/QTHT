using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using QTHT.Charts;
using QTHT.Models;
using QTHT.Models.Data;
using QTHT.Models.View;
using System.Collections;
using System.Diagnostics;
using System.Globalization;

namespace QTHT.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly QTHTDataContext _context;
        public HomeController(ILogger<HomeController> logger, QTHTDataContext context)
        {
            _logger = logger;
            _context = context;
        }

        public async Task<IActionResult> IndexAsync()
        {
            var dashAdminModel = GetDashAdminModel();
            ViewBag.StationConfigs = await _context.StationConfig.ToListAsync();
            return View(dashAdminModel);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        private DashAdminModel GetDashAdminModel()
        {
            var model = new DashAdminModel();
            var colors = new List<string> { "#a0d468", "#5db2ff", "#e75b8d", "#fb6e52", "#ffce55", "#1eb39d", "#3b7d9d", "#91b8e1", "#e74c3c", "#ffcd02", "#64ddbb", "#1dabb8", "#d8335b", "#e76b6b", "#a58bd5", "#3172d6", "#8f3fb0", "#c33825", "#9f5b44", "#ff6766", "#bf005f", "#0000bf", "#007f3f" };
            var users = _context.User.ToList();
            var stationConfigs = _context.StationConfig.ToList();
            var listStatus = new List<int>();
            foreach(var stationConfig in stationConfigs)
            {
                var isExist = _context.Device.Where(p => p.ID == stationConfig.DeviceID).Any() ? true : false;
                if (isExist)
                {
                    var pumpStatus = _context.Device.Where(p => p.ID == stationConfig.DeviceID).Select(p => p.Status).FirstOrDefault();
                    if (pumpStatus)
                    {
                        listStatus.Add(1);
                    }
                    else
                    {
                        listStatus.Add(0);
                    }
                }
                else
                {
                    listStatus.Add(2);
                }
                
            }
            Dictionary<int, string> listStatusStation = Enums.EnumStatus.GetDescribes<Enums.EnumStatus.StationStatus>();
            model.TotalUser = users.Count;
            model.TotalUserNew = users.Count(t => (DateTime.Now - t.Created).TotalDays <= 7);
            var minDate = users.Min(t => t.Created);
            var maxDate = users.Max(t => t.Created);
            var areaspline = new AreaspLine();
            var plotChartStatus = new PieChart();
            var statusMorris = new List<Morri>();
            int colorStatus = 0;
            foreach (var item in listStatusStation)
            {
                statusMorris.Add(new Morri
                {
                    name = item.Value,
                    y = listStatus.Count(t => t == item.Key),
                    color = colors[colorStatus]
                });
                if (colorStatus == colors.Count() - 1)
                {
                    colorStatus = 0;
                }
                else
                {
                    colorStatus++;
                }
            }
            plotChartStatus.data = statusMorris;
            model.StatusMories = JsonConvert.SerializeObject(plotChartStatus);
            GetUserChart(minDate, maxDate, ref areaspline, users);
            areaspline.title = "THỐNG KÊ NGƯỜI DÙNG";
            areaspline.label = "Người dùng";
            model.UserMories = JsonConvert.SerializeObject(areaspline);

            return model;
        }

        private static void GetUserChart(DateTime minDate, DateTime maxDate, ref AreaspLine areaspChart, List<User> users)
        {
            int OneMon = 30 * 60 * 60 * 24;
            int OneYear = 365 * 60 * 60 * 24;
            var diff = Math.Abs(date2Int(maxDate) - date2Int(minDate));
            var y = (int)Math.Ceiling((decimal)(diff / OneYear));
            var m = (int)Math.Ceiling((decimal)((diff - y * OneYear) / OneMon));

            long from, to;
            string format, step;

            // >1year1mon thi hien thi theo year.
            if (y >= 1 && m > 1)
            {
                step = "year";
                format = "yyyy";
                from = DateTime.ParseExact(minDate.ToString("yyyy"), "yyyy", CultureInfo.InvariantCulture).Ticks;
                to = DateTime.ParseExact(maxDate.ToString("yyyy"), "yyyy", CultureInfo.InvariantCulture).Ticks + OneYear - 1;
            }
            // >1mon1day thi hien thi theo month.
            else if (m >= 1 || y >= 1)
            {
                step = "month";
                format = "MM-yyyy";
                from = DateTime.ParseExact(minDate.ToString("MM-yyyy"), "MM-yyyy", CultureInfo.InvariantCulture).Ticks;
                to = DateTime.ParseExact(maxDate.ToString("MM-yyyy"), "MM-yyyy", CultureInfo.InvariantCulture).Ticks + OneMon - 1;
            }
            // mac dinh hien thi theo day.
            else
            {
                step = "day";
                format = "dd-MM-yyyy";
                from = minDate.Ticks;
                to = maxDate.Ticks;
            }

            var categories = new ArrayList();
            var data = new ArrayList();
            for (var i = from; i <= to; i = incStep(i, step))
            {
                var date = new DateTime(i);
                var st = new DateTime();
                var en = new DateTime();
                if (step.Equals("year"))
                {
                    st = new DateTime(date.Year, 1, 1, 0, 0, 0);
                    en = st.AddYears(1).AddSeconds(-1);
                }
                else if (step.Equals("month"))
                {
                    st = new DateTime(date.Year, date.Month, 1, 0, 0, 0);
                    en = st.AddMonths(1).AddSeconds(-1);
                }
                else
                {
                    st = new DateTime(date.Year, date.Month, date.Day, 0, 0, 0);
                    en = st.AddDays(1).AddSeconds(-1);
                }
                data.Add(users.Count(t => (t.Created >= st && en >= t.Created)));
                categories.Add(date.ToString(format));
            }
            areaspChart.data = data;
            areaspChart.categories = categories;
        }
        public static int date2Int(DateTime d)
        {
            var baseTime = Convert.ToDateTime("1970-1-1 8:00:00");
            var ts = d - baseTime;
            return (int)ts.TotalSeconds;
        }
        public static long incStep(long i, string type)
        {
            switch (type)
            {
                case "year":
                    return (new DateTime(i).AddYears(1)).Ticks;
                case "month":
                    return (new DateTime(i).AddMonths(1)).Ticks;
            }
            return (new DateTime(i).AddDays(1)).Ticks;
        }
    }
}