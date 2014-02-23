var ppButton = '<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top"> <input type="hidden" name="cmd" value="_donations"> <input type="hidden" name="business" value="eighteyes@gmail.com"> <input type="hidden" name="lc" value="US"> <input type="hidden" name="no_note" value="0"> <input type="hidden" name="currency_code" value="USD"> <input type="hidden" name="bn" value="PP-DonationsBF:btn_donate_SM.gif:NonHostedGuest"> <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"> <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1"> </form>';

var Incident = function(type, latLon, votes, id) {
  console.log('New Incident', type, latLon, votes, id);
  var tIncident = this;
  this.id = id;
  this.type = type;
  this.votes = votes || 0;
  this.meta = {
    reporter: '',
    date: '',
    picture: ''
  };
  this.fund = {
    total: 1000,
    current: Math.round(Math.random()*1000)
  };

  // gmaps obj
  this.loc = latLon;

  this.addMetaFromTweet = function( tweet ){
    this.meta.reporter = tweet.user.name;
    this.meta.date = new Date(tweet.created_at).toDateString();
    this.meta.picture = tweet.user.profile_image_url;
  };

  this.addVote = function() {
    this.votes += 1;
    this.save();
  };

  this.getVerbage = function() {
    return $('<div>', {
      class: 'verbage'
    }).append(
      $('<h1>').text(icons[tIncident.type].title),
      $('<p>').text(icons[tIncident.type].verbage),
      $('<p>').append(
        $('<img>', { class: 'tweetIcon', src: this.meta.picture }),
        this.meta.reporter + ' at ' + this.meta.date
      ),
      $('<p>', { class: 'bottom' }).append(
        'Total Votes:',
        $('<span>', { text: tIncident.votes }),
        $('<span>', { class: 'controls' }).append(
          $('<button>', { class: 'yes_btn' }).text('Yes'),
          $('<button>', { class: 'no_btn' }).text('No')
        )
      )
    );
  };

  this.getDonate = function() {
    return $('<div>', { class: 'donate' }).append(
      $('<h1>').text(icons[tIncident.type].title),
      $('<p>').text(icons[tIncident.type].donate),
      $('<meter>', {
        low: 0,
        high: tIncident.fund.total,
        max: tIncident.fund.total,
        value: tIncident.fund.current
      }),
      $('<span>', { class: 'money' }).text('$' + tIncident.fund.current),
      $('<p>', { text: 'How Much Can You Give?' }).append(
        $('<input>', {
          type: "text",
          value: 10
        }),
        ppButton
      )
    );
  };

  this.save = function() {
    localStorage['incidents'] = JSON.stringify(incidents);
    console.log('Saved', this, incidents.length);
  }

  this.addIcon = function() {
    console.log("addIcon", this.type, this.loc);
    latLng = new google.maps.LatLng(this.loc.d, this.loc.e);
    var newIcon = new google.maps.Marker({
      position: latLng,
      map: map,
      animation: google.maps.Animation.DROP,
      icon: icons[type].url,
      title: icons[type].title
    });

    //content for new icon
    google.maps.event.addListener(newIcon, 'click', function handleIconView() {
      info.setContent( tIncident.getVerbage()[0] );
      latLng = new google.maps.LatLng(tIncident.loc.d, tIncident.loc.e);
      info.setPosition( latLng );
      info.open(map);

      $('.verbage button').on('click', function() {
        if ($(this).hasClass('yes_btn')) {
          tIncident.addVote();
          $(this).parent().prev('span').text(function(i, t) {
            return parseInt(t, 10) + 1;
          });
          info.setContent(tIncident.getDonate()[0]);
        } else {
          info.close();
        }
      });
    });
    tIncident.save();
  }

  this.addIcon();

  return this;
}