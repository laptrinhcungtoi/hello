function enable_button_in_cls(cls) {
    $("#phieu_" + cls).attr("disabled", false);
    $("#phieu_" + cls).removeClass("button_disabled");
    $("#phieu_" + cls).addClass("button_shadow");
}

function enable_bt_in_xn() {

}
function enable_bt_in_cdha() {

}
function enable_bt_in_ttpt() {

}
function disable_button_in_cls(cls) {
    $("#phieu_" + cls).attr("disabled", true);
    $("#phieu_" + cls).removeClass("button_disabled");
    $("#phieu_" + cls).addClass("button_shadow");
}
/*
 function disable_bt_in_xn() {
 $("#phieu_xn").attr("disabled", true);
 $("#phieu_xn").addClass("button_disabled");
 $("#phieu_xn").removeClass("button_shadow");
 }
 function disable_bt_in_cdha() {
 $("#phieu_cdha").attr("disabled", true);
 $("#phieu_cdha").addClass("button_disabled");
 $("#phieu_cdha").removeClass("button_shadow");
 }
 function disable_bt_in_ttpt() {
 $("#phieu_ttpt").attr("disabled", true);
 $("#phieu_ttpt").addClass("button_disabled");
 $("#phieu_ttpt").removeClass("button_shadow");
 }*/
function xoa_dtck(dvtt) {
    var id1 = $("#list_dtck_phieu").jqGrid('getGridParam', 'selrow');
    var ret = $("#list_dtck_phieu").jqGrid('getRowData', id1);
    var makhambenh = ret.MA_KHAM_BENH;
    var iddotdt = ret.id_dotdieutrichuyenkhoa;
    var dvtt = ret.dvtt;
    var arr = [makhambenh, iddotdt, dvtt];
    var url = "xoadotdieutri?url=" + convertArray(arr);
    $.ajax({
        url: url
    }).done(function(data) {
        if (data == "1") {
            jAlert("Bệnh nhân đã thanh toán", 'Cảnh báo');
        }
        else if (data == "2") {
            jAlert("Bệnh nhân đã thực hiện điều trị", 'Cảnh báo');
        }
        else {
            $("#huy_dtck").click();
            var maphongdv = $("#phongdtck").val();
            var arr3 = [makhambenh, dvtt, maphongdv];
            var url3 = "danhsachdotdieutrichuyenkhoa?url=" + convertArray(arr3);
            $("#list_dtck_phieu").jqGrid('setGridParam', {datatype: 'json', url: url3}).trigger('reloadGrid');
        }
    });
}
function xoa_cdha(dvtt) {
    var id1 = $("#list_cdha_phieu").jqGrid('getGridParam', 'selrow');
    var ret = $("#list_cdha_phieu").jqGrid('getRowData', id1);
    var ngaychidinh = convertStr_MysqlDate($("#ngaycdha").val());
    var arr = [ret.SO_PHIEU_CDHA, dvtt, stt_dieutri, stt_benhan, stt_dotdieutri];
    var url = "noitru_cdha_delete_bangcha";
    $.post(url, {
        url: convertArray(arr)
    }).done(function(data) {
        if (data == "1") {
            jAlert("Bệnh nhân đã thanh toán", 'Cảnh báo');
        }
        else if (data == "2") {
            jAlert("Bệnh nhân đã được thực hiện chẩn đoán hình ảnh", 'Cảnh báo');
        }
        else {
            $("#huy_cdha").click();
            var arr3 = [stt_dieutri, stt_benhan, stt_dotdieutri, dvtt, ngaychidinh];
            var url3 = "noitru_cdha_ds_phieu?url=" + convertArray(arr3);
            $("#list_cdha_phieu").jqGrid('setGridParam', {datatype: 'json', url: url3}).trigger('reloadGrid');
        }
        enable_button_in_cls("cdha");
    });
}
function xoa_ttpt(dvtt) {
    var id1 = $("#list_ttpt_phieu").jqGrid('getGridParam', 'selrow');
    var ret = $("#list_ttpt_phieu").jqGrid('getRowData', id1);
    var ngaychidinh = convertStr_MysqlDate($("#ngaychidinhttpt").val());
    var arr = [ret.SO_PHIEU_DICHVU, dvtt, stt_dieutri, stt_benhan, stt_dotdieutri];
    var url = "noitru_ttpt_delete_bangcha";
    $.post(url, {
        url: convertArray(arr)
    }).done(function(data) {
        enable_button_in_cls("ttpt");
        if (data == "1") {
            jAlert("Bệnh nhân đã thanh toán", 'Cảnh báo');
        }
        else if (data == "2") {
            jAlert("Bệnh nhân đã được chẩn đoán dịch vụ", 'Cảnh báo');
        }
        else {
            $("#huy_ttpt").click();
            var arr3 = [stt_dieutri, stt_benhan, stt_dotdieutri, dvtt, ngaychidinh];
            var url3 = "noitru_ttpt_ds_phieu?url=" + convertArray(arr3);
            $("#list_ttpt_phieu").jqGrid('setGridParam', {datatype: 'json', url: url3}).trigger('reloadGrid');
        }
    });
}

function xoa_xn(dvtt) {
    var id1 = $("#list_xn_phieu").jqGrid('getGridParam', 'selrow');
    var ret = $("#list_xn_phieu").jqGrid('getRowData', id1);
    var ngaychidinh = convertStr_MysqlDate($("#ngaychidinhxn").val());
    var arr = [stt_dieutri, stt_benhan, stt_dotdieutri, ret.SO_PHIEU_XN, dvtt];
    var url = "noitru_xetnghiem_delete_bangcha";
    $.post(url, {
        url: convertArray(arr)
    }).done(function(data) {
        if (data == "1") {
            jAlert("Bệnh nhân đã thanh toán", 'Cảnh báo');
        }
        else if (data == "2") {
            jAlert("Bệnh nhân đã được thực hiện xét nghiệm", 'Cảnh báo');
        }
        else {
            $("#huy_xn").click();
            var arr3 = [stt_dieutri, stt_benhan, stt_dotdieutri, dvtt, ngaychidinh];
            var url3 = "noitru_xetnghiem_ds_phieuxetnghiem?url=" + convertArray(arr3);
            $("#list_xn_phieu").jqGrid('setGridParam', {datatype: 'json', url: url3}).trigger('reloadGrid');
        }
    });
}
function luu_cdha(dvtt) {
    var sophieu = $("#sophieucdha").val();
    var sovaovien = $("#sovaovien").val();
    var sovaovien_dt = $("#sovaovien_dt").val();
    var capcuu = $("#capcuucdha").prop("checked") == true ? "1" : "0";
    var url_cn = "noitru_cdha_update_bangcha";
    var arr_cn = [stt_dieutri, stt_benhan, stt_dotdieutri, dvtt, sophieu, capcuu];
    $.post(url_cn, {url: convertArray(arr_cn)});
    var active = $("#tab_cdha").tabs("option", "active");
    if (active == 0) {
        var str = $("#list_cdha_bhyt").jqGrid('getGridParam', 'selarrrow');
        if (str != "" && str != null) {
            var count = str.length;
            for (var i = 0; i < count; i++) {
                var ret = $("#list_cdha_bhyt").jqGrid('getRowData', str[i]);
                var madv = ret.MA_CDHA;
                var sl = ret.SO_LUONG;
                var giadv = ret.GIA_CDHA;
                var thanhtien = ret.THANH_TIEN;
                var arr = [sophieu, madv, dvtt, sl, giadv, thanhtien, "false", stt_dieutri, stt_benhan, stt_dotdieutri,sovaovien,sovaovien_dt,mabenhnhan];
                var url = "noittru_cdha_insert_chitiet";
                $.post(url, {
                    url: convertArray(arr)
                }).done(function(data) {
                    enable_button_cls("luu", "cdha");
                    toogle_input_cdha(false);
                    enable_button_in_cls("cdha");
                });
            }
        }
        else {
            jConfirm('Chưa chọn chẩn đoán hình ảnh. Nhấn "Tiếp tục" để chỉ định. Nhấn "Hủy" để xóa phiếu?', 'Thông báo', function(r) {
                if (r.toString() == "false") {
                    xoa_cdha();
                }
            });
        }
    } else if (active == 1) {
        var str_yc = $("#list_cdha_yeucau").jqGrid('getGridParam', 'selarrrow');
        if (str_yc != "" && str_yc != null) {
            var count = str_yc.length;
            for (var i = 0; i < count; i++) {
                var ret = $("#list_cdha_yeucau").jqGrid('getRowData', str_yc[i]);
                var madv = ret.MA_CDHA;
                var sl = ret.SO_LUONG;
                var giadv = ret.GIA_CDHA;
                var thanhtien = ret.THANH_TIEN;
                var arr = [sophieu, madv, dvtt, sl, giadv, thanhtien, "true", stt_dieutri, stt_benhan, stt_dotdieutri,sovaovien,sovaovien_dt,mabenhnhan];
                var url = "noittru_cdha_insert_chitiet";
                $.post(url, {
                    url: convertArray(arr)
                }).done(function(data) {
                    enable_button_cls("luu", "cdha");
                    toogle_input_cdha(false);
                    enable_button_in_cls("cdha");
                });
            }
        }
        else {
            jConfirm('Chưa chọn chẩn đoán hình ảnh. Nhấn "Tiếp tục" để chỉ định. Nhấn "Hủy" để xóa phiếu?', 'Thông báo', function(r) {
                if (r.toString() == "false") {
                    xoa_cdha();
                }
            });
        }
    }
}
function luu_ttpt(dvtt) {
    var sophieu = $("#sophieuttpt").val();
    var sovaovien = $("#sovaovien").val();
    var sovaovien_dt = $("#sovaovien_dt").val();
    var capcuu = $("#capcuuttpt").prop("checked") == true ? "1" : "0";
    var url_cn = "noitru_ttpt_update_bangcha";
    var arr_cn = [stt_dieutri, stt_benhan, stt_dotdieutri, dvtt, sophieu, capcuu];
    $.post(url_cn, {url: convertArray(arr_cn)});
    var active = $("#tab_ttpt").tabs("option", "active");
    if (active == 0) {
        var str = $("#list_ttpt_bhyt").jqGrid('getGridParam', 'selarrrow');
        if (str != "" && str != null) {
            var count = str.length;
            for (var i = 0; i < count; i++) {
                var ret = $("#list_ttpt_bhyt").jqGrid('getRowData', str[i]);
                var madv = ret.MA_DV;
                var sl = ret.SO_LUONG;
                var giadv = ret.GIA_DV;
                var thanhtien = ret.THANH_TIEN;
                var arr = [sophieu, madv, dvtt, sl, giadv, thanhtien, "false", stt_dieutri, stt_benhan, stt_dotdieutri,sovaovien,sovaovien_dt,mabenhnhan];
                var url = "noittru_ttpt_insert_chitiet";
                $.post(url, {
                    url: convertArray(arr)
                }).always(function(data) {
                    enable_button_cls("luu", "ttpt");
                    toogle_input_ttpt(false);
                    enable_button_in_cls("ttpt");
                });
            }
        } else {
            jConfirm('Chưa chọn thủ thuật phẩu thuật. Nhấn "Tiếp tục" để chỉ định. Nhấn "Hủy" để xóa phiếu?', 'Thông báo', function(r) {
                if (r.toString() == "false") {
                    xoa_ttpt(dvtt);
                }
            });
        }
    } else {
        var str_yc = $("#list_ttpt_yeucau").jqGrid('getGridParam', 'selarrrow');
        if (str_yc != "" && str_yc != null) {
            var count = str_yc.length;
            for (var i = 0; i < count; i++) {
                var ret = $("#list_ttpt_yeucau").jqGrid('getRowData', str_yc[i]);
                var madv = ret.MA_DV;
                //var tendv=ret.TEN_DV;
                var sl = ret.SO_LUONG;
                var giadv = ret.GIA_DV;
                var thanhtien = ret.THANH_TIEN;
                var arr = [sophieu, madv, dvtt, sl, giadv, thanhtien, "true", stt_dieutri, stt_benhan, stt_dotdieutri,sovaovien,sovaovien_dt,mabenhnhan];
                var url = "noittru_ttpt_insert_chitiet";
                $.post(url, {
                    url: convertArray(arr)
                }).always(function(data) {
                    enable_button_cls("luu", "ttpt");
                    toogle_input_ttpt(false);
                    enable_button_in_cls("ttpt");
                });
            }
        }
        else {
            jConfirm('Chưa chọn thủ thuật phẩu thuật. Nhấn "Tiếp tục" để chỉ định. Nhấn "Hủy" để xóa phiếu?', 'Thông báo', function(r) {
                if (r.toString() == "false") {
                    xoa_ttpt(dvtt);
                }
            });
        }
    }
}
function luu_dtck(dvtt) {
    var sophieu = $("#iddtck").val();
    var active = $("#tab_dtck").tabs("option", "active");
    if (active == 0) {
        var str = $("#list_dtck_bhyt").jqGrid('getGridParam', 'selarrrow');
        if (str != "" && str != null) {
            var count = str.length;
            var arr_cls = [];
            for (var i = 0; i < count; i++) {
                var ret = $("#list_dtck_bhyt").jqGrid('getRowData', str[i]);
                var madv = ret.MA_DV;
                var sl = ret.SO_LUONG;
                var giadv = ret.GIA_DV;
                var thanhtien = ret.THANH_TIEN;
                var arr = [sophieu, madv, dvtt, sl, giadv, thanhtien, "false"];
                var arr_str = convertArray(arr);
                arr_cls.push(arr_str);
            }
            var url = "themchitietdotdieutri?url=" + convertArray_CLS(arr_cls);
            var url_en = (url);
            $.ajax({
                url: url_en
            }).always(function() {
                var id1 = $("#list_dtck_phieu").jqGrid('getGridParam', 'selrow');
                var ret = $("#list_dtck_phieu").jqGrid('getRowData', id1);
                var makhambenh = ret.MA_KHAM_BENH;
                var maphongdv = ret.PHONG_DT_CHUYENKHOA;
                var dvtt = ret.dvtt;
                var arr3 = [makhambenh, dvtt, maphongdv];
                var url3 = "danhsachdotdieutrichuyenkhoa?url=" + convertArray(arr3);
                $("#list_dtck_phieu").jqGrid('setGridParam', {datatype: 'json', url: url3}).trigger('reloadGrid');
                enable_button_dtck("luu");
                toogle_input_dtck(false);
            });
        }
        else {
            jConfirm('Chưa chọn dịch vụ. Nhấn "Tiếp tục" để chỉ định. Nhấn "Hủy" để xóa phiếu?', 'Thông báo', function(r) {
                if (r.toString() == "false") {
                    xoa_dtck();
                }
            });
        }
    } else {
        var str_yc = $("#list_dtck_yeucau").jqGrid('getGridParam', 'selarrrow');
        if (str_yc != "" && str_yc != null) {
            //var mang_yc = str_yc.split(",");
            var count = str_yc.length;
            var arr_cls = [];
            for (var i = 0; i < count; i++) {
                var ret = $("#list_dtck_yeucau").jqGrid('getRowData', str_yc[i]);
                var madv = ret.MA_DV;
                //var tendv=ret.TEN_DV;
                var sl = ret.SO_LUONG;
                var giadv = ret.GIA_DV;
                var thanhtien = ret.THANH_TIEN;
                var arr = [sophieu, madv, dvtt, sl, giadv, thanhtien, "true"];
                var arr_str = convertArray(arr);
                arr_cls.push(arr_str);
            }
            var url = "themchitietdotdieutri?url=" + convertArray_CLS(arr_cls);
            var url_en = (url);
            $.ajax({
                url: url_en
            }).always(function(data) {
                var id1 = $("#list_dtck_phieu").jqGrid('getGridParam', 'selrow');
                var ret = $("#list_dtck_phieu").jqGrid('getRowData', id1);
                var makhambenh = ret.MA_KHAM_BENH;
                var maphongdv = ret.PHONG_DT_CHUYENKHOA;
                var dvtt = ret.dvtt;
                var arr3 = [makhambenh, dvtt, maphongdv];
                var url3 = "danhsachdotdieutrichuyenkhoa?url=" + convertArray(arr3);
                $("#list_dtck_phieu").jqGrid('setGridParam', {datatype: 'json', url: url3}).trigger('reloadGrid');
                enable_button_dtck("luu");
                toogle_input_dtck(false);
            });
        }
        else {
            jConfirm('Chưa chọn dịch vụ. Nhấn "Tiếp tục" để chỉ định. Nhấn "Hủy" để xóa phiếu?', 'Thông báo', function(r) {
                if (r.toString() == "false") {
                    xoa_dtck();
                }
            });
        }
    }
}
function luu_xetnghiem(dvtt) {
    var sophieu = $("#sophieuxn").val();
    var sovaovien = $("#sovaovien").val();
    var sovaovien_dt = $("#sovaovien_dt").val();
    var capcuu = $("#capcuuxn").prop("checked") == true ? "1" : "0";
    var url_cn = "noitru_xetnghiem_update_bangcha";
    var arr_cn = [stt_dieutri, stt_benhan, stt_dotdieutri, dvtt, sophieu, capcuu];
    $.post(url_cn, {url: convertArray(arr_cn)});
    var active = $("#tab_xn").tabs("option", "active");
    if (active == 0) {
        var str = $("#list_xn_bhyt").jqGrid('getGridParam', 'selarrrow');
        if (str != "" && str != null) {
            var count = str.length;
            for (var i = 0; i < count; i++) {
                var ret = $("#list_xn_bhyt").jqGrid('getRowData', str[i]);
                var madv = ret.MA_XN;
                var sl = ret.SO_LUONG;
                var giadv = ret.GIA_XN;
                var thanhtien = ret.THANH_TIEN;
                var arr = [sophieu, madv, dvtt, sl, giadv, thanhtien, "false", stt_dieutri, stt_benhan, stt_dotdieutri,sovaovien,sovaovien_dt,mabenhnhan];
                var url = "noittru_xetnghiem_insert_chitiet";
                $.post(url, {
                    url: convertArray(arr)
                }).done(function(data) {
                    enable_button_cls("luu", "xn");
                    toogle_input_xn(false);
                    enable_button_in_cls("xn");
                });
            }
        }
        else {
            jConfirm('Chưa chọn xét nghiệm. Nhấn "Tiếp tục" để chỉ định. Nhấn "Hủy" để xóa phiếu?', 'Thông báo', function(r) {
                if (r.toString() == "false") {
                    xoa_xn(dvtt);
                    enable_button_cls("luu", "xn");
                    toogle_input_xn(false);
                    enable_button_in_cls("xn");
                }
            });
        }
    }
    else if (active == 1) {
        var str_yc = $("#list_xn_yeucau").jqGrid('getGridParam', 'selarrrow');
        if (str_yc != "" && str_yc != null) {
            var count = str_yc.length;
            for (var i = 0; i < count; i++) {
                var ret = $("#list_xn_yeucau").jqGrid('getRowData', str_yc[i]);
                var madv = ret.MA_XN;
                //var tendv=ret.TEN_DV;
                var sl = ret.SO_LUONG;
                var giadv = ret.GIA_XN;
                var thanhtien = ret.THANH_TIEN;
                var arr = [sophieu, madv, dvtt, sl, giadv, thanhtien, "true", stt_dieutri, stt_benhan, stt_dotdieutri,sovaovien,sovaovien_dt,mabenhnhan];
                var url = "noittru_xetnghiem_insert_chitiet";
                $.post(url, {
                    url: convertArray(arr)
                }).done(function(data) {
                    enable_button_cls("luu", "xn");
                    toogle_input_xn(false);
                    enable_button_in_cls("xn");
                });
            }
        }
        else {
            jConfirm('Chưa chọn xét nghiệm. Nhấn "Tiếp tục" để chỉ định. Nhấn "Hủy" để xóa phiếu?', 'Thông báo', function(r) {
                if (r.toString() == "false") {
                    xoa_xn(dvtt);
                    enable_button_cls("luu", "xn");
                    toogle_input_xn(false);
                    enable_button_in_cls("xn");
                }
            });
        }
    }
}
function load_dichvu_xn(ret, dvtt) {
    var sophieu = $("#sophieuxn").val();
    var cobhyt = (ret.CO_BHYT.toString() == "Yes") ? true : false;
    var cb_giaxn_cu = $("#cb_giaxn_cu").prop("checked")==true?"1":"0";
    var maphongxn = $("#phongxn").val();
    var arr1 = [!cobhyt, dvtt, sophieu, cb_giaxn_cu,maphongxn];
    var url2 = "noitru_xetnghiem_hienthiluoi?url=" + convertArray(arr1);
    if (cobhyt) {
        $("#tab_xn").tabs("option", "active", 0);
        $("#tab_xn").tabs("option", "disabled", [1]);
        $("#list_xn_bhyt").jqGrid('setGridParam', {datatype: 'json', url: url2}).trigger('reloadGrid');
        $("#xn_cobhyt").click();
    } else {
        $("#tab_xn").tabs("option", "active", 1);
        $("#tab_xn").tabs("option", "disabled", [0]);
        $("#list_xn_yeucau").jqGrid('setGridParam', {datatype: 'json', url: url2}).trigger('reloadGrid');
        $("#xn_bnyc").click();
    }
}
function load_dichvu_cdha(ret, dvtt) {
    var sophieu = $("#sophieucdha").val();
    var cb_giacdha_cu = $("#cb_giacdha_cu").prop("checked")==true?"1":"0";
    var arr1 = ["false", dvtt, sophieu, ret.MA_PHONG_CDHA, cb_giacdha_cu];
    var arr2 = ["true", dvtt, sophieu, ret.MA_PHONG_CDHA, cb_giacdha_cu];
    if (ret.CO_BHYT.toString() == "Yes") {
        $("#tab_cdha").tabs("option", "active", 0);
        $("#tab_cdha").tabs("option", "disabled", [1]);
        var url1 = "noitru_cdha_hienthiluoi?url=" + convertArray(arr1);
        $("#list_cdha_bhyt").jqGrid('setGridParam', {datatype: 'json', url: url1}).trigger('reloadGrid');
        $("#cdha_cobhyt").click();
    }
    else {
        $("#tab_cdha").tabs("option", "active", 1);
        $("#tab_cdha").tabs("option", "disabled", [0]);
        var url2 = "noitru_cdha_hienthiluoi?url=" + convertArray(arr2);
        $("#list_cdha_yeucau").jqGrid('setGridParam', {datatype: 'json', url: url2}).trigger('reloadGrid');
        $("#cdha_bnyc").click();
    }
}
function load_thongtin_xn(ret) {
    $('#phongxn').val(ret.MA_PHONG_XN);
    $('#ngaychidinhttpt').val(ret.NGAY_CHI_DINH);
    $('#sophieuxn').val(ret.SO_PHIEU_XN);
    var bhytkhongchi = ret.CO_BHYT.toString() == "No" ? "1" : "0";
    $('#bhytkhongchi_xn').val(bhytkhongchi);
    $("#capcuuxn").prop('checked', ret.CAPCUU.toString() == "1" ? true : false);
}
function load_thongtin_cdha(ret) {
    $('#phongcdha').val(ret.MA_PHONG_CDHA);
    $('#ngaycdha').val(ret.NGAY_CHI_DINH);
    $('#sophieucdha').val(ret.SO_PHIEU_CDHA);
    var bhytkhongchi = ret.CO_BHYT.toString() == "No" ? "1" : "0";
    $('#bhytkhongchi_cdha').val(bhytkhongchi);
    $("#capcuucdha").prop('checked', ret.CAPCUU.toString() == "1" ? true : false);
}
function load_dichvu_ttpt(ret, dvtt) {
    var sophieu = $("#sophieuttpt").val();
    var maloaidv = $("#loaittpt").val();
    var chuyenkhoa = (maloaidv == "VLTL") ? "0" : ($("#chuyenkhoattpt").val());
    var ctchuyenkhoa = (chuyenkhoa != "RANGHAMMAT") ? "0" : ($("#ctchuyenkhoattpt").val());
    var cb_giattpt_cu = $("#cb_giattpt_cu").prop("checked")==true?"1":"0";
    var arr1 = ["false", dvtt, sophieu, maloaidv, chuyenkhoa, ctchuyenkhoa, cb_giattpt_cu];
    var arr2 = ["true", dvtt, sophieu, maloaidv, chuyenkhoa, ctchuyenkhoa, cb_giattpt_cu];
    if (ret.BHYT_CHI.toString() == "Yes") {
        $("#tab_ttpt").tabs("option", "active", 0);
        $("#tab_ttpt").tabs("option", "disabled", [1]);
        var url1 = "noitru_ttpt_hienthiluoi?url=" + convertArray(arr1);
        $("#list_ttpt_bhyt").jqGrid('setGridParam', {datatype: 'json', url: url1}).trigger('reloadGrid');
        $("#ttpt_cobhyt").click();
    }
    else {
        $("#tab_ttpt").tabs("option", "active", 1);
        $("#tab_ttpt").tabs("option", "disabled", [0]);
        var url2 = "noitru_ttpt_hienthiluoi?url=" + convertArray(arr2);
        $("#list_ttpt_yeucau").jqGrid('setGridParam', {datatype: 'json', url: url2}).trigger('reloadGrid');
        $("#ttpt_bnyc").click();
    }
}
function load_dichvu_dtck(ret) {
    var dvtt = ret.dvtt;
    var sophieu = ret.id_dotdieutrichuyenkhoa;
    var maloaidv = ret.MA_LOAI_DV;
    var chuyenkhoa = (maloaidv == "VLTL") ? "0" : ret.CHUYEN_KHOA;
    var ctchuyenkhoa = (chuyenkhoa != "RANGHAMMAT") ? "0" : ret.CHI_TIET_CHUYEN_KHOA;
    var arr1 = ["false", dvtt, sophieu, maloaidv, chuyenkhoa, ctchuyenkhoa];
    var arr2 = ["true", dvtt, sophieu, maloaidv, chuyenkhoa, ctchuyenkhoa];
    if (ret.CO_BHYT.toString() == "Yes") {
        $("#tab_dtck").tabs("option", "active", 0);
        $("#tab_dtck").tabs("option", "disabled", [1]);
        var url1 = "danhsachdieutrichuyenkhoa?url=" + convertArray(arr1);
        $("#list_dtck_bhyt").jqGrid('setGridParam', {datatype: 'json', url: url1}).trigger('reloadGrid');
        $("#dtck_cobhyt").click();
    }
    else {
        $("#tab_dtck").tabs("option", "active", 1);
        $("#tab_dtck").tabs("option", "disabled", [0]);
        var url2 = "danhsachdieutrichuyenkhoa?url=" + convertArray(arr2);
        $("#list_dtck_yeucau").jqGrid('setGridParam', {datatype: 'json', url: url2}).trigger('reloadGrid');
        $("#dtck_bnyc").click();
    }
}
function load_thongtin_ttpt(ret) {
    $('#phongttpt').val(ret.MA_PHONG_DICHVU);
    $('#loaittpt').val(ret.MA_LOAI_DICHVU);
    if ($("#loaittpt").val() != "VLTL" && $("#loaittpt").val() != "TIEMNGUA") {
        show_ckttpt();
        if ($("#chuyenkhoattpt").val() == "RANGHAMMAT")
            show_ctttpt();
    }
    else {
        hide_ckttpt();
        hide_ctttpt();
    }
    $('#chuyenkhoattpt').val(ret.CHUYEN_KHOA);
    if ($("#chuyenkhoattpt").val() == "RANGHAMMAT")
        show_ctttpt();
    else
        hide_ctttpt();
    $('#ctchuyenkhoattpt').val(ret.CHI_TIET_CHUYEN_KHOA);
    $('#ngaychidinhttpt').val(ret.NGAY_CHI_DINH);
    $('#sophieuttpt').val(ret.SO_PHIEU_DICHVU);
    $("#capcuuttpt").prop('checked', ret.CAPCUU.toString() == "1" ? true : false);
}
function load_thongtin_dtck(ret) {
    $('#phongdtck').val(ret.PHONG_DT_CHUYENKHOA);
    $('#loaidtck').val(ret.MA_LOAI_DV);
    if ($("#loaidtck").val() != "VLTL") {
        show_ckdtck();
        if ($("#chuyenkhoadtck").val() == "RANGHAMMAT")
            show_ctdtck();
    }
    else {
        hide_ckdtck();
        hide_ctdtck();
    }
    $('#chuyenkhoadtck').val(ret.CHUYEN_KHOA);
    if ($("#chuyenkhoadtck").val() == "RANGHAMMAT")
        show_ctdtck();
    else
        hide_ctdtck();
    $('#ctchuyenkhoadtck').val(ret.CHI_TIET_CHUYEN_KHOA);
    $('#tungaydtck').val(ret.dieutri_tungay);
    $('#denngaydtck').val(ret.dieutri_denngay);
    $('#ghichudtck').val(ret.ghichu_chidinhdieutri);
    $('#iddtck').val(ret.id_dotdieutrichuyenkhoa);
}
function show_ckttpt() {
    $("#chuyenkhoa_ttpt").show();
    $("#chuyenkhoattpt").show();
}
function show_ctttpt() {
    $("#ct_chuyenkhoattpt").show();
    $("#ctchuyenkhoattpt").show();
}
function hide_ckttpt() {
    $("#chuyenkhoa_ttpt").hide();
    $("#chuyenkhoattpt").hide();
}
function hide_ctttpt() {
    $("#ct_chuyenkhoattpt").hide();
    $("#ctchuyenkhoattpt").hide();
}
function enable_button_cls(bt, cls) {
    if (bt == "batdau") {
        $("#them_" + cls).attr("disabled", false);
        $("#them_" + cls).removeClass("button_disabled");
        $("#them_" + cls).addClass("button_shadow");
        $("#luu_" + cls).attr("disabled", "disabled");
        $("#luu_" + cls).addClass("button_disabled");
        $("#luu_" + cls).removeClass("button_shadow");
        $("#huy_" + cls).attr("disabled", "disabled");
        $("#huy_" + cls).addClass("button_disabled");
        $("#huy_" + cls).removeClass("button_shadow");
    }
    else if (bt == "them") {
        $("#them_").attr("disabled", true);
        $("#them_" + cls).addClass("button_disabled");
        $("#them_" + cls).removeClass("button_shadow");
        $("#luu_" + cls).attr("disabled", false);
        $("#luu_" + cls).removeClass("button_disabled");
        $("#luu_" + cls).addClass("button_shadow");
        $("#huy_" + cls).attr("disabled", false);
        $("#huy_" + cls).removeClass("button_disabled");
        $("#huy_" + cls).addClass("button_shadow");
    }
    else if (bt == "huy" || bt == "luu") {
        $("#luu_" + cls).attr("disabled", true);
        $("#luu_" + cls).addClass("button_disabled");
        $("#luu_" + cls).removeClass("button_shadow");
        $("#huy_" + cls).attr("disabled", true);
        $("#huy_" + cls).addClass("button_disabled");
        $("#huy_" + cls).removeClass("button_shadow");
        $("#them_" + cls).attr("disabled", false);
        $("#them_" + cls).addClass("button_shadow");
        $("#them_" + cls).removeClass("button_disabled");
    }
}
function loadtt_ttpt(arr) {
    $("#hotenttpt").val(arr.TEN_BENH_NHAN);
    $("#tuoittpt").val(arr.TUOI);
    $("#cobhytttpt").prop('checked', arr.CO_BAO_HIEM);
    $("#gioitinhttpt").val(arr.GIOI_TINH);
    $("#diachittpt").val(arr.DIA_CHI);
}
function loadtt_goidichvu(arr) {
    $("#hotengoidichvu").val(arr.TEN_BENH_NHAN);
    $("#tuoigoidichvu").val(arr.TUOI);
    $("#cobhytgoidichvu").prop('checked', arr.CO_BAO_HIEM);
    $("#gioitinhgoidichvu").val(arr.GIOI_TINH);
    $("#diachigoidichvu").val(arr.DIA_CHI);
}
function loadtt_cdha(arr) {
    $("#hotencdha").val(arr.TEN_BENH_NHAN);
    $("#tuoicdha").val(arr.TUOI);
    $("#cobhytcdha").prop('checked', arr.CO_BAO_HIEM);
    $("#gioitinhcdha").val(arr.GIOI_TINH);
    $("#diachicdha").val(arr.DIA_CHI);
}
function loadtt_xn(arr) {
    $("#hotenxn").val(arr.TEN_BENH_NHAN);
    $("#tuoixn").val(arr.TUOI);
    $("#cobhytxn").prop('checked', arr.CO_BAO_HIEM);
    $("#gioitinhxn").val(arr.GIOI_TINH);
    $("#diachixn").val(arr.DIA_CHI);
}
function toogle_input_ttpt(bool) {
    $("#phongttpt").attr("disabled", bool);
    $("#loaittpt").attr("disabled", bool);
    $("#chuyenkhoattpt").attr("disabled", bool);
    $("#ctchuyenkhoattpt").attr("disabled", bool);
    $("#ngaychidinhttpt").attr("disabled", bool);
    //$("#capcuuttpt").attr("disabled", bool);
}
function toogle_input_cdha(bool) {
    $("#phongcdha").attr("disabled", bool);
    $("#ngaycdha").attr("disabled", bool);
    //$("#capcuucdha").attr("disabled", bool);
}
function toogle_input_xn(bool) {
    $("#phongxn").attr("disabled", bool);
    $("#ngaychidinhxn").attr("disabled", bool);
    //$("#capcuuxn").attr("disabled", bool);
}