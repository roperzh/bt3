"use strict";

var StatisticsManager = function(wattsWasted, el, scope) {

  var width         = scope.width;
  var height        = scope.height - 350;
  var maxItems      = Math.floor(width / 70);
  var cases         = ["home", "lamp", "mobile", "desktop"];
  var currentCase   = 1;
  var fontSize      = width * 0.05;
  var svg;

  var dataCases = {
    home:     { symbol: '\uf015', wattage: 18000 },
    lamp:     { symbol: '\uf0eb', wattage: 1440 },
    desktop:  { symbol: '\uf108', wattage: 6000 },
    mobile:   { symbol: '\uf10b', wattage: 72 }
  };

  var init = function() {
    makeSvgArea();
    setContent();
    showStatsFor("home");
    initStatsCicle();
  };

  var makeSvgArea = function() {
    svg = d3.select(el).append("svg")
      .attr("width", width)
      .attr("height", height - 130)
      .append("g")
      .attr("transform", "translate(32," + (height / 2) + ")");
  };

  var setContent = function() {
    Object.keys(dataCases, function(name, type) {
      var range =  Math.ceil(wattsWasted / type.wattage) / 10000;
      type.message = range + "M"
      type.numericRange = Number.range(0, range).every();
    })
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

  var showStatsFor = function(type) {
    var currentCase = dataCases[type];
    drawNumbers(currentCase.message);
    update(currentCase.numericRange, currentCase.symbol);
  };

  var initStatsCicle = function() {
    setInterval(function() {
      var c = getNextCase();
      showStatsFor(c);
    }, 5000);
  };

  var drawNumbers = function(range) {
    var numbers = svg.selectAll(".message")

    //UPDATE
    numbers.transition()
      .duration(3500)
      .attr("fill-opacity", 1e-6)
      // .remove();

    //ENTER
    svg.append("text")
      .attr("x", 50)
      .attr("dy", ".35em")
      .attr("class", "message")
      .attr("y", 0)
      .attr("font-size", fontSize)
      .text(range)
      .transition()
      .duration(500)
      .style("fill-opacity", 1);
  };

  var update = function(data, symbol) {
    // DATA JOIN
    var text = svg.selectAll(".fa-symbol")
      .data(data, function(d, i) { return d; });

    // UPDATE
    text.transition()
      .duration(750)
      .attr("x", function(d, i) {
        return (i - maxItems * Math.floor(i / maxItems)) * 50;
      })
      .attr("font-family", "FontAwesome")
      .text(function(d) { return symbol; });

    // ENTER
    text.enter().append("text")
      .attr("class", "statistics-data fa fa-symbol")
      .attr("dy", ".35em")
      .style("fill-opacity", 1e-6)
      .attr("x", 0)
      .attr("font-size", fontSize)
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
    text.exit()
      .transition()
      .duration(750)
      .attr("y", 60)
      .style("fill-opacity", 1e-6)
      .remove();
  };

  return init();
};
