using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using promisAssy.Models;

namespace promisAssy.Controllers
{
    public class GET_FORM_ID //POST DATA
    {
        public int id { get; set; }

    }

    public class FOL_DATA
    {
        public string machineID { get; set; }
        public string machinePF { get; set; }
        public string stsOwner { get; set; }
        public string stsDes { get; set; }
        public string prodName { get; set; }
        public string lotNo { get; set; }
        public string uph { get; set; }
        public string pkgType { get; set; }
        public string remarks { get; set; }
        public string group { get; set; }
        public string user { get; set; }
        public string userID { get; set; }
        public string material_id { get; set; }
        public string date1 { get; set; }
        public string date2 { get; set; }
        public string date3 { get; set; }
        public string itvdate { get; set; }
        public string process { get; set; }
        public string track_in { get; set; }
        public string track_out { get; set; }
        public string stsDwn { get; set; }
        public string setup_to_qa { get; set; }
        public string qa_to_process { get; set; }
        public string usl_1_impendance { get; set; }
        public string nominal_1_impendance { get; set; }
        public string lsl_1_impendance { get; set; }
        public string usl_2_impendance { get; set; }
        public string nominal_2_impendance { get; set; }
        public string lsl_2_impendance { get; set; }
        public string usl_1_bf_igbt { get; set; }
        public string nominal_1_bf_igbt { get; set; }
        public string lsl_1_bf_igbt{ get; set; }
        public string usl_2_bf_igbt { get; set; }
        public string nominal_2_bf_igbt { get; set; }
        public string lsl_2_bf_igbt { get; set; }
        public string usl_1_bf_mid_stitch { get; set; }
        public string nominal_1_bf_mid_stitch { get; set; }
        public string lsl_1_bf_mid_stitch { get; set; }
        public string usl_2_bf_mid_stitch { get; set; }
        public string nominal_2_bf_mid_stitch { get; set; }
        public string lsl_2_bf_mid_stitch { get; set; }
        public string usl_1_bf_lead { get; set; }
        public string nominal_1_bf_lead { get; set; }
        public string lsl_1_bf_lead { get; set; }
        public string usl_2_bf_lead { get; set; }
        public string nominal_2_bf_lead { get; set; }
        public string lsl_2_bf_lead { get; set; }
        public string ipcc_value { get; set; }
        public string IPCC_reset { get; set; }
        public string track_status { get; set; }
        


    }
    public class promisController : BaseController
    {
        promisAssyMod promisAssyObject = new promisAssyMod();
        //
        // GET: /promis/

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult folStatus()
        {
            return View();
        }

        public ActionResult eolStatus()
        {
            return View();
        }
        //FOL

        public ActionResult al_bondStatus()
        {
            return View();
        }

        public ActionResult wirebondStatus()
        {
            return View();
        }

        public ActionResult bubbleStatus()
        {
            return View();
        }

        public ActionResult c_mountStatus()
        {
            return View();
        }

        public ActionResult diebondStatus()
        {
            return View();
        }

        public ActionResult curingDBStatus()
        {
            return View();
        }

        public ActionResult dicingSawStatus()
        {
            return View();
        }

       
        public ActionResult p_coatingStatus()
        {
            return View();
        }

        public ActionResult pre_sealStatus()
        {
            return View();
        }

        public ActionResult p_washingStatus()
        {
            return View();
        }

        public ActionResult uv_iiradStatus()
        {
            return View();
        }

        public ActionResult mefFOLStatus()
        {
            return View();
        }

        public ActionResult wafermountStatus()
        {
            return View();
        }
        //EOL

        public ActionResult ddMachineStatus()
        {
            return View();
        }

        public ActionResult platingStatus()
        {
            return View();
        }

        public ActionResult moldingStatus()
        {
            return View();
        }

        public ActionResult markingStatus()
        {
            return View();
        }

        public ActionResult curingMDStatus()
        {
            return View();
        }

        public ActionResult TFStatus()
        {
            return View();
        }

        public ActionResult mefEOLStatus()
        {
            return View();
        }

        public ActionResult e_tapingStatus()
        {
            return View();
        }

        public ActionResult modals()
        {
            return View();
        }

        public JsonResult get_fol_data()
        {
            List<IDictionary<string, string>> results = new List<IDictionary<string, string>>();

            results = promisAssyObject.show_fol_machines();

            return Json(results);
        }

        public JsonResult get_eol_data()
        {
            List<IDictionary<string, string>> results = new List<IDictionary<string, string>>();

            results = promisAssyObject.show_eol_machines();

            return Json(results);
        }

        public JsonResult show_filtered_machine_FOL(string process, string statOwner, string machine, string machineID)
        {
            List<IDictionary<string, string>> results = new List<IDictionary<string, string>>();

            results = promisAssyObject.show_filtered_machine_FOL(process, statOwner, machine, machineID);

            return Json(results);
        }

        public JsonResult show_filtered_machine_EOL(string process, string statOwner, string machine, string machineID)
        {
            List<IDictionary<string, string>> results = new List<IDictionary<string, string>>();

            results = promisAssyObject.show_filtered_machine_EOL(process, statOwner, machine, machineID);

            return Json(results);
        }

        public JsonResult show_process(string location)
        {
            List<IDictionary<string, string>> results = new List<IDictionary<string, string>>();

            results = promisAssyObject.show_process(location);

            return Json(results);
        }

        public JsonResult show_statusOwner()
        {
            List<IDictionary<string, string>> results = new List<IDictionary<string, string>>();

            results = promisAssyObject.show_statusowner();

            return Json(results);
        }

        public JsonResult show_testerPF(string location)
        {
            List<IDictionary<string, string>> results = new List<IDictionary<string, string>>();

            results = promisAssyObject.show_testerPF(location);

            return Json(results);
        }

        public JsonResult show_testerID_onload(string location)
        {
            List<IDictionary<string, string>> results = new List<IDictionary<string, string>>();

            results = promisAssyObject.show_testerID_onload(location);

            return Json(results);
        }

        public JsonResult show_testerID(string pfid)
        {
            List<IDictionary<string, string>> results = new List<IDictionary<string, string>>();

            results = promisAssyObject.show_testerID(pfid);

            return Json(results);
        }

        public JsonResult show_testerID_from_process(string process)
        {
            List<IDictionary<string, string>> results = new List<IDictionary<string, string>>();

            results = promisAssyObject.show_testerID_from_process(process);

            return Json(results);
        }

        public JsonResult show_data(GET_FORM_ID data)
        {
            
            IDictionary<string, string> results = new Dictionary<string, string>();
            IDictionary<string, string> has_IDCC = new Dictionary<string, string>();

            results = promisAssyObject.show_Data(data.id);

            return Json(results);

        }

        public JsonResult get_status_owner()
        {
            List<IDictionary<string, string>> results = new List<IDictionary<string, string>>();

            results = promisAssyObject.get_status_owner();

            return Json(results);
        }

        public JsonResult get_status(string stsOwner)
        {
            List<IDictionary<string, string>> results = new List<IDictionary<string, string>>();

            results = promisAssyObject.get_status(stsOwner);

            return Json(results);
        }

        public JsonResult get_device(string stsOwner)
        {
            List<IDictionary<string, string>> results = new List<IDictionary<string, string>>();

            results = promisAssyObject.get_device();

            return Json(results);
        }

        //get_default_uph

        public JsonResult get_default_uph(string family)
        {
            IDictionary<string, string> results = new Dictionary<string, string>();

            results = promisAssyObject.get_default_uph(family);

            return Json(results);
        }


        public JsonResult get_uph(string id, string machinePlatform) 
        {
            IDictionary<string, string> results = new Dictionary<string, string>();

            results = promisAssyObject.get_uph(id, machinePlatform);

            return Json(results);
        }

        public JsonResult get_uph_check(string family, string machineID)
        {
            IDictionary<string, string> results = new Dictionary<string, string>();

            results = promisAssyObject.get_uph_byId(family, machineID);

            return Json(results);
        }

        public JsonResult get_package_data(string id)
        {
            IDictionary<string, string> results = new Dictionary<string, string>();

            results = promisAssyObject.get_package_type(id);

            return Json(results);

        }

        public JsonResult get_id_history(string id)
        {
            List<IDictionary<string, string>> results = new List<IDictionary<string, string>>();

            results = promisAssyObject.get_id_history(id);

            return Json(results);
        }


        //Validation

        public JsonResult get_user()
        {
            List<IDictionary<string, string>> results = new List<IDictionary<string, string>>();

            results = promisAssyObject.get_all_user();

            return Json(results);
        }

        public JsonResult hash_test(string pass)
        {
           
            var results = this.GetHashMD5(pass);
            return Json(results);
        }

        public JsonResult check_user(string user, string pass)
        {
            IDictionary<string, string> results = new Dictionary<string, string>();

            results = promisAssyObject.check_user(user, pass);

            return Json(results);

        }

        public JsonResult get_machine_id()
        {
            List<IDictionary<string, string>> results = new List<IDictionary<string, string>>();

            results = promisAssyObject.get_machine_id();

            return Json(results);

        }

        //Posting

        [HttpPost] //Posting in C#
        [ValidateInput(true)] // Checks if inputs are true
        public JsonResult update_machine(FOL_DATA access)
        {
            IDictionary<string, string> results = new Dictionary<string, string>();

            promisAssyObject.insert_Data(access.machineID, access.machinePF, access.stsOwner, access.stsDes, access.prodName, access.lotNo, access.uph, access.pkgType,
            access.remarks, access.group, access.user, access.material_id, access.date3, access.userID, access.stsDwn, access.setup_to_qa, access.qa_to_process, access.usl_1_impendance,
            access.nominal_1_impendance, access.lsl_1_impendance, access.usl_2_impendance, access.nominal_2_impendance, access.lsl_2_impendance, access.usl_1_bf_igbt,
            access.nominal_1_bf_igbt, access.lsl_1_bf_igbt, access.usl_2_bf_igbt, access.nominal_2_bf_igbt, access.lsl_2_bf_igbt,
            access.usl_1_bf_mid_stitch, access.nominal_1_bf_mid_stitch, access.lsl_1_bf_mid_stitch, access.usl_2_bf_mid_stitch, access.nominal_2_bf_mid_stitch,
            access.lsl_2_bf_mid_stitch, access.usl_1_bf_lead, access.nominal_1_bf_lead, access.lsl_1_bf_lead, access.usl_2_bf_lead, access.nominal_2_bf_lead,
            access.lsl_2_bf_lead, access.track_status, access.ipcc_value, access.IPCC_reset);

            promisAssyObject.insert_Data_History(access.machineID, access.stsDes, access.date1, access.date2, access.user, access.remarks, access.prodName, access.lotNo, access.uph, access.stsOwner, access.group, access.pkgType,
            access.usl_1_impendance, access.nominal_1_impendance, access.lsl_1_impendance, access.usl_2_impendance, access.nominal_2_impendance, access.lsl_2_impendance, access.usl_1_bf_igbt,
            access.nominal_1_bf_igbt, access.lsl_1_bf_igbt, access.usl_2_bf_igbt, access.nominal_2_bf_igbt, access.lsl_2_bf_igbt,
            access.usl_1_bf_mid_stitch, access.nominal_1_bf_mid_stitch, access.lsl_1_bf_mid_stitch, access.usl_2_bf_mid_stitch, access.nominal_2_bf_mid_stitch,
            access.lsl_2_bf_mid_stitch, access.usl_1_bf_lead, access.nominal_1_bf_lead, access.lsl_1_bf_lead, access.usl_2_bf_lead, access.nominal_2_bf_lead,
            access.lsl_2_bf_lead);

            results["done"] = "TRUE";
            results["msg"] = "<strong class='success'>UPDATE SUCCESSFULLY</strong>";
            return Json(results);
            
        }

        [HttpPost] //Posting in C#
        [ValidateInput(true)] // Checks if inputs are true
        public JsonResult update_machine_track(FOL_DATA access)
        {
            IDictionary<string, string> results = new Dictionary<string, string>();

            promisAssyObject.insert_Data(access.machineID, access.machinePF, access.stsOwner, access.stsDes, access.prodName, access.lotNo, access.uph, access.pkgType,
            access.remarks, access.group, access.user, access.material_id, access.date3, access.userID, access.stsDwn, access.setup_to_qa, access.qa_to_process,
            access.usl_1_impendance, access.nominal_1_impendance, access.lsl_1_impendance, access.usl_2_impendance, access.nominal_2_impendance, access.lsl_2_impendance, access.usl_1_bf_igbt,
            access.nominal_1_bf_igbt, access.lsl_1_bf_igbt, access.usl_2_bf_igbt, access.nominal_2_bf_igbt, access.lsl_2_bf_igbt,
            access.usl_1_bf_mid_stitch, access.nominal_1_bf_mid_stitch, access.lsl_1_bf_mid_stitch, access.usl_2_bf_mid_stitch, access.nominal_2_bf_mid_stitch,
            access.lsl_2_bf_mid_stitch, access.usl_1_bf_lead, access.nominal_1_bf_lead, access.lsl_1_bf_lead, access.usl_2_bf_lead, access.nominal_2_bf_lead,
            access.lsl_2_bf_lead, access.track_status, access.ipcc_value, access.IPCC_reset);

            promisAssyObject.insert_Data_History(access.machineID, access.stsDes, access.date1, access.date2, access.user, access.remarks, access.prodName, access.lotNo, access.uph, access.stsOwner, access.group, access.pkgType,
            access.usl_1_impendance, access.nominal_1_impendance, access.lsl_1_impendance, access.usl_2_impendance, access.nominal_2_impendance, access.lsl_2_impendance, access.usl_1_bf_igbt,
            access.nominal_1_bf_igbt, access.lsl_1_bf_igbt, access.usl_2_bf_igbt, access.nominal_2_bf_igbt, access.lsl_2_bf_igbt,
            access.usl_1_bf_mid_stitch, access.nominal_1_bf_mid_stitch, access.lsl_1_bf_mid_stitch, access.usl_2_bf_mid_stitch, access.nominal_2_bf_mid_stitch,
            access.lsl_2_bf_mid_stitch, access.usl_1_bf_lead, access.nominal_1_bf_lead, access.lsl_1_bf_lead, access.usl_2_bf_lead, access.nominal_2_bf_lead,
            access.lsl_2_bf_lead);

            results["done"] = "TRUE";
            results["msg"] = "<strong class='success'>UPDATE SUCCESSFULLY</strong>";
            return Json(results);

        }

        //[HttpPost] //Posting in C#
        //[ValidateInput(true)] // Checks if inputs are true
        //public JsonResult update_machine_history(FOL_DATA access)
        //{
        //    IDictionary<string, string> results = new Dictionary<string, string>();

        //    promisAssyObject.insert_Data_History(access.machineID, access.stsDes, access.date1, access.date2, access.user, access.remarks, access.prodName, access.lotNo, access.uph, access.stsOwner, access.group, access.pkgType,
        //    access.usl_1_impendance, access.nominal_1_impendance, access.lsl_1_impendance, access.usl_2_impendance, access.nominal_2_impendance, access.lsl_2_impendance, access.usl_1_bf_igbt,
        //    access.nominal_1_bf_igbt, access.lsl_1_bf_igbt, access.usl_2_bf_igbt, access.nominal_2_bf_igbt, access.lsl_2_bf_igbt,
        //    access.usl_1_bf_mid_stitch, access.nominal_1_bf_mid_stitch, access.lsl_1_bf_mid_stitch, access.usl_2_bf_mid_stitch, access.nominal_2_bf_mid_stitch,
        //    access.lsl_2_bf_mid_stitch, access.usl_1_bf_lead, access.nominal_1_bf_lead, access.lsl_1_bf_lead, access.usl_2_bf_lead, access.nominal_2_bf_lead,
        //    access.lsl_2_bf_lead);

        //    results["done"] = "TRUE";
        //    results["msg"] = "<strong class='success'>UPDATE HISTORY SUCCESSFULLY</strong>";
        //    return Json(results);

        //}

        //[HttpPost] //Posting in C#
        //[ValidateInput(true)] // Checks if inputs are true
        //public JsonResult update_machine_history_track(FOL_DATA access)
        //{
        //    IDictionary<string, string> results = new Dictionary<string, string>();

        //    promisAssyObject.insert_Data_History(access.machineID, access.stsDes, access.date1, access.date2, access.user, access.remarks, access.prodName, access.lotNo, access.uph, access.stsOwner, access.group, access.pkgType,
        //    access.usl_1_impendance, access.nominal_1_impendance, access.lsl_1_impendance, access.usl_2_impendance, access.nominal_2_impendance, access.lsl_2_impendance, access.usl_1_bf_igbt,
        //    access.nominal_1_bf_igbt, access.lsl_1_bf_igbt, access.usl_2_bf_igbt, access.nominal_2_bf_igbt, access.lsl_2_bf_igbt,
        //    access.usl_1_bf_mid_stitch, access.nominal_1_bf_mid_stitch, access.lsl_1_bf_mid_stitch, access.usl_2_bf_mid_stitch, access.nominal_2_bf_mid_stitch,
        //    access.lsl_2_bf_mid_stitch, access.usl_1_bf_lead, access.nominal_1_bf_lead, access.lsl_1_bf_lead, access.usl_2_bf_lead, access.nominal_2_bf_lead,
        //    access.lsl_2_bf_lead);

        //    results["done"] = "TRUE";
        //    results["msg"] = "<strong class='success'>UPDATE HISTORY SUCCESSFULLY</strong>";
        //    return Json(results);

        //}

        //iTV

        public JsonResult check_existing_equiphistory(FOL_DATA access)
        {
            IDictionary<string, string> results = new Dictionary<string, string>();

            results = promisAssyObject.check_existing_equiphistory(access.machineID, access.stsOwner, access.stsDes);

            return Json(results);

        }

        public JsonResult update_existing_equiphistory(int id)
        {
            IDictionary<string, string> results = new Dictionary<string, string>();

            results = promisAssyObject.update_existing_equiphistory(id);

            return Json(results);

        }

        public JsonResult insert_equiphistory(FOL_DATA access)
        {
            IDictionary<string, string> results = new Dictionary<string, string>();

            results = promisAssyObject.insert_equiphistory(access.machineID, access.stsOwner, access.stsDes, access.remarks, access.itvdate, access.user, access.userID);

            return Json(results);

        }

        /////////////////////////////////////TRACKING////////////////////////////

        [HttpPost] //Posting in C#
        [ValidateInput(true)] // Checks if inputs are true
        public JsonResult track_lot(FOL_DATA access)
        {
            IDictionary<string, string> results = new Dictionary<string, string>();

            promisAssyObject.track_lot(access.machineID, access.track_in, access.track_out, access.lotNo, access.user);

            //if (access.track_out == "1")
            //{
            //    promisObject.pbft_reset(access.machineID);
            //}

            results["done"] = "TRUE";
            results["msg"] = "<strong class='success'>UPDATE TRACK DATA SUCCESSFULLY</strong>";
            return Json(results);

        }

        public JsonResult check_track_by_machine(FOL_DATA access)
        {
            IDictionary<string, string> results = new Dictionary<string, string>();

            results = promisAssyObject.check_track_by_machine(access.machineID);

            return Json(results);

        }

        public JsonResult check_track_by_lot(FOL_DATA access)
        {
            IDictionary<string, string> results = new Dictionary<string, string>();

            results = promisAssyObject.check_track_by_lot(access.lotNo);

            return Json(results);

        }

        ////////////////////////////////////////////////////////////////////////

        //public JsonResult check_existing_equiplistID(FOL_DATA access)
        //{
        //    IDictionary<string, string> results = new Dictionary<string, string>();

        //    results = promisAssyObject.check_user();

        //    return Json(results);

        //}

        //[HttpPost] //Posting in C#
        //[ValidateInput(true)] // Checks if inputs are true
        //public JsonResult insert_equipthistory(FOL_DATA access)
        //{

        //    IDictionary<string, string> results = new Dictionary<string, string>();

        //    promisAssyObject.insert_equipthistory();

        //    results["done"] = "TRUE";
        //    results["msg"] = "<strong class='success'>UPDATE SUCCESSFULLY</strong>";
        //    return Json(results);
        //}
    }
}
