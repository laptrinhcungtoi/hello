/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function kiemtraNamNu(hoten) {
    var words = hoten.split(" ");
    var word;
    var stt = 0;
    var tenchinh = "";
    for (word in words) {
        stt++;
        if (stt == 1)
        {
            if (words[word].trim() != "")
            {
                tenchinh = words[word].trim();
            }
        }
        else
        {
            if (words[word].trim() != "")
            {
                tenchinh = tenchinh + " " + words[word].trim();
            }
        }
    }
    tenchinh = tenchinh.replace("'", "");
    tenchinh = tenchinh.replace(":", "");
    tenchinh = tenchinh.replace("?", "");
    tenchinh = tenchinh.replace("{", "");
    tenchinh = tenchinh.replace("}", "");
    tenchinh = tenchinh.replace(";", "");
    tenchinh = tenchinh.replace("<", "");
    tenchinh = tenchinh.replace(">", "");
    tenchinh = tenchinh.replace(".", "");
    tenchinh = tenchinh.replace("|", "");
    tenchinh = tenchinh.replace("/", "");
    tenchinh = tenchinh.replace("!", "");
    tenchinh = tenchinh.replace("@", "");
    tenchinh = tenchinh.replace("#", "");
    tenchinh = tenchinh.replace("$", "");
    tenchinh = tenchinh.replace("%", "");
    tenchinh = tenchinh.replace("^", "");
    tenchinh = tenchinh.replace("&", "");
    tenchinh = tenchinh.replace("*", "");
    tenchinh = tenchinh.replace("_", "");
    tenchinh = tenchinh.replace("-", "");
    tenchinh = tenchinh.replace("+", "");
    tenchinh = tenchinh.replace("=", "");
    tenchinh = tenchinh.replace("[", "");
    tenchinh = tenchinh.replace("]", "");
    tenchinh = tenchinh.toUpperCase();
    var words_phanbiet = tenchinh.split(" ");
    for (word in words_phanbiet)
    {
///// nam nè
        var nam=["VĂN","TÀI","LỘC", "PHÁT","TRUNG","HUY","SANG","TUẤN"];
        for(var n in nam)
        {
            if(words_phanbiet[word]==nam[n])
            return "true";
        }
        var nu=["THỊ","NGỌC","TUYẾT","NHƯ","LAM","VÂN","MỸ","HUỲNH","THU","ÁNH","BÍCH","THÚY","NGUYỆT"];
        for(var n in nu)
        {
            if(words_phanbiet[word]==nu[n])
            return "false";
        }

    }
}