var modeg_sotret = -1; // -1: Jbox tat; 0: Jbox them; 1: Jbox sua du lieu;
var checkRequired_sotret = 0;
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

	$("#ngayghinhan_sr").keypress(function(e) {
		if (e.keyCode == 13) {
			$("#noiphathien_sr").focus();
		}
	});

	$("#noiphathien_sr").keypress(function(e) {
		if (e.keyCode == 13) {
			$("#donviphathien_sr").focus();
		}
	});

	$("#donviphathien_sr").keypress(function(e) {
		if (e.keyCode == 13) {
			$("#cothai_sr").focus();
		}
	});

	$("#cothai_sr").keypress(function(e) {
		if (e.keyCode == 13) {
			$("#tinhtrang_sr").focus();
		}
	});

	$("#tinhtrang_sr").keypress(function(e) {
		if (e.keyCode == 13) {
			$("#ngayxetnghiem_sr").focus();
		}
	});

	$("#ngayxetnghiem_sr").keypress(function(e) {
		if (e.keyCode == 13) {
			$("#loaixn_sr").focus();
		}
	});

	$("#loaixn_sr").keypress(function(e) {
		if (e.keyCode == 13) {
			$("#ketquaxn_sr").focus();
		}
	});

	$("#ketquaxn_sr").keypress(function(e) {
		if (e.keyCode == 13) {
			$("#cosot_sr").focus();
		}
	});

	$("#cosot_sr").keypress(function(e) {
		if (e.keyCode == 13) {
			$("#ngaychuandoan_sr").focus();
		}
	});

	$("#ngaychuandoan_sr").keypress(function(e) {
		if (e.keyCode == 13) {
			$("#loaichuandoan_sr").focus();
		}
	});

	$("#loaichuandoan_sr").keypress(function(e) {
		if (e.keyCode == 13) {
			$("#donviketluan_sr").focus();
		}
	});

	$("#donviketluan_sr").keypress(function(e) {
		if (e.keyCode == 13) {
			$("#ketquadieutri_sr").focus();
		}
	});

	$("#ketquadieutri_sr").keypress(function(e) {
		if (e.keyCode == 13) {
			$("#tuvong_sr").focus();
		}
	});

	$("#tuvong_sr").keypress(function(e) {
		if (e.keyCode == 13 && $("#tuvong_sr").val() == 1) {
			$("#ngaytuvong_sr").focus();
		}
	});

	$("#ghichu_sr").keypress(function(e) {
		if (e.keyCode == 13) {
			$("#saveSR").focus();
		}
	});

	$("#ngaytuvong_sr").keypress(function(e) {
		if (e.keyCode == 13) {
			$("#ghichu_sr").focus();
		}
	});

	$('#tuvong_sr').change(function() {
		enableNgayTuVongSR();
	});

	$("#ngayghinhan_sr").datepicker();
	$("#ngayghinhan_sr").datepicker("option", "dateFormat", "dd/mm/yy");

	$("#ngayxetnghiem_sr").datepicker();
	$("#ngayxetnghiem_sr").datepicker("option", "dateFormat", "dd/mm/yy");

	$("#ngaychuandoan_sr").datepicker();
	$("#ngaychuandoan_sr").datepicker("option", "dateFormat", "dd/mm/yy");

	$("#ngaytuvong_sr").datepicker();
	$("#ngaytuvong_sr").datepicker("option", "dateFormat", "dd/mm/yy");

	var dlgCfDelete_Sotret = new jBox('Modal', {
		title : 'Xác nhận xóa thông tin Sốt rét',
		overlay : true,
		content : $('#dlgCfDelete_SR'),
		draggable : 'title',
		position : {
			my : "center top",
			at : "center top",
			of : window
		}
	});

	sotret_dialog = $("#qlbenhsotret").dialog({
		autoOpen : false,
		resizable : true,
		width : 900,
		position : {
			my : "center top",
			at : "center top",
			of : window
		}
	});

	$("#exitSR").click(function() {
		sotret_dialog.dialog("close");
	});

	$("#deleteSR").click(function() {
		dlgCfDelete_Sotret.open();
	});

	$("#dlgCanceSR").click(function() {
		dlgCfDelete_Sotret.close();
	});

	$("#dlgSubmitSR").click(function(evt) {
		var str = [ $("#id_sr_thong_tin").val() ];
		url = "xoattSotRet";
		$.post(url, {
			url : convertArray(str)
		}).done(function(data) {
			if (data != "-1") {
				jAlert("Xóa thành công!", 'Thông báo');
				dlgCfDelete_Sotret.close();
				sotret_dialog.dialog("close");
			} else {
				jAlert("Lỗi xóa thông tin!", 'Thông báo');
			}
		});
	});

	$("#saveSR")
			.click(
					function() {
						checkdulieuSotret();
						if (checkRequired_sotret == 0) {
							var ID_SR_THONG_TIN = $("#id_sr_thong_tin").val();
							var ID_DON_VI = dvtt;
							//var ID_NHAN_KHAU = $("#id_nhan_khau").val();
							var NGAY_GHI_NHAN = $("#ngayghinhan_sr").val();
							var ID_NOI_PHAT_HIEN = $("#noiphathien_sr").val();
							var DON_VI_PHAT_HIEN = $("#donviphathien_sr").val();
							var CO_THAI = $("#cothai_sr").val();
							var TINH_TRANG = $("#tinhtrang_sr").val();
							var NGAY_XET_NGHIEM = $("#ngayxetnghiem_sr").val();
							var ID_SR_LOAI_XET_NGHIEM = $("#loaixn_sr").val();
							var ID_SR_KET_QUA_XN = $("#ketquaxn_sr").val();
							var NGAY_CHAN_DOAN = $("#ngaychuandoan_sr").val();
							var ID_CHAN_DOAN = $("#loaichuandoan_sr").val();
							var DON_VI_KET_LUAN = $("#donviketluan_sr").val();
							var KET_QUA_DIEU_TRI = $("#ketquadieutri_sr").val();
							var TU_VONG = $("#tuvong_sr").val();
							var NGAY_TU_VONG = $("#ngaytuvong_sr").val();
							var GHI_CHU = $("#ghichu_sr").val();
							var CO_SOT = $("#cosot_sr").val();
							var ID_TIEPNHAN = $("#idtiepnhan").val();
							var MA_BENH_NHAN = $("#mayte").val();
							var ID_NOI_DIEU_TRI = $("#loaidieutri_sr").val();
							var str = [ ID_SR_THONG_TIN, ID_DON_VI,
									NGAY_GHI_NHAN, "-1",
									ID_NOI_PHAT_HIEN, DON_VI_PHAT_HIEN,
									CO_THAI, TINH_TRANG, NGAY_XET_NGHIEM,
									ID_SR_LOAI_XET_NGHIEM, ID_SR_KET_QUA_XN,
									NGAY_CHAN_DOAN, ID_CHAN_DOAN,
									DON_VI_KET_LUAN, KET_QUA_DIEU_TRI, TU_VONG,
									NGAY_TU_VONG, GHI_CHU, CO_SOT, ID_TIEPNHAN,
									MA_BENH_NHAN, ID_NOI_DIEU_TRI,'0' ];
							if (modeg_sotret == 0) {
								url = "themchitietSotRet";
								$
										.post(url, {
											url : convertArray(str)
										})
										.done(
												function(data) {
													if (data != "-1") {
														// $("#id_ho_khau1").val(data);
														jAlert(
																"Thêm thành công!",
																'Thông báo');

														$("#id_sr_thong_tin")
																.val(data);
														modeg_sotret = 1;
														$("#deleteSR")
																.addClass(
																		"button_shadow");
														$("#deleteSR")
																.prop('hidden',
																		false);
													} else {
														jAlert(
																"Lỗi thêm chi tiết Sốt rét !",
																'Thông báo');
													}
												});
							} else {
								url = "suachitietSotRet";
								$
										.post(url, {
											url : convertArray(str)
										})
										.done(
												function(data) {
													if (data != "-1") {
														// $("#id_ho_khau1").val(data);
														jAlert(
																"Sửa thành công!",
																'Thông báo');
													} else {
														jAlert(
																"Lỗi sửa chi tiết Sốt rét !",
																'Thông báo');
													}
												});
							}
						}
					});
});
function gandulieusotret(id_tiep_nhan, ma_benh_nhan, id_don_vi) {
	$("#id_tiep_nhan").val(id_tiep_nhan);
	$("#ma_benh_nhan").val(ma_benh_nhan);
	$("#id_don_vi").val(id_don_vi);
	enableNgayTuVongSR();
	var arr = [ id_tiep_nhan,id_don_vi, "0" ];
	var url1 = "chitietSotRet?url=" + convertArray(arr);
	$.getJSON(url1, function(result) {
		$.each(result, function(i, field) {
			// lay ra toan bo thong tin ho khau;
			$("#id_sr_thong_tin").val(field.ID_SR_THONG_TIN);
			$("#ngayghinhan_sr").val(field.NGAY_GHI_NHAN);
			$("#noiphathien_sr").val(field.ID_NOI_PHAT_HIEN);
			$("#donviphathien_sr").val(field.DON_VI_PHAT_HIEN);
			$("#cothai_sr").val(field.CO_THAI);
			$("#tinhtrang_sr").val(field.TINH_TRANG);
			$("#ngayxetnghiem_sr").val(field.NGAY_XET_NGHIEM);
			$("#loaixn_sr").val(field.ID_SR_LOAI_XET_NGHIEM);
			$("#ketquaxn_sr").val(field.ID_SR_KET_QUA_XN);
			$("#ngaychuandoan_sr").val(field.NGAY_CHAN_DOAN);
			$("#loaichuandoan_sr").val(field.ID_CHAN_DOAN);
			$("#donviketluan_sr").val(field.DON_VI_KET_LUAN);
			$("#ketquadieutri_sr").val(field.KET_QUA_DIEU_TRI);
			$("#tuvong_sr").val(field.TU_VONG);
			$("#ngaytuvong_sr").val(field.NGAY_TU_VONG);
			$("#ghichu_sr").val(field.GHI_CHU);
			$("#cosot_sr").val(field.CO_SOT);
			$("#loaidieutri_sr").val(field.ID_NOI_DIEU_TRI);
			if ($("#id_sr_thong_tin").val() == '') {
				modeg_sotret = 0;
				$("#deleteSR").removeClass("button_shadow");
				$("#deleteSR").prop('hidden', true);
			} else {
				modeg_sotret = 1;
				$("#deleteSR").addClass("button_shadow");
				$("#deleteSR").prop('hidden', false);
			}
			enableNgayTuVongSR();
		});
	});
}
$("#sotret").click(function() {
	if ($("#idtiepnhan").val() == '') {
		jAlert("Mã lần khám không tồn tại !", 'Thông báo');
		return;
	}
	if ($("#mayte").val() == '') {
		jAlert("Mã bệnh nhân không tồn tại!", 'Thông báo');
		return;
	}
	gandulieusotret($("#idtiepnhan").val(), $("#mayte").val(), dvtt);
	sotret_dialog.dialog("open");
});

function checkdulieuSotret() {
	checkRequired_sotret = 0;
	if ($("#ngayghinhan_sr").val() == '' || $("#ngayghinhan_sr").val() == null) {
		checkRequired_sotret = 1;
		jAlert("Ngày ghi nhận không được để trống !", 'Thông báo');
		$("#ngayghinhan_sr").focus();
		return;
	}

	if ($("#loaidieutri_sr").val() == '' || $("#loaidieutri_sr").val() == null) {
		if ($("#loaixn_sr").val() != 1) {
			checkRequired_sotret = 1;
			jAlert("Loại điều trị không được để trống !", 'Thông báo');
			$("#loaidieutri_sr").focus();
			return;
		}
	}

	if ($("#noiphathien_sr").val() == '' || $("#noiphathien_sr").val() == null) {
		checkRequired_sotret = 1;
		jAlert("Nơi phát hiện không được để trống !", 'Thông báo');
		$("#noiphathien_sr").focus();
		return;
	}
	if ($("#tinhtrang_sr").val() == '' || $("#tinhtrang_sr").val() == null) {
		checkRequired_sotret = 1;
		jAlert("Tình trạng không được để trống !", 'Thông báo');
		$("#tinhtrang_sr").focus();
		return;
	}
	if ($("#loaixn_sr").val() == '' || $("#loaixn_sr").val() == null) {
		checkRequired_sotret = 1;
		jAlert("Loại xét nghiệm không được để trống !", 'Thông báo');
		$("#loaixn_sr").focus();
		return;
	}
	if ($("#ketquaxn_sr").val() == '' || $("#ketquaxn_sr").val() == null) {
		checkRequired_sotret = 1;
		jAlert("Kết quả xét nghiệm không được để trống !", 'Thông báo');
		$("#ketquaxn_sr").focus();
		return;
	}
	if ($("#loaichuandoan_sr").val() == ''
			|| $("#loaichuandoan_sr").val() == null) {
		checkRequired_sotret = 1;
		jAlert("Loại chẩn đoán không được để trống !", 'Thông báo');
		$("#loaichuandoan_sr").focus();
		return;
	}
}
function enableNgayTuVongSR() {
	if ($('#tuvong_sr').val() == 1) {
		$("#ngaytuvong_sr").datepicker().datepicker('enable');
	} else {
		$("#ngaytuvong_sr").datepicker().datepicker('disable');
		$('#ngaytuvong_sr').datepicker().val("");
	}
}
