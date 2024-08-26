using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HiveMQtt.Client.Options;
using HiveMQtt.Client;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
//using MQTTnet;
//using MQTTnet.Client;
//using MQTTnet.Client.Options;
using QTHT.Models;
using QTHT.Models.Data;
using QTHT.Models.View;
using HiveMQtt.MQTT5.ReasonCodes;
using System.Text.Json;
using HiveMQtt.MQTT5.Types;
using DocumentFormat.OpenXml.Drawing.Charts;
using System.Text;
using Microsoft.Data.SqlClient;

namespace QTHT.Controllers
{
    public class DeviceController : Controller
    {
        private readonly QTHTDataContext _context;
        public DeviceController(QTHTDataContext context)
        {
            _context = context;
        }
        
        // GET: Device
        public async Task<IActionResult> Index(string SearchString)
        {
            var model = new DeviceModel();
            ViewData["CurrentFilter"] = SearchString;
            model.Devices = await _context.Device.ToListAsync();
            if (!string.IsNullOrEmpty(SearchString))
            {
                model.Devices = model.Devices.Where(u => u.Name.IndexOf(SearchString, StringComparison.OrdinalIgnoreCase) >= 0).ToList();
            }
            return View(model);
        }

        // GET: Device/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Device == null)
            {
                return NotFound();
            }

            var device = await _context.Device
                .FirstOrDefaultAsync(m => m.ID == id);
            if (device == null)
            {
                return NotFound();
            }

            return View(device);
        }

        #region Thêm
        public IActionResult Create()
        {
            var device = new Device();
            return PartialView("_Update", device);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ID,Name,ESP8266ID,Status,Created,Updated")] Device device)
        {
            if (ModelState.IsValid)
            {
                _context.Add(device);
                await _context.SaveChangesAsync();
                return RedirectToAction("Index", "Device");
            }
            return View(device);
        }
        #endregion

        #region Sửa
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Device == null)
            {
                return NotFound();
            }

            var device = await _context.Device.FindAsync(id);
            if (device == null)
            {
                return NotFound();
            }
            return PartialView("_Update", device);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("ID,Name,ESP8266ID,Status,Created,Updated")] Device device)
        {
            if (id != device.ID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(device);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!DeviceExists(device.ID))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction("Index", "Device");
            }
            return View(device);
        }
        #endregion  

        #region Xoá
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Device == null)
            {
                return NotFound();
            }

            var device = await _context.Device
                .FirstOrDefaultAsync(m => m.ID == id);
            if (device == null)
            {
                return NotFound();
            }

            return PartialView("_Delete", device);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Device == null)
            {
                return Problem("Entity set 'QTHTDataContext.Device'  is null.");
            }
            var device = await _context.Device.FindAsync(id);
            if (device != null)
            {
                _context.Device.Remove(device);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction("Index", "Device");
        }
        #endregion


        private bool DeviceExists(int id)
        {
          return (_context.Device?.Any(e => e.ID == id)).GetValueOrDefault();
        }
    }
}
