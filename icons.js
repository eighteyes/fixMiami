
var iconNames = [ 'crime', 'dirty', 'drunk', 'flooding', 'potholes', 'sewer', 'smelly', 'streetlight', 'traffic', 'trafficlight', 'transportation', 'trash', 'violence', 'beach', 'homeless', 'palmtree', 'park', 'building' ];

var icons = {
  beach : {
    title: 'Beach Cleanup', verbage: 'Help Clean The Beaches', donate: 'Swim safely, donate to Friends of the Beach'
  },
  building : {
    title: 'Build Something', verbage: 'This space is empty and needs something', donate: 'Fill this space, hire your friendly (web) developer'
  },
  crime : {
    title: 'Shady Characters', verbage: "This place is dangerous", donate: 'Goes to Police to increase patrols'
  },
  dirty : {
    title: 'Litter Everywhere', verbage: 'Garbage is ruining this space', donate: 'Goes to Friends of the Street'
  },
  drunk : {
    title: 'Drunkards', verbage: 'People are yelling and peeing here regularly', donate: 'Goes to the police to increase patrols'
  },
  flooding : {
    title: 'Flooding', verbage: 'High water levels are often here', donate: 'Goes to City Sanitation to fix the problem'
  },
  homeless : {
    title: 'Homeless Presence', verbage: 'Homeless people are residing here.', donate: 'Goes to Shelter programs'
  },
  palmtree : {
    title: 'Needs some Trees', verbage: 'Not enough shade here.', donate: 'Goes to Plant a Tree Foundation'
  },
  park : {
    title: 'Add A Park', verbage: 'This space would be improved with a park or other public space', donate: 'Goes to Friends of Parks'
  },
  potholes : {
    title: 'Fix A Pothole', verbage: 'This pothole could become a sinkhole if not fixed', donate: 'Fixing this pothole is cheaper then a new suspension'
  },
  sewer : {
    title: 'Raw Sewage', verbage: 'Raw Sewage is going everywhere', donate: 'Goes to City Sanitation'
  },
  smelly : {
    title: 'Stinky', verbage: 'It smells really bad here', donate: 'Goes to plant nice flowers'
  },
  streetlight : {
    title: 'Add/Fix Streetlight', verbage: "It's really dark here", donate: 'Goes to friends of streetlights'
  },
  traffic : {
    title: 'Congestion', verbage: 'Too many cars!', donate: 'Civil engineers will be hired'
  },
  trafficlight : {
    title: 'Add/Fix Traffic Light', verbage: 'This traffic light is broken or needs to be adjusted', donate: 'Get to work faster'
  },
  transportation : {
    title: 'Add A Bus Stop', verbage: 'This space needs a bus stop to serve residents and business', donate: 'Incentivize the city to add a bus stop.'
  },
  violence : {
    title: 'Dangerous', verbage: 'This is not a safe place', donate: 'Give to local police to increase patrols here'
  }
};

for ( i in iconNames ){
  icons[iconNames[i]].url = 'images/' + iconNames[i] + '.png',
  icons[iconNames[i]].value = iconNames[i];
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
