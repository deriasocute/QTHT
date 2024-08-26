using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using QTHT.Models;
using QTHT.Models.Data;
using QTHT.Models.View;
using Microsoft.AspNetCore.Authorization;

namespace QTHT.Controllers
{
    public class UserController : Controller
    {
        private readonly QTHTDataContext _context;

        public UserController(QTHTDataContext context)
        {
            _context = context;
        }
        [Authorize(Roles = "0")]
        public async Task<IActionResult> Index(string SearchString)
        {
            var model = new UserModel();
            ViewData["CurrentFilter"] = SearchString;
            model.Users = await _context.User.ToListAsync();
            if (!string.IsNullOrEmpty(SearchString))
            {
                model.Users = model.Users.Where(u => u.Name.IndexOf(SearchString, StringComparison.OrdinalIgnoreCase) >= 0).ToList();
            }
            ViewBag.StationConfigs = await _context.StationConfig.ToListAsync();
            return _context.User != null ? 
                          View(model) :
                          Problem("Entity set 'QTHTDataContext.User'  is null.");
        }

        [Authorize(Roles = "0")]
        public IActionResult Create()
        {
            var user = new User();
            return PartialView("_Update", user);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "0")]
        public async Task<IActionResult> Create([Bind("ID,Name,Account,Password,Role,Created")] User user)
        {
            if (ModelState.IsValid)
            {
                user.Created = DateTime.Now;
                _context.Add(user);
                await _context.SaveChangesAsync();
                return RedirectToAction("Index", "User");
            }
            return View(user);
        }

        [Authorize(Roles = "0")]
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.User == null)
            {
                return NotFound();
            }

            var user = await _context.User.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return PartialView("_Update", user);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "0")]
        public async Task<IActionResult> Edit(int id, [Bind("ID,Name,Account,Password,Role,Created")] User user)
        {
            if (id != user.ID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(user);
                    //_context.Entry(user).CurrentValues.SetValues(user);
                    //_context.Entry(user).Property(u => u.Created).IsModified = false;
                    await _context.SaveChangesAsync();

                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!UserExists(user.ID))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction("Index", "User");
            }
            return View(user);
        }

        [Authorize(Roles = "0")]
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.User == null)
            {
                return NotFound();
            }

            var user = await _context.User
                .FirstOrDefaultAsync(m => m.ID == id);
            if (user == null)
            {
                return NotFound();
            }

            return PartialView("_Delete", user);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "0")]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.User == null)
            {
                return Problem("Entity set 'QTHTDataContext.User'  is null.");
            }
            var user = await _context.User.FindAsync(id);
            if (user != null)
            {
                _context.User.Remove(user);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction("Index", "User");
        }
        public IActionResult Login()
        {
            return View();
        }
        public async Task<IActionResult> Logout(int id)
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("Login");
        }

        [HttpPost]
        public async Task<IActionResult> Login(string name, string password)
        {
            var user = _context.User.Where(u => u.Account == name && u.Password == password).FirstOrDefault<User>();
            if (user == null || _context.User == null)
            {
                return View();
            }
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Account),
                new Claim(ClaimTypes.Role, Convert.ToString(user.Role)),
            };
            var claimsIdentity = new ClaimsIdentity(
            claims, CookieAuthenticationDefaults.AuthenticationScheme);
            var authProperties = new AuthenticationProperties
            {
                ExpiresUtc = DateTimeOffset.UtcNow.AddMinutes(5),
                IsPersistent = false
            };
            await HttpContext.SignInAsync(
            CookieAuthenticationDefaults.AuthenticationScheme,
            new ClaimsPrincipal(claimsIdentity));
            return RedirectToAction("Index", "Home");
        }
        private bool UserExists(int id)
        {
          return (_context.User?.Any(e => e.ID == id)).GetValueOrDefault();
        }
    }
}
