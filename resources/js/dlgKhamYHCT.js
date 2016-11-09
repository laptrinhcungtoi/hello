var modeg_khamyhct = -1; // -1: Jbox tat; 0: Jbox them; 1: Jbox sua du lieu;

$(function() {

	var dlgCfDelete_KhamYHCTdlg = new jBox('Modal', {
		title : 'Xác nhận xóa phương pháp YHCT',
		overlay : true,
		content : $('#dlgCfDelete_KhamYHCT'),
		draggable : 'title',
		zindex : 3,
		position : {
			my : "center top",
			at : "center top",
			of : window
		}
	});

	qlKhamYHCTdlg = $("#qlKhamYHCT").dialog({
		autoOpen : false,
		resizable : true,
		width : 500,
		zindex: 2,
		height: 250,
		position : {
			my : "center top",
			at : "center top",
			of : window
		}
	});
	
	$("#khamyhct").click(function() {
		if ($("#idtiepnhan").val() == '') {
			jAlert("Mã lần khám không tồn tại !", 'Thông báo');
			return;
		}
		if ($("#mayte").val() == '') {
			jAlert("Mã bệnh nhân không tồn tại!", 'Thông báo');
			return;
		}
		var idtiepnhan = $("#idtiepnhan").val().trim();
		var noidung = $("#noidungKhamYHCT").val().trim();
		
		gandulieuKhamYHCT(idtiepnhan, dvtt, noidung);				
		qlKhamYHCTdlg.dialog("open");
	});
	
	function gandulieuKhamYHCT (idtiepnhan, dvtt, noidung){
		var idtiepnhan = $("#idtiepnhan").val().trim();
		var arr = [idtiepnhan, "0"];
		var url1 = "kb_sel_phuongphap_yhct?url=" + convertArray(arr);
		
		$.getJSON(url1, function(result) {
            $.each(result, function(i, field) {
           		$("#noidungKhamYHCT").val(field.PHUONGPHAP);
                if($("#noidungKhamYHCT").val()=="" ||$("#noidungKhamYHCT").val()==null){
                	$("#btnXoaKhamYHCT").hide();
                }              
                else{
                	$("#btnXoaKhamYHCT").show();
                }
            });
        });
	}
	
	$("#btnLuuKhamYHCT").click(function(){
		// luu lai ket qua;
		var idtiepnhan = $("#idtiepnhan").val().trim();
		var noidung = $("#noidungKhamYHCT").val().trim();
		
		if(noidung == ""){
			jAlert("Nội dung không được để trống!");
		}
		else {
			var url = "kb_capnhat_phuongphap_yhct";
			var str = [idtiepnhan, noidung, "0"];
			$.post(url, {
				url : convertArray(str)
			}).done(function(data) {
				if (data != "-1") {
					jAlert("Cập nhật phương pháp thành công!", 'Thông báo');
					qlKhamYHCTdlg.dialog("close");
					
				} else {
					jAlert("Lỗi cập nhật phương pháp YHCT !", 'Thông báo');
				}
			});
		}
		
	});
	$("#btnXoaKhamYHCT").click(function(){
		dlgCfDelete_KhamYHCTdlg.open();		// mo form xac nha xoa;
	});
	$("#btnThoatKhamYHCT").click(function(){
		qlKhamYHCTdlg.dialog("close");
	});
	
	
	$("#dlgSubmit_KhamYHCT").click(function() {
		// luu lai ket qua;
		var idtiepnhan = $("#idtiepnhan").val().trim();
		var noidung = $("#noidungKhamYHCT").val().trim();

		var url = "kb_xoa_phuongphap_yhct";
		var str = [idtiepnhan, "0"];
		$.post(url, {
			url : convertArray(str)
		}).done(function(data) {
			if (data != "-1") {
				jAlert("Xóa phương pháp YHCT thành công!", 'Thông báo');
				qlKhamYHCTdlg.dialog("close");
				dlgCfDelete_KhamYHCTdlg.close();
				
			} else {
				jAlert("Lỗi xóa phương pháp YHCT !", 'Thông báo');
			}
		});
	});

	$("#dlgCance_KhamYHCT").click(function() {
		dlgCfDelete_KhamYHCTdlg.close();
	});
	
});
