"use strict";

var LetterUpdater = function(scope) {
  var margin = { top: 10, right: 10, bottom: 120, left: 10 };
  var width = scope.width - margin.left - margin.right;
  var height = scope.height - margin.top - margin.bottom;

  var svg;
  var currentTextIndex = 0;
  var words = [
    "Think about...",
    "real time visualizations...",
    "open data...",
    "D3 + Modular JS",
  ];

  var init = function() {
    makeSvgArea();
    update(words[0].split(""));

    // Grab a random sample of letters from the alphabet, in alphabetical order.
    setInterval(function() {
      update(getCurrentText().split(""));
    }, 2500);

  };

  var getCurrentText = function() {
    currentTextIndex++;
    var response = words[currentTextIndex];
    if(response) {
      return response;
    } else {
      currentTextIndex = 0;
      return words[0];
    }
  }

  var makeSvgArea = function() {
    svg = d3.select("#js-messageArea").append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + (width / 4) + "," + (height / 2) + ")");
  };

  var update = function(data) {
    var newLetters = [];
    var oldLetters = [];
    var fontSize = width * 0.0647;
    var letterSeparation = fontSize / 2;
    var svgPosition = currentTextIndex === 1 ? width / data.length : width / 4;

    // DATA JOIN
    // Join new data with old elements, if any.
    var text = svg.selectAll("text")
      .data(data, function(d, i) {
        // Check if the data source is fresh
        if (this.dx) {
          oldLetters.push(d);
          return d + oldLetters.count(d);
        } else {
          newLetters.push(d);
          return d + newLetters.count(d);
        }
      });

    svg.transition()
      .duration(750)
      .attr("transform", "translate(" + svgPosition + "," + (height / 2.5) + ")");

    // UPDATE
    // Update old elements as needed.
    text.attr("class", "update")
      .transition()
      .duration(750)
      .attr("x", function(d, i) {
        return i * letterSeparation;
      });

    // ENTER
    // Create new elements as needed.
    text.enter().append("text")
      .attr("class", "enter")
      .attr("dy", ".35em")
      .attr("y", -60)
      .attr("x", function(d, i) {
        return i * letterSeparation;
      })
      .attr("font-size", fontSize)
      .style("fill-opacity", 1e-6)
      .text(function(d) {
        return d;
      })
      .transition()
      .duration(750)
      .attr("y", 0)
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
