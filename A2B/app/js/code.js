//variables Common to all functions
var isTracking = false; //The Website will start tracking the user
var route = [];
var timeInterval = 1; //seconds
var allowedAccuracy = 0;
var simplifiedDistance = 25;
var map; //The map from Google Maps API

var button;


function initMap() {
    var currentPosition;
    
            //Coords of Current Position
            currentPosition = getLocation()
    
            //Actual Map -- https://developers.google.com/maps/documentation/javascript/
            map = new google.maps.Map(document.getElementById('map'), {
                center: {
                    lat: -37.8749147,
                    lng: 145.0468735
                },
                zoom: 17
            });
            
            //var abc = document.getElementById('abc');
            //abc.className = "abc"
        } //END INITMAP



 function trackingToggle(){
     var tracking;
     
        if(isTracking === true){
            clearInterval(tracking); // Stops the time interval from repeating the Tracking Function
            isTracking = false;
            button1.innerHTML = "Start";
            saveToMemory(route); //Saves to memory for use in the "history" tab
            route = []; // Clears the route so that anothing route can be recorded
		}
        else{
            isTracking = true;
            trackingLocation(route, timeInterval); //Starting tracking the position at the timeInterval
            button1.innerHTML = "Stop";
        }
    
function trackingLocation(route, timeInterval){
    var timeIntervalMS;
    
            //convert timeInterval to milaseconds
            timeIntervalMS = timeInterval*1000;
    
            //Add a coord to Route and display every <time interval>
            tracking = setInterval(addLocAndUpdate(route),timeInterval);
            
        }//END trackingLocation
     
     } //FUNCTION trackingToggle
            
function addLocAndUpdate(route){
    var position;    
    
        //find current Coordinates
    position = getLocation();    
    
        //add it to variable route
    route.splice(route.length, 0, position)
    
    //display updated route
    displaypath(route)
}// END addLocAndUpdate        
    
    function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition)} 
    else {
        coordsdisp.innerHTML = "Geolocation is not supported by this browser.";
    }

    
function showPosition(position) {
    var lat, lng, returnObject;
    
    lat = position.coords.latitude;
    lng = position.coords.longitude;
    
    returnObject = {lat: lat, lng: lng};
    
    return returnObject;

}}//END getLocation
    
    function displayPath(route){
    var path, coords, startPoint;
    
    startpoint = new google.maps.Marker({
                position: route[0],
                map: map,
                title: array[0].title
            });
    
    coords = route.slice()
    coords.splice(coords.length,0, coords[coords.length - 1])
    
    path = new google.maps.Polyline({
                path: coords,
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 5.0,
                strokeWeight: 5,
                fillColor:'#FF0000',
                fillOpacity:1
            });

            path.setMap(map);

}//END displayPath
    




            
function totalDistance(){
    var distance;
    
    
     return distance;
    
    function distance2Points(start, end){
    var R = 6371000, a, b, c, distance, lat1, lat2, lng1, lng2; // metres
    
    lat1 = start.lat; lng1 = start.lat;
    lat2 = end.lat; lng2 = end.lng;
    
var φ1 = lat1.toRadians();
var φ2 = lat2.toRadians();
var Δφ = (lat2-lat1).toRadians();
var Δλ = (lng2-lng1).toRadians();

    a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ/2) * Math.sin(Δλ/2);
 c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

 distance = R * c;
    }
}

function averageSpeed(){
    
}

function duration(){
    
}

function saveToMemory(){
    
}


    
