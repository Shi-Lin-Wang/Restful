	function drawdustlinechart(dustvalue){
	var data = dustvalue;
	//var data = [[1506180631000 ,10],[1506180704000,11],[1506250441000,12]];
	var dataset = [{label: "PM2.5",data: data}];

	var options = {
		series: {
			lines: { 
				show: true
				//fill: true,
				//fillColor: { colors: [{ opacity: 0.7 }, { opacity: 0.1}] }
			},
			points: {
				radius: 3,
				show: true
			}
		},
		colors: ["#FF7070"],
		xaxis: {
			mode: "time",
			tickFormatter: function (val, axis) {
				var d = new Date(val);
				return (d.getMonth() + 1) + "/" + d.getDate() + " " + d.getHours() + ":00";
			},
			tickSize: [1, "hour"],
			axisLabel: "日期  (month/date Time)",
			axisLabelUseCanvas: true,
			axisLabelFontSizePixels: 12,
			axisLabelPadding: 5
		},
		yaxis: {
			axisLabel: "感測數值",
			axisLabelUseCanvas: true,
			axisLabelFontSizePixels: 12,
			axisLabelPadding: 5
		},
		grid: {
			hoverable: true
		}
	};

	$("<div id='tooltip_dust'></div>").css({
		position: 'absolute',
		display: 'none',
		padding: '3px',
		border: '2px solid #FF7070',
		'border-radius': '5px',
		'background-color': '#fff',
		opacity: 0.8
	}).appendTo("body");

	$("#dustlinechart").bind("plothover", function (event, pos, item) {

		if (item) {
			var x = item.datapoint[0],
				y = item.datapoint[1].toFixed(2);
			
			var date = new Date(x);
			
			$("#tooltip_dust")
				.html(
					"感測時間(m/d)：" + (date.getMonth()+1) + "/" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + "<br>" + 
					item.series.label + "數值：" + "<b>" + y + "</b>"
					)
				.css({top: item.pageY+5, left: item.pageX+5})
				.fadeIn(200);
		} else {
			$("#tooltip_dust").hide();
		}
		
	});

	$(document).ready(function () {
		$.plot($("#dustlinechart"), dataset, options);
	});
}
function drawmq2linechart(mq2value){
	var data = mq2value;

	var dataset = [{label: "MQ2",data: data}];

	var options = {
		series: {
			lines: { 
				show: true,
				//fill: true,
				//fillColor: { colors: [{ opacity: 0.7 }, { opacity: 0.1}] }
			},
			points: {
				radius: 3,
				show: true
			}
		},
		colors: ["#0022FF"],
		xaxis: {
			mode: "time",
			tickFormatter: function (val, axis) {
				var d = new Date(val);
				return (d.getMonth() + 1) + "/" + d.getDate() + " " + d.getHours() + ":00";
			},
			tickSize: [1, "hour"],
			axisLabel: "日期  (month/date Time)",
			axisLabelUseCanvas: true,
			axisLabelFontSizePixels: 12,
			axisLabelPadding: 5
		},
		yaxis: {
			axisLabel: "感測數值",
			axisLabelUseCanvas: true,
			axisLabelFontSizePixels: 12,
			axisLabelPadding: 5
		},
		grid: {
			hoverable: true
		}
	};

	$("<div id='tooltip_mq2'></div>").css({
		position: 'absolute',
		display: 'none',
		padding: '3px',
		border: '2px solid #0022FF',
		'border-radius': '5px',
		'background-color': '#fff',
		opacity: 0.8
	}).appendTo("body");

	$("#mq2linechart").bind("plothover", function (event, pos, item) {

		if (item) {
			var x = item.datapoint[0],
				y = item.datapoint[1].toFixed(2);
			
			var date = new Date(x);
			
			$("#tooltip_mq2")
				.html(
					"感測時間(m/d)：" + (date.getMonth()+1) + "/" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + "<br>" + 
					item.series.label + "數值：" + "<b>" + y + "</b>"
					)
				.css({top: item.pageY+5, left: item.pageX+5})
				.fadeIn(200);
		} else {
			$("#tooltip_mq2").hide();
		}
		
	});

	$(document).ready(function () {
		$.plot($("#mq2linechart"), dataset, options);
	});
}
function drawmq9linechart(mq9value){
	var data = mq9value;

	var dataset = [{label: "MQ9",data: data}];

	var options = {
		series: {
			lines: { 
				show: true,
				//fill: true,
				//fillColor: { colors: [{ opacity: 0.7 }, { opacity: 0.1}] }
			},
			points: {
				radius: 3,
				show: true
			}
		},
		colors: ["#00DD00"],
		xaxis: {
			mode: "time",
			tickFormatter: function (val, axis) {
				var d = new Date(val);
				return (d.getMonth() + 1) + "/" + d.getDate() + " " + d.getHours() + ":00";
			},
			tickSize: [1, "hour"],
			axisLabel: "日期  (month/date Time)",
			axisLabelUseCanvas: true,
			axisLabelFontSizePixels: 12,
			axisLabelPadding: 5
		},
		yaxis: {
			axisLabel: "感測數值",
			axisLabelUseCanvas: true,
			axisLabelFontSizePixels: 12,
			axisLabelPadding: 5
		},
		grid: {
			hoverable: true
		}
	};
	
	$("<div id='tooltip_mq9'></div>").css({
		position: 'absolute',
		display: 'none',
		padding: '3px',
		border: '2px solid #00DD00',
		'border-radius': '5px',
		'background-color': '#fff',
		opacity: 0.8
	}).appendTo("body");

	$("#mq9linechart").bind("plothover", function (event, pos, item) {

		if (item) {
			var x = item.datapoint[0],
				y = item.datapoint[1].toFixed(2);
			
			var date = new Date(x);
			
			$("#tooltip_mq9")
				.html(
					"感測時間(m/d)：" + (date.getMonth()+1) + "/" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + "<br>" + 
					item.series.label + "數值：" + "<b>" + y + "</b>"
					)
				.css({top: item.pageY+5, left: item.pageX+5})
				.fadeIn(200);
		} else {
			$("#tooltip_mq9").hide();
		}
		
	});

	$(document).ready(function () {
		$.plot($("#mq9linechart"), dataset, options);
	});
}
/****************************************************************************/

function showvalue(){
	$.ajax({
		url: "scrabbug.php",
		data: "",
		type:"GET",
		dataType:'json',
		success: function(message){
			//alert(message[0].RainningProbability);
			document.getElementById("WeatherCondition").innerHTML = "<b>" + message[0].WeatherCondition + "</b>";
			document.getElementById("rain").innerHTML = message[0].RainningProbability;
/*********************************************12/20************************************************/
			/**/var con = message[0].WeatherCondition;
			/**/if(con == "多雲時晴" || con == "晴時多雲"){
			/**/	document.getElementById("weather_img").innerHTML = '<img src="suncloud.jpg" alt="suncloud" style="width:280px;height:200px;">';
			/**/}
			/**/else if(con == "多雲" || con == "陰時多雲" || con == "多雲時陰" || con == "陰天"){
			/**/	document.getElementById("weather_img").innerHTML = '<img src="cloud.jpg" alt="cloud" style="width:280px;height:200px;">';
			/**/}
			/**/else if(con == "多雲短暫雨" || con == "多雲時陰短暫雨" || con == "陰時多雲短暫雨" || con == "陰短暫雨" || con == "陰時多雲有雨" || con == "陰有雨" || con == "多雲短暫陣雨" || con == "多雲時陰短暫陣雨"){
			/**/	document.getElementById("weather_img").innerHTML = '<img src="rain.jpg" alt="rain" style="width:280px;height:200px;">';
			/**/}
			/**/else if(con == "陰陣雨或雷雨" || con == "多雲短暫陣雨或雷雨" || con == "陰時多雲短暫陣雨或雷" || con == "多雲時陰短暫陣雨或雷" || con == "陰短暫陣雨或雷雨" || con == "晴午後短暫雷陣雨" || con == "多雲午後短暫雷陣雨"){
			/**/	document.getElementById("weather_img").innerHTML = '<img src="lightrain.jpg" alt="lightrain" style="width:280px;height:200px;">';
			/**/}
			/**/else{
			/**/	document.getElementById("weather_img").innerHTML = '<img src="all.jpg" alt="all" style="width:280px;height:200px;">';
			/**/}
			/**************************************************************************************************/

			//document.getElementById("humidity").innerHTML = ; 
			//document.getElementById("windspeed").innerHTML = ; 
		},

		error:  function(jqXHR, textStatus, errorThrown){ 
			document.getElementById("right-content-out").innerHTML=errorThrown; 
		}
	});	
}
window.addEventListener( "load", showvalue, false );

function showall(){
	console.log(getCookie(token));
  	var token = getCookie("token");
  	var info = getCookie("info");
	$.ajax({
		url: "/wtlab/Home/jwt/tests/home_temp.php", // it's home.php
		data: "&Token="+token+"&info="+info,
		type:"GET",
		dataType:'json',
		success: function(message){
			var temp ;
			temp =  message[0].Temperature;
			temp *=0.1;
			var humi = message[0].Humidity;
			humi *= 0.1 ;
			document.getElementById("nowtemprature").innerHTML = temp+"°C" ;
			document.getElementById("humidity").innerHTML = humi; 
/***************************************************/
			var pm25index = [71,65,59,54,48,42,36,24,12,0];
			var pm25color = ['<font color="#CC00FF">','<font color="#880000">','<font color="#FF0000">','<font color="#FF8888">','<font color="#EE7700">','<font color="#FFCC22">','<font color="#FFFF00">','<font color="#008800">','<font color="#00FF00">','<font color="#99FF99">'];
			for(var i = 0; i <= pm25index.length-1; i++){
				if(message[0].PM25 >= pm25index[i]){
					document.getElementById("pm2.5value").innerHTML = pm25color[i] + message[0].PM25 + '</font>';
					break ;
				}
			}
			//calculate MQ2's value
			//in clean air : sensorValue=32  sensor_volt=32/1024*5.0=0.16  RS_air=30.25  R0=3.087
			var mq2sensor_volt = message[0].MQ2value/1054*5.0;
			var mq2RS_gas = (5.0 - mq2sensor_volt)/mq2sensor_volt;
			var mq2ratio = mq2RS_gas/3.087;
			//
			if(mq2ratio <= 8.8){//over
				document.getElementById("mq2value").innerHTML = '<font color="#FF0000">' + message[0].MQ2value + '</font>';
			}
			else{
				document.getElementById("mq2value").innerHTML = '<font color="#00FF00">' + message[0].MQ2value + '</font>';
			}
			//calculate MQ9's value
			//in clean air : sensorValue=15  sensor_volt=15/1024*5.0=0.073  RS_air=67.5  R0=6.82
			var mq9sensor_volt = message[0].MQ9value/1054*5.0;
			var mq9RS_gas = (5.0 - mq9sensor_volt)/mq9sensor_volt;
			var mq9ratio = mq9RS_gas/6.82;
			//
			if(mq9ratio <= 4.0){//over
				document.getElementById("mq9value").innerHTML = '<font color="#FF0000">' + message[0].MQ9value + '</font>';
			}
			else{
				document.getElementById("mq9value").innerHTML = '<font color="#00FF00">' + message[0].MQ9value + '</font>';
			}
			/***************************************************/			var dustvalue = [];
			var mq9value = [];
			var mq2value = [];
			/*mq2value[0] = new Array(2);
			mq9value[0] = new Array(2);
			dustvalue[0] = new Array(2);*/
			for(var i = message.length-1; i > 0; i--){///////////////////////////
				mq9value[i] = new Array(2);
				mq9value[i][0] = Date.parse(message[i].Time);
				mq9value[i][1] = message[i].MQ9value;
				mq2value[i] = new Array(2);
				mq2value[i][0] = Date.parse(message[i].Time);
				mq2value[i][1] = message[i].MQ2value;
				dustvalue[i] = new Array(2);
				dustvalue[i][0] = Date.parse(message[i].Time);
				dustvalue[i][1] = message[i].PM25;
			}
			drawmq9linechart(mq9value);
			drawmq2linechart(mq2value);	
			drawdustlinechart(dustvalue);
		},

		error:  function(jqXHR, textStatus, errorThrown){ 
			console.log(textStatus);
			document.getElementById("humidity").innerHTML=errorThrown; 
		}
	});	
}
window.addEventListener( "load", showall, false );


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

/*
/***********************************************************
function showhumi(){
	$.ajax({
		url: "sensor.php",
		data: "&value="+ "dust",
		type:"GET",
		dataType:'json',
		success: function(message){
			document.getElementById("humidity").innerHTML = message[0].Humidity; 
		},

		error:  function(jqXHR, textStatus, errorThrown){ 
			document.getElementById("humidity").innerHTML=errorThrown; 
		}
	});	
}
window.addEventListener( "load", showhumi, false );
/**************************************************************
function showdust(){
	$.ajax({
		url: "sensor.php",
		data: "&value="+ "dust",
		type:"GET",
		dataType:'json',
		success: function(message){
			document.getElementById("pm2.5value").innerHTML = message[0].PM25; 
		},

		error:  function(jqXHR, textStatus, errorThrown){ 
			document.getElementById("pm2.5value").innerHTML=errorThrown; 
		}
	});	
}
window.addEventListener( "load", showdust, false );
function showmq2(){
	$.ajax({
		url: "sensor.php",
		data: "&value="+ "mq2",
		type:"GET",
		dataType:'json',
		success: function(message){
			document.getElementById("mq2value").innerHTML = message[0].MQ2value; 
		},

		error:  function(jqXHR, textStatus, errorThrown){ 
			document.getElementById("mq2value").innerHTML=errorThrown; 
		}
	});	
}
window.addEventListener( "load", showmq2, false );
function showmq9(){
	$.ajax({
		url: "sensor.php",
		data: "&value="+ "mq9",
		type:"GET",
		dataType:'json',
		success: function(message){
			document.getElementById("mq9value").innerHTML = message[0].MQ9value; 
		},

		error:  function(jqXHR, textStatus, errorThrown){ 
			document.getElementById("mq9value").innerHTML=errorThrown; 
		}
	});	
}
window.addEventListener( "load", showmq9, false );*/