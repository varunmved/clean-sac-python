
$(document).ready(function() {

  initMap();

})

var map, heatmap;

var dummyData = getPoints();
var dummyData = processDataPoints(dummyData);


function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: {lat: 38.5, lng: -121.4},
    mapTypeId: google.maps.MapTypeId.SATELLITE
  });

  heatmap = new google.maps.visualization.HeatmapLayer({
    data: dummyData,
    map: map
  });
}

function changeRadius() {
 	heatmap.set('radius', heatmap.get('radius') ? null : 20);
}


// Heatmap data: 500 Points

function getTxtPoints() {
  if (self.fetch) {
    fetch('fix_random.txt')
      .then(function(res) {
        console.log(res.text());
      })
      .then(function(text) {
        console.log(text);
      })    
  }
}
function getPoints() {
	var data = [];
	var lat, lng;
	var latMin, latMax, lngMin, lngMax;

	latMin = 38.505594403008494;
	latMax = 38.509624285022596;
	lngMin = -121.43102645874022;
	lngMax = -121.43754959106444;

	for(var i = 0; i < 100; i++) {

		lat = Math.random()* (latMax - latMin) + latMin;
		lng = Math.random()* (lngMax - lngMin) + lngMin;

		data.push({
			"lat": lat,
			"lng": lng
		})
	}
	return data;
}

function processDataPoints(d) {
  var processedData = d.map(function(point) {
    return new google.maps.LatLng(point.lat, point.lng);
  });

  return processedData;
}