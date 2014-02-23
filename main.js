var map, info, location;
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
      incidents[i] = new Incident(incidents[i].type, incidents[i].loc, incidents[i].votes, incidents[i].id || i);
    }
  }
}

$(document).ready(function(){
  $('#overlay').on('click', function(){ $(this).fadeOut(); })
});

function r() {
  localStorage.clear('incidents');
  location.reload(true);
}

function pollTwitter() {
  $.ajax('http://127.0.0.1:1337', {
    success: function(resp) {
      //console.log('Twitter', resp);
      for (i in resp.statuses) {
        var tweet = resp.statuses[i];
        // Exclude if already encoded
        var isIncident = _.find( incidents, function( inc ) {
          return inc.id == tweet.id
        });
        // find if there is a match
        var type = tweet.text.match(iconRegex);
        //remove hash
        tweet.text = tweet.text.replace('#fixmiami', '');
        var index = tweet.text.indexOf(' at ');
        if ( !isIncident && index > 0 && type !== null && type.length > 0 ){
          //remove non a-z and &
          console.log("match", type, tweet);
          // found a match
          if (index > 0) {
            getLocation(tweet, type[0].toLowerCase(), tweet.text.slice(index + 4), processLocation);
          }
        }
      }
    }
  })
};


function getLocation(tweet, type, str, cb) {
  //console.log('geocoding:', str);
  geo.geocode({
    address: str + " Miami, FL"
  }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      //console.log('GEO:', results);
      cb(null, tweet, type, results[0].geometry.location)
    } else {
      console.error('Geo Fuckup')
      cb(new Error("Fuck"));
    }
  });
}

function processLocation( err, tweet, type, resp ){
  var inc = new Incident(type, resp, 1, tweet.id);
  inc.addMetaFromTweet(tweet);
  incidents.push(inc);
}
