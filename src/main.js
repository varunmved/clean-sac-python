window.onload = function() {

	//var map = L.map('map').setView([38.5, -121.4], 8);
	var map = L.map('map');

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	    //maxZoom: 10,
	    accessToken: 'pk.eyJ1IjoiZGF2aWRqdWRpbGxhIiwiYSI6ImNpbXNuMjMwMTAxb2d1cmtrZ3N3bmduamkifQ.as1RkuLlTRWvMsFicckmYw',
	    id: 'mapbox.streets'
	}).addTo(map);

	map.locate({ setView: true, maxZoom: 12 });
	map.on('locationfound', onLocationFound);

	function onLocationFound(e) {
		var center,
			pos,
			lat, 
			lng

	    var locationMarker = L.marker(e.latlng).addTo(map);

	    map.on('move', function() {
			locationMarker.setLatLng(map.getCenter());
		})

		map.on('dragend', function() {
			center = map.getCenter();
			pos = locationMarker.getLatLng();
			lat = pos.lat;
			lng = pos.lng;
			console.log(pos);
		})
	}
	
}
