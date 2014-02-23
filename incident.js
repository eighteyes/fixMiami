


var Incident = function(type, latLon, votes) {
  var tIncident = this;
  this.id = incidents.length;
  this.type = type;
  this.votes = votes || 0;
    // gmaps obj
    this.loc = latLon;


    this.addVote = function() {
      this.votes += 1;
      this.save();
    }
    this.getVerbage = function(){
    return $('<div>', { class : 'verbage', text: icons[this.type].verbage })
      .append('Total Votes:',
        $('<span>', { text: tIncident.votes }),
        $('<button>').text('Yes'),
        'No'
        );
    }

    this.save = function(){
      localStorage['incidents'] = JSON.stringify(incidents);
      console.log('Saved', incidents);
    }
    this.addIcon = function(){
      console.log("addIcon", this.type, this.loc);
      latLng = new google.maps.LatLng( this.loc.d, this.loc.e );
      var newIcon = new google.maps.Marker({
        position : latLng,
        map: map,
        animation: google.maps.Animation.DROP,
        icon:  icons[type].url,
        title: icons[type].title
      });


      //content for new icon
      google.maps.event.addListener( newIcon, 'click', function handleIconView(){
        var infowindow = new google.maps.InfoWindow({
          content: tIncident.getVerbage()[0],
          position: latLng
        });
        infowindow.open(map);
        $('.verbage button').on('click', function() {
          tIncident.addVote();
          $(this).prev('span').text( function( i, t ){ return parseInt(t) + 1; });
        });
      });
    }

    this.addIcon();

    return this;
  }