BT={};var DataChannel=function(){var a,b="ws://ws.blockchain.info:8335/inv",c=function(){return a=new WebSocket(b),{ws:a,start:e}},d=function(b){var c=new CustomEvent("sentmessage");c.data=b,a.dispatchEvent(c)},e=function(){f({op:"unconfirmed_sub"})},f=function(b){b=JSON.stringify(b),d(b),a.send(b)};return c()},IpDecoder=function(){var a,b="http://freegeoip.net/json/",c=[],d={},e=function(){return a=setInterval(h,1e3),{queue:c}},f=function(){var a=JSON.parse(this.responseText);g(a),a.cached=!0,d[a.ip]=a},g=function(a){var b=new CustomEvent("geoip");b.data=a,document.dispatchEvent(b)},h=function(){var a,e;a=c.pop(),a&&"127.0.0.1"!==a&&(d[a]&&g(d[a]),e=new XMLHttpRequest,e.onload=f,e.open("get",b+a,!0),e.send())};return e()},LiveMap=function(){var a=L.map("map").setView([42.617791,-15.306702],3),b=L.AwesomeMarkers.icon({icon:"bitcoin",markerColor:"blue"}),c=function(){d(),e(),document.addEventListener("geoip",f)},d=function(){var b=($(window).height(),$(window).height());$("#map").css("height",b),a.invalidateSize()},e=function(){var b=L.tileLayer("http://{s}.tile.cloudmade.com/2c83ee06868f422f8163dfae1d636cf0/997/256/{z}/{x}/{y}.png",{maxZoom:10,minZoom:2});b.on("click",function(a,b,c){console.log(a,b,c)}),b.addTo(a)},f=function(c){{var d=c.data;L.marker([d.latitude,d.longitude],{icon:b,bounceOnAdd:!0,bounceOnAddOptions:{duration:500,height:100},bounceOnAddCallback:function(){}}).addTo(a)}};return c()},LetterUpdater=function(a){var b,c={top:10,right:10,bottom:120,left:10},d=a.width-c.left-c.right,e=a.height-c.top-c.bottom,f=0,g=["Think about...","real time visualizations...","open data...","D3 + Modular JS"],h=function(){j(),k(g[0].split("")),setInterval(function(){k(i().split(""))},2500)},i=function(){f++;var a=g[f];return a?a:(f=0,g[0])},j=function(){b=d3.select("#js-messageArea").append("svg").attr("width",d).attr("height",e).append("g").attr("transform","translate("+d/4+","+e/2+")")},k=function(a){var c=[],g=[],h=.0647*d,i=h/2,j=1===f?d/a.length:d/4,k=b.selectAll("text").data(a,function(a){return this.dx?(g.push(a),a+g.count(a)):(c.push(a),a+c.count(a))});b.transition().duration(750).attr("transform","translate("+j+","+e/2.5+")"),k.attr("class","update").transition().duration(750).attr("x",function(a,b){return b*i}),k.enter().append("text").attr("class","enter").attr("dy",".35em").attr("y",-60).attr("x",function(a,b){return b*i}).attr("font-size",h).style("fill-opacity",1e-6).text(function(a){return a}).transition().duration(750).attr("y",0).style("fill-opacity",1),k.exit().transition().duration(750).attr("y",60).style("fill-opacity",1e-6).remove()};return h()},Calculator=function(a,b,c){var d=this;$("#js-difficulty").html(a),$(".slider").noUiSlider({range:[0,4500],start:400,handles:1,connect:"lower",color:"red",serialization:{resolution:1},slide:function(){var a=g(this.val());d.calc(a)}});var e=function(){d.calc(400)};this.calc=function(b){$("#js-currentHashRate").html(b);var d=i(b,a),e=f(b,a),g=Object.merge(d,e);c.dispatchEvent(g)};var f=function(a,c){return{type:"rate",btcPerDay:j(a,c,1),usdPerDay:k(a,c,b,1),cost:h(a)}},g=function(a){return 1500>a?a:3e3>a?6*a:20*a},h=function(c){return 1/k(c,a,b,1)*2.64},i=function(a,b){var c=4294967296*b/(1e6*a);return l(c)},j=function(a,b,c){var d=4294967296*b/(1e6*a),e=50/(d/(24*c)/60/60);return e},k=function(a,b,c,d){var e=j(a,b,d),f=e*c;return f},l=function(a){a=Number(a);var b=Math.floor(a/3600/24),c=Math.floor(a/3600)-24*Math.floor(a/3600/24),d=Math.floor(a%3600/60),e=Math.floor(a%3600%60);return{days:b,hours:c,minutes:d,seconds:e}};return e()},StatisticsManager=function(a){var b,c,d=$(window).width()-150,e=$(window).height(),f=Math.floor(d/70),g=["home","lamp","mobile","desktop"],h=0,i={home:18e3,lamp:1440,desktop:6e3,mobile:72},j=function(a){"next"===a?h++:h--;var b=g[h];return b?b:(h=0,g[0])},k=function(){n(),o(),l("home"),c=setInterval(function(){var a=j("next");l(a)},5e3)},l=function(b){var c=Math.ceil(a/i[b])/1e3,d=c.toString().split(""),e=Number.range(0,c).every();r(d),s(e,m(b))},m=function(a){switch(a){case"home":return"a";case"lamp":return"b";case"mobile":return"c";case"desktop":return"d"}},n=function(){b=d3.select(".test").append("svg").attr("width",d-70).attr("height",e-130).append("g").attr("transform","translate(32,"+e/2+")")},o=function(){var a=b.append("g").attr("class","buttonsGroup");a.append("text").attr("font-family","FontAwesome").text("").attr("x",function(){return d-200}).attr("y",200).attr("class","prevButton").on("click",p).on("mouseover",function(){$(this).attr("class","active")}).on("mouseout",function(){$(this).attr("class","prevButton")}),a.append("text").attr("font-family","FontAwesome").text("").attr("x",function(){return d-150}).attr("y",200).attr("class","nextButton").on("click",q).on("mouseover",function(){$(this).attr("class","active")}).on("mouseout",function(){$(this).attr("class","nextButton")})},p=function(){l(j("prev"))},q=function(){l(j("next"))},r=function(a){var c=b.selectAll(".number").data(a,function(a){return a});c.transition().duration(500).attr("x",function(a,b){return d-300+32*b}),c.enter().append("text").attr("x",function(a,b){return d-300+32*b}).attr("dy",".35em").attr("y",-60).attr("class","number").style("fill-opacity",1e-6).text(function(a){return a}).transition().duration(500).attr("y",0).style("fill-opacity",1),c.exit().transition().duration(500).attr("y",60).style("fill-opacity",1e-6).remove()},s=function(a,c){var d=b.selectAll(".fa-symbol").data(a,function(a){return a});d.attr("class","update fa-symbol").transition().duration(750).attr("x",function(a,b){return 50*(b-f*Math.floor(b/f))}).attr("font-family","FontAwesome").text(function(){return c}),d.enter().append("text").attr("class","enter fa-symbol").attr("dy",".35em").style("fill-opacity",1e-6).attr("x",0).transition().duration(750).text(function(){return c}).attr("y",function(a,b){return 60*Math.floor(b/f)}).style("fill-opacity",1),d.exit().transition().duration(750).attr("y",60).style("fill-opacity",1e-6).remove()};return k()},PieChart=function(a){var b,c=["ARS","AUD","BRL","CAD","CHF","CNY","CZK","DKK","EUR","GBP","HKD","ILS","INR","JPY","KRW","LTC","MXN","NMC","NOK","NZD","PLN","RUB","SEK","SGD","SLL","THB","USD","XRP","ZAR"],d=960,e=700,f=Math.min(d,e)/2,g=d3.scale.linear().range([0,2*Math.PI]),h=d3.scale.sqrt().range([0,f]),i=d3.scale.category50(),j=function(){k()},k=function(){function c(a){var b=d3.interpolate(g.domain(),[a.x,a.x+a.dx]),c=d3.interpolate(h.domain(),[a.y,1]),d=d3.interpolate(h.range(),[a.y?20:0,f]);return function(a,e){return e?function(){return k(a)}:function(e){return g.domain(b(e)),h.domain(c(e)).range(d(e)),k(a)}}}b=d3.select(a).append("svg").attr({width:d,height:e}).append("g").attr("transform","translate("+d/2+","+(e/2+10)+")");var j=d3.layout.partition().value(function(a){return a.score}),k=d3.svg.arc().startAngle(function(a){return Math.max(0,Math.min(2*Math.PI,g(a.x)))}).endAngle(function(a){return Math.max(0,Math.min(2*Math.PI,g(a.x+a.dx)))}).innerRadius(function(a){return Math.max(0,h(a.y))}).outerRadius(function(a){return Math.max(0,h(a.y+a.dy))});d3.json("http://bt3api.herokuapp.com/ticker",function(a,f){function g(a){o.text(a.name?a.name:a.symbol)}function h(a){n.transition().duration(750).style("fill-opacity",function(b){return"flare"!==a.name||b.children?1:1e-6}).attrTween("d",c(a))}var m=l(f),n=b.selectAll("path").data(j.nodes(m)).enter().append("path").attr("d",k).style("fill",function(a){return i(a.children?a.name:a.symbol)}).style("fill-opacity",function(a){return a.children?1:1e-6}).attr("class",function(a){return a.children?"visible":"hidden"}).on("click",h).on("mouseenter",g),o=b.append("text").text("Click / hover").attr("x",d/-4).attr("y",e/-4)}),d3.select(self.frameElement).style("height",e+"px")},l=function(a){var b={name:"flare"},d=[];for(var e in c){var f=m(a,e);f.children=[],f.name=f.symbol;var g={name:c[e]};g.children=f,g.score=f.length,d.push(g)}return b.children=d,b},m=function(a,b){return a.filter(function(a){return a.score=2,a.currency===c[b]})};return j()},BulletChart=function(a){var b,c={top:5,right:40,bottom:20,left:120},d=500-c.left-c.right,e=60-c.top-c.bottom,f=d3.bullet().width(d).height(e),g=[{title:"Bit Coins",subtitle:"per day",ranges:[.01,.04,.06],measures:[.03],markers:[.05]},{title:"USD",subtitle:"per day",ranges:[5,20,50],measures:[8],markers:[40]},{title:"Energy",subtitle:"KW",ranges:[450,600,1e3],measures:[350],markers:[800]},{title:"Cost",subtitle:"USD",ranges:[10,30,50],measures:[10],markers:[45]}],h=function(a){b=d3.select("#js-bulletChart").selectAll("svg").data(a).enter().append("svg").attr("class","bullet").attr("width",d+c.left+c.right).attr("height",e+c.top+c.bottom).append("g").attr("transform","translate("+c.left+","+c.top+")").call(f);var g=b.append("g").style("text-anchor","end").attr("transform","translate(-6,"+e/2+")");g.append("text").attr("class","title").text(function(a){return a.title}),g.append("text").attr("class","subtitle").attr("dy","1em").text(function(a){return a.subtitle})},i=function(b){switch(b.title){case"Bit Coins":b.measures=[a.data.btcPerDay];break;case"USD":b.measures=[a.data.usdPerDay];break;case"Cost":b.measures=[a.data.cost]}return b},j=function(){h(g),a.addEventListener("rate",function(c){a.data=c,b.datum(i).call(f.duration(200))})};return j()},PolarClock=function(a){function b(a,b){var c=d3.interpolateString(a,b);return function(a){return d3.hsl(c(a))}}var c=this,d=300,e=300,f=Math.min(d,e)/1.9,g=.09,h=d3.time.format("%S s"),i=d3.time.format("%M m"),j=d3.time.format("%H h"),k=d3.time.format("%a"),l=(d3.time.format("%b"),d3.scale.linear().range(["hsl(-180,50%,50%)","hsl(180,50%,50%)"]).interpolate(b)),m=d3.svg.arc().startAngle(0).endAngle(function(a){return 2*a.value*Math.PI}).innerRadius(function(a){return a.index*f}).outerRadius(function(a){return(a.index+g)*f}),n=function(){a.addEventListener("rate",function(a){r(a)})},o=function(a){var b=new Date,c=a.seconds/60,d=a.minutes/60,e=a.hours/24,f=a.days/99999;return[{value:c,index:.7,text:h(b)},{value:d,index:.6,text:i(b)},{value:e,index:.5,text:j(b)},{value:f,index:.3,text:k(b)}]},p=d3.select("#js-timer").append("svg").attr("width",d).attr("height",e).append("g").attr("transform","translate("+d/2+","+e/2+")"),q=p.selectAll("g").data(o({seconds:60,minutes:33,hours:2,days:33})).enter().append("g");q.append("path"),q.append("text"),d3.select(c.frameElement).style("height",e+"px");var r=function(a){var b=o(a);q=q.each(function(a){this._value=a.value}).data(b).each(function(a){a.previousValue=this._value}),q.select("path").transition().ease("elastic").attrTween("d",s).style("fill",function(a){return l(a.value)}),q.select("text").attr("dy",function(a){return a.value<.5?"-.5em":"1em"}).text(function(a){return a.text}).transition().ease("elastic").attr("transform",function(a){return"rotate("+360*a.value+")translate(0,"+-(a.index+g/2)*f+")rotate("+(a.value<.5?-90:90)+")"})},s=function(a){var b=d3.interpolateNumber(a.previousValue,a.value);return function(c){return a.value=b(c),m(a)}};return n()};App=function(){var a=this;a.width=$(window).width(),a.height=$(window).height();var b=function(){EventDispatcher.prototype.apply(App.prototype);{var b=(new BulletChart(a),new PolarClock(a),new Calculator(1789546951,836.936,a),new DataChannel),c=new IpDecoder;new LetterUpdater(a),new LiveMap}$(document).foundation(),$(".js-contentRegion").css({height:a.height+"px"}),$(window).resize(function(){$(".js-contentRegion").css({height:a.height+"px"})}),$("[id*='Btn']").stop(!0).on("click",function(a){a.preventDefault(),$(this).scrolld()}),b.ws.addEventListener("message",function(a){var b,d=JSON.parse(a.data);d.x&&d.x.relayed_by&&d.x.out&&(b=d.x.relayed_by,c.queue.push(b))}),setTimeout(b.start,3e3)};return b()},app=new App;