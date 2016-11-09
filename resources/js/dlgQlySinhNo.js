var modeg_ss = -1; // -1: Jbox tat; 0: Jbox them; 1: Jbox sua du lieu;
var checkRequired_ss = 0;
var flagTaibien_SS = -1;
var checkRequiredTBSS = 0;
var flagXetnghiem_SS = -1;
var checkRequiredXNSS = 0;
var flagChamSoc_SS = -1;
var checkRequiredCSSS = 0;
$(function() {
    $(".validate").keydown(function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode == 67 && e.ctrlKey === true) ||
            (e.keyCode == 88 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

	$("#dtngayde").datepicker();
	$("#dtngayde").datepicker("option", "dateFormat", "dd/mm/yy");
	$("#dtngaytv").datepicker();
	$("#dtngaytv").datepicker("option", "dateFormat", "dd/mm/yy");
	$("#dtNgayTBSS").datepicker();
	$("#dtNgayTBSS").datepicker("option", "dateFormat", "dd/mm/yy");
	$("#dtNgayXNSS").datepicker();
	$("#dtNgayXNSS").datepicker("option", "dateFormat", "dd/mm/yy");
	$("#dtnkcsss").datepicker();
	$("#dtnkcsss").datepicker("option", "dateFormat", "dd/mm/yy");

	var dlgCfDeleteSS = new jBox('Modal', {
		title : 'Xác nhận xóa thông tin sinh nở',
		overlay : true,
		closeOnClick : true,
		content : $('#dlgCfDeleteSS'),
		draggable : 'title',
		position : {
			my : "center top",
			at : "center top",
			of : window
		}
	});

	var sinhno_tai_bien_dialog = new jBox('Modal', {
		title : 'Thông tin tai biến sinh nở',
		overlay : true,
		modal : true,
		closeOnEsc : false,
		closeButton : 'title',
		closeOnClick : false,
		// width : 950,
		content : $('#divTBSS'),
		draggable : 'title',
		position : {
			my : "center top",
			at : "center top",
			of : window
		}
	});

	var sinhno_xet_nghiem_dialog = new jBox('Modal', {
		title : 'Thông tin xét nghiệm sinh nở',
		overlay : true,
		modal : true,
		closeOnEsc : false,
		closeButton : 'title',
		closeOnClick : false,
		// width : 950,
		content : $('#divXNSS'),
		draggable : 'title',
		position : {
			my : "center top",
			at : "center top",
			of : window
		}
	});

	var sinhno_cham_soc_dialog = new jBox('Modal', {
		title : 'Thông tin chăm sóc sau sinh nở',
		overlay : true,
		modal : true,
		closeOnEsc : false,
		closeButton : 'title',
		closeOnClick : false,
		// width : 950,
		content : $('#divCSSS'),
		draggable : 'title',
		position : {
			my : "center top",
			at : "center top",
			of : window
		}
	});

	$("#btnTBSS").click(function() {
		$("#listTBSS").jqGrid('setGridParam', {
			url : 'danhsachtaibiensinhsan?idss=' + $("#id_sn_thong_tin").val(),
			datatype : 'json'
		}).trigger('reloadGrid');
		$("#dtNgayTBSS").val('');
		$("#cboTaibienSS").val('');
		$("#cboTinhtrangSS").val('');
		flagTaibien_SS = -1;
		checkButtonTBSS();
		sinhno_tai_bien_dialog.open();
	});

	$("#btnXNSS").click(
			function() {
				$("#listXNSS").jqGrid(
						'setGridParam',
						{
							url : 'danhsachxetnghiemsinhsan?idss='
									+ $("#id_sn_thong_tin").val(),
							datatype : 'json'
						}).trigger('reloadGrid');
				$("#dtNgayXNSS").val('');
				$("#cboKQXNSS").val('');
				$("#cboTXNSS").val('');
				flagXetnghiem_SS = -1;
				checkButtonXNSS();
				sinhno_xet_nghiem_dialog.open();
			});

	$("#btnCSSS").click(function() {
		$("#listCSSS").jqGrid('setGridParam', {
			url : 'danhsachchamsocsinhsan?idss=' + $("#id_sn_thong_tin").val(),
			datatype : 'json'
		}).trigger('reloadGrid');
		$("#nblkcsss").val('');
		$("#dtnkcsss").val('');
		$("#txtttmcsss").val('');
		$("#txtttccsss").val('');
		$("#txtmcsss").val('');
		$("#txtndcsss").val('');
		$("#txthacsss").val('');
		$("#txtntcsss").val('');
		$("#txtvcsss").val('');
		$("#txtsdcsss").val('');
		$("#txttccsss").val('');
		$("#txttsmcsss").val('');
		$("#txttvcsss").val('');
		$("#cboncscsss").val('');
		flagChamSoc_SS = -1;
		checkButtonCSSS();
		sinhno_cham_soc_dialog.open();
	});

	var dlgCfDeleteTBSS = new jBox('Modal', {
		title : 'Xác nhận xóa thông tin tai biến',
		overlay : true,
		closeOnClick : true,
		content : $('#dlgCfDeleteSSTB'),
		draggable : 'title',
		position : {
			my : "center top",
			at : "center top",
			of : window
		}
	});

	var dlgCfDeleteXNSS = new jBox('Modal', {
		title : 'Xác nhận xóa thông tin Xét nghiệm',
		overlay : true,
		closeOnClick : true,
		content : $('#dlgCfDeleteSSXN'),
		draggable : 'title',
		position : {
			my : "center top",
			at : "center top",
			of : window
		}
	});

	var dlgCfDeleteSSCS = new jBox('Modal', {
		title : 'Xác nhận xóa thông tin Chăm sóc',
		overlay : true,
		closeOnClick : true,
		content : $('#dlgCfDeleteSSCS'),
		draggable : 'title',
		position : {
			my : "center top",
			at : "center top",
			of : window
		}
	});

	sinhno_dialog = $("#qlSinhNo").dialog({
		autoOpen : false,
		resizable : true,
		overlay : true,
//		modal : true,
		closeOnEsc : false,
		width : 950,
		position : {
			my : "center top",
			at : "center top",
			of : window
		}
	});

	$("#addTBSS").click(function() {
		flagTaibien_SS = 0;
		$("#dtNgayTBSS").val('');
		$("#cboTaibienSS").val('');
		$("#cboTinhtrangSS").val('');
		checkButtonTBSS();
	});

	$("#addXNSS").click(function() {
		flagXetnghiem_SS = 0;
		$("#dtNgayXNSS").val('');
		$("#cboKQXNSS").val('');
		$("#cboTXNSS").val('');
		checkButtonXNSS();
	});

	$("#addCSSS").click(function() {
		flagChamSoc_SS = 0;
		$("#nblkcsss").val('');
		$("#dtnkcsss").val('');
		$("#txtttmcsss").val('');
		$("#txtttccsss").val('');
		$("#txtmcsss").val('');
		$("#txtndcsss").val('');
		$("#txthacsss").val('');
		$("#txtntcsss").val('');
		$("#txtvcsss").val('');
		$("#txtsdcsss").val('');
		$("#txttccsss").val('');
		$("#txttsmcsss").val('');
		$("#txttvcsss").val('');
		$("#cboncscsss").val('');
		checkButtonCSSS();
	});

	$("#editTBSS").click(function() {
		if ($("#id_sn_tai_bien").val() == '') {
			jAlert("Chưa chọn bản ghi cần sửa !", 'Thông báo');
		} else {
			flagTaibien_SS = 1;
			checkButtonTBSS();
		}
	});

	$("#editXNSS").click(function() {
		if ($("#id_sn_xet_nghiem").val() == '') {
			jAlert("Chưa chọn bản ghi cần sửa !", 'Thông báo');
		} else {
			flagXetnghiem_SS = 1;
			checkButtonXNSS();
		}
	});

	$("#editCSSS").click(function() {
		if ($("#id_sn_csss").val() == '') {
			jAlert("Chưa chọn bản ghi cần sửa !", 'Thông báo');
		} else {
			flagChamSoc_SS = 1;
			checkButtonCSSS();
		}
	});

	$("#deleteTBSS").click(function() {
		if ($("#id_sn_tai_bien").val() == '') {
			jAlert("Chưa chọn bản ghi cần xóa !", 'Thông báo');
		} else {
			dlgCfDeleteTBSS.open();
		}
	});

	$("#deleteXNSS").click(function() {
		if ($("#id_sn_xet_nghiem").val() == '') {
			jAlert("Chưa chọn bản ghi cần xóa !", 'Thông báo');
		} else {
			dlgCfDeleteXNSS.open();
		}
	});

	$("#deleteCSSS").click(function() {
		if ($("#id_sn_csss").val() == '') {
			jAlert("Chưa chọn bản ghi cần xóa !", 'Thông báo');
		} else {
			dlgCfDeleteSSCS.open();
		}
	});

	$("#dlgCance_ss_tb").click(function() {
		dlgCfDeleteTBSS.close();
	});

	$("#dlgCance_ss_xn").click(function() {
		dlgCfDeleteXNSS.close();
	});

	$("#dlgCance_ss_cs").click(function() {
		dlgCfDeleteSSCS.close();
	});

	$("#dlgSubmit_ss_tb")
			.click(
					function(evt) {
						var str = [ $("#id_sn_tai_bien").val() ];
						url = "xoataibiensinhsan";
						$
								.post(url, {
									url : convertArray(str)
								})
								.done(
										function(data) {
											if (data != "-1") {
												jAlert("Xóa thành công!",
														'Thông báo');
												dlgCfDeleteTBSS.close();
												$("#listTBSS")
														.jqGrid(
																'setGridParam',
																{
																	url : 'danhsachtaibiensinhsan?idss='
																			+ $(
																					"#id_sn_thong_tin")
																					.val(),
																	datatype : 'json'
																}).trigger(
																'reloadGrid');
												$("#dtNgayTBSS").val('');
												$("#cboTaibienSS").val('');
												$("#cboTinhtrangSS").val('');
												flagTaibien_SS = -1;
												checkButtonTBSS();
											} else {
												jAlert("Lỗi xóa tai biến!",
														'Thông báo');
												dlgCfDeleteTBSS.close();
											}
										});
					});

	$("#dlgSubmit_ss_xn")
			.click(
					function(evt) {
						var str = [ $("#id_sn_xet_nghiem").val() ];
						url = "xoaxetnghiemsinhsan";
						$
								.post(url, {
									url : convertArray(str)
								})
								.done(
										function(data) {
											if (data != "-1") {
												jAlert("Xóa thành công!",
														'Thông báo');
												dlgCfDeleteXNSS.close();
												$("#listXNSS")
														.jqGrid(
																'setGridParam',
																{
																	url : 'danhsachxetnghiemsinhsan?idss='
																			+ $(
																					"#id_sn_thong_tin")
																					.val(),
																	datatype : 'json'
																}).trigger(
																'reloadGrid');
												$("#dtNgayXNSS").val('');
												$("#cboKQXNSS").val('');
												$("#cboTXNSS").val('');
												flagXetnghiem_SS = -1;
												checkButtonXNSS();
											} else {
												jAlert("Lỗi xóa xét nghiệm!",
														'Thông báo');
												dlgCfDeleteXNSS.close();
											}
										});
					});

	$("#dlgSubmit_ss_cs")
			.click(
					function(evt) {
						var str = [ $("#id_sn_csss").val() ];
						url = "xoachamsocsinhsan";
						$
								.post(url, {
									url : convertArray(str)
								})
								.done(
										function(data) {
											if (data != "-1") {
												jAlert("Xóa thành công!",
														'Thông báo');
												dlgCfDeleteSSCS.close();
												$("#listCSSS")
														.jqGrid(
																'setGridParam',
																{
																	url : 'danhsachchamsocsinhsan?idss='
																			+ $(
																					"#id_sn_thong_tin")
																					.val(),
																	datatype : 'json'
																}).trigger(
																'reloadGrid');
												$("#nblkcsss").val('');
												$("#dtnkcsss").val('');
												$("#txtttmcsss").val('');
												$("#txtttccsss").val('');
												$("#txtmcsss").val('');
												$("#txtndcsss").val('');
												$("#txthacsss").val('');
												$("#txtntcsss").val('');
												$("#txtvcsss").val('');
												$("#txtsdcsss").val('');
												$("#txttccsss").val('');
												$("#txttsmcsss").val('');
												$("#txttvcsss").val('');
												$("#cboncscsss").val('');
												flagChamSoc_SS = -1;
												checkButtonCSSS();
											} else {
												jAlert("Lỗi xóa chăm sóc!",
														'Thông báo');
												dlgCfDeleteSSCS.close();
											}
										});
					});

	$("#cancelTBSS").click(function() {
		flagTaibien_SS = -1;
		checkButtonTBSS();
	});

	$("#cancelXNSS").click(function() {
		flagXetnghiem_SS = -1;
		checkButtonXNSS();
	});

	$("#cancelCSSS").click(function() {
		flagChamSoc_SS = -1;
		checkButtonCSSS();
	});

	$("#exitSS").click(function() {
		sinhno_dialog.dialog("close");
	});

	$("#deleteSS").click(function() {
		dlgCfDeleteSS.open();
	});

	$("#dlgCance_ss").click(function() {
		dlgCfDeleteSS.close();
	});

	$("#dlgSubmit_ss").click(function(evt) {
		var str = [ $("#id_sn_thong_tin").val() ];
		url = "xoasinhno";
		$.post(url, {
			url : convertArray(str)
		}).done(function(data) {
			if (data != "-1") {
				jAlert("Xóa thành công!", 'Thông báo');
				dlgCfDeleteSS.close();
				sinhno_dialog.dialog("close");
			} else {
				jAlert("Lỗi xóa thông tin!", 'Thông báo');
			}
		});
	});
	$("#saveTBSS")
			.click(
					function() {
						checkdulieuTBSS();
						if (checkRequiredTBSS == 0) {
							var ID_SS_TAI_BIEN = $("#id_sn_tai_bien").val();
							var NGAY = $("#dtNgayTBSS").val();
							var ID_SS_LOAI_TAI_BIEN = $("#cboTaibienSS").val();
							var ID_SS_THONG_TIN = $("#id_sn_thong_tin").val();
							var TINH_TRANG = $("#cboTinhtrangSS").val();
							var str = [ ID_SS_TAI_BIEN, NGAY,
									ID_SS_LOAI_TAI_BIEN, ID_SS_THONG_TIN,
									TINH_TRANG ];
							if (flagTaibien_SS == 0) {
								url = "themchitiettaibiensinhsan";
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
														flagTaibien_SS = -1;
														$("#listTBSS")
																.jqGrid(
																		'setGridParam',
																		{
																			url : 'danhsachtaibiensinhsan?idss='
																					+ $(
																							"#id_sn_thong_tin")
																							.val(),
																			datatype : 'json'
																		})
																.trigger(
																		'reloadGrid');
														checkButtonTBSS();
													} else {
														jAlert(
																"Lỗi thêm chi tiết tai biến !",
																'Thông báo');
													}
												});
							} else {
								url = "suachitiettaibiensinhsan";
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
														flagTaibien_SS = -1;
														$("#listTBSS")
																.jqGrid(
																		'setGridParam',
																		{
																			url : 'danhsachtaibiensinhsan?idss='
																					+ $(
																							"#id_sn_thong_tin")
																							.val(),
																			datatype : 'json'
																		})
																.trigger(
																		'reloadGrid');
														checkButtonTBSS();
													} else {
														jAlert(
																"Lỗi sửa chi tiết tai biến !",
																'Thông báo');
													}
												});
							}
						}
					});
	$("#saveXNSS")
			.click(
					function() {
						checkdulieuXNSS();
						if (checkRequiredXNSS == 0) {
							var ID_SS_XET_NGHIEM = $("#id_sn_xet_nghiem").val();
							var ID_SS_THONG_TIN = $("#id_sn_thong_tin").val();
							var ID_LOAI_XET_NGHIEM = $("#cboTXNSS").val();
							var KET_QUA = $("#cboKQXNSS").val();
							var NGAY = $("#dtNgayXNSS").val();
							var str = [ ID_SS_XET_NGHIEM, ID_SS_THONG_TIN,
									ID_LOAI_XET_NGHIEM, KET_QUA, NGAY ];
							if (flagXetnghiem_SS == 0) {
								url = "themchitietxetnghiemsinhsan";
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
														flagXetnghiem_SS = -1;
														$("#listXNSS")
																.jqGrid(
																		'setGridParam',
																		{
																			url : 'danhsachxetnghiemsinhsan?idss='
																					+ $(
																							"#id_sn_thong_tin")
																							.val(),
																			datatype : 'json'
																		})
																.trigger(
																		'reloadGrid');
														checkButtonXNSS();
													} else {
														jAlert(
																"Lỗi thêm chi tiết xét nghiệm !",
																'Thông báo');
													}
												});
							} else {
								url = "suachitietxetnghiemsinhsan";
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
														flagXetnghiem_SS = -1;
														$("#listXNSS")
																.jqGrid(
																		'setGridParam',
																		{
																			url : 'danhsachxetnghiemsinhsan?idss='
																					+ $(
																							"#id_sn_thong_tin")
																							.val(),
																			datatype : 'json'
																		})
																.trigger(
																		'reloadGrid');
														checkButtonXNSS();
													} else {
														jAlert(
																"Lỗi sửa chi tiết xét nghiệm !",
																'Thông báo');
													}
												});
							}
						}
					});

	$("#saveCSSS")
			.click(
					function() {
						checkdulieuCSSS();
						if (checkRequiredCSSS == 0) {
							var LAN_KHAM = $("#nblkcsss").val();
							var ID_SS_CSSS = $("#id_sn_csss").val();
							var NGAY_KHAM = $("#dtnkcsss").val();
							var TINH_TRANG_ME = $("#txtttmcsss").val();
							var TINH_TRANG_CON = $("#txtttccsss").val();
							var MACH = $("#txtmcsss").val();
							var NHIET_DO = $("#txtndcsss").val();
							var HUYET_AP = $("#txthacsss").val();
							var NHIP_THO = $("#txtntcsss").val();
							var VU = $("#txtvcsss").val();
							var SAN_DICH = $("#txtsdcsss").val();
							var TU_CUNG = $("#txttccsss").val();
							var TANG_SINH_MON = $("#txttsmcsss").val();
							var TU_VAN = $("#txttvcsss").val();
							var ID_NOI_CS = $("#cboncscsss").val();
							var ID_SS_THONG_TIN = $("#id_sn_thong_tin").val();
							
							
							var str = [ LAN_KHAM, ID_SS_CSSS, NGAY_KHAM,
									TINH_TRANG_ME, TINH_TRANG_CON, MACH,
									NHIET_DO, HUYET_AP, NHIP_THO, VU, SAN_DICH,
									TU_CUNG, TANG_SINH_MON, TU_VAN, ID_NOI_CS,
									ID_SS_THONG_TIN ];
							if (flagChamSoc_SS == 0) {
								url = "themchitietchamsocsinhsan";
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
														flagChamSoc_SS = -1;
														$("#listCSSS")
																.jqGrid(
																		'setGridParam',
																		{
																			url : 'danhsachchamsocsinhsan?idss='
																					+ $(
																							"#id_sn_thong_tin")
																							.val(),
																			datatype : 'json'
																		})
																.trigger(
																		'reloadGrid');
														checkButtonCSSS();
													} else {
														jAlert(
																"Lỗi thêm chi tiết chăm sóc !",
																'Thông báo');
													}
												});
							} else {
								url = "suachitietchamsocsinhsan";
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
														flagChamSoc_SS = -1;
														$("#listCSSS")
																.jqGrid(
																		'setGridParam',
																		{
																			url : 'danhsachchamsocsinhsan?idss='
																					+ $(
																							"#id_sn_thong_tin")
																							.val(),
																			datatype : 'json'
																		})
																.trigger(
																		'reloadGrid');
														checkButtonCSSS();
													} else {
														jAlert(
																"Lỗi sửa chi tiết chăm sóc !",
																'Thông báo');
													}
												});
							}
						}
					});

	$("#saveSS")
			.click(
					function() {
						checkdulieuSS();
						if ($('#dtngaytv').val() != "") {
							var startDate = $("#dtngayde").datepicker(
									'getDate');
							var endDate = $("#dtngaytv").datepicker(
									'getDate');

							if (startDate > endDate)

								return jAlert(
										"Ngày tử vong lớn hơn hoặc bằng ngày sinh",
										"Thông báo");
						}

						if (checkRequired_ss == 0) {
							var ID_SS_THONG_TIN = $("#id_sn_thong_tin").val();
							var NGAY_DE = $("#dtngayde").val();
							var SL_DE_DU_THANG = $("#nbslddt").val();
							var SL_DE_NON = $("#nbsldn").val();
							var SL_SAY_PHA_THAI = $("#nbslspt").val();
							var SL_CON = $("#nbschcttss").val();
							var QUAN_LY_THAI = $("#cboqlthai").val();
							var TIEM_UVDD = $("#cboUVDDqlss").val();
							var TINH_TRANG_TRE = $("#cbotttttss").val();
							var TUAN_THAI = $("#nbtskss").val();
							var CAN_NANG = $("#nbcnttss").val();
							var GIOI_TINH = $("#cbogttss").val();
							var CHI_TIET_TINH_TRANG = $("#tacttt").val();
							var NGUOI_DO = $("#ndttss").val();
							var BU_ME_GIO_DAU = $("#cbombgdttss").val();
							var TIEM_VITAMINK = $("#cbotvtmkttss").val();

							if ($("#cboxdnttss").prop('checked') == true) {
								var DE_NON = 1;
							} else {
								var DE_NON = 0;
							}
							if ($("#cboxnttss").prop('checked') == true) {
								var BI_NGAT = 1;
							} else {
								var BI_NGAT = 0;
							}

							var MA_BENH_NHAN = $("#ma_benh_nhan_sn").val();
							var ID_TIEPNHAN = $("#id_tiep_nhan_sn").val();
							var DVTT = $("#id_don_vi_sn").val();
							var ID_DON_VI = $("#id_don_vi_sn").val();
							var ID_TRINHDO_NGUOIDO = $("#cbotdttss").val();
							var ID_CACH_THUC_DE = $("#cboctdttss").val();
							var ID_SO_LAN_KT = $("#cboSLKT").val();
							var ID_TUVONG_THAINHI = $("#cbotvtnttss").val();
							var ID_NOI_DE = $("#cbondttss").val();
							var VXUV_ME_TIEM = $("#cboVXUVMTSS").val();
							var UVSS = $("#cbomuvssss").val();
							var DUOC_DIEU_TRA = $("#cbodieutrass").val();
							var NGAY_TV = $("#dtngaytv").val();

							var str = [ ID_SS_THONG_TIN, NGAY_DE,
									SL_DE_DU_THANG, SL_DE_NON, SL_SAY_PHA_THAI,
									SL_CON, QUAN_LY_THAI, TIEM_UVDD,
									TINH_TRANG_TRE, TUAN_THAI, CAN_NANG,
									GIOI_TINH, CHI_TIET_TINH_TRANG, NGUOI_DO,
									BU_ME_GIO_DAU, TIEM_VITAMINK, DE_NON,
									BI_NGAT, MA_BENH_NHAN, ID_TIEPNHAN, DVTT,
									ID_DON_VI, ID_TRINHDO_NGUOIDO,
									ID_CACH_THUC_DE, ID_SO_LAN_KT,
									ID_TUVONG_THAINHI, ID_NOI_DE,UVSS,VXUV_ME_TIEM,DUOC_DIEU_TRA,NGAY_TV,'0'];
							if (modeg_ss == 0) {
								url = "themchitietsinhno";
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
														$("#deleteSS")
																.addClass(
																		"button_shadow");
														$("#deleteSS")
																.prop('hidden',
																		false);
														$("#btnCSSS")
																.addClass(
																		"button_shadow");
														$("#btnCSSS")
																.prop('hidden',
																		false);
														$("#btnTBSS")
																.addClass(
																		"button_shadow");
														$("#btnTBSS")
																.prop('hidden',
																		false);
														$("#btnXNSS")
																.addClass(
																		"button_shadow");
														$("#btnXNSS")
																.prop('hidden',
																		false);

														modeg_ss = 1;
														$("#id_sn_thong_tin")
																.val(data);
													} else {
														jAlert(
																"Lỗi thêm chi tiết sinh nở !",
																'Thông báo');
													}
												});
							} else {
								url = "suachitietsinhsan";
								$
										.post(url, {
											url : convertArray(str)
										})
										.done(
												function(data) {
													if (data != "-1") {
														jAlert(
																"Sửa thành công!",
																'Thông báo');
													} else {
														jAlert(
																"Lỗi sửa chi tiết sinh nở !",
																'Thông báo');
													}
												});
							}
						}
					});

	$("#listTBSS").jqGrid(
			{
				//url : 'danhsachtaibiensinhsan?idss=' + $("#id_sn_thong_tin").val(),
				//url: 'danhsach',
				datatype : "local",
				// width : auto,
				colNames : [ "ID_SS_TAI_BIEN", "ID_SS_THONG_TIN",
						"ID_SS_LOAI_TAI_BIEN", "Ngày", "tình trạng",
						"tai biến", "TINH_TRANG" ],
				colModel : [ {
					name : 'ID_SS_TAI_BIEN',
					index : 'ID_SS_TAI_BIEN',
					width : 0,
					hidden : true
				}, {
					name : 'ID_SS_THONG_TIN',
					index : 'ID_SS_THONG_TIN',
					width : 0,
					hidden : true
				}, {
					name : 'ID_SS_LOAI_TAI_BIEN',
					index : 'ID_SS_LOAI_TAI_BIEN',
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
					name : 'SS_LOAI_TAI_BIEN_VIEW',
					index : 'SS_LOAI_TAI_BIEN_VIEW',
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
						var ret = $("#listTBSS").jqGrid('getRowData', id);
						if (flagTaibien_SS == -1) {
							$("#id_sn_tai_bien").val(ret.ID_SS_TAI_BIEN);
							$("#dtNgayTBSS").val(ret.NGAY);
							$("#cboTaibienSS").val(ret.ID_SS_LOAI_TAI_BIEN);
							$("#cboTinhtrangSS").val(ret.TINH_TRANG);
						}
					}
				},
				ondblClickRow : function(id) {
					var ret = $("#listTBSS").jqGrid('getRowData', id);
					if (flagTaibien_SS == -1) {
						$("#id_sn_tai_bien").val(ret.ID_SS_TAI_BIEN);
						$("#dtNgayTBSS").val(ret.NGAY);
						$("#cboTaibienSS").val(ret.ID_SS_LOAI_TAI_BIEN);
						$("#cboTinhtrangSS").val(ret.cboTinhtrangSS);
						flagTaibien_SS = 1;
						checkButtonTBSS();
					}
				}
			// jsonReader : {
			// repeatitems : false,
			// id : "id",
			// root : "rows",
			// page : "page",
			// total : "total",
			// records : "records"
			// }
			});

	$("#listXNSS").jqGrid(
			{
				//url : 'danhsachxetnghiemsinhsan?idss=' + $("#id_sn_thong_tin").val(),
				//url: 'danhsach',
				datatype : "local",
				// width : auto,
				colNames : [ "ID_SS_XET_NGHIEM", "ID_SS_THONG_TIN",
						"ID_LOAI_XET_NGHIEM", "Loại xét nghiệm", "Kết quả",
						"Ngày", "KET_QUA" ],
				colModel : [ {
					name : 'ID_SS_XET_NGHIEM',
					index : 'ID_SS_XET_NGHIEM',
					width : 0,
					hidden : true
				}, {
					name : 'ID_SS_THONG_TIN',
					index : 'ID_SS_THONG_TIN',
					width : 0,
					hidden : true
				}, {
					name : 'ID_LOAI_XET_NGHIEM',
					index : 'ID_LOAI_XET_NGHIEM',
					width : 0,
					hidden : true
				}, {
					name : 'loai_xet_nghiem_view',
					index : 'loai_xet_nghiem_view',
					width : 200
				}, {
					name : 'ket_qua_view',
					index : 'ket_qua_view',
					width : 300
				}, {
					name : 'NGAY',
					index : 'NGAY',
					width : 200

				}, {
					name : 'KET_QUA',
					index : 'KET_QUA',
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
						var ret = $("#listXNSS").jqGrid('getRowData', id);
						if (flagXetnghiem_SS == -1) {
							$("#id_sn_xet_nghiem").val(ret.ID_SS_XET_NGHIEM);
							$("#cboTXNSS").val(ret.ID_LOAI_XET_NGHIEM);
							$("#cboKQXNSS").val(ret.KET_QUA);
							$("#dtNgayXNSS").val(ret.NGAY);
						}
					}
				},
				ondblClickRow : function(id) {
					var ret = $("#listXNSS").jqGrid('getRowData', id);
					if (flagXetnghiem_SS == -1) {
						$("#id_sn_xet_nghiem").val(ret.ID_SS_XET_NGHIEM);
						$("#cboTXNSS").val(ret.ID_LOAI_XET_NGHIEM);
						$("#cboKQXNSS").val(ret.KET_QUA);
						$("#dtNgayXNSS").val(ret.NGAY);
						flagXetnghiem_SS = 1;
						checkButtonXNSS();
					}
				}
			});

	$("#listCSSS").jqGrid(
			{
				//url : 'danhsachchamsocsinhsan?idss=' + $("#id_sn_thong_tin").val(),
				//url: 'danhsach',
				datatype : "local",
				// width : auto,
				colNames : [ "Lần khám", "ID_SS_CSSS", "Ngày khám",
						"Tình trạng mẹ", "Tình trạng con", "Mạch", "Nhiệt độ",
						"Huyết áp", "Nhịp thở", "Vú", "Sàn dịch", "Tử cung",
						"Tầng sinh môn", "Tư vấn", "ID_NOI_CS",
						"ID_SS_THONG_TIN" ],
				colModel : [ {
					name : 'LAN_KHAM',
					index : 'LAN_KHAM',
					width : 200
				}, {
					name : 'ID_SS_CSSS',
					index : 'ID_SS_CSSS',
					width : 0,
					hidden : true
				}, {
					name : 'NGAY_KHAM',
					index : 'NGAY_KHAM',
					width : 200
				}, {
					name : 'TINH_TRANG_ME',
					index : 'TINH_TRANG_ME',
					width : 200
				}, {
					name : 'TINH_TRANG_CON',
					index : 'TINH_TRANG_CON',
					width : 200
				}, {
					name : 'MACH',
					index : 'MACH',
					width : 0,
					hidden : true

				}, {
					name : 'NHIET_DO',
					index : 'NHIET_DO',
					width : 0,
					hidden : true
				}, {
					name : 'HUYET_AP',
					index : 'HUYET_AP',
					width : 0,
					hidden : true
				}, {
					name : 'NHIP_THO',
					index : 'NHIP_THO',
					width : 0,
					hidden : true
				}, {
					name : 'VU',
					index : 'VU',
					width : 0,
					hidden : true
				}, {
					name : 'SAN_DICH',
					index : 'SAN_DICH',
					width : 0,
					hidden : true
				}, {
					name : 'TU_CUNG',
					index : 'TU_CUNG',
					width : 0,
					hidden : true
				}, {
					name : 'TANG_SINH_MON',
					index : 'TANG_SINH_MON',
					width : 0,
					hidden : true
				}, {
					name : 'TU_VAN',
					index : 'TU_VAN',
					width : 200
				}, {
					name : 'ID_NOI_CS',
					index : 'ID_NOI_CS',
					width : 0,
					hidden : true
				}, {
					name : 'ID_SS_THONG_TIN',
					index : 'ID_SS_THONG_TIN',
					width : 0,
					hidden : true
				} ],
				// rowNum : 20,
				// rowList : [ 10, 20, 50 ],
				autowidth : true,
				rownumbers : true,
				pager : '#pager5',
				gridview : true,
				viewrecords : true,
				loadonce : false,
				onSelectRow : function(id) {
					if (id) {
						var ret = $("#listCSSS").jqGrid('getRowData', id);
						if (flagChamSoc_SS == -1) {
							$("#nblkcsss").val(ret.LAN_KHAM);
							$("#dtnkcsss").val(ret.NGAY_KHAM);
							$("#txtttmcsss").val(ret.TINH_TRANG_ME);
							$("#txtttccsss").val(ret.TINH_TRANG_CON);
							$("#txtmcsss").val(ret.MACH);
							$("#txtndcsss").val(ret.NHIET_DO);
							$("#txthacsss").val(ret.HUYET_AP);
							$("#txtntcsss").val(ret.NHIP_THO);
							$("#txtvcsss").val(ret.VU);
							$("#txtsdcsss").val(ret.SAN_DICH);
							$("#txttccsss").val(ret.TU_CUNG);
							$("#txttsmcsss").val(ret.TANG_SINH_MON);
							$("#txttvcsss").val(ret.TU_VAN);
							$("#cboncscsss").val(ret.ID_NOI_CS);
							$("#id_sn_csss").val(ret.ID_SS_CSSS);
						}
					}
				},
				ondblClickRow : function(id) {
					var ret = $("#listCSSS").jqGrid('getRowData', id);
					if (flagChamSoc_SS == -1) {
						$("#nblkcsss").val(ret.LAN_KHAM);
						$("#dtnkcsss").val(ret.NGAY_KHAM);
						$("#txtttmcsss").val(ret.TINH_TRANG_ME);
						$("#txtttccsss").val(ret.TINH_TRANG_CON);
						$("#txtmcsss").val(ret.MACH);
						$("#txtndcsss").val(ret.NHIET_DO);
						$("#txthacsss").val(ret.HUYET_AP);
						$("#txtntcsss").val(ret.NHIP_THO);
						$("#txtvcsss").val(ret.VU);
						$("#txtsdcsss").val(ret.SAN_DICH);
						$("#txttccsss").val(ret.TU_CUNG);
						$("#txttsmcsss").val(ret.TANG_SINH_MON);
						$("#txttvcsss").val(ret.TU_VAN);
						$("#cboncscsss").val(ret.ID_NOI_CS);
						$("#id_sn_csss").val(ret.ID_SS_CSSS);
						flagChamSoc_SS = 1;
						checkButtonCSSS();
					}
				}
			});
});

function gandulieuSN(id_tiep_nhan, ma_benh_nhan, id_don_vi) {
	$("#id_tiep_nhan_sn").val(id_tiep_nhan);
	$("#ma_benh_nhan_sn").val(ma_benh_nhan);
	$("#id_don_vi_sn").val(id_don_vi);
	var arr = [ id_tiep_nhan,id_don_vi, "0" ];
	var url1 = "chitietsinhno?url=" + convertArray(arr);
	$.getJSON(url1, function(result) {
		$.each(result, function(i, field) {
			// lay ra toan bo thong tin ho khau;
			$("#id_sn_thong_tin").val(field.ID_SS_THONG_TIN);
			$("#dtngayde").val(field.NGAY_DE);
			$("#nbslddt").val(field.SL_DE_DU_THANG);
			$("#nbsldn").val(field.SL_DE_NON);
			$("#nbslspt").val(field.SL_SAY_PHA_THAI);
			$("#nbschcttss").val(field.SL_CON);
			$("#cboqlthai").val(field.QUAN_LY_THAI);
			$("#cboUVDDqlss").val(field.TIEM_UVDD);
			$("#cbotttttss").val(field.TINH_TRANG_TRE);
			$("#nbtskss").val(field.TUAN_THAI);
			$("#nbcnttss").val(field.CAN_NANG);
			$("#cbogttss").val(field.GIOI_TINH);
			$("#tacttt").val(field.CHI_TIET_TINH_TRANG);
			$("#ndttss").val(field.NGUOI_DO);
			$("#cbombgdttss").val(field.BU_ME_GIO_DAU);
			$("#cbotvtmkttss").val(field.TIEM_VITAMINK);
			if (field.DE_NON == 1) {
				$("#cboxdnttss").attr('checked', true);
			} else {
				$("#cboxdnttss").attr('checked', false);
			}
			if (field.BI_NGAT == 1) {
				$("#cboxnttss").attr('checked', true);
			} else {
				$("#cboxnttss").attr('checked', false);
			}
			$("#cbotdttss").val(field.ID_TRINHDO_NGUOIDO);
			$("#cboctdttss").val(field.ID_CACH_THUC_DE);
			$("#cboSLKT").val(field.ID_SO_LAN_KT);
			$("#cbotvtnttss").val(field.ID_TUVONG_THAINHI);
			$("#cbondttss").val(field.ID_NOI_DE);
			$("#cboVXUVMTSS").val(field.VXUV_ME_TIEM);
			$("#cbomuvssss").val(field.UVSS);
			$("#cbodieutrass").val(field.DUOC_DIEU_TRA);
			

			if ($("#id_sn_thong_tin").val() == '') {
				modeg_ss = 0;
				$("#deleteSS").removeClass("button_shadow");
				$("#deleteSS").prop('hidden', true);

				$("#btnCSSS").removeClass("button_shadow");
				$("#btnCSSS").prop('hidden', true);

				$("#btnTBSS").removeClass("button_shadow");
				$("#btnTBSS").prop('hidden', true);

				$("#btnXNSS").removeClass("button_shadow");
				$("#btnXNSS").prop('hidden', true);
			} else {
				modeg_ss = 1;
				$("#deleteSS").addClass("button_shadow");
				$("#deleteSS").prop('hidden', false);

				$("#btnCSSS").addClass("button_shadow");
				$("#btnCSSS").prop('hidden', false);

				$("#btnTBSS").addClass("button_shadow");
				$("#btnTBSS").prop('hidden', false);

				$("#btnXNSS").addClass("button_shadow");
				$("#btnXNSS").prop('hidden', false);

			}
		});
	});
}

$("#sinhno").click(function() {
	if ($("#idtiepnhan").val() == '') {
		jAlert("Mã lần khám không tồn tại !", 'Thông báo');
		return;
	}
	if ($("#mayte").val() == '') {
		jAlert("Mã bệnh nhân không tồn tại!", 'Thông báo');
		return;
	}
	gandulieuSN($("#idtiepnhan").val(), $("#mayte").val(), dvtt);
	sinhno_dialog.dialog("open");
});

function checkdulieuSS() {
	checkRequired_ss = 0;
	if ($("#dtngayde").val().trim() == '') {
		checkRequired_ss = 1;
		jAlert("Ngày đẻ không được để trống !", 'Thông báo');
		// $("#dtngayde").focus();
		return;
	}
	if ($("#cboSLKT").val().trim() == '') {
		checkRequired_ss = 1;
		jAlert("Số lần KT bắt buộc phải chọn !", 'Thông báo');
		return;
	}
	if ($("#cboctdttss").val().trim() == '') {
		checkRequired_ss = 1;
		jAlert("Cách thức đẻ bắt buộc phải chọn !", 'Thông báo');
		return;
	}

	if ($("#cbogttss").val().trim() == '') {
		checkRequired_ss = 1;
		jAlert("Giới tính bắt buộc phải chọn !", 'Thông báo');
		return;
	}

	if ($("#cbondttss").val().trim() == '') {
		checkRequired_ss = 1;
		jAlert("Nơi đẻ bắt buộc phải chọn !", 'Thông báo');
		return;
	}

	if ($("#cbotdttss").val().trim() == '') {
		checkRequired_ss = 1;
		jAlert("Trình độ bắt buộc phải chọn !", 'Thông báo');
		return;
	}

	if ($("#cbotvtnttss").val().trim() == '') {
		checkRequired_ss = 1;
		jAlert("Tử vong thai nhi bắt buộc phải chọn !", 'Thông báo');
		return;
	}
}

function checkButtonTBSS() {
	if (flagTaibien_SS == -1) {
		$("#addTBSS").addClass("button_shadow");
		$("#addTBSS").prop('hidden', false);
		$("#editTBSS").addClass("button_shadow");
		$("#editTBSS").prop('hidden', false);
		$("#deleteTBSS").addClass("button_shadow");
		$("#deleteTBSS").prop('hidden', false);
		$("#saveTBSS").removeClass("button_shadow");
		$("#saveTBSS").prop('hidden', true);
		$("#cancelTBSS").removeClass("button_shadow");
		$("#cancelTBSS").prop('hidden', true);
		$("#dtNgayTBSS").prop('disabled', true);
		$("#cboTaibienSS").prop('disabled', true);
		$("#cboTinhtrangSS").prop('disabled', true);
	}
	if (flagTaibien_SS == 0 || flagTaibien_SS == 1) {
		$("#addTBSS").removeClass("button_shadow");
		$("#addTBSS").prop('hidden', true);
		$("#editTBSS").removeClass("button_shadow");
		$("#editTBSS").prop('hidden', true);
		$("#deleteTBSS").removeClass("button_shadow");
		$("#deleteTBSS").prop('hidden', true);
		$("#saveTBSS").addClass("button_shadow");
		$("#saveTBSS").prop('hidden', false);
		$("#cancelTBSS").addClass("button_shadow");
		$("#cancelTBSS").prop('hidden', false);
		$("#dtNgayTBSS").prop('disabled', false);
		$("#cboTaibienSS").prop('disabled', false);
		$("#cboTinhtrangSS").prop('disabled', false);
	}
}

function checkdulieuTBSS() {
	checkRequiredTBSS = 0;
	if ($("#dtNgayTBSS").val().trim() == '') {
		checkRequiredTBSS = 1;
		jAlert("Ngày tai biến không được để trống !", 'Thông báo');
		return;
	}
	if ($("#cboTaibienSS").val().trim() == '') {
		checkRequiredTBSS = 1;
		jAlert("Tai biến không được để trống !", 'Thông báo');
		return;
	}
	if ($("#cboTinhtrangSS").val().trim() == '') {
		checkRequiredTBSS = 1;
		jAlert("Tình trạng không được để trống !", 'Thông báo');
		return;
	}
}

function checkButtonXNSS() {
	if (flagXetnghiem_SS == -1) {
		$("#addXNSS").addClass("button_shadow");
		$("#addXNSS").prop('hidden', false);
		$("#editXNSS").addClass("button_shadow");
		$("#editXNSS").prop('hidden', false);
		$("#deleteXNSS").addClass("button_shadow");
		$("#deleteXNSS").prop('hidden', false);
		$("#saveXNSS").removeClass("button_shadow");
		$("#saveXNSS").prop('hidden', true);
		$("#cancelXNSS").removeClass("button_shadow");
		$("#cancelXNSS").prop('hidden', true);
		$("#dtNgayXNSS").prop('disabled', true);
		$("#cboKQXNSS").prop('disabled', true);
		$("#cboTXNSS").prop('disabled', true);
	}
	if (flagXetnghiem_SS == 0 || flagXetnghiem_SS == 1) {
		$("#addXNSS").removeClass("button_shadow");
		$("#addXNSS").prop('hidden', true);
		$("#editXNSS").removeClass("button_shadow");
		$("#editXNSS").prop('hidden', true);
		$("#deleteXNSS").removeClass("button_shadow");
		$("#deleteXNSS").prop('hidden', true);
		$("#saveXNSS").addClass("button_shadow");
		$("#saveXNSS").prop('hidden', false);
		$("#cancelXNSS").addClass("button_shadow");
		$("#cancelXNSS").prop('hidden', false);
		$("#dtNgayXNSS").prop('disabled', false);
		$("#cboKQXNSS").prop('disabled', false);
		$("#cboTXNSS").prop('disabled', false);
	}
}

function checkdulieuXNSS() {
	checkRequiredXNSS = 0;
	if ($("#cboTXNSS").val().trim() == '') {
		checkRequiredXNSS = 1;
		jAlert("Tên XN bắt buộc chọn !", 'Thông báo');
		return;
	}
	if ($("#cboKQXNSS").val().trim() == '') {
		checkRequiredXNSS = 1;
		jAlert("Kết quả bắt buộc chọn!", 'Thông báo');
		return;
	}
	if ($("#dtNgayXNSS").val().trim() == '') {
		checkRequiredXNSS = 1;
		jAlert("Ngày xét nghiệm không được để trống !", 'Thông báo');
		return;
	}
}

function checkButtonCSSS() {
	if (flagChamSoc_SS == -1) {
		$("#addCSSS").addClass("button_shadow");
		$("#addCSSS").prop('hidden', false);
		$("#editCSSS").addClass("button_shadow");
		$("#editCSSS").prop('hidden', false);
		$("#deleteCSSS").addClass("button_shadow");
		$("#deleteCSSS").prop('hidden', false);
		$("#saveCSSS").removeClass("button_shadow");
		$("#saveCSSS").prop('hidden', true);
		$("#cancelCSSS").removeClass("button_shadow");
		$("#cancelCSSS").prop('hidden', true);
		$("#nblkcsss").prop('disabled', true);
		$("#dtnkcsss").prop('disabled', true);
		$("#txtttmcsss").prop('disabled', true);
		$("#txtttccsss").prop('disabled', true);
		$("#txtmcsss").prop('disabled', true);
		$("#txtndcsss").prop('disabled', true);
		$("#txthacsss").prop('disabled', true);
		$("#txtntcsss").prop('disabled', true);
		$("#txtvcsss").prop('disabled', true);
		$("#txtsdcsss").prop('disabled', true);
		$("#txttccsss").prop('disabled', true);
		$("#txttsmcsss").prop('disabled', true);
		$("#txttvcsss").prop('disabled', true);
		$("#cboncscsss").prop('disabled', true);
	}
	if (flagChamSoc_SS == 0 || flagChamSoc_SS == 1) {
		$("#addCSSS").removeClass("button_shadow");
		$("#addCSSS").prop('hidden', true);
		$("#editCSSS").removeClass("button_shadow");
		$("#editCSSS").prop('hidden', true);
		$("#deleteCSSS").removeClass("button_shadow");
		$("#deleteCSSS").prop('hidden', true);
		$("#saveCSSS").addClass("button_shadow");
		$("#saveCSSS").prop('hidden', false);
		$("#cancelCSSS").addClass("button_shadow");
		$("#cancelCSSS").prop('hidden', false);
		$("#nblkcsss").prop('disabled', false);
		$("#dtnkcsss").prop('disabled', false);
		$("#txtttmcsss").prop('disabled', false);
		$("#txtttccsss").prop('disabled', false);
		$("#txtmcsss").prop('disabled', false);
		$("#txtndcsss").prop('disabled', false);
		$("#txthacsss").prop('disabled', false);
		$("#txtntcsss").prop('disabled', false);
		$("#txtvcsss").prop('disabled', false);
		$("#txtsdcsss").prop('disabled', false);
		$("#txttccsss").prop('disabled', false);
		$("#txttsmcsss").prop('disabled', false);
		$("#txttvcsss").prop('disabled', false);
		$("#cboncscsss").prop('disabled', false);
	}
}

function checkdulieuCSSS() {
	checkRequiredCSSS = 0;
	if ($("#nblkcsss").val().trim() == '') {
		checkRequiredCSSS = 1;
		jAlert("Lần khám bắt buộc nhập !", 'Thông báo');
		return;
	}
	if ($("#dtnkcsss").val().trim() == '') {
		checkRequiredCSSS = 1;
		jAlert("Ngày khám bắt buộc nhập !", 'Thông báo');
		return;
	}
	if ($("#txtttmcsss").val().trim() == '') {
		checkRequiredCSSS = 1;
		jAlert("Tình trạng mẹ bắt buộc nhập !", 'Thông báo');
		return;
	}
	if ($("#txtttccsss").val().trim() == '') {
		checkRequiredCSSS = 1;
		jAlert("Tình trạng con bắt buộc nhập !", 'Thông báo');
		return;
	}
	if ($("#cboncscsss").val().trim() == '') {
		checkRequiredCSSS = 1;
		jAlert("Nơi chăm sóc bắt buộc chọn !", 'Thông báo');
		return;
	}
}
