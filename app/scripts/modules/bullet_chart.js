"use strict";

var BulletChart = function(scope) {
  var self = this;

  var margin = {top: 5, right: 140, bottom: 20, left: 50},
      width = 500 - margin.left - margin.right,
      height = 60 - margin.top - margin.bottom;

  var chart = d3.bullet()
      .width(width)
      .height(height);

  var svg;

  var initialData = [
    {
      "title":"Bit Coins",
      "subtitle":"per day",
      "ranges":[0.01,0.04,0.06],
      "measures":[0.03],
      "markers":[0.05]
    },
    {
      "title":"USD",
      "subtitle":"per day",
      "ranges":[5,20,50],
      "measures":[8],
      "markers":[40]
    },
    {
      "title":"Energy",
      "subtitle":"KW",
      "ranges":[450,600,1000],
      "measures":[350],
      "markers":[800]
    },
    {
      "title":"Cost",
      "subtitle":"USD",
      "ranges":[10,30,50],
      "measures":[10],
      "markers":[45]
    }
  ];

  var draw = function(data) {
    svg = d3.select("#js-bulletChart").selectAll("svg")
        .data(data)
      .enter().append("svg")
        .attr("class", "bullet")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(chart);

    var title = svg.append("g")
        .style("text-anchor", "end")
        .attr("transform", "translate(-6," + height / 2 + ")");

    title.append("text")
        .attr("class", "title")
        .text(function(d) { return d.title; });

    title.append("text")
        .attr("class", "subtitle")
        .attr("dy", "1em")
        .text(function(d) { return d.subtitle; });
  };

  var updateData = function(d){
    switch (d.title) {
      case "Bit Coins" :
        d.measures = [scope.data.btcPerDay];
        break;
      case "USD" :
        d.measures = [scope.data.usdPerDay];
        break;
      case "Cost" :
        d.measures = [scope.data.cost];
        break;
    }
    return d;
  };

  var init = function() {
    draw(initialData);
    scope.addEventListener("rate", function(a) {
      scope.data = a;
      svg.datum(updateData).call(chart.duration(200));
    });

  };

  return init();
};







