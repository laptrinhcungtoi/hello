//Nguyen Hoan Tuan
function validate_number(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    if (key != 8) {
        key = String.fromCharCode(key);
        var regex = /[0-9]|\./;
        if (!regex.test(key)) {
            theEvent.returnValue = false;
            if (theEvent.preventDefault)
                theEvent.preventDefault();
        }
    }
}
function convertArray_CLS(arr) {
    if (arr != null && arr.length > 0) {
        str = arr[0].toString().replace("````", "");
        for (i = 1; i < arr.length; i++) {
            str += encodeURI("````") + arr[i].toString().replace("````", "");
        }
        return str;
    }
}
function convertArray(arr) {
    if (arr != null && arr.length > 0) {
        str = arr[0].toString().replace("```", "");
        str=str.replace("&", "+");

        for (i = 1; i < arr.length; i++) {
            str += "```" + arr[i].toString().replace("```", "").replace("&","+");
        }
        return encodeURI(str);
    }
}
function convertStr_MysqlDate(str) {
    if (str != "") {
        arr = str.split("/");
        return arr[2] + "-" + arr[1] + "-" + arr[0];
    }
}
function convertDate_Str(date) {
    var ngay = new Date(Date.parse(date));
    var d = ngay.getDate();
    var d1 = (d < 10) ? ("0" + d) : d;
    var m = ngay.getMonth() + 1;
    var m1 = (m < 10) ? ("0" + m) : m;
    return d1 + "/" + m1 + "/" + ngay.getFullYear();
}
function convertDate(str) {
    if (str != null && str != "") {
        arr = str.split("-");
        return arr[2] + "/" + arr[1] + "/" + arr[0];
    }
}

function getCurrDate() {
    $ngayht = new Date();
    $day = $ngayht.getDate();
    if ($day < 10)
        $day = "0" + $day;
    $month = $ngayht.getMonth() + 1;
    if ($month < 10)
        $month = "0" + $month;
    return $day + "/" + $month + "/" + $ngayht.getFullYear();
}
function getNgayDauNam() {
    $ngayht = new Date();
    return "01/01/" + $ngayht.getFullYear();
}
function checkerror(arr) {
    if (arr.length > 0) {
        return true;
    }
    else
        return false;
}
function compareDate(date1, date2) {
    var time1 = Date.parse(date1);
    var time2 = Date.parse(date2);
    if (time1 > time2)
        return 1;
    else if (time1 == time2)
        return 0;
    else
        return -1;
}
function getDate(str) {
    if (str != "") {
        mang = str.split("/");
        date = new Date();
        date.setFullYear(mang[2], mang[1] - 1, mang[0]);
        return date;
    }
}
function getDayCount(date1, date2) {
    var ONE_DAY = 1000 * 60 * 60 * 24;
    var date1_ms = Date.parse(date1);
    var date2_ms = Date.parse(date2);
    var difference_ms = Math.abs(date1_ms - date2_ms);
    return Math.round(difference_ms / ONE_DAY);
}
function getDayofWeek(date) {
    var day = date.getDay();
    if (day == 0)
        return "<span style='color:red'>Chủ nhật</span>";
    else if (day == 1)
        return "Thứ hai";
    else if (day == 2)
        return "Thứ ba";
    else if (day == 3)
        return "Thứ tư";
    else if (day == 4)
        return "Thứ năm";
    else if (day == 5)
        return "Thứ sáu";
    else if (day == 6)
        return "<span style='color:orange'>Thứ bảy</span>";
}

function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += 1;
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}  


