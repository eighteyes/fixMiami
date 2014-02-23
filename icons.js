
var iconNames = [ 'crime', 'dirty', 'drunk', 'flooding', 'potholes', 'sewer', 'smelly', 'streetlight', 'traffic', 'trafficlight', 'transportation', 'trash', 'violence', 'beach', 'building', 'homeless', 'palmtree', 'park', 'party' ];

var icons = {};

for ( i in iconNames ){
  icons[iconNames[i]] = {
    url: 'images/' + iconNames[i] + '.png',
    value: iconNames[i],
    title: iconNames[i],
    verbage: 'test'
  }
}

function makeIconList() {
  var iconsHTML = $('<div>').addClass('iconList')
  for ( i in icons ){
    var icon = $('<span>').attr('data-type', icons[i].value)
    .append(
      $('<img>').attr('src', icons[i].url),
      icons[i].title
      );
    iconsHTML.append( icon );
  }
  return iconsHTML;
}
