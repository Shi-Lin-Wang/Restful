function initMap() {  //set map and initialize
  var map = new google.maps.Map(document.getElementById('map'), {
    //zoom: 4,
  });
  showMarkers();

  function showMarkers(){
  $token = getCookie("token");
  console.log($token);
  $.ajax({
    url:"/wtlab/Home/jwt/tests/getMap.php",
    type:"GET",
    data:{"Token": $token},
    dataType:'json',
    success: function(location){
      console.log(location);
      var a ;
      var b;
      var c;
      for(var i = 0; i < location.length; i++){
        a = location[i].Latitude;
        b = location[i].Longitude;
        c = location[i].Location;
        console.log(a);
        if( a != 999){
          setMarkers(a,b,c);
        }
      }
      //document.getElementById("lat").innerHTML = a;
    },
    error: function(jqXHR, textStatus, errorThrown){
      document.getElementById("lat").innerHTML = errorThrown;
    }
  });

}
  function setMarkers(Lat, Lng, info){  //set marker information
    var bounds = new google.maps.LatLngBounds();
    var location = new google.maps.LatLng(Lat, Lng);
    bounds.extend(location);
    map.fitBounds(bounds);

    var marker = new google.maps.Marker({  //create marker
      position: location,
      map: map,
      direct: 'home.html'
    })

    google.maps.event.addListener(marker, 'click', function() {
    document.cookie = "info="+info;
    window.location.href = this.direct;
    });
    //attachMarkerInfo(marker, info);
  }


}
function attachMarkerInfo(marker, info) {
  var infowindow = new google.maps.InfoWindow({
    content: info
  });

  marker.addListener('click', function() {
    infowindow.open(marker.get('map'), marker);
  });

}
	

  


/*function showMarkers(){
  $token = getCookie("token");
  console.log($token);
  $.ajax({
    url:"/wtlab/Home/jwt/tests/getMap.php",
    type:"GET",
    data:{"Token": $token},
    dataType:'json',
    success: function(location){
      console.log(location);
      var a ;
      var b;
      var c;
      for(var i = 0; i < location.length; i++){
        a = location[i].Latitude;
        b = location[i].Longitude;
        c = location[i].Location;
        setMarkers(a,b,c);
      }
      document.getElementById("lat").innerHTML = a;
      initMap();

    },
    error: function(jqXHR, textStatus, errorThrown){
      document.getElementById("lat").innerHTML = errorThrown;
    }
  });

}*/

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
