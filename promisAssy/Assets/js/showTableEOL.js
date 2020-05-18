$(document).ready(function () {
    
    if (base_url + "promis/eolStatus" == window.location.href) {
       
        $.post(
            base_url + "promis/get_eol_data",
            function (data) {

                DisplayEOLData(data);

                $(document).ready(function () {
                    $('.custom_table').DataTable({
                        paging: false,
                        info: false,
                        searching: false,
                        fixedHeader: true,
                        "order": []
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

    }
});




function DisplayEOLData(data) {

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
        console.log(date);
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

        display += "<tr class='hover table-refresh' id='eolID' style='cursor: pointer;" + style + "' data-machine-id="+ FOLData.id +">";
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

        $(".tbodyEol").html(display);
   
}