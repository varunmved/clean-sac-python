$(document).ready(function() {

  //initMap() -> fetchListandCreateHeatMap -> heatmap
  initMap();
  console.log("map created")

  $("#slideupBtn").on("click", function() {
    $("#filters").toggleClass("open");
  });

  $("#togglebtn").on("click", function() {
    $("#dropdown").toggleClass("open");
  });

  // Initialize Filters
  $("#filtersList").html(createFilterListItems(state.filters));


  var $filter, filterIndex, tmpState, updatedFilters;

  $("#filtersList").on("click", "li", function() {
    //tmpState = _.cloneDeep(state);
    $filter = $(this);
    filterIndex = _.findIndex( state.filters, [ 'name', $filter.text() ] );

    //Flip clicked filter
    console.log($filter + filterIndex)
    state.filters[filterIndex].checked = !state.filters[filterIndex].checked;
    state.filterStatus = true;

    //state = tmpState
    logCurrentState();
    renderFilters();
    updateHeatmap();

  });
  //createFilterEventListeners(filters);

  

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
state.filterStatus = false;
state.loaded = false;
logCurrentState();

// --- Functions ---

var map, heatmap, reportsJson;

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
      console.log("creating heatmap")
      reportsJson = json;
      var googlePoints = processDataPoints(reportsJson);
      heatmap = new google.maps.visualization.HeatmapLayer({
        data: googlePoints,
        map: map,
        radius: 20
      });
      state.loaded = true;
      console.log("heatmap loaded to map")
      
    })
}

function processDataPoints(data) {

  // Has a filter been flipped?

  var toggledFilters = getToggledFilters();
  console.log(toggledFilters)

  if (!toggledFilters.length) {

    state.filterStatus = false;

    var processedData = data.map(function(point) {
      return new google.maps.LatLng(point.LAT, point.LON);
    });

  }else{
    state.filterStatus = true;

    var processedData = data.filter(function(data) {
      return _.includes(toggledFilters, data.TYPE)
    })
    .map(function(point) {
      return new google.maps.LatLng(point.LAT, point.LON);
    });

  }

  return processedData;
}

function createFilterListItems() {

  var filterHTML = state.filters.map(function(filter) {
    return `<li class="${filter.checked? "filter checked" : "filter"}" id="${_.lowerCase(filter.name)}Filter">${filter.name}</li>`
  })
  .join('')

  return filterHTML;
}

function renderFilters() {
  $("#filtersList").html(createFilterListItems());  
}

function getToggledFilters() {
  return state.filters.filter(function(filter) {
    return filter.checked
  })
  .map(function(filter){
    return filter.name;
  });
}

function updateHeatmap() {
  var googlePoints = processDataPoints(reportsJson);
  heatmap = new google.maps.visualization.HeatmapLayer({
    data: googlePoints,
    setMap: map,
    radius: 20
  });
  console.log("heatmap updated")
}

function logCurrentState() {
  console.log("--- Current State: ---")
  console.log(state);
}