var map;
var location;
var geo = new google.maps.Geocoder()

// incidents are added to with rebuilding and clicking
var incidents = (typeof localStorage['incidents'] !== "undefined") ?
JSON.parse(localStorage['incidents']) : [];

function rebuildIncidents() {
  // parse existing, rebuild
  if (incidents.length > 0) {
    console.log('Local:', incidents);
    for (var i = 0, l = incidents.length; i < l; i++) {
      console.log('Old', incidents[i]);
      incidents[i] = new Incident(incidents[i].type, incidents[i].loc, incidents[i].votes);
    }
  }
}

function r() {
  localStorage.clear('incidents');
  location.reload(true);
}

function pollTwitter() {
  $.ajax('http://127.0.0.1:1337', {
    success: function(resp) {
      console.log('Twitter', resp);
      for (i in resp.statuses) {
        var tweet = resp.statuses[i];
        // TODO: Exclude if already encoded
        // find if there is a match
        var type = tweet.text.match(iconRegex);
        if ( type !== null && type.length > 0 ){
          console.log("match", type);
          // found a match
          var index = tweet.text.indexOf('is at ');
          if (index > 0) {
            console.log(tweet.text);
            getLocation(type[0], tweet.text.slice(index + 7), processLocation);
          }
        }
      }
    }
  })
};


function getLocation(type, str, cb) {
  geo.geocode({
    address: str + " Miami, FL"
  }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      console.log('GEO:', results);
      cb(null, type, results[0].geometry.location)
    } else {
      console.error('Geo Fuckup')
      cb(new Error("Fuck"));
    }
  });
}

function processLocation( err, type, resp ){
  var latLng = resp;
  console.log('Process Location', type, latLng);
  var inc = new Incident(type, latLng, 1);
}
