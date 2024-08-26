using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DocumentFormat.OpenXml.Office2010.Excel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using QTHT.Models;
using QTHT.Models.Data;
using QTHT.Models.View;

namespace QTHT.Controllers
{
    public class SensorController : Controller
    {
        private readonly QTHTDataContext _context;

        public SensorController(QTHTDataContext context)
        {
            _context = context;
        }

        // GET: Sensor
        public async Task<IActionResult> Index(int id, string SearchString)
        {
            if (id == null || _context.Device == null)
            {
                return NotFound();
            }
            var device = await _context.Device.FindAsync(id);
            ViewBag.PumpName = device.Name;
            ViewBag.ESP8266 = device.ESP8266ID;
            TempData["DeviceID"] = id;
            var model = new SensorModel();
            ViewData["CurrentFilter"] = SearchString;
            model.Sensors = await _context.Sensor.Where(u => u.DeviceID == id).ToListAsync();
            if (!string.IsNullOrEmpty(SearchString))
            {
                model.Sensors = model.Sensors.Where(u => u.SensorType.IndexOf(SearchString, StringComparison.OrdinalIgnoreCase) >= 0).ToList();
            }
            model.DeviceID = device.ID;
            model.Sensor = new Sensor();
            if (device == null)
            {
                return NotFound();
            }
            return View(model);
        }

        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Sensor == null)
            {
                return NotFound();
            }

            var sensor = await _context.Sensor
                .FirstOrDefaultAsync(m => m.ID == id);
            if (sensor == null)
            {
                return NotFound();
            }

            return View(sensor);
        }

        public IActionResult Create()
        {
            var sensor = new Sensor();
            sensor.DeviceID = Convert.ToInt32(TempData["DeviceID"]);
            return PartialView("_Update", sensor);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ID,DeviceID,SensorType,Created,Updated")] Sensor sensor)
        {
            if (ModelState.IsValid)
            {
                _context.Add(sensor);
                await _context.SaveChangesAsync();
                return RedirectToAction("Index", "Sensor", new {id = sensor.DeviceID});
            }
            return View(sensor);
        }

        // GET: Sensor/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Sensor == null)
            {
                return NotFound();
            }

            var sensor = await _context.Sensor.FindAsync(id);
            if (sensor == null)
            {
                return NotFound();
            }
            return PartialView("_Update", sensor);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("ID,DeviceID,SensorType,Created,Updated")] Sensor sensor)
        {
            if (id != sensor.ID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(sensor);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!SensorExists(sensor.ID))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction("Index", "Sensor", new { id = sensor.DeviceID });

            }
            return PartialView("_Update", sensor);
        }

        // GET: Sensor/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Sensor == null)
            {
                return NotFound();
            }

            var sensor = await _context.Sensor
                .FirstOrDefaultAsync(m => m.ID == id);
            if (sensor == null)
            {
                return NotFound();
            }

            return PartialView("_Delete", sensor);
        }

        // POST: Sensor/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Sensor == null)
            {
                return Problem("Entity set 'QTHTDataContext.Sensor'  is null.");
            }
            var sensor = await _context.Sensor.FindAsync(id);
            if (sensor != null)
            {
                _context.Sensor.Remove(sensor);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction("Index", "Sensor", new { id = sensor.DeviceID });
        }

        private bool SensorExists(int id)
        {
          return (_context.Sensor?.Any(e => e.ID == id)).GetValueOrDefault();
        }
    }
}
