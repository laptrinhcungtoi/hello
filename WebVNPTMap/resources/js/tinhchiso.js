/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function chisobmi(trongluong, chieucao) {
    chieucao_m=chieucao/100;
    return parseFloat(trongluong / (chieucao_m * chieucao_m)).toFixed(2);
}
function dothanhthai_Cockroft_Gault(tuoi, cannang, chieucao, creatinin, nu) {
    if (nu == "false")
        dothanhthai = ((140 - tuoi) * cannang) / (72 * creatinin);
    else
        dothanhthai = ((140 - tuoi) * cannang) / (72 * creatinin) * 0.85;
    dientichda = Math.pow((cannang * chieucao / 3600), 0.5);
    return parseFloat(dothanhthai * 1.73 / dientichda).toFixed(2);
}
function nhandinh_bmi(bmi) {
    var chisobmi = parseFloat(bmi);
    if (chisobmi != 0) {
        if (bmi < 18)
        {
            return "Người gầy";
        }
        else if ((bmi >= 18) && (bmi <= parseFloat(24.9)))
        {
            return "Người bình thường";
        }
        else if ((bmi >= 25) && (bmi <= parseFloat(29.9)))
        {
            return "Người béo phì độ I";
        }
        else if ((bmi >= 30) && (bmi <= parseFloat(34.9)))
        {
            return "Người béo phì độ II";
        }
        else if ((bmi >= 35))
        {
            return "Người béo phì độ III";
        }

    }
}
function nhandinh_dothanhthai(dtt) {
    var dothanhthai = parseFloat(dtt);
    if (dothanhthai != 0)
    {
        if (dothanhthai >= 90)
        {
            return "G1: Bình thường hoặc tăng";
        }
        else if (dothanhthai >= 60 && dothanhthai <= 89)
        {
            return "G2: Giảm nhẹ";
        }
        else if (dothanhthai >= 45 && dothanhthai <= 59)
        {
            return "G3A: Giảm nhẹ - trung bình";
        }
        else if (dothanhthai >= 30 && dothanhthai <= 44)
        {
            return "G3B: Giảm trung bình - nặng";
        }
        else if (dothanhthai >= 15 && dothanhthai <= 29)
        {
            return "G4: Giảm nặng";
        }
        else if (dothanhthai < 15)
        {
            return "G5: Suy thận";
        }
    }

}



