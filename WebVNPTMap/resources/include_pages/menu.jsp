<%-- 
    Document   : menu
    Created on : Dec 19, 2015, 9:45:36 PM
    Author     : NguyenHoanTuan
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<script src="<c:url value="/resources/js/cookies.js" />"></script>
<script src="<c:url value="/resources/dropdownmenu/js/modernizr.custom.js" />"></script>

<script>
    function isExists() {
        $.get("isExists", function () {
        });
    }
    function disableBackButton()
    {
        if (checkCookie("booldangnhap")) {
            var pathname = getCookie("booldangnhap");
            if (pathname == "0") {
                window.history.forward();
            }
        }
    }
    $(function () {
        var duongdan = location.pathname;
        var arr = duongdan.split("/");
        var url = "kiemtra_phanquyen_hethong";
        var maphongban = "${Sess_PhongBan}";
        $.post(url, {duongdan: arr[2], manhanvien: "${Sess_UserID}", dvtt: "${Sess_DVTT}"}).done(function (data) {
            if (data == "0" && arr[2] != "thongtinnhanvien") {
                $(location).attr('href', 'thongtinnhanvien');
            } else {
                if (arr[2] == "khambenhngoaitru" && maphongban == "820082")
                {
                    $(location).attr('href', 'khambenhcapcuu');
                    var url1 = "udpate_form_gannhat";
                    $.post(url1, {tenmenu: "khambenhcapcuu", manhanvien: "${Sess_UserID}"});
                }
                else if (arr[2] == "khambenhcapcuu" && maphongban == "820081")
                {
                    $(location).attr('href', 'khambenhngoaitru');
                    var url1 = "udpate_form_gannhat";
                    $.post(url1, {tenmenu: "khambenhngoaitru", manhanvien: "${Sess_UserID}"});
                }
                else {
                    var url1 = "udpate_form_gannhat";
                    $.post(url1, {tenmenu: arr[2], manhanvien: "${Sess_UserID}"});
                }
            }
        });
        var url = "thongbao_select";
        $.post(url, {dvtt: "${Sess_DVTT}"}).done(function (tb) {
            if (tb == "") {
                $("#information_div").hide();
            } else {
                $("#information_div").show();
                $("#information").text(tb);
            }
            var height_all = $("#panel_all").outerHeight() - $(".container").outerHeight() - $(".header").outerHeight();
            $('.center_content').css('min-height', height_all + 'px');
        });
        setTimeout("disableBackButton()", 0);
        setInterval("isExists()", 1000 * 60);
        if (getCookie("phongkham") != "") {
            $("span.tenphongkham").html("<a class='mau'>" + decodeURI(getCookie("tenphongkham")) + "</a> - ");
        } else {
            $("span.tenphongkham").html("");
        }
        var tendonvi = "${Sess_Tendonvi}";
        if (tendonvi.toLowerCase().indexOf("sở y tế") >= 0) {
            $("span.tenphongkham").html("");
            $(".settings").hide();
        }
        else if (tendonvi.toLowerCase().indexOf("bhxh") >= 0) {
            $("span.tenphongkham").html("");
            $(".settings").hide();
        }
        $(".logout").click(function (evt) {
            setCookie("booldangnhap", "0", 1);
            $(location).attr('href', 'logout');
        });
        $(".settings").click(function (evt) {
            $(location).attr('href', 'thietlapdonvi');
        });

        /*$(window).resize(function() {
         var height_all = $("#panel_all").outerHeight() - $(".container").outerHeight() - $(".header").outerHeight();
         $('.center_content').css('min-height', height_all + 'px');
         });*/
        //$(".panel_with_title").css('min-height', height_all + 'px');
    });
</script>       
<style>
    html,
    body {
        margin:0;
        padding:0;
        height:100%;
    }
    #panel_all {
        min-height:100%;
        position:relative;
    }
    #body {
        //padding-bottom:50px;   /* Height of the footer */
    }
    #footer {
        /*position:absolute;
        bottom:0;
        height:50px;
        width: 1000px*/
    }

</style>
<div class="container">
    <div class="main">
        <nav id="cbp-hrmenu" class="cbp-hrmenu">
            <ul>
                ${Sess_MenuNew}
            </ul>
        </nav>
    </div>
</div> 
<c:choose>
    <c:when test="${Sess_Tuyen > 3}">
        <link href="<c:url value="/resources/css/styles_tramyte.css" />" rel="stylesheet" />
              <link href="<c:url value="/resources/jqueryui_tramyte/jquery-ui.css" />" rel="stylesheet" />
              <link href="<c:url value="/resources/css/tables_tramyte.css" />" rel="stylesheet"/>
              <link href="<c:url value="/resources/dropdownmenu/css/component_tyt.css" />" rel="stylesheet"/>
              <!--              <link href="<c:url value="/resources/menu/styles_tramyte.css" />" rel="stylesheet" />-->
              <link href="<c:url value="/resources/css/divheader_tram.css" />" rel="stylesheet"/>  
    </c:when>
    <c:otherwise>
        <link href="<c:url value="/resources/css/styles_benhvien.css" />" rel="stylesheet" />
              <link href="<c:url value="/resources/jqueryui_benhvien/jquery-ui.css" />" rel="stylesheet" />
              <link href="<c:url value="/resources/css/tables_benhvien.css" />" rel="stylesheet"/>
              <link href="<c:url value="/resources/dropdownmenu/css/component.css" />" rel="stylesheet"/>
              <!--              <link href="<c:url value="/resources/menu/style_benhvien.css" />" rel="stylesheet" />-->
              <link href="<c:url value="/resources/css/divheader.css" />" rel="stylesheet"/>  
    </c:otherwise>
</c:choose>
<script src="<c:url value="/resources/dropdownmenu/js/cbpHorizontalMenu.js" />"></script>
<script>
    $(function () {
        cbpHorizontalMenu.init();
    });
</script>
<c:if test="${empty Sess_UserID}">
    <%
        response.sendRedirect("/web_his/dangnhap");
    %>  
</c:if>

<div class="header">
    <div id="information_div" style="width: 100%; text-align: center; border-bottom: solid 1px #9A9A9A; display: none">
        <marquee behavior="scroll" scrollamount="5" direction="left" style="background-color: white;padding: 2px 0 2px 0">Thông báo: <span style="font-weight:bold; color:red" id="information"><strong></strong></span></marquee>
    </div>
    <table id="table_header" align="center" style="background-color: white; border-bottom: 2px double #9A9A9A;">
        <tr>
            <td width="100%" align="right"><div class="header_right"><a class="mau">${Sess_User}</a> đăng nhập vào<span class="tenphongkham"></span><a class="mau">${Sess_Tendonvi}</a> <a class="settings" style="cursor: pointer">Thiết lập</a> <a class="logout" style="cursor: pointer">Đăng xuất</a></div></td>
        </tr>
    </table>
</div>