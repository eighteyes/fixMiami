var map;

// incidents are added to with rebuilding and clicking
var incidents = (typeof localStorage['incidents'] !== "undefined" ) ?
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

$.ajax('http://127.0.0.1:1337' , {
  success: function(resp) {
    for ( i in resp.statuses ){
      var tweet = resp.statuses[i];
      console.log(tweet.text);
    }
  }
});