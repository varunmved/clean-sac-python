
$(document).ready(function() {
  
  var map, heatmap;

  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: {lat: 38.5, lng: -121.4},
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    fetchListandCreateHeatMap(map);  
  }

  initMap();
  console.log("map created" + map)
  

})


function changeRadius() {
 	heatmap.set('radius', heatmap.get('radius') ? null : 20);
}


function fetchListandCreateHeatMap(map) {
  //var url = "http://159.203.247.240:8080/list.json"
  var url = "data.json"

  //{    mode: 'no-cors'  })
  console.log("STARTING FETCH")
  fetch(url)
    .then(function(res) {
      return res.json()
    })
    .then(function(json) {
      console.log(json);
      console.log("creating heatmap")
      var googlePoints = processDataPoints(json);
      console.log(googlePoints);
      heatmap = new google.maps.visualization.HeatmapLayer({
        data: googlePoints,
        map: map,
        radius: 20
      });
      console.log("heatmap created")
      
    })
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
    return new google.maps.LatLng(point.LAT, point.LON);
  });

  return processedData;
}