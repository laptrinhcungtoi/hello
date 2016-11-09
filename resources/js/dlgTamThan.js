var modeg_tamthan = -1; // -1: Jbox tat; 0: Jbox them; 1: Jbox sua du lieu;
var checkRequired_tamthan = 0;
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

	$("#ngayghinhan_tt").keypress(function(e) {
		if (e.keyCode == 13) {
			$("#tinhtrang_tt").focus();
		}
	});

	$("#tinhtrang_tt").keypress(function(e) {
		if (e.keyCode == 13) {
			$("#donviketluan_tt").focus();
		}
	});

	$("#donviketluan_tt").keypress(function(e) {
		if (e.keyCode == 13) {
			$("#ngaychuandoan_tt").focus();
		}
	});

	$("#ngaychuandoan_tt").keypress(function(e) {
		if (e.keyCode == 13) {
			$("#loai_tt").focus();
		}
	});

	$("#loai_tt").keypress(function(e) {
		if (e.keyCode == 13) {
			$("#mucdo_tt").focus();
		}
	});

	$("#mucdo_tt").keypress(function(e) {
		if (e.keyCode == 13) {
			$("#phuchoichucnang_tt").focus();
		}
	});

	$("#phuchoichucnang_tt").keypress(function(e) {
		if (e.keyCode == 13) {
				$("#kiemtratainha_tt").focus();
		}
	});

	$("#kiemtratainha_tt").keypress(function(e) {
		if (e.keyCode == 13) {
			$("#chitiet_tt").focus();
		}
	});

	$("#chitiet_tt").keypress(function(e) {
		if (e.keyCode == 13) {
			$("#saveTamThan").focus();
		}
	});


	$("#ngayghinhan_tt").datepicker();
	$("#ngayghinhan_tt").datepicker("option", "dateFormat", "dd/mm/yy");

	$("#ngaychuandoan_tt").datepicker();
	$("#ngaychuandoan_tt").datepicker("option", "dateFormat", "dd/mm/yy");

	var dlgCfDelete_TAMTHAN = new jBox('Modal', {
		title : 'Xác nhận xóa thông tin Tâm thần',
		overlay : true,
		content : $('#dlgCfDelete_TAMTHAN'),
		draggable : 'title',
		position : {
			my : "center top",
			at : "center top",
			of : window
		}
	});

	tamthan_dialog = $("#qlTamThan").dialog({
		autoOpen : false,
		resizable : true,
		width : 900,
		position : {
			my : "center top",
			at : "center top",
			of : window
		}
	});

	$("#exitTamThan").click(function() {
		tamthan_dialog.dialog("close");
	});

	$("#deleteTamThan").click(function() {
		dlgCfDelete_TAMTHAN.open();
	});

	$("#dlgCance_tamthan").click(function() {
		dlgCfDelete_TAMTHAN.close();
	});

	$("#dlgSubmit_tamthan").click(function(evt) {
		var str = [ $("#id_tt_thong_tin").val() ];
		url = "xoattTamthan";
		$.post(url, {
			url : convertArray(str)
		}).done(function(data) {
			if (data != "-1") {
				jAlert("Xóa thành công!", 'Thông báo');
				dlgCfDelete_TAMTHAN.close();
				tamthan_dialog.dialog("close");
			} else {
				jAlert("Lỗi xóa thông tin!", 'Thông báo');
			}
		});
	});

	$("#saveTamThan")
			.click(
					function() {
						checkdulieutamthan();
						if (checkRequired_tamthan == 0) {
							var ID_TT_THONG_TIN = $("#id_tt_thong_tin").val();
							var ID_DON_VI = dvtt;
                                                        
							//var ID_NHAN_KHAU = $("#id_nhan_khau").val();
							var NGAY_GHI_NHAN = $("#ngayghinhan_tt").val();
							var DON_VI_KET_LUAN = $("#donviketluan_tt").val();
							var NGAY_CHAN_DOAN = $("#ngaychuandoan_tt").val();
							var CHI_TIET = $("#chitiet_tt").val();
							var KIEM_TRA_TAI_NHA = $("#kiemtratainha_tt").val();
							var THUOC_THANG1 = $("#thuoct1_tt").is(':checked') ? 1
									: 0;
							var THUOC_THANG2 = $("#thuoct2_tt").is(':checked') ? 1
									: 0;
							var THUOC_THANG3 = $("#thuoct3_tt").is(':checked') ? 1
									: 0;
							var THUOC_THANG4 = $("#thuoct4_tt").is(':checked') ? 1
									: 0;
							var THUOC_THANG5 = $("#thuoct5_tt").is(':checked') ? 1
									: 0;
							var THUOC_THANG6 = $("#thuoct6_tt").is(':checked') ? 1
									: 0;
							var THUOC_THANG7 = $("#thuoct7_tt").is(':checked') ? 1
									: 0;
							var THUOC_THANG8 = $("#thuoct8_tt").is(':checked') ? 1
									: 0;
							var THUOC_THANG9 = $("#thuoct9_tt").is(':checked') ? 1
									: 0;
							var THUOC_THANG10 = $("#thuoct10_tt").is(':checked') ? 1
									: 0;
							var THUOC_THANG11 = $("#thuoct11_tt").is(':checked') ? 1
									: 0;
							var THUOC_THANG12 = $("#thuoct12_tt").is(':checked') ? 1
									: 0;
							var ID_PHUC_HOI_CHUC_NANG = $("#phuchoichucnang_tt")
									.val();
							var ID_TINH_TRANG = $("#tinhtrang_tt").val();
							var ID_LOAI = $("#loai_tt").val();
							var MUC_DO = $("#mucdo_tt").val();
							var ID_DIENBIEN = $("#dienbien_tt").val();
							var ID_TIEPNHAN = $("#idtiepnhan").val();
							var MA_BENH_NHAN = $("#mayte").val();
							var ID_LY_DO = $("#ly_do_tt").val();
							var str = [ ID_TT_THONG_TIN, NGAY_GHI_NHAN,
									DON_VI_KET_LUAN, NGAY_CHAN_DOAN, CHI_TIET,
									KIEM_TRA_TAI_NHA, THUOC_THANG1,
									THUOC_THANG2, THUOC_THANG3, THUOC_THANG4,
									THUOC_THANG5, THUOC_THANG6, THUOC_THANG7,
									THUOC_THANG8, THUOC_THANG9, THUOC_THANG10,
									THUOC_THANG11, THUOC_THANG12,
									ID_PHUC_HOI_CHUC_NANG, ID_TINH_TRANG,
									ID_DON_VI, ID_LOAI, "-1", MUC_DO,
									ID_TIEPNHAN, MA_BENH_NHAN,ID_DIENBIEN,ID_LY_DO,'0'];
							if (modeg_tamthan == 0) {
								url = "themchitietTamthan";
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

														$("#id_tt_thong_tin")
																.val(data);
														modeg_tamthan = 1;
														$("#deleteTamThan")
																.addClass(
																		"button_shadow");
														$("#deleteTamThan")
																.prop('hidden',
																		false);
													} else {
														jAlert(
																"Lỗi thêm chi tiết Tâm thần !",
																'Thông báo');
													}
												});
							} else {
								url = "suachitietTamthan";
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
																"Lỗi sửa chi tiết Tâm thần !",
																'Thông báo');
													}
												});
							}
						}
					});
});
function gandulieutamthan(id_tiep_nhan, ma_benh_nhan, id_don_vi) {
	$("#id_tiep_nhan").val(id_tiep_nhan);
	$("#ma_benh_nhan").val(ma_benh_nhan);
	$("#id_don_vi").val(id_don_vi);
	// enableNgaykhoibenh();
	var arr = [ id_tiep_nhan,id_don_vi, "0" ];
	var url1 = "chitietTamthan?url=" + convertArray(arr);
	$.getJSON(url1, function(result) {
		$.each(result, function(i, field) {
			// lay ra toan bo thong tin ho khau;
			$("#id_tt_thong_tin").val(field.ID_TT_THONG_TIN);
			$("#ngayghinhan_tt").val(field.NGAY_GHI_NHAN);
			$("#donviketluan_tt").val(field.DON_VI_KET_LUAN);
			$("#ngaychuandoan_tt").val(field.NGAY_CHAN_DOAN);
			$("#chitiet_tt").val(field.CHI_TIET);
			$("#kiemtratainha_tt").val(field.KIEM_TRA_TAI_NHA);
			$("#thuoct1_tt").prop("checked",
					field.THUOC_THANG1 == 1 ? true : false);
			$("#thuoct2_tt").prop("checked",
					field.THUOC_THANG2 == 1 ? true : false);
			$("#thuoct3_tt").prop("checked",
					field.THUOC_THANG3 == 1 ? true : false);
			$("#thuoct4_tt").prop("checked",
					field.THUOC_THANG4 == 1 ? true : false);
			$("#thuoct5_tt").prop("checked",
					field.THUOC_THANG5 == 1 ? true : false);
			$("#thuoct6_tt").prop("checked",
					field.THUOC_THANG6 == 1 ? true : false);
			$("#thuoct7_tt").prop("checked",
					field.THUOC_THANG7 == 1 ? true : false);
			$("#thuoct8_tt").prop("checked",
					field.THUOC_THANG8 == 1 ? true : false);
			$("#thuoct9_tt").prop("checked",
					field.THUOC_THANG9 == 1 ? true : false);
			$("#thuoct10_tt").prop("checked",
					field.THUOC_THANG10 == 1 ? true : false);
			$("#thuoct11_tt").prop("checked",
					field.THUOC_THANG11 == 1 ? true : false);
			$("#thuoct12_tt").prop("checked",
					field.THUOC_THANG12 == 1 ? true : false);
			$("#phuchoichucnang_tt").val(field.ID_PHUC_HOI_CHUC_NANG);
			$("#tinhtrang_tt").val(field.ID_TINH_TRANG);
			$("#loai_tt").val(field.ID_LOAI);
			$("#mucdo_tt").val(field.MUC_DO);
			 $("#dienbien_tt").val(field.ID_DIENBIEN);
			 $("#ly_do_tt").val(field.ID_LY_DO);

			if ($("#id_tt_thong_tin").val() == '') {
				modeg_tamthan = 0;
				$("#deleteTamThan").removeClass("button_shadow");
				$("#deleteTamThan").prop('hidden', true);
			} else {
				modeg_tamthan = 1;
				$("#deleteTamThan").addClass("button_shadow");
				$("#deleteTamThan").prop('hidden', false);
			}
			// enableNgaykhoibenh();
		});
	});
}
$("#tamthan").click(function() {
	if ($("#idtiepnhan").val() == '') {
		jAlert("Mã lần khám không tồn tại !", 'Thông báo');
		return;
	}
	if ($("#mayte").val() == '') {
		jAlert("Mã bệnh nhân không tồn tại!", 'Thông báo');
		return;
	}
	gandulieutamthan($("#idtiepnhan").val(), $("#mayte").val(), dvtt);
	tamthan_dialog.dialog("open");
});

function checkdulieutamthan() {
	checkRequired_tamthan = 0;
	if ($("#ngayghinhan_tt").val() == '' || $("#ngayghinhan_tt").val() == null) {
		checkRequired_tamthan = 1;
		jAlert("Ngày ghi nhận không được để trống !", 'Thông báo');
		$("#ngayghinhan_tt").focus();
		return;
	}
	if ($("#tinhtrang_tt").val() == '' || $("#tinhtrang_tt").val() == null) {
		checkRequired_tamthan = 1;
		jAlert("Chưa chọn tình trạng !", 'Thông báo');
		$("#tinhtrang_tt").focus();
		return;
	}
	if ($("#loai_tt").val() == '' || $("#loai_tt").val() == null) {
		checkRequired_tamthan = 1;
		jAlert("Chưa chọn loại !", 'Thông báo');
		$("#loai_tt").focus();
		return;
	}
	if ($("#phuchoichucnang_tt").val() == ''
			|| $("#phuchoichucnang_tt").val() == null) {
		checkRequired_tamthan = 1;
		jAlert("Chưa chọn phục hồi chức năng !", 'Thông báo');
		$("#phuchoichucnang_tt").focus();
		return;
	}
}
