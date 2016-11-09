var modeg_pk = -1; // -1: Jbox tat; 0: Jbox them; 1: Jbox sua du lieu;
var checkRequired_pk = 0;
var v_id_nhan_khau = '';
$(function () {

    $(".validate").keydown(
            function (e) {
                if ($.inArray(e.keyCode, [46, 8, 9, 27, 13]) !== -1
                        || (e.keyCode == 65 && e.ctrlKey === true)
                        || (e.keyCode == 67 && e.ctrlKey === true)
                        || (e.keyCode == 88 && e.ctrlKey === true)
                        || (e.keyCode >= 35 && e.keyCode <= 39)) {
                    // let it happen, don't do anything
                    return;
                }
                // Ensure that it is a number and stop the keypress
                if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57))
                        && (e.keyCode < 96 || e.keyCode > 105)) {
                    e.preventDefault();
                }
            });

    var dlgCfDelete_PK = new jBox('Modal', {
        title: 'Xác nhận xóa thông tin khám phụ khoa',
        overlay: true,
        content: $('#dlgCfDelete_pk'),
        draggable: 'title',
        position: {
            my: "center top",
            at: "center top",
            of: window
        }
    });

    phukhoa_dialog = $("#qlPhuKhoa").dialog({
        autoOpen: false,
        resizable: true,
        width: 800,
        position: {
            my: "center top",
            at: "center top",
            of: window
        }
    });

    $("#exitPK").click(function () {
        phukhoa_dialog.dialog("close");
    });

    $("#deletePK").click(function () {
        dlgCfDelete_PK.open();
    });

    $("#dlgCance_pk").click(function () {
        dlgCfDelete_PK.close();
    });

    $("#dlgSubmit_pk").click(function (evt) {
        var str = [$("#id_pk_thong_tin").val()];
        url = "xoaphukhoa";
        $.post(url, {
            url: convertArray(str)
        }).done(function (data) {
            if (data != "-1") {
                jAlert("Xóa thành công!", 'Thông báo');
                dlgCfDelete_PK.close();
                phukhoa_dialog.dialog("close");
            } else {
                jAlert("Lỗi xóa thông tin!", 'Thông báo');
            }
        });
    });

    $("#savePK")
            .click(
                    function () {
                        checkdulieu_PK();
                        if (checkRequired_pk == 0) {
                            var ID_PK_THONG_TIN = $("#id_pk_thong_tin").val();
                            var ID_TIEP_NHAN = $("#id_tiep_nhan_pk").val();
                            var MA_BENH_NHAN = $("#ma_benh_nhan_pk").val();
                            var DVTT = $("#id_don_vi_pk").val();
                            var SO_CON_SONG = $("#nbsoconsongpk").val().trim();
                            var SO_LAN_DE = $("#solandepk").val().trim();
                            var SO_LAN_XAY = $("#solanxaypk").val().trim();
                            var SO_LAN_NAO_HUT = $("#solannaohutpk").val().trim();
                            var BPTT_DA_DUNG = $("#bpttdadungpk")
                                    .val().trim();
                            var BPTT_HIEN_DUNG = $("#bptthiendungpk")
                                    .val().trim();
                            var KET_QUA_KHAM = $("#txtKetquakhamPK").val().trim();
                            var HUONG_DIEU_TRI = $("#txtHuongdientriPK").val().trim();
                            var NGAY_KHAM = $("#ngaykhambenh").val();
                            var NGUOI_KHAM = $("#cmbNguoiKham").val();

                            var str = [ID_PK_THONG_TIN, ID_TIEP_NHAN,
                                MA_BENH_NHAN, DVTT, SO_CON_SONG, SO_LAN_DE,
                                SO_LAN_XAY, SO_LAN_NAO_HUT, BPTT_DA_DUNG,
                                BPTT_HIEN_DUNG, KET_QUA_KHAM,
                                HUONG_DIEU_TRI, NGAY_KHAM, NGUOI_KHAM, "0"];
                            if (modeg_pk == 0) {
                                url = "themchitietphukhoa";
                                $
                                        .post(url, {
                                            url: convertArray(str)
                                        })
                                        .done(
                                                function (data) {
                                                    if (data != "-1") {
                                                        jAlert(
                                                                "Thêm thành công!",
                                                                'Thông báo');
                                                        phukhoa_dialog
                                                                .dialog("close");
                                                    } else {
                                                        jAlert(
                                                                "Lỗi thêm chi tiết khám phụ khoa !",
                                                                'Thông báo');
                                                    }
                                                });
                            } else {
                                url = "suachitietphukhoa";
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
                                                        phukhoa_dialog
                                                                .dialog("close");
                                                    } else {
                                                        jAlert(
                                                                "Lỗi sửa chi tiết khám phụ khoa !",
                                                                'Thông báo');
                                                    }
                                                });
                            }
                        }
                    });
});
function gandulieu_PK(id_tiep_nhan, ma_benh_nhan, id_don_vi) {
    $("#id_tiep_nhan_pk").val(id_tiep_nhan);
    $("#ma_benh_nhan_pk").val(ma_benh_nhan);
    $("#id_don_vi_pk").val(id_don_vi);
    var arr = [id_tiep_nhan, id_don_vi];
    var url1 = "chitietphukhoa?url=" + convertArray(arr);
    $.getJSON(url1, function (result) {
        $.each(result, function (i, field) {
            // lay ra toan bo thong tin ho khau;
            $("#id_pk_thong_tin").val(field.ID_PK_THONG_TIN);
            $("#nbsoconsongpk").val(field.SO_CON_SONG);
            $("#solandepk").val(field.SO_LAN_DE);
            $("#solanxaypk").val(field.SO_LAN_XAY);
            $("#solannaohutpk").val(field.SO_LAN_NAO_HUT);
            $("#bpttdadungpk").val(field.BPTT_DA_DUNG);
            $("#bptthiendungpk").val(field.BPTT_HIEN_DUNG);
            $("#txtKetquakhamPK").val(field.KET_QUA_KHAM);
            $("#txtHuongdientriPK").val(field.HUONG_DIEU_TRI);
            $("#cmbNguoiKham").val(field.NGUOI_KHAM);
            if ($("#id_pk_thong_tin").val() == '') {
                modeg_pk = 0;
                $("#deletePK").removeClass("button_shadow");
                $("#deletePK").prop('hidden', true);
            } else {
                modeg_pk = 1;
                $("#deletePK").addClass("button_shadow");
                $("#deletePK").prop('hidden', false);
            }
        });
    });
}
$("#phukhoa").click(function () {
    if ($("#idtiepnhan").val() == '') {
        jAlert("Mã lần khám không tồn tại !", 'Thông báo');
        return;
    }
    if ($("#mayte").val() == '') {
        jAlert("Mã bệnh nhân không tồn tại!", 'Thông báo');
        return;
    }

    var url = "danhsachnguoikhamphukhoa?dvtt=" + $("#id_don_vi_pk").val();
    var options = "#cmbNguoiKham";
    $.post(url).done(function (data) {
        if (data) {
            $(options).empty();
            $("<option value='-1'>Chọn người khám</option>").appendTo(options);
            $.each(data, function (i) {
                $("<option value='" + data[i].ID + "'>" + data[i].NAMEE + "</option>").appendTo(options);
            });

        }
    });

    gandulieu_PK($("#idtiepnhan").val(), $("#mayte").val(), dvtt);
    phukhoa_dialog.dialog("open");

});
function checkdulieu_PK() {
    checkRequired_pk = 0;
    if ($("#txtKetquakhamPK").val().trim() == '') {
        checkRequired_pk = 1;
        jAlert("Kết quả khám không được để trống !", 'Thông báo');
        return;
    }
    if ($("#txtHuongdientriPK").val().trim() == '') {
        checkRequired_pk = 1;
        jAlert("Hướng điều trị không được để trống !", 'Thông báo');
        return;
    }
    if ($("#cmbNguoiKham").val().trim() == '') {
        checkRequired_pk = 1;
        jAlert("Người khám không được để trống !", 'Thông báo');
        return;
    }
}
