$(document).ready(function () {
    var location = $(".loc").val();
    
    $.post(
            //base_url + "promis/get_fol_data",
            base_url + "promis/show_process",
            {
                "location": location
            },
            function (data) {
                display = '';
                $.each(data, function (i, prodData) {
                    display += "<option value='" + prodData.process + "'>" + prodData.process + "</option>";
                });

                $("#pkgLine").append(display);
             }
        );

    $.post(
            //base_url + "promis/get_fol_data",
            base_url + "promis/show_statusOwner",
            function (data) {
                display = '';
                $.each(data, function (i, statusOwnerData) {
                    if (statusOwnerData.owner == "IT Sched DT")
                    {
                        display += "<option value='" + statusOwnerData.owner + "'>" + "IT" + "</option>";
                    }
                    else
                    {
                        display += "<option value='" + statusOwnerData.owner + "'>" + statusOwnerData.owner + "</option>";
                    }
                    
                });

                $("#statusOwner").append(display);

            }
        );

    $.post(
            //base_url + "promis/get_fol_data",
            base_url + "promis/show_testerPF",
            {
                "location": location
            },
            function (data) {
                display = '';
                $.each(data, function (i, testerPFData) {
                    display += "<option value='" + testerPFData.TesterPF + "'>" + testerPFData.TesterPF + "</option>";
                });

                $("#tstpf").append(display);

            }
        );

    $.post(
            //base_url + "promis/get_fol_data",
            base_url + "promis/show_testerID_onload",
            {
                "location": location
            },
            function (data) {
                display = '';
                $.each(data, function (i, testerID) {
                    display += "<option class='tstID' value='" + testerID.TesterID + "'>" + testerID.TesterID + "</option>";
                });

                $("#tstID").append(display);

            }
        );

    $("#tstpf").on("change", function () {
        $('option').remove('.tstID');
        var pfid = $(this).val();
        if ($("#tstpf").val() == "")
        {
            $.post(
                //base_url + "promis/get_fol_data",
                base_url + "promis/show_testerID_onload",
                {
                    "location": location
                },
                function (data) {
                    display = '';
                    $.each(data, function (i, testerID) {
                        display += "<option class='tstID' value='" + testerID.TesterID + "'>" + testerID.TesterID + "</option>";
                    });

                    $("#tstID").append(display);

                }
            );
        }
        else
        {
            $.post(
                base_url + "promis/show_testerID",
                { "pfid": pfid },
                function (data) {
                    display = '';
                    $.each(data, function (i, TesterID) {
                        display += "<option  class='tstID' value='" + TesterID.TesterID + "'>" + TesterID.TesterID + "</option>";

                    });
                    $('#tstID').append(display);
                }

            );
        }

        
    });

    $("#pkgLine").on("change", function () {
        $('option').remove('.tstID');
        var process = $(this).val();
        if (process == "")
        {
            $.post(
                //base_url + "promis/get_fol_data",
                base_url + "promis/show_testerID_onload",
                {
                    "location": location
                },
                function (data) {
                    display = '';
                    $.each(data, function (i, testerID) {
                        display += "<option class='tstID' value='" + testerID.TesterID + "'>" + testerID.TesterID + "</option>";
                    });

                    $("#tstID").append(display);

                }
            );
        }
            $.post(
                //base_url + "promis/get_fol_data",
                base_url + "promis/show_testerID_from_process",
                {
                    "process": process
                },
                function (data) {
                    display = '';
                    $.each(data, function (i, testerID) {
                        display += "<option class='tstID' value='" + testerID.TesterID + "'>" + testerID.TesterID + "</option>";
                    });

                    $("#tstID").append(display);

                }
            );
    });
    
});

$("#pkgLine").on("change",function() {//pkgline
	var value = $("#pkgLine").val().toLowerCase();
	$(".tbody tr").filter(function() {
		$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
	});
});


$("#keyword").on("keypress",function(e) {
	if(e.which == 13) {
        
		var value = $(this).val().toLowerCase();
		$(".tbodyFol tr").filter(function() {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
        $(".tbodyEol tr").filter(function() {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
	}
});

$("#refresh").on("click", function(){
	$("#tstID").html("<select id='tstID'></select>")
	$(".filter").val("");
	$(".tbody tr").filter(function() {
		$(this).toggle($(this).text().toLowerCase().indexOf("") > -1)
	});
});

$(".filter").change(function () {
    var process = $("#pkgLine").val();
    var statOwner = $("#statusOwner").val();
    var tstpf = $("#tstpf").val();
    var tstID = $("#tstID").val();

    if (base_url + "promis/eolStatus" == window.location.href) {
        var controller_map = "promis/show_filtered_machine_EOL";
    }


    else if (base_url + "promis/folStatus" == window.location.href) {
        var controller_map = "promis/show_filtered_machine_FOL";
    }

    console.log(process);
    console.log(statOwner);
    console.log(tstpf);
    console.log(tstID);
    $.post(
            base_url + controller_map,
            {
                "process": process,
                "statOwner": statOwner,
                "machine": tstpf,
                "machineID": tstID
            },
            function (data) {
                $('tr').remove('.table-refresh');
                console.log(data);
                var dateTime = new Date($.now());
                var display = "";
                var style = "";


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

                        //if (seconds < 60) {
                        //    return seconds + " Sec";
                        //} else if (minutes < 60) {
                        //    return minutes + " Min";
                        //} else if (hours < 24) {
                        //    return hours + " Hrs";
                        //} else {
                        //    return days + " Days"
                        //}

                        return hours;
                    }

                    var sample = timeConversion(diff);


                    //////////////////////////////////////////////////////////



                    if (FOLData.Curr_Status == "RUNNING PRODUCTION" || FOLData.Curr_Status == "SPEEDLOSS DUE TO HANDLER" || FOLData.Curr_Status == "SPEEDLOSS DUE TO TESTER" || FOLData.Curr_Status == "SPEEDLOSS DUE TO HARDWARE"
                    || FOLData.Curr_Status == "100% RETEST" || FOLData.Curr_Status == "RESCREEN") { //Green - PRODUCTION
                        style = "background-color: #00ff00;";
                    } else if (FOLData.Curr_Status == "LSG REPAIR" || FOLData.Curr_Status == "LSG WAIT" || FOLData.Curr_Status == "LSG ISOLATION" || FOLData.Curr_Status == "TESTER REPAIR" || FOLData.Curr_Status == "TESTER WAIT" || FOLData.Curr_Status == "TESTER MAJOR BREAKDOWN"
                    || FOLData.Curr_Status == "HANDLER MAJOR BREAKDOWN" || FOLData.Curr_Status == "HANDLER REPAIR" || FOLData.Curr_Status == "TESTER MAJOR BREAKDOWN" || FOLData.Curr_Status == "PROCESS ENGG WAIT" || FOLData.Curr_Status == "SETUP WAIT"
                    || FOLData.Curr_Status == "HARDWARE REPAIR/HW BREAKDOWN" || FOLData.Curr_Status == "HARDWARE REPAIR/HW BREAKDOWN" || FOLData.Curr_Status == "HARDWARE WAIT" || FOLData.Curr_Status == "WAITING YIELD VERIFICATION (YIG)"
                    || FOLData.Curr_Status == "FOI" || FOLData.Curr_Status == "QUANTIFICATION") { //Red - UNSCHEDULED
                        style = "background-color: #ff3333;";
                    } else if (FOLData.Curr_Status == "MATDOWN") { //Blue - MATDOWN
                        style = "background-color: #5555ff;";
                    } else if (FOLData.Curr_Status == "NEW SETUP") { //Yellow - SETUP
                        style = "background-color: #ffff55;";
                    } else if (FOLData.Curr_Status == "HANDLER PM" || FOLData.Curr_Status == "TESTER PM/CAL" || FOLData.Curr_Status == "PRODUCT ENGG SCHED" || FOLData.Curr_Status == "SETUP CONVERSION" || FOLData.Curr_Status == "EBR DEVICE QUAL"
                    || FOLData.Curr_Status == "HANDLER IMPROVEMENT PROJECTS" || FOLData.Curr_Status == "LRT SCHEDULED" || FOLData.Curr_Status == "WEEKLY TEMP CHECK" || FOLData.Curr_Status == "PM BURN IN_LRT") { //Pink - SCHEDULED
                        style = "background-color: #ff55ff;";
                    } else { //Grey - SHUTDOWN, IDLE
                        style = "background-color: #bbbbbb;";
                    }

                    display += "<tr class='hover table-refresh' id='eolID' style='cursor: pointer;" + style + "' data-machine-id=" + FOLData.id + ">";
                    display += "<td class='lalign table-refresh'>" + FOLData.file_datetime + "</td>";
                    display += "<td class='tsID table-refresh'>" + FOLData.TesterID + "</td>";
                    display += "<td class='tsPF table-refresh'>" + FOLData.TesterPF + "</td>";
                    display += "<td class='device table-refresh'>" + FOLData.device + "</td>";
                    display += "<td class='pkgType table-refresh'>" + FOLData.pkg_type + "</td>";
                    display += "<td class='lot table-refresh'>" + FOLData.Lot_Name + "</td>";
                    display += "<td class='curStats table-refresh'>" + FOLData.Curr_Status + "</td>";
                    display += "<td class='owner table-refresh'>" + FOLData.Status_Owner + "</td>";
                    display += "<td class='table-refresh'>" + sample + "</td>";
                    display += "<td class='table-refresh'>" + FOLData.Comments + "</td>";
                    display += "<td class='table-refresh'>" + FOLData.Who + "</td>";
                    display += "</tr>";

                });

                if (base_url + "promis/eolStatus" == window.location.href) {
                    $(".tbodyEol").html(display);
                }


                else if (base_url + "promis/folStatus" == window.location.href) {
                    $(".tbodyFol").html(display);
                }
            }

     );
    
});