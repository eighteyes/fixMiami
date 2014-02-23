function success(latLng) {
  console.log('maps success');
  var lat = latLng.coords.latitude;
  var lon = latLng.coords.longitude;
  var local = new google.maps.LatLng(lat, lon);

  var mapOptions = {
    zoom: 16,
    center: local
  };

  map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);

  var styleArray = [
  {
    featureType: "all",
    stylers: [
      { visibility: "off" }
    ]
  },
  {
    featureType: "road",
    stylers: [
      { visibility: "on" }
    ]
  },
  {
    featureType: "parks",
    stylers: [
      { visibility: "on" }
    ]
  }
];

map.setOptions({styles: styleArray});

  info = new google.maps.InfoWindow();

  // restore
  rebuildIncidents();

  function handleAddIconClick(e) {
    var content = makeIconList();
    var loc = e.latLng;

    info.setContent( content[0] );
    info.setPosition(loc);
    map.panTo(loc);


    info.open(map);

    $('.iconList span').on('click', function handleIncidentTypeSelection() {
      console.log('click', $(this).attr('data-type'));
      var type = $(this).attr('data-type');

      var incident = new Incident(type, loc, 0, incidents.length);
      incidents.push(incident);

      info.close();
    });
  }

  setInterval( pollTwitter, 2500 );

  //add new incident to map
  google.maps.event.addListener(map, 'click', handleAddIconClick);
}


function error() {
  console.error("I can't handle this");
}

function initialize() {
  console.log('maps init');
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  navigator.geolocation.getCurrentPosition(success, error, options);
}

google.maps.event.addDomListener(window, 'load', initialize);