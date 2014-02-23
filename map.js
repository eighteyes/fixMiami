function success(latLng) {
  console.log('maps success');
  var lat = latLng.coords.latitude;
  var lon = latLng.coords.longitude;
  var latLon = new google.maps.LatLng(lat, lon);

  console.log(lat, lon);

  var mapOptions = {
    zoom: 16,
    center: latLon
  };

  map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);

  // restore
  rebuildIncidents();
  //

  var poop = new google.maps.Marker({
    position: latLon,
    map: map,
    animation: google.maps.Animation.DROP,
    icon: icons.drunk.url,
    title: icons.drunk.title
  });

  var infowindow = new google.maps.InfoWindow({
    content: "<div>A little man is a little drunk</div>"
  });

  google.maps.event.addListener(poop, 'click', function() {
    infowindow.open(map, poop);
  });


  function handleAddIconClick(e) {
    var content = makeIconList();
    var loc = e.latLng;
    var info = new google.maps.InfoWindow({
      content: content[0],
      position: loc
    });
    info.open(map);

    $('.iconList span').on('click', function() {
      console.log('click', $(this).attr('data-type'));
      var type = $(this).attr('data-type');

      var incident = new Incident(type, loc);
      incidents.push(incident);

      info.close();
    });
  }

  //add new incident to map
  google.maps.event.addListener(map, 'click', handleAddIconClick);
}

// TODO: Twitter Integration

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