function load_donvi_theohuyen() {
    var url = 'dsdonvi_theohuyen_tungdonvi?mahuyen=' + $("#huyen").val();
    $.getJSON(url, function(data) {
        if (data) {
            $("#donvi").empty();
            $.each(data, function(i) {
                $("<option value='" + data[i].ma_donvi + "'>" + data[i].ten_donvi + "</option>").appendTo("#donvi");
            });
        }
    });
}

function loadbenhnhan(arr) {
    $("#tongtien").val("");
                $("#bhxhchi").val("");
                $("#bntra").val("");
                $("#sotientt").val("");
                $("#sotientra").val("");
    if (arr != null) {
        var sophieu = arr.SOPHIEUTHANHTOAN;
        //var thanhtoanbh = arr.THANHTOANBAOHIEM;
        var dvtt = arr.DVTT;
        $("#sophieuthanhtoan").val(sophieu);
        $("#dvtt").val(dvtt);
        
        var url = "ktbk_thongtinhanhchinh?dvtt=" + dvtt + "&sophieu=" + sophieu;
        $.getJSON(url, function(result) {
            $.each(result, function(i, field) {
                $("#mayte_d").val(field.MA_BENH_NHAN);
                $("#hovaten").val(field.TEN_BENH_NHAN);
                $("#sobhyt").val(field.SO_THE_BHYT);
                $("#gioitinh").val(field.GIOI_TINH.toString());
                var ngaysinh = field.NGAY_SINH;
                var arr_ns = ngaysinh.split("-");
                $("#namsinh").val(arr_ns[0]);
                $("#gttungay").val(convertDate(field.NGAY_BATDAU));
                $("#gtdenngay").val(convertDate(field.NGAY_HETHAN));
                $("#muchuong").val(field.TI_LE_MIEN_GIAM + " %");
                $("#noidk").val(field.NOIDANGKY_KCB);
                $("#dia_chi").val(field.DIA_CHI);
                $("#tuoi_d").val(field.TUOI);
                $("#idtiepnhan_d").val(field.MA_KHAM_BENH.replace("kb_", ""));
                $("#doituong_d").hide();
            });
        });
        url = "ktbk_thongtin_ptt?dvtt=" + dvtt + "&sophieu=" + sophieu;
        $.getJSON(url, function(result) {
            $.each(result, function(i, field) {
                $("#tennoidk").val(field.TEN_NOITIEPNHAN);
            });
        });
        url = "ktbk_thongtin_chandoan?dvtt=" + dvtt + "&sophieu=" + sophieu;
        $.getJSON(url, function(result) {
            $.each(result, function(i, field) {
                $("#chandoan").val(field.ICD + " - " + field.chandoan);
            });
        });
        url = "bxhh_thamdinhdulieu_tao_bangke?dvtt=" + dvtt + "&sophieu=" + sophieu;
        $.ajax({url: url}).done(function(){
            url1 = "bxhh_thamdinhdulieu_hienthi_bangke?dvtt=" + dvtt + "&sophieu=" + sophieu;
            $("#list_bangke").jqGrid('clearGridData');
            $("#list_bangke").jqGrid('setGridParam', {datatype: 'json', url: url1}).trigger('reloadGrid');
        });
    }
}

