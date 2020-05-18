$(document).on("click", "#folID", function () {

    var DataId = $(this).attr("data-machine-id");

    $('#myModal').modal({
        backdrop: 'static',
        keyboard: false,
        show: true
    })
    showData(DataId);
});

$(document).on("click", "#eolID td:not(:nth-child(2))", function () {
    $("#tempID").val($(this).attr("data-machine-id"));
    var DataId = $("#tempID").val();
  
    $('#myModal').modal({
        backdrop: 'static',
        keyboard: false,
        show: true
    })
    showData(DataId);
});

function showData(DataId) {
    
    $.post( //on ready
            base_url + "promis/show_data",
            {
                "id": DataId
            },
            function (data) {

                if (data.has_IPCC == "0" || data.IPCC_reset == "1") {
                    $(".ipcc_control").prop('disabled', true);
                }

                else {
                    $(".ipcc_control").prop('disabled', false);
                }

                $.post(
                    base_url + "promis/check_track_by_machine",
                    {
                        "machineID": data.Tester_ID,
                    },
                    function (track_by_machine) {
                        $.post(
                        
                        base_url + "promis/check_track_by_lot",
                        {
                            "lotNo": data.Lot_Name,
                        },
                        function (track_by_lot) {
                            $("#ipcc-value").val(data.has_IPCC);
                            $("#ipcc-reset").val(data.IPCC_reset);
                            var status_owner_track = $("#status_owner_track").val();
                            var status_track = $("#status_track").val();
                            var machine = $("#machineID").val();
                            //$(".setup_flg").val(data.setup_flg);


                            //track data
                            if ((track_by_machine.track_in == 1 && track_by_machine.track_out == 0) || (track_by_machine.track_in == 1 && track_by_machine.track_out == 0)) { // track check using machine ID
                                //MACHINE STILL TRACKED IN
                                console.log('machine tracked in');
                                if ($("#stsOwner").val() == "MFG" && $("#stsDes").val() == "RUNNING PRODUCTION") {
                                    $('#track_in').hide();
                                    $("#lotNo").prop('disabled', true);
                                    $("#prodName").prop('disabled', true);
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

                                    console.log('0');
                                    $('#track_in').hide();
                                    $('#track_out').hide();
                                    $("#lotNo").prop('disabled', true);
                                    $('.track').attr('value', '');

                                }
                            }
                            else if ((track_by_lot.track_in == 1 && track_by_lot.track_out == 0) || (track_by_lot.track_in == 1 && track_by_lot.track_out == 0)) {
                                //LOT STILL TRACKED IN
                                console.log('lot tracked in');
                                if ($("#stsOwner").val() == "MFG" && $("#stsDes").val() == "RUNNING PRODUCTION") {
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
                                //CAN TRACK IN BY MACHINE
                                console.log('can track in by machine');
                                if ($("#stsOwner").val() == "MFG" && $("#stsDes").val() == "RUNNING PRODUCTION") {
                                    console.log('1');
                                    $('#track_in').show();
                                    $('#track_out').hide();
                                    $('.track').attr('value', '');

                                }
                                else {
                                    console.log('2');
                                    $('#track_in').hide();
                                    $('#track_out').hide();
                                }

                            }

                            else if ((track_by_lot.track_in == 1 && track_by_lot.track_out == 1) || (track_by_lot.track_in == null && track_by_lot.track_out == null)) {
                                //CAN TRACK IN BY LOT ID
                                console.log('can track in by lot id');
                                if ($("#stsOwner").val() == "MFG" && $("#stsDes").val() == "RUNNING PRODUCTION") {
                                    $('#track_in').show();
                                    $('#track_out').hide();
                                    $('.track').attr('value', '');
                                }

                                else {
                                    $('#track_in').hide();
                                    $('#track_out').hide();
                                }
                            }

                            else {
                                //TRACK AVAILABLE
                                console.log('track available');
                                $('#track_in').hide();
                                $('#track_out').hide();
                            }
                        });
                    });

                ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                var StatusOwner = ''; //status owner
                $("#date").val(data.File_DateTime);
                $("#machinePlatform").val(data.TesterPF);
                $("#machineID").val(data.Tester_ID);
                $(".setup-to-qa-check").val(data.setup_to_qa);
                $(".qa-to-process-check").val(data.qa_to_process);

                StatusOwner += "<option class= 'stat_Owner' value='" + data.Status_Owner + "'>" + data.Status_Owner + "</option>";

                $.post( 
                    base_url + "promis/get_status_owner",
                    function (stsO) {
                        
                        $.each(stsO, function (i, StsOwner) {
                            if (StsOwner.owner == data.Status_Owner)//if the array data found a match it will only leave a black
                            {
                            }
                            else
                            {
                                StatusOwner += "<option class= 'stat_Owner' value='" + StsOwner.OWNER + "'>" + StsOwner.OWNER + "</option>";
                            }
                    });
                    $("#stsOwner").append(StatusOwner);
                    }
                );

                var stat = ''; //status
                stat += "<option class='status' value='" + data.Status_Desc + "'>" + data.Status_Desc + "</option>";
                $('#status_track').val(data.Status_Desc);
                $('#status_owner_track').val(data.Status_Owner);
                var stsOwner = data.Status_Owner;
                
                $.post( 
                    base_url + "promis/get_status",
                    {
                        "stsOwner": stsOwner
                    },
                    function (stsOwner) {
                        $.each(stsOwner, function (i, desc) {

                            if (desc.DESCRIPTION == data.Status_Desc)
                            {

                            }
                            else {
                                stat += "<option class='status' value='" + desc.DESCRIPTION + "'>" + desc.DESCRIPTION + "</option>";
                            }

                        });

                        $("#stsDes").append(stat);

                    }

                );

                var show_device = ''; //family
                show_device += "<option class='fam' value='" + data.Device + "'>" + data.Device + "</option>";

                $.post(
                    base_url + "promis/get_device",

                    function (device) {
                        $.each(device, function (i, family) {

                            if (family.New_Family == data.Device)
                            {
                                var family_name = data.Device;
                                var machineID = $("#machineID").val();
                                var machinePlatform = $('#machinePlatform').val();
                               
                                $.post( //uph
                                    base_url + "promis/get_uph_check",
                                    {
                                        "family": family_name,
                                        "machineID": machineID,

                                    },
                                    function (uph_byID) {
                                        
                                        if (uph_byID.uph == null)
                                        {
                                            
                                            $.post( 
                                                base_url + "promis/get_uph",
                                                {
                                                    "id": family_name,
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
                            }
                            else {
                                show_device += "<option class='fam' value='" + family.New_Family + "'>" + family.New_Family + "</option>";
                            }
                        });

                        $("#prodName").append(show_device);
                    }
                );

                $("#lotNo").val(data.Lot_Name); // lot no
                $(".process").val(data.process);
             
                var pkg_type = '' // pkg type

                pkg_type = "<option class='pkgType' value='" + data.pkg_type + "'>" + data.pkg_type + "</option>"
                $("#pkgType").append(pkg_type);
                console.log(data.Who_id);
                if (data.Who_id != "")
                {
                    $.post(
                       base_url + "promis/get_user",
                       function (usr) {
                           var users = '';
                           users += "<option class='user' data-user-id='" + data.Who_id + "' value='" + data.Who + "'>" + data.Who + "</option>";
                           $.each(usr, function (i, username) {
                               users += "<option class='user' data-user-id='" + username.id + "' value='" + username.email_address + "'>" + username.email_address + "</option>";
                           });

                           $("#user").append(users);

                       }
                   );
                }
                else
                {
                    $.post(
                       base_url + "promis/get_user",
                       function (usr) {
                           var users = '';
                           $.each(usr, function (i, username) {
                               users += "<option class='user' data-user-id='" + username.id + "' value='" + username.email_address + "'>" + username.email_address + "</option>";
                           });

                           $("#user").append(users);

                       }
                   );
                   
                }
                $("#usl_1_impendance").val(data.usl_1_impendance);
                $("#nominal_1_impendance").val(data.nominal_1_impendance);
                $("#lsl_1_impendance").val(data.lsl_1_impendance);
                $("#usl_2_impendance").val(data.usl_2_impendance);
                $("#nominal_2_impendance").val(data.nominal_2_impendance);
                $("#lsl_2_impendance").val(data.lsl_2_impendance);
                $("#usl_1_bf_igbt").val(data.usl_1_bf_igbt);
                $("#nominal_1_bf_igbt").val(data.nominal_1_bf_igbt);
                $("#lsl_1_bf_igbt").val(data.lsl_1_bf_igbt);
                $("#usl_2_bf_igbt").val(data.usl_2_bf_igbt);
                $("#nominal_2_bf_igbt").val(data.nominal_2_bf_igbt);
                $("#lsl_2_bf_igbt").val(data.lsl_2_bf_igbt);
                $("#usl_1_bf_mid_stitch").val(data.usl_1_bf_mid_stitch);
                $("#nominal_1_bf_mid_stitch").val(data.nominal_1_bf_mid_stitch);
                $("#lsl_1_bf_mid_stitch").val(data.lsl_1_bf_mid_stitch);
                $("#usl_2_bf_mid_stitch").val(data.usl_2_bf_mid_stitch);
                $("#nominal_2_bf_mid_stitch").val(data.nominal_2_bf_mid_stitch);
                $("#lsl_2_bf_mid_stitch").val(data.lsl_2_bf_mid_stitch);
                $("#usl_1_bf_lead").val(data.usl_1_bf_lead);
                $("#nominal_1_bf_lead").val(data.nominal_1_bf_lead);
                $("#lsl_1_bf_lead").val(data.lsl_1_bf_lead);
                $("#usl_2_bf_lead").val(data.usl_2_bf_lead);
                $("#nominal_2_bf_lead").val(data.nominal_2_bf_lead);
                $("#lsl_2_bf_lead").val(data.lsl_2_bf_lead);

            }
        );

};


$(document).on("click", "button.close", function () {

    $('option').remove('.fam');
    $('option').remove('.stat_Owner');
    $('option').remove('.status');
    $('option').remove('.pkgType');
    $('option').remove('.uph_select');
    $('option').remove('#user');
    $('#track_in').prop('disabled', false);
    $('#track_out').prop('disabled', false);
    $('#prodName').prop('disabled', false);
    $('#lotNo').prop('disabled', false);
    $('.track').attr('value', '');

});

