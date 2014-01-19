"use strict";

var LiveMap = function() {
  var map = L.map("map").setView([42.617791, -15.306702], 3);

  var redMarker = L.AwesomeMarkers.icon({
    icon: 'bitcoin',
    markerColor: 'blue'
  });


  var init = function() {
    setMapHeigth();
    addLayerToMap();
    document.addEventListener("geoip", addPoint);
  };

  var setMapHeigth = function() {
    var windowHeight = $(window).height();
    var mapHeight = $(window).height();

    $("#map").css("height", mapHeight);

    // Always call invalidateSize on map resize
    map.invalidateSize();
  };

  var addLayerToMap = function() {
    var marker = L.tileLayer("http://{s}.tile.cloudmade.com/2c83ee06868f422f8163dfae1d636cf0/997/256/{z}/{x}/{y}.png", {
      maxZoom: 10,
      minZoom: 2
    });

    marker.on("click", function(a,b,c){
      console.log(a,b,c);
    });

    marker.addTo(map);
  };

  var addPoint = function(event) {
    var data = event.data;
    var marker = L.marker([data.latitude, data.longitude], {
      icon: redMarker,
      bounceOnAdd: true,
      bounceOnAddOptions: {
        duration: 500,
        height: 100
      },
      bounceOnAddCallback: function() {}
    }).addTo(map);
  };

  return init();
};
