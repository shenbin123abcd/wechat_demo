var checkPhone = function (num) {
    //表示以1开头，第二位可能是3/4/5/7/8等的任意一个，在加上后面的\d表示数字[0-9]的9位，总共加起来11位结束。
    if (!(/^1[3|4|5|7|8]\d{9}$/.test(num))) {
      return false;
    } else {
      return true;
    }
};

var timeOut=function(time){
  //console.log(time);
  var ts = (new Date(time).getTime()-new Date().getTime())/1000;
  var d,h,m,s='';
  if(ts>0){
      d = parseInt(ts / 86400, 10);
      h = parseInt(ts / 3600 %24, 10);
      m = parseInt(ts / 60 % 60, 10);
      s = parseInt(ts % 60, 10);
      h=h<10?'0'+h:h;
      m=m<10?'0'+m:m;
      s=s<10?'0'+s:s;
  }

  return{
      d,
      h,
      m,
      s,
  }
}
module.exports = {
  checkPhone: checkPhone,
  timeOut:timeOut
}

