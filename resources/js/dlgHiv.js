var modeg_hiv = -1; // -1: Jbox tat; 0: Jbox them; 1: Jbox sua du lieu;
var checkRequired_hiv = 0;
$(function() {

	$(".validate").keydown(
			function(e) {
				if ($.inArray(e.keyCode, [ 46, 8, 9, 27, 13, 110, 190 ]) !== -1
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

	$("#cothai_hiv").keypress(function(e) {
		if (e.keyCode == 13) {
			if ($("#cothai_hiv").val() == 1) {
				$("#ngaycothai_hiv").focus();
			} else {
				$("#ngayghinhan_hiv").focus();
			}
		}
	});
	
	$("#ngayghinhan_hiv").keypress(function(e) {
		if (e.keyCode == 13) {
			$("#tinhtrang_hiv").focus();
		}
	});

	$("#ngaycothai_hiv").keypress(function(e) {
		if (e.keyCode == 13) {
			$("#tinhtrang_hiv").focus();
		}
	});

	$("#ngayxetnghiem_hiv").keypress(function(e) {
		if (e.keyCode == 13) {
			$("#dvketluan_hiv").focus();
		}
	});

	$("#dvketluan_hiv").keypress(function(e) {
		if (e.keyCode == 13) {
			$("#dieutriarv_hiv").focus();
		}
	});

	$("#dieutriarv_hiv").keypress(function(e) {
		if (e.keyCode == 13) {
			$("#dvdieutri_hiv").focus();
		}
	});

	$("#dvdieutri_hiv").keypress(function(e) {
		if (e.keyCode == 13) {
			$("#tuvong_hiv").focus();
		}
	});

	$("#tuvong_hiv").keypress(function(e) {
		if (e.keyCode == 13) {
			if ($("#tuvong_hiv").val() == 1) {
				$("#ngaytuvong_hiv").focus();
			} else {
				$("#ghichu_hiv").focus();
			}
		}
	});

	$("#ngaytuvong_hiv").keypress(function(e) {
		if (e.keyCode == 13) {
			$("#ghichu_hiv").focus();
		}
	});

	$("#ghichu_hiv").keypress(function(e) {
		if (e.keyCode == 13) {
			$("#saveHIV").focus();
		}
	});

	$("#ngaycothai_hiv").datepicker();
	$("#ngaycothai_hiv").datepicker("option", "dateFormat", "dd/mm/yy");

	$("#ngayxetnghiem_hiv").datepicker();
	$("#ngayxetnghiem_hiv").datepicker("option", "dateFormat", "dd/mm/yy");

	$("#ngaytuvong_hiv").datepicker();
	$("#ngaytuvong_hiv").datepicker("option", "dateFormat", "dd/mm/yy");
	
	$("#ngayghinhan_hiv").datepicker();
	$("#ngayghinhan_hiv").datepicker("option", "dateFormat", "dd/mm/yy");

	$('#tuvong_hiv').change(function() {
		enableNgaytuvong();
	});

	$('#cothai_hiv').change(function() {
		enableNgaycothai();
	});

	var dlgCfDelete_HIV = new jBox('Modal', {
		title : 'Xác nhận xóa thông tin HIV',
		overlay : true,
		content : $('#dlgCfDelete_HIV'),
		draggable : 'title',
		position : {
			my : "center top",
			at : "center top",
			of : window
		}
	});

	hiv_dialog = $("#qlHiv").dialog({
		autoOpen : false,
		resizable : true,
		width : 800,
		position : {
			my : "center top",
			at : "center top",
			of : window
		}
	});

	$("#exitHIV").click(function() {
		hiv_dialog.dialog("close");
	});

	$("#deleteHIV").click(function() {
		dlgCfDelete_HIV.open();
	});

	$("#dlgCance_hiv").click(function() {
		dlgCfDelete_HIV.close();
	});

	$("#dlgSubmit_hiv").click(function(evt) {
		var str = [ $("#id_hiv_thong_tin").val() ];
		url = "xoattHIV";
		$.post(url, {
			url : convertArray(str)
		}).done(function(data) {
			if (data != "-1") {
				jAlert("Xóa thành công!", 'Thông báo');
				dlgCfDelete_HIV.close();
				hiv_dialog.dialog("close");
			} else {
				jAlert("Lỗi xóa thông tin!", 'Thông báo');
			}
		});
	});

	$("#saveHIV").click(
			function() {
				checkdulieuHIV();
				if (checkRequired_hiv == 0) {
					var ID_HIV_THONG_TIN = $("#id_hiv_thong_tin").val();
					var ID_DON_VI = dvtt;
					//var ID_NHAN_KHAU = $("#id_nhan_khau").val();
					var ID_HIV_DOI_TUONG = $("#doituong_hiv").val();
					var CO_THAI = $("#cothai_hiv").val();
					var NGAY_CO_THAI = $("#ngaycothai_hiv").val();
					var TINH_TRANG = $("#tinhtrang_hiv").val();
					var NGAY_XET_NGHIEM = $("#ngayxetnghiem_hiv").val();
					var DON_VI_KET_LUAN = $("#dvketluan_hiv").val();
					var DIEU_TRI_ARV = $("#dieutriarv_hiv").val();
					var DON_VI_DIEU_TRI = $("#dvdieutri_hiv").val();
					var TU_VONG = $("#tuvong_hiv").val();
					var NGAY_TU_VONG = $("#ngaytuvong_hiv").val();
					var GHI_CHU = $("#ghichu_hiv").val();
					var NGAY_GHI_NHAN = $("#ngayghinhan_hiv").val();
					var ID_TIEPNHAN = $("#idtiepnhan").val();
					var MA_BENH_NHAN = $("#mayte").val();
					var str = [ ID_HIV_THONG_TIN, ID_DON_VI, "-1",
							ID_HIV_DOI_TUONG, CO_THAI, NGAY_CO_THAI,
							TINH_TRANG, NGAY_XET_NGHIEM, DON_VI_KET_LUAN,
							DIEU_TRI_ARV, DON_VI_DIEU_TRI, TU_VONG,
							NGAY_TU_VONG, GHI_CHU, NGAY_GHI_NHAN, ID_TIEPNHAN,
							MA_BENH_NHAN ];
					if (modeg_hiv == 0) {
						url = "themchitietHIV";
						$.post(url, {
							url : convertArray(str)
						}).done(function(data) {
							if (data != "-1") {
								// $("#id_ho_khau1").val(data);
								jAlert("Thêm thành công!", 'Thông báo');

								$("#id_hiv_thong_tin").val(data);
								modeg_hiv = 1;
								$("#deleteHIV").addClass("button_shadow");
								$("#deleteHIV").prop('hidden', false);
							} else {
								jAlert("Lỗi thêm chi tiết HIV !", 'Thông báo');
							}
						});
					} else {
						url = "suachitietHIV";
						$.post(url, {
							url : convertArray(str)
						}).done(function(data) {
							if (data != "-1") {
								// $("#id_ho_khau1").val(data);
								jAlert("Sửa thành công!", 'Thông báo');
							} else {
								jAlert("Lỗi sửa chi tiết HIV !", 'Thông báo');
							}
						});
					}
				}
			});
});
function gandulieuHIV(id_tiep_nhan, ma_benh_nhan, id_don_vi) {
	$("#id_tiep_nhan").val(id_tiep_nhan);
	$("#ma_benh_nhan").val(ma_benh_nhan);
	// $("#ma_benh_nhan").val(10);
	$("#id_don_vi").val(id_don_vi);
	enableNgaycothai();
	enableNgaytuvong();
	var arr = [ id_tiep_nhan,id_don_vi, "0" ];
	var url1 = "chitietHIV?url=" + convertArray(arr);
	$.getJSON(url1, function(result) {
		$.each(result, function(i, field) {
			// lay ra toan bo thong tin ho khau;
			$("#id_hiv_thong_tin").val(field.ID_HIV_THONG_TIN);
			$("#doituong_hiv").val(field.ID_HIV_DOI_TUONG);
			$("#cothai_hiv").val(field.CO_THAI);
			$("#ngaycothai_hiv").val(field.NGAY_CO_THAI);
			$("#tinhtrang_hiv").val(field.TINH_TRANG);
			$("#ngayxetnghiem_hiv").val(field.NGAY_XET_NGHIEM);
			$("#dvketluan_hiv").val(field.DON_VI_KET_LUAN);
			$("#dieutriarv_hiv").val(field.DIEU_TRI_ARV);
			$("#dvdieutri_hiv").val(field.DON_VI_DIEU_TRI);
			$("#tuvong_hiv").val(field.TU_VONG);
			$("#ngaytuvong_hiv").val(field.NGAY_TU_VONG);
			$("#ghichu_hiv").val(field.GHI_CHU);
			$("#ngayghinhan_hiv").val(field.NGAY_GHI_NHAN);
			if ($("#id_hiv_thong_tin").val() == '') {
				modeg_hiv = 0;
				$("#deleteHIV").removeClass("button_shadow");
				$("#deleteHIV").prop('hidden', true);
			} else {
				modeg_hiv = 1;
				$("#deleteHIV").addClass("button_shadow");
				$("#deleteHIV").prop('hidden', false);
			}
			enableNgaycothai();
			enableNgaytuvong();
		});
	});
}
$("#hiv").click(function() {
	if ($("#idtiepnhan").val() == '') {
		jAlert("Mã lần khám không tồn tại !", 'Thông báo');
		return;
	}
	if ($("#mayte").val() == '') {
		jAlert("Mã bệnh nhân không tồn tại!", 'Thông báo');
		return;
	}
	gandulieuHIV($("#idtiepnhan").val(), $("#mayte").val(), dvtt);
	hiv_dialog.dialog("open");
});

function enableNgaycothai() {
	if ($('#cothai_hiv').val() == 1) {
		$("#ngaycothai_hiv").datepicker().datepicker('enable');
	} else {
		$("#ngaycothai_hiv").datepicker().datepicker('disable');
		$('#ngaycothai_hiv').datepicker().val("");
	}
}
function enableNgaytuvong() {
	if ($('#tuvong_hiv').val() == 1) {
		$("#ngaytuvong_hiv").datepicker().datepicker('enable');
	} else {
		$("#ngaytuvong_hiv").datepicker().datepicker('disable');
		$('#ngaytuvong_hiv').datepicker().val("");
	}
}
function checkdulieuHIV() {
	checkRequired_hiv = 0;
	if ($("#ngayghinhan_hiv").val() == ''
			|| $("#ngayghinhan_hiv").val() == null) {
		checkRequired_hiv = 1;
		jAlert("Ngày ghi nhận không được để trống !", 'Thông báo');
		$("#ngayghinhan_hiv").focus();
		return;
	}
	if ($("#ngayxetnghiem_hiv").val() == ''
			|| $("#ngayxetnghiem_hiv").val() == null) {
		checkRequired_hiv = 1;
		jAlert("Ngày xét nghiệm không được để trống !", 'Thông báo');
		$("#ngayxetnghiem_hiv").focus();
		return;
	}
}
