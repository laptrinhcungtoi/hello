/* 
 * Hoành STG
 */

$(function() { 
                $("input[id^='loidan']").keydown(function(e) {
                    if (e.ctrlKey && e.altKey && (e.keyCode === 96 || e.keyCode === 48 )) { // Ctrl + Alt + 0
                        $(this).val("Uống thuốc theo toa; "+$(this).val());
                    }
                    if (e.ctrlKey && e.altKey && (e.keyCode === 97 || e.keyCode === 49 )) { // Ctrl + Alt + 1
                        $(this).val("Hạn chế ăn ngọt; "+$(this).val());
                    }
                    if (e.ctrlKey && e.altKey && (e.keyCode === 98 || e.keyCode === 50 )) { // Ctrl + Alt + 2
                        $(this).val("Hạn chế ăn mặn; "+$(this).val());
                    }
                    if (e.ctrlKey && e.altKey && (e.keyCode === 99 || e.keyCode === 51 )) { // Ctrl + Alt + 3
                        $(this).val("Hạn chế (ăn) thức ăn có chất kích thích: rượu, bia, thuốc lá, ớt,...; "+$(this).val());
                    }
                    if (e.ctrlKey && e.altKey && (e.keyCode === 100 || e.keyCode === 52 )) { // Ctrl + Alt + 4
                        $(this).val("Ăn uống đúng giờ, không thức khuya; "+$(this).val());
                    }
                    if (e.ctrlKey && e.altKey && (e.keyCode === 101 || e.keyCode === 53 )) { // Ctrl + Alt + 5
                        $(this).val("Không làm việc quá sức, việc nặng; "+$(this).val());
                    }
                    if (e.ctrlKey && e.altKey && (e.keyCode === 102 || e.keyCode === 54 )) { // Ctrl + Alt + 6
                        $(this).val("Tập thể dục mỗi ngày, uống nhiều nước; "+$(this).val());
                    }
                    if (e.ctrlKey && e.altKey && (e.keyCode === 103 || e.keyCode === 55 )) { // Ctrl + Alt + 7
                        $(this).val("Ăn cháo, uống sữa; "+$(this).val());
                    }
                    if (e.ctrlKey && e.altKey && (e.keyCode === 104 || e.keyCode === 56 )) { // Ctrl + Alt + 8
                        $(this).val("Lau mát tích cực khi sốt; "+$(this).val());
                    }
                    if (e.ctrlKey && e.altKey && (e.keyCode === 105 || e.keyCode === 57 )) { // Ctrl + Alt + 9
                        $(this).val("Bệnh nhân (thân nhân) không đồng ý nhập viện; "+$(this).val());
                    }
                    
                });           
    
});

function HienSoBienLai7ChuSo(soBienLai) {
    var doDai = soBienLai.toString().length;
    if(doDai !== 0){
        var i;
        for (i = doDai; i < 7; i++) {
            soBienLai = "0"+soBienLai;
        }
    }
    return soBienLai;
}

