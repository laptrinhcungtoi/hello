function compare(a, b) {
    return parseInt(a.id) - parseInt(b.id);
}
function myelem(value, options) {
    var el = document.createElement("input");
    el.type = "text";
    el.value = value;
    el.onkeypress = function (e) {
        var theEvent = e || window.event;
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
        var regex = /[0-9]|\./;
        if (!regex.test(key)) {
            theEvent.returnValue = false;
            if (theEvent.preventDefault)
                theEvent.preventDefault();
        }
    };
    return el;
}

function myvalue(elem, operation, value) {
    if (operation === 'get') {
        return $(elem).val();
    } else if (operation === 'set') {
        $('input', elem).val(value);
    }
}
function calculate_dynoitru() {
    var dg = $("#dongia_dy").val();
    var sl = $("#soluong_dy").val();
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
    soluong = songay * (sang + trua + chieu + toi);
    $("#soluong" + toa).val(Math.ceil(soluong));
    sl = $("#soluong" + toa).val();
    $("#thanhtien" + toa).val(sl * dg);
}
function toogle_input(bool) {
    $("#bacsidieutri").attr("disabled", bool);
    $("#cbbacsidieutri").attr("disabled", bool);
    $("#nhietdo").attr("disabled", bool);
    $("#huyetaptren").attr("disabled", bool);
    $("#huyetapduoi").attr("disabled", bool);
    $("#chieucao").attr("disabled", bool);
    $("#cannang").attr("disabled", bool);
    $("#mach").attr("disabled", bool);
    $("#nhiptho").attr("disabled", bool);
    $("#dienbienbenh").attr("disabled", bool);
    $("#ylenh").attr("disabled", bool);
    $("#txt_ghichu").attr("disabled", bool);
    $("#txt_mayta").attr("disabled", bool);
    $("#cb_yta").attr("disabled", bool);
    $("#txt_theodoidienbien").attr("disabled", bool);
    $("#txt_thuchienylenh").attr("disabled", bool);
    $("#cbgiaiquyet").attr("disabled", false);
    $("#giaiquyet").attr("disabled", false);
    $("#loidantoathuoc").attr("disabled", bool);
    $("#loidantoavattu").attr("disabled", bool);
    $("#ngaylap_tdt").attr("disabled", bool);
    $("#giolap_tdt").attr("disabled", bool);
    $("#ngaylap_pcs").attr("disabled", bool);
    $("#giolap_pcs").attr("disabled", bool);
    $("#icdkhoadt").attr("disabled", bool);
    $("#tenicdkhoadt").attr("disabled", bool);
    $("#icd2").attr("disabled", bool);
    $("#icdnguyennhan").attr("disabled", bool);
    $("#icd_benhphu").attr("disabled", bool);
    $("#benhphu").attr("disabled", bool);
    if (bool == false) {
        $("#bt_cls").attr("disabled", false);
        $("#bt_cls").addClass("button_shadow");
        $("#bt_cls").removeClass("button_disabled");
        $("#dungtoacu_bhyt").attr("disabled", false);
        $("#dungtoacu_bhyt").addClass("button_shadow");
        $("#dungtoacu_bhyt").removeClass("button_disabled");
    }
    else {
        $("#bt_cls").attr("disabled", "disabled");
        $("#bt_cls").addClass("button_disabled");
        $("#bt_cls").removeClass("button_shadow");
        $("#dungtoacu_bhyt").attr("disabled", "disabled");
        $("#dungtoacu_bhyt").addClass("button_disabled");
        $("#dungtoacu_bhyt").removeClass("button_shadow");
    }
}
function enable_bt_tt(tt) {
    if (tt == "0" || tt == "1" || tt == "2" || tt=="3") {
        $("#kham").attr("disabled", false);
        $("#kham").addClass("button_shadow");
        $("#kham").removeClass("button_disabled");
        $("#sua").attr("disabled", true);
        $("#sua").addClass("button_disabled");
        $("#sua").removeClass("button_shadow");
    }
    else
    {
        $("#div_bt_kham input[type='button']").attr("disabled", true);
        $("#div_bt_kham input[type='button']").addClass("button_disabled");
        $("#div_bt_kham input[type='button']").removeClass("button_shadow");
        /*$("#kham").attr("disabled", true);
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
         $("#huy").removeClass("button_shadow");*/
    }
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
        $("#kham").attr("disabled", false);
        $("#kham").addClass("button_shadow");
        $("#kham").removeClass("button_disabled");
        $("#sua").attr("disabled", false);
        $("#sua").addClass("button_shadow");
        $("#sua").removeClass("button_disabled");
        $("#luu").attr("disabled", true);
        $("#luu").addClass("button_disabled");
        $("#luu").removeClass("button_shadow");
        $("#huy").attr("disabled", true);
        $("#huy").addClass("button_disabled");
        $("#huy").removeClass("button_shadow");
    }
}
function noitru_delete_thuocmuangoai(dvtt) {
    var id = $("#list_thuocmuangoai").jqGrid('getGridParam', 'selrow');
    if (id) {
        var ret = $("#list_thuocmuangoai").jqGrid('getRowData', id);
        var url = "noitru_toathuocmuangoai_delete";
        var arr = [ret.STT_TOATHUOC, $("#matoathuoc").val(), dvtt, stt_dieutri, stt_benhan, stt_dotdieutri];
        $.post(url, {
            url: convertArray(arr)
        }).done(function (data) {
            load_cttoathuocmuangoai();
        });
    } else {
        jAlert("Chọn một dòng thuốc để xóa", 'Cảnh báo');
    }
}
function loadthongtinbenhnhan(arr, dvtt) {
    if (arr != null) {
        stt_dieutri = "";
        sovaovien = arr.SOVAOVIEN;
        sovaovien_dt = arr.SOVAOVIEN_DT;
        stt_benhan = arr.STT_BENHAN;
        stt_dotdieutri = arr.STT_DOTDIEUTRI;
        stt_logkhoaphong = arr.STT_LOGKHOAPHONG;
        mabenhnhan = arr.MA_BENH_NHAN;
        var url = "noitru_laysophieuthanhtoan";
        $.post(url, {stt_benhan: stt_benhan, stt_dotdieutri: stt_dotdieutri, dvtt: dvtt}).always(function (data) {
            sophieuthanhtoan = data;
            var url = "noitru_taobangke";
            var arr = [dvtt, stt_dotdieutri, stt_benhan, sophieuthanhtoan, mabenhnhan];
            //jAlert(arr);
            if (stt_dotdieutri !== "" && stt_benhan !== "") {
                $.post(url, {
                    url: convertArray(arr)
                }).done(function (data) {
                    if (data != -1) {
                        var url_cl = "noitru_select_tientamung_conlai";
                        $.post(url_cl, {
                            dvtt: dvtt,
                            stt_dotdieutri: stt_dotdieutri,
                            stt_benhan: stt_benhan
                        }).done(function (dt) {
                            $("#txt_tienconlai").val(dt.TONGTIEN_CONLAI);
                            $("#txt_tongtiendtt").val(dt.TONGTIEN_TAMUNG);
                        });
                    }
                });
            }
        });
        $("#tabs").tabs("option", "active", 0);
        $("#sovaovien").val(arr.SOVAOVIEN);
        $("#sovaovien_dt").val(arr.SOVAOVIEN_DT);
        $("#mabenhan").val(arr.SOBENHAN);
        $("#mabenhan_tt").val(arr.SOBENHAN_TT);
        $("#hoten").val(arr.TEN_BENH_NHAN);
        $("#bhyt").val(arr.SOBAOHIEMYTE);
        $("#tuoi").val(arr.TUOI);
        $("#thang").val(arr.THANG);
        $("#tlmiengiam").val(arr.TYLEBAOHIEM);
        $("#gioitinh").val(arr.GIOI_TINH.toString() == "Yes" ? "true" : "false");
        $("#doituong").val(arr.MADOITUONG);
        $("#diachi").val(arr.DIA_CHI);
        $("#txt_dotdieutri").val(arr.STT_DOTDIEUTRI);
        $("#txt_giuongdieutri").val(arr.TENGIUONGBENH);
        $("#txt_tongtiendtt").val("");
        $("#bacsidieutri").val($("#cbbacsidieutri").val());
        $("#giaiquyet").val($("#cbgiaiquyet").val());
        $("#txt_mayta").val($("#cb_yta").val());
        $("#icdkhoadt").val(arr.ICD_KHOADIEUTRI);
        var arr_icd = arr.CHANDOAN_NGUYENNHAN.split(" - ");
        $("#icd2").val(arr_icd[0]);
        $("#icdnguyennhan").val(arr_icd[1]);
        $("#tenicdkhoadt").val(arr.TENICD_KHOADIEUTRI);
        $("#benhphu").val(arr.TENBENHPHU_NHAPVIEN);
        var arr_songaybhyt = [dvtt, stt_benhan, stt_dotdieutri];
        var url_songaybhyt = "noitru_songay_conbhyt";
        $.post(url_songaybhyt, {
            url: convertArray(arr_songaybhyt)
        }).done(function (data) {
            $(".songayconbhyt").text(data);
            $("#songaybhyt").val(data);
        });
        if ($("#mabenhan").val().trim() != "") {
            $("#bt_taobenhan").attr("disabled", true);
            $("#bt_taobenhan").addClass("button_disabled");
            $("#bt_taobenhan").removeClass("button_shadow");
            $("#bt_taobenhtam").attr("disabled", true);
            $("#bt_taobenhtam").addClass("button_disabled");
            $("#bt_taobenhtam").removeClass("button_shadow");
        } else {
            $("#bt_taobenhan").attr("disabled", false);
            $("#bt_taobenhan").addClass("button_shadow");
            $("#bt_taobenhan").removeClass("button_disabled");
            $("#bt_taobenhtam").attr("disabled", false);
            $("#bt_taobenhtam").addClass("button_shadow");
            $("#bt_taobenhtam").removeClass("button_disabled");
        }

        if ($("#bhyt").val() == "") {
            $("#tab_xn").tabs("option", "active", 1);
            $("#tab_xn").tabs("option", "disabled", [0]);
            $("#tab_cdha").tabs("option", "active", 1);
            $("#tab_cdha").tabs("option", "disabled", [0]);
            $("#tab_ttpt").tabs("option", "active", 1);
            $("#tab_ttpt").tabs("option", "disabled", [0]);
            $("#tab_dtck").tabs("option", "active", 1);
            $("#tab_dtck").tabs("option", "disabled", [0]);
        }
        else {
            $("#tab_xn").tabs("option", "disabled", []);
            $("#tab_xn").tabs("option", "active", 0);
            $("#tab_cdha").tabs("option", "disabled", []);
            $("#tab_cdha").tabs("option", "active", 0);
            $("#tab_ttpt").tabs("option", "disabled", []);
            $("#tab_ttpt").tabs("option", "active", 0);
            $("#tab_dtck").tabs("option", "disabled", []);
            $("#tab_dtck").tabs("option", "active", 0);
        }
    }

}
function load_thongtindotdieutri(arr, dvtt) {
    if (arr != null) {
        $("#matoathuoc").val(arr.MA_TOA_THUOC);
        stt_dieutri = arr.STT_DIEUTRI;
        $("#solapphieu").val(arr.STT_DIEUTRI);
        $("#mach").val(arr.MACH);
        $("#nhiptho").val(arr.NHIPTHO);
        $("#nhietdo").val(arr.NHIETDO);
        $("#huyetaptren").val(arr.HUYETAPTREN);
        $("#huyetapduoi").val(arr.HUYETAPDUOI);
        $("#chieucao").val(arr.CHIEUCAO);
        $("#cannang").val(arr.CANNANG);
        $("#ngaylapphieu").val(arr.NGAY_LAP);
        $("#dienbienbenh").val(arr.TDT_DIENBIENBENH);
        $("#ylenh").val(arr.TDT_YLENH);
        $("#txt_ghichu").val(arr.TDT_GHICHU);
        $("#cbbacsidieutri").val(arr.TDT_NGUOILAP);
        $("#bacsidieutri").val($("#cbbacsidieutri").val());
        $("#giaiquyet").val($("#cbgiaiquyet").val());
        $("#txt_mayta").val(arr.PCS_NGUOILAP);
        $("#cb_yta").val(arr.PCS_NGUOILAP);
        if (arr.NGAYGIOLAP_TDT != "" && arr.NGAYGIOLAP_PCS != "") {
            var ngaygiolap_tdt = arr.NGAYGIOLAP_TDT.split(" ");
            var ngaygiolap_pcs = arr.NGAYGIOLAP_PCS.split(" ");
            try {
                $("#ngaylap_tdt").val(convertDate(ngaygiolap_tdt[0]));
                $("#giolap_tdt").val(ngaygiolap_tdt[1]);
                $("#ngaylap_pcs").val(convertDate(ngaygiolap_pcs[0]));
                $("#giolap_pcs").val(ngaygiolap_pcs[1]);
            } catch (err) {

            }
        }else{
            var ngaygiolap_tdt = arr.NGAYGIOLAP.split(" ");
            var ngaygiolap_pcs = arr.NGAYGIOLAP.split(" ");
            try {
                $("#ngaylap_tdt").val(convertDate(ngaygiolap_tdt[0]));
                $("#giolap_tdt").val(ngaygiolap_tdt[1]);
                $("#ngaylap_pcs").val(convertDate(ngaygiolap_pcs[0]));
                $("#giolap_pcs").val(ngaygiolap_pcs[1]);
            } catch (err) {

            }
        }

        $("#txt_theodoidienbien").val(arr.PCS_THEODOIDIENTIEN);
        $("#txt_thuchienylenh").val(arr.PCS_THUCHIENYLENH_CS);
        $("#loidantoathuoc").val(arr.LOI_DAN_TOA_THUOC);
        $("#loidantoavattu").val(arr.LOI_DAN_TOAVATTU);
        $("#loidantoamuangoai").val(arr.LOI_DAN_TOAMUANGOAI);
        $("#loidantoamienphi").val(arr.LOI_DAN_TOAMIENPHI);
        $("#loidantoaquay").val(arr.LOI_DAN_TOAMUATAIQUAY);
        $("#loidantoadongy").val(arr.LOI_DAN_TOATHUOCDONGY);
    }
}
function huy_kham() {
    trangthaikham = "";
    var ttk = $('input[name=trangthaikham]:checked').val();
    $(".trangthaikham").attr("disabled", false);
    toogle_input(true);
    toogle_toathuoc(true);
    toogle_toathuoc_vt(true);
    toogle_toathuoc_dy(true);
    toogle_toathuoc_mn(true);
    toogle_toathuoc_mp(true);
    toogle_toathuoc_quay(true);
    toogle_toathuoc_all(true);
    enable_button("huy", ttk);
    clear_thuoc();
}

function toogle_toathuoc(bool) {
    $("#tabs-1 input[type='text']").attr("disabled", bool);
}
function toogle_toathuoc_quay(bool) {
    $("#tabs-5 input[type='text']").attr("disabled", bool);
}
function toogle_toathuoc_vt(bool) {
    $("#tabs-4 input[type='text']").attr("disabled", bool);
}
function toogle_toathuoc_treem(bool) {
    $("#tabs-8 input[type='text']").attr("disabled", bool);
}
function toogle_toathuoc_mn(bool) {
    $("#tabs-2 input[type='text']").attr("disabled", bool);
}
function toogle_toathuoc_mp(bool) {
    $("#tabs-3 input[type='text']").attr("disabled", bool);
}
function toogle_toathuoc_all(bool) {
    $("#tabs-9 input[type='text']").attr("disabled", bool);
}
function toogle_toathuoc_dy(bool) {
    $("#tabs-6 input[type='text']").attr("disabled", bool);
}
function clear_thuoc() {
    $("#div_themthuocbhyt input[type='text']").val("");
    $("#div_themthuocvattu input[type='text']").val("");
    $("#div_themthuocmuangoai input[type='text']").val("");
    $("#div_themthuocmienphi input[type='text']").val("");
    $("#div_themthuocquay input[type='text']").val("");
    $("#div_themthuocdongy input[type='text']").val("");
    $("#div_themthuoctreem input[type='text']").val("");
    $("#div_themthuocall input[type='text']").val("");
}
function clearAllInput() {
    $(".mainbody_div input[type='text']").val("");
    $("#tabs input[type='text']").val("");
    $(".mainbody_div textarea").val("");
    $("#tabs textarea").val("");
    $('#list_thuocbhyt').jqGrid('clearGridData');
    $('#list_vattubhyt').jqGrid('clearGridData');
    $('#list_thuocmuangoai').jqGrid('clearGridData');
    $('#list_thuocmienphi').jqGrid('clearGridData');
    $('#list_thuocmuataiquay').jqGrid('clearGridData');
    $('#list_thuocdongy').jqGrid('clearGridData');
    $('#list_thuoctreem').jqGrid('clearGridData');
    $('#list_thuoctonghop').jqGrid('clearGridData');
}
function canhbaotamung(dvtt) {
    if (dvtt == "93100" || dvtt == "82023")
    {
        var tienconlai = $("#txt_tienconlai").val() == "" ? 0 : $("#txt_tienconlai").val();
        if (parseInt(tienconlai) <= 0) {
            jAlert("Bệnh nhân chưa thu tạm ứng hoặc tạm ứng không đủ!", 'Cảnh báo');
        }
    }

}

