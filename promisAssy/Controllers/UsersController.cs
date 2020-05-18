using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.DirectoryServices;
using promisAssy.Models;

namespace promisAssy.Controllers
{
    public class UsersController : BaseController
    {
        public UsersMod userMod = new UsersMod();


        //[HttpGet, OutputCache(NoStore = true, Duration = 1)]

        //public ActionResult Login()
        //{
        //    if (this.IsUserLoggedIn() == true)
        //    {
        //        return RedirectToAction("Index", "Home");
        //    }
        //    else
        //    {
        //        ViewBag.page_id = "login_page";
        //        return View();
        //    }
        //}

        //[HttpGet, OutputCache(NoStore = true, Duration = 1)]

        //public ActionResult Logout()
        //{
        //    Session[this.GV_sessionName_employee_data] = null;

        //    return RedirectToAction("Login", "Users");
        //}


        [HttpPost]
        [ValidateInput(true)]
        public JsonResult Login_employee(string ffID, string password)
        {

            IDictionary<string, string> results = new Dictionary<string, string>();
            IDictionary<string, string> employee_data = new Dictionary<string, string>();

            results["done"] = "FALSE";
            results["msg"] = "<strong class='error'>Can't connect to Active Directory server (LDAP)</strong>";

            try 
            { 
                string ldapAddress = "LDAP://ad.onsemi.com";
                DirectoryEntry directoryEntry = new DirectoryEntry(ldapAddress, ffID, password);

                DirectorySearcher ds = new DirectorySearcher(directoryEntry);

                ds.Filter = "(sAMAccountName=" + ffID + ")";
                ds.SearchScope = SearchScope.Subtree;
                SearchResult rs = ds.FindOne();

                if (rs.GetDirectoryEntry().Properties.Values.Count > 0)
                {
                    string ff_id = rs.GetDirectoryEntry().Properties["sAMAccountName"].Value.ToString();
                    string first_name = rs.GetDirectoryEntry().Properties["givenName"].Value.ToString();
                    string last_name = rs.GetDirectoryEntry().Properties["sn"].Value.ToString();
                    string email = rs.GetDirectoryEntry().Properties["mail"].Value.ToString();

                    IDictionary<string, string> validUser = new Dictionary<string, string>();
                    employee_data.Add(this.GV_session_ff_id, ff_id);
                    employee_data.Add(this.GV_session_first_name, first_name);
                    employee_data.Add(this.GV_session_last_name, last_name);
                    employee_data.Add(this.GV_session_email, email);
                    Session[this.GV_sessionName_employee_data] = employee_data;

                    results["done"] = "TRUE";
                    results["msg"] = "<strong class='error'>Connected to Active Directory server Successfully (LDAP)</strong>";

                }
            }
            catch (Exception ex)
			{
				results["done"] = "FALSE";
				results["msg"] = "<strong class='error'>" + ex.Message + "</strong>";

			}

 

                return Json(results);  
        }

        
    }
}