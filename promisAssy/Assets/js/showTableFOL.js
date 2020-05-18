$(document).ready(function () {
    
    if (base_url + "promis/folStatus" == window.location.href) {
        
        $.post(
            base_url + "promis/get_fol_data",
            function (data) {
                DisplayFOLData(data);

                $(document).ready(function () {
                    $('.custom_table').DataTable({
                        paging: false,
                        info: false,
                        searching: false,
                        fixedHeader: true,
                        "order": []
                    });
                });
                $(".idHistory").on("click", function () {
                    var id = $(this).attr("data-history-id");
                    var has_ipcc = $(this).attr("data-has-ipcc");
                    //alert(has_ipcc);
                    var append = "";
                    append += "<div class='table-responsive table-hover tableRemove'>";
                    append += "<table id='keywords' class='table downloadTable' style='font-size:14px'>";
                    append += "<thead id='thead'>";
                    append += "<tr style='cursor: default;'>";

                    append += "<th>DATE / TIME</th>";
                    append += "<th>MACHINE ID</th>";
                    append += "<th>HANDLER</th>";
                    append += "<th>PERSONNEL</th>";
                    append += "<th>COMMENTS</th>";
                    append += "<th>DEVICE</th>";
                    append += "<th>LOT ID</th>";
                    append += "<th>STATUS</th>";
                    append += "<th>STATUS OWNER</th>";
                    append += "<th>PACKAGE TYPE</th>";
                    if (has_ipcc == 1) {

                        append += "<th>USL 1 IMPENDANCE</th>";
                        append += "<th>NOMINAL 1 IMPENDANCE</th>";
                        append += "<th>LSL 1 IMPENDANCE</th>";
                        append += "<th>USL 2 IMPENDANCE</th>";
                        append += "<th>NOMINAL 2 IMPENDANCE</th>";
                        append += "<th>LSL 2 IMPENDANCE</th>";

                        append += "<th>USL 1 BF IGBT</th>";
                        append += "<th>NOMINAL 1 BF IGBT</th>";
                        append += "<th>LSL 1 BF IGBT</th>";
                        append += "<th>USL 2 BF IGBT</th>";
                        append += "<th>NOMINAL 2 BF IGBT</th>";
                        append += "<th>LSL 2 BF IGBT</th>";

                        append += "<th>USL 1 BF MID STITCH</th>";
                        append += "<th>NOMINAL 1 BF MID STITCH</th>";
                        append += "<th>LSL 1 BF MID STITCH</th>";
                        append += "<th>USL 2 BF MID STITCH</th>";
                        append += "<th>NOMINAL 2 BF MID STITCH</th>";
                        append += "<th>LSL 2 BF MID STITCH</th>";

                        append += "<th>USL 1 BF LEAD</th>";
                        append += "<th>NOMINAL 1 BF LEAD</th>";
                        append += "<th>LSL 1 BF LEAD</th>";
                        append += "<th>USL 2 BF LEAD</th>";
                        append += "<th>NOMINAL 2 BF LEAD</th>";
                        append += "<th>LSL 2 BF LEAD</th>";
                    }
                    append += "</tr>";
                    append += "</thead>";
                    append += "<tbody class='historyData'>";
                    append += "</tbody>";
                    append += "</table>";
                    append += "</div>";

                    $(".tableAppend").append(append);
                    
                    $.post(
                        base_url + "promis/get_id_history",
                        {
                            "id": id
                        },
                        function (data) {
                            var dataAppend = "";

                            $.each(data, function (i, tableData) {
                                dataAppend += "<tr>";
                                dataAppend += "<td>" + tableData.Date_Time + "</td>";
                                dataAppend += "<td>" + id + "</td>";
                                dataAppend += "<td>" + tableData.Handler + "</td>";
                                dataAppend += "<td>" + tableData.Personnel + "</td>";
                                dataAppend += "<td>" + tableData.Comments + "</td>";
                                dataAppend += "<td>" + tableData.Device + "</td>";
                                dataAppend += "<td>" + tableData.Lot_ID + "</td>";
                                dataAppend += "<td>" + tableData.Status + "</td>";
                                dataAppend += "<td>" + tableData.STATUS_OWNER + "</td>";
                                dataAppend += "<td>" + tableData.pkg_type + "</td>";
                                if (has_ipcc == 1) {
                                    dataAppend += "<td>" + tableData.usl_1_impendance + "</td>";
                                    dataAppend += "<td>" + tableData.nominal_1_impendance + "</td>";
                                    dataAppend += "<td>" + tableData.lsl_1_impendance + "</td>";
                                    dataAppend += "<td>" + tableData.usl_2_impendance + "</td>";
                                    dataAppend += "<td>" + tableData.nominal_2_impendance + "</td>";
                                    dataAppend += "<td>" + tableData.lsl_2_impendance + "</td>";
                                    dataAppend += "<td>" + tableData.usl_1_bf_igbt + "</td>";
                                    dataAppend += "<td>" + tableData.nominal_1_bf_igbt + "</td>";
                                    dataAppend += "<td>" + tableData.lsl_1_bf_igbt + "</td>";
                                    dataAppend += "<td>" + tableData.usl_2_bf_igbt + "</td>";
                                    dataAppend += "<td>" + tableData.nominal_2_bf_igbt + "</td>";
                                    dataAppend += "<td>" + tableData.lsl_2_bf_igbt + "</td>";
                                    dataAppend += "<td>" + tableData.usl_1_bf_mid_stitch + "</td>";
                                    dataAppend += "<td>" + tableData.nominal_1_bf_mid_stitch + "</td>";
                                    dataAppend += "<td>" + tableData.lsl_1_bf_mid_stitch + "</td>";
                                    dataAppend += "<td>" + tableData.usl_2_bf_mid_stitch + "</td>";
                                    dataAppend += "<td>" + tableData.nominal_2_bf_mid_stitch + "</td>";
                                    dataAppend += "<td>" + tableData.lsl_2_bf_mid_stitch + "</td>";
                                    dataAppend += "<td>" + tableData.usl_1_bf_lead + "</td>";
                                    dataAppend += "<td>" + tableData.nominal_1_bf_lead + "</td>";
                                    dataAppend += "<td>" + tableData.lsl_1_bf_lead + "</td>";
                                    dataAppend += "<td>" + tableData.usl_2_bf_lead + "</td>";
                                    dataAppend += "<td>" + tableData.nominal_2_bf_lead + "</td>";
                                    dataAppend += "<td>" + tableData.lsl_2_bf_lead + "</td>";
                                }
                                dataAppend += "</tr>";
                            });

                            $(".historyData").append(dataAppend);
                            $('#macIDDownload').modal({
                                backdrop: 'static',
                                keyboard: false,
                                show: true
                            });

                            $(document).ready(function () {
                                $('.downloadTable').DataTable({
                                    "ordering": false,
                                    paging: true,
                                    dom: 'Bfrtip',
                                    buttons:
                                    [
                                        {
                                            extend: 'excel', title: '', text: 'Export to Excel', className: 'mb-1', filename: function () {
                                                var d = new Date();
                                                return 'PROMIS_ASSY' + d;
                                            }
                                        },
                                    ]
                                });
                            });
                        });
                });
            }
        );

        $(function () {
            $('#keywords').tablesorter();
        });

        $(document).click(".eol", function () {
            $("a.eol").attr("href", eol_url)
        });
        $(document).click(".fol", function () {
            $("a.fol").attr("href", fol_url)
        });

        $(".download").on("click", function () {
            $.post(
                base_url + "promis/get_machine_id",
                function (data) {
                    console.log(data);
                });
            $('#downloadModal').modal({
                backdrop: 'static',
                keyboard: false,
                show: true
            });

            $(document).ready(function () {
                $('.downloadTable').DataTable();
            });

        });

        $(".tableAppendClose").on("click", function () {
           
            $(".tableRemove").remove();
        });
    }
});




function DisplayFOLData(data) {
    var dateTime = new Date($.now());
    var display = "";
    var style = "";
    var text_color = "";

    //('yyyy-MM-dd HH:mm');
    $.each(data, function (i, FOLData) {

        function convertMS(milliseconds) {
            var day, hour, minute, seconds;
            seconds = Math.floor(milliseconds / 1000);
            minute = Math.floor(seconds / 60);
            seconds = seconds % 60;
            hour = Math.floor(minute / 60);
            minute = minute % 60;
            day = Math.floor(hour / 24);
            hour = hour % 24;
            return {
                day: day,
                hour: hour,
                minute: minute,
                seconds: seconds
            };
        }
        //$difference = $daysout->format((($daysout->d)*24)+$daysout->h+$mins);

        var date = new Date(FOLData.file_datetime);
        var Date1 = date.getTime();
        var Date2 = dateTime.getTime();
        //var diff = Date2 - Date1;

        //var mins = diff / 60 / 60;

        var hours = Math.abs(date - dateTime) / 36e5;

        var diff = Math.abs(new Date(dateTime) - new Date(date));
        var converted = convertMS(diff);
        var minutes = Math.floor((diff / 1000) / 60);
        var mins = minutes / 60;

        var final = ((converted.day * 24) + (converted.hour + mins));

        //////////////////////////////////////////////////////////
        function msToTime(duration) {
            var milliseconds = parseInt((duration % 1000) / 100)
                , seconds = parseInt((duration / 1000) % 60)
                , minutes = parseInt((duration / (1000 * 60)) % 60)
                , hours = parseInt((duration / (1000 * 60 * 60)) % 24);

            hours = (hours < 10) ? "0" + hours : hours;
            minutes = (minutes < 10) ? "0" + minutes : minutes;
            seconds = (seconds < 10) ? "0" + seconds : seconds;

            //return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
            return hours + ":" + minutes;
        }
        var ms2time = msToTime(diff);


        //////////////////////////////////////////////////////////

        function timeConversion(millisec) {

            var seconds = (millisec / 1000).toFixed(1);

            var minutes = (millisec / (1000 * 60)).toFixed(1);

            var hours = (millisec / (1000 * 60 * 60)).toFixed(2);

            var days = (millisec / (1000 * 60 * 60 * 24)).toFixed(1);

            return hours;
        }

        var sample = timeConversion(diff);


        //////////////////////////////////////////////////////////

       
        
        if (FOLData.Curr_Status == "RUNNING PRODUCTION" || FOLData.Curr_Status == "SPEEDLOSS DUE TO HANDLER" || FOLData.Curr_Status == "SPEEDLOSS DUE TO TESTER" || FOLData.Curr_Status == "SPEEDLOSS DUE TO HARDWARE"
		|| FOLData.Curr_Status == "100% RETEST" || FOLData.Curr_Status == "RESCREEN") { //Green - PRODUCTION
            style = "background-color: #00ff00;";
            text_color = "blue";
        } else if (FOLData.Curr_Status == "LSG REPAIR" || FOLData.Curr_Status == "LSG WAIT" || FOLData.Curr_Status == "LSG ISOLATION" || FOLData.Curr_Status == "TESTER REPAIR" || FOLData.Curr_Status == "TESTER WAIT" || FOLData.Curr_Status == "TESTER MAJOR BREAKDOWN"
        || FOLData.Curr_Status == "HANDLER MAJOR BREAKDOWN" || FOLData.Curr_Status == "HANDLER REPAIR" || FOLData.Curr_Status == "TESTER MAJOR BREAKDOWN" || FOLData.Curr_Status == "PROCESS ENGG WAIT" || FOLData.Curr_Status == "SETUP WAIT"
        || FOLData.Curr_Status == "HARDWARE REPAIR/HW BREAKDOWN" || FOLData.Curr_Status == "HARDWARE REPAIR/HW BREAKDOWN" || FOLData.Curr_Status == "HARDWARE WAIT" || FOLData.Curr_Status == "WAITING YIELD VERIFICATION (YIG)"
        || FOLData.Curr_Status == "FOI" || FOLData.Curr_Status == "QUANTIFICATION") { //Red - UNSCHEDULED
            style = "background-color: #ff3333;";
            text_color = "blue";
        } else if (FOLData.Curr_Status == "MATDOWN") { //Blue - MATDOWN
            style = "background-color: #5555ff;";
            text_color = "white";
        } else if (FOLData.Curr_Status == "NEW SETUP") { //Yellow - SETUP
            style = "background-color: #ffff55;";
            text_color = "blue";
        } else if (FOLData.Curr_Status == "HANDLER PM" || FOLData.Curr_Status == "TESTER PM/CAL" || FOLData.Curr_Status == "PRODUCT ENGG SCHED" || FOLData.Curr_Status == "SETUP CONVERSION" || FOLData.Curr_Status == "EBR DEVICE QUAL"
        || FOLData.Curr_Status == "HANDLER IMPROVEMENT PROJECTS" || FOLData.Curr_Status == "LRT SCHEDULED" || FOLData.Curr_Status == "WEEKLY TEMP CHECK" || FOLData.Curr_Status == "PM BURN IN_LRT") { //Pink - SCHEDULED
            style = "background-color: #ff55ff;";
            text_color = "blue";
        } else { //Grey - SHUTDOWN, IDLE
            style = "background-color: #bbbbbb;";
            text_color = "blue";
        }

        display += "<tr class='hover table-refresh' id='eolID' style='cursor: pointer;" + style + "' data-machine-id='" + FOLData.id + "'>";
        display += "<td class='lalign table-refresh' data-machine-id=" + FOLData.id + ">" + FOLData.file_datetime + "</td>";
        display += "<td class='tsID table-refresh' data-machine-id=" + FOLData.id + "><p><span style='color:" + text_color + "' class='idHistory' data-history-id='" + FOLData.TesterID + "' data-has-ipcc='" + FOLData.has_IPCC + "'>" + FOLData.TesterID + "</span></p></td>";
        display += "<td class='tsPF table-refresh' data-machine-id=" + FOLData.id + ">" + FOLData.TesterPF + "</td>";
        display += "<td class='device table-refresh' data-machine-id=" + FOLData.id + ">" + FOLData.device + "</td>";
        display += "<td class='pkgType table-refresh' data-machine-id=" + FOLData.id + ">" + FOLData.pkg_type + "</td>";
        display += "<td class='lot table-refresh' data-machine-id=" + FOLData.id + ">" + FOLData.Lot_Name + "</td>";
        display += "<td class='curStats table-refresh' data-machine-id=" + FOLData.id + ">" + FOLData.Curr_Status + "</td>";
        display += "<td class='owner table-refresh' data-machine-id=" + FOLData.id + ">" + FOLData.Status_Owner + "</td>";
        display += "<td class='table-refresh' data-machine-id=" + FOLData.id + ">" + sample + "</td>";
        display += "<td class='table-refresh' data-machine-id=" + FOLData.id + ">" + FOLData.Comments + "</td>";
        display += "<td class='table-refresh' data-machine-id=" + FOLData.id + ">" + FOLData.Who + "</td>";
        display += "</tr>";

    });



    if (base_url + "promis/eolStatus" == window.location.href) {
        $(".tbodyEol").html(display);
    }


    else if (base_url + "promis/folStatus" == window.location.href) {
        $(".tbodyFol").html(display);
    }
}