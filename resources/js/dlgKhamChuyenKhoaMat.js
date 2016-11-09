var modeg_mat = -1; // -1: Jbox tat; 0: Jbox them; 1: Jbox sua du lieu;
var checkRequired_mat = 0;
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

	$("#ngayghinhan_mat").keypress(function(e) {
		if (e.keyCode == 13) {
	$("#thilucmattrai").focus();
		}
	});

	$("#thilucmattrai").keypress(function(e) {
		if (e.keyCode == 13) {
			$("#thilucmatphai").focus();
		}
	});

	$("#thilucmatphai").keypress(function(e) {
		if (e.keyCode == 13) {
			$("#nhanapmattrai").focus();
		}
	});

	$("#nhanapmattrai").keypress(function(e) {
		if (e.keyCode == 13) {
			$("#nhanapmatphai").focus();
		}
	});

	$("#nhanapmatphai").keypress(function(e) {
		if (e.keyCode == 13) {
			$("#ngaykhoibenh_mat").focus();
		}
	});

	$("#ngaykhoibenh_mat").keypress(function(e) {
		if (e.keyCode == 13) {
			$("#ghichu_mat").focus();
		}
	});
	$("#ngayghinhan_mat").datepicker();
	$("#ngayghinhan_mat").datepicker("option", "dateFormat", "dd/mm/yy");
	$("#ngaykhoibenh_mat").datepicker();
	$("#ngaykhoibenh_mat").datepicker("option", "dateFormat", "dd/mm/yy");

	var dlgCfDelete_Mat = new jBox('Modal', {
		title : 'Xác nhận xóa thông tin Mắt',
		overlay : true,
		content : $('#dlgCfDelete_MAT'),
		draggable : 'title',
		position : {
			my : "center top",
			at : "center top",
			of : window
		}
	});

	mat_dialog = $("#qlbenhnhanmat").dialog({
		autoOpen : false,
		resizable : true,
		width : 900,
		position : {
			my : "center top",
			at : "center top",
			of : window
		}
	});

	$("#exitMat").click(function() {
		mat_dialog.dialog("close");
	});

	$("#deleteMat").click(function() {
		dlgCfDelete_Mat.open();
	});

	$("#dlgCance_Mat").click(function() {
		dlgCfDelete_Mat.close();
	});

	$("#dlgSubmit_mat").click(function(evt) {
		var str = [ $("#id_mat_thong_tin").val() ];
		url = "xoattMat";
		$.post(url, {
			url : convertArray(str)
		}).done(function(data) {
			if (data != "-1") {
				jAlert("Xóa thành công!", 'Thông báo');
				dlgCfDelete_Mat.close();
				mat_dialog.dialog("close");
			} else {
				jAlert("Lỗi xóa thông tin!", 'Thông báo');
			}
		});
	});

	$("#saveMat").click(
			function() {
				checkdulieuMat();
				if (checkRequired_mat == 0) {
					var ID_MAT_THONG_TIN = $("#id_mat_thong_tin").val();
					var ID_DON_VI = dvtt;
					//var ID_NHAN_KHAU = $("#id_nhan_khau").val();
					var NGAY_GHI_NHAN = $("#ngayghinhan_mat").val();
					var thilucmattrai = $("#thilucmattrai").val();
					var thilucmatphai = $("#thilucmatphai").val();
					var nhanapmattrai = $("#nhanapmattrai").val();
					var nhanapmatphai = $("#nhanapmatphai").val();
					var GHI_CHU = $("#ghichu_mat").val();
					var NGAY_KHOI_BENH = $("#ngaykhoibenh_mat").val();
					var ID_TIEPNHAN = $("#idtiepnhan").val();
					var MA_BENH_NHAN = $("#mayte").val();
					var str = [ ID_MAT_THONG_TIN, ID_DON_VI, "-1",
							NGAY_GHI_NHAN, thilucmattrai, thilucmatphai,
							nhanapmattrai, nhanapmatphai, GHI_CHU, NGAY_KHOI_BENH,
							ID_TIEPNHAN,MA_BENH_NHAN ];
					if (modeg_mat == 0) {
						url = "themchitietMat";
						$.post(url, {
							url : convertArray(str)
						}).done(function(data) {
							if (data != "-1") {
								// $("#id_ho_khau1").val(data);
								jAlert("Thêm thành công!", 'Thông báo');

								$("#id_mat_thong_tin").val(data);
								modeg_mat = 1;
								$("#deleteMat").addClass("button_shadow");
								$("#deleteMat").prop('hidden', false);
							} else {
								jAlert("Lỗi thêm chi tiết mắt !", 'Thông báo');
							}
						});
					} else {
						url = "suachitietMat";
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
function gandulieumat(id_tiep_nhan, ma_benh_nhan, id_don_vi) {
	$("#id_tiep_nhan").val(id_tiep_nhan);
	$("#ma_benh_nhan").val(ma_benh_nhan);
	$("#id_don_vi").val(id_don_vi);
	var arr = [ id_tiep_nhan,id_don_vi, "0" ];
	var url1 = "chitietMat?url=" + convertArray(arr);
	$.getJSON(url1, function(result) {
		$.each(result, function(i, field) {
			// lay ra toan bo thong tin ho khau;
			$("#id_mat_thong_tin").val(field.ID_MAT_THONG_TIN);
			$("#ngayghinhan_mat").val(field.NGAY_GHI_NHAN);
			$("#thilucmattrai").val(field.THI_LUC_MAT_TRAI);
			$("#thilucmatphai").val(field.THI_LUC_MAT_PHAI);
			$("#nhanapmattrai").val(field.NHAN_AP_MAT_TRAI);
			$("#nhanapmatphai").val(field.NHAN_AP_MAT_PHAI);
			$("#ghichu_mat").val(field.GHI_CHU);
			$("#ngaykhoibenh_mat").val(field.NGAY_KHOI_BENH);
			if ($("#id_mat_thong_tin").val() == '') {
				modeg_mat = 0;
				$("#deleteMat").removeClass("button_shadow");
				$("#deleteMat").prop('hidden', true);
			} else {
				modeg_mat = 1;
				$("#deleteMat").addClass("button_shadow");
				$("#deleteMat").prop('hidden', false);
			}
			
		});
	});
}
$("#khammat").click(function() {
	if ($("#idtiepnhan").val() == '') {
		jAlert("Mã lần khám không tồn tại !", 'Thông báo');
		return;
	}
	if ($("#mayte").val() == '') {
		jAlert("Mã bệnh nhân không tồn tại!", 'Thông báo');
		return;
	}
	gandulieumat($("#idtiepnhan").val(), $("#mayte").val(), dvtt);
	mat_dialog.dialog("open");
});

function checkdulieuMat() {
	checkRequired_mat = 0;
	if ($("#ngayghinhan_mat").val() == ''
			|| $("#ngayghinhan_mat").val() == null) {
		checkRequired_mat = 1;
		jAlert("Ngày ghi nhận không được để trống !", 'Thông báo');
		$("#ngayghinhan_mat").focus();
		return;
	}
	if ($("#thilucmattrai").val() == '' || $("#thilucmattrai").val() == null) {
		checkRequired_mat = 1;
		jAlert("Thị lực mắt trái không được để trống !", 'Thông báo');
		$("#thilucmattrai").focus();
		return;
	}
	if ($("#thilucmatphai").val() == '' || $("#thilucmatphai").val() == null) {
		checkRequired_mat = 1;
		jAlert("Thị lực mắt phải không được để trống !", 'Thông báo');
		$("#thilucmatphai").focus();
		return;
	}
        if ($("#nhanapmattrai").val() == '' || $("#nhanapmattrai").val() == null) {
		checkRequired_mat = 1;
		jAlert("Nhãn áp mắt trái không được để trống !", 'Thông báo');
		$("#thilucmatphai").focus();
		return;
	}
        if ($("#nhanapmatphai").val() == '' || $("#nhanapmatphai").val() == null) {
		checkRequired_mat = 1;
		jAlert("Nhãn áp mắt phải không được để trống !", 'Thông báo');
		$("#nhanapmatphai").focus();
		return;
	}
}
