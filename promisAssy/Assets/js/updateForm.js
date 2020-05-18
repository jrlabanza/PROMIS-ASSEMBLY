$(document).on("click", "#save", function (e) {
    e.preventDefault();

    if ($("#usl_1_impendance").val() == "" || $("#nominal_1_impendance").val() == "" || $("#lsl_1_impendance").val() == "" || $("#usl_2_impendance").val() == "" || $("#nominal_2_impendance").val() == "" || $("#lsl_2_impendance").val() == ""
        || $("#usl_1_bf_igbt").val() == "" || $("#nominal_1_bf_igbt").val() == "" || $("#lsl_1_bf_igbt").val() == "" || $("#usl_2_bf_igbt").val() == "" || $("#nominal_2_bf_igbt").val() == "" || $("#lsl_2_bf_igbt").val() == ""
        || $("#usl_1_bf_mid_stitch").val() == "" || $("#nominal_1_bf_mid_stitch").val() == "" || $("#lsl_1_bf_mid_stitch").val() == "" || $("#usl_2_bf_mid_stitch").val() == "" || $("#nominal_2_bf_mid_stitch").val() == "" || $("#lsl_2_bf_mid_stitch").val() == ""
        || $("#usl_1_bf_lead").val() == "" || $("#nominal_1_bf_lead").val() == "" || $("#lsl_1_bf_lead").val() == "" || $("#usl_2_bf_lead").val() == "" || $("#nominal_2_bf_lead").val() == "" || $("#lsl_2_bf_lead").val() == "") {
        $.growl.error({ message: "IPCC fields must be completed", location: "tr", style: "error" });
    }

    else {
       
        Update_Machine();
    }
});

$(document).on("click", "#track_in", function (e) {
    e.preventDefault();
    var track = "TRACK IN";
    var lotNo = $("#lotNo").val();
    var machineCheck = $("#machineID").val();

    if ($("#usl_1_impendance").val() == "" || $("#nominal_1_impendance").val() == "" || $("#lsl_1_impendance").val() == "" || $("#usl_2_impendance").val() == "" || $("#nominal_2_impendance").val() == "" || $("#lsl_2_impendance").val() == ""
    || $("#usl_1_bf_igbt").val() == "" || $("#nominal_1_bf_igbt").val() == "" || $("#lsl_1_bf_igbt").val() == "" || $("#usl_2_bf_igbt").val() == "" || $("#nominal_2_bf_igbt").val() == "" || $("#lsl_2_bf_igbt").val() == ""
    || $("#usl_1_bf_mid_stitch").val() == "" || $("#nominal_1_bf_mid_stitch").val() == "" || $("#lsl_1_bf_mid_stitch").val() == "" || $("#usl_2_bf_mid_stitch").val() == "" || $("#nominal_2_bf_mid_stitch").val() == "" || $("#lsl_2_bf_mid_stitch").val() == ""
    || $("#usl_1_bf_lead").val() == "" || $("#nominal_1_bf_lead").val() == "" || $("#lsl_1_bf_lead").val() == "" || $("#usl_2_bf_lead").val() == "" || $("#nominal_2_bf_lead").val() == "" || $("#lsl_2_bf_lead").val() == "") {
        $.growl.error({ message: "IPCC fields must be completed", location: "tr", style: "error" });
    }

    else {

        $.post(
        base_url + "promis/check_track_by_lot",
        {
            "lotNo": lotNo
        },
        function (lot) {
            if ((lot.track_in == 1 && lot.track_out == 1) && (lot.machine == machineCheck)) {
                alert("LOT ID ALREADY TRACKED OUT IN THIS PROCESS. CANNOT BE TRACKED IN AGAIN!");
            }
            else {
                Update_Machine(track);
            }

        });
    }
});

$(document).on("click", "#track_out", function (e) {
    e.preventDefault();
    var track = "TRACK OUT";
    Update_Machine(track);
});

function Update_Machine(track) 
{
    var dateTime = new Date($.now());
    var date = Date.parse(dateTime);
    var date1 = date.toString('yyyy-MM-dd HH:mm');
    var date2 = date.toString('yyyyMMddHHmmss');
    var date3 = date.toString('M/d/yyyy HH:mm');
    var itvdate = date.toString('yyyy/MM/dd HH:mm:ss');
    var machineID = $("#machineID").val();
    var machinePF = $("#machinePlatform").val();
    var stsOwner = $("option:selected", "#stsOwner").text(); 
    var stsDes = $("option:selected", "#stsDes").text();
    //Color Sorting
    if (stsDes == "LSG REPAIR" || stsDes == "LSG WAIT" || stsDes == "LSG ISOLATION" || stsDes == "TESTER REPAIR" || stsDes == "TESTER WAIT" || stsDes == "TESTER MAJOR BREAKDOWN"
    || stsDes == "HANDLER MAJOR BREAKDOWN" || stsDes == "HANDLER REPAIR" || stsDes == "TESTER MAJOR BREAKDOWN" || stsDes == "PROCESS ENGG WAIT" || stsDes == "SETUP WAIT"
    || stsDes == "HARDWARE REPAIR/HW BREAKDOWN" || stsDes == "HARDWARE REPAIR/HW BREAKDOWN" || stsDes == "HARDWARE WAIT" || stsDes == "WAITING YIELD VERIFICATION (YIG)"
    || stsDes == "FOI" || stsDes == "QUANTIFICATION") { //Red - UNSCHEDULED
        var stsDwn = 0;
    }
    else if (stsDes == "HANDLER PM" || stsDes == "TESTER PM/CAL" || stsDes == "PRODUCT ENGG SCHED" || stsDes == "SETUP CONVERSION" || stsDes == "EBR DEVICE QUAL"
    || stsDes == "HANDLER IMPROVEMENT PROJECTS" || stsDes == "LRT SCHEDULED" || stsDes == "WEEKLY TEMP CHECK" || stsDes == "PM BURN IN_LRT") {
        stsDwn = 1;
    }
    else if (stsDes == "NEW SETUP") {
        stsDwn = 2;
    }
    else if (stsDes == "MATDOWN") {
        stsDwn = 4;
    }
    else if (stsDes == "RUNNING PRODUCTION" || stsDes == "SPEEDLOSS DUE TO HANDLER" || stsDes == "SPEEDLOSS DUE TO TESTER" || stsDes == "SPEEDLOSS DUE TO HARDWARE" || stsDes == "100% RETEST" || stsDes == "RESCREEN") {
        stsDwn = 5;
    }
    else {
        stsDwn = 3;
    }

    var prodName = $("option:selected", "#prodName").text();
    var lotNo = $("#lotNo").val();
    var uph = $("option:selected", "#uph_select").text();
    if (uph == "") {
        uph = 0.0;
    }
    var pkgType = $("option:selected", "#pkgType").text();
    var temp_remarks = $("#remarks").val();
    //var remarks = temp_remarks.trim();
    var remarks = temp_remarks.replace(/(\r\n|\n|\r)/gm, " ");
    var group = $("option:selected", "#group").text();
    var user = $("#user").val();
    var pass = $("#pass").val();
    var material_id = $(".inputTxt").val();
    var userID = $("option:selected", "#user").data("user-id");
    var setup_to_qa = $(".setup-to-qa-check").val();
    var qa_to_process = $(".qa-to-process-check").val();
    var usl_1_impendance = $("#usl_1_impendance").val();
    var nominal_1_impendance = $("#nominal_1_impendance").val();
    var lsl_1_impendance = $("#lsl_1_impendance").val();
    var usl_2_impendance = $("#usl_2_impendance").val();
    var nominal_2_impendance = $("#nominal_2_impendance").val();
    var lsl_2_impendance = $("#lsl_2_impendance").val();
    var usl_1_bf_igbt = $("#usl_1_bf_igbt").val();
    var nominal_1_bf_igbt = $("#nominal_1_bf_igbt").val();
    var lsl_1_bf_igbt = $("#lsl_1_bf_igbt").val();
    var usl_2_bf_igbt = $("#usl_2_bf_igbt").val();
    var nominal_2_bf_igbt = $("#nominal_2_bf_igbt").val();
    var lsl_2_bf_igbt = $("#lsl_2_bf_igbt").val();
    var usl_1_bf_mid_stitch = $("#usl_1_bf_mid_stitch").val();
    var nominal_1_bf_mid_stitch = $("#nominal_1_bf_mid_stitch").val();
    var lsl_1_bf_mid_stitch = $("#lsl_1_bf_mid_stitch").val();
    var usl_2_bf_mid_stitch = $("#usl_2_bf_mid_stitch").val();
    var nominal_2_bf_mid_stitch = $("#nominal_2_bf_mid_stitch").val();
    var lsl_2_bf_mid_stitch = $("#lsl_2_bf_mid_stitch").val();
    var usl_1_bf_lead = $("#usl_1_bf_lead").val();
    var nominal_1_bf_lead = $("#nominal_1_bf_lead").val();
    var lsl_1_bf_lead = $("#lsl_1_bf_lead").val();
    var usl_2_bf_lead = $("#usl_2_bf_lead").val();
    var nominal_2_bf_lead = $("#nominal_2_bf_lead").val();
    var lsl_2_bf_lead = $("#lsl_2_bf_lead").val();
    var ipcc_value = $("#ipcc-value").val();
    var ipcc_reset = $("#ipcc-reset").val();
    var track_status = track;
    if (track == "TRACK IN") {
        var track_in = 1;
        var track_out = 0;
    }
    else if (track == "TRACK OUT") {
        var track_in = 1;
        var track_out = 1;
    }
    var process = $(".process").val();

    if ($("#lotNo").val().length < 9 || $("#prodName").val() == "#N/A") {
        //alert('PLEASE INPUT LOT ID / FAMILY NAME');
        $.growl.error({ message: "PLEASE INPUT LOT ID / FAMILY NAME!", location: "tr", style: "error" });
    }
    else {
        //Update Machine
        $.post(
           base_url + "promis/check_track_by_lot",
           {
               "lotNo": lotNo
           },
           function (lot) {
               if ((lot.track_in == 1 && lot.track_out == 0) && (lot.machine != machineID)) { //lot id checking
                   //alert("LOT ID IN USE ON ANOTHER MACHINE, PLEASE TRY AGAIN");
                   $.growl.error({ message: "LOT ID IN USE ON ANOTHER MACHINE, PLEASE TRY AGAIN!", location: "tr", style: "error" });
               }
               else {
                   if (lot.track_in == 1 && lot.track_out == 1) {//lot id duplication check
                       alert("LOT ID ALREADY TRACKED OUT. CANNOT BE TRACKED IN AGAIN");
                   }
                   else {
                       if ((lot.track_in == 1 && lot.track_out == 0) && stsOwner == "SETUP") {//cannot setup during track in
                           //alert("CANNOT SETUP WHEN TRACKED IN!");
                           $.growl.error({ message: "CANNOT SETUP WHEN TRACKED IN!", location: "tr", style: "error" });
                       }
                       else {
                           //if (stsDes == "RUNNING PRODUCTION" && (setup_to_qa == "0" || qa_to_process == "0")) {
                           //    if (setup_to_qa == "0") {
                           //        $.growl.error({ message: "MACHINE UNDERGO SETUP AND CANNOT BE DIRECTED TO RUNNING PRODUCTION, PROCEED TO QA STATUS!", location: "tr", style: "error" });
                           //    }
                           //    else {
                           //        $.growl.error({ message: "MACHINE IS UNDER QA STATUS PLEASE PROCEED TO PROCESS STATUS!", location: "tr", style: "error" });
                           //    }
                           //}
                           //else {
                               $.post(

                                    base_url + "promis/hash_test",
                                    {
                                        "pass": pass
                                    },
                                    function (password) {

                                        $.post(
                                            base_url + "promis/check_user",
                                            {
                                                "user": user,
                                                "pass": password
                                            },
                                            function (access) {

                                                var FOL_DATA_UPDATE = {
                                                    "machineID": machineID,
                                                    "machinePF": machinePF,
                                                    "stsOwner": stsOwner,
                                                    "stsDes": stsDes,
                                                    "prodName": prodName,
                                                    "lotNo": lotNo,
                                                    "uph": uph,
                                                    "pkgType": pkgType,
                                                    "remarks": remarks,
                                                    "group": group,
                                                    "user": user,
                                                    "userID": userID,
                                                    "material_id": material_id,
                                                    "date1": date1,
                                                    "date2": date2,
                                                    "date3": date3,
                                                    "itvdate": itvdate,
                                                    "process": process,
                                                    "track_in": track_in,
                                                    "track_out": track_out,
                                                    "stsDwn": stsDwn,
                                                    "setup_to_qa": setup_to_qa,
                                                    "qa_to_process": qa_to_process,
                                                    "usl_1_impendance": usl_1_impendance,
                                                    "nominal_1_impendance": nominal_1_impendance,
                                                    "lsl_1_impendance": lsl_1_impendance,
                                                    "usl_2_impendance": usl_2_impendance,
                                                    "nominal_2_impendance": nominal_2_impendance,
                                                    "lsl_2_impendance": lsl_2_impendance,
                                                    "usl_1_bf_igbt": usl_1_bf_igbt,
                                                    "nominal_1_bf_igbt": nominal_1_bf_igbt,
                                                    "lsl_1_bf_igbt": lsl_1_bf_igbt,
                                                    "usl_2_bf_igbt": usl_2_bf_igbt,
                                                    "nominal_2_bf_igbt": nominal_2_bf_igbt,
                                                    "lsl_2_bf_igbt": lsl_2_bf_igbt,
                                                    "usl_1_bf_mid_stitch": usl_1_bf_mid_stitch,
                                                    "nominal_1_bf_mid_stitch": nominal_1_bf_mid_stitch,
                                                    "lsl_1_bf_mid_stitch": lsl_1_bf_mid_stitch,
                                                    "usl_2_bf_mid_stitch": usl_2_bf_mid_stitch,
                                                    "nominal_2_bf_mid_stitch": nominal_2_bf_mid_stitch,
                                                    "lsl_2_bf_mid_stitch": lsl_2_bf_mid_stitch,
                                                    "usl_1_bf_lead": usl_1_bf_lead,
                                                    "nominal_1_bf_lead": nominal_1_bf_lead,
                                                    "lsl_1_bf_lead": lsl_1_bf_lead,
                                                    "usl_2_bf_lead": usl_2_bf_lead,
                                                    "nominal_2_bf_lead": nominal_2_bf_lead,
                                                    "lsl_2_bf_lead": lsl_2_bf_lead,
                                                    "track_status": track_status,
                                                    "ipcc_value": ipcc_value,
                                                    "IPCC_reset": ipcc_reset
                                                }
                                             
                                                if (access.email_address != null) {

                                                    $.post(
                                                        base_url + "promis/update_machine",
                                                        FOL_DATA_UPDATE,
                                                        function (data) {
                                                            if (track == "TRACK IN" || track == "TRACK OUT") {
                                                                $.post(
                                                                        base_url + "promis/track_lot",
                                                                        FOL_DATA_UPDATE,
                                                                        function (track) {
                                                                            console.log('tracked_in');
                                                                        }
                                                                    )
                                                            }
                                                            else {
                                                                console.log('no track');
                                                            }
                                                            //itv

                                                            $.post(
                                                                base_url + "promis/check_existing_equiphistory",
                                                                FOL_DATA_UPDATE,
                                                                function (check_equiphistory) {

                                                                    if (check_equiphistory.done == "NO MACHINE") {
                                                                        //alert("MISSING MACHINE, PLEASE CONTACT APPS TEAM");
                                                                        $.growl.error({ message: "MISSING MACHINE, PLEASE CONTACT APPS TEAM!", location: "tr", style: "error" });
                                                                    }
                                                                    else if (check_equiphistory.done == "NO DTCODE") {
                                                                        //alert("NO STATUS HAS BEEN INPUTTED, PLEASE INPUT STATUS");
                                                                        $.growl.error({ message: "NO STATUS HAS BEEN INPUTTED, PLEASE INPUT STATUS!", location: "tr", style: "error" });
                                                                    }
                                                                    else {

                                                                        if (check_equiphistory.ID != null) {

                                                                            $.post(
                                                                                base_url + "promis/update_existing_equiphistory",
                                                                                {
                                                                                    "id": check_equiphistory.EQUIPLISTID
                                                                                },
                                                                                function (insert_equiphistory) {
                                                                                    $.post(
                                                                                        base_url + "promis/insert_equiphistory",
                                                                                        FOL_DATA_UPDATE,
                                                                                        function (insert_equiphistory) {

                                                                                            if (base_url + "promis/eolStatus" == window.location.href) {
                                                                                                window.location.href = base_url + "promis/eolStatus";
                                                                                            }
                                                                                            else if (base_url + "promis/folStatus" == window.location.href) {
                                                                                                window.location.href = base_url + "promis/folStatus";
                                                                                            }
                                                                                        }
                                                                                    );
                                                                                }
                                                                            );
                                                                        }
                                                                        else {

                                                                            $.post(
                                                                                base_url + "promis/insert_equiphistory",
                                                                                FOL_DATA_UPDATE,
                                                                                function (insert_equiphistory) {
                                                                                    if (base_url + "promis/eolStatus" == window.location.href) {
                                                                                        window.location.href = base_url + "promis/eolStatus";
                                                                                    }
                                                                                    else if (base_url + "promis/folStatus" == window.location.href) {
                                                                                        window.location.href = base_url + "promis/folStatus";
                                                                                    }
                                                                                }
                                                                            );
                                                                        }
                                                                    }
                                                                }
                                                            );
                                                        }
                                                    );
                                                }
                                                else {
                                                    //alert('Invalid Credentials, Please Try Again');
                                                    $.growl.error({ message: "Invalid Credentials, Please Try Again!", location: "tr", style: "error" });
                                                }
                                            }
                                        )

                                    }
                                )
                           }

                       }
               }
           }
        );

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////


    }
}