// Dang Phu Qui
function clear_thongtinhanhchinh() {
    $("#thongtinhanhchinh input[type=text]").val("");
    $("#thongtinhanhchinh input[type=hidden]").val("");
}
function change_huonggiaiquyet() {
    if ($("#cbgiaiquyet").val() == "1" || $("#cbgiaiquyet").val() == "2") {
        $("#inphieuhen").show();
    } else {
        $("#inphieuhen").hide();
    }
    if ($("#cbgiaiquyet").val() == "3") {
        $("#cbphongkhamchuyen").show();
        $("#chuyenpk").show();
    } else {
        $("#cbphongkhamchuyen").hide();
        $("#chuyenpk").hide();
    }
    if ($("#cbgiaiquyet").val() == "4") {
        $("#cv_lb").show();
    }
    else
        $("#cv_lb").hide();
    if ($("#cbgiaiquyet").val() == "5") {
        $("#nhapvien_bt").show();
    }
    else
        $("#nhapvien_bt").hide();
    if($("#cbgiaiquyet").val() == "13") {
        $("#hoichuan_bt").show();
    }
    else
        $("#hoichuan_bt").hide();
}

function toogle_hoantatkham(bool) {

}
function enable_bt_in_xn() {
    $("#phieu_xn").attr("disabled", false);
    $("#phieu_xn").removeClass("button_disabled");
    $("#phieu_xn").addClass("button_shadow");
}
function enable_bt_in_cdha() {
    $("#phieu_cdha").attr("disabled", false);
    $("#phieu_cdha").removeClass("button_disabled");
    $("#phieu_cdha").addClass("button_shadow");
}
function enable_bt_in_ttpt() {
    $("#phieu_ttpt").attr("disabled", false);
    $("#phieu_ttpt").removeClass("button_disabled");
    $("#phieu_ttpt").addClass("button_shadow");
}
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
}
function enable_bt_hoantatkham() {
    $("#intoathuocbhyt").attr("disabled", false);
    $("#intoathuocbhyt").removeClass("button_disabled");
    $("#intoathuocbhyt").addClass("button_shadow");
    $("#inbangke").attr("disabled", false);
    $("#inbangke").removeClass("button_disabled");
    $("#inbangke").addClass("button_shadow");
    $("#intoavtbhyt").attr("disabled", false);
    $("#intoavtbhyt").removeClass("button_disabled");
    $("#intoavtbhyt").addClass("button_shadow");
    $("#inbangke_vt").attr("disabled", false);
    $("#inbangke_vt").removeClass("button_disabled");
    $("#inbangke_vt").addClass("button_shadow");
}
function disble_bt_hoantatkham() {
    $("#intoathuocbhyt").attr("disabled", true);
    $("#intoathuocbhyt").addClass("button_disabled");
    $("#intoathuocbhyt").removeClass("button_shadow");
    $("#inbangke").attr("disabled", true);
    $("#inbangke").addClass("button_disabled");
    $("#inbangke").removeClass("button_shadow");
    $("#intoavtbhyt").attr("disabled", true);
    $("#intoavtbhyt").addClass("button_disabled");
    $("#intoavtbhyt").removeClass("button_shadow");
    $("#inbangke_vt").attr("disabled", true);
    $("#inbangke_vt").addClass("button_disabled");
    $("#inbangke_vt").removeClass("button_shadow");
}

function calculate_dyhd() {
    songay = $("#songay_dyhd").val();
    songay = (songay != "") ? parseInt(songay) : 0;
    sang = $("#sang_dyhd").val();
    sang = (sang != "") ? parseFloat(sang) : 0;
    trua = $("#trua_dyhd").val();
    trua = (trua != "") ? parseFloat(trua) : 0;
    chieu = $("#chieu_dyhd").val();
    chieu = (chieu != "") ? parseFloat(chieu) : 0;
    toi = $("#toi_dyhd").val();
    toi = (toi != "") ? parseFloat(toi) : 0;
    dg = $("#dongia_dyhd").val();
    tt = $("#thanhtien_dyhd").val();
    soluong = Math.ceil(songay * (sang + trua + chieu + toi));
    $("#soluong_dyhd").val(soluong);
    sl = $("#soluong_dyhd").val();
    $("#thanhtien_dyhd").val(sl * dg);
}
function calculate_vt() {
    songay = $("#songay_vt").val();
    songay = (songay != "") ? parseInt(songay) : 0;
    sang = $("#sang_vt").val();
    sang = (sang != "") ? parseFloat(sang) : 0;
    trua = $("#trua_vt").val();
    trua = (trua != "") ? parseFloat(trua) : 0;
    chieu = $("#chieu_vt").val();
    chieu = (chieu != "") ? parseFloat(chieu) : 0;
    toi = $("#toi_vt").val();
    toi = (toi != "") ? parseFloat(toi) : 0;
    dg = $("#dongia_vt").val();
    tt = $("#thanhtien_vt").val();
    soluong = Math.ceil(songay * (sang + trua + chieu + toi));
    $("#soluong_vt").val(soluong);
    sl = $("#soluong_vt").val();
    $("#thanhtien_vt").val(sl * dg);
}
function calculate_quay() {
    songay = $("#songay_quay").val();
    songay = (songay != "") ? parseInt(songay) : 0;
    sang = $("#sang_quay").val();
    sang = (sang != "") ? parseFloat(sang) : 0;
    trua = $("#trua_quay").val();
    trua = (trua != "") ? parseFloat(trua) : 0;
    chieu = $("#chieu_quay").val();
    chieu = (chieu != "") ? parseFloat(chieu) : 0;
    toi = $("#toi_quay").val();
    toi = (toi != "") ? parseFloat(toi) : 0;
    dg = $("#dongia_quay").val();
    tt = $("#thanhtien_quay").val();
    soluong = Math.ceil(songay * (sang + trua + chieu + toi));
    $("#soluong_quay").val(soluong);
    sl = $("#soluong_quay").val();
    $("#thanhtien_quay").val(sl * dg);
}
function calculate_mp() {
    songay = $("#songay_mp").val();
    songay = (songay != "") ? parseInt(songay) : 0;
    sang = $("#sang_mp").val();
    sang = (sang != "") ? parseFloat(sang) : 0;
    trua = $("#trua_mp").val();
    trua = (trua != "") ? parseFloat(trua) : 0;
    chieu = $("#chieu_mp").val();
    chieu = (chieu != "") ? parseFloat(chieu) : 0;
    toi = $("#toi_mp").val();
    toi = (toi != "") ? parseFloat(toi) : 0;
    dg = $("#dongia_mp").val();
    tt = $("#thanhtien_mp").val();
    soluong = Math.ceil(songay * (sang + trua + chieu + toi));
    $("#soluong_mp").val(soluong);
    sl = $("#soluong_mp").val();
    $("#thanhtien_mp").val(sl * dg);
}
function calculate_mn() {
    songay = $("#songay_mn").val();
    songay = (songay != "") ? parseInt(songay) : 0;
    sang = $("#sang_mn").val();
    sang = (sang != "") ? parseFloat(sang) : 0;
    trua = $("#trua_mn").val();
    trua = (trua != "") ? parseFloat(trua) : 0;
    chieu = $("#chieu_mn").val();
    chieu = (chieu != "") ? parseFloat(chieu) : 0;
    toi = $("#toi_mn").val();
    toi = (toi != "") ? parseFloat(toi) : 0;
    soluong = Math.ceil(songay * (sang + trua + chieu + toi));
    $("#soluong_mn").val(soluong);
}
function calculate_dy() {
    dg = $("#dongia_dy").val();
    sl = $("#soluong_dy").val();
    $("#thanhtien_dy").val(sl * dg);
}
function calculate(toa) {
    songay = $("#songay" + toa).val();
    songay = (songay != "") ? parseInt(songay) : 0;
    sang = $("#sang" + toa).val();
    sang = (sang != "") ? parseFloat(sang) : 0;
    trua = $("#trua" + toa).val();
    trua = (trua != "") ? parseFloat(trua) : 0;
    chieu = $("#chieu" + toa).val();
    chieu = (chieu != "") ? parseFloat(chieu) : 0;
    toi = $("#toi" + toa).val();
    toi = (toi != "") ? parseFloat(toi) : 0;
    dg = $("#dongia" + toa).val();
    tt = $("#thanhtien" + toa).val();
    soluong = Math.ceil(songay * (sang + trua + chieu + toi));
    $("#soluong" + toa).val(Math.ceil(soluong));
    sl = $("#soluong" + toa).val();
    $("#thanhtien" + toa).val(sl * dg);
}
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
    }).done(function (data) {
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
function xoa_cdha() {
    var id1 = $("#list_cdha_phieu").jqGrid('getGridParam', 'selrow');
    var ret = $("#list_cdha_phieu").jqGrid('getRowData', id1);
    var makhambenh = "kb_" + $("#idtiepnhan").val();
    var ngaychidinh = convertStr_MysqlDate($("#ngaycdha").val());
    var arr = [makhambenh, ret.SO_PHIEU_CDHA];
    var url = "xoaphieu_cdha?url=" + convertArray(arr);
    $.ajax({
        url: url
    }).done(function (data) {
        if (data == "1") {
            jAlert("Bệnh nhân đã thanh toán", 'Cảnh báo');
        }
        else if (data == "2") {
            jAlert("Bệnh nhân đã được thực hiện chẩn đoán hình ảnh", 'Cảnh báo');
        }
        else {
            $("#huy_cdha").click();
            var arr3 = [makhambenh, ngaychidinh];
            var url3 = "laydanhsach_phieucdha?url=" + convertArray(arr3);
            $("#list_cdha_phieu").jqGrid('setGridParam', {datatype: 'json', url: url3}).trigger('reloadGrid');
        }
        enable_bt_in_cdha();
    });
}
function xoa_ttpt() {
    var id1 = $("#list_ttpt_phieu").jqGrid('getGridParam', 'selrow');
    var ret = $("#list_ttpt_phieu").jqGrid('getRowData', id1);
    var makhambenh = "kb_" + $("#idtiepnhan").val();
    var ngaychidinh = convertStr_MysqlDate($("#ngaychidinhttpt").val());
    var arr = [makhambenh, ret.SO_PHIEU_DICHVU];
    var url = "xoaphieu_ttpt?url=" + convertArray(arr);
    $.ajax({
        url: url
    }).done(function (data) {
        enable_bt_in_ttpt();
        if (data == "1") {
            jAlert("Bệnh nhân đã thanh toán", 'Cảnh báo');
        }
        else if (data == "2") {
            jAlert("Bệnh nhân đã được chẩn đoán dịch vụ", 'Cảnh báo');
        }
        else {
            $("#huy_ttpt").click();
            var arr3 = [makhambenh, ngaychidinh];
            if (ttpt_vltl == "0") {
                url3 = "laydanhsach_phieudichvu?url=" + convertArray(arr3);
            } else if (ttpt_vltl == "1") {
                url3 = "vltl_laydanhsach_phieudichvu?url=" + convertArray(arr3);
            } else if (ttpt_vltl == "2") {
                url3 = "tiemngua_laydanhsach_phieudichvu?url=" + convertArray(arr3);
            }
            $("#list_ttpt_phieu").jqGrid('setGridParam', {datatype: 'json', url: url3}).trigger('reloadGrid');
        }
    });
}

function xoa_xn() {
    var id1 = $("#list_xn_phieu").jqGrid('getGridParam', 'selrow');
    var ret = $("#list_xn_phieu").jqGrid('getRowData', id1);
    var makhambenh = "kb_" + $("#idtiepnhan").val();
    var ngaychidinh = convertStr_MysqlDate($("#ngaychidinhxn").val());
    var arr = [makhambenh, ret.SO_PHIEU_XN];
    var url = "xoaphieu_xn?url=" + convertArray(arr);
    $.ajax({
        url: url
    }).done(function (data) {
        if (data == "1") {
            jAlert("Bệnh nhân đã thanh toán", 'Cảnh báo');
        }
        else if (data == "2") {
            jAlert("Bệnh nhân đã được xét nghiệm", 'Cảnh báo');
        }
        else {
            $("#huy_xn").click();
            //$('#list_xn_bhyt').jqGrid('clearGridData');
            //$('#list_xn_yeucau').jqGrid('clearGridData');
            var arr3 = [makhambenh, ngaychidinh];
            var url3 = "laydanhsach_phieuxetnghiem?url=" + convertArray(arr3);
            $("#list_xn_phieu").jqGrid('setGridParam', {datatype: 'json', url: url3}).trigger('reloadGrid');
        }
    });
}
function loadchiso() {
    chieucao = $("#chieucao").val();
    cannang = $("#cannang").val();
    creatinin = $("#creatinin").val();
    tuoi = $("#tuoi").val();
    gt = $("#gioitinh").val();
    la_nu = (gt == "true") ? "false" : "true";
    if (chieucao != "" && cannang != "") {
        $("#chisobmi").val(chisobmi(parseFloat(cannang), parseFloat(chieucao)));
        $("#kqbmi").val(nhandinh_bmi($("#chisobmi").val()));
        if (creatinin != "") {
            $("#dothanhthai").val(dothanhthai_Cockroft_Gault(tuoi, cannang, chieucao, creatinin, la_nu));
            $("#kqdothanhthai").val(nhandinh_dothanhthai($("#dothanhthai").val()));
        }
    }
}
function luu_cdha(dvtt) {
    var id_tt = $("#list_cdha_phieu").jqGrid('getGridParam', 'selrow');
    var ret_tt = $("#list_cdha_phieu").jqGrid('getRowData', id_tt);
    var ngaychidinh = convertStr_MysqlDate(ret_tt.NGAY_CHI_DINH);
    var sophieu = $("#sophieucdha").val();
    var idtiepnhan = $("#idtiepnhan").val();
    var makhambenh = "kb_" + idtiepnhan;
    var mabenhnhan = $("#mayte").val();
    var sovaovien = $("#sovaovien").val();
    var sophieuthanhtoan = $("#sophieuthanhtoan").val();
    var active = $("#tab_cdha").tabs("option", "active");
    var capcuu = $("#capcuucdha").prop("checked") == true ? "1" : "0";
    var url_cn = "cdha_update_bangcha";
    var arr_cn = [makhambenh, dvtt, sophieu, capcuu];
    $.post(url_cn, {url: convertArray(arr_cn)});
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
                var arr = [sophieu, madv, sl, giadv, thanhtien, "0", mabenhnhan, sophieuthanhtoan, idtiepnhan, makhambenh, ngaychidinh,sovaovien];
                var url = "themchidinh_cdhachitiet?url=" + convertArray(arr);
                $.ajax({
                    url: url
                }).done(function (data) {

                });
            }
            enable_button_cdha("luu");
            toogle_input_cdha(false);
            enable_bt_in_cdha();
        }
        else {
            jConfirm('Chưa chọn chẩn đoán hình ảnh. Nhấn "Tiếp tục" để chỉ định. Nhấn "Hủy" để xóa phiếu?', 'Thông báo', function (r) {
                if (r.toString() == "false") {
                    xoa_cdha();
                }
            });
        }
    } else if (active == 1) {
        var str_yc = $("#list_cdha_yeucau").jqGrid('getGridParam', 'selarrrow');
        if (str_yc != "" && str_yc != null) {
            //var mang_yc = str_yc.split(",");
            var count = str_yc.length;
            for (var i = 0; i < count; i++) {
                var ret = $("#list_cdha_yeucau").jqGrid('getRowData', str_yc[i]);
                var madv = ret.MA_CDHA;
                var sl = ret.SO_LUONG;
                var giadv = ret.GIA_CDHA;
                var thanhtien = ret.THANH_TIEN;
                var arr = [sophieu, madv, sl, giadv, thanhtien, "1", mabenhnhan, sophieuthanhtoan, idtiepnhan, makhambenh, ngaychidinh,sovaovien];
                var url = "themchidinh_cdhachitiet?url=" + convertArray(arr);
                var url_en = (url);
                $.ajax({
                    url: url_en
                }).done(function (data) {
                });
            }
            enable_button_cdha("luu");
            toogle_input_cdha(false);
            enable_bt_in_cdha()
        }
        else {
            jConfirm('Chưa chọn chẩn đoán hình ảnh. Nhấn "Tiếp tục" để chỉ định. Nhấn "Hủy" để xóa phiếu?', 'Thông báo', function (r) {
                if (r.toString() == "false") {
                    xoa_cdha();
                }
            });
        }
    }
}
function luu_ttpt(dvtt) {
    var id_tt = $("#list_ttpt_phieu").jqGrid('getGridParam', 'selrow');
    var ret_tt = $("#list_ttpt_phieu").jqGrid('getRowData', id_tt);
    var ngaychidinh = convertStr_MysqlDate(ret_tt.NGAY_CHI_DINH);
    var sophieu = $("#sophieuttpt").val();
    var idtiepnhan = $("#idtiepnhan").val();
    var makhambenh = "kb_" + idtiepnhan;
    var mabenhnhan = $("#mayte").val();
    var sovaovien = $("#sovaovien").val();
    var sophieuthanhtoan = $("#sophieuthanhtoan").val();
    var active = $("#tab_ttpt").tabs("option", "active");
    var capcuu = $("#capcuuttpt").prop("checked") == true ? "1" : "0";
    var url_cn = "ttpt_update_bangcha";
    var arr_cn = [makhambenh, dvtt, sophieu, capcuu];
    $.post(url_cn, {url: convertArray(arr_cn)});
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
                var arr = [sophieu, madv, sl, giadv, thanhtien, "0", mabenhnhan, sophieuthanhtoan, idtiepnhan, makhambenh, ngaychidinh,sovaovien];
                var url = "themchidinh_ttptchitiet?url=" + convertArray(arr);
                $.ajax({
                    url: url
                }).always(function (data) {
                    enable_button_ttpt("luu");
                    toogle_input_ttpt(false);
                    enable_bt_in_ttpt();
                });
            }
        } else {
            jConfirm('Chưa chọn thủ thuật phẩu thuật. Nhấn "Tiếp tục" để chỉ định. Nhấn "Hủy" để xóa phiếu?', 'Thông báo', function (r) {
                if (r.toString() == "false") {
                    xoa_ttpt();
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
                var arr = [sophieu, madv, sl, giadv, thanhtien, "1", mabenhnhan, sophieuthanhtoan, idtiepnhan, makhambenh, ngaychidinh,sovaovien];
                var url = "themchidinh_ttptchitiet?url=" + convertArray(arr);
                $.ajax({
                    url: url
                }).always(function (data) {
                    enable_button_ttpt("luu");
                    toogle_input_ttpt(false);
                    enable_bt_in_ttpt();
                });
            }
        }
        else {
            jConfirm('Chưa chọn thủ thuật phẩu thuật. Nhấn "Tiếp tục" để chỉ định. Nhấn "Hủy" để xóa phiếu?', 'Thông báo', function (r) {
                if (r.toString() == "false") {
                    xoa_ttpt();
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
            }).always(function () {
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
            jConfirm('Chưa chọn dịch vụ. Nhấn "Tiếp tục" để chỉ định. Nhấn "Hủy" để xóa phiếu?', 'Thông báo', function (r) {
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
            }).always(function (data) {
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
            jConfirm('Chưa chọn dịch vụ. Nhấn "Tiếp tục" để chỉ định. Nhấn "Hủy" để xóa phiếu?', 'Thông báo', function (r) {
                if (r.toString() == "false") {
                    xoa_dtck();
                }
            });
        }
    }
}
function luu_xetnghiem(dvtt) {
    var id_p = $("#list_xn_phieu").jqGrid('getGridParam', 'selrow');
    var ret_p = $("#list_xn_phieu").jqGrid('getRowData', id_p);
    var ngaychidinh = convertStr_MysqlDate(ret_p.NGAY_CHI_DINH);
    var sophieu = $("#sophieuxn").val();
    var idtiepnhan = $("#idtiepnhan").val();
    var makhambenh = "kb_" + idtiepnhan;
    var mabenhnhan = $("#mayte").val();
    var sovaovien = $("#sovaovien").val();
    var sophieuthanhtoan = $("#sophieuthanhtoan").val();
    var capcuu = $("#capcuuxn").prop("checked") == true ? "1" : "0";
    var active = $("#tab_xn").tabs("option", "active");
    var url_cn = "xetnghiem_update_bangcha";
    var arr_cn = [makhambenh, dvtt, sophieu, capcuu];
    $.post(url_cn, {url: convertArray(arr_cn)});
    if (active == 0) {
        var str = $("#list_xn_bhyt").jqGrid('getGridParam', 'selarrrow');
        if (str != "" && str != null) {
            var count = str.length;
            for (var i = 0; i < count; i++) {
                var ret = $("#list_xn_bhyt").jqGrid('getRowData', str[i]);
                var madv = ret.MA_XN;
                //var tendv=ret.TEN_DV;
                var sl = ret.SO_LUONG;
                var giadv = ret.GIA_XN;
                var thanhtien = ret.THANH_TIEN;
                var arr = [sophieu, madv, sl, giadv, thanhtien, "0", dvtt, mabenhnhan, sophieuthanhtoan, idtiepnhan, makhambenh, ngaychidinh,sovaovien];
                var url = "themchidinh_xnchitiet?url=" + convertArray(arr);
                $.ajax({
                    url: url
                }).always(function (data) {
                    enable_button_xn("luu");
                    toogle_input_xn(false);
                    enable_bt_in_xn();
                });
            }
        }
        else {
            jConfirm('Chưa chọn xét nghiệm. Nhấn "Tiếp tục" để chỉ định. Nhấn "Hủy" để xóa phiếu?', 'Thông báo', function (r) {
                if (r.toString() == "false") {
                    xoa_xn();
                    enable_button_xn("luu");
                    toogle_input_xn(false);
                    enable_bt_in_xn();
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
                var arr = [sophieu, madv, sl, giadv, thanhtien, "1", dvtt, mabenhnhan, sophieuthanhtoan, idtiepnhan, makhambenh, ngaychidinh,sovaovien];
                var url = "themchidinh_xnchitiet?url=" + convertArray(arr);
                $.ajax({
                    url: url
                }).always(function (data) {
                    enable_button_xn("luu");
                    toogle_input_xn(false);
                    enable_bt_in_xn();
                });
            }
        }
        else {
            jConfirm('Chưa chọn xét nghiệm. Nhấn "Tiếp tục" để chỉ định. Nhấn "Hủy" để xóa phiếu?', 'Thông báo', function (r) {
                if (r.toString() == "false") {
                    xoa_xn();
                    enable_button_xn("luu");
                    toogle_input_xn(false);
                    enable_bt_in_xn();
                }
            });
        }
    }

}
function load_dichvu_xn(ret) {
    var sophieu = $("#sophieuxn").val();
    var cb_giaxn_cu = $("#cb_giaxn_cu").prop("checked") == true ? "1" : "0";
    var maphongxn = $("#phongxn").val();
    //jAlert(maphongxn);
    var arr1 = ["0", sophieu, cb_giaxn_cu,maphongxn];
    var arr2 = ["1", sophieu, cb_giaxn_cu,maphongxn];
    if (ret.CO_BHYT.toString() == "Yes") {
        $("#tab_xn").tabs("option", "active", 0);
        $("#tab_xn").tabs("option", "disabled", [1]);
        var url1 = "laydanhsach_xetnghiem?url=" + convertArray(arr1);
        $("#list_xn_bhyt").jqGrid('setGridParam', {datatype: 'json', url: url1}).trigger('reloadGrid');
        $("#xn_cobhyt").click();
    }
    else {
        $("#tab_xn").tabs("option", "active", 1);
        $("#tab_xn").tabs("option", "disabled", [0]);
        var url2 = "laydanhsach_xetnghiem?url=" + convertArray(arr2);
        $("#list_xn_yeucau").jqGrid('setGridParam', {datatype: 'json', url: url2}).trigger('reloadGrid');
        $("#xn_bnyc").click();
    }
}
function load_dichvu_cdha(ret) {
    var sophieu = $("#sophieucdha").val();
    var cb_giacdha_cu = $("#cb_giacdha_cu").prop("checked") == true ? "1" : "0";
    var arr1 = ["0", sophieu, ret.MA_PHONG_CDHA, cb_giacdha_cu];
    var arr2 = ["1", sophieu, ret.MA_PHONG_CDHA, cb_giacdha_cu];
    if (ret.CO_BHYT.toString() == "Yes") {
        $("#tab_cdha").tabs("option", "active", 0);
        $("#tab_cdha").tabs("option", "disabled", [1]);
        var url1 = "laydanhsach_cdha?url=" + convertArray(arr1);
        $("#list_cdha_bhyt").jqGrid('setGridParam', {datatype: 'json', url: url1}).trigger('reloadGrid');
        $("#cdha_cobhyt").click();
    }
    else {
        $("#tab_cdha").tabs("option", "active", 1);
        $("#tab_cdha").tabs("option", "disabled", [0]);
        var url2 = "laydanhsach_cdha?url=" + convertArray(arr2);
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
function load_dichvu_ttpt(ret) {
    var sophieu = $("#sophieuttpt").val();
    var maloaidv = $("#loaittpt").val();
    var chuyenkhoa = (maloaidv == "VLTL") ? "0" : ($("#chuyenkhoattpt").val());
    var ctchuyenkhoa = (chuyenkhoa != "RANGHAMMAT") ? "0" : ($("#ctchuyenkhoattpt").val());
    var cb_giattpt_cu = $("#cb_giattpt_cu").prop("checked") == true ? "1" : "0";
    var arr1 = ["0", sophieu, maloaidv, chuyenkhoa, ctchuyenkhoa, cb_giattpt_cu];
    var arr2 = ["1", sophieu, maloaidv, chuyenkhoa, ctchuyenkhoa, cb_giattpt_cu];
    if (ret.BHYT_CHI.toString() == "Yes") {
        $("#tab_ttpt").tabs("option", "active", 0);
        $("#tab_ttpt").tabs("option", "disabled", [1]);
        var url1 = "laydanhsach_ttpt?url=" + convertArray(arr1);
        $("#list_ttpt_bhyt").jqGrid('setGridParam', {datatype: 'json', url: url1}).trigger('reloadGrid');
        $("#ttpt_cobhyt").click();
    }
    else {
        $("#tab_ttpt").tabs("option", "active", 1);
        $("#tab_ttpt").tabs("option", "disabled", [0]);
        var url2 = "laydanhsach_ttpt?url=" + convertArray(arr2);
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
    var arr1 = ["0", dvtt, sophieu, maloaidv, chuyenkhoa, ctchuyenkhoa];
    var arr2 = ["1", dvtt, sophieu, maloaidv, chuyenkhoa, ctchuyenkhoa];
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
function delete_thuocngoaitru() {
    var id = $("#list_thuocbhyt").jqGrid('getGridParam', 'selrow');
    if (id) {
        var ret = $("#list_thuocbhyt").jqGrid('getRowData', id);
        var arr = [ret.STT_TOATHUOC, $("#matoathuoc").val(), $("#dvtt").val(), "kb_" + $("#idtiepnhan").val(), $("#sophieuthanhtoan").val()];
        var url = "xoathuocngoaitru_giamtai?url=" + convertArray(arr);
        $.ajax({
            url: url
        }).done(function (data) {
            if (data == "1")
                jAlert("Bệnh nhân đã thanh toán viện phí", 'Cảnh báo');
            else if (data == "2")
                jAlert("Bệnh nhân đã được xuất thuốc", 'Cảnh báo');
            else
                $("#list_thuocbhyt").jqGrid('setGridParam', {datatype: 'json'}).trigger('reloadGrid');
        }).fail(function () {
            $("#list_thuocbhyt").jqGrid('setGridParam', {datatype: 'json'}).trigger('reloadGrid');
        });
    } else {
        jAlert("Chọn 1 dòng thuốc để xóa", 'Cảnh báo');
    }
}
function loadchitiettoathuoc(ret) {
    $("#sott_toathuoc").val(ret.STT_TOATHUOC);
    $("#mavattu").val(ret.MAVATTU);
    $("#makhovattu").val(ret.MAKHOVATTU);
    $("#tenthuongmai").val(ret.TEN_VAT_TU);
    $("#tengoc").val(ret.HOAT_CHAT);
    $("#dvt").val(ret.DVT);
    $("#dangthuoc").val(ret.CACH_SU_DUNG);
    $("#cachdung").val(ret.GHI_CHU_CT_TOA_THUOC);
    $("#songay").val(ret.SO_NGAY_UONG);
    $("#sang").val(ret.SANG_UONG);
    $("#trua").val(ret.TRUA_UONG);
    $("#chieu").val(ret.CHIEU_UONG);
    $("#toi").val(ret.TOI_UONG);
    $("#soluong").val(ret.SO_LUONG);
    $("#dongia_bv").val(ret.DONGIA_BAN_BV);
    $("#dongia").val(ret.DONGIA_BAN_BH);
    $("#thanhtien").val(ret.THANHTIEN_THUOC);
}                 //Toa vat tu
function delete_vattungoaitru() {
    var id = $("#list_vattubhyt").jqGrid('getGridParam', 'selrow');
    if (id) {
        var ret = $("#list_vattubhyt").jqGrid('getRowData', id);
        var arr = [ret.STT_TOATHUOC, $("#matoathuoc").val(), $("#dvtt").val(), "kb_" + $("#idtiepnhan").val(), $("#sophieuthanhtoan").val()];
        var url = "xoathuocngoaitru_giamtai?url=" + convertArray(arr);
        $.ajax({
            url: url
        }).done(function (data) {
            if (data == "1")
                jAlert("Bệnh nhân đã thanh toán", 'Cảnh báo');
            else if (data == "2")
                jAlert("Bệnh nhân đã được xuất thuốc", 'Cảnh báo');
            else
                $("#list_vattubhyt").jqGrid('setGridParam', {datatype: 'json'}).trigger('reloadGrid');
        }).fail(function () {
            $("#list_vattubhyt").jqGrid('setGridParam', {datatype: 'json'}).trigger('reloadGrid');
        });
    } else {
        jAlert("Chọn 1 dòng thuốc để xóa", 'Cảnh báo');
    }
}
function delete_thuocmuangoai() {
    var id = $("#list_thuocmuangoai").jqGrid('getGridParam', 'selrow');
    if (id) {
        var ret = $("#list_thuocmuangoai").jqGrid('getRowData', id);
        var url = "xoachitietthuoc_muangoai?stt=" + ret.STT_TOATHUOC + "&matt=" + $("#matoathuoc_mn").val();
        $.ajax({
            url: url
        }).done(function (data) {
            $("#list_thuocmuangoai").jqGrid('setGridParam', {datatype: 'json'}).trigger('reloadGrid');
        }).fail(function () {
            $("#list_thuocmuangoai").jqGrid('setGridParam', {datatype: 'json'}).trigger('reloadGrid');
        });

    } else {
        jAlert("Chọn 1 dòng thuốc để xóa", 'Cảnh báo');
    }
}
function luu_chuyenphongkham() {
    luu_khambenh();
    jAlert("Chuyển phòng khám thành công", 'Thông báo');
    huy_kham();
}

function loadchitiettoavattu(ret) {
    $("#sott_toathuoc_vt").val(ret.STT_TOATHUOC);
    //$("#matoathuoc").val();
    $("#mavattu_vt").val(ret.MAVATTU);
    $("#makhovattu_vt").val(ret.MAKHOVATTU);
    $("#tenthuongmai_vt").val(ret.TEN_VAT_TU);
    $("#tengoc_vt").val(ret.HOAT_CHAT);
    $("#dvt_vt").val(ret.DVT);
    $("#dangthuoc_vt").val(ret.CACH_SU_DUNG);
    $("#cachdung_vt").val(ret.GHI_CHU_CT_TOA_THUOC);
    $("#songay_vt").val(ret.SO_NGAY_UONG);
    $("#sang_vt").val(ret.SANG_UONG);
    $("#trua_vt").val(ret.TRUA_UONG);
    $("#chieu_vt").val(ret.CHIEU_UONG);
    $("#toi_vt").val(ret.TOI_UONG);
    $("#soluong_vt").val(ret.SO_LUONG);
    $("#dongia_bv_vt").val(ret.DONGIA_BAN_BV);
    $("#dongia_vt").val(ret.DONGIA_BAN_BH);
    $("#thanhtien_vt").val(ret.THANHTIEN_THUOC);
}//Kt toa vat tu
//Toa mien phi
function delete_thuocmienphi() {
    var id = $("#list_thuocmienphi").jqGrid('getGridParam', 'selrow');
    if (id) {
        var ret = $("#list_thuocmienphi").jqGrid('getRowData', id);
        var arr = [ret.STT_TOATHUOC, $("#matoathuoc").val(), $("#dvtt").val(), "kb_" + $("#idtiepnhan").val(), $("#sophieuthanhtoan").val()];
        var url = "xoathuocngoaitru_giamtai?url=" + convertArray(arr);
        $.ajax({
            url: url
        }).done(function (data) {
            if (data == "1")
                jAlert("Bệnh nhân đã thanh toán", 'Cảnh báo');
            else if (data == "2")
                jAlert("Bệnh nhân đã được xuất thuốc", 'Cảnh báo');
            else
                $("#list_thuocmienphi").jqGrid('setGridParam', {datatype: 'json'}).trigger('reloadGrid');
        }).fail(function () {
            $("#list_thuocmienphi").jqGrid('setGridParam', {datatype: 'json'}).trigger('reloadGrid');
        });
    } else {
        jAlert("Chọn 1 dòng thuốc để xóa", 'Cảnh báo');
    }
}
function delete_thuocdongy() {
    var id = $("#list_thuocdongy").jqGrid('getGridParam', 'selrow');
    if (id) {
        var ret = $("#list_thuocdongy").jqGrid('getRowData', id);
        var arr = [ret.STT_TOATHUOC, $("#matoathuoc").val(), $("#dvtt").val(), "kb_" + $("#idtiepnhan").val(), $("#sophieuthanhtoan").val()];
        var url = "xoathuocngoaitru_giamtai?url=" + convertArray(arr);
        $.ajax({
            url: url
        }).done(function (data) {
            if (data == "1")
                jAlert("Bệnh nhân đã thanh toán", 'Cảnh báo');
            else if (data == "2")
                jAlert("Bệnh nhân đã được xuất thuốc", 'Cảnh báo');
            else
                $("#list_thuocdongy").jqGrid('setGridParam', {datatype: 'json'}).trigger('reloadGrid');
        }).fail(function () {
            $("#list_thuocdongy").jqGrid('setGridParam', {datatype: 'json'}).trigger('reloadGrid');
        });
    } else {
        jAlert("Chọn 1 dòng thuốc để xóa", 'Cảnh báo');
    }
}
function loadchitiettoamienphi(ret) {
    $("#sott_toathuoc_mp").val(ret.STT_TOATHUOC);
    //$("#matoathuoc").val();
    $("#mavattu_mp").val(ret.MAVATTU);
    $("#makhovattu_mp").val(ret.MAKHOVATTU);
    $("#tenthuongmai_mp").val(ret.TEN_VAT_TU);
    $("#tengoc_mp").val(ret.HOAT_CHAT);
    $("#dvt_mp").val(ret.DVT);
    $("#dangthuoc_mp").val(ret.CACH_SU_DUNG);
    $("#cachdung_mp").val(ret.GHI_CHU_CT_TOA_THUOC);
    $("#songay_mp").val(ret.SO_NGAY_UONG);
    $("#sang_mp").val(ret.SANG_UONG);
    $("#trua_mp").val(ret.TRUA_UONG);
    $("#chieu_mp").val(ret.CHIEU_UONG);
    $("#toi_mp").val(ret.TOI_UONG);
    $("#soluong_mp").val(ret.SO_LUONG);
    $("#dongia_bv_mp").val(ret.DONGIA_BAN_BV);
    $("#dongia_mp").val(ret.DONGIA_BAN_BH);
    $("#thanhtien_mp").val(ret.THANHTIEN_THUOC);
}//Ketthuc toa mien phi
//Toa tai quay
function delete_thuocquay() {
    var id = $("#list_thuocmuataiquay").jqGrid('getGridParam', 'selrow');
    if (id) {
        var ret = $("#list_thuocmuataiquay").jqGrid('getRowData', id);
        var arr = [ret.STT_TOATHUOC, $("#matoathuoc").val(), $("#dvtt").val(), "kb_" + $("#idtiepnhan").val(), $("#sophieuthanhtoan").val()];
        var url = "xoathuocngoaitru_giamtai?url=" + convertArray(arr);
        $.ajax({
            url: url
        }).done(function (data) {
            if (data == "1")
                jAlert("Bệnh nhân đã thanh toán", 'Cảnh báo');
            else if (data == "2")
                jAlert("Bệnh nhân đã được xuất thuốc", 'Cảnh báo');
            else
                $("#list_thuocmuataiquay").jqGrid('setGridParam', {datatype: 'json'}).trigger('reloadGrid');
        }).fail(function () {
            $("#list_thuocmuataiquay").jqGrid('setGridParam', {datatype: 'json'}).trigger('reloadGrid');
        });
    } else {
        jAlert("Chọn 1 dòng thuốc để xóa", 'Cảnh báo');
    }
}
function loadchitiettoaquay(ret) {
    $("#sott_toathuoc_quay").val(ret.STT_TOATHUOC);
    //$("#matoathuoc").val();
    $("#mavattu_quay").val(ret.MAVATTU);
    $("#makhovattu_quay").val(ret.MAKHOVATTU);
    $("#tenthuongmai_quay").val(ret.TEN_VAT_TU);
    $("#tengoc_quay").val(ret.HOAT_CHAT);
    $("#dvt_quay").val(ret.DVT);
    $("#dangthuoc_quay").val(ret.CACH_SU_DUNG);
    $("#cachdung_quay").val(ret.GHI_CHU_CT_TOA_THUOC);
    $("#songay_quay").val(ret.SO_NGAY_UONG);
    $("#sang_quay").val(ret.SANG_UONG);
    $("#trua_quay").val(ret.TRUA_UONG);
    $("#chieu_quay").val(ret.CHIEU_UONG);
    $("#toi_quay").val(ret.TOI_UONG);
    $("#soluong_quay").val(ret.SO_LUONG);
    $("#dongia_bv_quay").val(ret.DONGIA_BAN_BV);
    $("#dongia_quay").val(ret.DONGIA_BAN_BH);
    $("#thanhtien_quay").val(ret.THANHTIEN_THUOC);
}
//Kt toa tai quay
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
function show_ckdtck() {
    $("#chuyenkhoa_dtck").show();
    $("#chuyenkhoadtck").show();
}
function show_ctdtck() {
    $("#ct_chuyenkhoadtck").show();
    $("#ctchuyenkhoadtck").show();
}
function hide_ckdtck() {
    $("#chuyenkhoa_dtck").hide();
    $("#chuyenkhoadtck").hide();
}
function hide_ctdtck() {
    $("#ct_chuyenkhoadtck").hide();
    $("#ctchuyenkhoadtck").hide();
}
function clear_thuoc() {
    $(".table_beauty input[type='text']").val("");
}
function toogle_input_ksk(bool) {
    $("#mach").attr("disabled", bool);
    $("#nhiptho").attr("disabled", bool);
    $("#nhietdo").attr("disabled", bool);
    $("#huyetaptren").attr("disabled", bool);
    $("#huyetapduoi").attr("disabled", bool);
    $("#chieucao").attr("disabled", bool);
    $("#cannang").attr("disabled", bool);
    $("#creatinin").attr("disabled", bool);
    //$("#cdtuyentruoc").attr("disabled", bool);
    $(".lydochuyen").attr("disabled", bool);
    if (bool == false) {
        $("#cls").attr("disabled", bool);
        $("#cls").addClass("button_shadow");
        $("#cls").removeClass("button_disabled");
    }
    else {
        $("#cls").attr("disabled", "disabled");
        $("#cls").addClass("button_disabled");
        $("#cls").removeClass("button_shadow");
    }
}
function toogle_input(bool) {
    $("#mach").attr("disabled", bool);
    $("#nhiptho").attr("disabled", bool);
    $("#nhietdo").attr("disabled", bool);
    $("#huyetaptren").attr("disabled", bool);
    $("#huyetapduoi").attr("disabled", bool);
    $("#chieucao").attr("disabled", bool);
    $("#cannang").attr("disabled", bool);
    $("#creatinin").attr("disabled", bool);
    $("#chandoantuyentruoc").attr("disabled", bool);
    $(".lydochuyentt").attr("disabled", bool);
    $("#trieuchungls").attr("disabled", bool);
    $("#icd").attr("disabled", bool);
    $("#icd2").attr("disabled", bool);
    $("#icd3").attr("disabled", bool);
    $("#icd_yhct").attr("disabled", bool);
    $("#timkiem_icdthuongdung").attr("disabled", bool);
    $("#timkiem_icdthuongdung2").attr("disabled", bool);
    $("#timkiem_icdthuongdung3").attr("disabled", bool);
    $("#timkiem_icdyhct").attr("disabled", bool);
    $("#cbicd").attr("disabled", bool);
    $("#chandoanyhct").attr("disabled", bool);
    $("#benhphu").attr("disabled", bool);
    $("#benhphu2").attr("disabled", bool);
    $("#giaiquyet").attr("disabled", bool);
    $("#cbgiaiquyet").attr("disabled", bool);
    $("#songayhen").attr("disabled", bool);
    $("#loidan_vt").attr("disabled", bool);
    $("#loidan_mn").attr("disabled", bool);
    $("#loidan_mp").attr("disabled", bool);
    $("#loidan_quay").attr("disabled", bool);
    $("#loidan_dy").attr("disabled", bool);
    $("#baithuoc_dy").attr("disabled", bool);
    $("#pheptri_dy").attr("disabled", bool);
    $("#loidan_dyhd").attr("disabled", bool);
    $("#baithuoc_dyhd").attr("disabled", bool);
    $("#pheptri_dyhd").attr("disabled", bool);
    $("#sothanthuoc_dy").attr("disabled", bool);
    $("#loidan").attr("disabled", bool);
    $("#tngt_cb").attr("disabled", bool);
    $("#tainanthuongtich").attr("disabled", bool);
    
    if (bool == false) {
        $("#cls").attr("disabled", bool);
        $("#cls").addClass("button_shadow");
        $("#cls").removeClass("button_disabled");
    }
    else {
        $("#cls").attr("disabled", "disabled");
        $("#cls").addClass("button_disabled");
        $("#cls").removeClass("button_shadow");
        $("#cbphongkhamchuyen").hide();
        $("#chuyenpk").hide();
        $("#cv_lb").hide();
        $("#nhapvien_bt").hide();
        $("#hoichuan_bt").hide();
    }
}
function enable_toathuoc() {
    $(".table_beauty input[type='text']").attr("disabled", false);
}
function disable_toathuoc() {
    $(".table_beauty input[type='text']").attr("disabled", "disabled");
}
function enable_button(bt, ttk) {
    if (bt == "batdau") {
        $("#kham").attr("disabled", false);
        $("#kham").removeClass("button_disabled");
        $("#kham").addClass("button_shadow");
        $("#sua").attr("disabled", "disabled");
        $("#sua").addClass("button_disabled");
        $("#sua").removeClass("button_shadow");
        $("#luu").attr("disabled", "disabled");
        $("#luu").addClass("button_disabled");
        $("#luu").removeClass("button_shadow");
        $("#huy").attr("disabled", "disabled");
        $("#huy").addClass("button_disabled");
        $("#huy").removeClass("button_shadow");
    }
    else if (bt == "kham") {
        $("#kham").attr("disabled", true);
        $("#kham").addClass("button_disabled");
        $("#kham").removeClass("button_shadow");
        $("#sua").attr("disabled", true);
        $("#sua").addClass("button_disabled");
        $("#sua").removeClass("button_shadow");
        $("#luu").attr("disabled", false);
        $("#luu").removeClass("button_disabled");
        $("#luu").addClass("button_shadow");
        $("#huy").attr("disabled", false);
        $("#huy").removeClass("button_disabled");
        $("#huy").addClass("button_shadow");
    }
    else if (bt == "sua") {
        $("#kham").attr("disabled", true);
        $("#kham").addClass("button_disabled");
        $("#kham").removeClass("button_shadow");
        $("#sua").attr("disabled", true);
        $("#sua").addClass("button_disabled");
        $("#sua").removeClass("button_shadow");
        $("#luu").attr("disabled", false);
        $("#luu").addClass("button_shadow");
        $("#luu").removeClass("button_disabled");
        $("#huy").attr("disabled", false);
        $("#huy").addClass("button_shadow");
        $("#huy").removeClass("button_disabled");
    }
    else if (bt == "luu" || bt == "huy") {
        if (ttk == "1") {
            $("#kham").attr("disabled", false);
            $("#kham").addClass("button_shadow");
            $("#kham").removeClass("button_disabled");
            $("#sua").attr("disabled", true);
            $("#sua").addClass("button_disabled");
            $("#sua").removeClass("button_shadow");
        }
        else {
            $("#kham").attr("disabled", true);
            $("#kham").addClass("button_disabled");
            $("#kham").removeClass("button_shadow");
            $("#sua").attr("disabled", false);
            $("#sua").addClass("button_shadow");
            $("#sua").removeClass("button_disabled");
        }
        $("#luu").attr("disabled", true);
        $("#luu").addClass("button_disabled");
        $("#luu").removeClass("button_shadow");
        $("#huy").attr("disabled", true);
        $("#huy").addClass("button_disabled");
        $("#huy").removeClass("button_shadow");
    }
}
function enable_bt_tt(tt) {
    if (tt == "1") {
        $("#kham").attr("disabled", false);
        $("#kham").addClass("button_shadow");
        $("#kham").removeClass("button_disabled");
        $("#sua").attr("disabled", true);
        $("#sua").addClass("button_disabled");
        $("#sua").removeClass("button_shadow");
    }
    else if (tt == "2" || tt == "3") {
        $("#kham").attr("disabled", true);
        $("#kham").addClass("button_disabled");
        $("#kham").removeClass("button_shadow");
        $("#sua").attr("disabled", false);
        $("#sua").addClass("button_shadow");
        $("#sua").removeClass("button_disabled");
    }
    else
    {
        $("#kham").attr("disabled", true);
        $("#kham").addClass("button_disabled");
        $("#kham").removeClass("button_shadow");
        $("#sua").attr("disabled", true);
        $("#sua").addClass("button_disabled");
        $("#sua").removeClass("button_shadow");
        $("#luu").attr("disabled", true);
        $("#luu").addClass("button_disabled");
        $("#luu").removeClass("button_shadow");
        $("#huy").attr("disabled", true);
        $("#huy").addClass("button_disabled");
        $("#huy").removeClass("button_shadow");
    }
}
function enable_button_ttpt(bt) {
    if (bt == "batdau") {
        $("#them_ttpt").attr("disabled", false);
        $("#them_ttpt").removeClass("button_disabled");
        $("#them_ttpt").addClass("button_shadow");
        $("#luu_ttpt").attr("disabled", "disabled");
        $("#luu_ttpt").addClass("button_disabled");
        $("#luu_ttpt").removeClass("button_shadow");
        $("#huy_ttpt").attr("disabled", "disabled");
        $("#huy_ttpt").addClass("button_disabled");
        $("#huy_ttpt").removeClass("button_shadow");
    }
    else if (bt == "them") {
        $("#them_ttpt").attr("disabled", true);
        $("#them_ttpt").addClass("button_disabled");
        $("#them_ttpt").removeClass("button_shadow");
        $("#luu_ttpt").attr("disabled", false);
        $("#luu_ttpt").removeClass("button_disabled");
        $("#luu_ttpt").addClass("button_shadow");
        $("#huy_ttpt").attr("disabled", false);
        $("#huy_ttpt").removeClass("button_disabled");
        $("#huy_ttpt").addClass("button_shadow");
    }
    else if (bt == "huy" || bt == "luu") {
        $("#luu_ttpt").attr("disabled", true);
        $("#luu_ttpt").addClass("button_disabled");
        $("#luu_ttpt").removeClass("button_shadow");
        $("#huy_ttpt").attr("disabled", true);
        $("#huy_ttpt").addClass("button_disabled");
        $("#huy_ttpt").removeClass("button_shadow");
        $("#them_ttpt").attr("disabled", false);
        $("#them_ttpt").addClass("button_shadow");
        $("#them_ttpt").removeClass("button_disabled");
    }
}
function enable_button_dtck(bt) {
    if (bt == "batdau") {
        $("#them_dtck").attr("disabled", false);
        $("#them_dtck").removeClass("button_disabled");
        $("#them_dtck").addClass("button_shadow");
        $("#luu_dtck").attr("disabled", "disabled");
        $("#luu_dtck").addClass("button_disabled");
        $("#luu_dtck").removeClass("button_shadow");
        $("#huy_dtck").attr("disabled", "disabled");
        $("#huy_dtck").addClass("button_disabled");
        $("#huy_dtck").removeClass("button_shadow");
    }
    else if (bt == "them") {
        $("#them_dtck").attr("disabled", true);
        $("#them_dtck").addClass("button_disabled");
        $("#them_dtck").removeClass("button_shadow");
        $("#luu_dtck").attr("disabled", false);
        $("#luu_dtck").removeClass("button_disabled");
        $("#luu_dtck").addClass("button_shadow");
        $("#huy_dtck").attr("disabled", false);
        $("#huy_dtck").removeClass("button_disabled");
        $("#huy_dtck").addClass("button_shadow");
    }
    else if (bt == "huy" || bt == "luu") {
        $("#luu_dtck").attr("disabled", true);
        $("#luu_dtck").addClass("button_disabled");
        $("#luu_dtck").removeClass("button_shadow");
        $("#huy_dtck").attr("disabled", true);
        $("#huy_dtck").addClass("button_disabled");
        $("#huy_dtck").removeClass("button_shadow");
        $("#them_dtck").attr("disabled", false);
        $("#them_dtck").addClass("button_shadow");
        $("#them_dtck").removeClass("button_disabled");
    }
}
function enable_button_xn(bt) {
    if (bt == "batdau") {
        $("#them_xn").attr("disabled", false);
        $("#them_xn").removeClass("button_disabled");
        $("#them_xn").addClass("button_shadow");
        $("#luu_xn").attr("disabled", "disabled");
        $("#luu_xn").addClass("button_disabled");
        $("#luu_xn").removeClass("button_shadow");
        $("#huy_xn").attr("disabled", "disabled");
        $("#huy_xn").addClass("button_disabled");
        $("#huy_xn").removeClass("button_shadow");
    }
    else if (bt == "them") {
        $("#them_xn").attr("disabled", true);
        $("#them_xn").addClass("button_disabled");
        $("#them_xn").removeClass("button_shadow");
        $("#luu_xn").attr("disabled", false);
        $("#luu_xn").removeClass("button_disabled");
        $("#luu_xn").addClass("button_shadow");
        $("#huy_xn").attr("disabled", false);
        $("#huy_xn").removeClass("button_disabled");
        $("#huy_xn").addClass("button_shadow");
    }
    else if (bt == "huy" || bt == "luu") {
        $("#luu_xn").attr("disabled", true);
        $("#luu_xn").addClass("button_disabled");
        $("#luu_xn").removeClass("button_shadow");
        $("#huy_xn").attr("disabled", true);
        $("#huy_xn").addClass("button_disabled");
        $("#huy_xn").removeClass("button_shadow");
        $("#them_xn").attr("disabled", false);
        $("#them_xn").addClass("button_shadow");
        $("#them_xn").removeClass("button_disabled");
    }
}
;
function enable_button_cdha(bt) {
    if (bt == "batdau") {
        $("#them_cdha").attr("disabled", false);
        $("#them_cdha").removeClass("button_disabled");
        $("#them_cdha").addClass("button_shadow");
        $("#luu_cdha").attr("disabled", "disabled");
        $("#luu_cdha").addClass("button_disabled");
        $("#luu_cdha").removeClass("button_shadow");
        $("#huy_cdha").attr("disabled", "disabled");
        $("#huy_cdha").addClass("button_disabled");
        $("#huy_cdha").removeClass("button_shadow");
    }
    else if (bt == "them") {
        $("#them_cdha").attr("disabled", true);
        $("#them_cdha").addClass("button_disabled");
        $("#them_cdha").removeClass("button_shadow");
        $("#luu_cdha").attr("disabled", false);
        $("#luu_cdha").removeClass("button_disabled");
        $("#luu_cdha").addClass("button_shadow");
        $("#huy_cdha").attr("disabled", false);
        $("#huy_cdha").removeClass("button_disabled");
        $("#huy_cdha").addClass("button_shadow");
    }
    else if (bt == "huy" || bt == "luu") {
        $("#luu_cdha").attr("disabled", true);
        $("#luu_cdha").addClass("button_disabled");
        $("#luu_cdha").removeClass("button_shadow");
        $("#huy_xn").attr("disabled", true);
        $("#huy_xn").addClass("button_disabled");
        $("#huy_xn").removeClass("button_shadow");
        $("#them_cdha").attr("disabled", false);
        $("#them_cdha").addClass("button_shadow");
        $("#them_cdha").removeClass("button_disabled");
    }
}
function loadtt_ttpt(arr) {
    $("#hotenttpt").val(arr.TEN_BENH_NHAN);
    $("#tuoittpt").val(arr.TUOI);
    if (arr.CO_BAO_HIEM.toString() == "true")
        $("#cobhytttpt").attr('checked', true);
    else
        $("#cobhytttpt").attr('checked', false);
    $("#gioitinhttpt").val(arr.GIOI_TINH);
    $("#diachittpt").val(arr.DIA_CHI);
    $("#sovaovien_ttpt").val(arr.sovaovien);
}
function loadtt_goidichvu(arr) {
    $("#hotengoidichvu").val(arr.TEN_BENH_NHAN);
    $("#tuoigoidichvu").val(arr.TUOI);
    if (arr.CO_BAO_HIEM.toString() == "true")
        $("#cobhytgoidichvu").attr('checked', true);
    else
        $("#cobhytgoidichvu").attr('checked', false);
    $("#gioitinhgoidichvu").val(arr.GIOI_TINH);
    $("#diachigoidichvu").val(arr.DIA_CHI);
    $("#sovaovien_gdv").val(arr.sovaovien);
}
function loadtt_cdha(arr) {
    $("#hotencdha").val(arr.TEN_BENH_NHAN);
    $("#tuoicdha").val(arr.TUOI);
    if (arr.CO_BAO_HIEM.toString() == "true")
        $("#cobhytcdha").attr('checked', true);
    else
        $("#cobhytcdha").attr('checked', false);
    $("#gioitinhcdha").val(arr.GIOI_TINH);
    $("#diachicdha").val(arr.DIA_CHI);
    $("#sovaovien_cdha").val(arr.sovaovien);
}
function loadtt_xn(arr) {
    $("#hotenxn").val(arr.TEN_BENH_NHAN);
    $("#tuoixn").val(arr.TUOI);
    if (arr.CO_BAO_HIEM.toString() == "true")
        $("#cobhytxn").attr('checked', true);
    else
        $("#cobhytxn").attr('checked', false);
    $("#gioitinhxn").val(arr.GIOI_TINH);
    $("#diachixn").val(arr.DIA_CHI);
    $("#sovaovien_xn").val(arr.sovaovien);
}
function loadtt_dtck(arr, ngayhientai) {
    $("#hotendtck").val(arr.TEN_BENH_NHAN);
    $("#tuoidtck").val(arr.TUOI);
    if (arr.CO_BAO_HIEM.toString() == "true")
        $("#cobhytdtck").attr('checked', true);
    else
        $("#cobhytdtck").attr('checked', false);
    $("#gioitinhdtck").val(arr.GIOI_TINH);
    $("#diachidtck").val(arr.DIA_CHI);
    $("#tungaydtck").val(ngayhientai);
    $("#denngaydtck").val(ngayhientai);
    $("#sovaovien_ck").val(arr.sovaovien);
}
function toogle_input_ttpt(bool) {
    $("#phongttpt").attr("disabled", bool);
    if (ttpt_vltl == "0") {
        $("#loaittpt").attr("disabled", bool);
    }
    else {
        $("#loaittpt").attr("disabled", true);
    }
    $("#chuyenkhoattpt").attr("disabled", bool);
    $("#ctchuyenkhoattpt").attr("disabled", bool);
    $("#ngaychidinhttpt").attr("disabled", bool);
    //$("#capcuuttpt").attr("disabled", bool);
}
function toogle_input_dtck(bool) {
    $("#phongdtck").attr("disabled", bool);
    $("#loaidtck").attr("disabled", bool);
    $("#chuyenkhoadtck").attr("disabled", bool);
    $("#ctchuyenkhoadtck").attr("disabled", bool);
    $("#tungaydtck").attr("disabled", bool);
    $("#denngaydtck").attr("disabled", bool);
}
function toogle_input_cdha(bool) {
    $("#phongcdha").attr("disabled", bool);
    //$("#capcuucdha").attr("disabled", bool);
    $("#ngaycdha").attr("disabled", bool);
}
function toogle_input_xn(bool) {
    $("#phongxn").attr("disabled", bool);
    //$("#capcuuxn").attr("disabled", bool);
    $("#ngaychidinhxn").attr("disabled", bool);
}
function clearAllInput() {
    $("#phukhoaah").val("");
    $("#phukhoaad").val("");
    $("#phukhoacotucung").val("");
    $("#thaitc").val("");
    $("#thaitim").val("");
    $("#thaioi").val("");
    $("#thaingoi").val("");
    $("#thaicotc").val("");
    $("#mayte").val("");
    $("#sophieuthanhtoan").val("");
    $("#idtiepnhan").val("");
    $("#mach").val("");
    $("#mach").val("");
    $("#nhiptho").val("");
    $("#nhietdo").val("");
    $("#huyetaptren").val("");
    $("#huyetapduoi").val("");
    $("#chieucao").val("");
    $("#cannang").val("");
    $("#creatinin").val("");
    $("#chisobmi").val("");
    $("#dothanhthai").val("");
    $("#kqbmi").val("");
    $("#kqdothanhthai").val("");
    $("#chandoantuyentruoc").val("");
    $("#trieuchungls").val("");
    $("#icd").val("");
    $("#cbicd").val("");
    $("#mabenhly").val("");
    $("#chandoanyhct").val("");
    $("#benhphu").val("");
    $("#icd2").val("");
    $("#icd_yhct").val("");
    $("#songayhen").val("0");
    $("#mabenhly").val("");
    $("#giaiquyet").val("1");
    $("#cbgiaiquyet").val("1");
    $("#matoathuoc").val("");
    $("#matoathuoc_vt").val("");
    $("#matoathuoc_mn").val("");
    $("#matoathuoc_mp").val("");
    $("#matoathuoc_quay").val("");
    $("#matoathuoc_dy").val("");
    $("#loidan").val("");
    $("#loidan_vt").val("");
    $("#loidan_mn").val("");
    $("#loidan_mp").val("");
    $("#loidan_quay").val("");
    $("#loidan_dy").val("");
    $("#baithuoc_dy").val("");
    $("#pheptri_dy").val("");
    $("#sothanthuoc_dy").val("");
    $('#list_thuocbhyt').jqGrid('clearGridData');
    $('#list_vattubhyt').jqGrid('clearGridData');
    $('#list_thuocmuangoai').jqGrid('clearGridData');
    $('#list_thuocmienphi').jqGrid('clearGridData');
    $('#list_thuocmuataiquay').jqGrid('clearGridData');
    $('#list_thuocdongy').jqGrid('clearGridData');
    $("input[name=tngt_cb]").attr('Checked', false);
}
function huy_kham() {
    trangthaikham = "";
    ttk = $('input[name=trangthaikham]:checked').val();
    $(".trangthaikham").attr("disabled", false);
    toogle_input(true);
    disable_toathuoc();
    enable_button("huy", ttk);
    clear_thuoc();
    $("#list1")[0].clearToolbar();    
}

