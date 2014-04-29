App = function () {
  var self = this;

  self.width = $(window).width();
  self.height = $(window).height();

  var init = function() {
    EventDispatcher.prototype.apply( App.prototype );

    var letterUpdater = new LetterUpdater(self);
    var bulletChart = new BulletChart(self);
    var clock = new PolarClock(self);
    var calc = new Calculator(1789546951, 836.936, self);
    var blockChain = new DataChannel();
    var geoIP = new IpDecoder();
    var map = new LiveMap();
    var pieChart = new PieChart("#js-pieChart", self);
    var energyStatistics = new StatisticsManager(223300861.7188927, "#statistics", self);

    $(document).foundation();

    $(".js-contentRegion").css({
      "height": (self.height) + "px"
    });

    $(window).resize(function() {
      $(".js-contentRegion").css({
        "height": (self.height) + "px"
      });
    });

    $("[id*='Btn']").stop(true).on('click', function(e) {
      e.preventDefault();
      $(this).scrolld();
    });

    blockChain.ws.addEventListener("message", function(e) {
      var ip;
      var message;
      var data = JSON.parse(e.data);
      var value = 0.00;
      var i;
      if (data["x"] && data["x"]["relayed_by"] && data["x"]["out"]) {
        ip = data["x"]["relayed_by"];
        geoIP.queue.push(ip);
      }
    });

    setTimeout(blockChain.start, 3000);
  };

  return init();
};

app = new App();
