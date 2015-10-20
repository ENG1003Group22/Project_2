//variables Common to all functions
var isTracking = false; //The Website will start tracking the user
var route = [];
var allowedAccuracy = 0;
var simplifiedDistance = 25;
var map, path, markers = [],
    paths = []; //The map from Google Maps API  
var trackID, name;

function trackLocation() {
    if (navigator.geolocation) {
        var positionOptions = {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        };

        trackID = navigator.geolocation.watchPosition(showCurrentLocation, errorHandler, positionOptions);
    }

    function errorHandler(error) {
        if (error.code == 0) {
            console.log("Tacking - Unknown error")
        }
        if (error.code == 1) {
            console.log("Tacking - Access denied by user")
        }
        if (error.code == 2) {
            console.log("Tacking - Position unavailable")
        }
        if (error.code == 3) {
            console.log("Tacking - Timed out")
        }
    }

    function showCurrentLocation(position) {
        var currentLoc;

        currentLoc = {
            lat: Number(position.coords.latitude),
            lng: Number(position.coords.longitude),
            acc: Number(position.coords.accuracy),
            time: time()
        };

        //breaks function if the accuracy of the position is too low
        if (currentLoc.acc >= 50) {
            return
        }

        document.getElementById("outputArea").innerHTML = "</br>Lat: " + currentLoc.lat + "</br>Lng: " + currentLoc.lng + "</br>Acc: " + currentLoc.acc;
        route.push(currentLoc);
        displayPath(route);

        function time() {
            var d = new Date();
            var n = d.getTime();
            return n
        };

    };
} // END trackLocation

function trackingToggle() {
    var tracking;

    if (isTracking === true) {
        //clearInterval(tracking); // Stops the time interval from repeating the Tracking Function
        navigator.geolocation.clearWatch(trackID);
        isTracking = false;
        document.getElementById("SSButton").innerHTML = "START";
        document.getElementById("SSButton").style.background = "rgb(76, 175, 80)"
            //saveToMemory(route); //Saves to memory for use in the "history" tab
        endMarker(route) // Plots the endpoint on the map
        console.log("Tracking-Off")
    } else {
        isTracking = true;
        //trackingLocation(route, timeInterval); //Starting tracking the position at the timeInterval
        trackLocation()
        document.getElementById("SSButton").innerHTML = "STOP";
        document.getElementById("SSButton").style.background = "rgb(244, 67, 54)";
        console.log("Tracking-On")
    }

} //END trackingToggle

function displayPath(route) {
    var coords, view, startPoint;

    //Puts a marker at the start point
    startPoint = new google.maps.Marker({
        position: route[0],
        icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
        map: map
    });
    //Pushes startPoint into an array so it can be deleted
    markers.push(startPoint);


    // makes a latlng that google needs
    view = new google.maps.LatLng(route[route.length - 1].lat, route[route.length - 1].lng)
        //pans to new point
    map.panTo(view);

    //plots the updated path
    coords = route.slice()
    coords.splice(coords.length, 0, coords[coords.length - 1])

    path = new google.maps.Polyline({
        path: coords,
        strokeColor: '#FF0000',
        strokeOpacity: 5.0,
        strokeWeight: 5,
        fillColor: '#FF0000',
        fillOpacity: 1
    });

    //Push path into array so that it can be deleted
    paths.push(path);

    //Display path
    path.setMap(map);

} //END displayPath

function endMarker(route) {
    var endPoint;

    endPoint = new google.maps.Marker({
        position: route[route.length - 1],
        map: map
    })
    markers.push(endPoint);

} //END endMarker

function clearMap() {
    console.log("Cleared Map");

    //Clears markers
    setMapOnAll(markers, null);
    markers = [];

    //Clear Polyline
    path.setMap(null);
    setMapOnAll(paths, null)
    paths = [];

    route = [];

    function setMapOnAll(array, gmap) {
        for (i in array) {
            array[i].setMap(gmap);
        }
    }
} //END clearMap()

function totalDistance(route) {
    var distance = 0;

    for (i = 0; i <= (route.length - 2); i++) {
        distance = distance + distance2Points(route[i], route[i + 1]);
    }

    return distance; //in meters

    function distance2Points(start, end) {
        var t1, n1, t2, n2, lat1, lon1, lat2, lon2, dlat, dlon, a, c, dk, m;
        var Rk = 6373;

        // get values for lat1, lon1, lat2, and lon2
        t1 = start.lat;
        n1 = start.lng;
        t2 = end.lat;
        n2 = end.lng;

        // convert coordinates to radians
        lat1 = deg2rad(t1);
        lon1 = deg2rad(n1);
        lat2 = deg2rad(t2);
        lon2 = deg2rad(n2);

        // find the differences between the coordinates
        dlat = lat2 - lat1;
        dlon = lon2 - lon1;

        // here's the heavy lifting
        a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);
        c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); // great circle distance in radians
        dk = c * Rk; // great circle distance in km

        // convert to meters

        m = dk * 1000;

        // return result in meters

        return m;
    }


    // convert degrees to radians
    function deg2rad(deg) {
        rad = deg * Math.PI / 180; // radians = degrees * pi/180
        return rad;
    }


}


function duration(route) {
    var time;

    time = (route[route.length - 1]).time - route[0].time; // In Millerseconds
    time = time * 0.001;

    return time; //in seconds                  
}

function averageSpeed(time, distance) {
    var speed;

    speed = distance / time; // should be in meters/second

    speed = speed * 3.6; // In Km/h

    return speed;

}

function caloriesBurnt(duration) {
    var m = 75; //average weight = ~75kg
    var calBurn;

    duration = duration / 60; //to convert to minutes

    calBurn = m * duration * 0.12; //Coefficient to convert to Calories Aparently

    return calBurn;
}


function saveToMemory() {
    var name, inputSave, outputSave, store;
    var distance, time, speed, burnt;

    inputSave = document.getElementById("input1").value;
    outputSave = document.getElementById("outputSave").innerHTML;

    // check for a route then save it to LocalStorage using JSON.stringify
    if (route.length === 0) {
        outputSave = "There is no Route to Save!";
        alert("There is no Route to Save")
        return;
    }

    //Check if the route is ongoing
    if (isTracking == true) {
        outputSave = "Please stop tracking before Saving";
        return;
    }

    //Check That a name for the Route has been Entered
    if (inputSave == "") {
        outputSave = "Please enter a Name";
        alert("Please Enter a Name")
        return;
    } else {
        name = inputSave;
        console.log(name);
    }

    //Values added to the stored Route to be displayed\

    distance = totalDistance(route).toFixed(4);
    time = duration(route).toFixed(4);
    time = (time / 60); //convert to minutes
    speed = averageSpeed(time, distance).toFixed(4);
    burnt = caloriesBurnt(time).toFixed(4);

    //the object to be stored
    store = {
        name: name,
        distance: distance,
        duration: time,
        speed: speed,
        burnt: burnt,
        route: route
    };

    console.log(store)


    //Storing the object
    localStorage.setItem(name, JSON.stringify(store));

    //reset route
    route = [];

    document.getElementById("outputSave").innerHTML = "Save Successful!"

}

function initMap() {

    //Actual Map -- https://developers.google.com/maps/documentation/javascript/
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -37.8749147,
            lng: 145.0468735
        },
        zoom: 17
    });

} //END INITMAP