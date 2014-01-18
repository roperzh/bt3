"use strict";

var PieChart = function(el) {
  var currencies = [
    "ARS", "AUD", "BRL", "CAD", "CHF", "CNY", "CZK", "DKK", "EUR",
    "GBP", "HKD", "ILS", "INR", "JPY", "KRW", "LTC", "MXN", "NMC", "NOK", "NZD",
    "PLN", "RUB", "SEK", "SGD", "SLL", "THB", "USD", "XRP", "ZAR"
  ];
  var width = 960;
  var height = 700;
  var radius = Math.min(width, height) / 2;
  var svg;

  var x = d3.scale.linear()
    .range([0, 2 * Math.PI]);

  var y = d3.scale.sqrt()
    .range([0, radius]);

  var color = d3.scale.category50();

  var init = function() {
    render();
  };

  var render = function() {
    svg = d3.select(el).append("svg")
      .attr({
        width: width,
        height: height
      })
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + (height / 2 + 10) + ")");

    var partition = d3.layout.partition()
      .value(function(d) {
        return d.score;
      });

    var arc = d3.svg.arc()
      .startAngle(function(d) {
        return Math.max(0, Math.min(2 * Math.PI, x(d.x)));
      })
      .endAngle(function(d) {
        return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx)));
      })
      .innerRadius(function(d) {
        return Math.max(0, y(d.y));
      })
      .outerRadius(function(d) {
        return Math.max(0, y(d.y + d.dy));
      });

    d3.json("http://bt3api.herokuapp.com/ticker", function(error, root) {
      var data = parseData(root);

      var path = svg.selectAll("path")
        .data(partition.nodes(data))
        .enter().append("path")
        .attr("d", arc)
        .style("fill", function(d) {
          return color((d.children ? d.name : d.symbol));
        })
        .style("fill-opacity", function(d) {
          return d.children ? 1 : 1e-6;
        })
        .attr("class", function(d) {
          return d.children ? "visible" : "hidden";
        })
        .on("click", click)
        .on("mouseenter", mouseenter);

      var text = svg.append("text")
        .text("Click / hover")
        .attr("x", width / -4)
        .attr("y", height / -4);

      function mouseenter(d) {
        text.text(d.name ? d.name : d.symbol);
      }

      function click(d) {
        path.transition()
          .duration(750)
          .style("fill-opacity", function(c) {
            if (d.name === "flare" && !c.children) {
              return 1e-6;
            } else {
              return 1;
            }
          })
          .attrTween("d", arcTween(d));
      }
    });

    d3.select(self.frameElement).style("height", height + "px");

    function arcTween(d) {
      var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
        yd = d3.interpolate(y.domain(), [d.y, 1]),
        yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
      return function(d, i) {
        return i ? function(t) {
          return arc(d);
        } : function(t) {
          x.domain(xd(t));
          y.domain(yd(t)).range(yr(t));
          return arc(d);
        };
      };
    }

  };

  var parseData = function(data) {
    var root = { name: "flare" };
    var childrens = [];

    for (var currencyName in currencies) {
      var markets = filterData(data, currencyName);
      markets.children = [];
      markets.name = markets.symbol;

      var currency = { name: currencies[currencyName] };
      currency.children = markets;
      currency.score = markets.length;

      childrens.push(currency);
    }

    root.children = childrens;
    return root;
  };

  var filterData = function(data, currency) {
    return data.filter(function(item) {
      item.score = 2;
      return item.currency === currencies[currency];
    });
  };

  return init();
};
