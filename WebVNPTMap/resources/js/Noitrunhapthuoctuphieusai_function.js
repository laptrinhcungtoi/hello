
function clear_thongtinhanhchinh() {
    $("#div_thongtin input").val('');
   
}
function clear_chuyentuyen() {
    $('#chuyentuyen_modal input[type="text"]').val("");
}
function clear_xuatvien() {
    $('#xuatvien_modal input[type="text"]').val("");
}
function clear_tuvong() {
    $('#tuvong_modal input[type="text"]').val("");
}
function clear_thuoc() {
    $("#div_themthuoc input").val('');
    $("#div_themvt input").val('');
    $("#div_themdv input").val('');
    $("#tabs input").val('');
}
function clear_thongtin() {
     $("#thongtin input").val('');
      $("#tientien input").val('');
     $('#list_bangke').jqGrid('clearGridData');
}
function clearAll() {
    $('#div_thongtin input[type="text"]').val("");
    $("#tabs input").val('');
    $('#list_thuocbhyt').jqGrid('clearGridData');
    $('#list_vtbhyt').jqGrid('clearGridData');
    $('#list_dvbhyt').jqGrid('clearGridData');
    $('#list_thuoc_sai').jqGrid('clearGridData');
    $('#list_vt_sai').jqGrid('clearGridData');
    $('#list_dv_sai').jqGrid('clearGridData');
}
function clearthongtindutru() {
     $("#phieuyeucau").val("");
     $("#ghichu").val("");
    $('#list_phieudieutridutru').jqGrid('clearGridData');
    $('#list_duocdutru').jqGrid('clearGridData');
}
 
 function enable_button(bt) {
    if (bt == "batdau") {
        $("#them").attr("disabled", false);
        $("#them").removeClass("button_disabled");
        $("#them").addClass("button_shadow");
        $("#sua").attr("disabled", "disabled");
        $("#sua").addClass("button_disabled");
        $("#sua").removeClass("button_shadow");
        $("#luu").attr("disabled", "disabled");
        $("#luu").addClass("button_disabled");
        $("#luu").removeClass("button_shadow");
        $("#in").attr("disabled", "disabled");
        $("#in").addClass("button_disabled");
        $("#in").removeClass("button_shadow");
        $("#xoa").attr("disabled", "disabled");
        $("#xoa").addClass("button_disabled");
        $("#xoa").removeClass("button_shadow");
        $("#huy").attr("disabled", "disabled");
        $("#huy").addClass("button_disabled");
        $("#huy").removeClass("button_shadow");
    }
    else if (bt == "them") {
        $("#them").attr("disabled", true);
        $("#them").addClass("button_disabled");
        $("#them").removeClass("button_shadow");
        $("#sua").attr("disabled", true);
        $("#sua").addClass("button_disabled");
        $("#sua").removeClass("button_shadow");
        
        $("#luu").attr("disabled", false);
        $("#luu").removeClass("button_disabled");
        $("#luu").addClass("button_shadow");
         $("#in").attr("disabled", true);
        $("#in").addClass("button_disabled");
        $("#in").removeClass("button_shadow");
        $("#xoa").attr("disabled", true);
        $("#xoa").addClass("button_disabled");
        $("#xoa").removeClass("button_shadow");
        $("#huy").attr("disabled", false);
        $("#huy").removeClass("button_disabled");
        $("#huy").addClass("button_shadow");
    }
    else if (bt == "sua") {
        $("#them").attr("disabled", true);
        $("#them").addClass("button_disabled");
        $("#them").removeClass("button_shadow");
        $("#sua").attr("disabled", true);
        $("#sua").addClass("button_disabled");
        $("#sua").removeClass("button_shadow");
        $("#luu").attr("disabled", false);
        $("#luu").addClass("button_shadow");
        $("#luu").removeClass("button_disabled");
        $("#in").attr("disabled", true);
        $("#in").addClass("button_disabled");
        $("#in").removeClass("button_shadow");
        $("#xoa").attr("disabled", true);
        $("#xoa").addClass("button_disabled");
        $("#xoa").removeClass("button_shadow");
        $("#huy").attr("disabled", false);
        $("#huy").addClass("button_shadow");
        $("#huy").removeClass("button_disabled");
    }
    else if (bt == "luu") {
        $("#them").attr("disabled", false);
        $("#them").addClass("button_shadow");
        $("#them").removeClass("button_disabled");
        $("#sua").attr("disabled", false);
        $("#sua").addClass("button_shadow");
        $("#sua").removeClass("button_disabled");
        $("#luu").attr("disabled", true);
        $("#luu").addClass("button_disabled");
        $("#luu").removeClass("button_shadow");
         
        $("#in").attr("disabled", false);
        $("#in").removeClass("button_disabled");
        $("#in").addClass("button_shadow");
        $("#xoa").attr("disabled", false);
        $("#xoa").addClass("button_shadow");
        $("#xoa").removeClass("button_disabled");
        $("#huy").attr("disabled", true);
        $("#huy").addClass("button_disabled");
        $("#huy").removeClass("button_shadow");
    }
}
