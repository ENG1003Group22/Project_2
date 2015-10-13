//variables Common to all functions
var isTracking = false; //The Website will start tracking the user
var route = [];
var timeInterval = 1; //seconds
var allowedAccuracy = 0;
var simplifiedDistance = 25;
var map; //The map from Google Maps API

//var button1 = document.getElementById("SSButton").innerHTML;



//document.getElementById("outputArea").innerHTML = "jkgiklgiuyyg";

function addLocation(){
    if (navigator.geolocation)
    {   var positionOptions = {
            enableHighAccuracy: true,
            timeout: 10000, 
            maximumAge: 0}; 

    navigator.geolocation.getCurrentPosition(showCurrentLocation, errorHandler, positionOptions);
    }
    
    function errorHandler(error)
    {
        if(error.code == 0){
           console.log("Tacking - Unknown error")}
        if(error.code == 1){
           console.log("Tacking - Access denied by user")}
        if(error.code == 2){
           console.log("Tacking - Position unavailable")}
        if(error.code == 3){
           console.log("Tacking - Timed out")}
    }

    function showCurrentLocation(position)
    {   var currentLoc;
    
    currentLoc = {
    lat:Number(position.coords.latitude),
    lng:Number(position.coords.longitude),
    acc:Number(position.coords.accuracy),
    time:time()};
     
    document.getElementById("outputArea").innerHTML="Lat: "+currentLoc.lat+"</br>Lng: "+currentLoc.lng; 
     
    route.push(currentLoc)
    console.log(currentLoc);
    
     function time(){
         var d = new Date();
         var n = d.getTime();
         return n};
     
    }; 
}// END addLocation


function initMap() {
    var currentPosition;
    
            //Coords of Current Position
            
    
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
            document.getElementById("SSButton").innerHTML = "START";
            document.getElementById("SSButton").style.background = "rgb(76, 175, 80)"
            //saveToMemory(route); //Saves to memory for use in the "history" tab
            route = []; // Clears the route so that anothing route can be recorded
            console.log("Tracking-Off")
		}
        else{
            isTracking = true;
            trackingLocation(route, timeInterval); //Starting tracking the position at the timeInterval
            document.getElementById("SSButton").innerHTML = "STOP";
            document.getElementById("SSButton").style.background = "rgb(244, 67, 54)"
            console.log("Tracking-On")
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
    
        //Adds the new Location to Route and Displays current location on screen
    addLocation()   

    
    //display updated route
    displayPath(route)
    
}// END addLocAndUpdate        
    

    
    function displayPath(route){
    var path, coords, startPoint;
    
    startPoint = new google.maps.Marker({
                position: route[0],
                map: map,
                title: "Start Point"
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
    
var x1 = lat1.toRadians();
var x2 = lat2.toRadians();
var dx = (lat2-lat1).toRadians();
var dy = (lng2-lng1).toRadians();

    a = Math.sin(dx/2) * Math.sin(dx/2) + Math.cos(x1) * Math.cos(x2) * Math.sin(dy/2) * Math.sin(dy/2);
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


    
