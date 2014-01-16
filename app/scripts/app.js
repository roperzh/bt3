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
var calc = new Calculator(1789546951, 836.936);
// var energyStatistics = new StatisticsManager(223300861.7188927);

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
var markets = ["ARS","AUD","BRL","CAD","CHF","CNY","CZK","DKK","EUR","GBP","HKD","ILS","INR","JPY","KRW","LTC","MXN","NMC","NOK","NZD","PLN","RUB","SEK","SGD","SLL","THB","USD","XRP","ZAR"];

var filterData = function(data, market) {
  return data.filter(function(item) {
    item.score = 2;
    return item.currency === markets[market];
  });
};

var parseData = function(data) {
  var root = { name: "flare" };
  var childrens = [];

  for(var market in markets) {
    var child = { name: markets[market] };
    child.children = filterData(data, market);
    child.score = child.children.length;
    child.children.children = [];
    child.children.name = child.children.symbol;
    childrens.push(child);
  }
  root.children = childrens;
  return root;
};

var width = 960,
    height = 700,
    radius = Math.min(width, height) / 2;

var x = d3.scale.linear()
    .range([0, 2 * Math.PI]);

var y = d3.scale.sqrt()
    .range([0, radius]);

var color = d3.scale.category20c();

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + (height / 2 + 10) + ")");

var partition = d3.layout.partition()
    .value(function(d) { return d.score; });

var arc = d3.svg.arc()
    .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
    .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
    .innerRadius(function(d) { return Math.max(0, y(d.y)); })
    .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

d3.json("http://localhost:3000/ticker", function(error, root) {
  data = parseData(root);
  console.log(data);
  var path = svg.selectAll("path")
      .data(partition.nodes(data))
    .enter().append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color((d.children ? d : d.parent).name); })
      .on("click", click);

  function click(d) {
    console.log(d);
    path.transition()
      .duration(750)
      .attrTween("d", arcTween(d));
  }
});

d3.select(self.frameElement).style("height", height + "px");

// Interpolate the scales!
function arcTween(d) {
  var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
      yd = d3.interpolate(y.domain(), [d.y, 1]),
      yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
  return function(d, i) {
    return i
        ? function(t) { return arc(d); }
        : function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); return arc(d); };
  };
}
