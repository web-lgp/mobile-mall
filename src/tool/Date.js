export function getDate() {
    let date = new Date();
    let date2 = date.getHours();
    let date3 = date.getMinutes();
    let date4 = date.getSeconds();
    if (date2 < 10) {
        date2 = "0" + date2
    }
    if (date3 < 10) {
        date3 = "0" + date3
    }
    if (date4 < 10) {
        date4 = "0" + date4
    }
    return date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日 " + date2 + ":" + date3 + ":" + date4

}