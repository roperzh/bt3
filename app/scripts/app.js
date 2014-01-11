blockChain = new DataChannel();
geoIP = new IpDecoder();

blockChain.ws.addEventListener('message', function(e) {
  var ip;
  var message;
  var data = JSON.parse(e.data);
  var value = 0.00;
  var i;

  if (data['x'] && data['x']['relayed_by'] && data['x']['out']) {
    ip = data['x']['relayed_by'];
    geoIP.queue.push(ip);
  }
});

setTimeout(blockChain.start, 3000);
