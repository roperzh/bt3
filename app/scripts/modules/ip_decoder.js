'use strict'

var IpDecoder = function() {
  var geoUri = 'http://freegeoip.net/json/';
  var ipQueue = [];
  var ipCache = {};
  var intervalID;
  var callback;

  var init = function() {
    intervalID = setInterval(unQueue, 1000);
    return {
      'queue': ipQueue
    };
  };

  var xhrCallback = function(data) {
    var data = JSON.parse(this.responseText);
    dispatchGeoEvent(data);
    data.cached = true;
    ipCache[data.ip] = data;
  };

  var dispatchGeoEvent = function(data) {
    var e = new CustomEvent('geoip');
    e.data = data;
    document.dispatchEvent(e);
  };

  var unQueue = function() {
    var ip, xhr;

    ip = ipQueue.pop();

    if (!ip || ip === '127.0.0.1') {
      return;
    }

    if (ipCache[ip]) {
      dispatchGeoEvent(ipCache[ip]);
    }

    xhr = new XMLHttpRequest();
    xhr.onload = xhrCallback;
    xhr.open('get', geoUri + ip, true);
    xhr.send();
  };

  return init();
};
