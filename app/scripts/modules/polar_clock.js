"use strict";

var PolarClock = function(scope) {
  var self = this;

  var width = 300,
      height = 300,
      radius = Math.min(width, height) / 1.9,
      spacing = 0.09;

  var formatSecond = d3.time.format("%S s"),
      formatMinute = d3.time.format("%M m"),
      formatHour = d3.time.format("%H h"),
      formatDay = d3.time.format("%a"),
      formatMonth = d3.time.format("%b");

  var color = d3.scale.linear()
      .range(["hsl(-180,50%,50%)", "hsl(180,50%,50%)"])
      .interpolate(interpolateHsl);

  var arc = d3.svg.arc()
      .startAngle(0)
      .endAngle(function(d) { return d.value * 2 * Math.PI; })
      .innerRadius(function(d) { return d.index * radius; })
      .outerRadius(function(d) { return (d.index + spacing) * radius; });

  var init = function() {
    scope.addEventListener("rate", function(data) {
      render(data);
    });
  };

  var parseData = function (data) {
    var now = new Date,
        second = data.seconds / 60,
        minute = data.minutes / 60,
        hour = data.hours / 24,
        day = data.days / 9999;
        // month = data.months / 12;
    return [
      {value: second, index: 0.7, text: data.seconds  + "s" },
      {value: minute, index: 0.6, text: data.minutes + "m" },
      {value: hour,   index: 0.5, text: data.hours + "h" },
      {value: day,    index: 0.3, text: data.days + "days" }
      // {value: month,  index: .1, text: formatMonth(now)}
    ];
  }

  var svg = d3.select("#js-timer").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


    var field = svg.selectAll("g")
        .data(parseData({seconds: 60, minutes: 33, hours: 2, days: 33}))
      .enter().append("g");

    field.append("path");

    field.append("text");

  d3.select(self.frameElement).style("height", height + "px");

  var render = function (data) {
    var parsedData = parseData(data);

    field = field
        .each(function(d) { this._value = d.value; })
        .data(parsedData)
        .each(function(d) { d.previousValue = this._value; });

    field.select("path")
      .transition()
        .ease("elastic")
        .attrTween("d", arcTween)
        .style("fill", function(d) { return color(d.value); });

    field.select("text")
        .attr("dy", function(d) { return d.value < .5 ? "-.5em" : "1em"; })
        .text(function(d) { return d.text; })
      .transition()
        .ease("elastic")
        .attr("transform", function(d) {
          return "rotate(" + 360 * d.value + ")"
              + "translate(0," + -(d.index + spacing / 2) * radius + ")"
              + "rotate(" + (d.value < .5 ? -90 : 90) + ")"
        });
  }

  var arcTween = function (d) {
    var i = d3.interpolateNumber(d.previousValue, d.value);
    return function(t) { d.value = i(t); return arc(d); };
  }

  // Avoid shortest-path interpolation.
  function interpolateHsl(a, b) {
    var i = d3.interpolateString(a, b);
    return function(t) {
      return d3.hsl(i(t));
    };
  }


  return init();
};
