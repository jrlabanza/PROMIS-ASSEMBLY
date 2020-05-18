using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;


namespace promisAssy.Models
{
		public class promisAssyMod
		{

            public List<IDictionary<string, string>> show_fol_machines()
            {
                List<IDictionary<string, string>> results = new List<IDictionary<string, string>>();

                string query = "select id,file_datetime,TesterID,TesterPF,Handler_ID,device,pkg_type,Prod_line,Lot_Name,Test_Stage,Temp,Sites,Max_sites,"+
                    "Index_Time,Test_Time,Curr_Status,Status_Owner,Comments,Who,has_IPCC from testers where Location = 'FOL' and TesterPF != '#N/A' order by stsDwn ASC,TIMEDIFF(NOW(),file_datetime) DESC;";

                results = Connection.GetDataAssociateArray(query, "Show FOL machinelist", Connection.promis_connString);

                return results;
            }

            public List<IDictionary<string, string>> show_eol_machines()
            {
                List<IDictionary<string, string>> results = new List<IDictionary<string, string>>();

                string query = "select id,file_datetime,TesterID,TesterPF,Handler_ID,device,pkg_type,Prod_line,Lot_Name,Test_Stage,Temp,Sites,Max_sites,"+
                    "Index_Time,Test_Time,Curr_Status,Status_Owner,Comments,Who from testers where Location = 'EOL' and TesterPF != '#N/A' order by stsDwn ASC,TIMEDIFF(NOW(),file_datetime) DESC;";

                results = Connection.GetDataAssociateArray(query, "Show FOL machinelist", Connection.promis_connString);

                return results;
            }

            public List<IDictionary<string, string>> show_filtered_machine_FOL(string process, string statOwner, string machine, string machineID)
            {
                List<IDictionary<string, string>> results = new List<IDictionary<string, string>>();

                string Getprocess = "";
                string GetstatOwner = "";
                string Getmachine = "";
                string GetmachineID = "";

                if (process != "")
                {
                    Getprocess = "AND process = '" + process + "'";
                }

                if (statOwner != "")
                {
                    GetstatOwner = "AND Status_Owner = '" + statOwner + "'";
                }

                if (machine != "")
                {
                    Getmachine = "AND TesterPF = '" + machine + "'";
                }

                if (machineID != "")
                {
                    GetmachineID = "AND TesterID = '" + machineID + "'";
                }

                string query = "select id,file_datetime,TesterID,TesterPF,Handler_ID,device,pkg_type,Prod_line,Lot_Name,Test_Stage,Temp,Sites,Max_sites,"+
                    "Index_Time,Test_Time,Curr_Status,Status_Owner,Comments,Who from testers where Location = 'FOL' " + Getprocess + "  " + GetstatOwner +
                    " " + Getmachine + "  " + GetmachineID + " order by stsDwn ASC,TIMEDIFF(NOW(),file_datetime) DESC;";

                results = Connection.GetDataAssociateArray(query, "Show FOL machinelist", Connection.promis_connString);

                return results;
            }

            public List<IDictionary<string, string>> show_filtered_machine_EOL(string process, string statOwner, string machine, string machineID)
            {
                List<IDictionary<string, string>> results = new List<IDictionary<string, string>>();

                string Getprocess = "";
                string GetstatOwner = "";
                string Getmachine = "";
                string GetmachineID = "";

                if (process != "")
                {
                    Getprocess = "AND process = '" + process + "'";
                }

                if (statOwner != "")
                {
                    GetstatOwner = "AND Status_Owner = '" + statOwner + "'";
                }

                if (machine != "")
                {
                    Getmachine = "AND TesterPF = '" + machine + "'";
                }

                if (machineID != "")
                {
                    GetmachineID = "AND TesterID = '" + machineID + "'";
                }

                string query = "select id,file_datetime,TesterID,TesterPF,Handler_ID,device,pkg_type,Prod_line,Lot_Name,Test_Stage,Temp,Sites,Max_sites,"+
                    "Index_Time,Test_Time,Curr_Status,Status_Owner,Comments,Who from testers where Location = 'EOL' " + Getprocess + "  " + GetstatOwner +
                    " " + Getmachine + "  " + GetmachineID + " order by stsDwn ASC,TIMEDIFF(NOW(),file_datetime) DESC;";

                results = Connection.GetDataAssociateArray(query, "Show EOL machinelist", Connection.promis_connString);

                return results;
            }

            public List<IDictionary<string, string>> show_process(string location)
            {
                List<IDictionary<string, string>> results = new List<IDictionary<string, string>>();

                string query = "select distinct process from testers WHERE Location ='" + location + "'";

                results = Connection.GetDataAssociateArray(query, "Show FOL machinelist", Connection.promis_connString);

                return results;
            }

            public List<IDictionary<string, string>> get_machine_id()
            {
                List<IDictionary<string, string>> results = new List<IDictionary<string, string>>();

                string query = "select TesterID from testers";

                results = Connection.GetDataAssociateArray(query, "Show FOL machinelist", Connection.promis_connString);

                return results;
            }
            
            public List<IDictionary<string, string>> show_statusowner()
            {
                List<IDictionary<string, string>> results = new List<IDictionary<string, string>>();

                string query = "select distinct owner from promis_code_owner1 order by owner ASC";

                results = Connection.GetDataAssociateArray(query, "Show Status Owner", Connection.promis_connString);

                return results;
            }

            public List<IDictionary<string, string>> show_testerPF(string location)
            {
                List<IDictionary<string, string>> results = new List<IDictionary<string, string>>();

                string query = "select distinct TesterPF from testers WHERE Location ='" + location + "' order by TesterPF ASC";

                results = Connection.GetDataAssociateArray(query, "Show Tester PF", Connection.promis_connString);

                return results;
            }

            public List<IDictionary<string, string>> show_testerID_onload(string location)
            {
                List<IDictionary<string, string>> results = new List<IDictionary<string, string>>();

                string query = "select TesterID FROM testers WHERE Location ='" + location + "'";

                results = Connection.GetDataAssociateArray(query, "Show Tester ID", Connection.promis_connString);

                return results;
            }

            public List<IDictionary<string, string>> show_testerID(string pfid)
            {
                List<IDictionary<string, string>> results = new List<IDictionary<string, string>>();

                string query = "select TesterID FROM testers WHERE TesterPF ='" + pfid + "'";

                results = Connection.GetDataAssociateArray(query, "Show Tester ID", Connection.promis_connString);

                return results;
            }

            public List<IDictionary<string, string>> show_testerID_from_process(string process)
            {
                List<IDictionary<string, string>> results = new List<IDictionary<string, string>>();

                string query = "select TesterID FROM testers WHERE process ='" + process + "'";

                results = Connection.GetDataAssociateArray(query, "Show Tester ID", Connection.promis_connString);

                return results;
            }

            public List<IDictionary<string, string>> get_id_history(string id)
            {
                List<IDictionary<string, string>> results = new List<IDictionary<string, string>>();

                string query = "select * from " + id;

                results = Connection.GetDataAssociateArray(query, "Show FOL machinelist", Connection.promis_connString);

                return results;
            }

            public IDictionary<string, string> show_Data(int id)
            {
                IDictionary<string, string> results = new Dictionary<string, string>();

                string query = "select * FROM testers WHERE id =" + id + "";

                results = Connection.GetDataArray(query, "Show FOL Data", Connection.promis_connString);

                return results;
            }

            //public List<IDictionary<string, string>> get_status_owner()
            //{
            //    List<IDictionary<string, string>> results = new List<IDictionary<string, string>>();

            //    string query = "select distinct owner from promis_code_owner1 order by owner ASC";

            //    results = Connection.GetDataAssociateArray(query, "Get Status Owner", Connection.promis_connString);

            //    return results;
            //}

            //public List<IDictionary<string, string>> get_status(string stsOwner)
            //{
            //    List<IDictionary<string, string>> results = new List<IDictionary<string, string>>();

            //    string query = "select description from promis_code_owner1 where owner ='" + stsOwner + "'order by owner asc";

            //    results = Connection.GetDataAssociateArray(query, "Get Status", Connection.promis_connString);

            //    return results;
            //}

            public List<IDictionary<string, string>> get_status_owner()
            {
                List<IDictionary<string, string>> results = new List<IDictionary<string, string>>();

                string query = "select distinct OWNER from dtcodes WHERE (OWNER='FACILITIES' OR OWNER='IT' OR OWNER='SCM' OR OWNER='MFG' OR OWNER='PROCESS'" +
                " OR OWNER='QA' OR OWNER='EE' OR OWNER='TOOLING' OR OWNER='EBR') AND (AREALISTID = 4) order by OWNER ASC";

                results = Connection.GetDataAssociateArray(query, "Get Status Owner", Connection.promis_connString);

                return results;
            }

            public List<IDictionary<string, string>> get_status(string stsOwner)
            {
                List<IDictionary<string, string>> results = new List<IDictionary<string, string>>();

                string query = "select DISTINCT DESCRIPTION from dtcodes where OWNER ='" + stsOwner + "' order by DESCRIPTION asc";

                results = Connection.GetDataAssociateArray(query, "Get Status", Connection.promis_connString);

                return results;
            }

            public List<IDictionary<string, string>> get_device()
            {
                List<IDictionary<string, string>> results = new List<IDictionary<string, string>>();

                string query = "select distinct New_Family from p1_uph2 order by New_Family asc";

                results = Connection.GetDataAssociateArray(query, "Get Device", Connection.promis_connString);

                return results;
            }

            public IDictionary<string, string> get_default_uph(string family)
            {
                IDictionary<string, string> results = new Dictionary<string, string>();

                string query = "select uph from p1_uph2 where family ='" + family + "'";

                results = Connection.GetDataArray(query, "Get Default UPH", Connection.promis_connString);

                return results;

            }

            public IDictionary<string, string> get_uph(string id, string machinePlatform)
            {
                IDictionary<string, string> results = new Dictionary<string, string>();

                string query = "select uph from p1_uph2 where New_Family ='" + id + "' and TESTER = '" + machinePlatform + "'";

                results = Connection.GetDataArray(query, "Get Family Type", Connection.promis_connString);

                return results;

            }

            public IDictionary<string, string> get_uph_byId(string family, string machineID)
            {
                IDictionary<string, string> results = new Dictionary<string, string>();

                string query = "select UPH from p1_uph2 where New_Family ='" + family + "' and machine_id = '" + machineID + "'";

                results = Connection.GetDataArray(query, "Get Platform Type", Connection.promis_connString);

                return results;

            }

            public IDictionary<string, string> get_package_type(string id)
            {
                IDictionary<string, string> results = new Dictionary<string, string>();

                string query = "select New_Package FROM p1_uph2 WHERE New_Family ='" + id + "' LIMIT 1";

                results = Connection.GetDataArray(query, "Get Package Type", Connection.promis_connString);

                return results;
            }

            public List<IDictionary<string, string>> get_all_user()
            {
                List<IDictionary<string, string>> results = new List<IDictionary<string, string>>();

                string query = "select id,email_address from users ORDER BY first_name ASC";

                results = Connection.GetDataAssociateArray(query, "Get User", Connection.promis_connString);

                return results;
            }

            public IDictionary<string, string> check_user(string user, string pass)
            {
                IDictionary<string, string> results = new Dictionary<string, string>();

                string query = "select email_address,password,id from users WHERE email_address ='"+ user +"'AND password ='"+ pass +"'";

                results = Connection.GetDataArray(query, "Check User", Connection.promis_connString);

                return results;
            }

            public Boolean insert_Data(string machineID,string machinePF,string stsOwner,string stsDes,string prodName,
                string lotNo, string uph, string pkgType, string remarks, string group, string user, string material_id,
                string date3, string userID, string stsDwn, string setup_to_qa, string qa_to_process,
                string usl_1_impendance, string nominal_1_impendance, string lsl_1_impendance, string usl_2_impendance, string nominal_2_impendance, string lsl_2_impendance,
                string usl_1_bf_igbt, string nominal_1_bf_igbt, string lsl_1_bf_igbt, string usl_2_bf_igbt, string nominal_2_bf_igbt, string lsl_2_bf_igbt,
                string usl_1_bf_mid_stitch, string nominal_1_bf_mid_stitch, string lsl_1_bf_mid_stitch, string usl_2_bf_mid_stitch, string nominal_2_bf_mid_stitch, string lsl_2_bf_mid_stitch,
                string usl_1_bf_lead, string nominal_1_bf_lead, string lsl_1_bf_lead, string usl_2_bf_lead, string nominal_2_bf_lead, string lsl_2_bf_lead,
                string track_status, string ipcc_value, string IPCC_reset)
            {

                if (stsDes == "SET-UP/CONVERSION" || stsDes == "LSG ISOLATION" || stsDes == "LSG REPAIR" || stsDes == "LSG WAIT" || stsDes == "MAJOR REPAIR")
                {
                    if (ipcc_value == "1" && IPCC_reset == "0")
                    {
                        string query = "UPDATE testers set Device='" + prodName + "', pkg_type='" + pkgType + "', Lot_Name='" + lotNo +
                        "', Curr_Status='" + stsDes + "', Status_Desc='" + stsDes + "', Status_Owner='" + stsOwner + "', Comments='" + remarks +
                        "', who='" + user + "', file_datetime = CURRENT_TIMESTAMP, Who_id = " + userID + ", stsDwn = " + stsDwn +
                        ", setup_to_qa = 0, qa_to_process = 0, usl_1_impendance = '" + usl_1_impendance +
                        "', nominal_1_impendance = '" + nominal_1_impendance + "', lsl_1_impendance = '" + lsl_1_impendance +
                        "', usl_2_impendance = '" + usl_2_impendance + "', nominal_2_impendance = '" + nominal_2_impendance +
                        "', lsl_2_impendance = '" + lsl_2_impendance + "',usl_1_bf_igbt = '" + usl_1_bf_igbt + "', nominal_1_bf_igbt = '" + nominal_1_bf_igbt +
                        "', lsl_1_bf_igbt = '" + lsl_1_bf_igbt + "', usl_2_bf_igbt = '" + usl_2_bf_igbt + "', nominal_2_bf_igbt = '" + nominal_2_bf_igbt +
                        "', lsl_2_bf_igbt = '" + lsl_2_bf_igbt + "', usl_1_bf_mid_stitch = '" + usl_1_bf_mid_stitch + "', nominal_1_bf_mid_stitch = '" + nominal_1_bf_mid_stitch +
                        "', lsl_1_bf_mid_stitch = '" + lsl_1_bf_mid_stitch + "', usl_2_bf_mid_stitch = '" + usl_2_bf_mid_stitch + "', nominal_2_bf_mid_stitch = '" + nominal_2_bf_mid_stitch +
                        "', lsl_2_bf_mid_stitch = '" + lsl_2_bf_mid_stitch + "', usl_1_bf_lead = '" + usl_1_bf_lead + "', nominal_1_bf_lead = '" + nominal_1_bf_lead + "', lsl_1_bf_lead = '" + lsl_1_bf_lead +
                        "', usl_2_bf_lead = '" + usl_2_bf_lead + "', nominal_2_bf_lead = '" + nominal_2_bf_lead + "', lsl_2_bf_lead = '" + lsl_2_bf_lead + "', IPCC_reset = '1'  WHERE TesterID='" + machineID + "'";

                        Boolean results = Connection.ExecuteThisQuery(query, "Get User", Connection.promis_connString);

                        return results;
                    }

                    else
                    {
                        string query = "UPDATE testers set Device='" + prodName + "', pkg_type='" + pkgType + "', Lot_Name='" + lotNo +
                        "', Curr_Status='" + stsDes + "', Status_Desc='" + stsDes + "', Status_Owner='" + stsOwner + "', Comments='" + remarks +
                        "', who='" + user + "', file_datetime = CURRENT_TIMESTAMP, Who_id = " + userID + ", stsDwn = " + stsDwn +
                        ", setup_to_qa = 0, qa_to_process = 0 WHERE TesterID='" + machineID + "'";

                        Boolean results = Connection.ExecuteThisQuery(query, "Get User", Connection.promis_connString);

                        return results;
                    }

                }
                else if (stsDes == "QA BUY-OFF") 
                {
                    if (ipcc_value == "1" && IPCC_reset == "0")
                    {
                        string query = "UPDATE testers set Device='" + prodName + "', pkg_type='" + pkgType + "', Lot_Name='" + lotNo +
                        "', Curr_Status='" + stsDes + "', Status_Desc='" + stsDes + "', Status_Owner='" + stsOwner + "', Comments='" + remarks +
                        "', who='" + user + "', file_datetime = CURRENT_TIMESTAMP, Who_id = " + userID + ", stsDwn = " + stsDwn + ", setup_to_qa = 1, qa_to_process = 0, usl_1_impendance = '" + usl_1_impendance +
                        "', nominal_1_impendance = '" + nominal_1_impendance + "', lsl_1_impendance = '" + lsl_1_impendance +
                        "', usl_2_impendance = '" + usl_2_impendance + "', nominal_2_impendance = '" + nominal_2_impendance +
                        "', lsl_2_impendance = '" + lsl_2_impendance + "',usl_1_bf_igbt = '" + usl_1_bf_igbt + "', nominal_1_bf_igbt = '" + nominal_1_bf_igbt +
                        "', lsl_1_bf_igbt = '" + lsl_1_bf_igbt + "', usl_2_bf_igbt = '" + usl_2_bf_igbt + "', nominal_2_bf_igbt = '" + nominal_2_bf_igbt +
                        "', lsl_2_bf_igbt = '" + lsl_2_bf_igbt + "', usl_1_bf_mid_stitch = '" + usl_1_bf_mid_stitch + "', nominal_1_bf_mid_stitch = '" + nominal_1_bf_mid_stitch +
                        "', lsl_1_bf_mid_stitch = '" + lsl_1_bf_mid_stitch + "', usl_2_bf_mid_stitch = '" + usl_2_bf_mid_stitch + "', nominal_2_bf_mid_stitch = '" + nominal_2_bf_mid_stitch +
                        "', lsl_2_bf_mid_stitch = '" + lsl_2_bf_mid_stitch + "', usl_1_bf_lead = '" + usl_1_bf_lead + "', nominal_1_bf_lead = '" + nominal_1_bf_lead + "', lsl_1_bf_lead = '" + lsl_1_bf_lead +
                        "', usl_2_bf_lead = '" + usl_2_bf_lead + "', nominal_2_bf_lead = '" + nominal_2_bf_lead + "', lsl_2_bf_lead = '" + lsl_2_bf_lead + "', IPCC_reset = '1' WHERE TesterID='" + machineID + "'";

                        Boolean results = Connection.ExecuteThisQuery(query, "Get User", Connection.promis_connString);

                        return results;
                    }
                    else
                    {
                        string query = "UPDATE testers set Device='" + prodName + "', pkg_type='" + pkgType + "', Lot_Name='" + lotNo +
                        "', Curr_Status='" + stsDes + "', Status_Desc='" + stsDes + "', Status_Owner='" + stsOwner + "', Comments='" + remarks +
                        "', who='" + user + "', file_datetime = CURRENT_TIMESTAMP, Who_id = " + userID + ", stsDwn = " + stsDwn + ", setup_to_qa = 1, qa_to_process = 0 WHERE TesterID='" + machineID + "'";

                        Boolean results = Connection.ExecuteThisQuery(query, "Get User", Connection.promis_connString);

                        return results;
                    }

                }
                else if (stsDes == "PROCESS BUY-OFF")
                {
                    if (ipcc_value == "1" && IPCC_reset == "0")
                    {
                        string query = "UPDATE testers set Device='" + prodName + "', pkg_type='" + pkgType + "', Lot_Name='" + lotNo +
                        "', Curr_Status='" + stsDes + "', Status_Desc='" + stsDes + "', Status_Owner='" + stsOwner + "', Comments='" + remarks +
                        "', who='" + user + "', file_datetime = CURRENT_TIMESTAMP, Who_id = " + userID + ", stsDwn = " + stsDwn + ", setup_to_qa = 1, qa_to_process = 1, usl_1_impendance = '" + usl_1_impendance +
                        "', nominal_1_impendance = '" + nominal_1_impendance + "', lsl_1_impendance = '" + lsl_1_impendance +
                        "', usl_2_impendance = '" + usl_2_impendance + "', nominal_2_impendance = '" + nominal_2_impendance +
                        "', lsl_2_impendance = '" + lsl_2_impendance + "',usl_1_bf_igbt = '" + usl_1_bf_igbt + "', nominal_1_bf_igbt = '" + nominal_1_bf_igbt +
                        "', lsl_1_bf_igbt = '" + lsl_1_bf_igbt + "', usl_2_bf_igbt = '" + usl_2_bf_igbt + "', nominal_2_bf_igbt = '" + nominal_2_bf_igbt +
                        "', lsl_2_bf_igbt = '" + lsl_2_bf_igbt + "', usl_1_bf_mid_stitch = '" + usl_1_bf_mid_stitch + "', nominal_1_bf_mid_stitch = '" + nominal_1_bf_mid_stitch +
                        "', lsl_1_bf_mid_stitch = '" + lsl_1_bf_mid_stitch + "', usl_2_bf_mid_stitch = '" + usl_2_bf_mid_stitch + "', nominal_2_bf_mid_stitch = '" + nominal_2_bf_mid_stitch +
                        "', lsl_2_bf_mid_stitch = '" + lsl_2_bf_mid_stitch + "', usl_1_bf_lead = '" + usl_1_bf_lead + "', nominal_1_bf_lead = '" + nominal_1_bf_lead + "', lsl_1_bf_lead = '" + lsl_1_bf_lead +
                        "', usl_2_bf_lead = '" + usl_2_bf_lead + "', nominal_2_bf_lead = '" + nominal_2_bf_lead + "', lsl_2_bf_lead = '" + lsl_2_bf_lead + "', IPCC_reset = '1' WHERE TesterID='" + machineID + "'";

                        Boolean results = Connection.ExecuteThisQuery(query, "Get User", Connection.promis_connString);

                        return results;
                    }
                    else
                    {
                        string query = "UPDATE testers set Device='" + prodName + "', pkg_type='" + pkgType + "', Lot_Name='" + lotNo +
                        "', Curr_Status='" + stsDes + "', Status_Desc='" + stsDes + "', Status_Owner='" + stsOwner + "', Comments='" + remarks +
                        "', who='" + user + "', file_datetime = CURRENT_TIMESTAMP, Who_id = " + userID + ", stsDwn = " + stsDwn + ", setup_to_qa = 1, qa_to_process = 1 WHERE TesterID='" + machineID + "'";

                        Boolean results = Connection.ExecuteThisQuery(query, "Get User", Connection.promis_connString);

                        return results;
                    }

                }
                else
                {
                    if (ipcc_value == "1" && IPCC_reset == "0")
                    {
                        string query = "UPDATE testers set Device='" + prodName + "', pkg_type='" + pkgType + "', Lot_Name='" + lotNo +
                        "', Curr_Status='" + stsDes + "', Status_Desc='" + stsDes + "', Status_Owner='" + stsOwner + "', Comments='" + remarks +
                        "', who='" + user + "', file_datetime = CURRENT_TIMESTAMP, Who_id = " + userID + ", stsDwn = " + stsDwn + ", usl_1_impendance = '" + usl_1_impendance +
                        "', nominal_1_impendance = '" + nominal_1_impendance + "', lsl_1_impendance = '" + lsl_1_impendance +
                        "', usl_2_impendance = '" + usl_2_impendance + "', nominal_2_impendance = '" + nominal_2_impendance +
                        "', lsl_2_impendance = '" + lsl_2_impendance + "',usl_1_bf_igbt = '" + usl_1_bf_igbt + "', nominal_1_bf_igbt = '" + nominal_1_bf_igbt +
                        "', lsl_1_bf_igbt = '" + lsl_1_bf_igbt + "', usl_2_bf_igbt = '" + usl_2_bf_igbt + "', nominal_2_bf_igbt = '" + nominal_2_bf_igbt +
                        "', lsl_2_bf_igbt = '" + lsl_2_bf_igbt + "', usl_1_bf_mid_stitch = '" + usl_1_bf_mid_stitch + "', nominal_1_bf_mid_stitch = '" + nominal_1_bf_mid_stitch +
                        "', lsl_1_bf_mid_stitch = '" + lsl_1_bf_mid_stitch + "', usl_2_bf_mid_stitch = '" + usl_2_bf_mid_stitch + "', nominal_2_bf_mid_stitch = '" + nominal_2_bf_mid_stitch +
                        "', lsl_2_bf_mid_stitch = '" + lsl_2_bf_mid_stitch + "', usl_1_bf_lead = '" + usl_1_bf_lead + "', nominal_1_bf_lead = '" + nominal_1_bf_lead + "', lsl_1_bf_lead = '" + lsl_1_bf_lead +
                        "', usl_2_bf_lead = '" + usl_2_bf_lead + "', nominal_2_bf_lead = '" + nominal_2_bf_lead + "', lsl_2_bf_lead = '" + lsl_2_bf_lead + "', IPCC_reset = '1' WHERE TesterID='" + machineID + "'";

                        Boolean results = Connection.ExecuteThisQuery(query, "Get User", Connection.promis_connString);

                        return results;
                    }
                    else
                    {
                        string query = "UPDATE testers set Device='" + prodName + "', pkg_type='" + pkgType + "', Lot_Name='" + lotNo +
                        "', Curr_Status='" + stsDes + "', Status_Desc='" + stsDes + "', Status_Owner='" + stsOwner + "', Comments='" + remarks +
                        "', who='" + user + "', file_datetime = CURRENT_TIMESTAMP, Who_id = " + userID + ", stsDwn = " + stsDwn + " WHERE TesterID='" + machineID + "'";

                        Boolean results = Connection.ExecuteThisQuery(query, "Get User", Connection.promis_connString);

                        return results;
                    }

                }

            }

            public Boolean insert_Data_History(string machineID, string stsDes, string date1, string date2, string user,
            string remarks, string prodName, string lotNo, string uph, string stsOwner, string group, string pkgType,
            string usl_1_impendance, string nominal_1_impendance, string lsl_1_impendance, string usl_2_impendance, string nominal_2_impendance, string lsl_2_impendance,
            string usl_1_bf_igbt, string nominal_1_bf_igbt, string lsl_1_bf_igbt, string usl_2_bf_igbt, string nominal_2_bf_igbt, string lsl_2_bf_igbt,
            string usl_1_bf_mid_stitch, string nominal_1_bf_mid_stitch, string lsl_1_bf_mid_stitch, string usl_2_bf_mid_stitch, string nominal_2_bf_mid_stitch, string lsl_2_bf_mid_stitch,
            string usl_1_bf_lead, string nominal_1_bf_lead, string lsl_1_bf_lead, string usl_2_bf_lead, string nominal_2_bf_lead, string lsl_2_bf_lead)
            {

                string query = "INSERT INTO " + machineID + " (Status,Date_Time,DateTime,Personnel,Comments,Device,Lot_ID,UPH,"+
                "STATUS_OWNER,GROUPS,pkg_type,usl_1_impendance,nominal_1_impendance,lsl_1_impendance,usl_2_impendance,"+
                "nominal_2_impendance,lsl_2_impendance,usl_1_bf_igbt,nominal_1_bf_igbt,lsl_1_bf_igbt,usl_2_bf_igbt,"+
                "nominal_2_bf_igbt,lsl_2_bf_igbt,usl_1_bf_mid_stitch,nominal_1_bf_mid_stitch,lsl_1_bf_mid_stitch,usl_2_bf_mid_stitch,"+
                "nominal_2_bf_mid_stitch,lsl_2_bf_mid_stitch,usl_1_bf_lead,nominal_1_bf_lead,lsl_1_bf_lead,usl_2_bf_lead,"+
                "nominal_2_bf_lead,lsl_2_bf_lead) VALUES ('" + stsDes + "','" + date1 + "','" + date2 + "','" + user + "','" + remarks +
                "','" + prodName + "','" + lotNo + "'," + uph + ",'" + stsOwner + "','" + group + "','" + pkgType + "','"+ usl_1_impendance +
                "', '" + nominal_1_impendance + "', '"+ lsl_1_impendance +"', '"+ usl_2_impendance +"', '"+ nominal_2_impendance +
                "', '"+ lsl_2_impendance +"', '"+ usl_1_bf_igbt +"', '"+ nominal_1_bf_igbt +"', '"+ lsl_1_bf_igbt +"', '"+ usl_2_bf_igbt +
                "', '"+ nominal_2_bf_igbt +"', '"+ lsl_2_bf_igbt +"', '"+ usl_1_bf_mid_stitch +"', '"+ nominal_1_bf_mid_stitch +
                "', '"+ lsl_1_bf_mid_stitch +"', '"+ usl_2_bf_mid_stitch +"', '"+ nominal_2_bf_mid_stitch +"', '"+ lsl_2_bf_mid_stitch +
                "', '"+ usl_1_bf_lead +"', '"+ nominal_1_bf_lead +"', '"+ lsl_1_bf_lead +"', '"+ usl_2_bf_lead +"', '"+ nominal_2_bf_lead +
                "', '"+ lsl_2_bf_lead +"')";

                Boolean results = Connection.ExecuteThisQuery(query, "Get User", Connection.promis_connString);

                return results;
            }
            //track in

            //iTV
            public IDictionary<string, string> check_existing_equiphistory(string machineID, string stsOwner, string stsDes)
            {
                IDictionary<string, string> results1 = new Dictionary<string, string>();
                IDictionary<string, string> results2 = new Dictionary<string, string>();
                IDictionary<string, string> results3 = new Dictionary<string, string>();
                IDictionary<string, string> invalid = new Dictionary<string, string>();
                //IDictionary<string, string> id2 = new Dictionary<string, string>();
                //var guid = Guid.NewGuid().ToString();

                string query1 = "select id,areaid from equiplist WHERE MESEQPID ='" + machineID + "'";
                string check_if_dtcodes_exists_query = "select count(id) from dtcodes WHERE DESCRIPTION='" + stsDes + "' AND OWNER='" + stsOwner + "'";

                results1 = Connection.GetDataArray(query1, "Check Matching Equiplist", Connection.promis_connString);
                results3 = Connection.GetDataArray(check_if_dtcodes_exists_query, "Check DT CODES", Connection.promis_connString);

                if (results1["id"] == null)
                {
                    invalid["done"] = "NO MACHINE";
                    return invalid;
                }
                else if (results3["count(id)"] == "0")
                {
                    invalid["done"] = "NO DTCODE";
                    return invalid;
                }
                else
                {
                    string query2 = "select * from equiphistory WHERE EQUIPLISTID='" + results1["id"] + "' ORDER BY CHANGEDT DESC LIMIT 1";
                    results2 = Connection.GetDataArray(query2, "Check if R", Connection.promis_connString);
                    return results2;
                }

            }

            public IDictionary<string, string> update_existing_equiphistory(int id)
            {
                IDictionary<string, string> results = new Dictionary<string, string>();

                string query = "UPDATE equiphistory SET RECTYPE = 'R' WHERE EQUIPLISTID = "+ id +" ORDER BY CHANGEDT DESC LIMIT 1";
                results = Connection.GetDataArray(query, "Check if R", Connection.promis_connString);

                return results;
            }

            public IDictionary<string, string> insert_equiphistory(string machineID, string stsOwner, string stsDes, string remarks, string itvdate, string user, string userID)
            {
                var date = DateTime.Now.ToString("MM/dd/yyyy hh:mm tt");
                var guid = Guid.NewGuid().ToString();

                IDictionary<string, string> results = new Dictionary<string, string>();
                IDictionary<string, string> id1 = new Dictionary<string, string>();
                IDictionary<string, string> id2 = new Dictionary<string, string>();
  
                string query1 = "select id,areaid from equiplist WHERE MESEQPID ='"+ machineID +"'";
                string query2 = "select id from dtcodes WHERE DESCRIPTION='"+ stsDes +"' AND OWNER='"+ stsOwner +"'";

                id1 = Connection.GetDataArray(query1, "Check Matching Equiplist", Connection.promis_connString);
                id2 = Connection.GetDataArray(query2, "Check Matching Equiplist", Connection.promis_connString);

                results.Add("EQUIPLISTID", id1["id"]);
                results.Add("DTCODEID", id2["id"]);
                results.Add("ID", guid);
                results.Add("AREAID", id1["areaid"]);
                results.Add("REMARKS", remarks);
                results.Add("CHANGEDT", itvdate);
                results.Add("USERLISTID", userID);

                string query3 = "INSERT INTO equiphistory(ID,AREAID,RECTYPE,EQUIPLISTID,CHANGEDT,DTCODEID,COMMENTS,USERLISTID) VALUES ('" + results["ID"] + "','"
                    + results["AREAID"] + "','C','" + results["EQUIPLISTID"] + "','" + results["CHANGEDT"] + "','" + results["DTCODEID"] + "','" + results["REMARKS"] + "','" + results["USERLISTID"] + "')";
                Connection.ExecuteThisQuery(query3, "Get User", Connection.promis_connString);

                return results;
            }

            /////////////////////////////////////////////////TRACKING////////////////
            public Boolean track_lot(string machineID, string track_in, string track_out, string lotNo, string user)
            {

                string query = "INSERT INTO track_record (date_issued,machine,process,track_in,track_out,lot_name,submitter) VALUES (CURRENT_TIMESTAMP,'" + machineID + "', 'TNR', " + track_in + ", " + track_out + ", '" + lotNo + "', '" + user + "')";

                Boolean results = Connection.ExecuteThisQuery(query, "Insert Track Record", Connection.promis_connString);

                return results;
            }

            public IDictionary<string, string> check_track_by_machine(string machineID)
            {
                IDictionary<string, string> results = new Dictionary<string, string>();

                //string query = "SELECT * FROM track_record WHERE lot_name = '"+ lotNo +"' AND machine = '"+ machineID +"'";
                string query = "SELECT * FROM track_record WHERE machine = '" + machineID + "' ORDER BY date_issued DESC LIMIT 1";

                results = Connection.GetDataArray(query, "Check track by machine", Connection.promis_connString);

                return results;
            }

            public IDictionary<string, string> check_track_by_lot(string lotNo)
            {
                IDictionary<string, string> results = new Dictionary<string, string>();

                //string query = "SELECT * FROM track_record WHERE lot_name = '"+ lotNo +"' AND machine = '"+ machineID +"'";
                string query = "SELECT * FROM track_record WHERE lot_name = '" + lotNo + "' ORDER BY date_issued DESC LIMIT 1";

                results = Connection.GetDataArray(query, "Check track by lot", Connection.promis_connString);

                return results;
            }

            /////////////////////////////////////////////////////////////////////////

            //public IDictionary<string, string> check_existing_equiplistID()
            //{
            //    IDictionary<string, string> results = new Dictionary<string, string>();

            //    string query = "select email_address,password,id from users WHERE email_address ='" + user + "'AND password ='" + pass + "'";

            //    results = Connection.GetDataArray(query, "Check User", Connection.promis_connString);

            //    return results;
            //}

            //public Boolean insert_equiplist()
            //{

            //    string query = "UPDATE testers set Device='" + prodName + "', pkg_type='" + pkgType + "', Lot_Name='" + lotNo + "', Curr_Status='" + stsDes + "', Status_Desc='" + stsDes + "', Status_Owner='" + stsOwner + "', Comments='" + remarks + "', who='" + user + "', file_datetime = CURRENT_TIMESTAMP WHERE TesterID='" + machineID + "'";

            //    Boolean results = Connection.ExecuteThisQuery(query, "Get User", Connection.promis_connString);

            //    return results;
            //}
		}
}