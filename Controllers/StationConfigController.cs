using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.ConstrainedExecution;
using System.Text;
using System.Threading.Tasks;
using ClosedXML.Excel;
using DocumentFormat.OpenXml.Office2010.Excel;
using DocumentFormat.OpenXml.Spreadsheet;
using HiveMQtt.Client.Options;
using HiveMQtt.Client;
using HiveMQtt.MQTT5.ReasonCodes;
using HiveMQtt.MQTT5.Types;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using QTHT.Models;
using QTHT.Models.Data;
using QTHT.Models.View;
using System.Text.Json;
using Microsoft.AspNetCore.Authorization;

namespace QTHT.Controllers
{
    public class StationConfigController : Controller
    {
        private readonly QTHTDataContext _context;
        private readonly IWebHostEnvironment _hostingEnvironment;
        public StationConfigController(QTHTDataContext context, IWebHostEnvironment hostingEnvironment)
        {
            _context = context;
            _hostingEnvironment = hostingEnvironment;
        }
        public async Task<IActionResult> Index(string SearchString)
        {
            var model = new StationConfigModel();
            ViewData["CurrentFilter"] = SearchString;
            ViewBag.StationConfigs = await _context.StationConfig.ToListAsync();
            model.StationConfigs = await _context.StationConfig.ToListAsync();
            model.Devices = await _context.Device.ToListAsync();
            if (!string.IsNullOrEmpty(SearchString))
            {
                model.StationConfigs = model.StationConfigs.Where(u => u.Name.IndexOf(SearchString, StringComparison.OrdinalIgnoreCase) >= 0 ||
                                                                       u.Address.IndexOf(SearchString, StringComparison.OrdinalIgnoreCase) >= 0
                ).ToList();
            }
            return View(model);
        }

        // GET: StationConfig/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            ViewBag.StationConfigs = await _context.StationConfig.ToListAsync();
            if (id == null || _context.StationConfig == null)
            {
                return NotFound();
            }
            var model = new StationConfigModel();
            model.StationConfig = _context.StationConfig.FirstOrDefault(m => m.ID == id);
            model.StatusHistories = StatusHistory(model.StationConfig.DeviceID);
            ViewBag.ListSensor = _context.Sensor.Where(s => s.DeviceID == model.StationConfig.DeviceID).ToList();
            TempData["idDevice"] = model.StationConfig.DeviceID;
            TempData["idStation"] = id;
            var device = _context.Device.FirstOrDefault(d => d.ID == model.StationConfig.DeviceID);
            ViewBag.DeviceStatus = device.Status;
            if (model.StationConfig == null)
            {
                return NotFound();
            }

            return View(model);
        }

        #region Nhận và gửi dữ liệu
        [HttpPost]
        public async Task<IActionResult> ConnectHive()
        {
            var options = new HiveMQClientOptions
            {
                Host = "16f0e29108ef46b68edc068ba224dfb0.s1.eu.hivemq.cloud",
                Port = 8883,
                UseTLS = true,
                UserName = "pumpserver",
                Password = "123456",
                //ClientMaximumPacketSize = 9223372036854775807, test lại
            };
            var con = new SqlConnection();
            var client = new HiveMQClient(options);
            Console.WriteLine($"Connecting to {options.Host} on port {options.Port} ...");
            HiveMQtt.Client.Results.ConnectResult connectResult;
            try
            {
                connectResult = await client.ConnectAsync().ConfigureAwait(true);
                if (connectResult.ReasonCode == ConnAckReasonCode.Success)
                {
                    Console.WriteLine($"Connect successful: {connectResult}");
                }
                else
                {
                    Console.WriteLine($"Connect failed: {connectResult}");
                    return RedirectToAction("Index", "StationConfig");
                }
            }
            catch (System.Net.Sockets.SocketException e)
            {
                Console.WriteLine($"Error connect MQTT with the following socket error: {e.Message}");
                return RedirectToAction("Index", "StationConfig");
            }
            catch (Exception e)
            {
                Console.WriteLine($"Error connect MQTT with the following socket error: {e.Message}");
                return RedirectToAction("Index", "StationConfig");
            }
            var data = new SensorValue();
            //Message handle
            client.OnMessageReceived += async (sender, args) =>
            {
                //string received_message = args.PublishMessage.PayloadAsString;
                byte[] payloadBytes = args.PublishMessage.Payload;
                string received_message = Encoding.UTF8.GetString(payloadBytes);
                Console.WriteLine($"{received_message}");
                data = JsonSerializer.Deserialize<SensorValue>(received_message);
                data.TimestampMessage = DateTime.Now;
                var insert = await ReceiveMessage(con, data);
                if (insert)
                {
                    Console.WriteLine("Thanh cong");
                }
                else
                {
                    Console.WriteLine("That bai");
                }

            };

            //Subcribe
            await client.SubscribeAsync("esp8266/client").ConfigureAwait(false);

            return RedirectToAction("Index", "StationConfig");

        }
        [Authorize(Roles = "0")]
        public async Task<IActionResult> PublishMessage()
        {
            int id = Convert.ToInt32(TempData["idStation"]);
            var model = _context.StationConfig.FirstOrDefault(m => m.ID == id);
            var device = _context.Device.FirstOrDefault(d => d.ID == model.DeviceID);
            var options = new HiveMQClientOptions
            {
                Host = "16f0e29108ef46b68edc068ba224dfb0.s1.eu.hivemq.cloud",
                Port = 8883,
                UseTLS = true,
                UserName = "pumpserver",
                Password = "123456",
            };

            var client = new HiveMQClient(options);
            Console.WriteLine($"Connecting to {options.Host} on port {options.Port} ...");
            HiveMQtt.Client.Results.ConnectResult connectResult;
            try
            {
                connectResult = await client.ConnectAsync().ConfigureAwait(true);
                if (connectResult.ReasonCode == ConnAckReasonCode.Success)
                {
                    Console.WriteLine($"Connect successful: {connectResult}");
                }
                else
                {
                    Console.WriteLine($"Connect failed: {connectResult}");
                    return RedirectToAction("Details", "StationConfig", new { id });
                }
            }
            catch (System.Net.Sockets.SocketException e)
            {
                Console.WriteLine($"Error connect MQTT with the following socket error: {e.Message}");
                return RedirectToAction("Details", "StationConfig", new { id });
            }
            catch (Exception e)
            {
                Console.WriteLine($"Error connect MQTT with the following socket error: {e.Message}");
                return RedirectToAction("Details", "StationConfig", new { id });
            }

            // Test publish
            bool Status = device.Status;
            var message = Status == true ? "TURN_OFF" : "TURN_ON";
            var result = await client.PublishAsync("esp8266/server", message, QualityOfService.AtLeastOnceDelivery).ConfigureAwait(false);
            if (device.Status)
            {
                device.Status = false;
                _context.Update(device);
                await _context.SaveChangesAsync();
            }
            else
            {
                device.Status = true;
                _context.Update(device);
                await _context.SaveChangesAsync();
            }
            return RedirectToAction("Details", "StationConfig", new { id });
        }

        public async Task<bool> ReceiveMessage(SqlConnection con, SensorValue data)
        {
            con = new SqlConnection(@"Server=LAPTOP-455M7O8Q\SQLEXPRESS;Initial Catalog=QTHTData;Integrated Security=True");
            con.Open();
            Console.WriteLine("Thanh cong");
            try
            {
                string sql = "INSERT INTO SensorValue VALUES (@SensorID, @ESP8266ID, @Value, @TimestampMessage)";
                SqlCommand cmd = new SqlCommand(sql, con);
                cmd.Parameters.AddWithValue("SensorID", data.SensorID);
                cmd.Parameters.AddWithValue("ESP8266ID", data.ESP8266ID);
                cmd.Parameters.AddWithValue("Value", data.Value);
                cmd.Parameters.AddWithValue("TimestampMessage", data.TimestampMessage);
                cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
            return true;
        }

        #endregion
        [Authorize(Roles = "0")]
        // GET: StationConfig/Create
        public IActionResult Create()
        {
            var listCodePump = _context.Device.ToList();
            var selectListCodePump = new List<SelectListItem>
            {
                new SelectListItem { Value = "Không xác định", Text = "Chọn máy bơm" }
            };
            selectListCodePump.AddRange(listCodePump.Select(p => new SelectListItem
            {
                Value = p.ID.ToString(),
                Text = p.Name
            }));
            ViewData["CodePump"] = new SelectList(selectListCodePump, "Value", "Text");
            var stationConfig = new StationConfig();
            return PartialView("_Update", stationConfig);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "0")]
        public async Task<IActionResult> Create([Bind("ID,Address,Name,DeviceID")] StationConfig stationConfig)
        {
            if (ModelState.IsValid)
            {
                _context.Add(stationConfig);
                await _context.SaveChangesAsync();
                return RedirectToAction("Index", "StationConfig");
            }
            return View(stationConfig);
        }
        [Authorize(Roles = "0")]
        public async Task<IActionResult> Edit(int? id)
        {
            var listCodePump = _context.Device.ToList();
            var selectListCodePump = new List<SelectListItem>
            {
                new SelectListItem { Value = "Không xác định", Text = "Chọn máy bơm" }
            };
            selectListCodePump.AddRange(listCodePump.Select(p => new SelectListItem
            {
                Value = p.ID.ToString(),
                Text = p.Name
            }));
            ViewData["CodePump"] = new SelectList(selectListCodePump, "Value", "Text");
            if (id == null || _context.StationConfig == null)
            {
                return NotFound();
            }

            var stationConfig = await _context.StationConfig.FindAsync(id);
            if (stationConfig == null)
            {
                return NotFound();
            }
            return PartialView("_Update", stationConfig);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "0")]
        public async Task<IActionResult> Edit(int id, [Bind("ID,Address,Name,DeviceID")] StationConfig stationConfig)
        {
            if (id != stationConfig.ID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(stationConfig);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!StationConfigExists(stationConfig.ID))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction("Index", "StationConfig");
            }
            return View(stationConfig);
        }

        [Authorize(Roles = "0")]
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.StationConfig == null)
            {
                return NotFound();
            }

            var stationConfig = await _context.StationConfig
                .FirstOrDefaultAsync(m => m.ID == id);
            if (stationConfig == null)
            {
                return NotFound();
            }

            return PartialView("_Delete", stationConfig);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "0")]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.StationConfig == null)
            {
                return Problem("Entity set 'QTHTDataContext.StationConfig'  is null.");
            }
            var stationConfig = await _context.StationConfig.FindAsync(id);
            if (stationConfig != null)
            {
                _context.StationConfig.Remove(stationConfig);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction("Index", "StationConfig");
        }

        private bool StationConfigExists(int id)
        {
            return (_context.StationConfig?.Any(e => e.ID == id)).GetValueOrDefault();
        }

        private List<StatusHistory> StatusHistory(int idDevice)
        {
            var statusHistory = new List<StatusHistory>();
            var device = _context.Device.Find(idDevice);
            List<SensorValue> listValue = _context.SensorValue.Where(u => u.ESP8266ID == device.ESP8266ID).ToList();
            statusHistory = listValue.GroupBy(d => new { d.ESP8266ID, d.TimestampMessage }).Select(g => new StatusHistory
            {
                ESP8266ID = g.Key.ESP8266ID,
                TimestampMessage = g.Key.TimestampMessage,
                SensorValues = (List<SensorValue>)g.Select(d => new SensorValue
                {
                    SensorID = d.SensorID,
                    Value = d.Value,
                }).ToList(),
            }).ToList();
            return statusHistory;

        }
        #region ExportExcel
        public ActionResult ExportExcel(int id)
        {
            ViewBag.ID = id;
            var model = new StationConfigModel();
            model.StationConfig = _context.StationConfig.FirstOrDefault(m => m.ID == id);
            model.StatusHistories = StatusHistory(model.StationConfig.DeviceID);
            return PartialView("Export/ExportIndex", model);
        }

        public ActionResult Export(int id, string FileName)
        {
            try
            {
                var name = FileName;
                var model = new StationConfigModel();
                model.StationConfig = _context.StationConfig.FirstOrDefault(m => m.ID == id);
                model.StatusHistories = StatusHistory(model.StationConfig.DeviceID);
                List<Hashtable> listObjectExcels;
                Dictionary<string, string> headers;
                listObjectExcels = GetData(out headers, model.StatusHistories);

                if (string.IsNullOrEmpty(name))
                {
                    return RedirectToAction("Index", "StationConfig");
                }
                if (listObjectExcels.Count > 0)
                {

                    //return RedirectToAction($"Details/{id}", "StationConfig");
                    return ExportExcelBase(listObjectExcels, headers, "EmptyTemplate.xlsx", 1, 1, string.Format("{0}.xlsx", name), "Lịch sử trạng thái");
                }
                else
                {
                    return RedirectToAction("Index", "StationConfig");
                }
            }
            catch (Exception ex)
            {
                return RedirectToAction("Index", "StationConfig");
            }
        }

        protected ActionResult ExportExcelBase(List<Hashtable> items, Dictionary<string, string> headers, string template, int rowstart, int colstart, string filename, string title = "")
        {
            template = Path.Combine(_hostingEnvironment.WebRootPath, "Templates", template);
            QTHT.Export.ExportExcel.Export(out XLWorkbook MyWorkBook, items, headers, template, rowstart, colstart, title);
            using (var stream = new MemoryStream())
            {
                MyWorkBook.SaveAs(stream);
                stream.Position = 0;
                return File(stream.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", filename);
            }
        }

        protected List<Hashtable> GetData(out Dictionary<string, string> headers, List<StatusHistory> StatusHistories)
        {
            headers = new Dictionary<string, string>
            {
                {"RowNumber", "STT" },
                {"ESP8266ID", "Mã điều khiển"},
                {"Flow", "Lưu lượng"},
                {"Current", "Dòng"},
                {"Status", "Trạng thái máy bơm"},
                {"TimestampMessage", "Thời gian" }

            };
            var datas = new List<Hashtable>();
            int idDevice = Convert.ToInt32(TempData["idDevice"]);
            List<Sensor> listSensor = _context.Sensor.Where(s => s.DeviceID == idDevice).ToList();
            var index = 1;
            foreach (var statusHistory in StatusHistories)
            {
                var sensorFlow = listSensor.Where(n => n.SensorType == "Lưu lượng").FirstOrDefault();
                var valueFlow = statusHistory.SensorValues.Where(n => n.SensorID == sensorFlow.ID).FirstOrDefault();
                var sensorCurrent = listSensor.Where(n => n.SensorType == "Dòng điện").FirstOrDefault();
                var valueCurrent = statusHistory.SensorValues.Where(n => n.SensorID == sensorCurrent.ID).FirstOrDefault();
                var listData = new Hashtable
                {
                    {"RowNumber", index.ToString()},
                    {"ESP8266ID", statusHistory.ESP8266ID},
                    {"Flow", valueFlow.Value},
                    {"Current", valueCurrent.Value},
                    {"Status", (valueFlow.Value < 1 && valueCurrent.Value < 0.03) ? "Không hoạt động" : "Đang hoạt động"},
                    {"TimestampMessage", String.Format("{0:yyyy-MM-dd HH:mm}", statusHistory.TimestampMessage)}
                };
                index++;
                datas.Add(listData);
            }
            return datas;
        }

        #endregion

    }
}
