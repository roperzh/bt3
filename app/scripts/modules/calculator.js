'use strict';

var Calculator = function(difficulty, exangeRate) {
  var self = this;

  $('#js-difficulty').html(difficulty);

  $('.slider').noUiSlider({
   range: [0,99999],
   start: 5500,
   handles: 1,
   connect: "lower",
   serialization: {
    resolution: 1
  },
  slide: function() {
    var hasrate = this.val();
    $("#js-currentHashRate").html(hasrate);
    self.calc(hasrate);
  }
});

  var init = function() {
    return this.calc();
  };

  this.calc = function (hashRate) {
    $('#nmcblocktime').text(
      avgTime(hashRate, difficulty)
    );

    $('#btcperday').text(
      earnBTC(hashRate, difficulty, 1)
    );
    $('#btcperweek').text(
      earnBTC(hashRate, difficulty, 7)
    );
    $('#btcpermonth').text(
      earnBTC(hashRate, difficulty, 30)
    );

    $('#usdperday').text(
      earnUSD(hashRate, difficulty, exangeRate, 1)
    );
    $('#usdperweek').text(
      earnUSD(hashRate, difficulty, exangeRate, 7)
    );
    $('#usdpermonth').text(
      earnUSD(hashRate, difficulty, exangeRate, 30)
    );
  };

  var avgTime = function(hashRate, difficulty) {
    var result = (difficulty * 4294967296) / (hashRate * 1e6);

    return secondsToDhms(result);
  };

  var earnBTC = function (hashrate, difficulty, days) {
    var result = (difficulty * 4294967296) / (hashrate * 1e6);

    var earn = 50 / (result / (days * 24) / 60 / 60);

    return roundNumber(earn, 2);
  };

  var earnUSD = function(hashrate, difficulty, exangeRate, days) {
    var btc = earnBTC(hashrate, difficulty, days);

    var earn = btc * exangeRate;

    return roundNumber(earn, 2);
  };

  var roundNumber = function (number, digits) {
    var multiple = Math.pow(10, digits);
    var rndedNum = Math.round(number * multiple) / multiple;
    var rnded = rndedNum + '';
    if (rnded.substring(rnded.length - 2, rnded.length - 1) === '.') {
      rndedNum = rndedNum + '0';
    }

    return rndedNum;
  };

  var secondsToDhms = function (o) {
    o = Number(o);
    var d = Math.floor(o / 3600 / 24);
    var h = Math.floor(o / 3600) - (Math.floor(o / 3600 / 24) * 24);
    var m = Math.floor(o % 3600 / 60);
    var s = Math.floor(o % 3600 % 60);
    var r = '';

    if (d > 0) {
      r += (d > 1 ? d + ' days' : d + ' day') + ', ';
    }
    if (h > 0) {
      r += (h > 1 ? h + ' hours' : h + ' hour') + ', ';
    }
    if (m > 0) {
      r += (m > 1 ? m + ' minutes' : m + ' minute') + ', ';
    }
    if (s > 0) {
      r += (s > 1 ? s + ' seconds' : s + ' second') + ', ';
    }

    if (r.substring(r.length - 2) === ', ') {
      r = r.substring(0, r.length - 2);
    }

    return r;
  };
};


