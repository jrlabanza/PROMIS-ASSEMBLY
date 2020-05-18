$(document).on("change", "#stsOwner", function() {
    var stsOwner = $("#stsOwner").val();
    $('option').remove('.status');

    $.post(
        base_url + "promis/get_status",
        {
            "stsOwner": stsOwner
        },
        function (data)
        {

            var StatusDesc = '';
            //stsDes
            StatusDesc += "<option class='status' value=''></option>";
            $.each(data, function (i, status) {
                //StatusDesc += "<option class='status' value='" + status.description + "'>" + status.description + "</option>";
                StatusDesc += "<option class='status' value='" + status.DESCRIPTION + "'>" + status.DESCRIPTION + "</option>";
            });
            
            $("#stsDes").append(StatusDesc);

        }

    );


});

$(document).on("change", "#stsDes", function () {

    var machineID = $("#machineID").val();
    var stsOwner = $("#stsOwner").val();
    var machineID = $("#machineID").val();
    var lotNo = $("#lotNo").val();
    var status_owner_track = $("#status_owner_track").val();
    var status_track = $("#status_track").val();
    var machine = $("#machineID").val();

    $.post(
    base_url + "promis/check_track_by_machine",
    {
        "machineID": machineID,
    },
    function (track_by_machine) {
        $.post(

        base_url + "promis/check_track_by_lot",
        {
            "lotNo": lotNo,
        },
        function (track_by_lot) {
            //track data
            if ((track_by_machine.track_in == 1 && track_by_machine.track_out == 0) || (track_by_machine.track_in == 1 && track_by_machine.track_out == 0)) { // track check using machine ID
                //machine still tracked
                if ($("#stsDes").val() == "RUNNING PRODUCTION") {
                    console.log('this');
                    $('#track_in').hide();
                    if (track_by_lot.machine == machine) {
                        $('#track_out').show();
                        $('#track_in').hide();
                        $("#prodName").prop('disabled', true);
                    }
                    else {
                        $('#track_out').hide();
                    }

                    $('.track').attr('value', '');
                    //carrier/cover value checker

                }
                else {

                    $('#track_in').hide();
                    $('#track_out').hide();

                }
            }
            else if ((track_by_lot.track_in == 1 && track_by_lot.track_out == 0) || (track_by_lot.track_in == 1 && track_by_lot.track_out == 0)) {
                //lot still tracked in

                if ($("#stsDes").val() == "RUNNING PRODUCTION") {
                    $('#track_in').hide();
                    if (track_by_lot.machine == machine) {
                        $('#track_out').show();
                        $('#track_in').hide();
                    }
                    else {
                        $('#track_out').hide();
                    }
                    $('.track').attr('value', '');
                }

                else {

                    $('#track_in').hide();
                    $('#track_out').hide();

                }
            }

            else if ((track_by_machine.track_in == 1 && track_by_machine.track_out == 1) || (track_by_machine.track_in == null && track_by_machine.track_out == null)) {
                //can track in by machine
                if ($("#stsDes").val() == "RUNNING PRODUCTION") {
                    $('#track_in').show();
                    $('#track_out').hide();
                    $('.track').attr('value', '');
                }

                else {
                    $('#track_in').hide();
                    $('#track_out').hide();
                }
            }

            else if ((track_by_lot.track_in == 1 && track_by_lot.track_out == 1) || (track_by_lot.track_in == null && track_by_lot.track_out == null)) {
                //can track in by lot id
                if ($("#stsDes").val() == "RUNNING PRODUCTION") {
                    $('#track_in').show();
                    $('#track_out').hide();
                    $('.track').attr('value', '');

                }

            }
            else {
                //alert("track available")
                $('#track_in').hide();
                $('#track_out').hide();

            }
        });
    });
});

$(document).on("change", "#prodName", function () {
    $('option').remove('.pkgType');
    $('option').remove('.uph_select');
    $(".ipcc_control").prop('disabled', false);
    var id = $(this).val();
    var machineID = $("#machineID").val();
    var machinePlatform = $('#machinePlatform').val();
    $('option').remove('.stat');

    $.post(
         base_url + "promis/get_package_data",
         {
             "id": id
         },
         function (data) {
             display = "<option class='pkgType' value='" + data.New_Package + "'>" + data.New_Package + "</option>"
             $("#pkgType").append(display);
             //stsDes
         }
     );

    //$.post( // show option 1 uph // for future modification
    //    base_url + "promis/get_uph",
    //    {
    //        "id": id,
    //        "machinePlatform": machinePlatform,

    //    },
    //    function (uph) {
    //        var show_uph = "";
    //        show_uph = "<option class='uph_select' value='" + uph.uph + "'>" + uph.uph + "</option>";
    //        $("#uph_select").append(show_uph);

    //    }
    // );

    $.post( // show option 1 uph // for future modification
         base_url + "promis/get_uph_check",
         {
             "family": id,
             "machineID": machineID,

         },
         function (uph_byID) {

             if (uph_byID.uph == null) {

                 $.post( // show option 1 uph // for future modification

                     base_url + "promis/get_uph",
                     {
                         "id": id,
                         "machinePlatform": machinePlatform,

                     },
                     function (uph) {

                         var show_uph = "";

                         if (uph.uph != null) {
                             show_uph = "<option class='uph_select' value='" + uph.uph + "'>" + uph.uph + "</option>";
                         }

                         else {
                             show_uph = "<option class='uph_select' value=''></option>";
                         }
                         $("#uph_select").append(show_uph);

                     }
                 );
             }

             else {
                 var show_uph = "";
                 show_uph = "<option class='uph_select' value='" + uph_byID.uph + "'>" + uph_byID.uph + "</option>";
                 $("#uph_select").append(show_uph);
             }
         }
     );


});