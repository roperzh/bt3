$(document).foundation();
App = {};
App.width = $(window).width();
App.height = $(window).height();

// blockChain = new DataChannel();
// geoIP = new IpDecoder();

// blockChain.ws.addEventListener("message", function(e) {
//   var ip;
//   var message;
//   var data = JSON.parse(e.data);
//   var value = 0.00;
//   var i;
//   if (data["x"] && data["x"]["relayed_by"] && data["x"]["out"]) {
//     ip = data["x"]["relayed_by"];
//     geoIP.queue.push(ip);
//   }
// });

// setTimeout(blockChain.start, 3000);
// var letterUpdater = new LetterUpdater();
// var map = new LiveMap();
// var calc = new Calculator(1789546951, 836.936);
// var energyStatistics = new StatisticsManager(223300861.7188927);

var pieChart = new PieChart("body");

$(".js-contentRegion").css({
  "height": (App.height) + "px"
});

$(window).resize(function() {
  $(".js-contentRegion").css({
    "height": (App.height) + "px"
  });
});


$("[id*='Btn']").stop(true).on('click',function(e){e.preventDefault();$(this).scrolld();});
//**************************************
