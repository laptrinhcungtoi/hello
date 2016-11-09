var modeg_khhgd = -1; // -1: Jbox tat; 0: Jbox them; 1: Jbox sua du lieu;
var checkRequired_khhgd = 0;
var flagTaibien_khhgd = -1;
var checkRequiredTB_khhgd = 0;
var nghiepvu  = 'ngoaitru_toathuockhhgd';
$(function() {

	$("#dtngaykhhgt").datepicker();
	$("#dtngaykhhgt").datepicker("option", "dateFormat", "dd/mm/yy");

	$("#dtNgayTBKHHGD").datepicker();
	$("#dtNgayTBKHHGD").datepicker("option", "dateFormat", "dd/mm/yy");

	var dlgCfDeleteKHHGD = new jBox('Modal', {
		title : 'Xác nhận xóa thông tin KHHGD',
		overlay : true,
		closeOnClick : true,
		content : $('#dlgCfDeleteKHHGD'),
		draggable : 'title',
		position : {
			my : "center top",
			at : "center top",
			of : window
		}
	});

	var dlgCfDeleteTBKHHGD = new jBox('Modal', {
		title : 'Xác nhận xóa thông tin tai biến',
		overlay : true,
		closeOnClick : true,
		content : $('#dlgCfDeleteTBKHHGD'),
		draggable : 'title',
		position : {
			my : "center top",
			at : "center top",
			of : window
		}
	});

	khhgd_dialog = $("#qlKHHGD").dialog({
		autoOpen : false,
		resizable : true,
		width : 800,
		position : {
			my : "center top",
			at : "center top",
			of : window
		}
	});
    $("#btnDonThuoctheobenh").click(function() {
    	matoathuocbenh = $("#id_khhgd_thong_tin").val();
    	var url = 'chitiettoathuoctheobenh?matt=' + matoathuocbenh + "&nghiepvu=" + nghiepvu + "&dvtt=" + dvtt_benh;
        $("#list_thuocbhyt_benh").jqGrid('setGridParam', {datatype: 'json', url: url}).trigger('reloadGrid');
    	dontuoc_dialog_benh.dialog("open");
    });

	$("#addTBKHHGD").click(function() {
		flagTaibien_khhgd = 0;
		$("#dtNgayTBKHHGD").val('');
		$("#cboTaibienKHHGD").val('');
		$("#cboTinhtrangKHHGD").val('');
		checkButtonTBKHHGD();
	});
	$("#editTBKHHGD").click(function() {
		if ($("#id_khhgd_tai_bien").val() == '') {
			jAlert("Chưa chọn bản ghi cần sửa !", 'Thông báo');
		} else {
			flagTaibien_khhgd = 1;
			checkButtonTBKHHGD();
		}
	});
	$("#deleteTBKHHGD").click(function() {
		if ($("#id_khhgd_tai_bien").val() == '') {
			jAlert("Chưa chọn bản ghi cần xóa !", 'Thông báo');
		} else {
			dlgCfDeleteTBKHHGD.open();
		}
	});
	$("#dlgCance_khhgd_tb").click(function() {
		dlgCfDeleteTBKHHGD.close();
	});

	$("#dlgSubmit_khhgd_tb").click(
			function(evt) {
				var str = [ $("#id_khhgd_tai_bien").val() ];
				url = "xoataibienKHHGD";
				$.post(url, {
					url : convertArray(str)
				}).done(
						function(data) {
							if (data != "-1") {
								jAlert("Xóa thành công!", 'Thông báo');
								dlgCfDeleteTBKHHGD.close();
								$("#listTBKHHGD").jqGrid(
										'setGridParam',
										{
											url : 'danhsachtaibienKHHGD?idpt='
													+ $("#id_khhgd_thong_tin")
															.val(),
											datatype : 'json'
										}).trigger('reloadGrid');
								$("#dtNgayTBKHHGD").val('');
								$("#cboTaibienKHHGD").val('');
								$("#cboTinhtrangKHHGD").val('');
								flagTaibien_khhgd = -1;
								checkButtonTBKHHGD();
							} else {
								jAlert("Lỗi xóa tai biến!", 'Thông báo');
								dlgCfDeleteTBKHHGD.close();
							}
						});
			});

	$("#cancelTBKHHGD").click(function() {
		flagTaibien_khhgd = -1;
		checkButtonTBKHHGD();
	});

	$("#exitKHHGD").click(function() {
		khhgd_dialog.dialog("close");
	});

	$("#deleteKHHGD").click(function() {
		dlgCfDeleteKHHGD.open();
	});

	$("#dlgCance_KHHGD").click(function() {
		dlgCfDeleteKHHGD.close();
	});

	$("#dlgSubmit_KHHGD").click(function(evt) {
		var str = [ $("#id_khhgd_thong_tin").val() ];
		url = "xoaKHHGD";
		$.post(url, {
			url : convertArray(str)
		}).done(function(data) {
			if (data != "-1") {
				jAlert("Xóa thành công!", 'Thông báo');
				dlgCfDeleteKHHGD.close();
				khhgd_dialog.dialog("close");
			} else {
				jAlert("Lỗi xóa thông tin!", 'Thông báo');
			}
		});
	});
	$("#saveTBKHHGD")
			.click(
					function() {
						checkdulieuTBKHHGD();
						if (checkRequiredTB_khhgd == 0) {
							var ID_KHHGD_TAI_BIEN = $("#id_khhgd_tai_bien").val();
							var ID_KHHGD_THONG_TIN = $("#id_khhgd_thong_tin")
									.val();
							var ID_LOAI_TAI_BIEN = $("#cboTaibienKHHGD").val();
							var NGAY = $("#dtNgayTBKHHGD").val();
							var TINH_TRANG = $("#cboTinhtrangKHHGD").val();
							var str = [ ID_KHHGD_TAI_BIEN, ID_KHHGD_THONG_TIN,
									ID_LOAI_TAI_BIEN, NGAY, TINH_TRANG ];
							if (flagTaibien_khhgd == 0) {
								url = "themchitiettaibienKHHGD";
								$
										.post(url, {
											url : convertArray(str)
										})
										.done(
												function(data) {
													if (data != "-1") {
														jAlert(
																"Thêm thành công!",
																'Thông báo');
														flagTaibien_khhgd = -1;
														$("#listTBKHHGD")
																.jqGrid(
																		'setGridParam',
																		{
																			url : 'danhsachtaibienKHHGD?idpt='
																					+ $(
																							"#id_khhgd_thong_tin")
																							.val(),
																			datatype : 'json'
																		})
																.trigger(
																		'reloadGrid');
														checkButtonTBKHHGD();
														// phathai_dialog
														// .dialog("close");
													} else {
														jAlert(
																"Lỗi thêm chi tiết tai biến !",
																'Thông báo');
													}
												});
							} else {
								url = "suachitiettaibienKHHGD";
								$
										.post(url, {
											url : convertArray(str)
										})
										.done(
												function(data) {
													if (data == "1") {
														jAlert(
																"Sửa thành công!",
																'Thông báo');
														flagTaibien_khhgd = -1;
														$("#listTBKHHGD")
																.jqGrid(
																		'setGridParam',
																		{
																			url : 'danhsachtaibienKHHGD?idpt='
																					+ $(
																							"#id_khhgd_thong_tin")
																							.val(),
																			datatype : 'json'
																		})
																.trigger(
																		'reloadGrid');
														checkButtonTBKHHGD();
														// phathai_dialog
														// .dialog("close");
													} else {
														jAlert(
																"Lỗi sửa chi tiết tai biến !",
																'Thông báo');
													}
												});
							}
						}
					});
	$("#saveKHHGD")
			.click(
					function() {
						checkdulieuKHHGD();
						if (checkRequired_khhgd == 0) {
							var ID_KHHGD_THONG_TIN = $("#id_khhgd_thong_tin")
									.val();
							var NGAY = $("#dtngaykhhgt").val();
							var NGUOI_THUC_HIEN = $("#txtnthkhhgd").val();
							var MA_BENH_NHAN = $("#ma_benh_nhan_khhgd").val();
							var ID_PP_KHHGD = $("#cboPPKHHGD").val();
							var ID_DON_VI = $("#id_don_vi_khhgd").val();
							var ID_TRINH_DO_CM = $("#cboTDKHHGD").val();
							var DVTT = $("#id_don_vi_khhgd").val();
							var ID_TIEPNHAN = $("#id_tiep_nhan_khhgd").val();
							var GHI_CHU = $("#khhgdGhiChu").val();

							var str = [ ID_KHHGD_THONG_TIN, NGAY,
									NGUOI_THUC_HIEN, MA_BENH_NHAN, ID_PP_KHHGD,
									ID_DON_VI, ID_TRINH_DO_CM, DVTT,
									GHI_CHU,ID_TIEPNHAN];
							if (modeg_khhgd == 0) {
								url = "themchitietKHHGD";
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
														$("#divTBKHHGD")
																.prop('hidden',
																		false);
														modeg_khhgd = 1;
														$("#id_khhgd_thong_tin")
																.val(data);
														$("#listTBKHHGD")
																.jqGrid(
																		'setGridParam',
																		{
																			url : 'danhsachtaibienKHHGD?idpt='
																					+ $(
																							"#id_khhgd_thong_tin")
																							.val(),
																			datatype : 'json'
																		})
																.trigger(
																		'reloadGrid');
														flagTaibien_khhgd = -1;
														$("#deleteKHHGD").addClass("button_shadow");
														$("#deleteKHHGD").prop('hidden', false);
														$("#btnDonThuoctheobenh").addClass("button_shadow");
														$("#btnDonThuoctheobenh").prop('hidden', false);
														checkButtonTBKHHGD();
														$("#dtNgayTBKHHGD").val('');
														$("#cboTaibienKHHGD")
																.val('');
														$("#cboTinhtrangKHHGD").val(
																'');
													} else {
														jAlert(
																"Lỗi thêm chi tiết KHHGĐ !",
																'Thông báo');
													}
												});
							} else {
								url = "suachitietKHHGD";
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
														// phathai_dialog
														// .dialog("close");
													} else {
														jAlert(
																"Lỗi sửa chi tiết khhgd !",
																'Thông báo');
													}
												});
							}
						}
					});

	$("#listTBKHHGD").jqGrid(
			{
				//url : 'danhsachtaibienKHHGD?idpt=' + $("#id_khhgd_thong_tin").val(),
				//url: 'danhsach',
				datatype : "local",
				// width : auto,
				colNames : [ "ID_KHHGD_TAI_BIEN", "ID_KHHGD_THONG_TIN",
						"ID_LOAI_TAI_BIEN", "Ngày", "Tình trạng", "Tai biến",
						"TINH_TRANG" ],
				colModel : [ {
					name : 'ID_KHHGD_TAI_BIEN',
					index : 'ID_KHHGD_TAI_BIEN',
					width : 0,
					hidden : true
				}, {
					name : 'ID_KHHGD_THONG_TIN',
					index : 'ID_KHHGD_THONG_TIN',
					width : 0,
					hidden : true
				}, {
					name : 'ID_LOAI_TAI_BIEN',
					index : 'ID_LOAI_TAI_BIEN',
					width : 0,
					hidden : true
				}, {
					name : 'NGAY',
					index : 'NGAY',
					width : 200
				}, {
					name : 'TINH_TRANG_VIEW',
					index : 'TINH_TRANG_VIEW',
					width : 300
				}, {
					name : 'KHHGD_LOAI_TAI_BIEN_VIEW',
					index : 'KHHGD_LOAI_TAI_BIEN_VIEW',
					width : 200

				}, {
					name : 'TINH_TRANG',
					index : 'TINH_TRANG',
					width : 0,
					hidden : true
				} ],
				// rowNum : 20,
				// rowList : [ 10, 20, 50 ],
				autowidth : true,
				rownumbers : true,
				pager : '#pager4',
				gridview : true,
				viewrecords : true,
				loadonce : false,
				onSelectRow : function(id) {
					if (id) {
						var ret = $("#listTBKHHGD").jqGrid('getRowData', id);
						if (flagTaibien_khhgd == -1) {
							$("#id_khhgd_tai_bien").val(ret.ID_KHHGD_TAI_BIEN);
							$("#dtNgayTBKHHGD").val(ret.NGAY);
							$("#cboTaibienKHHGD").val(ret.ID_LOAI_TAI_BIEN);
							$("#cboTinhtrangKHHGD").val(ret.TINH_TRANG);
						}
					}
				},
				ondblClickRow : function(id) {
					var ret = $("#listTBKHHGD").jqGrid('getRowData', id);
					if (flagTaibien_khhgd == -1) {
						$("#id_khhgd_tai_bien").val(ret.ID_KHHGD_TAI_BIEN);
						$("#dtNgayTBKHHGD").val(ret.NGAY);
						$("#cboTaibienKHHGD").val(ret.ID_LOAI_TAI_BIEN);
						$("#cboTinhtrangKHHGD").val(ret.TINH_TRANG);
						flagTaibien_khhgd = 1;
						checkButtonTBKHHGD();
					}
				}
			});
});

function gandulieuKHHGD(id_tiep_nhan, ma_benh_nhan, id_don_vi) {
	$("#id_tiep_nhan_khhgd").val(id_tiep_nhan);
	$("#ma_benh_nhan_khhgd").val(ma_benh_nhan);
	// $("#ma_benh_nhan_pt").val(10);
	$("#id_don_vi_khhgd").val(id_don_vi);
	var arr = [ id_tiep_nhan,id_don_vi, "0" ];
	var url1 = "chitietKHHGD?url=" + convertArray(arr);
	$.getJSON(url1, function(result) {
		$.each(result, function(i, field) {
			// lay ra toan bo thong tin ho khau;
			$("#id_khhgd_thong_tin").val(field.ID_KHHGD_THONG_TIN);
			$("#dtngaykhhgt").val(field.NGAY);
			$("#txtnthkhhgd").val(field.NGUOI_THUC_HIEN);
			$("#cboPPKHHGD").val(field.ID_PP_KHHGD);
			$("#cboTDKHHGD").val(field.ID_TRINH_DO_CM);
			$("#khhgdGhiChu").val(field.GHI_CHU);
			if ($("#id_khhgd_thong_tin").val() == '') {
				modeg_khhgd = 0;
				$("#deleteKHHGD").removeClass("button_shadow");
				$("#deleteKHHGD").prop('hidden', true);
				$("#btnDonThuoctheobenh").removeClass("button_shadow");
				$("#btnDonThuoctheobenh").prop('hidden', true);
				$("#divTBKHHGD").prop('hidden', true);
			} else {
				modeg_khhgd = 1;
				$("#deleteKHHGD").addClass("button_shadow");
				$("#deleteKHHGD").prop('hidden', false);
				$("#btnDonThuoctheobenh").addClass("button_shadow");
				$("#btnDonThuoctheobenh").prop('hidden', false);
				$("#divTBKHHGD").prop('hidden', false);

				$("#listTBKHHGD").jqGrid(
						'setGridParam',
						{
							url : 'danhsachtaibienKHHGD?idpt='
									+ $("#id_khhgd_thong_tin").val(),
							datatype : 'json'
						}).trigger('reloadGrid');
				$("#dtNgayTBKHHGD").val('');
				$("#cboTaibienKHHGD").val('');
				$("#cboTinhtrangKHHGD").val('');
				flagTaibien_khhgd = -1;
				checkButtonTBKHHGD();
			}
		});
	});
}
$("#KHHGD").click(function() {
	if ($("#idtiepnhan").val() == '') {
		jAlert("Mã lần khám không tồn tại !", 'Thông báo');
		return;
	}
	if ($("#mayte").val() == '') {
		jAlert("Mã bệnh nhân không tồn tại!", 'Thông báo');
		return;
	}
	gandulieuKHHGD($("#idtiepnhan").val(), $("#mayte").val(), dvtt);
	khhgd_dialog.dialog("open");
});

function checkdulieuKHHGD() {
	checkRequired_khhgd = 0;
	if ($("#dtngaykhhgt").val() == '') {
		checkRequired_khhgd = 1;
		jAlert("Ngày kế hoạch không được để trống !", 'Thông báo');
		$("#dtngaykhhgt").focus();
		return;
	}
	if ($("#cboPPKHHGD").val() == '') {
		checkRequired_khhgd = 1;
		jAlert("Phương pháp bắt buộc phải chọn !", 'Thông báo');
		return;
	}

	if ($("#cboTDKHHGD").val() == '') {
		checkRequired_khhgd = 1;
		jAlert("Trình độ bắt buộc phải chọn !", 'Thông báo');
		return;
	}
}
function checkButtonTBKHHGD() {
	if (flagTaibien_khhgd == -1) {
		$("#addTBKHHGD").addClass("button_shadow");
		$("#addTBKHHGD").prop('hidden', false);
		$("#editTBKHHGD").addClass("button_shadow");
		$("#editTBKHHGD").prop('hidden', false);
		$("#deleteTBKHHGD").addClass("button_shadow");
		$("#deleteTBKHHGD").prop('hidden', false);
		$("#saveTBKHHGD").removeClass("button_shadow");
		$("#saveTBKHHGD").prop('hidden', true);
		$("#cancelTBKHHGD").removeClass("button_shadow");
		$("#cancelTBKHHGD").prop('hidden', true);
		$("#dtNgayTBKHHGD").prop('disabled', true);
		$("#cboTaibienKHHGD").prop('disabled', true);
		$("#cboTinhtrangKHHGD").prop('disabled', true);
	}
	if (flagTaibien_khhgd == 0 || flagTaibien_khhgd == 1) {
		$("#addTBKHHGD").removeClass("button_shadow");
		$("#addTBKHHGD").prop('hidden', true);
		$("#editTBKHHGD").removeClass("button_shadow");
		$("#editTBKHHGD").prop('hidden', true);
		$("#deleteTBKHHGD").removeClass("button_shadow");
		$("#deleteTBKHHGD").prop('hidden', true);
		$("#saveTBKHHGD").addClass("button_shadow");
		$("#saveTBKHHGD").prop('hidden', false);
		$("#cancelTBKHHGD").addClass("button_shadow");
		$("#cancelTBKHHGD").prop('hidden', false);
		$("#dtNgayTBKHHGD").prop('disabled', false);
		$("#cboTaibienKHHGD").prop('disabled', false);
		$("#cboTinhtrangKHHGD").prop('disabled', false);
	}
}
function checkdulieuTBKHHGD() {
	checkRequiredTB_khhgd = 0;
	if ($("#dtNgayTBKHHGD").val() == '') {
		checkRequiredTB_khhgd = 1;
		jAlert("Ngày xảy ra tai biến không được để trống !", 'Thông báo');
		$("#dtNgayTBKHHGD").focus();
		return;
	}
	if ($("#cboTaibienKHHGD").val() == '') {
		checkRequiredTB_khhgd = 1;
		jAlert("Tai biến không được để trống !", 'Thông báo');
		$("#cboTaibienKHHGD").focus();
		return;
	}
	if ($("#cboTinhtrangKHHGD").val() == '') {
		checkRequiredTB_khhgd = 1;
		jAlert("Tình trạng không được để trống !", 'Thông báo');
		$("#cboTinhtrangKHHGD").focus();
		return;
	}
}
