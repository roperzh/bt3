"use strict";

var LetterUpdater = function() {

  var width = $(window).width();
  var height = $(window).height();
  var svg;
  var words = [
    "welcome to the awsomeness",
    "explore about bitcoins",
    "lalala"
  ];

  var init = function() {
    makeSvgArea();
    update(words[0].split(""));

    // Grab a random sample of letters from the alphabet, in alphabetical order.
    setInterval(function() {
      update(words[Math.round(Math.random() * 2)].split(""));
    }, 1500);

  };

  var makeSvgArea = function() {
    svg = d3.select("#js-main").append("svg")
      .attr("width", width - 50)
      .attr("height", height - 50)
      .append("g")
      .attr("transform", "translate(32," + (height / 2) + ")");
  };

  var update = function(data) {
    var newLetters = [];
    var oldLetters = [];

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

    // UPDATE
    // Update old elements as needed.
    text.attr("class", "update")
      .transition()
      .duration(750)
      .attr("x", function(d, i) {
        return i * 32;
      });

    // ENTER
    // Create new elements as needed.
    text.enter().append("text")
      .attr("class", "enter")
      .attr("dy", ".35em")
      .attr("y", -60)
      .attr("x", function(d, i) {
        return i * 32;
      })
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
