"use strict";

var Test = function() {

  var wattsWasted = 223300861.7188927;
  var width = $(window).width() - 150;
  var height = $(window).height();
  var svg;
  var maxItems = Math.floor(width / 70);

  var wHousePerDay = 750 * 24;
  var wLampPerDay = 60 * 24;
  var wDesktopPerDay = 250 * 24;
  var wMobilePerDay = 3 * 24;

  var symbols = ['\uf015', '\uf0eb', '\uf10b', '\uf108'];

  var init = function() {
    makeSvgArea();

    setInterval(function() {
      // var range = Math.ceil(wattsWasted / wHousePerDay) / 1000;
      var range = Number.random(30) * 0.4547;
      update(Number.range(0, range).every(), symbols[0], range.toString().split(""));
    }, 1500);

  };

  var makeSvgArea = function() {
    svg = d3.select(".test").append("svg")
      .attr("width", width - 70)
      .attr("height", height - 130)
      .append("g")
      .attr("transform", "translate(32," + (height / 2) + ")");
  };

  var update = function(data, symbol, range) {
    var numbers = svg.selectAll(".number")
      .data(range, function(d, i) { return d; })
      .attr("y", -150);

    //UPDATE
    numbers.transition()
      .duration(500)
      .attr("x", function(d, i) { return (i * 32); });

    //ENTER
    numbers.enter().append("text")
      .attr("x", function(d, i){ return (i * 32); })
      .attr("dy", ".35em")
      .attr("y", -60)
      .attr("class", "number")
      .style("fill-opacity", 1e-6)
      .text(function(d, i) { return d; })
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

    // DATA JOIN
    // Join new data with old elements, if any.
    var text = svg.selectAll(".test")
      .data(data, function(d, i) { return d; });

    // UPDATE
    // Update old elements as needed.
    text.attr("class", "update test")
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
      .attr("class", "enter test")
      .attr("dy", ".35em")
      .style("fill-opacity", 1e-6)
      .attr("x", 0)
      .transition()
      .duration(750)
      .text(function(d) { return symbol; })
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
