function getCookie(name) {
  var arg = escape(name) + "=";
  var nameLen = arg.length;
  var cookieLen = document.cookie.length;
  console.log(cookieLen);
  var i = 0;
  while (i < cookieLen) {
    var j = i + nameLen;
    if (document.cookie.substring(i, j) == arg) return getCookieValueByIndex(j);
    i = document.cookie.indexOf(" ", i) + 1;
    if (i == 0) break;
  }
  return null;
}

function getCookieValueByIndex(startIndex) {
  var endIndex = document.cookie.indexOf(";", startIndex);
  if (endIndex == -1) endIndex = document.cookie.length;
  return unescape(document.cookie.substring(startIndex, endIndex));
}

/*
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    console.log(ca);
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        	console.log("get");
            return c.substring(name.length, c.length);
        }
    }
    console.log("not"+cname);
    console.log(ca);
    console.log(document.cookie);
    return null;
}*/



//http://www.eion.com.tw/Blogger/?Pid=1130

/*
	1. homepage get failToLogin //  return int
	2. homepage get token //
	3. homepage get AuthOver (true or false)
*/

function checkLoginState(){
  console.log("checkState");
  checkSignState();
  if(getCookie("failToLogin") != null ){
    loginLimit();
  }else{
  	if(getCookie("token") != "" &&getCookie("token") != null ){
  		if(!getCookie("authOver")){
  			console.log(getCookie("token"));
        
        window.location = "map.html";
  		}else{		//authOver = true
  			alert("等候逾時，請重新登入");
  			window.location = "index.html";
  		}
  	}else{		//token = false
  		//alert("驗證錯誤!");
  	}
  }
}

function loginLimit(){
	if(getCookie("failToLogin") < 5){
		alert("帳號密碼錯誤，請重新再試\n" + "剩餘嘗試次數: " + (5 - parseInt(getCookie("failToLogin"))) + "次");
	}else{		//failToLogin >= 3
		alert("登入失敗次數過多，請於5分鐘後再試!");
	}
}

function checkSignState(){
  console.log("checkSignState");
  var now = new Date();
  var time = now.getTime();
  var expireTime = time + 1000*36000;
  now.setTime(expireTime);
  var tempExp = 'Wed, 31 Oct 2012 08:50:17 GMT';
  if(getCookie("signError") == null){

  }else if(getCookie("signError") == "true"){
    alert("帳號已被使用過");
    document.cookie = 'signError=null;expires='+now.toGMTString()+';path=/;domain=127.0.0.1;';
  }else if(getCookie("signError") == "false"){
    alert("註冊成功");
    document.cookie = 'signError=null;expires='+now.toGMTString()+';path=/;domain=127.0.0.1;';
  }
}