"use strict";

var LiveMap = function() {
  var map = L.map("map").setView([42.617791, -15.306702], 3);

  var greenIcon = L.icon({
    iconUrl: "images/marker-icon.png",
    iconSize: [10, 10],
    iconAnchor: [5, 5],
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
    L.tileLayer("http://{s}.tile.cloudmade.com/2c83ee06868f422f8163dfae1d636cf0/118040/256/{z}/{x}/{y}.png", {
      maxZoom: 3,
      minZoom: 2
    }).addTo(map);
  };

  var addPoint = function(event) {
    var data = event.data;
    var marker = L.marker([data.latitude, data.longitude], {
      icon: greenIcon,
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
