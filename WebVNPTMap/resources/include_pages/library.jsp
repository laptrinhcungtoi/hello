<%@page contentType="text/html" pageEncoding="UTF-8"%>
<c:choose>
    <c:when test="${Sess_Tuyen > 3}">
        <link href="<c:url value="/resources/css/styles_tramyte.css" />" rel="stylesheet" />
              <link href="<c:url value="/resources/jqueryui_tramyte/jquery-ui.css" />" rel="stylesheet" />
              <link href="<c:url value="/resources/css/tables_full.css" />" rel="stylesheet"/>
              <link href="<c:url value="/resources/dropdownmenu/css/component_tyt.css" />" rel="stylesheet"/>
              <!--              <link href="<c:url value="/resources/menu/styles_tramyte.css" />" rel="stylesheet" />-->
              <link href="<c:url value="/resources/css/divheader_tram.css" />" rel="stylesheet"/>  
    </c:when>
    <c:otherwise>
        <link href="<c:url value="/resources/css/styles_benhvien.css" />" rel="stylesheet" />
              <link href="<c:url value="/resources/jqueryui_benhvien/jquery-ui.css" />" rel="stylesheet" />
              <link href="<c:url value="/resources/css/tables_full.css" />" rel="stylesheet"/>
              <link href="<c:url value="/resources/dropdownmenu/css/component.css" />" rel="stylesheet"/>
              <!--              <link href="<c:url value="/resources/menu/style_benhvien.css" />" rel="stylesheet" />-->
              <link href="<c:url value="/resources/css/divheader.css" />" rel="stylesheet"/>  
    </c:otherwise>
</c:choose>
