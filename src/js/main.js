window.onload = function() {

	var center,
			pos,
			lat, 
			lng,
			latlng;

	//var map = L.map('map').setView([38.5, -121.4], 8);
	var map = L.map('map').setView([38.5, -121.4]);
	var locationMarker = L.marker([38.5, -121.4]).addTo(map);


	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	    attribution: 'Map data',
	    //maxZoom: 10,
	    accessToken: 'pk.eyJ1IjoiZGF2aWRqdWRpbGxhIiwiYSI6ImNpbXNuMjMwMTAxb2d1cmtrZ3N3bmduamkifQ.as1RkuLlTRWvMsFicckmYw',
	    id: 'mapbox.streets'
	}).addTo(map);

	map.locate({ setView: true, maxZoom: 12 });

	function setFormMarkerLatLng() {
		pos = locationMarker.getLatLng();
		lat = pos.lat.toFixed(2);
		lng = pos.lng.toFixed(2);
		console.log(pos);
		latlng = `${lat}, ${lng}`;


		$(".trashForm .form_latlong").text(latlng);
	}

	map.on('locationfound', onLocationFound);

	function onLocationFound(e) {
		

		console.log("FOUND YOU");

		locationMarker.setLatLng(e.latlng);
	    
	    map.on('move', function() {
			locationMarker.setLatLng(map.getCenter());

			// $(".app__navbar").hide();
			// $("#slideup").hide();

		})

		map.on('dragend', function() {
			center = map.getCenter();
			setFormMarkerLatLng();

			

			// $(".app__navbar").show();
			// $("#slideup").show();

		})

	};

	$("#slideupBtn").on("click", function() {
		setFormMarkerLatLng()
		$("#trashReport").toggleClass("open");
	});

	$("#togglebtn").on("click", function() {
		$("#dropdown").toggleClass("open");
	});

	$("#submitBtn").on("click", function(e) {
		e.preventDefault();
	});

	$("#cancelBtn").on("click", function() {
		$("#trashReport").toggleClass("open");
	});



	

	
}
