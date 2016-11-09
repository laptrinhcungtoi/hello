function JSONToCVSConvertor(JSONData, ReportTitle, ShowLabel) {
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

    var CSV = '';
    //Set Report title in first row or line

    CSV += ReportTitle + '\r\n\n';

    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";

        //This loop will extract the label from 1st index of on array
        for (var index in arrData[0]) {

            //Now convert each value to string and comma-seprated
            row += index + ',';
        }

        row = row.slice(0, -1);

        //append Label row with line break
        CSV += row + '\r\n';
    }

    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
        var row = "";

        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }

        row.slice(0, row.length - 1);

        //add a line break after each row
        CSV += row + '\r\n';
    }

    if (CSV == '') {
        alert("Invalid data");
        return;
    }

    //Generate a file name
    var fileName = "MyReport_";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g, "_");

    //Initialize file format you want csv or xls
    var uri = 'data:text/cvs;charset=utf-8,' + escape(CSV);

    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension    

    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");
    link.href = uri;

    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".cvs";

    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
function JQGridtoHTMLTable(table_id, arr_field, arr_header) {
    var ids = $("#" + table_id).jqGrid('getDataIDs');
    var count = arr_field.length;
    var count2 = ids.length;
    var str = "<table id='table_html'><tr>";
    for (var i = 0; i < count; i++) {
        str += "<th>" + arr_header[i] + "</th>";
    }
    str += "</tr>";
    for (var i = 0; i < count2; i++) {
        str += "<tr>";
        //var ret = $("#" + table_id).jqGrid('getRowData', ids[i]);
        for (var j = 0; j < count; j++) {
            var field = arr_field[j];
            str += "<td>" + $("#" + table_id).jqGrid('getCell', ids[i], field) + "</td>";
        }
        str += "</tr>";
    }
    str += "</table>";
    return str;
}
