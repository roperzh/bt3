"use strict";

var StatisticsManager = function(wattsWasted) {

  var width = $(window).width() - 150;
  var height = $(window).height();
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

  var getCurrentCase = function(nextOrPrev) {
    if(nextOrPrev === "next"){
      currentCase++;
    } else {
      currentCase--;
    }

    var result = cases[currentCase];
    if(result){
      return result;
    } else {
      currentCase = 0;
      return cases[0];
    }
  };

  var init = function() {
    makeSvgArea();
    makeButtons();
    redraw("home");
    refreshInterval = setInterval(function() {
      var c = getCurrentCase("next");
      redraw(c);
    }, 5000);
  };

  var redraw = function(type) {
    var range = Math.ceil(wattsWasted / wattConsumption[type]) / 1000;
    var drawableRange = range.toString().split("");
    var numericRange = Number.range(0, range).every();

    drawNumbers(drawableRange);
    update(numericRange, getSymbolFor(type));
  };

  var getSymbolFor = function(type) {
    switch (type) {
      case "home":
        return '\uf015';
      case "lamp":
        return '\uf0eb';
      case "mobile":
        return '\uf10b';
      case "desktop":
        return '\uf108';
    }
  };

  var makeSvgArea = function() {
    svg = d3.select(".test").append("svg")
      .attr("width", width - 70)
      .attr("height", height - 130)
      .append("g")
      .attr("transform", "translate(32," + (height / 2) + ")");
  };

  var makeButtons = function() {
    var buttonsContainer = svg.append("g")
      .attr("class", "buttonsGroup");

    buttonsContainer.append("text")
      .attr("font-family", "FontAwesome")
      .text("\uf137")
      .attr("x", function() {
        return width - 200;
      })
      .attr("y", 200)
      .attr("class", "prevButton")
      .on("click", showPrev)
      .on("mouseover", function() {
        $(this).attr("class", "active");
      })
      .on("mouseout", function() {
        $(this).attr("class", "prevButton");
      });

    buttonsContainer.append("text")
      .attr("font-family", "FontAwesome")
      .text("\uf138")
      .attr("x", function() {
        return width - 150;
      })
      .attr("y", 200)
      .attr("class", "nextButton")
      .on("click", showNext)
      .on("mouseover", function() {
        $(this).attr("class", "active");
      })
      .on("mouseout", function() {
        $(this).attr("class", "nextButton");
      });
  };

  var showPrev = function(data) {
    // clearInterval(refreshInterval);
    redraw(getCurrentCase("prev"));
  };

  var showNext = function(data) {
    // clearInterval(refreshInterval);
    redraw(getCurrentCase("next"));
  };

  var drawNumbers = function(range) {
    var numbers = svg.selectAll(".number")
      .data(range, function(d, i) {
        return d;
      });

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
      .data(data, function(d, i) {
        return d;
      });

    // UPDATE
    // Update old elements as needed.
    text.attr("class", "update fa-symbol")
      .transition()
      .duration(750)
      .attr("x", function(d, i) {
        return (i - maxItems * Math.floor(i / maxItems)) * 50;
      })
      .attr("font-family", "FontAwesome")
      .text(function(d) {
        return symbol;
      });

    // ENTER
    // Create new elements as needed.
    text.enter().append("text")
      .attr("class", "enter fa-symbol")
      .attr("dy", ".35em")
      .style("fill-opacity", 1e-6)
      .attr("x", 0)
      .transition()
      .duration(750)
      .text(function(d) {
        return symbol;
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
