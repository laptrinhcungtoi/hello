var modeg = -1; // -1: Jbox tat; 0: Jbox them; 1: Jbox sua du lieu;
var checkRequired = 0;
var v_id_nhan_khau = '';
var flagTaibien = -1;
var checkRequiredTB = 0;
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

    $("#dtngaypha").datepicker();
    $("#dtngaypha").datepicker("option", "dateFormat", "dd/mm/yy");

    $("#dtptNKCC").datepicker();
    $("#dtptNKCC").datepicker("option", "dateFormat", "dd/mm/yy");

    $("#dtNgayTB").datepicker();
    $("#dtNgayTB").datepicker("option", "dateFormat", "dd/mm/yy");

    var dlgCfDelete = new jBox('Modal', {
        title: 'Xác nhận xóa thông tin phá thai',
        overlay: true,
        closeOnClick: true,
        content: $('#dlgCfDeletePT'),
        draggable: 'title',
        position: {
            my: "center top",
            at: "center top",
            of: window
        }
    });

    var dlgCfDeleteTB = new jBox('Modal', {
        title: 'Xác nhận xóa thông tin tai biến',
        overlay: true,
        closeOnClick: true,
        content: $('#dlgCfDeletePTTB'),
        draggable: 'title',
        position: {
            my: "center top",
            at: "center top",
            of: window
        }
    });
    phathai_dialog = $("#qlPhaThai").dialog({
        autoOpen: false,
        resizable: true,
        width: 800,
        position: {
            my: "center top",
            at: "center top",
            of: window
        }
    });
    
    /*var url = "loadphuongphap";
        $.post(url).done(function (data) {
            if (data) {
                $("#cboPhuongPhap").empty();
                $.each(data, function (i) {
                    $("<option value='" + data[i].ID_PT_PHUONG_PHAP + "'>" + data[i].TEN_PHUONG_PHAP + "</option>").appendTo("#cboPhuongPhap");
                });
            }
        });*/

    $("#addTB").click(function () {
        flagTaibien = 0;
        $("#dtNgayTB").val('');
        $("#cboTaibien").val('');
        $("#cboTinhtrang").val('');
        checkButtonTB();
    });
    $("#editTB").click(function () {
        if ($("#id_pt_tai_bien").val() == '') {
            jAlert("Chưa chọn bản ghi cần sửa !", 'Thông báo');
        } else {
            flagTaibien = 1;
            checkButtonTB();
        }
    });
    $("#deleteTB").click(function () {
        if ($("#id_pt_tai_bien").val() == '') {
            jAlert("Chưa chọn bản ghi cần xóa !", 'Thông báo');
        } else {
            dlgCfDeleteTB.open();
        }
    });
    $("#dlgCance_pt_tb").click(function () {
        dlgCfDeleteTB.close();
    });

    $("#dlgSubmit_pt_tb").click(
            function (evt) {
                var str = [$("#id_pt_tai_bien").val()];
                url = "xoataibien";
                $.post(url, {
                    url: convertArray(str)
                }).done(
                        function (data) {
                            if (data != "-1") {
                                jAlert("Xóa thành công!", 'Thông báo');
                                dlgCfDeleteTB.close();
                                $("#listTB").jqGrid(
                                        'setGridParam',
                                        {
                                            url: 'danhsachtaibien?idpt='
                                                    + $("#id_pt_thong_tin")
                                                    .val(),
                                            datatype: 'json'
                                        }).trigger('reloadGrid');
                                $("#dtNgayTB").val('');
                                $("#cboTaibien").val('');
                                $("#cboTinhtrang").val('');
                                $("#id_pt_tai_bien").val('');
                                flagTaibien = -1;
                                checkButtonTB();
                            } else {
                                jAlert("Lỗi xóa tai biến!", 'Thông báo');
                                dlgCfDeleteTB.close();
                            }
                        });
            });

    $("#cancelTB").click(function () {
        flagTaibien = -1;
        checkButtonTB();
    });

    $("#exitPT").click(function () {
        phathai_dialog.dialog("close");
    });

    $("#deletePT").click(function () {
        dlgCfDelete.open();
    });

    $("#dlgCance_pt").click(function () {
        dlgCfDelete.close();
    });

    $("#dlgSubmit_pt").click(function (evt) {
        var str = [$("#id_pt_thong_tin").val()];
        url = "xoaphathai";
        $.post(url, {
            url: convertArray(str)
        }).done(function (data) {
            if (data != "-1") {
                jAlert("Xóa thành công!", 'Thông báo');
                dlgCfDelete.close();
                phathai_dialog.dialog("close");
            } else {
                jAlert("Lỗi xóa thông tin!", 'Thông báo');
            }
        });
    });
    $("#saveTB")
            .click(
                    function () {
                        checkdulieuTB();
                        if (checkRequiredTB == 0) {
                            var ID_PT_TAI_BIEN = $("#id_pt_tai_bien").val();
                            var ID_PT_THONG_TIN = $("#id_pt_thong_tin").val();
                            var ID_PT_LOAI_TAI_BIEN = $("#cboTaibien").val();
                            var NGAY_TB = $("#dtNgayTB").val();
                            var TINH_TRANG = $("#cboTinhtrang").val();
                            var str = [ID_PT_TAI_BIEN, ID_PT_THONG_TIN,
                                ID_PT_LOAI_TAI_BIEN, NGAY_TB, TINH_TRANG];
                            if (flagTaibien == 0) {
                                url = "themchitiettaibien";
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
                                                        flagTaibien = -1;
                                                        $("#listTB")
                                                                .jqGrid(
                                                                        'setGridParam',
                                                                        {
                                                                            url: 'danhsachtaibien?idpt='
                                                                                    + $(
                                                                                            "#id_pt_thong_tin")
                                                                                    .val(),
                                                                            datatype: 'json'
                                                                        })
                                                                .trigger(
                                                                        'reloadGrid');
                                                        checkButtonTB();
                                                        // phathai_dialog
                                                        // .dialog("close");
                                                    } else {
                                                        jAlert(
                                                                "Lỗi thêm chi tiết tai biến !",
                                                                'Thông báo');
                                                    }
                                                });
                            } else {
                                url = "suachitiettaibien";
                                $
                                        .post(url, {
                                            url: convertArray(str)
                                        })
                                        .done(
                                                function (data) {
                                                    if (data == "1") {
                                                        jAlert(
                                                                "Sửa thành công!",
                                                                'Thông báo');
                                                        flagTaibien = -1;
                                                        $("#listTB")
                                                                .jqGrid(
                                                                        'setGridParam',
                                                                        {
                                                                            url: 'danhsachtaibien?idpt='
                                                                                    + $(
                                                                                            "#id_pt_thong_tin")
                                                                                    .val(),
                                                                            datatype: 'json'
                                                                        })
                                                                .trigger(
                                                                        'reloadGrid');
                                                        checkButtonTB();
                                                        // phathai_dialog
                                                        // .dialog("close");
                                                    } else {
                                                        jAlert(
                                                                "Lỗi sửa chi tiết tai biến !",
                                                                'Thông báo');
                                                    }
                                                });
                            }
                        }
                    });
    $("#savePT")
            .click(
                    function () {
                        checkdulieuPT();
                        if (checkRequired == 0) {
                            var id_pt_thong_tin = $("#id_pt_thong_tin").val();
                            var NGAY_PT = $("#dtngaypha").val();
                            var SL_CON_SONG = $("#nbschs").val();
                            var NGAY_KINH_CUOI = $("#dtptNKCC").val();
                            var TUAN_THAI = $("#nbptTuanThai").val();
                            var CHAN_DOAN = $("#cboChuanDoan").val();
                            var MO_THAI = $("#cboMoThai").val();
                            var NGUOI_THUC_HIEN = $("#txtPtNguoiThucHien")
                                    .val();
                            var KHAM_SAU_2_TUAN = $("#cboKhamsau2tuan").val();
                            var GHI_CHU = $("#ptGhiChu").val();
                            var ID_PHUONG_PHAP = $("#cboPhuongPhap").val();
                            var MA_BENH_NHAN = $("#ma_benh_nhan_pt").val();
                            var ID_TRINH_DO_CM = $("#cboTrinhDo").val();
                            var ID_TIEPNHAN = $("#id_tiep_nhan_pt").val();
                            var ID_DON_VI = $("#id_don_vi_pt").val();
                            var DVTT = $("#id_don_vi_pt").val();

                            var str = [id_pt_thong_tin, NGAY_PT, SL_CON_SONG,
                                NGAY_KINH_CUOI, TUAN_THAI, CHAN_DOAN,
                                MO_THAI, NGUOI_THUC_HIEN, KHAM_SAU_2_TUAN,
                                GHI_CHU, ID_PHUONG_PHAP, MA_BENH_NHAN,
                                ID_TRINH_DO_CM, ID_TIEPNHAN, DVTT,
                                ID_DON_VI];
                            if (modeg == 0) {
                                url = "themchitietphathai";
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
                                                        $("#divTB")
                                                                .prop('hidden',
                                                                        false);
                                                        $("#deletePT").addClass("button_shadow");
                                                        $("#deletePT").prop('hidden', false);
                                                        modeg = 1;
                                                        $("#id_pt_thong_tin").val(data);
                                                        $("#listTB").jqGrid(
                                                                'setGridParam',
                                                                {
                                                                    url: 'danhsachtaibien?idpt='
                                                                            + $("#id_pt_thong_tin").val(),
                                                                    datatype: 'json'
                                                                }).trigger('reloadGrid');
                                                        flagTaibien = -1;
                                                        checkButtonTB();
                                                        $("#dtNgayTB").val('');
                                                        $("#cboTaibien").val('');
                                                        $("#cboTinhtrang").val('');
                                                    } else {
                                                        jAlert(
                                                                "Lỗi thêm chi tiết khám thai !",
                                                                'Thông báo');
                                                    }
                                                });
                            } else {
                                url = "suachitietphathai";
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
//														phathai_dialog
//																.dialog("close");
                                                    } else {
                                                        jAlert(
                                                                "Lỗi sửa chi tiết khám thai !",
                                                                'Thông báo');
                                                    }
                                                });
                            }
                        }
                    });

    $("#listTB").jqGrid(
            {
                //url : 'danhsachtaibien?idpt=' + $("#id_tiep_nhan_pt").val(),
                //url: 'danhsach',
                datatype: "local",
                // width : auto,
                colNames: ["ID_PT_TAI_BIEN", "ID_PT_THONG_TIN",
                    "ID_PT_LOAI_TAI_BIEN", "Ngày", "Tình trạng",
                    "Tai biến", "TINH_TRANG"],
                colModel: [{
                        name: 'ID_PT_TAI_BIEN',
                        index: 'ID_PT_TAI_BIEN',
                        width: 0,
                        hidden: true
                    }, {
                        name: 'ID_PT_THONG_TIN',
                        index: 'ID_PT_THONG_TIN',
                        width: 0,
                        hidden: true
                    }, {
                        name: 'ID_PT_LOAI_TAI_BIEN',
                        index: 'ID_PT_LOAI_TAI_BIEN',
                        width: 0,
                        hidden: true
                    }, {
                        name: 'NGAY_TB',
                        index: 'NGAY_TB',
                        width: 200
                    }, {
                        name: 'TINH_TRANG_VIEW',
                        index: 'TINH_TRANG_VIEW',
                        width: 300
                    }, {
                        name: 'PT_LOAI_TAI_BIEN_VIEW',
                        index: 'PT_LOAI_TAI_BIEN_VIEW',
                        width: 200

                    }, {
                        name: 'TINH_TRANG',
                        index: 'TINH_TRANG',
                        width: 0,
                        hidden: true
                    }],
                // rowNum : 20,
                // rowList : [ 10, 20, 50 ],
                autowidth: true,
                rownumbers: true,
                pager: '#pager4',
                gridview: true,
                viewrecords: true,
                loadonce: false,
                onSelectRow: function (id) {
                    if (id) {
                        var ret = $("#listTB").jqGrid('getRowData', id);
                        if (flagTaibien == -1) {
                            $("#id_pt_tai_bien").val(ret.ID_PT_TAI_BIEN);
                            $("#dtNgayTB").val(ret.NGAY_TB);
                            $("#cboTaibien").val(ret.ID_PT_LOAI_TAI_BIEN);
                            $("#cboTinhtrang").val(ret.TINH_TRANG);
                        }
                    }
                },
                ondblClickRow: function (id) {
                    var ret = $("#listTB").jqGrid('getRowData', id);
                    if (flagTaibien == -1) {
                        $("#id_pt_tai_bien").val(ret.ID_PT_TAI_BIEN);
                        $("#dtNgayTB").val(ret.NGAY_TB);
                        $("#cboTaibien").val(ret.ID_PT_LOAI_TAI_BIEN);
                        $("#cboTinhtrang").val(ret.TINH_TRANG);
                        flagTaibien = 1;
                        checkButtonTB();
                    }
                }
                // jsonReader : {
                // repeatitems : false,
                // id : "id",
                // root : "rows",
                // page : "page",
                // total : "total",
                // records : "records"
                // }
            });
});

function gandulieuPT(id_tiep_nhan, ma_benh_nhan, id_don_vi) {
    $("#id_tiep_nhan_pt").val(id_tiep_nhan);
    $("#ma_benh_nhan_pt").val(ma_benh_nhan);
    // $("#ma_benh_nhan_pt").val(10);
    $("#id_don_vi_pt").val(id_don_vi);
    var arr = [id_tiep_nhan, id_don_vi, "0"];
    var url1 = "chitietphathai?url=" + convertArray(arr);
    $.getJSON(url1, function (result) {
        $.each(result, function (i, field) {
            // lay ra toan bo thong tin ho khau;
            $("#id_pt_thong_tin").val(field.ID_PT_THONG_TIN);
            $("#dtngaypha").val(field.NGAY_PT);
            $("#nbschs").val(field.SL_CON_SONG);
            $("#dtptNKCC").val(field.NGAY_KINH_CUOI);
            $("#nbptTuanThai").val(field.TUAN_THAI);
            $("#cboChuanDoan").val(field.CHAN_DOAN);
            $("#cboPhuongPhap").val(field.ID_PHUONG_PHAP);
            $("#cboMoThai").val(field.MO_THAI);
            $("#cboKhamsau2tuan").val(field.KHAM_SAU_2_TUAN);
            $("#txtchieucaotucung").val(field.SK_CHIEU_CAO_TU_CUNG);
            $("#cboTrinhDo").val(field.ID_TRINH_DO_CM);
            $("#ptGhiChu").val(field.GHI_CHU);
            $("#txtPtNguoiThucHien").val(field.NGUOI_THUC_HIEN);
            if ($("#id_pt_thong_tin").val() == '') {
                modeg = 0;
                $("#deletePT").removeClass("button_shadow");
                $("#deletePT").prop('hidden', true);
                $("#divTB").prop('hidden', true);
            } else {
                modeg = 1;
                $("#deletePT").addClass("button_shadow");
                $("#deletePT").prop('hidden', false);
                $("#divTB").prop('hidden', false);

                $("#listTB").jqGrid(
                        'setGridParam',
                        {
                            url: 'danhsachtaibien?idpt='
                                    + $("#id_pt_thong_tin").val(),
                            datatype: 'json'
                        }).trigger('reloadGrid');
                $("#dtNgayTB").val('');
                $("#cboTaibien").val('');
                $("#cboTinhtrang").val('');
                flagTaibien = -1;
                checkButtonTB();
            }
        });
    });
}
$("#phathai").click(function () {
    if ($("#idtiepnhan").val() == '') {
        jAlert("Mã lần khám không tồn tại !", 'Thông báo');
        return;
    }
    if ($("#mayte").val() == '') {
        jAlert("Mã bệnh nhân không tồn tại!", 'Thông báo');
        return;
    }
    gandulieuPT($("#idtiepnhan").val(), $("#mayte").val(), dvtt);
    phathai_dialog.dialog("open");
});

function checkdulieuPT() {
    checkRequired = 0;
    if ($("#dtngaypha").val() == '') {
        checkRequired = 1;
        jAlert("Ngày phá thai không được để trống !", 'Thông báo');
        $("#dtngaypha").focus();
        return;
    }
    if ($("#nbptTuanThai").val() == '') {
        checkRequired = 1;
        jAlert("Tuần thai không được để trống !", 'Thông báo');
        return;
    }

    if ($("#cboPhuongPhap").val() == '') {
        checkRequired = 1;
        jAlert("Phương pháp bắt buộc phải chọn !", 'Thông báo');
        return;
    }
    if ($("#cboTrinhDo").val() == '') {
        checkRequired = 1;
        jAlert("Trình độ bắt buộc phải chọn !", 'Thông báo');
        return;
    }
}
function checkButtonTB() {
    if (flagTaibien == -1) {
        $("#addTB").addClass("button_shadow");
        $("#addTB").prop('hidden', false);
        $("#editTB").addClass("button_shadow");
        $("#editTB").prop('hidden', false);
        $("#deleteTB").addClass("button_shadow");
        $("#deleteTB").prop('hidden', false);
        $("#saveTB").removeClass("button_shadow");
        $("#saveTB").prop('hidden', true);
        $("#cancelTB").removeClass("button_shadow");
        $("#cancelTB").prop('hidden', true);
        $("#dtNgayTB").prop('disabled', true);
        $("#cboTaibien").prop('disabled', true);
        $("#cboTinhtrang").prop('disabled', true);
    }
    if (flagTaibien == 0 || flagTaibien == 1) {
        $("#addTB").removeClass("button_shadow");
        $("#addTB").prop('hidden', true);
        $("#editTB").removeClass("button_shadow");
        $("#editTB").prop('hidden', true);
        $("#deleteTB").removeClass("button_shadow");
        $("#deleteTB").prop('hidden', true);
        $("#saveTB").addClass("button_shadow");
        $("#saveTB").prop('hidden', false);
        $("#cancelTB").addClass("button_shadow");
        $("#cancelTB").prop('hidden', false);
        $("#dtNgayTB").prop('disabled', false);
        $("#cboTaibien").prop('disabled', false);
        $("#cboTinhtrang").prop('disabled', false);
    }
}
function checkdulieuTB() {
    checkRequiredTB = 0;
    if ($("#dtNgayTB").val() == '') {
        checkRequiredTB = 1;
        jAlert("Ngày tai biến không được để trống !", 'Thông báo');
        $("#dtNgayTB").focus();
        return;
    }
    if ($("#cboTaibien").val() == '') {
        checkRequiredTB = 1;
        jAlert("Tai biến không được để trống !", 'Thông báo');
        $("#dtNgayTB").focus();
        return;
    }
    if ($("#cboTinhtrang").val() == '') {
        checkRequiredTB = 1;
        jAlert("Tình trạng không được để trống !", 'Thông báo');
        $("#dtNgayTB").focus();
        return;
    }
}
