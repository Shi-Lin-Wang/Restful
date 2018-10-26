function change(){
	var token = getCookie("token");
	var a = "<table align = 'center' border = '1'><tr align = 'center'>";
	$.ajax({
		url: "/wtlab/Home/jwt/tests/sensor.php",
		type:"POST",
		dataType:'json',
		data: {
			Token: token,
			time:$('#sensortime').val(),
			location:$('#sensorlocation').val()
		},
		success: function(message){
			/*if(typeof(message) != "object"){
				document.getElementById("mainbody").innerHTML = 'No data among this time!';
			}
			else {*/
				//alert(message);
				a += "<td>Location</td>";
				a += "<td>Time</td>";
				a += "<td>MQ2value</td>";
				for(var i = 0; i < message.length; i++){
					a += "<tr>";
					a += "<td>" + message[i].Location + "</td>";
					a += "<td>" + message[i].Time + "</td>";
					a += "<td>" + message[i].MQ2value + "</td>";
				}
				
				a += "</tr>";
				document.getElementById("mainbody").innerHTML = a;
			//}
			//alert(message);
		},

		error:  function(jqXHR, textStatus, errorThrown){ 
			alert("資料讀取失敗");
			//document.getElementById("mainbody").innerHTML=errorThrown; 
		}
	});
	//alert(document.getElementById("sensortime"));
}
function showmq22(){
	//alert(selected.join());
	var token = getCookie("token");
	var a = "<table align = 'center' border = '1'><tr align = 'center'>";
	$.ajax({
		url: "/wtlab/Home/jwt/tests/sensor.php",
		type:"GET",
		dataType:'json',
		data:"&Token="+ token,
		success: function(message){
			a += "<td>Location</td>";
			a += "<td>Time</td>";
			a += "<td>MQ2value</td>";
			for(var i = 0; i < message.length; i++){
				a += "<tr>";
				a += "<td>" + message[i].Location + "</td>";
				a += "<td>" + message[i].Time + "</td>";
				a += "<td>" + message[i].MQ2value + "</td>";
			}
			
			a += "</tr>";
			document.getElementById("mainbody").innerHTML = a;
		},

		error:  function(jqXHR, textStatus, errorThrown){ 
			alert("資料讀取失敗");
			//document.getElementById("mainbody").innerHTML=errorThrown; 
		}
	});	
}
window.addEventListener( "load", showmq22, false );

function getCookie(name) {
  var arg = escape(name) + "=";
  var nameLen = arg.length;
  var cookieLen = document.cookie.length;
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
function logout(){
	var now = new Date();
	var time = now.getTime();
  	var expireTime = time + 1000*36000;
	now.setTime(expireTime);
	var tempExp = 'Wed, 31 Oct 2012 08:50:17 GMT';
	document.cookie = 'token=;expires='+now.toGMTString()+';path=/;domain=127.0.0.1;';
	window.location = "http://127.0.0.1/wtlab/Home/";
	/*try{
  		document.cookie = "token=out;";
	//window.location = "http://127.0.0.1/wtlab/Home/";
	}catch(error){
	console.log(error);
	}*/

}