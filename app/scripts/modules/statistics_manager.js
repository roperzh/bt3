"use strict";

var StatisticsManager = function(wattsWasted, el, scope) {

  var width = scope.width - 150;
  var height = scope.height - 350;
  var svg;
  var maxItems = Math.floor(width / 70);
  var cases = ["home", "lamp", "mobile", "desktop"];
  var currentCase = 0;
  var refreshInterval;

  var wattConsumption = {
    home: 18000,
    lamp: 1440,
    desktop: 6000,
    mobile: 72,
  };

  var ranges = {
    home: Math.ceil(wattsWasted / wattConsumption["home"]) / 10000,
    lamp: Math.ceil(wattsWasted / wattConsumption["lamp"]) / 10000,
    desktop: Math.ceil(wattsWasted / wattConsumption["desktop"]) / 10000,
    mobile: Math.ceil(wattsWasted / wattConsumption["mobile"]) / 10000
  };

  var drawableRanges = {
    home: ranges["home"].toString().split(""),
    lamp: ranges["lamp"].toString().split(""),
    desktop: ranges["desktop"].toString().split(""),
    mobile: ranges["mobile"].toString().split("")
  };

  var numericRanges = {
    home: Number.range(0, ranges["home"]).every(),
    lamp: Number.range(0, ranges["lamp"]).every(),
    desktop: Number.range(0, ranges["desktop"]).every(),
    mobile: Number.range(0, ranges["mobile"]).every()
  };

  var getNextCase = function() {
    var nextCase = cases[currentCase++];

    if(nextCase){
      return nextCase;
    } else {
      currentCase = 0;
      return cases[0];
    }
  };

  var init = function() {
    makeSvgArea();
    showStatsFor("home");
    initStatsCicle();
  };

  var makeSvgArea = function() {
    svg = d3.select(el).append("svg")
      .attr("width", width - 70)
      .attr("height", height - 130)
      .append("g")
      .attr("transform", "translate(32," + (height / 2) + ")");
  };

  var showStatsFor = function(type) {
    drawNumbers(drawableRanges[type]);
    update(numericRanges[type], getSymbolFor(type));
  };

  var initStatsCicle = function() {
    setInterval(function() {
      var c = getNextCase();
      showStatsFor(c);
    }, 5000);
  };

  var getSymbolFor = function(type) {
    switch (type) {
      case "home":
        return "\uf015";
      case "lamp":
        return '\uf0eb';
      case "mobile":
        return '\uf10b';
      case "desktop":
        return '\uf108';
    }
  };

  var drawNumbers = function(range) {
    var numbers = svg.selectAll(".number")
      .data(range, function(d, i) { return d; });

    //UPDATE
    numbers.transition()
      .duration(500)
      .attr("x", function(d, i) {
        return width - 300 + (i * 32);
      });

    //ENTER
    numbers.enter().append("text")
      .attr("x", function(d, i) {
        return width - 300 + (i * 32);
      })
      .attr("dy", ".35em")
      .attr("y", -60)
      .attr("class", "number")
      .style("fill-opacity", 1e-6)
      .text(function(d, i) {
        return d;
      })
      .transition()
      .duration(500)
      .attr("y", 0)
      .style("fill-opacity", 1);

    //EXIT
    numbers.exit()
      .transition()
      .duration(500)
      .attr("y", 60)
      .style("fill-opacity", 1e-6)
      .remove();

  };

  var update = function(data, symbol) {
    // DATA JOIN
    // Join new data with old elements, if any.
    var text = svg.selectAll(".fa-symbol")
      .data(data, function(d, i) { return d; });

    // UPDATE
    // Update old elements as needed.
    text.attr("class", "update fa-symbol")
      .transition()
      .duration(750)
      .attr("x", function(d, i) {
        return (i - maxItems * Math.floor(i / maxItems)) * 50;
      })
      .attr("font-family", "FontAwesome")
      .text(function(d) { return symbol; });

    // ENTER
    // Create new elements as needed.
    text.enter().append("text")
      .attr("class", "enter fa-symbol")
      .attr("dy", ".35em")
      .style("fill-opacity", 1e-6)
      .attr("x", 0)
      .transition()
      .duration(750)
      .text(function(d) { return symbol; })
      .attr("x", function(d, i) {
        return  (i - maxItems * Math.floor(i / maxItems)) * 50;
      })
      .attr("y", function(d, i) {
        return Math.floor(i / maxItems) * 60;
      })
      .style("fill-opacity", 1);

    // EXIT
    // Remove old elements as needed.
    text.exit()
      .transition()
      .duration(750)
      .attr("y", 60)
      .style("fill-opacity", 1e-6)
      .remove();
  };

  return init();
};
