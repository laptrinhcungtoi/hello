var flag;
var bool_them = "them";
var cobaohiemyte;
var checkHuyThanhToan = false; 
var trangthaikham = 1;
var load_sinh_no = 0;
var load_pha_thai = 0 ;
var load_khhdg = 0;
var load_hiv = 0;
var load_lao = 0;
var load_sotret = 0;
var load_tamthan = 0;
$(function() {
    $("#taothete1").click(function(evt) {
        var url = "tiepnhan_laythete1";
        $.post(url, {
            dvtt: dvtt
        }).done(function(dt) {
            $("#sobhyt").val(dt);
            kt_bhyt(dt);
            if($("#namsinh").val()== null || $("#namsinh").val()==''){
            var year = currentTime.getFullYear();
            $("#denngay").val("31/12/" + (year+6).toString() + "");
            $("#tungay").val("01/01/" + year.toString() + "");
            }
            else{
            	$("#tungay").val($("#namsinh").val());
            	var year_den = parseInt($("#namsinh").val().substring($("#namsinh").val().length-4,$("#namsinh").val().length))+6;
            	$("#denngay").val($("#namsinh").val().substring(0,$("#namsinh").val().length-4)+year_den.toString());
            }
        });
    });

    
    $("#tuoi").focusout(function(){
   	tinhnamsinh();
   });
    
    $("#thang").focusout(function(){
       	tinhnamsinh();
       });
    
    $("#cbicd").keypress(function(evt) {
        if (evt.keyCode == 13 || evt.keyCode == 9) {
            if ($("#icd").val() != "" ) {
            	$("#icd2").focus();
        }
    	    else{
    		            $("#icd").focus();
    	    }
    }
});

    
    
    function tinhnamsinh() {
        var SoNam = $("#tuoi").val() != "" ? $("#tuoi").val() : "0";
        var SoThang = $("#thang").val() != ""? $("#thang").val() : "0";
        var NgayHienTai = new Date(new Date().toJSON().slice(0,10));
        
        var NgaySinh = new Date(new Date(NgayHienTai).setMonth(NgayHienTai.getMonth() - SoThang+1));
        NgaySinh = new Date(new Date((NgaySinh).setFullYear(NgaySinh.getFullYear() - SoNam)));
        
        var res = "01/";
        if(new Date(NgaySinh).getMonth() < 10) {res += "0" + new Date(NgaySinh).getMonth();}
        else {res += new Date(NgaySinh).getMonth();}
        res += "/" + new Date(NgaySinh).getFullYear();
        $("#namsinh").val(res);
       };

    
    $("#btnKiemTraThe").click(function(evt){
    	var hoten = $("#hoten").val();
        var namsinh = convertStr_MysqlDate($("#namsinh").val());
        var gioitinh = $("#cbgioitinh").val()==1?"true":"false";
        var sobhyt = $("#sobhyt").val();
        var tungay = $("#tungay").val() == "" ? "" : convertStr_MysqlDate($("#tungay").val());
        var denngay = $("#denngay").val() == "" ? "" : convertStr_MysqlDate($("#denngay").val());
        var noidangky = $("#noidangky").val();
        var dvtt = "${Sess_DVTT}";
        var arr = [hoten, namsinh, gioitinh, sobhyt, tungay, denngay, noidangky, dvtt];
        if (validateInput(hoten, namsinh, sobhyt) == true) {
            url = "bhyt_kiem_tra_the";
            $.post(url, {hoten: hoten, 
            			namsinh:namsinh, 
            			gioitinh:gioitinh, 
            			sobhyt:sobhyt, 
            			tungay:tungay, 
            			denngay:denngay, 
            			noidangky:noidangky, 
            			dvtt:dvtt}).done(function(data) {
            	jAlert(data, 'Cảnh báo', function(r) {
                    $("#sobhyt").focus();
                });
            })
    	}
    });
    
    
    function validateInput(hoten, namsinh, sobhyt){
    	if(hoten == "") return jAlert("Bạn phải nhập họ tên của thẻ BHYT", 'Cảnh báo', function(r) {
            $("#hoten").focus();
        });
    	if(namsinh == "") return jAlert("Bạn phải nhập ngày tháng năm sinh trên thẻ BHYT", 'Cảnh báo', function(r) {
            $("#namsinh").focus();
        });
    	if(sobhyt == "") return jAlert("Bạn phải nhập số thẻ BHYT", 'Cảnh báo', function(r) {
            $("#sobhyt").focus();
        });
    	return true;
    }
    
    $("#songayhen").change(function() {
        var ngayhen = $("#ngayhen").val();
        var songayhen = $("#songayhen").val();
        if (songayhen == "")
            songayhen = 0;
        var ngay = getDate(ngayhientai);
        var expDate = ngay;
        expDate.setDate(parseInt(ngay.getDate()) + parseInt(songayhen));
        $("#ngayhen").val(convertDate_Str(expDate));
        ngayhen = $("#ngayhen").val();
        var thu = getDayofWeek(getDate(ngayhen));
        $("#thu_hen").html(thu);
    });
    
    $("#songayhen").keypress(function(evt) {
        if (evt.keyCode == 13) {
        	$("#sobienlai").focus();
        }
    }
    );
    
    $("#dantoc").keypress(function(evt) {
        $("#cbdantoc").val($("#dantoc").val());
        if (evt.keyCode == 13) {
            $("#nghenghiep").focus();
        }
    }
    );
    
    $("#cbdantoc").change(function(evt) {
        $("#dantoc").val($("#cbdantoc").val());
    }
    );
    
    $("#ngaytiepnhan").keypress(function(evt) {
        if (evt.keyCode == 13) {
            $("#sobhyt").focus();
        }
    }
    );
    
    $("#nghenghiep").keypress(function(evt) {
        $("#cbnghenghiep").val($("#nghenghiep").val());
        if (evt.keyCode == 13) {
            $("#phongkham").focus();
        }
    }
    );
    $("#cbnghenghiep").change(function(evt) {
        $("#nghenghiep").val($("#cbnghenghiep").val());
    });

    
    var diachi_modal = new jBox('Modal', {
        title: 'Địa chỉ',
        overlay: false,
        content: $('#dialog-form'),
        draggable: 'title'
    });
    
    var chitietdichvu_modal = new jBox('Modal', {
        title: 'Chi tiết bảng kê',
        overlay: false,
        content: $('#dialogThongtinkhambenh'),
        draggable: 'title'
    });
    
    $("#btnCTKB").click(function(evt) {
    	load_gridchitietthanhtoan($("#thanhtoan").val());
    	chitietdichvu_modal.open();
    });
    
    
    $("#list_diachi").jqGrid({
        datatype: "local",
        height: 250,
        colNames: ["Địa chỉ", "Mô tả", "Congty", "madc"],
        colModel: [
            {name: 'diachi', index: 'diachi', width: 400, sorttype: "text", searchoptions: {dataInit: function(el) {
                        setTimeout(function() {
                            $(el).focus().trigger({type: 'keypress', charCode: 13});
                        }, 20);
                    }
                }},
            {name: 'mota', index: 'mota', width: 100, sorttype: "text"},
            {name: 'congty', index: 'congty', hidden: true},
            {name: 'madc', index: 'madc', hidden: true}
        ],
        rowNum: 10,
        rowList: [10, 20, 30],
        ignoreCase: true,
        pager: '#pager_diachi',
        viewrecords: true,
        caption: "Địa chỉ",
        loadonce: true,
        ondblClickRow: function(id) {
            if (id) {
                var ret = $("#list_diachi").jqGrid('getRowData', id);
                $("#diachi").val(ret.diachi);
                diachi_modal.close();
                $("#sonha").focus();
            }
        }
    });
    $("#list_diachi").jqGrid('navGrid', '#pager_diachi', {edit: false, add: false, del: false});
    $("#list_diachi").jqGrid('filterToolbar', {ignoreCase: true, stringResult: true, searchOnEnter: false, defaultSearch: "cn"});
    $("#list_diachi").keypress(function(evt) {
        if (evt.keyCode == 13) {
            var id = $("#list_diachi").jqGrid('getGridParam', 'selrow');
            if (id) {
                var ret = $("#list_diachi").jqGrid('getRowData', id);
                $("#diachi").val(ret.diachi);
                diachi_modal.close();
            }
        }
    });
    
    $("#hoten").focusout(function(){
    	 $("#hoten").val($("#hoten").val().toUpperCase());
    });
    
    $("#noidangky").focusout(function(){
    	loadnoidangky();
    	var sobhyt = $("#sobhyt").val().trim();
		if ((sobhyt.length == 15) && (sobhyt.indexOf("_") < 0)) {
			$("#sobhyt").val(sobhyt.toLocaleUpperCase());
			kt_bhyt(sobhyt);
		}
    });
    
    $("#btnXoa").click(function(evt) {
            jConfirm('Bạn có muốn xóa bệnh nhân?', 'Thông báo', function(r) {
                if (r.toString() == "true") {
                    var dvtt = $("#dvtt").val();
                    var idtiepnhan = $("#idtiepnhan").val();
                    var arr = [dvtt,idtiepnhan];
                    var url = "xoa_kham_benh_tyt";
                    $.post(url, {url: convertArray(arr)}).done(function(data) {
                    	set_button("huy");
                    })
                }
            });
    }
    );    
    
    $("#hoten").keypress(function(evt) {
    	if (evt.keyCode == 13) {
    		if( $("#hoten").val()!= null &&  $("#hoten").val()!= ""){
    		$("#namsinh").focus();
    		}
    		else{
    			jAlert("Họ tên không được để trống", 'Cảnh báo', function(r) {
    				$("#hoten").focus();
    			});
    		}
    	}
    });
    
    $("#tuoi").keypress(function(evt) {
    	if (evt.keyCode == 13) {
    		$("#thang").focus();
    	}
    });
    
    $("#thang").keypress(function(evt) {
    	if (evt.keyCode == 13) {
    		if($("#namsinh").val()==null || $("#namsinh").val()== ''){
    			$("#namsinh").focus();
    		}
    		else{
    		$("#gioitinh").focus();
    		}
    	}
    });
    
    $("#tlmiengiam").keypress(function(evt) {
    	if (evt.keyCode == 13) {
    		$("#dichvu").focus();
    	}
    });
    
    $("#mach").keypress(function(evt) {
    	if (evt.keyCode == 13) {
    		$("#nhiptho").focus();
    	}
    });
    
    $("#nhiptho").keypress(function(evt) {
    	if (evt.keyCode == 13) {
    		$("#chieucao").focus();
    	}
    });
    
    $("#chieucao").keypress(function(evt) {
    	if (evt.keyCode == 13) {
    		$("#cannang").focus();
    	}
    });
    
    $("#cannang").keypress(function(evt) {
    	if (evt.keyCode == 13) {
    		$("#nhietdo").focus();
    	}
    });
    
    $("#nhietdo").keypress(function(evt) {
    	if (evt.keyCode == 13) {
    		$("#huyetaptren").focus();
    	}
    });
    
    $("#huyetaptren").keypress(function(evt) {
    	if (evt.keyCode == 13) {
    		$("#huyetapduoi").focus();
    	}
    });
    
    $("#huyetapduoi").keypress(function(evt) {
    	if (evt.keyCode == 13) {
    		$("#trieuchungls").focus();
    	}
    });
    
    $("#trieuchungls").keypress(function(evt) {
    	if (evt.keyCode == 13) {
    		$("#icd").focus();
    	}
    });
    
    
    $("#diachi").keypress(function(evt) {
        if (evt.keyCode == 13) {
            var diachi = $("#diachi").val();
            if (diachi != "" && diachi != null) {
                var url_diachi = "ktdiachi?madc=" + diachi;
                $.ajax({
                    url: url_diachi
                }).done(function(data) {
                    if (data == 2) {
                        var url = "laydiachi?madc=" + $("#diachi").val();
                        $("#list_diachi").jqGrid('setGridParam', {datatype: 'json', url: url}).trigger('reloadGrid');
                        diachi_modal.open();
                    }
                    else if (data == 1) {
                        var url = "laydiachi?madc=" + $("#diachi").val();
                        $.getJSON(url, function(result) {
                            $.each(result, function(i, field) {
                                $("#diachi").val(field.DIACHI);
                            });
                        });
                    }
                    else {
                        $("#tungay").focus();
                    }
                }).fail(function(data) {
                    var url = "laydiachi?madc=" + $("#diachi").val();
                    $("#list_diachi").jqGrid('setGridParam', {datatype: 'json', url: url}).trigger('reloadGrid');
                });
            }
            else{
            	$("#diachi").focus();
    			jAlert("Địa chỉ không được để trống", 'Cảnh báo', function(r) {
    				$("#sobhyt").focus();
    			});
            }
        }
    });
    
    $("#cbicd").combogrid({
        url: 'laydanhmucicd',
        debug: true,
        width: "600px",
        colModel: [{'columnName': 'ICD', 'label': 'ICD', 'width': '20'},
            {'columnName': 'MO_TA_BENH_LY', 'width': '80', 'label': 'Mô tả bệnh lý', 'align': 'left'},
            {'columnName': 'MA_BENH_LY', 'label': 'mabenhly', hidden: true}
        ],
        select: function(event, ui) {
            $("#cbicd").val(ui.item.MO_TA_BENH_LY);
            $("#icd").val(ui.item.ICD);
            $("#mabenhly").val(ui.item.MA_BENH_LY);
            return false;
        }
    });
    
    $("#sobienlai").keypress(function(evt){
    	if (evt.keyCode == 13) {
    		$("#btnLuu").focus();
    	}
    });
	$("#icd").keypress(function(evt) {
	    
	        if (evt.keyCode == 13 || evt.keyCode == 9) {
	            if ($("#icd").val() != "" ) {
	    	        var url = "laymotabenhly?icd=" + $("#icd").val().toUpperCase();
	    	        $.ajax({
	    	            url: url
	    	        }).done(function(data) {
	    	            if (data.trim() != "") {
	    	                arr = data.split("!!!");
	    	                $("#icd").val($("#icd").val().toString().toUpperCase());
	    	                $("#cbicd").val(arr[1]);
	    	                $("#mabenhly").val(arr[0]);
	    	            }
	    	            else {
	    	                $("#cbicd").val("");
	    	                $("#mabenhly").val("");
	    	            }
	    	        });
	    	        
	    	        if($("#trieuchungls").val()== null || $("#trieuchungls").val() == ''){
	    	        var url = "laymotatrieuchung?icd=" + $("#icd").val().toUpperCase()+"&dvtt="+dvtt;
	    	        $.ajax({
	    	            url: url
	    	        }).done(function(data) {
	    	            if (data.trim() != "") {
	    	                $("#trieuchungls").val(data);
	    	            }
	    	            else {
	    	                $("#trieuchungls").val("");
	    	            }
	    	        });
	    	        }
	    	        $("#icd2").focus();
	        }
	    	    else{
	    		            $("#cbicd").focus();
	    	    }
	    }
	});

	$(":input").inputmask();

	$("#thanhtoan").val("false");

	$("#tab_xn").tabs();
	$("#tab_ttpt").tabs();
	$("#tab_cdha").tabs();

	set_button("themmoi");

	change_huonggiaiquyet();

	change_dichvu();

	if ($('#idtiepnhan').val() != '' && $('#idtiepnhan').val() != null)
		kb_lay_thongtin_khambenh_tyt();

	$("#list_chitietthanhtoan")
			.jqGrid(
					{
						datatype : "local",
						loadonce : true,
						height : 200,
						width : 500,
						rowNum : 10000000,
						colNames : [ "Nội dung", "SL", "Đơn giá", "Thành tiền",
								"Thanh toán", "Ghi chú" ],
						colModel : [ {
							name : 'TEN_DV',
							index : 'TEN_DV',
							width : 90
						}, {
							name : 'SOLUONG',
							index : 'SOLUONG',
							width : 30,
							align : "right"
						}, {
							name : 'DONGIA',
							index : 'DONGIA',
							width : 60,
							align : "right"
						}, {
							name : 'THANHTIEN',
							index : 'THANHTIEN',
							width : 60,
							formatter : "integer",
							summaryType : 'sum',
							align : "right"
						}, {
							name : 'PHAI_TT',
							index : 'PHAI_TT',
							width : 60,
							formatter : "integer",
							summaryType : 'sum',
							align : "right"
						}, {
							name : 'ghi_chu',
							index : 'ghi_chu',
							width : 60,
							hidden : true
						} ],
						sortname : 'TEN_DV',
						viewrecords : true,
						sortorder : "asc",
						caption : "Chi tiết bảng kê",
						footerrow : true,
						loadComplete : function() {
							var $self = $(this);
							var sum = $self.jqGrid("getCol", "THANHTIEN",
									false, "sum");
							sum = parseFloat(sum).toFixed(2);
							$self.jqGrid("footerData", "set", {
								THANHTIEN : sum
							});

							var sum1 = $self.jqGrid("getCol", "PHAI_TT", false,
									"sum");
							$self.jqGrid("footerData", "set", {
								PHAI_TT : sum1
							});
							var bhyt = sum - sum1;
							$("#sotienbh").val( new Intl.NumberFormat("en-US")
							.format(bhyt));
							$("#sotientt").val(
									new Intl.NumberFormat("en-US")
											.format(sum));
							$("#sotientra").val(
									new Intl.NumberFormat("en-US")
											.format(sum1));
							$("#sotienbenhnhanphaitt").val(sum1);
							if ($("#sotientt").val() == "0" || $("#sotientra").val() =="0")
								$("#btnThanhToan").hide();
						}
					});

	$("#list_trung_benhnhan").jqGrid(
			{
				datatype : "local",
				height : 250,
				width : 900,
				colNames : [ "Mã y tế", "Họ tên", "BHYT", "Số CMT",
						"Ngày sinh", "Nam", "Số ĐT", "Địa chỉ" ],
				colModel : [ {
					name : 'MA_BENH_NHAN',
					index : 'MA_BENH_NHAN',
					width : 50,
					align : 'center'
				}, {
					name : 'TEN_BENH_NHAN',
					index : 'TEN_BENH_NHAN',
					width : 100,
					sorttype : "text",
					searchoptions : {
						dataInit : function(el) {
							setTimeout(function() {
								$(el).focus().trigger({
									type : 'keypress',
									charCode : 13
								});
							}, 20);
						}
					}
				}, {
					name : 'SO_THE_BAOHIEM_YTE',
					index : 'SO_THE_BAOHIEM_YTE',
					width : 100,
					sorttype : "text"
				}, {
					name : 'CMT_BENHNHAN',
					index : 'CMT_BENHNHAN',
					width : 100,
					align : 'center'
				}, {
					name : 'NGAY_SINH',
					index : 'NGAY_SINH',
					width : 60,
					align : 'center'
				}, {
					name : 'GIOI_TINH',
					index : 'GIOI_TINH',
					width : 20,
					formatter : 'checkbox',
					formatoptions : {
						value : 'true:false'
					},
					align : 'center'
				}, {
					name : 'SO_DIEN_THOAI',
					index : 'SO_DIEN_THOAI',
					width : 100,
					align : 'right'
				}, {
					name : 'DIA_CHI',
					index : 'DIA_CHI',
					width : 200
				} ],
				rowNum : 10000000,
				ignoreCase : true,
				caption : "Danh sách bệnh nhân",
				loadonce : true
			});

	var dialog_benhnhan_trung = new jBox('Modal', {
		title : "Tìm kiếm thông tin bệnh nhân",
		overlay : false,
		content : $('#dialog_timkiembenhnhan_trung'),
		draggable : 'title'
	});
	
	var dialog_sua_ngay_kham = new jBox('Modal', {
		title : "Chọn ngày khám mới",
		overlay : false,
		content : $('#dialog_suangaykham'),
		draggable : 'title',
		width:300
	});
	
	$("#suangaykham").click(function(evt) {
		dialog_sua_ngay_kham.open();
	});
	
	$("#suangaykham").click(function(evt) {
		dialog_sua_ngay_kham.close();
	});
	
	
	$("#canceNgaykhammoi").click(function(evt) {
		dialog_sua_ngay_kham.close();
	});
	
    $("#chon_themmoi").click(function(evt) {
        var id = $("#list_trung_benhnhan").jqGrid('getGridParam', 'selrow');
        if (id) {
            var ret = $("#list_trung_benhnhan").jqGrid('getRowData', id);
            lay_thong_tin_benh_nhan("",ret.MA_BENH_NHAN);
            setTimeout(function(){ luu_tiepnhan(); }, 3000);
            
        }
        dialog_benhnhan_trung.close();
    });
    
    $("#huy_themmoi").click(function(evt) {
        luu_tiepnhan();
        dialog_benhnhan_trung.close();
    });

	$("#btnHuy").click(function() {
		set_button("huy");
	});

	$("#btnThem").click(function() {
		set_button("huy");
		set_button("themmoi");
		enableNgayKham();
	});

	$("#btnDanhSach").click(function(evt) {
		window.open("dskhambenhtyt", '_top');
	});

	$("#btnLichSuKham").click(function(evt) {
		if ($("#mayte").val() != "") {
			mabenhnhan_lsk = $("#mayte").val();
			load_tt_lskham(mabenhnhan_lsk, $("#hoten").val());
			lichsukham_dialog.dialog("open");
		}
	});

	$("#btnChuyenTuyen").click(
			function(evt) {
				if($("#idtiepnhan").val() != null && $("#idtiepnhan").val() != ''){
				$("#phuongtien_cv").val("tự túc");
				change_tt_vanchuyen();
				$("#dauhieuls_cv").focus();
				$("#mayte_cv").val($("#mayte").val());
				$("#hoten_cv").val($("#hoten").val());
				$("#sobhyt_cv").val($("#bhyt").val());
				$("#doituong_cv").val($("#doituong").val());
				$("#tuoi_cv").val($("#tuoi").val());
				$("#tlmg_cv").val($("#tlmiengiam").val());
				$("#benhchinh_cv").val($("#icd").val());
				$("#mabenhly_cv").val($("#mabenhly").val());
				$("#cbbenhchinh_cv").val($("#cbicd").val());
				$("#diachi_cv").val($("#diachi").val());
				$("#benhphu_cv").val($("#benhphu").val());
				$("#dauhieuls_cv").val($("#trieuchungls").val());
				$("#sobhyt_cv").val($("#sobhyt").val());
				$("#sobhyt_cv").val($("#sobhyt").val());
				$("#doituong_cv").val($("#doituongthe").val());
				
				var url_sct = "sochuyentuyen_select?idtiepnhan="
						+ $("#idtiepnhan").val() + "&dvtt=" + dvtt;
				$.ajax({
					url : url_sct
				}).done(function(data) {
					$("#sochuyen_tyt").val(data.SO_CHUYEN_TUYEN_TYT);
					$("#sochuyen_pkkv").val(data.SO_CHUYEN_TUYEN);
					$("#sochuyen_ttyt").val(data.SO_CHUYEN_TUYEN_TTYT);
					
					
					$("#kqxetnghiem_cv").val(data.KETQUAXETNGHIEM_CLS);
					$("#phuongphap_cv").val(data.PP_TTPT_THUOC_DADUNG);
					$("#tinhtrangbn_cv").val(data.TINHTRANGBENHNHAN);
					$("#tenttyt_cv").val(data.TEN_TTYT);
					$("#tungay_ttyt").val(data.TUNGAY_TTYT);
					$("#denngay_ttyt").val(data.DENNGAY_TTYT);
					$("#tenpkkv_cv").val(data.TEN_PKDK);
					$("#tungay_pkkv").val(data.TUNGAY_PKDK);
					$("#denngay_pkkv").val(data.DENNGAY_PKDK);
					$("#tentyt_cv").val(data.TEN_TYT);
					$("#tungay_tyt").val(data.TUNGAY_TYT);
					$("#denngay_tyt").val(data.DENNGAY_TYT);
					$("#huongdt_cv").val(data.HUONGDIEUTRI);
					$("#phuongtien_cv").val(data.PHUONGTIENVANCHUYEN);
					$("#nguoiduadi_cv").val(data.HOTENNGUOIDUADI);
					$("input[name=tuyen_cv][value="+data.TUYENBENHVIENCHUYENDI+"]").prop('checked', true);
					if (parseInt($("#tlmiengiam").val()) < 80)
						$("input[name=lydo_cv][value=1]").prop('checked', true);
					else
						$("input[name=lydo_cv][value=0]").prop('checked', true);
					$("#benhvien_cv").val(data.MABENHVIEN_CHUYENDI);
					
					if(data.LYDOCHUYENTUYEN ==0){
						$("#radio5").prop('checked', true);
						$("#radio6").prop('checked', true);
					}
					else if(data.LYDOCHUYENTUYEN ==1){
						$("#radio5").prop('checked', false);
						$("#radio6").prop('checked', true);
					}
				});
				var url = "layngaygiocv?idtiepnhan=" + $("#idtiepnhan").val()
						+ "&dvtt=" + dvtt;
				$.getJSON(url, function(result) {
					$.each(result, function(i, field) {
						$("#ngaykham_cv").val(field.ngaykham);
						$("#giokham_cv").val(field.giokham);
						$("#ngay_cv").val(field.ngaycv);
						$("#gio_cv").val(field.giocv);
					});
				});
				load_canhbaochuyentuyen();
				$("#checkCall").val("1");
				dialog_chuyentuyen.dialog("open");
				}
				else{
					jAlert("Lưu thông tin bệnh nhân trước khi chuyển tuyến !", 'Cảnh báo');
				}
			});
	
	$("#dongct").click(function(evt) {
		dialog_chuyentuyen.dialog("close");
	});

	$("#btnBenhAn").click(function(evt) {
        var mabenhnhan = $("#mayte").val();
        var hoten = $("#hoten").val();
        var tuoi = $("#tuoi").val();
        var gioitinh = $("#gioitinh").val();
        var tile = $("#tlmiengiam").val();
        var bhyt = $("#sobhyt").val();
        var diachi = $("#diachi").val();
        var doituong = $("#doituong").val();
        var obj = {mabenhnhan: mabenhnhan, hoten: hoten, tuoi: tuoi, gioitinh: gioitinh, tile: tile, bhyt: bhyt, diachi: diachi, doituong: doituong};
        load_tt_khamdakhoa(obj);
		makhambenh_kb = "kb_" + $("#idtiepnhan").val();
		khamdakhoa_dialog.dialog("open");
		khambenh_dialog.dialog("close");

		load_thongtin_khamdakhoa();
	});

	$("#btnXetNghiem").click(function(evt) {
		var makhambenh = "kb_" + $("#idtiepnhan").val();
		var ngaychidinh = convertStr_MysqlDate($("#ngaychidinhxn").val());
		var arr3 = [ makhambenh, ngaychidinh ];
		var url3 = "laydanhsach_phieuxetnghiem?url=" + convertArray(arr3);
		$("#list_xn_phieu").jqGrid('setGridParam', {
			datatype : 'json',
			url : url3
		}).trigger('reloadGrid');
		$('#list_xn_bhyt').jqGrid('clearGridData');
		$('#list_xn_yeucau').jqGrid('clearGridData');
		xetnghiem_dialog.dialog("open");// xn_modal.open();
		enable_button_xn("batdau");
	});

	$("#btnTTPT").click(
			function(evt) {
				enable_button_ttpt("batdau");
				$("#ngaychidinhttpt").val($("#ngaytiepnhan").val());
				var makhambenh = "kb_" + $("#idtiepnhan").val();
				var ngaychidinh = convertStr_MysqlDate($("#ngaychidinhttpt")
						.val());
				var arr3 = [ makhambenh, ngaychidinh ];
				var url3 = "laydanhsach_phieudichvu?url=" + convertArray(arr3);
				$("#list_ttpt_phieu").jqGrid('setGridParam', {
					datatype : 'json',
					url : url3
				}).trigger('reloadGrid');
				var url = 'chitiettoathuocngoatru?matt='
						+ $("#matoathuoc_dv").val()
						+ "&nghiepvu=ngoaitru_toadichvu&dvtt=" + dvtt;
				$("#list_thuocdichvu").jqGrid('setGridParam', {
					datatype : 'json',
					url : url
				}).trigger('reloadGrid');
				$('#list_ttpt_bhyt').jqGrid('clearGridData');
				$('#list_ttpt_yeucau').jqGrid('clearGridData');
				ttpt_dialog.dialog("open");// ttpt_modal.open();
				ttpt_vltl = "0";
			});

	$("#btnCDHA").click(function(evt) {
        enable_button_cdha("batdau");
        toogle_input_cdha(false);
        var makhambenh = "kb_" + $("#idtiepnhan").val();
        var ngaychidinh = convertStr_MysqlDate($("#ngaycdha").val());
        var arr3 = [makhambenh, ngaychidinh];
        var url3 = "laydanhsach_phieucdha?url=" + convertArray(arr3);
        $("#list_cdha_phieu").jqGrid('setGridParam', {datatype: 'json', url: url3}).trigger('reloadGrid');
        $('#list_cdha_bhyt').jqGrid('clearGridData');
        $('#list_cdha_yeucau').jqGrid('clearGridData');
        cdha_dialog.dialog("open");
    });
	
	$("#btnHuyHoanTatKham").click(function(evt){
		var idtiepnhan = $("#idtiepnhan").val();
		var dvtt = $("#dvtt").val();
		jConfirm('Bạn có muốn hủy hoàn tất khám cho bệnh nhân '
				+ $("#hoten").val() + "?",
				'Thông báo',function(r){
					if (r.toString() == "true") {
														var arr = [ dvtt,idtiepnhan];
														var url = 'tyt_huy_hoan_tat_kham';
														$.post(url,{url : convertArray(arr)}).done(
																function(
																		data) {
																	$("#lantt").val(data);
																	$("#sotiendatra").val(
																			"0");
																			trangthaikham = 2;
																			checkButtonHoanTatKham(2);
														                    var matoathuoc = $("#matoathuoc").val();
														                    var idtiepnhan = $("#idtiepnhan").val();
														                    var makhambenh = "kb_" + idtiepnhan;
														                    var mabenhnhan = $("#mayte").val();
														                    var ngaykhambenh = $("#ngaytiepnhan").val();
														                    var url = "xuatduoc_giamtai";
														                    $.post(url, {
														                        nghiepvu: "ngoaitru_toathuoc", matoathuoc: matoathuoc, makhambenh: makhambenh, xacnhan: "false", mabenhnhan: mabenhnhan, ngaykhambenh: ngaykhambenh
														                    }).done(function(data) {
														                    });
																});
					}
												});
				});
	
	
	$("#btnHoanTatKham").click(function(evt) {
		hoantatkham();
	});

	function hoantatkham() {
		trangthaikham = "";
		if ($("#hoten").val() == "") {
			jAlert("Vui lòng chọn một bệnh nhân", 'Cảnh báo');
		} else if ($("#matoathuoc").val() == "") {
			jAlert("Bệnh nhân chưa được khám", 'Cảnh báo');
		} else if ($("#icd").val().trim() == ""
				|| $("#cbicd").val().trim() == ""
				|| $("#mabenhly").val().trim() == "") {
			jAlert("Chưa thêm chẩn đoán cho bệnh nhân", 'Cảnh báo');
		} else if ($("#cbgiaiquyet").val() == "3") {
			jAlert("Hướng giải quyết là chuyển phòng. Không thể hoàn tất khám",
					'Cảnh báo');
		} else {
			var url = "laytrangthaikham?idtiepnhan=" + $("#idtiepnhan").val()
					+ "&dvtt=" + dvtt;
			$
					.ajax({
						url : url
					})
					.done(
							function(data) {
								jConfirm(
										'Bạn có muốn hoàn tất khám cho bệnh nhân '
												+ $("#hoten").val() + "?",
										'Thông báo',
										function(r) {
											if (r.toString() == "true") {
												if (data == "6" || data == "7") {

												} else {
													var makhambenh = "kb_"
															+ $("#idtiepnhan")
																	.val();
													var phieu = $("#sophieu")
															.val();
													var idtiepnhan = $(
															"#idtiepnhan")
															.val();
													var sophieuthanhtoan = $(
															"#sophieuthanhtoan")
															.val();
													if (idtiepnhan != ""
															&& sophieuthanhtoan != "") {
														$("#btnLuu").click();
														var arr = [ dvtt,
																makhambenh,
																phong, phieu,
																idtiepnhan,
																sophieuthanhtoan ];
														var url1 = "hoantatkham_giamtai";
														$
																.post(
																		url1,
																		{
																			url : convertArray(arr)
																		})
																.done(
																		function(
																				data) {
																			if (data == "1") {
																				jAlert(
																						"Bệnh nhân chưa được khám",
																						'Cảnh báo');
																			} else {
																				setTimeout(
																						function() {
																									$('#list_chitietthanhtoan').jqGrid(
																											'clearGridData');
																									var idtiepnhan = $("#idtiepnhan").val();
																									var sotienthantoan = $("#sotientt").val()
																											.replace(/,/g, "");
																									var sotientra = $("#sotientra").val().replace(
																											/,/g, "");
																									var sotienthoi = 0;
																									var thanhtoandaodong = "false";
																									var sobienlai = $("#sobienlai").val();
																									var ghichu = " ";
																									var ngay = convertStr_MysqlDate($(
																											"#ngaytiepnhan").val());
																									var sophieu = $("#sophieuthanhtoan").val();
																									var dvtt = $("#dvtt").val();
																									var sotienbenhnhanphaitt = $(
																											"#sotienbenhnhanphaitt").val();
																									if ($("#sobhyt").val() == null || $("#sobhyt").val() == "") {
																										var arr = [ idtiepnhan, nhanvien,
																												sotienthantoan, sotientra,
																												sotienthoi, thanhtoandaodong,
																												sobienlai, ghichu, dvtt, ngay ];

																										var url = "themlantt_khongbhyt";
																										$
																												.post(url, {
																													url : convertArray(arr)
																												})
																												.done(
																														function(data) {
																															if (data != "") {
																																$("#lantt").val(
																																		data);
																																$("#sotiendatra")
																																		.val(
																																				$(
																																						"#sotientra")
																																						.val());
																																$("#btnInBangKe").click();
																																trangthaikham = 3;
																																checkButtonHoanTatKham(3);
																																if($("#sobhyt").val!=null || $("#sobhyt").val!=""){
																												                    var matoathuoc = $("#matoathuoc").val();
																												                    var idtiepnhan = $("#idtiepnhan").val();
																												                    var makhambenh = "kb_" + idtiepnhan;
																												                    var mabenhnhan = $("#mayte").val();
																												                    var ngaykhambenh = $("#ngaytiepnhan").val();
																												                    var url = "xuatduoc_giamtai";
																												                    $.post(url, {
																												                        nghiepvu: "ngoaitru_toathuoc", matoathuoc: matoathuoc, makhambenh: makhambenh, xacnhan: "true", mabenhnhan: mabenhnhan, ngaykhambenh: ngaykhambenh
																												                    }).done(function(data) {
																												                        if (data == "1" || data == "2") {
																												                            jAlert("Bệnh nhân chưa thanh toán viện phí. Không được xuất thuốc", 'Cảnh báo');
																												                        }
																												                        else if (data == "3")
																												                            jAlert("Đã trả thuốc về kho. Không được xuất thuốc", 'Cảnh báo');
																												                    });
																																}
																																
																															}
																														});
																									} else {
																										var arr = [ sophieu, nhanvien,
																												sotienthantoan, sotientra,
																												sotienthoi, thanhtoandaodong,
																												sobienlai, ghichu, dvtt,
																												sotienbenhnhanphaitt ];
																										var url = "themlantt_cobhyt_giamtai";
																										$
																												.post(url, {
																													url : convertArray(arr)
																												})
																												.done(
																														function(data) {
																															if (data != "") {
																																$("#lantt").val(
																																		data);

																																$("#sotiendatra")
																																		.val(
																																				$(
																																						"#sotientra")
																																						.val());
//																																load_gridchitietthanhtoan('true');
																																// in bang ke va cap thuoc
																																$("#btnInBangKe").click();
																																trangthaikham = 3;
																																checkButtonHoanTatKham(3);
																																if($("#sobhyt").val!=null || $("#sobhyt").val!=""){
																												                    var matoathuoc = $("#matoathuoc").val();
																												                    var idtiepnhan = $("#idtiepnhan").val();
																												                    var makhambenh = "kb_" + idtiepnhan;
																												                    var mabenhnhan = $("#mayte").val();
																												                    var ngaykhambenh = $("#ngaytiepnhan").val();
																												                    var url = "xuatduoc_giamtai";
																												                    $.post(url, {
																												                        nghiepvu: "ngoaitru_toathuoc", matoathuoc: matoathuoc, makhambenh: makhambenh, xacnhan: "true", mabenhnhan: mabenhnhan, ngaykhambenh: ngaykhambenh
																												                    }).done(function(data) {
																												                        if (data == "1" || data == "2") {
																												                            jAlert("Bệnh nhân chưa thanh toán viện phí. Không được xuất thuốc", 'Cảnh báo');
																												                        }
																												                        else if (data == "3")
																												                            jAlert("Đã trả thuốc về kho. Không được xuất thuốc", 'Cảnh báo');
																												                    });
																																}
																															}
																														});
																								}
																						},
																						1000);
																			}
																		});
													};
												}
											}
										});
							});
		}
	}
	

	$("#btnInGiayHen").click(
			function() {
				if($("#songayhen").val()==null  || $("#songayhen").val()==0){
					jAlert("Chưa nhập ngày hẹn !", 'Cảnh báo', function(r) {
						$("#songayhen").focus();
					});
				}
				else{
				var idtiepnhan = $("#idtiepnhan").val();
				var dvtt = $("#dvtt").val();
				if (idtiepnhan != "")
					$(location).attr(
							'href',
							'ingiayhenkhambenh?makb=kb_' + idtiepnhan
									+ "&dvtt="+dvtt+"");
				}
			});

	$("#btnInBangKe").click(function() {
		inbangke_gt();
	});

	function inbangke_gt() {
		var dvtt = $("#dvtt").val();
		var idtiepnhan = $("#idtiepnhan").val();
		var makhambenh = "kb_" + idtiepnhan;
		var sophieu = $("#sophieuthanhtoan").val();
		if (idtiepnhan !== "" && $("#icd").val() !== "") {
			if($("#sobhyt").val()==null || $("#sobhyt").val()=="")
				{

                var url = "taobangkekhongbaohiem_truocin?makb=" + makhambenh + "&dvtt="+dvtt+"&idtiepnhan=" + idtiepnhan;
                $.ajax({
                    url: url
                }).done(function() {
                    $(location).attr('href', 'inbangke_khongbaohiem?makb=' + makhambenh + "&dvtt="+dvtt+"&sophieu=0");
                });

				}
			else{
				var url = "taobangke_truocin_tyt?makb=kb_" + idtiepnhan
				+ "&dvtt="+dvtt+"&sophieu=" + sophieu;
			$.ajax({
				url : url
			}).done(
					function(data) {
						if (data == "0") {
							setTimeout(function() {
								$(location).attr(
										'href',
										'inbangke_gt_tyt?makb=kb_' + idtiepnhan
												+ "&dvtt="+dvtt+"&sophieu="
												+ sophieu);
							}, 1000);
						} else {
							jAlert("Bạn chưa hoàn tất khám cho bệnh nhân",
									'Cảnh báo');
						}
					});
			}
		}
	}

	$("#btnInDonthuoc").click(function() {
		intoathuocA5("list_thuocbhyt", "ngoaitru_toathuoc");
	});

	$("#list_benhly").jqGrid(
			{
				//url : 'laydanhmucicd_phu',
				//url : 'tracuubenhly?icd=' + $("#icd_tkbl").val() + '&mo_ta_benh_ly=' + $("#mo_ta_benh_ly_tkbl").val()+ '&chukhongdau=' + $("#chukhongdau_tkbl").val(),
				//datatype : "json",
				datatype: "local",
				height : 250,
				// debug: true,
				width : "600px",
				// replaceNull: true,
				colNames : [ "ICD", "Mô tả bệnh lý", "mabenhly" ],
				colModel : [ {
					name : 'icd',
					index : 'icd',
					width : '100'
				}, {
					name : 'mo_ta_benh_ly',
					index : 'mo_ta_benh_ly',
					width : '400',
					align : 'left'
				}, {
					name : 'ma_benh_ly',
					index : 'ma_benh_ly',
					hidden : true
				} ],
				rowNum : 10,
				rowList : [ 10, 20, 30 ],
				ignoreCase : true,
				pager : '#pager_benhly',
				viewrecords : true,
				//caption : "Danh mục bệnh lý",
				loadonce: false,
				jsonReader: {
		            repeatitems: false,
		            id: "id",
		            root: "rows",
		            page: "page",
		            total: "total",
		            records: "records"
		        },
				ondblClickRow : function(id) {
					if (id) {
						var ret = $("#list_benhly").jqGrid('getRowData', id);
						var layicd = $("#lay_icd").prop("checked");
						if (layicd == true) {
							$("#benhphu").val(
									$("#benhphu").val() + " - " + ret.icd);
						} else {
							$("#benhphu").val(
									$("#benhphu").val() + " - "
											+ ret.mo_ta_benh_ly);
						}
						benhly_modal.close();
						$("#benhphu").focus();

					}
				}
			});
	
	$("#btnTimKiemBenhLy").click(function(evt) {
      	 var url = 'tracuubenhly?icd=' + $("#icd_tkbl").val() + '&mo_ta_benh_ly=' + $("#mo_ta_benh_ly_tkbl").val()+ '&chukhongdau=' + $("#chukhongdau_tkbl").val();
           $("#list_benhly").jqGrid('setGridParam', {url: url, page:1, datatype: "json"}).trigger('reloadGrid');
    });
	
	$("#btnThoatTimKiemBenhLy").click(function(evt) {
		benhly_modal.close();
	});
	
	$("#icd_tkbl").keyup(function(evt) {
		if (evt.keyCode == 13) {
			 var url = 'tracuubenhly?icd=' + $("#icd_tkbl").val() + '&mo_ta_benh_ly=' + $("#mo_ta_benh_ly_tkbl").val()+ '&chukhongdau=' + $("#chukhongdau_tkbl").val();
	           $("#list_benhly").jqGrid('setGridParam', {url: url, page:1, datatype: "json"}).trigger('reloadGrid');
		}
	});
	
	$("#mo_ta_benh_ly_tkbl").keyup(function(evt) {
		if (evt.keyCode == 13) {
			 var url = 'tracuubenhly?icd=' + $("#icd_tkbl").val() + '&mo_ta_benh_ly=' + $("#mo_ta_benh_ly_tkbl").val()+ '&chukhongdau=' + $("#chukhongdau_tkbl").val();
	           $("#list_benhly").jqGrid('setGridParam', {url: url, page:1, datatype: "json"}).trigger('reloadGrid');
		}
	});
	
	$("#chukhongdau_tkbl").keyup(function(evt) {
		if (evt.keyCode == 13) {
			 var url = 'tracuubenhly?icd=' + $("#icd_tkbl").val() + '&mo_ta_benh_ly=' + $("#mo_ta_benh_ly_tkbl").val()+ '&chukhongdau=' + $("#chukhongdau_tkbl").val();
	           $("#list_benhly").jqGrid('setGridParam', {url: url, page:1, datatype: "json"}).trigger('reloadGrid');
		}
	});

	
	$("#list_benhly")
			.keypress(
					function(evt) {
						if (evt.keyCode == 13) {
							var id = $("#list_benhly").jqGrid('getGridParam',
									'selrow');
							if (id) {
								var ret = $("#list_benhly").jqGrid(
										'getRowData', id);
								var layicd = $("#lay_icd").prop("checked");
								if (layicd == true) {
									$("#benhphu").val(
											$("#benhphu").val() + " - "
													+ ret.icd);
								} else {
									$("#benhphu").val(
											$("#benhphu").val() + " - "
													+ ret.mo_ta_benh_ly);
								}

								benhly_modal.close();
								$("#benhphu").focus();
							}
						}
					});

	var benhly_modal = new jBox('Modal', {
		title : 'Danh mục bệnh lý',
		overlay : false,
		content : $('#dialog-benhly'),
		draggable : 'title'
	});

	var benhly_modal1 = new jBox('Modal', {
		title : 'Danh mục bệnh lý',
		overlay : false,
		content : $('#dialog-benhly1'),
		draggable : 'title'
	});

	$("#timkiem_icdthuongdung2").click(function() {
		$("#btnTimKiemBenhLy").click();
		benhly_modal.open();
		$("#mo_ta_benh_ly_tkbl").focus();
	});

	$("#list_benhly1").jqGrid({
		url : 'laydanhmucicd_phu2',
		datatype : "json",
		// datatype: "local",
		height : 250,
		// debug: true,
		width : "600px",
		// replaceNull: true,
		colNames : [ "ICD", "Mô tả bệnh lý", "mabenhly" ],
		colModel : [ {
			name : 'icd',
			index : 'icd',
			width : '100'
		}, {
			name : 'mo_ta_benh_ly',
			index : 'mo_ta_benh_ly',
			width : '400',
			align : 'left'
		}, {
			name : 'ma_benh_ly',
			index : 'ma_benh_ly',
			hidden : true
		} ],
		rowNum : 10,
		rowList : [ 10, 20, 30 ],
		ignoreCase : true,
		pager : '#pager_benhly1',
		viewrecords : true,
		caption : "Danh mục bệnh lý",
		loadonce : true,
		ondblClickRow : function(id) {
			if (id) {
				var ret = $("#list_benhly1").jqGrid('getRowData', id);
				$("#icd3").val(ret.icd);
				$("#benhphu2").val(ret.mo_ta_benh_ly);
			}
			benhly_modal1.close();
			$("#benhphu2").focus();

		}

	});

	$("#list_benhly1").jqGrid('navGrid', '#pager_benhly1', {
		edit : false,
		add : false,
		del : false
	});
	$("#list_benhly1").jqGrid('filterToolbar', {
		ignoreCase : true,
		stringResult : true,
		searchOnEnter : false,
		defaultSearch : "cn"
	});
	$("#list_benhly1").keypress(function(evt) {
		if (evt.keyCode == 13) {
			var id = $("#list_benhly1").jqGrid('getGridParam', 'selrow');
			if (id) {
				var ret = $("#list_benhly1").jqGrid('getRowData', id);

				$("#icd3").val(ret.icd);
				$("#benhphu2").val(ret.mo_ta_benh_ly);
			}
			benhly_modal1.close();
			$("#benhphu2").focus();
		}
	});

	$("#timkiem_icdthuongdung3").click(function() {
		benhly_modal1.open();
	});

	$("#icd2")
			.keypress(
					function(evt) {
						if (evt.keyCode == 13) {
							if ($("#icd2").val() != "") {
								var url = "laymotabenhly?icd="
										+ $("#icd2").val();
								$
										.ajax({
											url : url
										})
										.done(
												function(data) {
													if (data.trim() != "") {
														var arr = data
																.split("!!!");
														var layicd = $("#lay_icd").prop("checked");
														$("#icd2").val($("#icd2").val().toString().toUpperCase());
														if (layicd == true) {
															if ($("#benhphu").val().indexOf($("#icd2").val()) < 0) {
																if($("#benhphu").val()!=null && $("#benhphu").val()!=''){
																$("#benhphu").val($("#benhphu").val()+ "; "+ $("#icd2").val());
																}
																else{
																	$("#benhphu").val($("#icd2").val());
																}
															}
														} else {
															
															if ($("#benhphu").val().indexOf(arr[1]) < 0) {
																if($("#benhphu").val()!=null && $("#benhphu").val()!=''){
																$("#benhphu").val($("#benhphu").val()+ "; ("+ $("#icd2").val()+ ") "+ arr[1]);
																}
																else{
																	$("#benhphu").val("("+ $("#icd2").val()+ ") "+ arr[1]);
																}
															}
														}
													} else {
													}
												});
							}
							else{
								$("#giaiquyet").focus();
							}

						}
					});

	$("#chedoan").keyup(function(evt) {
		if (evt.keyCode == 13) {
			if ($("#chedoan").val() != "") {
				var url = "tenchedoan_select";
				$.post(url, {
					chedoan : $("#chedoan").val(),
					dvtt : dvtt
				}).done(function(data) {
					if (data.trim() != "") {
						if ($("#loidan").val() == "")
							$("#loidan").val(data);
						else
							$("#loidan").val($("#loidan").val() + "; " + data);
					}
				});
			}
		}
	});

	$("#chandoanyhct").keyup(function(evt) {
		if (evt.keyCode == 13) {
			$("#icd3").focus();
		}
	});

	$("#icd3").keyup(
			function(evt) {
				if (evt.keyCode == 13) {
					if ($("#icd3").val() != "") {
						var url = "laymotabenhly?icd=" + $("#icd3").val();
						$.ajax({
							url : url
						}).done(
								function(data) {
									if (data.trim() != "") {
										var arr = data.split("!!!");

										$("#icd3").val(
												$("#icd3").val().toString()
														.toUpperCase());

										if ($("#benhphu2").val()
												.indexOf(arr[1]) < 0) {
											$("#benhphu2").val(
													$("#icd3").val() + " - "
															+ arr[1]);
										}
									} else {
									}
								});
					}
					else{
						$("#giaiquyet").focus();
					}
				}
			});

	$("#cbdichvu").change(function(evt) {
		$("#dichvu").val($("#cbdichvu").val());
		change_dichvu();
	});

	$("#dichvu").keypress(function(evt) {
		$("#cbdichvu").val($("#dichvu").val());
		change_dichvu();
		if (evt.keyCode == 13) {
			$("#mach").focus();
		}
	});

	$("#cbphongkham").change(function(evt) {
		var soduocset = $("#cbphongkham option:selected").text().trim();
		var idsds = soduocset.indexOf(" - ");
		soduocset = soduocset.substring(0, idsds);
		$("#phongkham").val(soduocset);
	});

	$("#phongkham").keypress(function(evt) {
		$("#cbphongkham").val($("#phongkham").val());
		if (evt.keyCode == 13) {
			$("#dichvu").focus();
		}
	});

	$("#gioitinh").keypress(function(evt) {
		var gt = $("#gioitinh").val();
		$("#cbgioitinh").val(gt);
		if (evt.keyCode == 13) {
			$("#noidangky").focus();
		}
	});

	$("#cbgioitinh").change(function(evt) {
		var gt = $("#cbgioitinh").val();
		$("#gioitinh").val(gt);
	});

	$("#cbgiaiquyet").change(function(evt) {
		$("#giaiquyet").val($("#cbgiaiquyet").val());
		change_huonggiaiquyet();
	});

	$("#giaiquyet").val($("#cbgiaiquyet").val());

	$("#giaiquyet").keypress(function(evt) {
		if (evt.keyCode == 13) {
			$("#cbgiaiquyet").val($("#giaiquyet").val());
			change_huonggiaiquyet();
			$("#sobienlai").focus();
		}
	});
	
	$("#sobienlai").keypress(function(evt) {
		if (evt.keyCode == 13) {
			$("#btnLuu").doclick();
		}
	});

	$("#mayte").keypress(function(evt) {
		if (evt.keyCode == 13) {
			if ($("#mayte").val() != "") {
				timkiem_benhnhan($("#mayte").val());
			}
			$("#hoten").focus();
		}
	});

	$("#noidangky").keypress(function(evt) {
		loadnoidangky();

		if (evt.keyCode == 13) {
			$("#sonha").focus();
		}
	});
	
	$("#sonha").keypress(function(evt) {

		if (evt.keyCode == 13) {
			$("#diachi").focus();
		}
	});
	
	$("#tungay").keypress(function(evt) {
		if (evt.keyCode == 13) {
			$("#denngay").focus();
		}
	});
	
	$("#denngay").keypress(function(evt) {
		if (evt.keyCode == 13) {
			$("#dantoc").focus();
		}
	});
	
	$("#namsinh").keypress(function(evt) {
		if (evt.keyCode == 13) {
			if($("#namsinh").val()!= null && $("#namsinh").val()!=""){
			$("#gioitinh").focus();
			}
			else{
					$("#tuoi").focus();
			}
		}
	});

	$("#chieucao").change(function(evt) {
		loadchiso();
	});

	$("#cannang").change(function(evt) {
		loadchiso();
	});
	
    $("#sobhyt").focusout(function(){
    	$("#sobhyt").val($("#sobhyt").val().trim().toUpperCase());
    	var sobhyt = $("#sobhyt").val().trim().toUpperCase();
    	$("#tlmiengiam").val(0);
			if ((sobhyt.length == 15) && (sobhyt.indexOf("_") < 0)) {
				kt_bhyt(sobhyt);
			}
			else if((sobhyt.length > 15) && (sobhyt.indexOf("|") > -1)){
	            var sobhyt_catchuoi = sobhyt.split("|");
	            $("#sobhyt").val(sobhyt_catchuoi[0].trim());
	            $("#hoten").val(convert_utf8totext(sobhyt_catchuoi[1]));
	            $("#hoten").val($("#hoten").val().toUpperCase());
	            $("#namsinh").val(sobhyt_catchuoi[2]);
	            $("#gioitinh").val(sobhyt_catchuoi[3] == "1" ? "1" : "0");
	            $("#cbgioitinh").val(sobhyt_catchuoi[3] == "1" ? "true" : "false");
	            try {
	                $("#diachi").val(convert_utf8totext(sobhyt_catchuoi[4]));
	            } catch (e) {
	                $("#diachi").val("");
	            }
	            var noidk = sobhyt_catchuoi[5].trim().replace(" - ", "");
	            $("#noidangky").val(noidk);
	            $("#cbnoidangky").val(noidk);
	            $("#tungay").val(sobhyt_catchuoi[6]);
	            $("#denngay").val(sobhyt_catchuoi[7]);
	            $("#nguoilienhe").val(sobhyt_catchuoi[10].trim().replace(/\-/g, ""));
	            $("#namsinh").change();
	            $("#sobhyt").val(sobhyt.toLocaleUpperCase());
	            kt_bhyt($("#sobhyt").val().trim().toUpperCase());
			}
       });

	$("#sobhyt").keyup(function(evt) {
		if(evt.keyCode == 13){
			$("#hoten").focus();
	}
	});

	$("#namsinh").change(
			function(evt) {
				var namsinh = $("#namsinh").val();
				
				// alert(namsinh);
				if (namsinh.length == 10 && namsinh.indexOf("d") == "-1"
						&& namsinh.indexOf("m") == "-1"
						&& namsinh.indexOf("y") == "-1") {
					var namsinharr = $("#namsinh").val().split('/');
					var tuoi = getDate(ngayhientai).getFullYear()
							- namsinharr[2];
					if (tuoi < 0) {
						jAlert("Năm sinh không đúng!", 'Cảnh báo', function() {
							$("#namsinh").val(
									namsinharr[0] + '/' + namsinharr[1]
											+ '/yyyy');
							$("#namsinh").focus();
						});
						$("#namsinh").focus();
					} else {
						var thang_kc = monthDiff(getDate(namsinh),
								getDate(ngayhientai));
						if (thang_kc < 72) {
							$("#tuoi").val("0");
							$("#thang").val(thang_kc);
						} else {
							$("#tuoi").val(tuoi);
							$("#thang").val("0");
						}

						if (tuoi == 0 && thang_kc == 0) {
							$("#tuoi").val(tuoi);
							$("#thang").val("1");
						}
					}
				} else {
					return false;
				}
			});

	$("#btnLuu")
			.click(
					function(evt) {
						$("#btnLuu").attr("disabled", true);
						$("#btnLuu").addClass("button_disabled");
						$("#btnLuu").removeClass("button_shadow");
						var value = 0;
						var icd = $("#icd").val().trim();
						
						if (icd == "") {
							jAlert("Bệnh chính ICD không được trống", 'Cảnh báo',
									function(r) {
										$("#icd").focus();
									});
						}
						else{
				        var url = "checkicd";
				        $.post(url, {
				            icd: icd
				        }).done(function(data) {
				        	value = data;
				        
				        if(value == 0){
				        	jAlert("Bệnh chính ICD không đúng !", 'Cảnh báo',
									function(r) {
										$("#icd").focus();
									});
				        }
				        else{
						if (bool_them == "them") {
							var mayte = $("#mayte").val();
							if (mayte == "")
								mayte = "0";
							var hoten = $("#hoten").val().trim();
							var ngaysinh = $("#namsinh").val().trim();
							var ngaykham = $("#ngaytiepnhan").val().trim();
							if (ngaysinh !== "") {
								var ngaysinh_arr = ngaysinh.split("/");
								var namsinh = ngaysinh_arr[2];
							}
							var diachi = $("#diachi").val();
							var arr = [ diachi, namsinh, mayte, hoten ];
							if(ngaykham == null || ngaykham ==""){
								jAlert("Ngày khám không được trống", 'Cảnh báo',
										function(r) {
											$("#ngaytiepnhan").focus();
										});
							}
							else if (hoten == "") {
								jAlert("Họ tên không được trống", 'Cảnh báo',
										function(r) {
											$("#hoten").focus();
										});
							} else if (diachi == "") {
								jAlert("Địa chỉ không được trống", 'Cảnh báo',
										function(r) {
											$("#diachi").focus();
										});
							} else if (ngaysinh == ""
									|| (ngaysinh.length == 10 && (ngaysinh
											.indexOf("d") >= 0
											|| ngaysinh.indexOf("m") >= 0 || ngaysinh
											.indexOf("y") >= 0))) {
								jAlert("Ngày sinh không đúng", 'Cảnh báo',
										function(r) {
											$("#diachi").focus();
										});
							}
							
							else if(($("#sobhyt").val()!= null && $("#sobhyt").val()!= "")&&
									(($("#tungay").val()== null || $("#tungay").val()== "") 
									|| ($("#denngay").val()== null || $("#denngay").val()== ""))){
								if(($("#tungay").val()== null || $("#tungay").val()== "")){
								jAlert("Từ ngày không được để trống !", 'Cảnh báo',
										function(r) {
											$("#tungay").focus();
										});
								}
								else{
									jAlert("Đến ngày không được để trống !", 'Cảnh báo',
											function(r) {
												$("#denngay").focus();
											});
								}
							}
							
							else if (hoten != "" && diachi != "") {
								var url = "kiemtratrunghoten_diachi";
								$
										.post(url, {
											url : convertArray(arr)
										})
										.done(
												function(data) {
													if ((parseInt(data) > 1)
															|| (parseInt(data) == -1)) {
														var arr1 = [ diachi,
																namsinh, hoten ];
														var url1 = "danhsachbenhnhantrung?url="
																+ convertArray(arr1);
														$(
																"#list_trung_benhnhan")
																.jqGrid(
																		'setGridParam',
																		{
																			datatype : 'json',
																			url : url1
																		})
																.trigger(
																		'reloadGrid');
														dialog_benhnhan_trung
																.open();
														return false;
													} else {
														luu_tiepnhan();
													}
												});
							}
						} 
				        }
				        });
						}
						$("#btnLuu").attr("disabled", false);
						$("#btnLuu").addClass("button_shadow");
						$("#btnLuu").removeClass("button_disabled");
					});

	function luu_tiepnhan() {
		var ngaykham = $("#ngaytiepnhan").val();
		var hoten = $("#hoten").val();
		var socmt = $("#socmt").val();
		var namsinh = convertStr_MysqlDate($("#namsinh").val());
		var tuoi = $("#tuoi").val();
		var thang = $("#thang").val();
		var gioitinh = $("#cbgioitinh").val();
		var dantoc = $("#cbdantoc").val();
		var nghenghiep = $("#cbnghenghiep").val();
		var sodt = $("#sodt").val();
		var sobhyt = $("#sobhyt").val();
		var chuoinhandang = $("#chuoinhandang").val();
		var doituongthe = $("#doituongthe").val();
		var tlmiengiam = $("#tlmiengiam").val();
		var tungay = $("#tungay").val() == "" ? "" : convertStr_MysqlDate($(
				"#tungay").val());
		var denngay = $("#denngay").val() == "" ? "" : convertStr_MysqlDate($(
				"#denngay").val());
		var noidangky = $("#noidangky").val();
		var capcuu = $("#capcuu").prop('checked');
		var khamuutien = $("#khamuutien").prop('checked');
		if (sobhyt.indexOf("CC") == 0 || sobhyt.indexOf("CK") == 0) {
			khamuutien = true;
		}
		var dungtuyen = $("#dungtuyen").prop('checked');
		if (noidangky == dvtt)
			dungtuyen = true;
		var diachi = $("#diachi").val();
		var sonha = $("#sonha").val();
		var nguoilienhe = $("#nguoilienhe").val();
		var dichvu = $("#cbdichvu").val();
		var phongkham = $("#cbphongkham").val();
		var ngoaikieu = $("#ngoaikieu").prop('checked');
		var mapx = $("#mapx").val();
		var mact = $("#mact").val();
		mact = (mact == "") ? "-1" : mact;
		mapx = (mapx == "") ? "0" : mapx;
		var mayte = $("#mayte").val();
		if (mayte == "")
			mayte = "0";
		if (thang == "")
			thang = "0";
		var mienphi = $("#mienphi").prop('checked') == true ? "1" : "0";
		var cdtuyentruoc = $("#chandoannoichuyen").val();

		// Kham benh
		// var mayte = $("#mayte").val();
		var idtiepnhan = $("#idtiepnhan").val();
		// var hoten = $("#hoten").val();
		// var tuoi = $("#tuoi").val();
		var tile = $("#tlmiengiam").val();
		var phieu = $("#sophieu").val();
		phieu = '0';

		// Cap nhat kham benh
		var idtiepnhan = $("#idtiepnhan").val();
		var mach = $("#mach").val();
		var nhietdo = $("#nhietdo").val();
		var chieucao = $("#chieucao").val();
		var creatinin = $("#creatinin").val();
		var bmi = $("#chisobmi").val();
		var nhiptho = $("#nhiptho").val();
		var huyetaptren = $("#huyetaptren").val();
		var huyetapduoi = $("#huyetapduoi").val();
		var cannang = $("#cannang").val();
		var dothanhthai = $("#dothanhthai").val();
		var kqbmi = $("#kqbmi").val();
		var kqdothanhthai = $("#kqdothanhthai").val();
		var cdtuyentruoc = "";
		var trieuchungls = $("#trieuchungls").val();
		var icd = $("#icd").val();
		var benhphu = $("#benhphu").val();
		while (benhphu.indexOf("+") >= 0) {
			benhphu = benhphu.replace("+", "=");
		}
		benhphu = benhphu.replace("+", "=");
		var cbgiaiquyet = $("#cbgiaiquyet").val();
		var songayhen = $("#songayhen").val();
		var ngayhen = convertStr_MysqlDate($("#ngayhen").val());
		var mabenhly = $("#mabenhly").val();
		var loidan = $("#loidan").val();
		var chandoan = $("#cbicd").val();
		var chandoantuyentruoc = $("#chandoantuyentruoc").val();
		var lydochuyentt = $("input[name=lydochuyentt]:checked").val();
//		var tainanthuongtich = "0";
		var tainanthuongtich = $("#tainanthuongtich").val();
		var chandoanbhyt = $("#chandoanyhct").val();
		var chandoannguyennhan = $("#benhphu2").val();
		var namsinhcheck = $("#checknamsinh").prop('checked')==true?"1":"0";

		// Nhan khau
		var id_nhan_khau = $("#id_nhan_khau").val();
		if(idtiepnhan == null || idtiepnhan ==''){
		var str = [ hoten, socmt, namsinh, tuoi, thang, gioitinh, dantoc,
				nghenghiep, sodt, sobhyt, chuoinhandang, doituongthe,
				tlmiengiam, tungay, denngay, noidangky, capcuu, khamuutien,
				dungtuyen, diachi, sonha, nguoilienhe, dichvu, phongkham,
				ngoaikieu, mapx, mact, "0", mayte, mienphi, cdtuyentruoc, "0",
				idtiepnhan, hoten, tuoi, tile, phieu, mayte,
				// idtiepnhan,
				mach, nhiptho, nhietdo, huyetaptren, huyetapduoi, chieucao,
				cannang, creatinin, bmi, dothanhthai, kqbmi, kqdothanhthai,
				cdtuyentruoc, trieuchungls, benhphu, cbgiaiquyet, songayhen,
				ngayhen, mabenhly, loidan, icd, chandoantuyentruoc,
				lydochuyentt, chandoanbhyt, chandoannguyennhan,
				tainanthuongtich, id_nhan_khau, 1,ngaykham,namsinhcheck];
		if (ktloi() == true) {
			$("#btnLuu").attr("disabled", true);
			$("#btnLuu").addClass("button_disabled");
			$("#btnLuu").removeClass("button_shadow");
			var url = "themkhambenhtyt";
			$
					.post(url, {
						url : convertArray(str)
					})
					.done(
							function(field) {
								$("#btnLuu").attr("disabled", false);
								$("#btnLuu").addClass("button_shadow");
								$("#btnLuu").removeClass("button_disabled");
								//console.log("field=" + field);
								if (field.SAISOT.toString() == "-1") {
									jAlert("Thẻ BHYT chưa có hiệu lực",
											'Cảnh báo');
								} else if (field.SAISOT.toString() == "-2") {
									if (capcuu.toString() == "false") {
										jAlert(
												"Bệnh nhân đã tiếp nhận trong ngày.",
												'Cảnh báo');
									} else {
										jConfirm(
												'Bệnh nhân đã tiếp nhận trong ngày. Chỉ tiếp nhận thêm được khi cấp cứu bệnh nhân.',
												'Thông báo',
												function(r) {
													if (r.toString() == "true") {
														var str = [
																hoten,
																socmt,
																namsinh,
																tuoi,
																thang,
																gioitinh,
																dantoc,
																nghenghiep,
																sodt,
																sobhyt,
																chuoinhandang,
																doituongthe,
																tlmiengiam,
																tungay,
																denngay,
																noidangky,
																capcuu,
																khamuutien,
																dungtuyen,
																diachi,
																sonha,
																nguoilienhe,
																dichvu,
																phongkham,
																ngoaikieu,
																mapx,
																mact,
																"1",
																mayte,
																mienphi,
																cdtuyentruoc,
																"0",
																idtiepnhan,
																hoten,
																tuoi,
																tile,
																phieu,
																mayte,
																// idtiepnhan,
																mach,
																nhiptho,
																nhietdo,
																huyetaptren,
																huyetapduoi,
																chieucao,
																cannang,
																creatinin,
																bmi,
																dothanhthai,
																kqbmi,
																kqdothanhthai,
																cdtuyentruoc,
																trieuchungls,
																benhphu,
																cbgiaiquyet,
																songayhen,
																ngayhen,
																mabenhly,
																loidan,
																icd,
																chandoantuyentruoc,
																lydochuyentt,
																chandoanbhyt,
																chandoannguyennhan,
																tainanthuongtich,
																id_nhan_khau, 1,ngaykham,namsinhcheck];
														var url = "themkhambenhtyt";
														$
																.post(
																		url,
																		{
																			url : convertArray(str)
																		})
																.done(
																		function(
																				field) {
																			if (icd != "") {
														                        var arr1 = [mabenhly, icd, chandoan, nhanvien, dvtt];
														                        var url1 = "icdthuongdung_insert?url=" + convertArray(arr1);
														                        $.ajax({
														                            url: url1
														                        });
														                    }
																			$("#mayte").val(field.MA_BENH_NHAN);
																			$("#idtiepnhan").val(field.ID_TIEPNHAN);
																			kb_lay_thongtin_khambenh_tyt();
																		});
													}
												});
									}
								} else if (field.SAISOT.toString() == "0") {
									if (field.DA_TIEPNHANTAIDVKHAC.toString() == "-4") {// da tiep nhan don vi khac
										jConfirm(
												'Bệnh nhân đã được tiếp nhận tại đơn vị khác. Có tiếp tục tiếp nhận',
												'Thông báo',
												function(d) {
													if (d.toString() == "true") {
														var str = [
																hoten,
																socmt,
																namsinh,
																tuoi,
																thang,
																gioitinh,
																dantoc,
																nghenghiep,
																sodt,
																sobhyt,
																chuoinhandang,
																doituongthe,
																tlmiengiam,
																tungay,
																denngay,
																noidangky,
																capcuu,
																khamuutien,
																dungtuyen,
																diachi,
																sonha,
																nguoilienhe,
																dichvu,
																phongkham,
																ngoaikieu,
																mapx,
																mact,
																"4",
																mayte,
																mienphi,
																cdtuyentruoc,
																"0",
																idtiepnhan,
																hoten,
																tuoi,
																tile,
																phieu,
																mayte,
																// idtiepnhan,
																mach,
																nhiptho,
																nhietdo,
																huyetaptren,
																huyetapduoi,
																chieucao,
																cannang,
																creatinin,
																bmi,
																dothanhthai,
																kqbmi,
																kqdothanhthai,
																cdtuyentruoc,
																trieuchungls,
																benhphu,
																cbgiaiquyet,
																songayhen,
																ngayhen,
																mabenhly,
																loidan,
																icd,
																chandoantuyentruoc,
																lydochuyentt,
																chandoanbhyt,
																chandoannguyennhan,
																tainanthuongtich,
																id_nhan_khau, 1,ngaykham,namsinhcheck];
														var url = "themkhambenhtyt";
														$("#btnLuu").attr(
																"disabled",
																true);
														$("#btnLuu")
																.addClass(
																		"button_disabled");
														$("#btnLuu")
																.removeClass(
																		"button_shadow");
														$
																.post(
																		url,
																		{
																			url : convertArray(str)
																		})
																.done(
																		function(
																				field) {
																			if (icd != "") {
														                        var arr1 = [mabenhly, icd, chandoan, nhanvien, dvtt];
														                        var url1 = "icdthuongdung_insert?url=" + convertArray(arr1);
														                        $.ajax({
														                            url: url1
														                        });
														                    }
																			$("#mayte").val(field.MA_BENH_NHAN);
																			$("#idtiepnhan").val(field.ID_TIEPNHAN);
																			kb_lay_thongtin_khambenh_tyt();});
													}
												});										
										
									} else if (field.CONTHUOC.toString() == "-3") {// con thuoc
										
										jConfirm(
												'Bệnh nhân vẫn còn thuốc. Nhấn tiếp tục để tiếp nhận bệnh nhân.',
												'Thông báo',
												function(d) {
													if (d.toString() == "true") {
														var str = [
																hoten,
																socmt,
																namsinh,
																tuoi,
																thang,
																gioitinh,
																dantoc,
																nghenghiep,
																sodt,
																sobhyt,
																chuoinhandang,
																doituongthe,
																tlmiengiam,
																tungay,
																denngay,
																noidangky,
																capcuu,
																khamuutien,
																dungtuyen,
																diachi,
																sonha,
																nguoilienhe,
																dichvu,
																phongkham,
																ngoaikieu,
																mapx,
																mact,
																"3",
																mayte,
																mienphi,
																cdtuyentruoc,
																"0",
																idtiepnhan,
																hoten,
																tuoi,
																tile,
																phieu,
																mayte,
																// idtiepnhan,
																mach,
																nhiptho,
																nhietdo,
																huyetaptren,
																huyetapduoi,
																chieucao,
																cannang,
																creatinin,
																bmi,
																dothanhthai,
																kqbmi,
																kqdothanhthai,
																cdtuyentruoc,
																trieuchungls,
																benhphu,
																cbgiaiquyet,
																songayhen,
																ngayhen,
																mabenhly,
																loidan,
																icd,
																chandoantuyentruoc,
																lydochuyentt,
																chandoanbhyt,
																chandoannguyennhan,
																tainanthuongtich,
																id_nhan_khau, 1,ngaykham,namsinhcheck];
														var url = "themkhambenhtyt";
														$("#btnLuu").attr(
																"disabled",
																true);
														$("#btnLuu")
																.addClass(
																		"button_disabled");
														$("#btnLuu")
																.removeClass(
																		"button_shadow");
														$
																.post(
																		url,
																		{
																			url : convertArray(str)
																		})
																.done(
																		function(
																				field) {
																			if (icd != "") {
														                        var arr1 = [mabenhly, icd, chandoan, nhanvien, dvtt];
														                        var url1 = "icdthuongdung_insert?url=" + convertArray(arr1);
														                        $.ajax({
														                            url: url1
														                        });
														                    }
																			$("#mayte").val(field.MA_BENH_NHAN);
																			$("#idtiepnhan").val(field.ID_TIEPNHAN);
																			kb_lay_thongtin_khambenh_tyt();
																		});
													}
												});
									} else {
										if (icd != "") {
					                        var arr1 = [mabenhly, icd, chandoan, nhanvien, dvtt];
					                        var url1 = "icdthuongdung_insert?url=" + convertArray(arr1);
					                        $.ajax({
					                            url: url1
					                        });
					                    }
										$("#mayte").val(field.MA_BENH_NHAN);
										$("#idtiepnhan").val(field.ID_TIEPNHAN);
										kb_lay_thongtin_khambenh_tyt();
									}
								}
								
								else if (field.SAISOT.toString() == "-3"){
									
									$(function() {
									    $("<div />").attr("id", "dialog-confirm30").append(
									        $("<p />").text('Bệnh nhân đã khám trong vòng 30 ngày. Có tiếp tục tiếp nhận!').css("text-align", "center").prepend(
									        )
									    ).dialog({
									        resizable: false,
									        modal: true,
									        title: "Thông báo",
									        width : 500,
									        buttons: {
									            "OK": function() {
													var str = [
													hoten,
													socmt,
													namsinh,
													tuoi,
													thang,
													gioitinh,
													dantoc,
													nghenghiep,
													sodt,
													sobhyt,
													chuoinhandang,
													doituongthe,
													tlmiengiam,
													tungay,
													denngay,
													noidangky,
													capcuu,
													khamuutien,
													dungtuyen,
													diachi,
													sonha,
													nguoilienhe,
													dichvu,
													phongkham,
													ngoaikieu,
													mapx,
													mact,
													"2",
													mayte,
													mienphi,
													cdtuyentruoc,
													"0",
													idtiepnhan,
													hoten,
													tuoi,
													tile,
													phieu,
													mayte,
													// idtiepnhan,
													mach,
													nhiptho,
													nhietdo,
													huyetaptren,
													huyetapduoi,
													chieucao,
													cannang,
													creatinin,
													bmi,
													dothanhthai,
													kqbmi,
													kqdothanhthai,
													cdtuyentruoc,
													trieuchungls,
													benhphu,
													cbgiaiquyet,
													songayhen,
													ngayhen,
													mabenhly,
													loidan,
													icd,
													chandoantuyentruoc,
													lydochuyentt,
													chandoanbhyt,
													chandoannguyennhan,
													tainanthuongtich,
													id_nhan_khau, 1,ngaykham,namsinhcheck];
											var url = "themkhambenhtyt";
											$("#btnLuu").attr(
													"disabled",
													true);
											$("#btnLuu")
													.addClass(
															"button_disabled");
											$("#btnLuu")
													.removeClass(
															"button_shadow");
											$
													.post(
															url,
															{
																url : convertArray(str)
															})
													.done(
															function(
																	field) {
																if (field.SAISOT.toString() == "0") {
																	if (field.DA_TIEPNHANTAIDVKHAC.toString() == "-4") {// da tiep nhan don vi khac
																		jConfirm(
																				'Bệnh nhân đã được tiếp nhận tại đơn vị khác. Có tiếp tục tiếp nhận',
																				'Thông báo',
																				function(d) {
																					if (d.toString() == "true") {
																						var str = [
																								hoten,
																								socmt,
																								namsinh,
																								tuoi,
																								thang,
																								gioitinh,
																								dantoc,
																								nghenghiep,
																								sodt,
																								sobhyt,
																								chuoinhandang,
																								doituongthe,
																								tlmiengiam,
																								tungay,
																								denngay,
																								noidangky,
																								capcuu,
																								khamuutien,
																								dungtuyen,
																								diachi,
																								sonha,
																								nguoilienhe,
																								dichvu,
																								phongkham,
																								ngoaikieu,
																								mapx,
																								mact,
																								"4",
																								mayte,
																								mienphi,
																								cdtuyentruoc,
																								"0",
																								idtiepnhan,
																								hoten,
																								tuoi,
																								tile,
																								phieu,
																								mayte,
																								// idtiepnhan,
																								mach,
																								nhiptho,
																								nhietdo,
																								huyetaptren,
																								huyetapduoi,
																								chieucao,
																								cannang,
																								creatinin,
																								bmi,
																								dothanhthai,
																								kqbmi,
																								kqdothanhthai,
																								cdtuyentruoc,
																								trieuchungls,
																								benhphu,
																								cbgiaiquyet,
																								songayhen,
																								ngayhen,
																								mabenhly,
																								loidan,
																								icd,
																								chandoantuyentruoc,
																								lydochuyentt,
																								chandoanbhyt,
																								chandoannguyennhan,
																								tainanthuongtich,
																								id_nhan_khau, 1,ngaykham,namsinhcheck];
																						var url = "themkhambenhtyt";
																						$("#btnLuu").attr(
																								"disabled",
																								true);
																						$("#btnLuu")
																								.addClass(
																										"button_disabled");
																						$("#btnLuu")
																								.removeClass(
																										"button_shadow");
																						$
																								.post(
																										url,
																										{
																											url : convertArray(str)
																										})
																								.done(
																										function(
																												field) {
																											if (icd != "") {
																						                        var arr1 = [mabenhly, icd, chandoan, nhanvien, dvtt];
																						                        var url1 = "icdthuongdung_insert?url=" + convertArray(arr1);
																						                        $.ajax({
																						                            url: url1
																						                        });
																						                    }
																											$("#mayte").val(field.MA_BENH_NHAN);
																											$("#idtiepnhan").val(field.ID_TIEPNHAN);
																											kb_lay_thongtin_khambenh_tyt();});
																					}
																				});										
																		
																	} else if (field.CONTHUOC.toString() == "-3") {// con thuoc
																		
																		jConfirm(
																				'Bệnh nhân vẫn còn thuốc. Nhấn tiếp tục để tiếp nhận bệnh nhân.',
																				'Thông báo',
																				function(d) {
																					if (d.toString() == "true") {
																						var str = [
																								hoten,
																								socmt,
																								namsinh,
																								tuoi,
																								thang,
																								gioitinh,
																								dantoc,
																								nghenghiep,
																								sodt,
																								sobhyt,
																								chuoinhandang,
																								doituongthe,
																								tlmiengiam,
																								tungay,
																								denngay,
																								noidangky,
																								capcuu,
																								khamuutien,
																								dungtuyen,
																								diachi,
																								sonha,
																								nguoilienhe,
																								dichvu,
																								phongkham,
																								ngoaikieu,
																								mapx,
																								mact,
																								"3",
																								mayte,
																								mienphi,
																								cdtuyentruoc,
																								"0",
																								idtiepnhan,
																								hoten,
																								tuoi,
																								tile,
																								phieu,
																								mayte,
																								// idtiepnhan,
																								mach,
																								nhiptho,
																								nhietdo,
																								huyetaptren,
																								huyetapduoi,
																								chieucao,
																								cannang,
																								creatinin,
																								bmi,
																								dothanhthai,
																								kqbmi,
																								kqdothanhthai,
																								cdtuyentruoc,
																								trieuchungls,
																								benhphu,
																								cbgiaiquyet,
																								songayhen,
																								ngayhen,
																								mabenhly,
																								loidan,
																								icd,
																								chandoantuyentruoc,
																								lydochuyentt,
																								chandoanbhyt,
																								chandoannguyennhan,
																								tainanthuongtich,
																								id_nhan_khau, 1,ngaykham,namsinhcheck];
																						var url = "themkhambenhtyt";
																						$("#btnLuu").attr(
																								"disabled",
																								true);
																						$("#btnLuu")
																								.addClass(
																										"button_disabled");
																						$("#btnLuu")
																								.removeClass(
																										"button_shadow");
																						$
																								.post(
																										url,
																										{
																											url : convertArray(str)
																										})
																								.done(
																										function(
																												field) {
																											if (icd != "") {
																						                        var arr1 = [mabenhly, icd, chandoan, nhanvien, dvtt];
																						                        var url1 = "icdthuongdung_insert?url=" + convertArray(arr1);
																						                        $.ajax({
																						                            url: url1
																						                        });
																						                    }
																											$("#mayte").val(field.MA_BENH_NHAN);
																											$("#idtiepnhan").val(field.ID_TIEPNHAN);
																											kb_lay_thongtin_khambenh_tyt();
																										});
																					}
																				});
																	} else {
																		if (icd != "") {
													                        var arr1 = [mabenhly, icd, chandoan, nhanvien, dvtt];
													                        var url1 = "icdthuongdung_insert?url=" + convertArray(arr1);
													                        $.ajax({
													                            url: url1
													                        });
													                    }
																		$("#mayte").val(field.MA_BENH_NHAN);
																		$("#idtiepnhan").val(field.ID_TIEPNHAN);
																		kb_lay_thongtin_khambenh_tyt();
																	}
																}
																else{
																if (icd != "") {
											                        var arr1 = [mabenhly, icd, chandoan, nhanvien, dvtt];
											                        var url1 = "icdthuongdung_insert?url=" + convertArray(arr1);
											                        $.ajax({
											                            url: url1
											                        });
											                    }
																$("#mayte").val(field.MA_BENH_NHAN);
																if(field.MA_BENH_NHAN != null && field.MA_BENH_NHAN!= ""){
																	$("#mayte").attr("disabled", true);
																}
																$("#idtiepnhan").val(field.ID_TIEPNHAN);
																kb_lay_thongtin_khambenh_tyt();
																}
																});										
									                $(this).dialog("close");
									            },
									            "Cancel": function() {
									                $(this).dialog("close");
									            },
									            "Xem lịch sử":function() {
									            	$(this).dialog("close");
									                $("#btnLichSuKham").click();
									            }
									        }
									    });
									});
								}
							});
		} else {
			ktloi();
		}
		}
		else{
			if(ktloi() == true){
				var str = [ hoten, socmt, namsinh, tuoi, thang, gioitinh, dantoc,
							nghenghiep, sodt, sobhyt, chuoinhandang, doituongthe,
							tlmiengiam, tungay, denngay, noidangky, capcuu, khamuutien,
							dungtuyen, diachi, sonha, nguoilienhe, dichvu, phongkham,
							ngoaikieu, mapx, mact, "0", mayte, mienphi, cdtuyentruoc, "0",
							idtiepnhan, hoten, tuoi, tile, phieu, mayte,
							// idtiepnhan,
							mach, nhiptho, nhietdo, huyetaptren, huyetapduoi, chieucao,
							cannang, creatinin, bmi, dothanhthai, kqbmi, kqdothanhthai,
							cdtuyentruoc, trieuchungls, benhphu, cbgiaiquyet, songayhen,
							ngayhen, mabenhly, loidan, icd, chandoantuyentruoc,
							lydochuyentt, chandoanbhyt, chandoannguyennhan,
							tainanthuongtich, id_nhan_khau, 1,ngaykham,namsinhcheck];
				$("#btnLuu").attr("disabled", true);
				$("#btnLuu").addClass("button_disabled");
				$("#btnLuu").removeClass("button_shadow");
					var url = "themkhambenhtyt";
					$.post(url, {url : convertArray(str)}).done(
							function(field) {
								$("#btnLuu").attr("disabled", false);
								$("#btnLuu").addClass("button_shadow");
								$("#btnLuu").removeClass("button_disabled");
																		if (icd != "") {
					                        var arr1 = [mabenhly, icd, chandoan, nhanvien, dvtt];
					                        var url1 = "icdthuongdung_insert?url=" + convertArray(arr1);
					                        $.ajax({
					                            url: url1
					                        });
					                    }
//										kb_lay_thongtin_khambenh_tyt();
										});
			}
		}

		function ktloi() {
			if ($("#sobhyt").val().length != 15 && $("#sobhyt").val() != "") {
				// arr.push("Thẻ BHYT không đúng");
				var loi = "Thẻ BHYT không đúng";
				jAlert(loi, 'Cảnh báo', function(r) {
					$("#sobhyt").focus();
				});
				return false;
			}
			if ($("#sobhyt").val() != ""
					&& $("#sobhyt").val().length == 15
					&& ($("#tlmiengiam").val() == ""
							|| $("#tlmiengiam").val() == "0"
							|| $("#chuoinhandang").val() == ""
							|| $("#doituongthe").val() == "" || $("#sobhyt")
							.val().indexOf("_") >= 0)) {
				jAlert("Vui lòng kiểm tra lại thông tin thẻ BHYT", 'Cảnh báo',
						function(r) {
							$("#sobhyt").focus();
						});
				return false;
			}
			if ($("#sobhyt").val() != "" && $("#sobhyt").val().length == 15
					&& ($("#sobhyt").val().indexOf("_") < 0)) {
				var today = getDate(ngayhientai);// new Date();
				var ngaybatdau = getDate($("#tungay").val());
				var ngayhethan = getDate($("#denngay").val());
				var chuoind = $("#sobhyt").val().substring(0, 3).toUpperCase();
				var url1 = "kiemtrathebhyt?madt=" + chuoind;
				$.ajax({
					url : url1
				}).done(
						function(data) {
							if (data != "UNVALID") {

							} else {
								jAlert("Thẻ bảo hiểm không đúng", 'Cảnh báo',
										function(r) {
											$("#sobhyt").focus();
										});
								return false;
							}

						});
				if (ngaybatdau > today) {
					var loi = "Ngày bắt đầu có hiệu lực của BHYT chưa đến";
					jAlert(loi, 'Cảnh báo', function(r) {
						$("#tungay").focus();
					});
					return false;
				}
				if (ngayhethan < today) {
					if (($("#sobhyt").val().indexOf("TE") == "0")
							&& (parseInt($("#tuoi").val()) <= 6)
							&& (today.getMonth() < 8)) {
						return true;
					}
					var loi = "BHYT đã hết hạn";
					jAlert(loi, 'Cảnh báo', function(r) {
						$("#denngay").focus();
					});
					return false;
				}
				if (ngaybatdau >= ngayhethan) {
					var loi = "Ngày bắt đầu phải nhỏ hơn ngày kết thúc";
					jAlert(loi, 'Cảnh báo', function(r) {
						$("#denngay").focus();
					});
					return false;
				}

				if (chuoind.toUpperCase() == "TE1") {
					if ($("#nguoilienhe").val() == "") {
						jAlert("Người liên hệ không được trống", 'Cảnh báo',
								function(r) {
									$("#nguoilienhe").focus();
								});
						return false;
					}
				}
				if ($("#sobhyt").val().trim() != "" || $("#sobhyt").val() !=null) {
					if($("#noidangky").val() == "" || $("#cbnoidangky").val() == ""){
					jAlert(
							"Nơi đăng ký khám chữa bệnh ban đầu chưa đúng. Vui lòng kiểm tra lại",
							'Cảnh báo', function(r) {
								$("#noidangky").focus();
							});
					return false;
					}
				}
			}
			if ($("#hoten").val() == "") {
				var loihoten = "Họ tên không được trống";
				jAlert(loihoten, 'Cảnh báo', function(r) {
					$("#hoten").focus();
				});
				return false;
			}
			if ($("#namsinh").val() == "") {
				var loinamsinh = "Năm sinh không được trống";
				jAlert(loinamsinh, 'Cảnh báo', function(r) {
					$("#namsinh").focus();
				});
				return false;
			}
			if ($("#namsinh").val().indexOf("d") != "-1"
					|| $("#namsinh").val().indexOf("m") != "-1"
					|| $("#namsinh").val().indexOf("y") != "-1") {
				var loinamsinh = "Năm sinh không hợp lệ";
				jAlert(loinamsinh, 'Cảnh báo', function(r) {
					$("#namsinh").focus();
				});
				return false;
			}
			if ($("#diachi").val() == "") {
				var loidiachi = "Địa chỉ không được trống";
				jAlert(loidiachi, 'Cảnh báo', function(r) {
					$("#diachi").focus();
				});
				return false;
			}
			if ($("#dichvu").val() == "") {
				var loidiachi = "Dịch vụ khám chưa có";
				jAlert(loidiachi, 'Cảnh báo', function(r) {
					$("#dichvu").focus();
				});
				return false;
			}
			if ($("#phongkham").val() == "") {
				var loidiachi = "Phòng khám chưa có";
				jAlert(loidiachi, 'Cảnh báo', function(r) {
					$("#phongkham").focus();
				});
				return false;
			}
			return true;
		}
	}
	;

	$("#btnThanhToan")
			.click(
					function(evt) {
						if ($("#mayte").val() != "") {
							if (batbuocbienlai == 1
									&& $("#sobienlai").val().trim() == "") {
								jAlert("Phải nhập số biên lai!", 'Thông báo');
							} else {
								$('#list_chitietthanhtoan').jqGrid(
										'clearGridData');
								var idtiepnhan = $("#idtiepnhan").val();
								var sotienthantoan = $("#sotientt").val()
										.replace(/,/g, "");
								var sotientra = $("#sotientra").val().replace(
										/,/g, "");
								var sotienthoi = 0;
								var thanhtoandaodong = "false";
								var sobienlai = $("#sobienlai").val();
								var ghichu = " ";
								var ngay = convertStr_MysqlDate($(
										"#ngaytiepnhan").val());
								var sophieu = $("#sophieuthanhtoan").val();
								var dvtt = $("#dvtt").val();
								var sotienbenhnhanphaitt = $(
										"#sotienbenhnhanphaitt").val();
								if ($("#sobhyt").val() == null || $("#sobhyt").val() == "") {
									var arr = [ idtiepnhan, nhanvien,
											sotienthantoan, sotientra,
											sotienthoi, thanhtoandaodong,
											sobienlai, ghichu, dvtt, ngay ];

									var url = "themlantt_khongbhyt";
									$
											.post(url, {
												url : convertArray(arr)
											})
											.done(
													function(data) {
														if (data != "") {
															$("#lantt").val(
																	data);
															$("#sotiendatra")
																	.val(
																			$(
																					"#sotientra")
																					.val());
															load_gridchitietthanhtoan('true');
														}
													});
								} else {
									var arr = [ sophieu, nhanvien,
											sotienthantoan, sotientra,
											sotienthoi, thanhtoandaodong,
											sobienlai, ghichu, dvtt,
											sotienbenhnhanphaitt ];
									var url = "themlantt_cobhyt_giamtai";
									$
											.post(url, {
												url : convertArray(arr)
											})
											.done(
													function(data) {
														if (data != "") {
															$("#lantt").val(
																	data);

															$("#sotiendatra")
																	.val(
																			$(
																					"#sotientra")
																					.val());
															load_gridchitietthanhtoan('true');
														}
													});
								}
							}
						}
					});

	$("#btnHuyThanhToan")
			.click(
					function(evt) {
						if ($("#mayte").val() != "") {
							var idtiepnhan = $("#idtiepnhan").val();
							var lantt = $("#lantt").val();
							var sophieu = $("#sophieuthanhtoan").val();
							var dvtt = $("#dvtt").val();
							if ($("#sobhyt").val() == null || $("#sobhyt").val() == "") {
								var arr = [ lantt, dvtt, idtiepnhan ];
								var url = "huylantt_khongbhyt_tyt";
								$
										.post(url, {
											url : convertArray(arr)
										})
										.done(
												function(data) {
														$("#lantt").val(data);
														$("#sotiendatra").val(
																"0");
														load_gridchitietthanhtoan('false');
												});
							} else {
								var arr = [ lantt, dvtt, sophieu, idtiepnhan ];
								var url = "huylantt_cobhyt";
								$
										.post(url, {
											url : convertArray(arr)
										})
										.done(
												function(data) {
													if (data == "1") {
														jAlert(
																"Bệnh nhân đã được xuất thuốc. Vui lòng hủy xuất thuốc trước.",
																'Thông báo');
													} else {
														var url2 = "solanthanhtoan_cobhyt?idtiepnhan="
																+ idtiepnhan
																+ "&dvtt="
																+ dvtt + "";

														$
																.getJSON(
																		url2,
																		function(
																				result) {
																			$
																					.each(
																							result,
																							function(
																									i,
																									field) {
																							});
																			$(
																					"#lantt")
																					.val(
																							data);
																			$(
																					"#sotiendatra")
																					.val(
																							"0");
																			load_gridchitietthanhtoan('false');
																		});
													}
												});
							}
						}
					});
});

/* Lấy thông tin khám bệnh */
function kb_lay_thongtin_khambenh_tyt() {
	var id_tiepnhan = $('#idtiepnhan').val();
	enableNgayKham();
	if (id_tiepnhan != null) {

		var url = "kblaythongtinkhambenhtyt?id_tiepnhan=" + id_tiepnhan
				+ "&dvtt=" + dvtt;
		$
				.getJSON(
						url,
						function(result) {
							$
									.each(
											result,
											function(i, field) {

												$("#thanhtoan").val(
														field.THANH_TOAN);
												// Thong tin tiep nhan
												var $frm = $("form#form_kb");
												loadtt_xn(field);
												loadtt_ttpt(field);
												loadtt_cdha(field);
												trangthaikham = field.TRANG_THAI;
												checkButtonHoanTatKham(field.TRANG_THAI);
												$("#sophieu").val(field.SO_TIEP_NHAN_PB);
												$("#id_nhan_khau").val(field.ID_NHAN_KHAU);
												$("#cbnghenghiep").val(field.MA_NGHE_NGHIEP);
												$("#nghenghiep").val(field.MA_NGHE_NGHIEP);
												$("#sonha").val(field.SO_NHA);
												$("#dantoc").val(field.MA_DANTOC);
												$("#cbdantoc").val(field.MA_DANTOC);
												$("#cbdantoc").val(field.MA_DANTOC);
												$("#tainanthuongtich").val(field.TAINANTHUONGTICH);
												$frm
														.find(
																"input[name='ngaytiepnhan']")
														.val(
																field.NGAY_TIEP_NHAN);
												$frm
														.find(
																"input[name='mayte']")
														.val(field.MA_BENH_NHAN);
												$frm
														.find(
																"input[name='hoten']")
														.val(
																field.TEN_BENH_NHAN.toUpperCase());
												$frm
														.find(
																"input[name='malankham']")
														.val(field.ID_TIEPNHAN);
												$frm.find("input[name='tuoi']")
														.val(field.TUOI);
												$frm
														.find(
																"input[name='thang']")
														.val(field.THANG);
												// $frm.find("input[name='sophieu']").val(field.SO_TIEP_NHAN_PB);
												$frm
														.find(
																"input[name='sotthangngay']")
														.val(field.STT_HANGNGAY);
												$frm
														.find(
																"input[name='namsinh']")
														.val(
																field.NGAY_SINH);
												$frm
														.find(
																"input[name='gioitinh']")
														.val(field.GIOI_TINH);
//												$frm
//												.find(
//														"input[name='cbgioitinh']")
//												.val(field.GIOI_TINH);
												$("#cbgioitinh").val(field.GIOI_TINH);
												$frm.find(
														"input[name='diachi']")
														.val(field.DIA_CHI);
												$frm
														.find(
																"input[name='noidangky']")
														.val(
																field.NOIDANGKY_KCB);
//												$frm
//														.find(
//																"input[name='cbnoidangky']")
//														.val(
//																field.NOIDANGKY_KCB);
//												$("#cbnoidangky").val(field.NOIDANGKY_KCB);
												loadnoidangky();
												$frm.find(
														"input[name='tungay']")
														.val(field.NGAY_BATDAU);
												$frm
														.find(
																"input[name='denngay']")
														.val(field.NGAY_HETHAN);
												$frm.find(
														"input[name='sobhyt']")
														.val(field.SO_THE_BHYT);
												// ThaiPH
												$("#lantt")
														.val(field.STT_LANTT);
												$("#sophieuthanhtoan").val(
														field.SOPHIEUTHANHTOAN);
												// ThaiPH END
												if (field.SO_THE_BHYT != ""
														&& field.SO_THE_BHYT != null)
													kt_doituongthe(field.SO_THE_BHYT);
												$("#khamsuckhoe")
														.val(field.KSK);
												$frm
														.find(
																"input[name='doituong']")
														.val(
																field.TEN_DOI_TUONG_BHYT);
												$frm
														.find(
																"input[name='tlmiengiam']")
														.val(
																field.TI_LE_MIEN_GIAM);
												// $("#songay_hd").val("");
												$frm.find(
														"input[name='dichvu']")
														.val(field.MA_DV);
												$frm
														.find(
																"select[name='cbdichvu']")
														.val(field.MA_DV);
												change_dichvu();
												$frm
														.find(
																"select[name='cbphongkham']")
														.val(
																field.MA_PHONG_BENH);
												
												var soduocset = $("#cbphongkham option:selected").text().trim();
												var idsds = soduocset.indexOf(" - ");
												soduocset = soduocset.substring(0, idsds);
												$("#phongkham").val(soduocset);
												
												$("#dungtuyen")
												.prop(
														'checked',
														field.DUNG_TUYEN
																.toString() == "1" ? true
																: false);

												$("#checknamsinh")
														.prop(
																'checked',
																field.NAM_SINH
																		.toString() == "1" ? true
																		: false);

												if (field.KSK == "Yes") {
													$('#lskham').attr(
															'disabled', true);
													$("#lskham").removeClass(
															"button_shadow");
													$("#lskham").addClass(
															"button_disabled");
													$(
															'#tabs :input[type=button]')
															.attr('disabled',
																	true);
													$(
															"#tabs :input[type=button]")
															.removeClass(
																	"button_shadow");
													$(
															"#tabs :input[type=button]")
															.addClass(
																	"button_disabled");
												} else {
													$(
															'#tabs :input[type=button]')
															.attr('disabled',
																	false);
													$(
															"#tabs :input[type=button]")
															.removeClass(
																	"button_disabled");
													$(
															"#tabs :input[type=button]")
															.addClass(
																	"button_shadow");
													$('#lskham').attr(
															'disabled', false);
													$("#lskham").addClass(
															"button_shadow");
													$("#lskham").removeClass(
															"button_disabled");
												}
												var ttkham = $(
														"form input[name=trangthaikham]:checked")
														.val();
												var url_songaybhyt = "songayconbhyt?idtiepnhan="
														+ field.ID_TIEPNHAN
														+ "&dvtt=" + dvtt;
												$.ajax({
													url : url_songaybhyt
												}).done(function(data) {
													// $(".songayconbhyt").text(data);
													$("#songaybhyt").val(data);
												});

												// Thong tin kham benh
												$("#mach").val(field.MACH);
												$("#nhiptho").val(
														field.NHIEPTHO);
												$("#nhietdo")
														.val(field.NHIETDO);
												$("#huyetaptren").val(
														field.HUYETAPCAO);
												$("#huyetapduoi").val(
														field.HUYETAPTHAP);
												$("#chieucao").val(
														field.CHIEUCAO);
												$("#cannang")
														.val(field.CANNANG);
												$("#chisobmi").val(field.BMI);
												$("#kqbmi").val(
														field.NHANDINH_BMI);
												$("#trieuchungls").val(
														field.TRIEUCHUNGLS);
												$("#chandoanyhct").val(
														field.CHANDOAN_YHCT);
												$("#benhphu2")
														.val(
																field.CHANDOAN_NGUYENNHAN);
												$("#icd").val(field.ICD);
												$("#mabenhly").val(
														field.MA_BENH_LY);
												if ($("#icd").val() != "") {
													var url = "laymotabenhly?icd="
															+ $("#icd").val();
													$
															.ajax({
																url : url
															})
															.done(
																	function(
																			data) {
																		arr = data
																				.split("!!!");
																		$(
																				"#cbicd")
																				.val(
																						arr[1]);
																		$(
																				"#mabenhly")
																				.val(
																						arr[0]);
																	});
												} else {
													$("#cbicd").val("");
													$("#mabenhly").val("");
												}

												if (ttkham == "1"
														|| ttkham == "2") {
													$("#giaiquyet").val("1");
													$("#cbgiaiquyet").val("1");
												} else {
													$("#cbgiaiquyet")
															.val(
																	field.MA_HUONG_DIEU_TRI);
													$("#giaiquyet").val(
															$("#cbgiaiquyet")
																	.val());
												}

												$("#cbgiaiquyet")
														.val(
																field.MA_HUONG_DIEU_TRI);
												$("#giaiquyet")
														.val(
																$(
																		"#cbgiaiquyet")
																		.val());
												change_huonggiaiquyet();
												$("#benhphu").val(
														field.BENH_PHU);
												if (field.NGAY_HEN != ""
														&& field.NGAY_HEN != null) {
													$("#songayhen")
															.val(
																	getDayCount(
																			getDate(convertDate(field.NGAY_HEN)),
																			new Date()));
													$("#ngayhen").val(
															field.NGAY_HEN1);
												}

												// Vien phi
												$("#sobienlai").val(
														field.SO_BIEN_LAI);
												$("#sotiendatra")
														.val(
																new Intl.NumberFormat(
																		"en-US")
																		.format(field.SOTIENBNTRA));
												$("#lantt")
														.val(field.STT_LANTT);

												if (field.KSK == "No") {
													if ($("#sobhyt").val() == "") {
														if (toamuangoaimacdinh == "0")
															$("#tabs")
																	.tabs(
																			"option",
																			"active",
																			2);
														else
															$("#tabs")
																	.tabs(
																			"option",
																			"active",
																			toamuangoaimacdinh);
														$("#tabs").tabs(
																"option",
																"disabled",
																[ 0, 1 ]);
														$("#tab_xn").tabs(
																"option",
																"active", 1);
														$("#tab_xn").tabs(
																"option",
																"disabled",
																[ 0 ]);
														// $("#tab_cdha").tabs("option",
														// "active", 1);
														// $("#tab_cdha").tabs("option",
														// "disabled", [0]);
														$("#tab_ttpt").tabs(
																"option",
																"active", 1);
														$("#tab_ttpt").tabs(
																"option",
																"disabled",
																[ 0 ]);
														$("#tab_cdha").tabs(
																"option",
																"active", 1);
														$("#tab_cdha").tabs(
																"option",
																"disabled",
																[ 0 ]);
														// $("#tab_dtck").tabs("option",
														// "active", 1);
														// $("#tab_dtck").tabs("option",
														// "disabled", [0]);
													} else {
														$("#tabs").tabs(
																"option",
																"disabled", []);
														$("#tabs").tabs(
																"option",
																"active", 0);
														$("#tab_xn").tabs(
																"option",
																"disabled", []);
														$("#tab_xn").tabs(
																"option",
																"active", 0);
														// $("#tab_cdha").tabs("option",
														// "disabled", []);
														// $("#tab_cdha").tabs("option",
														// "active", 0);
														$("#tab_ttpt").tabs(
																"option",
																"disabled", []);
														$("#tab_ttpt").tabs(
																"option",
																"active", 0);
														$("#tab_cdha").tabs(
																"option",
																"disabled", []);
														$("#tab_cdha").tabs(
																"option",
																"active", 0);
														// $("#tab_dtck").tabs("option",
														// "disabled", []);
														// $("#tab_dtck").tabs("option",
														// "active", 0);
													}
												} else {
													$("#tabs").tabs(
															"option",
															"disabled",
															[ 0, 1, 2, 3, 4, 5,
																	6 ]);
													$("#tab_xn").tabs("option",
															"active", 1);
													$("#tab_xn").tabs("option",
															"disabled", [ 0 ]);
													// $("#tab_cdha").tabs("option",
													// "active", 1);
													// $("#tab_cdha").tabs("option",
													// "disabled", [0]);
													$("#tab_ttpt").tabs(
															"option", "active",
															1);
													$("#tab_ttpt").tabs(
															"option",
															"disabled", [ 0 ]);
													$("#tab_cdha").tabs(
															"option", "active",
															1);
													$("#tab_cdha").tabs(
															"option",
															"disabled", [ 0 ]);
													// $("#tab_dtck").tabs("option",
													// "active", 1);
													// $("#tab_dtck").tabs("option",
													// "disabled", [0]);
												}
												var url = "laythongtintoathuoc?makb=kb_"
														+ field.ID_TIEPNHAN;
												$
														.getJSON(
																url,
																function(result) {
																	$
																			.each(
																					result,
																					function(
																							i,
																							field) {
																						// console.log(field);
																						$(
																								"#matoathuoc")
																								.val(
																										field.MA_TOA_THUOC);
																						$(
																								"#matoathuoc_vt")
																								.val(
																										field.MA_TOA_THUOC);
																						$(
																								"#matoathuoc_mn")
																								.val(
																										field.MA_TOA_THUOC);
																						$(
																								"#matoathuoc_mp")
																								.val(
																										field.MA_TOA_THUOC);
																						$(
																								"#matoathuoc_quay")
																								.val(
																										field.MA_TOA_THUOC);
																						$(
																								"#matoathuoc_dy")
																								.val(
																										field.MA_TOA_THUOC);
																						$(
																								"#matoathuoc_dv")
																								.val(
																										field.MA_TOA_THUOC);
																						$(
																						"#matoathuoc_ct")
																						.val(
																								field.MA_TOA_THUOC);
																						$(
																								"#loidan")
																								.val(
																										field.LOI_DAN_TOA_THUOC);
																						$(
																								"#loidan_vt")
																								.val(
																										field.LOI_DAN_TOA_VATTU_BHYT);
																						$(
																								"#loidan_mn")
																								.val(
																										field.LOI_DAN_TOA_THUOC_MUANGOAI);
																						$(
																								"#loidan_mp")
																								.val(
																										field.LOI_DAN_TOA_THUOC_MIENPHI);
																						$(
																								"#loidan_quay")
																								.val(
																										field.LOI_DAN_TOA_THUOC_MUATAIQUAYBV);
																						$(
																								"#loidan_dy")
																								.val(
																										field.LOI_DAN_TOA_DONGY);
																						$(
																								"#baithuoc_dy")
																								.val(
																										field.BAI_THUOC_DONG_Y);
																						$(
																								"#pheptri_dy")
																								.val(
																										field.PHEP_TRI_DONG_Y);
																						var active = $(
																								"#tabs")
																								.tabs(
																										"option",
																										"active");
																						if (active == "0") {
																							if ($(
																									"#matoathuoc")
																									.val() != "") {
																								var url = 'chitiettoathuocngoatru?matt='
																										+ $(
																												"#matoathuoc")
																												.val()
																										+ "&nghiepvu=ngoaitru_toathuoc&dvtt="
																										+ dvtt;
																								$(
																										"#list_thuocbhyt")
																										.jqGrid(
																												'setGridParam',
																												{
																													datatype : 'json',
																													url : url
																												})
																										.trigger(
																												'reloadGrid');
																							} else {
																								$(
																										'#list_thuocbhyt')
																										.jqGrid(
																												'clearGridData');
																							}
																						}
																						if (active == "1") {
																							if ($(
																									"#matoathuoc_vt")
																									.val() != "") {
																								var url = 'chitiettoathuocngoatru?matt='
																										+ $(
																												"#matoathuoc")
																												.val()
																										+ "&nghiepvu=ngoaitru_toavattu&dvtt="
																										+ dvtt;
																								$(
																										"#list_vattubhyt")
																										.jqGrid(
																												'setGridParam',
																												{
																													datatype : 'json',
																													url : url
																												})
																										.trigger(
																												'reloadGrid');
																							} else {
																								$(
																										'#list_vattubhyt')
																										.jqGrid(
																												'clearGridData');
																							}
																						}
																						if (active == "2") {
																							if ($(
																									"#matoathuoc_mn")
																									.val() != "") {
																								var url = 'chitiettoathuoc_muangoai?matt='
																										+ $(
																												"#matoathuoc_mn")
																												.val()
																										+ "&dvtt="
																										+ dvtt;
																								$(
																										"#list_thuocmuangoai")
																										.jqGrid(
																												'setGridParam',
																												{
																													datatype : 'json',
																													url : url
																												})
																										.trigger(
																												'reloadGrid');
																							} else {
																								$(
																										'#list_thuocmuangoai')
																										.jqGrid(
																												'clearGridData');
																							}
																						}
//																						if (active == "3") {
//																							if ($(
//																									"#matoathuoc_mp")
//																									.val() != "") {
//																								var url = 'chitiettoathuocngoatru?matt='
//																										+ $(
//																												"#matoathuoc")
//																												.val()
//																										+ "&nghiepvu=ngoaitru_toamienphi&dvtt="
//																										+ dvtt;
//																								$(
//																										"#list_thuocmienphi")
//																										.jqGrid(
//																												'setGridParam',
//																												{
//																													datatype : 'json',
//																													url : url
//																												})
//																										.trigger(
//																												'reloadGrid');
//																							} else {
//																								$(
//																										'#list_thuocmienphi')
//																										.jqGrid(
//																												'clearGridData');
//																							}
//																						}
//																						if (active == "4") {
//																							if ($(
//																									"#matoathuoc_quay")
//																									.val() != "") {
//																								var url = 'chitiettoathuocngoatru?matt='
//																										+ $(
//																												"#matoathuoc")
//																												.val()
//																										+ "&nghiepvu=ngoaitru_toaquaybanthuocbv&dvtt="
//																										+ dvtt;
//																								$(
//																										"#list_thuocmuataiquay")
//																										.jqGrid(
//																												'setGridParam',
//																												{
//																													datatype : 'json',
//																													url : url
//																												})
//																										.trigger(
//																												'reloadGrid');
//																							} else {
//																								$(
//																										'#list_thuocmuataiquay')
//																										.jqGrid(
//																												'clearGridData');
//																							}
//																						}
																						if (active == "3") {
																							if ($(
																									"#matoathuoc_dy")
																									.val() != "") {
																								var url = 'chitiettoathuocngoatru?matt='
																										+ $(
																												"#matoathuoc")
																												.val()
																										+ "&nghiepvu=ngoaitru_toadongy&dvtt="
																										+ dvtt;
																								$(
																										"#list_thuocdongy")
																										.jqGrid(
																												'setGridParam',
																												{
																													datatype : 'json',
																													url : url
																												})
																										.trigger(
																												'reloadGrid');
																							} else {
																								$(
																										'#list_thuocdongy')
																										.jqGrid(
																												'clearGridData');
																							}
																						}
																						if (active == "4") {
																							if ($(
																									"#matoathuoc_ct")
																									.val() != "") {
																								var nghiepvu = "";
																								if($("#dichvu").val() ==6){
																									nghiepvu ="ngoaitru_toathuockhhgd";
																								}
																								else if($("#dichvu").val() ==11){
																									nghiepvu ="ngoaitru_toathuoctamthan";
																								}
																								else if($("#dichvu").val() ==12){
																									nghiepvu ="ngoaitru_toathuocsotret";
																								}
																								else if($("#dichvu").val() ==13){
																									nghiepvu ="ngoaitru_toathuoclao";
																								}
																								else if($("#dichvu").val() ==14){
																									nghiepvu ="ngoaitru_toathuochiv";
																								}
																								if(nghiepvu!= null && nghiepvu != ""){
																								var url = 'chitiettoathuocngoatru?matt='
																										+ $(
																												"#matoathuoc_ct")
																												.val()
																										+ "&nghiepvu="+nghiepvu+"&dvtt="
																										+ dvtt;
																								$(
																										"#list_thuocbhyt_ct")
																										.jqGrid(
																												'setGridParam',
																												{
																													datatype : 'json',
																													url : url
																												})
																										.trigger(
																												'reloadGrid');
																								}
																								else{
																									$(
																									'#list_thuocbhyt_ct')
																									.jqGrid(
																											'clearGridData');
																								}
																							} else {
																								$(
																										'#list_thuocbhyt_ct')
																										.jqGrid(
																												'clearGridData');
																							}
																						}
																						
																					});
																});

											});
						}).done(function() {
					if ($("#chandoantuyentruoc").val() == "") {
						var url = "laychandoantuyentruoc";
						$.post(url, {
							idtiepnhan : field.ID_TIEPNHAN,
							dvtt : dvtt
						}).done(function(dt) {
							$("#chandoantuyentruoc").val(dt);
						});
					}
					

				});

	}
}

function timkiem_benhnhan(mayte) {
	var url = "timkiembntheobhyt?bhyt=0" + "&mabn=" + mayte;
	$.getJSON(url, function(result) {
		$.each(result, function(i, field) {
			timkiembenhnhan(field);
			$("#sobhyt").val(field.SO_THE_BAOHIEM_YTE);
			if (field.SO_THE_BAOHIEM_YTE != ""
					&& field.SO_THE_BAOHIEM_YTE != null)
				kt_bhyt(field.SO_THE_BAOHIEM_YTE);
			if ($("#sobhyt").val() != "") {
				kt_tilemiengiam($("#sobhyt").val());
			} else {
				$("#clear").click();
			}
		});
	});
}

function timkiembenhnhan(arr) {
	if (arr != null) {
		var $frm = $("form#form_kb");
		$frm.find("input[name='mayte']").val(arr.MA_BENH_NHAN);
		if(arr.MA_BENH_NHAN!= null && arr.MA_BENH_NHAN != ''){
			$("#mayte").attr("disabled", true);
		}
		$frm.find("input[name='hoten']").val(arr.TEN_BENH_NHAN.toUpperCase());
//		$frm.find("input[name='tungay']").val(
//				convertDate(arr.NGAY_BATDAUHIEULUC));
//		$frm.find("input[name='denngay']").val(convertDate(arr.NGAY_KETTHUC));
//		$frm.find("input[name='namsinh']").val(convertDate(arr.NGAY_SINH));
		
		$frm.find("input[name='tungay']").val(arr.NGAY_BATDAUHIEULUC);
		$frm.find("input[name='denngay']").val(arr.NGAY_KETTHUC);
		$frm.find("input[name='namsinh']").val(arr.NGAY_SINH);
		
		$("#namsinh").change();
//		$frm.find("input[name='gioitinh']").val(
//				arr.GIOI_TINH.toString() == "true" ? "1" : "0");
		$frm.find("input[name='gioitinh']").val(
		arr.GIOI_TINH.toString());
		$frm.find("select[name='cbgioitinh']").val(arr.GIOI_TINH.toString());
		if(arr.MA_NOITIEPNHAN != null && arr.MA_NOITIEPNHAN !=''){
		$frm.find("input[name='noidangky']").val(arr.MA_NOITIEPNHAN);
		}
		else{
		$("#noidangky").val(dvtt);
		}
		loadnoidangky();
//		$frm.find("input[name='cbnoidangky']").val(arr.MA_NOITIEPNHAN);
		$frm.find("input[name='nguoilienhe']").val(arr.NGUOI_LIEN_HE);
		$frm.find("input[name='diachi']").val(arr.DIA_CHI);
		$frm.find("input[name='sonha']").val(arr.SO_NHA);
		$frm.find("input[name='sodt']").val(arr.SO_DIEN_THOAI);
		
		var dvtt02 =dvtt.substring(0, 2);
		var noidangky02 = $("#noidangky").val().substring(0, 2);
		
//		if (dvtt == $("#noidangky").val()) {
		if(dvtt02 == noidangky02){
			$("#dungtuyen").prop('checked', true);
			$("#dungtuyen").attr("disabled", true);
		} else {
			$("#dungtuyen").prop('checked', false);
			$("#dungtuyen").attr("disabled", false);
		}
		var isChecked = $('#dungtuyen').is(':checked');
		if (isChecked == true)
			$("#tlmiengiam").val($("#tlmiengiam_dungtuyen").val());
		else
			$("#tlmiengiam").val(tiletraituyen);
//		if (arr.NGOAIKIEU.toString() == "true")
//			$frm.find("input[name='ngoaikieu']").prop('checked', true);
//		else
//			$frm.find("input[name='ngoaikieu']").prop('checked', false);
		// $frm.find("input[name='capcuu']").val(arr.ma_nhanvien);
		// $frm.find("input[name='khamuutien']").val(arr.sodienthoai_nhanvien);
		$frm.find("input[name='mact']").val(arr.MA_CONG_TY);
		$frm.find("input[name='socmt']").val(arr.CMT_BENHNHAN);
		$frm.find("input[name='nguoilienhe']").val(arr.NGUOI_LIEN_HE);
		$frm.find("input[name='mapx']").val(arr.MA_PHUONG_XA);
		$frm.find("input[name='dichvu']").val(
				$frm.find("select[name='cbdichvu']").val());
		$frm.find("input[name='dantoc']").val(arr.MA_DANTOC);
		$frm.find("select[name='cbdantoc']").val(arr.MA_DANTOC);
		$frm.find("input[name='nghenghiep']").val(arr.MA_NGHE_NGHIEP);
		$frm.find("select[name='cbnghenghiep']").val(arr.MA_NGHE_NGHIEP);
		// mang_arr = [arr.TRANG_THAI, arr.KSK, arr.TIEPNHAN_QUADAI108,
		// arr.TT_CONG_KHAM, arr.THANH_TOAN, arr.THANH_TOAN_YC, arr.DOUUTIEN,
		// arr.CANHBAO, arr.STT_HANGNGAY];
	}
}

function timkiem_nhankhau(id_nhan_khau) {
	var arr = [ id_nhan_khau ];
	var url = "thongtinnhankhau2?url=" + convertArray(arr);
	$.getJSON(url, function(result) {
		$.each(result, function(i, field) {
			thongtinnhankhau(field);
			$("#sobhyt").val(field.SO_THE_BAOHIEM_YTE);
			if (field.SO_THE_BAOHIEM_YTE != ""
					&& field.SO_THE_BAOHIEM_YTE != null)
				kt_bhyt(field.SO_THE_BAOHIEM_YTE);
			if ($("#sobhyt").val() != "") {
				kt_tilemiengiam($("#sobhyt").val());
			} else {
				$("#clear").click();
			}
		});
	});
}

function thongtinnhankhau(arr) {
	if (arr != null) {
		var $frm = $("form#form_kb");
		// $frm.find("input[name='mayte']").val(arr.MA_BENH_NHAN);
		$frm.find("input[name='hoten']").val(arr.HO_TEN.toUpperCase());
//		 $frm.find("input[name='tungay']").val(convertDate(arr.NGAY_BATDAUHIEULUC));
//		 $frm.find("input[name='denngay']").val(convertDate(arr.NGAY_KETTHUC));
//
//		$frm.find("input[name='namsinh']").val(convertDate(arr.NGAY_SINH));
		 $frm.find("input[name='tungay']").val(arr.NGAY_BATDAUHIEULUC);
		 $frm.find("input[name='denngay']").val(arr.NGAY_KETTHUC);

		$frm.find("input[name='namsinh']").val(arr.NGAY_SINH);

		$("#namsinh").change();
//		$frm.find("input[name='gioitinh']").val(
//				arr.GIOI_TINH.toString() == "true" ? "1" : "0");
		$frm.find("input[name='gioitinh']").val(arr.GIOI_TINH.toString());
		$frm.find("select[name='cbgioitinh']").val(arr.GIOI_TINH.toString());
		if(arr.MA_NOITIEPNHAN != null && arr.MA_NOITIEPNHAN != ''){
		$frm.find("input[name='noidangky']").val(arr.MA_NOITIEPNHAN);
		}
		else{
			$frm.find("input[name='noidangky']").val(dvtt);
		}
		loadnoidangky();
//		$frm.find("select[name='cbnoidangky']").val(arr.MA_NOITIEPNHAN);
		// $frm.find("input[name='nguoilienhe']").val(arr.NGUOI_LIEN_HE);
		$frm.find("input[name='diachi']").val(arr.DIA_CHI);
		$frm.find("input[name='sonha']").val(arr.SO_NHA);
		$frm.find("input[name='sodt']").val(arr.SO_DIEN_THOAI);
		var dvtt02 =dvtt.substring(0, 2);
		var noidangky02 = $("#noidangky").val().substring(0, 2);
		
//		if (dvtt == $("#noidangky").val()) {
		if(dvtt02 == noidangky02){
			$("#dungtuyen").prop('checked', true);
			$("#dungtuyen").attr("disabled", true);
		} else {
			$("#dungtuyen").prop('checked', false);
			$("#dungtuyen").attr("disabled", false);
		}
		var isChecked = $('#dungtuyen').is(':checked');
		if (isChecked == true)
			$("#tlmiengiam").val($("#tlmiengiam_dungtuyen").val());
		else
			$("#tlmiengiam").val(tiletraituyen);
		// if (arr.NGOAIKIEU.toString() == "true")
		// $frm.find("input[name='ngoaikieu']").prop('checked', true);
		// else
		// $frm.find("input[name='ngoaikieu']").prop('checked', false);
		// $frm.find("input[name='capcuu']").val(arr.ma_nhanvien);
		// $frm.find("input[name='khamuutien']").val(arr.sodienthoai_nhanvien);
		// $frm.find("input[name='mact']").val(arr.MA_CONG_TY);
		$frm.find("input[name='socmt']").val(arr.CMT_BENHNHAN);
		// $frm.find("input[name='nguoilienhe']").val(arr.NGUOI_LIEN_HE);
		// $frm.find("input[name='mapx']").val(arr.MA_PHUONG_XA);
		// $frm.find("input[name='dichvu']").val($frm.find("select[name='cbdichvu']").val());
		 $frm.find("input[name='dantoc']").val(arr.ID_DAN_TOC);
		 $frm.find("select[name='cbdantoc']").val(arr.ID_DAN_TOC);
		 $frm.find("input[name='nghenghiep']").val(arr.ID_NGHE_NGHIEP);
		 $frm.find("select[name='cbnghenghiep']").val(arr.ID_NGHE_NGHIEP);
		// mang_arr = [arr.TRANG_THAI, arr.KSK, arr.TIEPNHAN_QUADAI108,
		// arr.TT_CONG_KHAM, arr.THANH_TOAN, arr.THANH_TOAN_YC, arr.DOUUTIEN,
		// arr.CANHBAO, arr.STT_HANGNGAY];
	}
}

function lay_thong_tin_benh_nhan(id_nhan_khau, ma_benh_nhan) {
	$("#btnThem").click();
	$("#mayte").val(ma_benh_nhan);
    var year = currentTime.getFullYear();
    $("#denngay").val("31/12/" + year.toString() + "");
    $("#tungay").val("01/01/" + year.toString() + "");
	if(ma_benh_nhan!= null && ma_benh_nhan !=""){
		$("#mayte").attr("disabled", true);
	}
	$("#id_nhan_khau").val(id_nhan_khau);
	$("#idtiepnhan").val("");
	if (ma_benh_nhan != "") {
		timkiem_benhnhan(ma_benh_nhan);
		enableNgayKham();
	} else {
		timkiem_nhankhau(id_nhan_khau);
		enableNgayKham();
	}
}

function lay_thong_tin_nhan_khau(id_nhan_khau) {
	$("#mayte").val(id_nhan_khau);
	if(id_nhan_khau!=null && id_nhan_khau!=null){
		$("#mayte").attr("disabled", true);
	}
}

function load_gridchitietthanhtoan(thanhtoan) {
	var idtiepnhan = $("#idtiepnhan").val();
	var dvtt = $("#dvtt").val();
	if (thanhtoan == 'false') {
		var ngay = convertStr_MysqlDate($("#ngaytiepnhan").val());
		if ($("#sobhyt").val() == '' || $("#sobhyt").val() == null) {
			var arr = [ idtiepnhan, ngay, thanhtoan ];
			var url = "chitietthanhtoan_khongbhyt?url=" + convertArray(arr);
			$("#list_chitietthanhtoan").jqGrid('setGridParam', {
				datatype : 'json',
				url : url
			}).trigger('reloadGrid');
		} else {
			var sophieu = $("#sophieuthanhtoan").val();
			var url = "taobangke_truocin?makb=kb_" + idtiepnhan + "&dvtt="
					+ dvtt + "&sophieu=" + sophieu;
			if (idtiepnhan !== "" && sophieu !== "") {
				$.ajax({
					url : url
				}).done(
						function(data) {
							// var daxuat = $("#chitiettt").prop('checked') ==
							// true ? "1" : "0";
							var daxuat = "0"; // chua thanh toan
							var arr_mang = [ sophieu, dvtt, daxuat ];
							var url = "chitietthanhtoan_cobhyt_giamtai?url="
									+ convertArray(arr_mang);
							$("#list_chitietthanhtoan").jqGrid('setGridParam',
									{
										datatype : 'json',
										url : url
									}).trigger('reloadGrid');
						});
			}
		}
		//$("#btnHuyThanhToan").hide();
		//$("#btnThanhToan").show();
	} else {
		if ($("#sobhyt").val() == '' || $("#sobhyt").val() == null) {
			var idtiepnhan = $("#idtiepnhan").val();
			var arr = [ idtiepnhan, dvtt ];
			var url = "vpngt_chitiet_thanhtoan?url=" + convertArray(arr);
			$("#list_chitietthanhtoan").jqGrid('setGridParam', {
				datatype : 'json',
				url : url
			}).trigger('reloadGrid');
		} else {
			var sophieu = $("#sophieuthanhtoan").val();
			var url = "taobangke_truocin?makb=kb_" + idtiepnhan + "&dvtt="
					+ dvtt + "&sophieu=" + sophieu;
			if (idtiepnhan !== "" && sophieu !== "") {
				$.ajax({
					url : url
				}).done(
						function(data) {
							// var daxuat = $("#chitiettt").prop('checked') ==
							// true ? "1" : "0";
							var daxuat = "1"; // da thanh toan
							var arr_mang = [ sophieu, dvtt, daxuat ];
							var url = "chitietthanhtoan_cobhyt_giamtai?url="
									+ convertArray(arr_mang);
							$("#list_chitietthanhtoan").jqGrid('setGridParam',
									{
										datatype : 'json',
										url : url
									}).trigger('reloadGrid');
						});
			}
		}
		//$("#btnHuyThanhToan").show();
		//$("#btnThanhToan").hide();
	}
}

function change_huonggiaiquyet() {
	if ($("#cbgiaiquyet").val() == "1" || $("#cbgiaiquyet").val() == "2") {
		$("#btnInGiayHen").show()
	} else {
		$("#btnInGiayHen").hide()
	}

	/*
	 * if ($("#cbgiaiquyet").val() == "3") { $("#cbphongkhamchuyen").show();
	 * $("#chuyenpk").show() } else { $("#cbphongkhamchuyen").hide();
	 * $("#chuyenpk").hide() }
	 */

	if ($("#cbgiaiquyet").val() == "4") {
		$("#btnChuyenTuyen").show()
	} else
		$("#btnChuyenTuyen").hide();

	/*
	 * if ($("#cbgiaiquyet").val() == "5") { $("#nhapvien_bt").show() } else
	 * $("#nhapvien_bt").hide()
	 */

}

function change_dichvu() {
	$("#btnKhamThai").hide();
	$("#btnSinhNo").hide();
	$("#btnPhaThai").hide();
	$("#btnKHHGD").hide();
	$("#btnHIV").hide();
	$("#btnLao").hide();
	$("#btnSotRet").hide();
	$("#btnTamThan").hide();
	if ($("#cbdichvu").val() == "1" ||$("#cbdichvu").val() == "8"||$("#cbdichvu").val() == "9"||$("#cbdichvu").val() == "10"||$("#cbdichvu").val() == "11"||$("#cbdichvu").val() == "12"||$("#cbdichvu").val() == "13"||$("#cbdichvu").val() == "14" ) {
        $("#icd").val("");
        $("#cbicd").val("");
        $("#mabenhly").val("");
        $("#icd").attr("disabled", false);
        $("#cbicd").attr("disabled", false);
	}
	if ($("#cbdichvu").val() == "4") {
		if($("#cbgioitinh").val()!= 0 ){
			jAlert("Giới tính bệnh nhân không phù hợp !", 'Thông báo');
			return;
		}
        $("#icd").val("V.V");
        $("#cbicd").val("Khám thai, phá thai, KHHGD, sinh no");
        $("#mabenhly").val("0");
        $("#icd").attr("disabled", true);
        $("#cbicd").attr("disabled", true);
		$("#btnKhamThai").show();
	}

	if ($("#cbdichvu").val() == "5") {
		if($("#cbgioitinh").val()!= 0 ){
			jAlert("Giới tính bệnh nhân không phù hợp !", 'Thông báo');
			return;
		}
        $("#icd").val("V.V");
        $("#cbicd").val("Khám thai, phá thai, KHHGD, sinh no");
        $("#mabenhly").val("0");
        $("#icd").attr("disabled", true);
        $("#cbicd").attr("disabled", true);
		if(load_pha_thai==0){
			var url = "loadcombophathai";
			$.getJSON(url, function(result) {
				var phuongphap = result.phuongphappt;
				var trinhdocm = result.trinhdocm;
				var taibien = result.dm_pt_loai_tai_bien;
	            $.each(phuongphap, function(i, field) {
	            	  $("#cboPhuongPhap").append( '<option value="' + field.ID_PT_PHUONG_PHAP +  '">' + field.TEN_PHUONG_PHAP + '</option>'); 
	              });
	            $.each(trinhdocm, function(i, field1) {
	            	  $("#cboTrinhDo").append( '<option value="' + field1.ID_TRINH_DO_CM +  '">' + field1.TEN_TRINH_DO_CM + '</option>'); 
	              });
	            $.each(taibien, function(i, field2) {
	            	  $("#cboTaibien").append( '<option value="' + field2.ID_PT_LOAI_TAI_BIEN +  '">' + field2.TEN_LOAI_TB + '</option>'); 
	              });
			});
			load_pha_thai=1;
			$("#btnPhaThai").show();
		}
		else{
			$("#btnPhaThai").show();
		}
	}

	if ($("#cbdichvu").val() == "6") {
		if($("#id_nhan_khau").val()==null || $("#id_nhan_khau").val()==""){
			jAlert("Bệnh nhân không phải nhân khẩu, không thể chọn dịch vụ này !", 'Thông báo');
			$("#cbdichvu").val(1);
			return;
		}
		$('#list_thuocbhyt_ct').jqGrid('clearGridData');
		getmakhovattu();
		getnghiepvu();
        $("#icd").val("V.V");
        $("#cbicd").val("Khám thai, phá thai, KHHGD, sinh no");
        $("#mabenhly").val("0");
        $("#icd").attr("disabled", true);
        $("#cbicd").attr("disabled", true);
		if(load_khhdg==0){
			var url = "loadcombokhhgd";
			$.getJSON(url, function(result) {
				var phuongphap = result.dm_khhgd_phuong_phap;
				var taibien = result.dm_khhgd_loai_tai_bien;
				var trinhdo = result.trinhdocm;
	            $.each(phuongphap, function(i, field) {
	            	  $("#cboPPKHHGD").append( '<option value="' + field.ID_PP_KHHGD +  '">' + field.TEN_PP_KHHGD + '</option>'); 
	              });
	            $.each(trinhdo, function(i, field1) {
	            	  $("#cboTDKHHGD").append( '<option value="' + field1.ID_TRINH_DO_CM +  '">' + field1.TEN_TRINH_DO_CM + '</option>'); 
	              });
	            $.each(taibien, function(i, field2) {
	            	  $("#cboTaibienKHHGD").append( '<option value="' + field2.ID_LOAI_TAI_BIEN +  '">' + field2.TEN_LOAI_TAI_BIEN+ '</option>'); 
	              });
				$("#btnKHHGD").show();
				load_khhdg = 1;
			});
		}
		else{
			$("#btnKHHGD").show();
		}
	}

	if ($("#cbdichvu").val() == "7") {
		if($("#cbgioitinh").val()!= 0 ){
			jAlert("Giới tính bệnh nhân không phù hợp !", 'Thông báo');
			return;
		}
        $("#icd").val("V.V");
        $("#cbicd").val("Khám thai, phá thai, KHHGD, sinh no");
        $("#mabenhly").val("0");
        $("#icd").attr("disabled", true);
        $("#cbicd").attr("disabled", true);
		if(load_sinh_no==0){
		var url = "loadcombosinhsan";
		  $.getJSON(url, function(result) {
			  var SLKT =  result.dm_so_lan_kham_thai_ss;
			  var gioi_tinh_ss = result.dm_gioi_tinh_ss;
			  var cachthucde = result.dm_cach_thuc_de_ss;
			  var noide =  result.dm_noi_kham_ss;
			  var trinhdo = result.dm_trinhdo_nguoido_ss;
			  var tuvongthainhi = result.dm_tuvong_thainhi_ss;
			  var taibien = result.dm_ss_loai_tai_bien;
			  var loaixnss = result.dm_loai_xet_nghiem_ss;
			  
            $.each(SLKT, function(i, field) {
          	  $("#cboSLKT").append( '<option value="' + field.ID_SO_LAN_KHAM_THAI +  '">' + field.TEN_SO_LAN_KHAM_THAI + '</option>'); 
            });
            
            $.each(gioi_tinh_ss, function(i, field1) {
            	  $("#cbogttss").append( '<option value="' + field1.ID +  '">' + field1.NAME + '</option>'); 
              });
            
            $.each(cachthucde, function(i, field2) {
          	  $("#cboctdttss").append( '<option value="' + field2.ID_CACH_THUC_DE +  '">' + field2.TEN_CACH_THUC_DE + '</option>'); 
            });
            $.each(noide, function(i, field3) {
            	  $("#cbondttss").append( '<option value="' + field3.ID_NOI_KHAM +  '">' + field3.TEN_NOI_KHAM + '</option>'); 
              });
            $.each(trinhdo, function(i, field4) {
          	  $("#cbotdttss").append( '<option value="' + field4.ID_TRINHDO_NGUOIDO +  '">' + field4.TEN_TRINHDO_NGUOIDO + '</option>'); 
            });
            $.each(tuvongthainhi, function(i, field5) {
            	  $("#cbotvtnttss").append( '<option value="' + field5.ID_TUVONG_THAINHI +  '">' + field5.TEN_TUVONG_THAINHI+ '</option>'); 
              });
            $.each(taibien, function(i, field6) {
          	  $("#cboTaibienSS").append( '<option value="' + field6.ID_SS_LOAI_TAI_BIEN +  '">' + field6.TEN_LOAI_TAI_BIEN+ '</option>'); 
            });
            $.each(loaixnss, function(i, field7) {
            	  $("#cboTXNSS").append( '<option value="' + field7.ID_LOAI_XET_NGHIEM +  '">' + field7.TEN_XET_NGHIEM+ '</option>'); 
              });
            $.each(noide, function(i, field8) {
          	  $("#cboncscsss").append( '<option value="' + field8.ID_NOI_KHAM +  '">' + field8.TEN_NOI_KHAM + '</option>'); 
            });
    		load_sinh_no=1;
    		$("#btnSinhNo").show();
        });
	}
		else{
			$("#btnSinhNo").show();
		}
	}
	if ($("#cbdichvu").val() == "11") {
		if($("#id_nhan_khau").val()==null || $("#id_nhan_khau").val()==""){
			jAlert("Bệnh nhân không phải nhân khẩu, không thể chọn dịch vụ này !", 'Thông báo');
//			$("#cbdichvu").val(1);
			return;
		}
		if(load_tamthan == 0){
			var url = "loadcombotamthan";
			$.getJSON(url, function(result) {
				var tinhtrang =  result.tinhtrang;
				var loai =  result.loai;
				var phuchoichucnang =  result.phuchoichucnang;
				var dienbien = result.dienbien;
//				var lydo = result.ly_do_tt;
	            $.each(tinhtrang, function(i, field) {
	            	  $("#tinhtrang_tt").append( '<option value="' + field.ID_TINH_TRANG +  '">' + field.TEN_TINH_TRANG+ '</option>'); 
	              });
	            
	            $.each(loai, function(i, field1) {
	            	  $("#loai_tt").append( '<option value="' + field1.ID_TT_LOAI +  '">' + field1.TEN_TT_LOAI + '</option>'); 
	              });
	            
	            $.each(phuchoichucnang, function(i, field2) {
	            	  $("#phuchoichucnang_tt").append( '<option value="' + field2.ID_PHUC_HOI_CHUC_NANG +  '">' + field2.TEN_PHUC_HOI_CHUC_NANG+ '</option>'); 
	              });
	            
	            $.each(dienbien, function(i, field3) {
	            	  $("#dienbien_tt").append( '<option value="' + field3.ID_DIENBIEN +  '">' + field3.TEN_DIENBIEN+ '</option>'); 
	              });
	            
//	            $.each(lydo, function(i, field4) {
//	            	  $("#ly_do_tt").append( '<option value="' + field4.ID_LY_DO +  '">' + field4.TEN_LY_DO+ '</option>'); 
//	              });
	            load_tamthan =1;
				$("#btnTamThan").show();
			});
		}
		else{
			$("#btnTamThan").show();
		}
		$('#list_thuocbhyt_ct').jqGrid('clearGridData');
		getmakhovattu();
		getnghiepvu();
	}
	if ($("#cbdichvu").val() == "12") {
		if($("#id_nhan_khau").val()==null || $("#id_nhan_khau").val()==""){
			jAlert("Bệnh nhân không phải nhân khẩu, không thể chọn dịch vụ này !", 'Thông báo');
//			$("#cbdichvu").val(1);
			return;
		}
		if(load_sotret == 0){
			var url = "loadcombosotret";
			$.getJSON(url, function(result) {
				var noiphathien =  result.noiphathien;
				var diaphuong =  result.diaphuong;
				var loaixn =  result.loaixn;
				var ketquaxn =  result.ketquaxn;
				var loaichuandoan =  result.loaichuandoan;
				var loaidieutri = result.loaidieutri;
	            $.each(noiphathien, function(i, field) {
	            	  $("#noiphathien_sr").append( '<option value="' + field.ID_NOI_PHAT_HIEN +  '">' + field.TEN_NOI_PHAT_HIEN+ '</option>'); 
	              });
	            $.each(diaphuong, function(i, field1) {
	            	  $("#list_thomxom").append( '<option>' + field1.TEN_DIAPHUONG+ '</option>'); 
	              });
	            $.each(loaixn, function(i, field2) {
	            	  $("#loaixn_sr").append( '<option value="' + field2.ID_SR_LOAI_XET_NGHIEM +  '">' + field2.TEN_SR_LOAI_XET_NGHIEM+ '</option>'); 
	              });
	            $.each(ketquaxn, function(i, field3) {
	            	  $("#ketquaxn_sr").append( '<option value="' + field3.ID_SR_KET_QUA_XN +  '">' + field3.TEN_KET_QUA_XN+ '</option>'); 
	              });
	            $.each(loaichuandoan, function(i, field4) {
	            	  $("#loaichuandoan_sr").append( '<option value="' + field4.ID_SR_CHAN_DOAN+  '">' + field4.TEN_CHAN_DOAN+ '</option>'); 
	              });
	            $.each(loaidieutri, function(i, field5) {
	            	  $("#loaidieutri_sr").append( '<option value="' + field5.ID_NOI_DIEU_TRI+  '">' + field5.TEN_NOI_DIEU_TRI+ '</option>'); 
	              });
	            load_sotret =1;
				$("#btnSotRet").show();
			});
		}
		else{
			$("#btnSotRet").show();
		}
		$('#list_thuocbhyt_ct').jqGrid('clearGridData');
		getmakhovattu();
		getnghiepvu();
	}
	if ($("#cbdichvu").val() == "13") {
		if($("#id_nhan_khau").val()==null || $("#id_nhan_khau").val()==""){
			jAlert("Bệnh nhân không phải nhân khẩu, không thể chọn dịch vụ này !", 'Thông báo');
//			$("#cbdichvu").val(1);
			return;
		}
		if(load_lao == 0){
			var url = "loadcombolao";
			$.getJSON(url, function(result) {
				var phanloai =  result.phanloai_lao;
				var ketqua =  result.ketqua_lao;
				var khangthuoc =  result.khang_thuoc_lao;
				var lydo = result.ly_do_lao;
	            $.each(phanloai, function(i, field) {
	            	  $("#phanloai_lao").append( '<option value="' + field.ID_PHAN_LOAI +  '">' + field.TEN_PHAN_LOAI+ '</option>'); 
	              });
	            $.each(ketqua, function(i, field1) {
	            	  $("#ketqua_lao").append( '<option value="' + field1.ID_KET_QUA +  '">' + field1.TEN_KET_QUA+ '</option>'); 
	              });
	            $.each(khangthuoc, function(i, field2) {
	            	  $("#khang_thuoc_lao").append( '<option value="' + field2.ID_LAO_KHANG_THUOC +  '">' + field2.TEN_LAO_KHANG_THUOC+ '</option>'); 
	              });
	            $.each(lydo, function(i, field3) {
	            	  $("#ly_do_lao").append( '<option value="' + field3.ID_LY_DO +  '">' + field3.TEN_LY_DO+ '</option>'); 
	              });
				load_lao =1;
				$("#btnLao").show();
			});
		}
		else{
			$("#btnLao").show();
		}
		$('#list_thuocbhyt_ct').jqGrid('clearGridData');
		getmakhovattu();
		getnghiepvu();
	}
	if ($("#cbdichvu").val() == "14") {
		if($("#id_nhan_khau").val()==null || $("#id_nhan_khau").val()==""){
			jAlert("Bệnh nhân không phải nhân khẩu, không thể chọn dịch vụ này !", 'Thông báo');
//			$("#cbdichvu").val(1);
			return;
		}
		if(load_hiv == 0){
			var url = "loadcombohiv";
			$.getJSON(url, function(result) {
				var doituong =  result.dm_hiv_doi_tuong;
	            $.each(doituong, function(i, field) {
	            	  $("#doituong_hiv").append( '<option value="' + field.ID_HIV_DOI_TUONG +  '">' + field.TEN_HIV_DOI_TUONG+ '</option>'); 
	              });
				load_hiv =1;
				$("#btnHIV").show();
			});
		}
		else{
			$("#btnHIV").show();
		}
		$('#list_thuocbhyt_ct').jqGrid('clearGridData');
		getmakhovattu();
		getnghiepvu();
	}
}

function set_button(kieu) {
//	$("#btnThem").hide();
	$("#btnHuy").hide();
	//$("#btnHuyThanhToan").hide();
	//$("#btnThanhToan").hide();

	$("#btnLuu").attr("disabled", true);
	$("#btnLuu").addClass("button_disabled");
	$("#btnLuu").removeClass("button_shadow");

	$("#btnXoa").attr("disabled", true);
	$("#btnXoa").addClass("button_disabled");
	$("#btnXoa").removeClass("button_shadow");

	$("#btnDonThuoc").attr("disabled", true);
	$("#btnDonThuoc").addClass("button_disabled");
	$("#btnDonThuoc").removeClass("button_shadow");

	$("#btnXetNghiem").attr("disabled", true);
	$("#btnXetNghiem").addClass("button_disabled");
	$("#btnXetNghiem").removeClass("button_shadow");

	$("#btnTTPT").attr("disabled", true);
	$("#btnTTPT").addClass("button_disabled");
	$("#btnTTPT").removeClass("button_shadow");
	
	$("#btnCTKB").attr("disabled", true);
	$("#btnCTKB").addClass("button_disabled");
	$("#btnCTKB").removeClass("button_shadow");
	
	$("#btnCDHA").attr("disabled", true);
	$("#btnCDHA").addClass("button_disabled");
	$("#btnCDHA").removeClass("button_shadow");

	$("#btnInBangKe").attr("disabled", true);
	$("#btnInBangKe").addClass("button_disabled");
	$("#btnInBangKe").removeClass("button_shadow");

	$("#btnInDonthuoc").attr("disabled", true);
	$("#btnInDonthuoc").addClass("button_disabled");
	$("#btnInDonthuoc").removeClass("button_shadow");

	$("#btnBenhAn").attr("disabled", true);
	$("#btnBenhAn").addClass("button_disabled");
	$("#btnBenhAn").removeClass("button_shadow");

	$("#btnHoanTatKham").hide();
	$("#btnHuyHoanTatKham").hide();

	if (kieu == "themmoi") {
		$("#btnLuu").attr("disabled", false);
		$("#btnLuu").removeClass("button_disabled");
		$("#btnLuu").addClass("button_shadow");
		$("#tungay").val("01/01/" + year.toString() + "");
		$("#denngay").val("31/12/" + year.toString() + "");
		$("#btnHuy").show();
		

	}

	if (kieu == "huy") {
		reset();
//		$("#btnThem").show();
	}

	if (kieu == "sua") {
		$("#btnHuy").show();
		//$("#btnThanhToan").show();

		$("#btnLuu").attr("disabled", false);
		$("#btnLuu").removeClass("button_disabled");
		$("#btnLuu").addClass("button_shadow");

		$("#btnXoa").attr("disabled", false);
		$("#btnXoa").removeClass("button_disabled");
		$("#btnXoa").addClass("button_shadow");

		$("#btnDonThuoc").attr("disabled", false);
		$("#btnDonThuoc").removeClass("button_disabled");
		$("#btnDonThuoc").addClass("button_shadow");

		$("#btnXetNghiem").attr("disabled", false);
		$("#btnXetNghiem").removeClass("button_disabled");
		$("#btnXetNghiem").addClass("button_shadow");

		$("#btnTTPT").attr("disabled", false);
		$("#btnTTPT").removeClass("button_disabled");
		$("#btnTTPT").addClass("button_shadow");
		
		$("#btnCTKB").attr("disabled", false);
		$("#btnCTKB").removeClass("button_disabled");
		$("#btnCTKB").addClass("button_shadow");
		
		$("#btnCDHA").attr("disabled", false);
		$("#btnCDHA").removeClass("button_disabled");
		$("#btnCDHA").addClass("button_shadow");

		$("#btnInBangKe").attr("disabled", false);
		$("#btnInBangKe").removeClass("button_disabled");
		$("#btnInBangKe").addClass("button_shadow");

		$("#btnInDonthuoc").attr("disabled", false);
		$("#btnInDonthuoc").removeClass("button_disabled");
		$("#btnInDonthuoc").addClass("button_shadow");

		$("#btnBenhAn").attr("disabled", false);
		$("#btnBenhAn").removeClass("button_disabled");
		$("#btnBenhAn").addClass("button_shadow");
	}
}

function reset() {
	$("#tungay").val("");
	$("#denngay").val("");
	$("#mayte").val("");
	$("#hoten").val("");
	$("#socmt").val("");
	$("#namsinh").val("");
	$("#tuoi").val("");
	$("#thang").val("");
	$("#sodt").val("");
	$("#diachi").val("");
	$("#mapx").val("-1");
	$("#mact").val("0");
	$("#sonha").val("");
	$("#nguoilienhe").val("");
	$("#sobhyt").val("");
	$("#chuoinhandang").val("");
	$("#doituongthe").val("");
	$("#tlmiengiam").val("0");
	// $("#tungay").val("${ngayhientai}");
	// $("#denngay").val("${ngayhientai}");
	// $("#sothutu").text("");
	// $("#sophieu").text("");
	$("#chandoannoichuyen").text("");
	$("#dungtuyen").prop('checked', true);
	 $("#cbdantoc").val("1");
	 $("#dantoc").val("1");
	 $("#cbnghenghiep").val("17");
	 $("#nghenghiep").val("17");
	 $("#capcuu").prop('checked', false);
	 $("#khamuutien").prop('checked', false);
	$("#ngoaikieu").prop('checked', false);
	$("#mienphi").prop('checked', false);
	$("#noidangky").val(dvtt);
	$("#icd2").val("");
	$("#cbdichvu").val("1");
	$("#dichvu").val("1");
	change_dichvu();
//	$("#cbnoidangky").val(dvtt);
	loadnoidangky();
	/*
	 * $("#cbdichvu").val("${dichvumacdinh}");
	 * $("#cbphongkham").val("${phongkhammacdinh}"); if ("${phongkhammacdinh}" !=
	 * $("#cbphongkham").val()) { $("#cbphongkham").val("${Sess_Phong}"); }
	 * $("#dichvu").val($("#cbdichvu").val()); if ("${Sess_Phong}" == "80") {
	 * $("#cbphongkham").val("80"); $("#dichvu").val("229"); } var soduocset =
	 * $("#cbphongkham option:selected").text().trim(); var idsds =
	 * soduocset.indexOf(" - "); soduocset = soduocset.substring(0, idsds);
	 * $("#phongkham").val(soduocset);
	 */

	$("#ngaytiepnhan").val(ngayhientai);
	$("#idtiepnhan").val("");

	// Thong tin kham benh
	$("#mach").val("");
	$("#nhiptho").val("");
	$("#nhietdo").val("");
	$("#huyetaptren").val("");
	$("#huyetapduoi").val("");
	$("#chieucao").val("");
	$("#cannang").val("");
	$("#chisobmi").val("");
	$("#kqbmi").val("");
	$("#trieuchungls").val("");
	$("#chandoanyhct").val("");
	$("#benhphu2").val("");
	$("#icd").val("");
	$("#mabenhly").val("");
	$("#giaiquyet").val("1");
	$("#cbgiaiquyet").val("1");
	$("#benhphu").val("");
	$("#songayhen").val("0");
	$("#ngayhen").val("");
	$("#icd3").val("");
	$("#cbicd").val("");

	// Vien phi
	$("#sobienlai").val("0");
	$("#sotiendatra").val("0");
	$("#thanhtoan").val("false");

	jQuery("#list_chitietthanhtoan").clearGridData(true).trigger("reloadGrid");
	

	$("#matoathuoc").val("");
	$("#matoathuoc_vt").val("");
	$("#matoathuoc_mn").val("");
	$("#matoathuoc_mp").val("");
	$("#matoathuoc_quay").val("");
	$("#matoathuoc_dy").val("");
	$("#matoathuoc_dv").val("");
	$("#matoathuoc_ct").val("");
	$("#loidan").val("");
	$("#loidan_vt").val("");
	$("#loidan_mn").val("");
	$("#loidan_mp").val("");
	$("#loidan_quay").val("");
	$("#loidan_dy").val("");
	$("#baithuoc_dy").val("");
	$("#pheptri_dy").val("");
	$("#tainanthuongtich").val("0");
	var active = $("#tabs").tabs("option","active");
	if (active == "0") {
	$('#list_thuocbhyt').jqGrid('clearGridData');
	}
	if (active == "1") {
		$('#list_vattubhyt').jqGrid('clearGridData');
	}
	if (active == "2") {$('#list_thuocmuangoai')
				.jqGrid('clearGridData');
	}
	if (active == "3") {
		$('#list_thuocmienphi').jqGrid('clearGridData');
	}
	if (active == "4") {
		$('#list_thuocmuataiquay').jqGrid('clearGridData');
	}
	if (active == "5") {
		$('#list_thuocdongy').jqGrid('clearGridData');
	}
	if (active == "7") {
		$('#list_thuocbhyt_ct').jqGrid('clearGridData');
	}
}

function loadchiso() {
	chieucao = $("#chieucao").val();
	cannang = $("#cannang").val();
	// creatinin = $("#creatinin").val();
	tuoi = $("#tuoi").val();
	gt = $("#gioitinh").val();
	la_nu = (gt == "1") ? "false" : "true";
	if (chieucao != "" && cannang != "") {
		$("#chisobmi").val(chisobmi(parseFloat(cannang), parseFloat(chieucao)));
		$("#kqbmi").val(nhandinh_bmi($("#chisobmi").val()));
		/*
		 * if (creatinin != "") {
		 * $("#dothanhthai").val(dothanhthai_Cockroft_Gault(tuoi, cannang,
		 * chieucao, creatinin, la_nu));
		 * $("#kqdothanhthai").val(nhandinh_dothanhthai($("#dothanhthai").val())) }
		 */
	}
}

function loadnoidangky() {
	var url = 'dm_noitiepnhan_get_ten?manoitn=' + $("#noidangky").val();
	$("#noidk").val("");
	$("#cbnoidangky").val("");
	// begin
	$.getJSON(url, function(result) {
		$.each(result, function(i, field) {
			// lay ra toan bo thong tin ho khau;
			$("#noidk").val(field.TEN_NOITIEPNHAN);
			$("#cbnoidangky").val($("#noidangky").val());
		});
	});
}

function kt_doituongthe(sobhyt) {
	var madt = sobhyt.substring(0, 3);
	var url = "kiemtrathebhyt?madt=" + madt;
	$.ajax({
		url : url
	}).done(function(data) {
		if (data != "UNVALID") {
			// alert(data);
			var arr = data.toString().split(":");
			$("#chuoinhandang").val(madt);
			$("#doituongthe").val(arr[0]);
		}
	});
}

function kt_bhyt(sobhyt) {
	var madt = sobhyt.substring(0, 3).toUpperCase();
	var url = "kiemtrathebhyt?madt=" + madt;
	$.ajax({
		url : url
	}).done(function(data) {
		if (data != "UNVALID") {
			// alert(data);
			var arr = data.toString().split(":");
			$("#chuoinhandang").val(madt);
			$("#doituongthe").val(arr[0]);
			$("#tlmiengiam_dungtuyen").val(arr[1]);
			var dvtt02 =dvtt.substring(0, 2);
			var noidangky02 = $("#noidangky").val().substring(0, 2);
			
//			if (dvtt == $("#noidangky").val()) {
			if(dvtt02 == noidangky02){
				$("#dungtuyen").attr("disabled", true);
				$("#dungtuyen").prop('checked', true);
			} else {
				$("#dungtuyen").attr("disabled", false);
				$("#dungtuyen").prop('checked', false);
			}
			var isChecked = $('#dungtuyen').is(':checked');
			if (isChecked == true)
				$("#tlmiengiam").val(arr[1]);
			else
				$("#tlmiengiam").val(tiletraituyen);
			if($("#idtiepnhan").val()== null || $("#idtiepnhan").val()==''){	
			var url = "timkiembntheobhyt?bhyt=" + sobhyt + "&mabn=0";
			$.getJSON(url, function(result) {
				$.each(result, function(i, field) {
					timkiembenhnhan(field);
				});
			});
			}
		} else {
			jAlert("Thẻ bảo hiểm không đúng", 'Cảnh báo', function(r) {
//				$("#sobhyt").focus();
			});
		}
	});
}

function kt_tilemiengiam(sobhyt) {
	var madt = sobhyt.substring(0, 3).toUpperCase();
	var url = "kiemtrathebhyt?madt=" + madt;
	$.ajax({
		url : url
	}).done(function(data) {
		if (data != "UNVALID") {
			// alert(data);
			arr = data.toString().split(":");
			$("#chuoinhandang").val(madt);
			$("#doituongthe").val(arr[0]);
			$("#tlmiengiam_dungtuyen").val(arr[1]);
			var dvtt02 =dvtt.substring(0, 2);
			var noidangky02 = $("#noidangky").val().substring(0, 2);
			
//			if (dvtt == $("#noidangky").val()) {
			if(dvtt02 == noidangky02){
				$("#dungtuyen").attr("disabled", true);
			} else {
				$("#dungtuyen").attr("disabled", false);
			}
			var isChecked = $('#dungtuyen').is(':checked');
			if (isChecked == true)
				$("#tlmiengiam").val(arr[1]);
			else
				$("#tlmiengiam").val(tiletraituyen);
		} else
			jAlert("Thẻ bảo hiểm không đúng", 'Cảnh báo', function(r) {
				$("#sobhyt").focus();
			});
	});
}

function enable_button_ttpt(bt) {
	if (bt == "batdau") {
		$("#them_ttpt").attr("disabled", false);
		$("#them_ttpt").removeClass("button_disabled");
		$("#them_ttpt").addClass("button_shadow");
		$("#luu_ttpt").attr("disabled", "disabled");
		$("#luu_ttpt").addClass("button_disabled");
		$("#luu_ttpt").removeClass("button_shadow");
		$("#huy_ttpt").attr("disabled", "disabled");
		$("#huy_ttpt").addClass("button_disabled");
		$("#huy_ttpt").removeClass("button_shadow");
	} else if (bt == "them") {
		$("#them_ttpt").attr("disabled", true);
		$("#them_ttpt").addClass("button_disabled");
		$("#them_ttpt").removeClass("button_shadow");
		$("#luu_ttpt").attr("disabled", false);
		$("#luu_ttpt").removeClass("button_disabled");
		$("#luu_ttpt").addClass("button_shadow");
		$("#huy_ttpt").attr("disabled", false);
		$("#huy_ttpt").removeClass("button_disabled");
		$("#huy_ttpt").addClass("button_shadow");
	} else if (bt == "huy" || bt == "luu") {
		$("#luu_ttpt").attr("disabled", true);
		$("#luu_ttpt").addClass("button_disabled");
		$("#luu_ttpt").removeClass("button_shadow");
		$("#huy_ttpt").attr("disabled", true);
		$("#huy_ttpt").addClass("button_disabled");
		$("#huy_ttpt").removeClass("button_shadow");
		$("#them_ttpt").attr("disabled", false);
		$("#them_ttpt").addClass("button_shadow");
		$("#them_ttpt").removeClass("button_disabled");
	}
}

function enable_button_xn(bt) {
	if (bt == "batdau") {
		$("#them_xn").attr("disabled", false);
		$("#them_xn").removeClass("button_disabled");
		$("#them_xn").addClass("button_shadow");
		$("#luu_xn").attr("disabled", "disabled");
		$("#luu_xn").addClass("button_disabled");
		$("#luu_xn").removeClass("button_shadow");
		$("#huy_xn").attr("disabled", "disabled");
		$("#huy_xn").addClass("button_disabled");
		$("#huy_xn").removeClass("button_shadow");
	} else if (bt == "them") {
		$("#them_xn").attr("disabled", true);
		$("#them_xn").addClass("button_disabled");
		$("#them_xn").removeClass("button_shadow");
		$("#luu_xn").attr("disabled", false);
		$("#luu_xn").removeClass("button_disabled");
		$("#luu_xn").addClass("button_shadow");
		$("#huy_xn").attr("disabled", false);
		$("#huy_xn").removeClass("button_disabled");
		$("#huy_xn").addClass("button_shadow");
	} else if (bt == "huy" || bt == "luu") {
		$("#luu_xn").attr("disabled", true);
		$("#luu_xn").addClass("button_disabled");
		$("#luu_xn").removeClass("button_shadow");
		$("#huy_xn").attr("disabled", true);
		$("#huy_xn").addClass("button_disabled");
		$("#huy_xn").removeClass("button_shadow");
		$("#them_xn").attr("disabled", false);
		$("#them_xn").addClass("button_shadow");
		$("#them_xn").removeClass("button_disabled");
	}
}

function hide_ckdtck() {
	$("#chuyenkhoa_dtck").hide();
	$("#chuyenkhoadtck").hide();
}
function hide_ctdtck() {
	$("#ct_chuyenkhoadtck").hide();
	$("#ctchuyenkhoadtck").hide();
}
function hide_ctttpt() {
	$("#ct_chuyenkhoattpt").hide();
	$("#ctchuyenkhoattpt").hide();
}

function load_thongtin_xn(ret) {
	$('#phongxn').val(ret.MA_PHONG_XN);
	$('#ngaychidinhxn').val(ret.NGAY_CHI_DINH);
	$('#sophieuxn').val(ret.SO_PHIEU_XN);
	var bhytkhongchi = ret.CO_BHYT.toString() == "No" ? "1" : "0";
	$('#bhytkhongchi_xn').val(bhytkhongchi);
	$("#capcuuxn").prop('checked', ret.CAPCUU.toString() == "1" ? true : false);
}

function load_dichvu_xn(ret) {
	var sophieu = $("#sophieuxn").val();
	var arr1 = [ "false", sophieu ];
	var arr2 = [ "true", sophieu ];
	if (ret.CO_BHYT.toString() == "Yes") {
		$("#tab_xn").tabs("option", "active", 0);
		$("#tab_xn").tabs("option", "disabled", [ 1 ]);
		var url1 = "laydanhsach_xetnghiem?url=" + convertArray(arr1);
		$("#list_xn_bhyt").jqGrid('setGridParam', {
			datatype : 'json',
			url : url1
		}).trigger('reloadGrid');
		$("#xn_cobhyt").click();
	} else {
		$("#tab_xn").tabs("option", "active", 1);
		$("#tab_xn").tabs("option", "disabled", [ 0 ]);
		var url2 = "laydanhsach_xetnghiem?url=" + convertArray(arr2);
		$("#list_xn_yeucau").jqGrid('setGridParam', {
			datatype : 'json',
			url : url2
		}).trigger('reloadGrid');
		$("#xn_bnyc").click();
	}
}
function loadtt_xn(arr) {
	$("#hotenxn").val(arr.TEN_BENH_NHAN.toUpperCase());
	$("#tuoixn").val(arr.TUOI);
	if (arr.SO_THE_BHYT != null) {
		$("#cobhytxn").attr('checked', true);
		cobaohiemyte = 'true';
	} else {
		$("#cobhytxn").attr('checked', false);
		cobaohiemyte = 'false';
	}
	$("#gioitinhxn").val(arr.GIOI_TINH);
	$("#diachixn").val(arr.DIA_CHI);
}

function disable_bt_in_xn() {
	$("#phieu_xn").attr("disabled", true);
	$("#phieu_xn").addClass("button_disabled");
	$("#phieu_xn").removeClass("button_shadow");
}

function toogle_input_xn(bool) {
	$("#phongxn").attr("disabled", bool);
	// $("#capcuuxn").attr("disabled", bool);
	$("#ngaychidinhxn").attr("disabled", bool);
}

function luu_xetnghiem(dvtt) {
	var sophieu = $("#sophieuxn").val();
	var idtiepnhan = $("#idtiepnhan").val();
	var makhambenh = "kb_" + idtiepnhan;
	var mabenhnhan = $("#mayte").val();
	var sophieuthanhtoan = $("#sophieuthanhtoan").val();
	var capcuu = $("#capcuuxn").prop("checked") == true ? "1" : "0";
	var active = $("#tab_xn").tabs("option", "active");
	var url_cn = "xetnghiem_update_bangcha";
	var arr_cn = [ makhambenh, dvtt, sophieu, capcuu ];
	$.post(url_cn, {
		url : convertArray(arr_cn)
	});
	if (active == 0) {
		var str = $("#list_xn_bhyt").jqGrid('getGridParam', 'selarrrow');
		if (str != "" && str != null) {
			var count = str.length;
			for (var i = 0; i < count; i++) {
				var ret = $("#list_xn_bhyt").jqGrid('getRowData', str[i]);
				var madv = ret.MA_XN;
				// var tendv=ret.TEN_DV;
				var sl = ret.SO_LUONG;
				var giadv = ret.GIA_XN;
				var thanhtien = ret.THANH_TIEN;
				var arr = [ sophieu, madv, sl, giadv, thanhtien, "false", dvtt,
						mabenhnhan, sophieuthanhtoan, idtiepnhan, makhambenh ];
				var url = "themchidinh_xnchitiet?url=" + convertArray(arr);
				$.ajax({
					url : url
				}).done(function(data) {
					enable_button_xn("luu");
					toogle_input_xn(false);
					enable_bt_in_xn();
				});
			}
		} else {
			jConfirm(
					'Chưa chọn xét nghiệm. Nhấn "Tiếp tục" để chỉ định. Nhấn "Hủy" để xóa phiếu?',
					'Thông báo', function(r) {
						if (r.toString() == "false") {
							xoa_xn();
							enable_button_xn("luu");
							toogle_input_xn(false);
							enable_bt_in_xn();
						}
					});
		}
	} else if (active == 1) {
		var str_yc = $("#list_xn_yeucau").jqGrid('getGridParam', 'selarrrow');
		if (str_yc != "" && str_yc != null) {
			var count = str_yc.length;
			for (var i = 0; i < count; i++) {
				var ret = $("#list_xn_yeucau").jqGrid('getRowData', str_yc[i]);
				var madv = ret.MA_XN;
				// var tendv=ret.TEN_DV;
				var sl = ret.SO_LUONG;
				var giadv = ret.GIA_XN;
				var thanhtien = ret.THANH_TIEN;
				var arr = [ sophieu, madv, sl, giadv, thanhtien, "true", dvtt,
						mabenhnhan, sophieuthanhtoan, idtiepnhan, makhambenh ];
				var url = "themchidinh_xnchitiet?url=" + convertArray(arr);
				$.ajax({
					url : url
				}).done(function(data) {
					enable_button_xn("luu");
					toogle_input_xn(false);
					enable_bt_in_xn();
				});
			}
		} else {
			jConfirm(
					'Chưa chọn xét nghiệm. Nhấn "Tiếp tục" để chỉ định. Nhấn "Hủy" để xóa phiếu?',
					'Thông báo', function(r) {
						if (r.toString() == "false") {
							xoa_xn();
							enable_button_xn("luu");
							toogle_input_xn(false);
							enable_bt_in_xn();
						}
					});
		}
	}

}
function enable_bt_in_xn() {
	$("#phieu_xn").attr("disabled", false);
	$("#phieu_xn").removeClass("button_disabled");
	$("#phieu_xn").addClass("button_shadow");
}

function xoa_xn() {
	var id1 = $("#list_xn_phieu").jqGrid('getGridParam', 'selrow');
	var ret = $("#list_xn_phieu").jqGrid('getRowData', id1);
	var makhambenh = "kb_" + $("#idtiepnhan").val();
	var ngaychidinh = convertStr_MysqlDate($("#ngaychidinhxn").val());
	var arr = [ makhambenh, ret.SO_PHIEU_XN ];
	var url = "xoaphieu_xn?url=" + convertArray(arr);
	$.ajax({
		url : url
	}).done(function(data) {
		if (data == "1") {
			jAlert("Bệnh nhân đã thanh toán", 'Cảnh báo');
		} else if (data == "2") {
			jAlert("Bệnh nhân đã được xét nghiệm", 'Cảnh báo');
		} else {
			$("#huy_xn").click();
			// $('#list_xn_bhyt').jqGrid('clearGridData');
			// $('#list_xn_yeucau').jqGrid('clearGridData');
			var arr3 = [ makhambenh, ngaychidinh ];
			var url3 = "laydanhsach_phieuxetnghiem?url=" + convertArray(arr3);
			$("#list_xn_phieu").jqGrid('setGridParam', {
				datatype : 'json',
				url : url3
			}).trigger('reloadGrid');
		}
	});
}

function show_ckttpt() {
	$("#chuyenkhoa_ttpt").show();
	$("#chuyenkhoattpt").show();
}

function load_dichvu_ttpt(ret) {
	var sophieu = $("#sophieuttpt").val();
	var maloaidv = $("#loaittpt").val();
	var chuyenkhoa = (maloaidv == "VLTL") ? "0" : ($("#chuyenkhoattpt").val());
	var ctchuyenkhoa = (chuyenkhoa != "RANGHAMMAT") ? "0"
			: ($("#ctchuyenkhoattpt").val());
	var arr1 = [ "false", sophieu, maloaidv, chuyenkhoa, ctchuyenkhoa ];
	var arr2 = [ "true", sophieu, maloaidv, chuyenkhoa, ctchuyenkhoa ];
	if (ret.BHYT_CHI.toString() == "Yes") {
		$("#tab_ttpt").tabs("option", "active", 0);
		$("#tab_ttpt").tabs("option", "disabled", [ 1 ]);
		var url1 = "laydanhsach_ttpt?url=" + convertArray(arr1);
		$("#list_ttpt_bhyt").jqGrid('setGridParam', {
			datatype : 'json',
			url : url1
		}).trigger('reloadGrid');
		$("#ttpt_cobhyt").click();
	} else {
		$("#tab_ttpt").tabs("option", "active", 1);
		$("#tab_ttpt").tabs("option", "disabled", [ 0 ]);
		var url2 = "laydanhsach_ttpt?url=" + convertArray(arr2);
		$("#list_ttpt_yeucau").jqGrid('setGridParam', {
			datatype : 'json',
			url : url2
		}).trigger('reloadGrid');
		$("#ttpt_bnyc").click();
	}
}

function loadtt_ttpt(arr) {
	$("#hotenttpt").val(arr.TEN_BENH_NHAN.toUpperCase());
	$("#tuoittpt").val(arr.TUOI);
	if (arr.SO_THE_BHYT != null) {
		$("#cobhytttpt").attr('checked', true);
		cobaohiemyte = 'true';
	} else {
		$("#cobhytttpt").attr('checked', false);
		cobaohiemyte = 'false';
	}
	$("#gioitinhttpt").val(arr.GIOI_TINH);
	$("#diachittpt").val(arr.DIA_CHI);
}

function load_thongtin_ttpt(ret) {
    $('#phongttpt').val(ret.MA_PHONG_DICHVU);
    $('#loaittpt').val(ret.MA_LOAI_DICHVU);
    if ($("#loaittpt").val() != "VLTL" && $("#loaittpt").val() != "TIEMNGUA") {
        show_ckttpt();
        if ($("#chuyenkhoattpt").val() == "RANGHAMMAT")
            show_ctttpt();
    }
    else {
        hide_ckttpt();
        hide_ctttpt();
    }
    $('#chuyenkhoattpt').val(ret.CHUYEN_KHOA);
    if ($("#chuyenkhoattpt").val() == "RANGHAMMAT")
        show_ctttpt();
    else
        hide_ctttpt();
    $('#ctchuyenkhoattpt').val(ret.CHI_TIET_CHUYEN_KHOA);
    $('#ngaychidinhttpt').val(ret.NGAY_CHI_DINH);
    $('#sophieuttpt').val(ret.SO_PHIEU_DICHVU);
    $("#capcuuttpt").prop('checked', ret.CAPCUU.toString() == "1" ? true : false);
}

function toogle_input_ttpt(bool) {
    $("#phongttpt").attr("disabled", bool);
    if (ttpt_vltl == "0") {
        $("#loaittpt").attr("disabled", bool);
    }
    else {
        $("#loaittpt").attr("disabled", true);
    }
    $("#chuyenkhoattpt").attr("disabled", bool);
    $("#ctchuyenkhoattpt").attr("disabled", bool);
    $("#ngaychidinhttpt").attr("disabled", bool);
    //$("#capcuuttpt").attr("disabled", bool);
}

function disable_bt_in_ttpt() {
    $("#phieu_ttpt").attr("disabled", true);
    $("#phieu_ttpt").addClass("button_disabled");
    $("#phieu_ttpt").removeClass("button_shadow");
}

function luu_ttpt(dvtt) {
    var sophieu = $("#sophieuttpt").val();
    var idtiepnhan = $("#idtiepnhan").val();
    var makhambenh = "kb_" + idtiepnhan;
    var mabenhnhan = $("#mayte").val();
    var sophieuthanhtoan = $("#sophieuthanhtoan").val();
    var active = $("#tab_ttpt").tabs("option", "active");
    var capcuu = $("#capcuuttpt").prop("checked") == true ? "1" : "0";
    var url_cn = "ttpt_update_bangcha";
    var ngaytiepnhan = $("#ngaytiepnhan").val();
    var arr_cn = [makhambenh, dvtt, sophieu, capcuu];
    $.post(url_cn, {url: convertArray(arr_cn)});
    if (active == 0) {
        var str = $("#list_ttpt_bhyt").jqGrid('getGridParam', 'selarrrow');
        if (str != "" && str != null) {
            var count = str.length;
            for (var i = 0; i < count; i++) {
                var ret = $("#list_ttpt_bhyt").jqGrid('getRowData', str[i]);
                var madv = ret.MA_DV;
                var sl = ret.SO_LUONG;
                var giadv = ret.GIA_DV;
                var thanhtien = ret.THANH_TIEN;
                var arr = [sophieu, madv, sl, giadv, thanhtien, "false", mabenhnhan, sophieuthanhtoan, idtiepnhan, makhambenh,ngaytiepnhan];
                var url = "themchidinh_ttptchitiet_ytcs?url=" + convertArray(arr);
                $.ajax({
                    url: url
                }).always(function(data) {
                    enable_button_ttpt("luu");
                    toogle_input_ttpt(false);
                    enable_bt_in_ttpt();
                });
            }
        } else {
            jConfirm('Chưa chọn thủ thuật phẩu thuật. Nhấn "Tiếp tục" để chỉ định. Nhấn "Hủy" để xóa phiếu?', 'Thông báo', function(r) {
                if (r.toString() == "false") {
                    xoa_ttpt();
                }
            });
        }
    } else {
        var str_yc = $("#list_ttpt_yeucau").jqGrid('getGridParam', 'selarrrow');
        if (str_yc != "" && str_yc != null) {
            var count = str_yc.length;
            for (var i = 0; i < count; i++) {
                var ret = $("#list_ttpt_yeucau").jqGrid('getRowData', str_yc[i]);
                var madv = ret.MA_DV;
                //var tendv=ret.TEN_DV;
                var sl = ret.SO_LUONG;
                var giadv = ret.GIA_DV;
                var thanhtien = ret.THANH_TIEN;
                var arr = [sophieu, madv, sl, giadv, thanhtien, "true", mabenhnhan, sophieuthanhtoan, idtiepnhan, makhambenh];
                var url = "themchidinh_ttptchitiet?url=" + convertArray(arr);
                $.ajax({
                    url: url
                }).always(function(data) {
                    enable_button_ttpt("luu");
                    toogle_input_ttpt(false);
                    enable_bt_in_ttpt();
                });
            }
        }
        else {
            jConfirm('Chưa chọn thủ thuật phẩu thuật. Nhấn "Tiếp tục" để chỉ định. Nhấn "Hủy" để xóa phiếu?', 'Thông báo', function(r) {
                if (r.toString() == "false") {
                    xoa_ttpt();
                }
            });
        }
    }
}

function enable_bt_in_ttpt() {
    $("#phieu_ttpt").attr("disabled", false);
    $("#phieu_ttpt").removeClass("button_disabled");
    $("#phieu_ttpt").addClass("button_shadow");
}

function xoa_ttpt() {
    var id1 = $("#list_ttpt_phieu").jqGrid('getGridParam', 'selrow');
    var ret = $("#list_ttpt_phieu").jqGrid('getRowData', id1);
    var makhambenh = "kb_" + $("#idtiepnhan").val();
    var ngaychidinh = convertStr_MysqlDate($("#ngaychidinhttpt").val());
    var arr = [makhambenh, ret.SO_PHIEU_DICHVU];
    var url = "xoaphieu_ttpt?url=" + convertArray(arr);
    $.ajax({
        url: url
    }).done(function(data) {
        enable_bt_in_ttpt();
        if (data == "1") {
            jAlert("Bệnh nhân đã thanh toán", 'Cảnh báo');
        }
        else if (data == "2") {
            jAlert("Bệnh nhân đã được chẩn đoán dịch vụ", 'Cảnh báo');
        }
        else {
            $("#huy_ttpt").click();
            var arr3 = [makhambenh, ngaychidinh];
            if (ttpt_vltl == "0") {
                url3 = "laydanhsach_phieudichvu?url=" + convertArray(arr3);
            } else if (ttpt_vltl == "1") {
                url3 = "vltl_laydanhsach_phieudichvu?url=" + convertArray(arr3);
            } else if (ttpt_vltl == "2") {
                url3 = "tiemngua_laydanhsach_phieudichvu?url=" + convertArray(arr3);
            }
            $("#list_ttpt_phieu").jqGrid('setGridParam', {datatype: 'json', url: url3}).trigger('reloadGrid');
        }
    });
}

function enable_button_cdha(bt) {
    if (bt == "batdau") {
        $("#them_cdha").attr("disabled", false);
        $("#them_cdha").removeClass("button_disabled");
        $("#them_cdha").addClass("button_shadow");
        $("#luu_cdha").attr("disabled", "disabled");
        $("#luu_cdha").addClass("button_disabled");
        $("#luu_cdha").removeClass("button_shadow");
        $("#huy_cdha").attr("disabled", "disabled");
        $("#huy_cdha").addClass("button_disabled");
        $("#huy_cdha").removeClass("button_shadow");
    }
    else if (bt == "them") {
        $("#them_cdha").attr("disabled", true);
        $("#them_cdha").addClass("button_disabled");
        $("#them_cdha").removeClass("button_shadow");
        $("#luu_cdha").attr("disabled", false);
        $("#luu_cdha").removeClass("button_disabled");
        $("#luu_cdha").addClass("button_shadow");
        $("#huy_cdha").attr("disabled", false);
        $("#huy_cdha").removeClass("button_disabled");
        $("#huy_cdha").addClass("button_shadow");
    }
    else if (bt == "huy" || bt == "luu") {
        $("#luu_cdha").attr("disabled", true);
        $("#luu_cdha").addClass("button_disabled");
        $("#luu_cdha").removeClass("button_shadow");
        $("#huy_xn").attr("disabled", true);
        $("#huy_xn").addClass("button_disabled");
        $("#huy_xn").removeClass("button_shadow");
        $("#them_cdha").attr("disabled", false);
        $("#them_cdha").addClass("button_shadow");
        $("#them_cdha").removeClass("button_disabled");
    }
}
function toogle_input_cdha(bool) {
    $("#phongcdha").attr("disabled", bool);
    //$("#capcuucdha").attr("disabled", bool);
    $("#ngaycdha").attr("disabled", bool);
}

function loadtt_cdha(arr) {
    $("#hotencdha").val(arr.TEN_BENH_NHAN.toUpperCase());
    $("#tuoicdha").val(arr.TUOI);
    if (arr.SO_THE_BHYT != null && arr.SO_THE_BHYT != '')
        $("#cobhytcdha").attr('checked', true);
    else
        $("#cobhytcdha").attr('checked', false);
    $("#gioitinhcdha").val(arr.GIOI_TINH);
    $("#diachicdha").val(arr.DIA_CHI);
}

function load_thongtin_cdha(ret) {
    $('#phongcdha').val(ret.MA_PHONG_CDHA);
    $('#ngaycdha').val(ret.NGAY_CHI_DINH);
    $('#sophieucdha').val(ret.SO_PHIEU_CDHA);
    var bhytkhongchi = ret.CO_BHYT.toString() == "No" ? "1" : "0";
    $('#bhytkhongchi_cdha').val(bhytkhongchi);
    $("#capcuucdha").prop('checked', ret.CAPCUU.toString() == "1" ? true : false);
}

function load_dichvu_cdha(ret) {
    var sophieu = $("#sophieucdha").val();
    var arr1 = ["false", sophieu, ret.MA_PHONG_CDHA];
    var arr2 = ["true", sophieu, ret.MA_PHONG_CDHA];
    if (ret.CO_BHYT.toString() == "Yes") {
        $("#tab_cdha").tabs("option", "active", 0);
        $("#tab_cdha").tabs("option", "disabled", [1]);
        var url1 = "laydanhsach_cdha?url=" + convertArray(arr1);
        $("#list_cdha_bhyt").jqGrid('setGridParam', {datatype: 'json', url: url1}).trigger('reloadGrid');
        $("#cdha_cobhyt").click();
    }
    else {
        $("#tab_cdha").tabs("option", "active", 1);
        $("#tab_cdha").tabs("option", "disabled", [0]);
        var url2 = "laydanhsach_cdha?url=" + convertArray(arr2);
        $("#list_cdha_yeucau").jqGrid('setGridParam', {datatype: 'json', url: url2}).trigger('reloadGrid');
        $("#cdha_bnyc").click();
    }
}
function disable_bt_in_cdha() {
    $("#phieu_cdha").attr("disabled", true);
    $("#phieu_cdha").addClass("button_disabled");
    $("#phieu_cdha").removeClass("button_shadow");
}

function luu_cdha(dvtt) {
    var sophieu = $("#sophieucdha").val();
    var idtiepnhan = $("#idtiepnhan").val();
    var makhambenh = "kb_" + idtiepnhan;
    var mabenhnhan = $("#mayte").val();
    var sophieuthanhtoan = $("#sophieuthanhtoan").val();
    var active = $("#tab_cdha").tabs("option", "active");
    var capcuu = $("#capcuucdha").prop("checked") == true ? "1" : "0";
    var url_cn = "cdha_update_bangcha";
    var arr_cn = [makhambenh, dvtt, sophieu, capcuu];
    $.post(url_cn, {url: convertArray(arr_cn)});
    if (active == 0) {
        var str = $("#list_cdha_bhyt").jqGrid('getGridParam', 'selarrrow');
        if (str != "" && str != null) {
            var count = str.length;
            for (var i = 0; i < count; i++) {
                var ret = $("#list_cdha_bhyt").jqGrid('getRowData', str[i]);
                var madv = ret.MA_CDHA;
                var sl = ret.SO_LUONG;
                var giadv = ret.GIA_CDHA;
                var thanhtien = ret.THANH_TIEN;
                var arr = [sophieu, madv, sl, giadv, thanhtien, "false", mabenhnhan, sophieuthanhtoan, idtiepnhan, makhambenh];
                var url = "themchidinh_cdhachitiet?url=" + convertArray(arr);
                $.ajax({
                    url: url
                }).done(function(data) {

                });
            }
            enable_button_cdha("luu");
            toogle_input_cdha(false);
            enable_bt_in_cdha();
        }
        else {
            jConfirm('Chưa chọn chẩn đoán hình ảnh. Nhấn "Tiếp tục" để chỉ định. Nhấn "Hủy" để xóa phiếu?', 'Thông báo', function(r) {
                if (r.toString() == "false") {
                    xoa_cdha();
                }
            });
        }
    } else if (active == 1) {
        var str_yc = $("#list_cdha_yeucau").jqGrid('getGridParam', 'selarrrow');
        if (str_yc != "" && str_yc != null) {
            //var mang_yc = str_yc.split(",");
            var count = str_yc.length;
            for (var i = 0; i < count; i++) {
                var ret = $("#list_cdha_yeucau").jqGrid('getRowData', str_yc[i]);
                var madv = ret.MA_CDHA;
                var sl = ret.SO_LUONG;
                var giadv = ret.GIA_CDHA;
                var thanhtien = ret.THANH_TIEN;
                var arr = [sophieu, madv, sl, giadv, thanhtien, "true", mabenhnhan, sophieuthanhtoan, idtiepnhan, makhambenh];
                var url = "themchidinh_cdhachitiet?url=" + convertArray(arr);
                var url_en = (url);
                $.ajax({
                    url: url_en
                }).done(function(data) {
                });
            }
            enable_button_cdha("luu");
            toogle_input_cdha(false);
            enable_bt_in_cdha()
        }
        else {
            jConfirm('Chưa chọn chẩn đoán hình ảnh. Nhấn "Tiếp tục" để chỉ định. Nhấn "Hủy" để xóa phiếu?', 'Thông báo', function(r) {
                if (r.toString() == "false") {
                    xoa_cdha();
                }
            });
        }
    }
}
function enable_bt_in_cdha() {
    $("#phieu_cdha").attr("disabled", false);
    $("#phieu_cdha").removeClass("button_disabled");
    $("#phieu_cdha").addClass("button_shadow");
}

function xoa_cdha() {
    var id1 = $("#list_cdha_phieu").jqGrid('getGridParam', 'selrow');
    var ret = $("#list_cdha_phieu").jqGrid('getRowData', id1);
    var makhambenh = "kb_" + $("#idtiepnhan").val();
    var ngaychidinh = convertStr_MysqlDate($("#ngaycdha").val());
    var arr = [makhambenh, ret.SO_PHIEU_CDHA];
    var url = "xoaphieu_cdha?url=" + convertArray(arr);
    $.ajax({
        url: url
    }).done(function(data) {
        if (data == "1") {
            jAlert("Bệnh nhân đã thanh toán", 'Cảnh báo');
        }
        else if (data == "2") {
            jAlert("Bệnh nhân đã được thực hiện chẩn đoán hình ảnh", 'Cảnh báo');
        }
        else {
            $("#huy_cdha").click();
            var arr3 = [makhambenh, ngaychidinh];
            var url3 = "laydanhsach_phieucdha?url=" + convertArray(arr3);
            $("#list_cdha_phieu").jqGrid('setGridParam', {datatype: 'json', url: url3}).trigger('reloadGrid');
        }
        enable_bt_in_cdha();
    });
}
function clear_thuoc_mn() {
    $("#tenthuongmai_mn").val("");
    $("#tengoc_mn").val("");
    $("#dvt_mn").val("");
    $("#dangthuoc_mn").val("");
    $("#cachdung_mn").val("");
    $("#songay_mn").val("");
    $("#sang_mn").val("");
    $("#trua_mn").val("");
    $("#chieu_mn").val("");
    $("#toi_mn").val("");
    $("#soluong_mn").val("");
    $("#mavattu_mn").val("");
    $("#makhovattu_mn").val("");
    $("#sott_toathuoc_mn").val("");
}
function enableNgayKham(){
	if($("#idtiepnhan").val() != null && $("#idtiepnhan").val() != ""){
		$("#ngaytiepnhan").attr("disabled", true);
		$("#mayte").attr("disabled", true);
		$("#btnChonBenhNhan").attr("disabled", true);
		$("#btnChonBenhNhantheoten").attr("disabled", true);
//		$("#btnChonBenhNhan").addClass("button_disabled");
//		$("#btnChonBenhNhan").removeClass("button_shadow");
	}
	else{
		$("#ngaytiepnhan").attr("disabled", false);
		$("#mayte").attr("disabled", false);
		$("#btnChonBenhNhan").attr("disabled", false);
		$("#btnChonBenhNhantheoten").attr("disabled", false);
//		$("#btnChonBenhNhan").removeClass("button_disabled");
//		$("#btnChonBenhNhan").addClass("button_shadow");
	}
}
function checkButtonHoanTatKham(trangthaikham){
	$("#btnInBangKe").attr("disabled", false);
	$("#btnInBangKe").removeClass("button_disabled");
	$("#btnInBangKe").addClass("button_shadow");
	$("#btnInDonthuoc").attr("disabled", false);
	$("#btnInDonthuoc").removeClass("button_disabled");
	$("#btnInDonthuoc").addClass("button_shadow");
	$("#btnBenhAn").attr("disabled", false);
	$("#btnBenhAn").removeClass("button_disabled");
	$("#btnBenhAn").addClass("button_shadow");
	
	if(trangthaikham==3 || trangthaikham==6){
		$("#btnLuu").attr("disabled", true);
		$("#btnLuu").addClass("button_disabled");
		$("#btnLuu").removeClass("button_shadow");

		$("#btnXoa").attr("disabled", true);
		$("#btnXoa").addClass("button_disabled");
		$("#btnXoa").removeClass("button_shadow");
		
//		$("#btnHuy").attr("disabled", true);
//		$("#btnHuy").addClass("button_disabled");
//		$("#btnHuy").removeClass("button_shadow");

		$("#btnDonThuoc").attr("disabled", true);
		$("#btnDonThuoc").addClass("button_disabled");
		$("#btnDonThuoc").removeClass("button_shadow");
		
		$("#btnXetNghiem").attr("disabled", true);
		$("#btnXetNghiem").addClass("button_disabled");
		$("#btnXetNghiem").removeClass("button_shadow");
		
		$("#btnTTPT").attr("disabled", true);
		$("#btnTTPT").addClass("button_disabled");
		$("#btnTTPT").removeClass("button_shadow");
		
		$("#btnCTKB").attr("disabled", true);
		$("#btnCTKB").addClass("button_disabled");
		$("#btnCTKB").removeClass("button_shadow");
		
		$("#btnCDHA").attr("disabled", true);
		$("#btnCDHA").addClass("button_disabled");
		$("#btnCDHA").removeClass("button_shadow");
		
		$("#saveKT").attr("disabled", true);
		$("#saveKT").addClass("button_disabled");
		$("#saveKT").removeClass("button_shadow");
		
		$("#deleteKT").attr("disabled", true);
		$("#deleteKT").addClass("button_disabled");
		$("#deleteKT").removeClass("button_shadow");
		
		$("#saveSS").attr("disabled", true);
		$("#saveSS").addClass("button_disabled");
		$("#saveSS").removeClass("button_shadow");
		
		$("#deleteSS").attr("disabled", true);
		$("#deleteSS").addClass("button_disabled");
		$("#deleteSS").removeClass("button_shadow");
		
		$("#savePT").attr("disabled", true);
		$("#savePT").addClass("button_disabled");
		$("#savePT").removeClass("button_shadow");
		
		$("#deletePT").attr("disabled", true);
		$("#deletePT").addClass("button_disabled");
		$("#deletePT").removeClass("button_shadow");
		
		$("#saveKHHGD").attr("disabled", true);
		$("#saveKHHGD").addClass("button_disabled");
		$("#saveKHHGD").removeClass("button_shadow");
		
		$("#deleteKHHGD").attr("disabled", true);
		$("#deleteKHHGD").addClass("button_disabled");
		$("#deleteKHHGD").removeClass("button_shadow");
		
		$("#saveHIV").attr("disabled", true);
		$("#saveHIV").addClass("button_disabled");
		$("#saveHIV").removeClass("button_shadow");
		
		$("#deleteHIV").attr("disabled", true);
		$("#deleteHIV").addClass("button_disabled");
		$("#deleteHIV").removeClass("button_shadow");
		
		$("#saveLao").attr("disabled", true);
		$("#saveLao").addClass("button_disabled");
		$("#saveLao").removeClass("button_shadow");
		
		$("#deleteLao").attr("disabled", true);
		$("#deleteLao").addClass("button_disabled");
		$("#deleteLao").removeClass("button_shadow");
		
		$("#saveSR").attr("disabled", true);
		$("#saveSR").addClass("button_disabled");
		$("#saveSR").removeClass("button_shadow");
		
		$("#deleteSR").attr("disabled", true);
		$("#deleteSR").addClass("button_disabled");
		$("#deleteSR").removeClass("button_shadow");
		
		$("#saveTamThan").attr("disabled", true);
		$("#saveTamThan").addClass("button_disabled");
		$("#saveTamThan").removeClass("button_shadow");

		$("#deleteTamThan").attr("disabled", true);
		$("#deleteTamThan").addClass("button_disabled");
		$("#deleteTamThan").removeClass("button_shadow");
		
		
		$("#btnHoanTatKham").hide();
		$("#btnHuyHoanTatKham").show();
		
		
        disable_toathuoc();
        disable_toathuoc_mn();
        disable_toathuoc_mp();
        disable_toathuoc_quay();
        disable_toathuoc_vt();
        disable_toathuoc_dy();
        disable_toathuoc_ct();
	}
	else{
		$("#btnLuu").attr("disabled", false);
		$("#btnLuu").removeClass("button_disabled");
		$("#btnLuu").addClass("button_shadow");

		$("#btnXoa").attr("disabled", false);
		$("#btnXoa").removeClass("button_disabled");
		$("#btnXoa").addClass("button_shadow");
		
//		$("#btnHuy").attr("disabled", true);
//		$("#btnHuy").addClass("button_disabled");
//		$("#btnHuy").removeClass("button_shadow");

		$("#btnDonThuoc").attr("disabled", false);
		$("#btnDonThuoc").removeClass("button_disabled");
		$("#btnDonThuoc").addClass("button_shadow");

		$("#btnXetNghiem").attr("disabled", false);
		$("#btnXetNghiem").removeClass("button_disabled");
		$("#btnXetNghiem").addClass("button_shadow");

		$("#btnTTPT").attr("disabled", false);
		$("#btnTTPT").removeClass("button_disabled");
		$("#btnTTPT").addClass("button_shadow");
		
		$("#btnCTKB").attr("disabled", false);
		$("#btnCTKB").removeClass("button_disabled");
		$("#btnCTKB").addClass("button_shadow");
		
		$("#btnCDHA").attr("disabled", false);
		$("#btnCDHA").removeClass("button_disabled");
		$("#btnCDHA").addClass("button_shadow");
		
		$("#saveKT").attr("disabled", false);
		$("#saveKT").removeClass("button_disabled");
		$("#saveKT").addClass("button_shadow");
		
		$("#deleteKT").attr("disabled", false);
		$("#deleteKT").removeClass("button_disabled");
		$("#deleteKT").addClass("button_shadow");
		
		$("#saveSS").attr("disabled", false);
		$("#saveSS").removeClass("button_disabled");
		$("#saveSS").addClass("button_shadow");
		
		$("#deleteSS").attr("disabled", false);
		$("#deleteSS").removeClass("button_disabled");
		$("#deleteSS").addClass("button_shadow");
		
		$("#savePT").attr("disabled", false);
		$("#savePT").removeClass("button_disabled");
		$("#savePT").addClass("button_shadow");
		
		$("#deletePT").attr("disabled", false);
		$("#deletePT").removeClass("button_disabled");
		$("#deletePT").addClass("button_shadow");
		
		$("#saveKHHGD").attr("disabled", false);
		$("#saveKHHGD").removeClass("button_disabled");
		$("#saveKHHGD").addClass("button_shadow");
		
		$("#deleteKHHGD").attr("disabled", false);
		$("#deleteKHHGD").removeClass("button_disabled");
		$("#deleteKHHGD").addClass("button_shadow");
		
		$("#saveHIV").attr("disabled", false);
		$("#saveHIV").removeClass("button_disabled");
		$("#saveHIV").addClass("button_shadow");
		
		$("#deleteHIV").attr("disabled", false);
		$("#deleteHIV").removeClass("button_disabled");
		$("#deleteHIV").addClass("button_shadow");
		
		$("#saveLao").attr("disabled", false);
		$("#saveLao").removeClass("button_disabled");
		$("#saveLao").addClass("button_shadow");
		
		$("#deleteLao").attr("disabled", false);
		$("#deleteLao").removeClass("button_disabled");
		$("#deleteLao").addClass("button_shadow");
		
		$("#saveSR").attr("disabled", false);
		$("#saveSR").removeClass("button_disabled");
		$("#saveSR").addClass("button_shadow");
		
		$("#deleteSR").attr("disabled", false);
		$("#deleteSR").removeClass("button_disabled");
		$("#deleteSR").addClass("button_shadow");
		
		$("#saveTamThan").attr("disabled", false);
		$("#saveTamThan").removeClass("button_disabled");
		$("#saveTamThan").addClass("button_shadow");
		
		$("#deleteTamThan").attr("disabled", false);
		$("#deleteTamThan").removeClass("button_disabled");
		$("#deleteTamThan").addClass("button_shadow");
		
		$("#btnHoanTatKham").show();
		$("#btnHuyHoanTatKham").hide();
		enable_toathuoc();
		enable_toathuoc_quay();
		enable_toathuoc_vt();
		enable_toathuoc_mn();
		enable_toathuoc_mp();
		enable_toathuoc_dy();
		enable_toathuoc_ct();
	}
	
} 

