$(document).ready(function() {

  initMap();
  console.log("map created")

  $("#slideupBtn").on("click", function() {
    $("#filters").toggleClass("open");
  });

  $("#togglebtn").on("click", function() {
    $("#dropdown").toggleClass("open");
  });

  $("#filtersList").html(createFilterList(filters));

  createFilterEventListeners(filters);
  

});

// --- App State --- 

var state = {};
state.filters = [
    "Graffiti",
    "Trees",
    "Illegal Dumping",
    "Pavement",
    "Traffic Sign Complaints",
    "Sweeper Request",
    "Stray Animals",
    "Abandoned Vehicles"
  ];
state.filters = state.filters.map(function(filter) {
    return {
      "name": filter,
      "checked": false
    }
  });
console.log(state);

// --- Functions ---

var map, heatmap;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: {lat: 38.5, lng: -121.4},
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    streetViewControl: true,
    zoomControl: true,
    zoomControlOptions: {
        position: google.maps.ControlPosition.LEFT_TOP
    },
    mapTypeControl: false,
  });

  fetchListandCreateHeatMap(map);  
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

function processDataPoints(d) {
  var processedData = d.map(function(point) {
    return new google.maps.LatLng(point.LAT, point.LON);
  });

  return processedData;
}


function createFilterEventListeners(filters) {
  var element, target, index;
  var newFilters = filters.map(function(filter) {
    element = document.getElementById(_.lowerCase(filter.name) + "Filter");
    element.addEventListener("click", function(e) {
      target = e.target.innerHTML.trim();
      if ( _.findIndex(filters, ['name', target]) ) {
        filter.checked = true;
        return filter;
      }
      return filter

      //_.assign(filters[index], {"checked": true} )
      

    });
  })

  return newFilters;
}

function createFilterList(filters) {

  var filterHTML = filters.map(function(filter) {
    return (
      `<li id="${_.lowerCase(filter.name)}Filter">
        ${filter.name} 
        ${filter.checked? '<i class="fa fa-check"></i>' : ''}

      </li>`
    )
  })
  .join('')

  return filterHTML;
}