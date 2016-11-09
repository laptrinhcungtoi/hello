<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <link rel="icon" href="images/benhvien.png" type="image/x-icon">

    <title>VNPT MAP</title>


    <!-- Bootstrap Core CSS -->
    <link href="css/bootstrap.css" rel="stylesheet">

    <link href="css/vnpt_map.css" rel="stylesheet">

    <!-- Custom CSS -->

    <link href="css/shop-homepage.css" rel="stylesheet">
    


    <!--Jquery-->
    <link rel="stylesheet" href="resources/css/jquery-ui-redmond.1.9.1.css"  />
    <script src="resources/js/jquery.min.1.9.1.js" ></script>    
    <script src="resources/js/jquery-ui.1.9.1.js" ></script>
    <script src="js/socket.io-1.2.1.js"></script>

    <script src="js/googlemap.js"></script>

    <!--Grid-->
    <link href="resources/jqgrid/css/ui.jqgrid.css"  rel="stylesheet"/>           
    <script src="resources/jqgrid/js/i18n/grid.locale-en.js" ></script>            
    <script src="resources/jqgrid/js/jquery.jqGrid.src.js" ></script>
    <script src="resources/js/common_function.js" ></script>
    <script src="resources/js/jquery.inputmask.bundle.min.js" ></script>

    <link href="resources/dialog/jBox.css" rel="stylesheet"/>           
    <script src="resources/dialog/jBox.js"></script>
    <link href="resources/dialog/jquery.alerts.1.css" rel="stylesheet"/>           
    <script src="resources/dialog/jquery.alerts.js"></script>



</head>

<body style="background-color:#2c6784;">

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
                <a class="navbar-brand" href="index.php">VNPT MAP</a>
                <div id="log" hidden >
                    <span class="glyphicon glyphicon-bell" style="color:red;font-size: 25px;"></span>
                </div>
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
                <div class="col-md-8">
                <input name="ngay" type="text" class="width_100per" id="ngay" data-inputmask="'alias': 'date'"/>
                
                <br>
                
                <input type="button" name="clickme" id="laydsnhanvien" value="Làm mới" class="btn btn-success"/>
                &nbsp;&nbsp;&nbsp;<input type="checkbox" name="daduyet" id="daduyet"> Đã xử lý
                </div>
                

                <br/>
                <div class="col-md-12">
                    <table id="dsnhanvien"></table>
                </div>
            </div>

            <div class="col-md-8">

                <div class="row carousel-holder">

                    <div class="col-md-12">
                        <table>
                            <tr>
                                
                                <td class="text-right"><label>Họ tên:&nbsp;</label></td>
                                <td colspan="3"><input type="text" id="hoten" style="font-size : 15px;color:#31708f;font-weight: bold;"  readonly="readonly" /><br></td>
                                <td class="text-right"><label>&nbsp;Số điện thoại:&nbsp;</label></td>
                                <td><input type="text" id="sdt" readonly="readonly" /></td>
                            </tr>
                            
                            <tr>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td><label>Tình trạng:&nbsp;</label></td>
                                <td colspan="5">
                                    <input type="text" id="tinhtrang" style="font-size : 15px;font-weight: bold;"  readonly="readonly" size="55" />
                                </td>
                            </tr>

                            <tr>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                
                                <td class="text-right"><label>&nbsp;Thời gian:&nbsp;</label></td>
                                <td><input type="text" id="thoigian" readonly="readonly" /><br></td>
                                <td><label>&nbsp;</label></td>
                                <td colspan="3">
                                    <form action="" menthod="post">
                                        <input type="button" name="duyet" id="duyet" hidden  value="Xử lý xong" style="font-weight: bold;color:#31708f;"  />
                                    </form>
                                </td>
                            </tr>

                        </table>
                        
                         
                         
                      
                        
                        <div id="mapholder" style="border:1px solid #bbb" ></div>
                        <input type="button" name="prev" id="prev"   value="<<"/>
                        <input type="text" name="pagenumber" id="pagenumber"  size="1" disabled style="text-align:center;" />
                        <input type="button" name="next" id="next"   value=">>"/>
                    </div>

                </div>


            </div>

        </div>

    </div>
    <!-- /.container -->

    <div class="container">


        <!-- Footer -->
        <footer >
            <div class="row">
                <div class="col-lg-12 text-center" style="color:#fff;font-weight:bold;">
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

                jConfirm('Xác nhận xử lý xong', 'Thông báo', function (r) {
                    if (r.toString() == "true") {
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
                height: "520",

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
                $('#tinhtrang').val(ketquabando[index_bando].tinhtrang);
                $('#thoigian').val(ketquabando[index_bando].datetime);


                mapholder = document.getElementById('mapholder');
                mapholder.style.height = '487px';
                mapholder.style.width = '100%';

                var map = new google.maps.Map(document.getElementById('mapholder'));
            
                var directionsService = new google.maps.DirectionsService;
                var directionsDisplay = new google.maps.DirectionsRenderer;
                directionsDisplay.setMap(map);

                calculateAndDisplayRoute(directionsService, directionsDisplay);

              }

              function showPosition2(latitude, longitude) {
                if(typeof latitude == "undefined" || typeof latitude == "undefined") {
                    console.log("Vị trí nhập vào không hợp lệ!");
                }

                var latlon = new google.maps.LatLng(latitude, longitude)
                mapholder = document.getElementById('mapholder')
                mapholder.style.height = '487px';
                mapholder.style.width = '100%';

                var myOptions = {
                    center: latlon,
                    zoom: 12            
                };
                var map = new google.maps.Map(document.getElementById('mapholder'), myOptions);
                var marker = new google.maps.Marker({
                    position: latlon,
                    map: map,
                    title: 'Vị trí khẩn cấp',
                });

                var vitribenhvien = new google.maps.LatLng(10.9780915, 106.6540202);
                var img_benhvien = "images/benhvien.png";
                var marker = new google.maps.Marker({
                    position: vitribenhvien,
                    map: map,
                    icon: img_benhvien,
                    title: 'TTYT Thủ Dầu Một',

                });


                var latlngbounds = new google.maps.LatLngBounds();
                latlngbounds.extend(latlon);
                latlngbounds.extend(vitribenhvien);
                map.fitBounds(latlngbounds);

              }

              function load_bando_macdinh(latitude, longitude) {
                if(typeof latitude == "undefined" || typeof latitude == "undefined") {
                    console.log("Vị trí nhập vào không hợp lệ!");
                }

                var latlon = new google.maps.LatLng(latitude, longitude)
                mapholder = document.getElementById('mapholder')
                mapholder.style.height = '487px';
                mapholder.style.width = '100%';

                var myOptions = {
                    center: latlon,
                    zoom: 12            
                };
                var map = new google.maps.Map(document.getElementById('mapholder'), myOptions);


              }

              load_bando_macdinh(10.9780915,106.6540202);



              function calculateAndDisplayRoute(directionsService, directionsDisplay) {
                    var toado = ketquabando[index_bando].latitude+","+ketquabando[index_bando].longitude;
                    directionsService.route({
                      origin: '10.9780915, 106.6540202',
                      destination: toado,
                      travelMode: 'DRIVING'
                    }, function(response, status) {
                      if (status === 'OK') {
                        directionsDisplay.setDirections(response);
                      } else {
                        //window.alert('Directions request failed due to ' + status);
                        showPosition2(ketquabando[index_bando].latitude, ketquabando[index_bando].longitude);
                      }
                    });
                }

            var socket = io.connect("http://localhost:3000/");
            socket.on('server-gui-ThongBao', function(data){
                $('#log').removeAttr('hidden');

            });



            var kt_soluong=0;
            kt_soluong_load();

            function kt_soluong_load(){
                $.ajax({
                    url : 'xuly.php?kiemtra=true',
                    type : 'get',
                    dataType : 'json',
                    success : function (result){
                        kt_soluong=result[0].soluong;
                    }
                });
            }
            

            setInterval(function(){
               $.ajax({
                    url : 'xuly.php?kiemtra=true',
                    type : 'get',
                    dataType : 'json',
                    success : function (result){
                        var tam_soluong=result[0].soluong;
                        if(tam_soluong!=kt_soluong){
                            kt_soluong=tam_soluong;
                            $('#log').removeAttr('hidden');
                        }
                        
                    }
                });
            }, 5000);  

    </script>

    <!-- Bootstrap Core JavaScript -->
    <script src="js/bootstrap.min.js"></script>

</body>

</html>
