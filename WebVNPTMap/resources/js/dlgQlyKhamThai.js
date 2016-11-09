var modeg = -1; // -1: Jbox tat; 0: Jbox them; 1: Jbox sua du lieu;
var checkRequired = 0;
var v_id_nhan_khau = '';
$(function () {

    $(".validate").keydown(function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                (e.keyCode == 65 && e.ctrlKey === true) ||
                (e.keyCode == 67 && e.ctrlKey === true) ||
                (e.keyCode == 88 && e.ctrlKey === true) ||
                (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

    $("#dtngaykham").datepicker();
    $("#dtngaykham").datepicker("option", "dateFormat", "dd/mm/yy");

    $("#dtngaykinhcuoi").datepicker();
    $("#dtngaykinhcuoi").datepicker("option", "dateFormat", "dd/mm/yy");

    $("#dtdukienngaysinh").datepicker();
    $("#dtdukienngaysinh").datepicker("option", "dateFormat", "dd/mm/yy");

    var dlgCfDelete = new jBox('Modal', {
        title: 'Xác nhận xóa thông tin khám thai',
        overlay: true,
        content: $('#dlgCfDelete'),
        draggable: 'title',
        position: {
            my: "center top",
            at: "center top",
            of: window
        }
    });

    khamthai_dialog = $("#qlKhamThai").dialog({
        autoOpen: false,
        resizable: true,
        width: 800,
        position: {
            my: "center top",
            at: "center top",
            of: window
        }
    });

    $("#exitKT").click(function () {
        khamthai_dialog.dialog("close");
    });

    $("#deleteKT").click(function () {
        dlgCfDelete.open();
    });

    $("#dlgCance").click(function () {
        dlgCfDelete.close();
    });

    $("#dlgSubmit").click(function (evt) {
        var str = [$("#id_kt_thong_tin").val()];
        url = "xoattkhamthai";
        $.post(url, {
            url: convertArray(str)
        }).done(function (data) {
            if (data != "-1") {
                jAlert("Xóa thành công!", 'Thông báo');
                dlgCfDelete.close();
                khamthai_dialog.dialog("close");
            } else {
                jAlert("Lỗi xóa thông tin!", 'Thông báo');
            }
        });
    });

    $("#saveKT")
            .click(
                    function () {
                        checkdulieu();
                        if (checkRequired == 0) {
                            var ID_KT_THONG_TIN = $("#id_kt_thong_tin").val();
                            var LAN_KHAM = $("#txtLanKham").val();
                            var NGAY_KHAM = $("#dtngaykham").val();
                            var ID_NOI_KHAM = $("#noikham").val();
                            var NGAY_KINH_CUOI = $("#dtngaykinhcuoi").val();
                            var LAN_CO_THAI = $("#txtlanthaithu").val();
                            var TIEU_SU_SINH_DE = $("#txttieususk").val();
                            var SK_TUAN_THAI = $("#txttuanthai").val();
                            var SK_DU_KIEN_NGAY_SINH = $("#dtdukienngaysinh")
                                    .val();
                            var SK_CHIEU_CAO_TU_CUNG = $("#txtchieucaotucung")
                                    .val();
                            var SK_VONG_BUNG = $("#txtvongbung").val();
                            var SK_KHUNG_CHAU = $("#txtkhungchau").val();
                            var SK_THIEU_MAU = $("#cbthieumau").val();
                            var SK_TIEN_LUONG_DE = $("#txttienluongde").val();
                            var SK_SO_MUI_UV = $("#txtsomuiUVDT").val();
                            var SK_UONG_SAT = $("#cbuongviensat").val();
                            var SK_TIM_THAI = $("#txttimthai").val();
                            var SK_NGOI_THAI = $("#txtngoithai").val();
                            var SK_NGUOI_KHAM = $("#txtnguoikham").val();
                            var SK_GHI_CHU = $("#txtghichu").val();
                            var ID_DON_VI = $("#id_don_vi").val();
                            var ID_TIEPNHAN = $("#id_tiep_nhan").val();
                            var MA_BENH_NHAN = $("#ma_benh_nhan").val();
                            var PROTEIN_NIEU = $("#cbprotein").val();
                            var XN_HIV = $("#cbXNHIV").val();
                            var XN_KHAC = $("#cbXNKhac").val();
                            var str = [ID_KT_THONG_TIN, ID_DON_VI, LAN_KHAM,
                                NGAY_KHAM, TIEU_SU_SINH_DE, NGAY_KINH_CUOI,
                                LAN_CO_THAI, SK_TUAN_THAI,
                                SK_DU_KIEN_NGAY_SINH, SK_CHIEU_CAO_TU_CUNG,
                                SK_VONG_BUNG, SK_KHUNG_CHAU, SK_THIEU_MAU,
                                SK_TIEN_LUONG_DE, SK_SO_MUI_UV,
                                SK_UONG_SAT, SK_TIM_THAI, SK_NGOI_THAI,
                                SK_NGUOI_KHAM, SK_GHI_CHU, ID_NOI_KHAM,
                                ID_TIEPNHAN, MA_BENH_NHAN, PROTEIN_NIEU, XN_HIV, XN_KHAC, '0'];
                            if (modeg == 0) {
                                url = "themchitietkhamthai";
                                $
                                        .post(url, {
                                            url: convertArray(str)
                                        })
                                        .done(
                                                function (data) {
                                                    if (data != "-1") {
                                                        // $("#id_ho_khau1").val(data);
                                                        jAlert(
                                                                "Thêm thành công!",
                                                                'Thông báo');
                                                        khamthai_dialog
                                                                .dialog("close");
                                                    } else {
                                                        jAlert(
                                                                "Lỗi thêm chi tiết khám thai !",
                                                                'Thông báo');
                                                    }
                                                });
                            } else {
                                url = "suachitietkhamthai";
                                $
                                        .post(url, {
                                            url: convertArray(str)
                                        })
                                        .done(
                                                function (data) {
                                                    if (data != "-1") {
                                                        // $("#id_ho_khau1").val(data);
                                                        jAlert(
                                                                "Sửa thành công!",
                                                                'Thông báo');
                                                        khamthai_dialog
                                                                .dialog("close");
                                                    } else {
                                                        jAlert(
                                                                "Lỗi sửa chi tiết khám thai !",
                                                                'Thông báo');
                                                    }
                                                });
                            }
                        }
                    });
});
function gandulieu(id_tiep_nhan, ma_benh_nhan, id_don_vi) {
    $("#id_tiep_nhan").val(id_tiep_nhan);
    $("#ma_benh_nhan").val(ma_benh_nhan);
    $("#id_don_vi").val(id_don_vi);
    var arr = [id_tiep_nhan, id_don_vi, "0"];
    var url1 = "chitietkhamthai?url=" + convertArray(arr);
    $.getJSON(url1, function (result) {
        $.each(result, function (i, field) {
            // lay ra toan bo thong tin ho khau;
            $("#id_kt_thong_tin").val(field.ID_KT_THONG_TIN);
            $("#txtLanKham").val(field.LAN_KHAM);
            $("#dtngaykham").val(field.NGAY_KHAM);
            $("#noikham").val(field.ID_NOI_KHAM);
            $("#dtngaykinhcuoi").val(field.NGAY_KINH_CUOI);
            $("#txtlanthaithu").val(field.LAN_CO_THAI);
            $("#txttieususk").val(field.TIEU_SU_SINH_DE);
            $("#txttuanthai").val(field.SK_TUAN_THAI);
            $("#dtdukienngaysinh").val(field.SK_DU_KIEN_NGAY_SINH);
            $("#txtchieucaotucung").val(field.SK_CHIEU_CAO_TU_CUNG);
            $("#txtvongbung").val(field.SK_VONG_BUNG);
            $("#txtkhungchau").val(field.SK_KHUNG_CHAU);
            $("#cbthieumau").val(field.SK_THIEU_MAU);
            $("#txttienluongde").val(field.SK_TIEN_LUONG_DE);
            $("#txtsomuiUVDT").val(field.SK_SO_MUI_UV);
            $("#cbuongviensat").val(field.SK_UONG_SAT);
            $("#txttimthai").val(field.SK_TIM_THAI);
            $("#txtngoithai").val(field.SK_NGOI_THAI);
            $("#txtnguoikham").val(field.SK_NGUOI_KHAM);
            $("#txtghichu").val(field.SK_GHI_CHU);
            $("#cbprotein").val(field.PROTEIN_NIEU);
            $("#cbXNHIV").val(field.XN_HIV);
            $("#cbXNKhac").val(field.XN_KHAC);
            if ($("#id_kt_thong_tin").val() == '') {
                modeg = 0;
                $("#deleteKT").removeClass("button_shadow");
                $("#deleteKT").prop('hidden', true);
            } else {
                modeg = 1;
                $("#deleteKT").addClass("button_shadow");
                $("#deleteKT").prop('hidden', false);
            }
        });
    });
}
$("#khamthai").click(function () {
    if ($("#idtiepnhan").val() == '') {
        jAlert("Mã lần khám không tồn tại !", 'Thông báo');
        return;
    }
    if ($("#mayte").val() == '') {
        jAlert("Mã bệnh nhân không tồn tại!", 'Thông báo');
        return;
    }
    gandulieu($("#idtiepnhan").val(), $("#mayte").val(), dvtt);
    khamthai_dialog.dialog("open");
});
function checkdulieu() {
    checkRequired = 0;
    if ($("#txtLanKham").val() == '') {
        checkRequired = 1;
        jAlert("Lần khám không được để trống !", 'Thông báo');
        // $.simplyToast('Lần khám không được để trống', 'danger');
        return;
    }
    if ($("#dtngaykham").val() == '') {
        checkRequired = 1;
        jAlert("Ngày khám không được để trống !", 'Thông báo');
        // $.simplyToast('Ngày khám không được để trống', 'danger');
        return;
    }

    if ($("#txtlanthaithu").val() == '') {
        checkRequired = 1;
        jAlert("Lần có thai thứ không được để trống !", 'Thông báo');
        // $.simplyToast('Lần có thai thứ không được để trống', 'danger');
        return;
    }
    if ($("#txttuanthai").val() == '') {
        checkRequired = 1;
        jAlert("Tuần thai không được để trống !", 'Thông báo');
        // $.simplyToast('Tuần thai không được để trống', 'danger');
        return;
    }
    if ($("#cbthieumau").val() == '') {
        checkRequired = 1;
        jAlert("Thiếu máu không được để trống !", 'Thông báo');
        // $.simplyToast('Thiếu máu không được để trống', 'danger');
        return;
    }

}
