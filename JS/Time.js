
window.onload = function () {
    let oDt = new Date();
    let swd = "";
    let iweekDay = oDt.getDay();
    switch (iweekDay) {
        case 0:
            swd = "星期日";
            break;
        case 1:
            swd = "星期二";
            break;
        case 2:
            swd = "星期二";
            break;
        case 3:
            swd = "星期三";
            break;
        case 4:
            swd = "星期四";
            break;
        case 5:
            swd = "星期五";
            break;
        case 6:
            swd = "星期六";
            break;
    }
    let iMonth = parseInt(oDt.getMonth()) + 1;
    document.getElementById("date").innerHTML = "<span>" + iMonth + "月" + oDt.getDate() + "日" + " ，" + swd + "</span>";
    showtime();
    window.setInterval("showtime ()", 1000);
}

function showtime() {
    let oDt = new Date();
    let sTime = "";
    if (oDt.getHours() < 10) {
        sTime += "0" + oDt.getHours() + ":";
    } else {
        sTime += oDt.getHours() + ":";
    }
    if (oDt.getMinutes() < 10) {
        sTime += "0" + oDt.getMinutes() + ":";
    } else {
        sTime += oDt.getMinutes() + ":";
    }
    if (oDt.getSeconds() < 10) {
        sTime += "0" + oDt.getSeconds();
    } else {
        sTime += oDt.getSeconds();
    }
    document.getElementById("time").innerHTML = "<span>" + sTime + "</span>";
}