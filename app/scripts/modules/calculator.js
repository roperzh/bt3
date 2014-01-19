'use strict';

var Calculator = function(difficulty, exangeRate, scope) {
  var self = this;
  var wattFactor = 0.633333;

  $('#js-difficulty').html(difficulty);

  $('.slider').noUiSlider({
   range: [0,4500],
   start: 400,
   handles: 1,
   connect: "lower",
   color: "red",
   serialization: {
    resolution: 1
  },
  slide: function() {
    var hashrate = scaleRate(this.val());
    self.calc(hashrate);
  }
});

  var init = function() {
    self.calc(400);
  };

  this.calc = function (hashRate) {
    $("#js-currentHashRate").html(hashRate);
    var timeData = avgTime(hashRate, difficulty);
    var moneyData = getMoneyData(hashRate, difficulty);
    var eventData = Object.merge(timeData, moneyData);
    scope.dispatchEvent(eventData);
  };

  var getMoneyData = function(hashRate, difficulty) {
    return {
        type: "rate",
        btcPerDay: earnBTC(hashRate, difficulty, 1),
        usdPerDay: earnUSD(hashRate, difficulty, exangeRate, 1),
        cost: calculateCost(hashRate),
      }
  };

  var scaleRate = function(hashrate) {
    if (hashrate < 1500) {
      return hashrate;
    } else if (hashrate < 3000) {
      return hashrate * 6;
    } else {
      return hashrate * 20;
    }
  };

  var calculateCost = function(hashrate) {
    return (1/earnUSD(hashrate, difficulty, exangeRate, 1) *  2.64);
  };

  var avgTime = function(hashRate, difficulty) {
    var result = (difficulty * 4294967296) / (hashRate * 1e6);

    return secondsToDhms(result);
  };

  var earnBTC = function (hashrate, difficulty, days) {
    var result = (difficulty * 4294967296) / (hashrate * 1e6);

    var earn = 50 / (result / (days * 24) / 60 / 60);

    return earn;
  };

  var earnUSD = function(hashrate, difficulty, exangeRate, days) {
    var btc = earnBTC(hashrate, difficulty, days);

    var earn = btc * exangeRate;

    return earn
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

    return {
      days: d,
      hours: h,
      minutes: m,
      seconds: s
    };
  };

  return init();
};


