var modeg_lao = -1; // -1: Jbox tat; 0: Jbox them; 1: Jbox sua du lieu;
var checkRequired_lao = 0;
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

	$("#ngayghinhan_lao").keypress(function(e) {
		if (e.keyCode == 13) {
				$("#ngayvexa_lao").focus();
		}
	});

	$("#ngayvexa_lao").keypress(function(e) {
		if (e.keyCode == 13) {
			$("#phanloai_lao").focus();
		}
	});

	$("#phanloai_lao").keypress(function(e) {
		if (e.keyCode == 13) {
			$("#dtcks_lao").focus();
		}
	});

	$("#dtcks_lao").keypress(function(e) {
		if (e.keyCode == 13) {
			$("#khang_thuoc_lao").focus();
		}
	});

	$("#khang_thuoc_lao").keypress(function(e) {
		if (e.keyCode == 13) {
			$("#ly_do_lao").focus();
		}
	});

	$("#ly_do_lao").keypress(function(e) {
		if (e.keyCode == 13) {
			$("#ketqua_lao").focus();
		}
	});

	$("#ketqua_lao").keypress(function(e) {
		if (e.keyCode == 13) {
			if ($("#ketqua_lao").val() == 1 || $("#ketqua_lao").val() == 2) {
				$("#ngaykhoibenh_lao").focus();
			} else {
				$("#ghichu_lao").focus();
			}
		}
	});

	$("#ngaykhoibenh_lao").keypress(function(e) {
		if (e.keyCode == 13) {
			$("#ghichu_lao").focus();
		}
	});

	$("#ghichu_lao").keypress(function(e) {
		if (e.keyCode == 13) {
			$("#saveLao").focus();
		}
	});
	
	$('#ketqua_lao').change(function() {
		enableNgaykhoibenh();
	});

	$("#ngayghinhan_lao").datepicker();
	$("#ngayghinhan_lao").datepicker("option", "dateFormat", "dd/mm/yy");

	$("#ngayvexa_lao").datepicker();
	$("#ngayvexa_lao").datepicker("option", "dateFormat", "dd/mm/yy");

	$("#ngaykhoibenh_lao").datepicker();
	$("#ngaykhoibenh_lao").datepicker("option", "dateFormat", "dd/mm/yy");

	var dlgCfDelete_Lao = new jBox('Modal', {
		title : 'Xác nhận xóa thông tin Lao',
		overlay : true,
		content : $('#dlgCfDelete_LAO'),
		draggable : 'title',
		position : {
			my : "center top",
			at : "center top",
			of : window
		}
	});

	lao_dialog = $("#qlbenhnhanlao").dialog({
		autoOpen : false,
		resizable : true,
		width : 900,
		position : {
			my : "center top",
			at : "center top",
			of : window
		}
	});

	$("#exitLao").click(function() {
		lao_dialog.dialog("close");
	});

	$("#deleteLao").click(function() {
		dlgCfDelete_Lao.open();
	});

	$("#dlgCance_lao").click(function() {
		dlgCfDelete_Lao.close();
	});

	$("#dlgSubmit_lao").click(function(evt) {
		var str = [ $("#id_lao_thong_tin").val() ];
		url = "xoattLao";
		$.post(url, {
			url : convertArray(str)
		}).done(function(data) {
			if (data != "-1") {
				jAlert("Xóa thành công!", 'Thông báo');
				dlgCfDelete_Lao.close();
				lao_dialog.dialog("close");
			} else {
				jAlert("Lỗi xóa thông tin!", 'Thông báo');
			}
		});
	});

	$("#saveLao").click(
			function() {
				checkdulieuLao();
				if (checkRequired_lao == 0) {
					var ID_LAO_THONG_TIN = $("#id_lao_thong_tin").val();
					var ID_DON_VI = dvtt;
					//var ID_NHAN_KHAU = $("#id_nhan_khau").val();
					var NGAY_GHI_NHAN = $("#ngayghinhan_lao").val();
					var SO_PHIEU_DTCKS = $("#dtcks_lao").val();
					var NGAY_VE_XA_DIEU_TRI = $("#ngayvexa_lao").val();
					var ID_PHAN_LOAI = $("#phanloai_lao").val();
					var ID_KET_QUA = $("#ketqua_lao").val();
					var GHI_CHU = $("#ghichu_lao").val();
					var NGAY_KHOI_BENH = $("#ngaykhoibenh_lao").val();
					var ID_LAO_KHANG_THUOC = $("#khang_thuoc_lao").val();
					var ID_LY_DO = $("#ly_do_lao").val();
					var ID_TIEPNHAN = $("#idtiepnhan").val();
					var MA_BENH_NHAN = $("#mayte").val();
					var str = [ ID_LAO_THONG_TIN, ID_DON_VI, "-1",
							NGAY_GHI_NHAN, SO_PHIEU_DTCKS, NGAY_VE_XA_DIEU_TRI,
							ID_PHAN_LOAI, ID_KET_QUA, GHI_CHU, NGAY_KHOI_BENH,
							ID_LAO_KHANG_THUOC, ID_LY_DO, ID_TIEPNHAN,
							MA_BENH_NHAN ];
					if (modeg_lao == 0) {
						url = "themchitietLao";
						$.post(url, {
							url : convertArray(str)
						}).done(function(data) {
							if (data != "-1") {
								// $("#id_ho_khau1").val(data);
								jAlert("Thêm thành công!", 'Thông báo');

								$("#id_lao_thong_tin").val(data);
								modeg_lao = 1;
								$("#deleteLao").addClass("button_shadow");
								$("#deleteLao").prop('hidden', false);
							} else {
								jAlert("Lỗi thêm chi tiết HIV !", 'Thông báo');
							}
						});
					} else {
						url = "suachitietLao";
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
function gandulieulao(id_tiep_nhan, ma_benh_nhan, id_don_vi) {
	$("#id_tiep_nhan").val(id_tiep_nhan);
	$("#ma_benh_nhan").val(ma_benh_nhan);
	$("#id_don_vi").val(id_don_vi);
	enableNgaykhoibenh();
	var arr = [ id_tiep_nhan,id_don_vi, "0" ];
	var url1 = "chitietLao?url=" + convertArray(arr);
	$.getJSON(url1, function(result) {
		$.each(result, function(i, field) {
			// lay ra toan bo thong tin ho khau;
			$("#id_lao_thong_tin").val(field.ID_LAO_THONG_TIN);
			$("#ngayghinhan_lao").val(field.NGAY_GHI_NHAN);
			$("#dtcks_lao").val(field.SO_PHIEU_DTCKS);
			$("#ngayvexa_lao").val(field.NGAY_VE_XA_DIEU_TRI);
			$("#phanloai_lao").val(field.ID_PHAN_LOAI);
			$("#ketqua_lao").val(field.ID_KET_QUA);
			$("#ghichu_lao").val(field.GHI_CHU);
			$("#ngaykhoibenh_lao").val(field.NGAY_KHOI_BENH);
			$("#khang_thuoc_lao").val(field.ID_LAO_KHANG_THUOC);
			$("#ly_do_lao").val(field.ID_LY_DO);
			if ($("#id_lao_thong_tin").val() == '') {
				modeg_lao = 0;
				$("#deleteLao").removeClass("button_shadow");
				$("#deleteLao").prop('hidden', true);
			} else {
				modeg_lao = 1;
				$("#deleteLao").addClass("button_shadow");
				$("#deleteLao").prop('hidden', false);
			}
			enableNgaykhoibenh();
		});
	});
}
$("#lao").click(function() {
	if ($("#idtiepnhan").val() == '') {
		jAlert("Mã lần khám không tồn tại !", 'Thông báo');
		return;
	}
	if ($("#mayte").val() == '') {
		jAlert("Mã bệnh nhân không tồn tại!", 'Thông báo');
		return;
	}
	gandulieulao($("#idtiepnhan").val(), $("#mayte").val(), dvtt);
	lao_dialog.dialog("open");
});

function checkdulieuLao() {
	checkRequired_lao = 0;
	if ($("#ngayghinhan_lao").val() == ''
			|| $("#ngayghinhan_lao").val() == null) {
		checkRequired_lao = 1;
		jAlert("Ngày xét nghiệm không được để trống !", 'Thông báo');
		$("#ngayghinhan_lao").focus();
		return;
	}
	if ($("#ngayvexa_lao").val() == '' || $("#ngayvexa_lao").val() == null) {
		checkRequired_lao = 1;
		jAlert("Ngày về xã điều trị không được để trống !", 'Thông báo');
		$("#ngayvexa_lao").focus();
		return;
	}
	if ($("#ketqua_lao").val() == '' || $("#ketqua_lao").val() == null) {
		checkRequired_lao = 1;
		jAlert("Kết quả không được để trống !", 'Thông báo');
		$("#ketqua_lao").focus();
		return;
	}
}
function enableNgaykhoibenh() {
	if ($('#ketqua_lao').val() == 1 || $('#ketqua_lao').val() == 2) {
		$("#ngaykhoibenh_lao").datepicker().datepicker('enable');
	} else {
		$("#ngaykhoibenh_lao").datepicker().datepicker('disable');
		$('#ngaykhoibenh_lao').datepicker().val("");
	}
}
