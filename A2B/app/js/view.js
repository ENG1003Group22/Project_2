//Download Data from Local Storage

var i = 0, dataPDO = [], Key,htmltable,rowChecked = null;

for (; Key = window.localStorage.key(i); i++) {
    dataPDO[i] = JSON.parse(localStorage.getItem(Key));
    console.log(dataPDO[i]);
}

tableBuilding(dataPDO)

$( "input" ).on( "click", function() {
  $( "#outputArea" ).html( "Row " + $( "input:checked" ).val() + " is checked" );
    
    rowChecked = $( "input:checked" ).val();
});

function tableBuilding(dataPDO){
    //output = document.getElementById("tableOutput").innerHTML;
    
    htmltable = "<thead><tr><th>Selected</th><th>Name</th><th>Distance (m)</th><th>Duration (Mins)</th><th>Speed (Km/h)</th><th>Calories Burnt</th></tr></thead><tbody>";
    
    if(dataPDO.length == 0){
        htmltable +="<tr><td>---</td><td>No Routes Stored</td><td>---</td><td>---</td><td>---</td><td>---</td></tr>";
    }
    else {
        
    for (i in dataPDO){
    htmltable +="<tr><td><input type='radio' name='radio' value='"+i+"'></td><td>"+dataPDO[i].name+"</td><td>"+dataPDO[i].distance+"</td><td>"+dataPDO[i].duration+ "</td><td>"+dataPDO[i].speed+"</td><td>"+dataPDO[i].burnt+"</td></tr>";
        
        }
    }
    
    htmltable += "</tbody>";
    
    document.getElementById('tableOutput').innerHTML = htmltable;
}

function deleteRow(){
    
    
    if (dataPDO.length == 0){
        $( "#outputArea" ).html("No Run to Delete");
    
    }
    else if (rowChecked == null){
        $( "#outputArea" ).html("No Run Selected");
    }
    else{
        
        $( "#outputArea" ).html(dataPDO[rowChecked].name + " Deleted From Storage");
        
        localStorage.removeItem(dataPDO[rowChecked].name);
        
        
    }
  
    
}

function displayRow(){
    
    var view, startPoint, endPoint, route;
    
    if (dataPDO.length == 0){
        $( "#outputArea" ).html("No Run to Display");
    
    }
    else if (rowChecked == null){
        $( "#outputArea" ).html("No Run Selected to Display");
    }
    else{
    route = dataPDO[rowChecked].route
    
        //Puts a marker at the start point
        startPoint = new google.maps.Marker({
                position: route[0],
                icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
                map: map
            });
        //Pushes startPoint into an array so it can be deleted
        //markers.push(startPoint);
    
    //Puts a marker at the start point
        endPoint = new google.maps.Marker({
                position: route[route.length - 1],
                map: map
            });
        //Pushes endPoint into an array so it can be deleted
        //markers.push(endPoint);
        
        // makes a latlng that google needs
        view = new google.maps.LatLng(route[route.length-1].lat,route[route.length-1].lng)
        //pans to new point
        map.panTo(view); 
    
    path = new google.maps.Polyline({
                path: route,
                strokeColor: '#FF0000',
                strokeOpacity: 5.0,
                strokeWeight: 5,
                fillColor:'#FF0000',
                fillOpacity:1
            });
            
        //Push path into array so that it can be deleted
        //paths.push(path);
        
        //Display path
        path.setMap(map);
        $( "#outputArea" ).html("Run " + dataPDO[rowChecked].name + " Displayed");
    }
    
}

function initMap() {            
    
            //Actual Map -- https://developers.google.com/maps/documentation/javascript/
            map = new google.maps.Map(document.getElementById('map'), {
                center: {
                    lat: -37.8749147,
                    lng: 145.0468735
                },
                zoom: 17
            })};