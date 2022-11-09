var map = L.map('map').setView([47.25, -122.44], 11);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/navigation-day-v1',
    accessToken: 'pk.eyJ1Ijoic3FuZ3V5ZW4iLCJhIjoiY2w5eXd1YXc0MDk3MjNucDg2cDhyN3JrbyJ9.aMzoD2AZBPUtaVP2yV5N-A',
	}).addTo(map);

var control = L.Routing.control({
	waypoints: [
		null
		//L.latLng(47.246587, -122.438830),
		//L.latLng(47.258024, -122.444725),
		//L.latLng(47.318017, -122.542970)
	],
	routeWhileDragging: true,
	router: L.Routing.mapbox('pk.eyJ1Ijoic3FuZ3V5ZW4iLCJhIjoiY2w5eXd1YXc0MDk3MjNucDg2cDhyN3JrbyJ9.aMzoD2AZBPUtaVP2yV5N-A'),
			units:'imperial',
			collapsible: true,
			show: false,
			geocoder: L.Control.Geocoder.photon(),
	}).addTo(map);
		
function createButton(label, container) {
	var btn = L.DomUtil.create('button', '', container);
		btn.setAttribute('type', 'button');
		btn.innerHTML = label;
    return btn;
}

map.on('click', function(e) {
    var container = L.DomUtil.create('div'),
		startBtn = createButton('Start from this location', container),
		destBtn = createButton('Go to this location', container);

    L.popup()
        .setContent(container)
        .setLatLng(e.latlng)
        .openOn(map);  
		
	    L.DomEvent.on(startBtn, 'click', function() {
        control.spliceWaypoints(0, 1, e.latlng);
        map.closePopup();
    });
	    L.DomEvent.on(destBtn, 'click', function() {
        control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
        control.show();
        map.closePopup();
    });
 });
 
 var directions = [
	"Welcome to the map!\nTo get started, click on the map and add your first waypoint by selecting 'Start from this location'!\nSelect another location and click 'Go to this location' to create your second waypoint!!\nAdd additional waypoints by selecting the + in the top right routing box."
	];
	window.alert(directions);
	document.getElementById("demo").innerHTML = directions;
