/*
 * @Author: yongyuan253015@gmail.com
 * @Date: 2021-11-19 00:19:21
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-19 00:31:28
 * @Description: 文件描述
 */
function checkDate() {
    var today=new Date();
    var y=today.getFullYear();
    var m=today.getMonth();
    var d=today.getDate();
    var h=today.getHours();
    var i=today.getMinutes();
    var s=today.getSeconds();// 在小于10的数字钱前加一个‘0’
    m=m+1;
    d=checkTime(d);
    m=checkTime(m);
    h=checkTime(h);
    i=checkTime(i);
    s=checkTime(s);
    return y+"-"+m+"-"+d+" "+h+":"+i+":"+s
}
function checkTime(i){
    if (i<10){
        i="0" + i;
    }
    return i;
}

module.exports = {
    checkDate
}