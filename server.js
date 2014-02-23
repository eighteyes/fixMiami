var Twit = require('twit');
var http = require('http');
var connect = require('connect');

connect.createServer(
    connect.static(__dirname)
).listen(8080);

var T = new Twit({
    consumer_key:         'dUDZT5cMt8EtRGWSmjKDlw'
  , consumer_secret:      'svwOGfBgxAWw1iqGDgeYKcC8hdEDuf1ncvPH6w3BPI'
  , access_token:         '2356864034-2SngCCVSv7RLGSgHko6Ch3eeOLBoG5W40hLJn61'
  , access_token_secret:  'y98N7IMrItcGy0jGvR349SDZBWaRZ6GH3bUmziy2fy8Jf'
});

http.createServer(function (req, res) {
   // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.writeHead(200, {'Content-Type': 'application/json'});

  T.get('search/tweets', { q: '#fixmiami' }, function(err, resp){
    if (err) {
      console.error('Search Error');
    } else {
      res.end(JSON.stringify(resp));
    }
  });

}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');


