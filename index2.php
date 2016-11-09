<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Shop Homepage - Start Bootstrap Template</title>

    <!-- Bootstrap Core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="css/shop-homepage.css" rel="stylesheet">



    <!--Jquery-->
    <link rel="stylesheet" href="resources/css/jquery-ui-redmond.1.9.1.css"  />
    <script src="resources/js/jquery.min.1.9.1.js" ></script>    
    <script src="resources/js/jquery-ui.1.9.1.js" ></script>
    <script src="https://cdn.socket.io/socket.io-1.2.1.js"></script>

    <script src="https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyDQ5acvXFcvBQ5bV2nO1ojDL4ApdT8UQsI"></script>

    <!--Grid-->
    <link href="resources/jqgrid/css/ui.jqgrid.css"  rel="stylesheet"/>           
    <script src="resources/jqgrid/js/i18n/grid.locale-en.js" ></script>            
    <script src="resources/jqgrid/js/jquery.jqGrid.src.js" ></script>
    <script src="resources/js/common_function.js" ></script>
    <script src="resources/js/jquery.inputmask.bundle.min.js" ></script>


</head>

<body>

    <!-- Navigation -->
    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">VNPT MAP</a>
            </div>
            <!-- Collect the nav links, forms, and other content for toggling -->
            <!-- <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li>
                        <a href="#">About</a>
                    </li>
                    <li>
                        <a href="#">Services</a>
                    </li>
                    <li>
                        <a href="#">Contact</a>
                    </li>
                </ul>
            </div> -->
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container -->
    </nav>

    <!-- Page Content -->
    <div class="container">

        <div class="row">

            <div class="col-md-4">
            	<div id="log" hidden ><font color="red">Đã nhận tọa độ mới!</font></div>
		        <input name="ngay" type="text" class="width_100per" id="ngay" data-inputmask="'alias': 'date'"/>
		        
		        <br>
		        
		        <input type="button" name="clickme" id="laydsnhanvien" value="Lấy danh sách" class="btn btn-success"/>
		        &nbsp;&nbsp;&nbsp;<input type="checkbox" name="daduyet" id="daduyet"> Đã duyệt
		        <br/>
                <div>
                    <table id="dsnhanvien"></table>
                </div>
            </div>

            <div class="col-md-8">

                <div class="row carousel-holder">

                    <div class="col-md-12">
                    	<table>
                    		<tr>
                    			
                    			<td><label>Họ tên:&nbsp;</label></td>
                    			<td colspan="3"><input type="text" id="hoten" readonly="readonly"  size="30" /><br></td>
                    			<td class="text-right"><label>&nbsp;Số điện thoại:&nbsp;</label></td>
                    			<td><input type="text" id="sdt" readonly="readonly" /></td>
                    		</tr>
                    		<tr>
                    			<td>&nbsp;</td>
                    		</tr>
                    		<tr>
                    			
                    			<td class="text-right"><label>&nbsp;Vĩ độ:&nbsp;</label></td>
                    			<td><input type="text" id="vido" readonly="readonly" size="8" /><br></td>
                    			<td class="text-right"><label>&nbsp;Kinh độ:&nbsp;</label></td>
                    			<td><input type="text" id="kinhdo" readonly="readonly" size="8" /></td>
                    			<td class="text-right"><label>&nbsp;Thời gian:&nbsp;</label></td>
                    			<td><input type="text" id="thoigian" readonly="readonly" /><br></td>
                    		</tr>

                    	</table>
                    	
                    	 
                    	 
                    	
                    	<hr>
                    	<form action="" menthod="post">
                        <input type="button" name="duyet" id="duyet" hidden style="font-size : 18px;height:30px;width:70px"  value="Duyệt" />
                    	</form>
                        <div id="mapholder"></div>
                        <input type="button" name="prev" id="prev" hidden  value="<<"/>
	                    <input type="text" name="pagenumber" id="pagenumber" hidden size="1" disabled style="text-align:center;" />
	                    <input type="button" name="next" id="next" hidden  value=">>"/>
                    </div>

                </div>


            </div>

        </div>

    </div>
    <!-- /.container -->

    <div class="container">


        <!-- Footer -->
        <footer class="bg-primary">
            <div class="row">
                <div class="col-lg-12 text-center">
                	<br>
                    <p>©2014-2015, Tập Đoàn Bưu Chính Viễn Thông Việt Nam</p>
					<p>Địa chỉ: 57 Huỳnh Thúc Kháng - Q.Đống Đa - TP.Hà Nội</p>
					<p>Website: http://vnpt.vn</p>
                </div>
            </div>
        </footer>

    </div>
    <!-- /.container -->

    <script>
            $(":input").inputmask();
            $("#ngay").datepicker().datepicker("setDate", new Date());
            $("#ngay").datepicker("option", "dateFormat", "dd/mm/yy");

            var id_nhanvien=0;
            var ketquabando;
            var index_bando=0;


            $('#prev').click(function(){
                if(index_bando>0)
                    {
                        index_bando=index_bando-1;
                        $('#pagenumber').val(index_bando+1+"/"+ketquabando.length);
                        showPosition(ketquabando[index_bando].latitude, ketquabando[index_bando].longitude);
                    }
            });

            $('#next').click(function(){
                if(index_bando<ketquabando.length-1)
                    {
                        index_bando=index_bando+1;
                        $('#pagenumber').val(index_bando+1+"/"+ketquabando.length);
                        showPosition(ketquabando[index_bando].latitude, ketquabando[index_bando].longitude);
                    }
            });

            
            $('#duyet').click(function()
            {
                var ngay = convertStr_MysqlDate($("#ngay").val());
                $.ajax({
                    url : 'xuly.php',
                    type : 'post',
                    dataType : 'text',
                    data : {
                         id : id_nhanvien,
                         ngay : ngay
                    },
                    success : function (result){
                        reload();
                        $('#duyet').attr('hidden','true');
                    }
                });
            });

            $("#daduyet").change(function(evt) {
                reload()
                $('#duyet').attr('hidden','true');
            });

            function reload(){
                $('#log').attr('hidden','true');
                var ngay = convertStr_MysqlDate($("#ngay").val());
                var daduyet = $("#daduyet").prop('checked');
                if(daduyet==true)
                    daduyet=1;
                else
                    daduyet=0;
                var url = "xuly.php?ngay="+ngay+"&daduyet="+daduyet;
                $("#dsnhanvien").jqGrid('setGridParam', {datatype: 'json', url: url}).trigger('reloadGrid');
            }



            $('#laydsnhanvien').click(function()
            {
                reload();
                $('#duyet').attr('hidden','true');
            });

            $("#dsnhanvien").jqGrid({
                url: '',
                datatype: "local",
                width: "320",
                height: "500",

                colNames: ['Id', 'Tên cộng tác viên','Số điện thoại'],
                colModel: [
                    {name: 'id', index: 'id', width: 50},  
                    {name: 'name', index: 'name', width: 150},
                    {name: 'phone', index: 'phone', width: 100},    
                ],
                rowNum: 100,
                caption: "Danh sách cộng tác viên",
                onSelectRow: function (id) {
                    if (id) {
                        var ret = $("#dsnhanvien").jqGrid('getRowData', id);
                        id_nhanvien = ret.id;                       
                        var ngay = convertStr_MysqlDate($("#ngay").val());
                        load_bando(ret.id, ngay);
                        var daduyet = $("#daduyet").prop('checked');
                        if(daduyet==false)
                            $('#duyet').removeAttr('hidden');

                        $('#prev').removeAttr('hidden');
                        $('#next').removeAttr('hidden');
                        $('#pagenumber').removeAttr('hidden');
                    }
                },
                footerrow: true
                
            });
            
            function load_bando(id, ngay){
                $.ajax({
                    url : 'xuly.php?id='+id+'&ngay='+ngay,
                    type : 'get',
                    dataType : 'json',
                    success : function (result){
                        ketquabando=result;
                        index_bando=0;
                        $('#pagenumber').val(index_bando+1+"/"+ketquabando.length);
                        showPosition(ketquabando[index_bando].latitude, ketquabando[index_bando].longitude);

                        /*$.each (result, function (key, item){
                            var vido = item['latitude'];
                            var kinhdo = item['longitude'];
                            showPosition(vido, kinhdo);

                        });*/
                    }
                });
            }

            //showPosition(10.99, 106.66);
            //Hàm Load bản đồ
            function showPosition(latitude, longitude) {
                if(typeof latitude == "undefined" || typeof latitude == "undefined") {
                    console.log("Vị trí nhập vào không hợp lệ!");
                }

                $('#hoten').val(ketquabando[index_bando].name);
                $('#sdt').val(ketquabando[index_bando].phone);
                $('#vido').val(ketquabando[index_bando].latitude);
                $('#kinhdo').val(ketquabando[index_bando].longitude);
                $('#thoigian').val(ketquabando[index_bando].datetime);

                latlon = new google.maps.LatLng(latitude, longitude)
                mapholder = document.getElementById('mapholder')
                mapholder.style.height = '450px';
                mapholder.style.width = '100%';

                var myOptions = {
                    center: latlon,
                    zoom: 12,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    mapTypeControl: false,
                    navigationControlOptions: {
                        style: google.maps.NavigationControlStyle.SMALL
                    }
                };
                var map = new google.maps.Map(document.getElementById('mapholder'), myOptions);
                var marker = new google.maps.Marker({
                    position: latlon,
                    map: map,
                    title: 'Vị trí khẩn cấp'
                });
              }

            var socket = io.connect("http://localhost:3000/");
            socket.on('server-gui-ThongBao', function(data){
                $('#log').removeAttr('hidden');
                /*var dt = new Date();
                var time="";

                if(dt.getHours()<10)
                    time+="0"+dt.getHours();
                else
                    time+=dt.getHours();
                time+=":";
                if(dt.getMinutes()<10)
                    time+="0"+dt.getMinutes();
                else
                    time+=dt.getMinutes();
                time+=":";
                if(dt.getSeconds()<10)
                    time+="0"+dt.getSeconds();
                else
                    time+=dt.getSeconds();

                var text = $('#log').html();
                text=time+" - Đã nhận tọa độ mới<br/>"+text;
                $("#log").html(text);*/
            });       

    </script>

    <!-- Bootstrap Core JavaScript -->
    <script src="js/bootstrap.min.js"></script>

</body>

</html>
