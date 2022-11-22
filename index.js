var map = L.map('map').setView([53, 15], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let buttonGetLocation = document.getElementById("getLocation");
buttonGetLocation.addEventListener('click', clickButtonGetLocation);

let buttonGetRaster = document.getElementById("getRaster");
buttonGetRaster.addEventListener('click', function () {
    leafletImage(map, function (err, canvas) {
        // here we have the canvas
        let rasterMap = document.getElementById("mapToRaster");
        let rasterContext = rasterMap.getContext("2d");

        rasterMap.width = 600;
        rasterMap.height = 400;

        rasterContext.drawImage(canvas, 0, 0);
        alert("g");
    })
});

function clickButtonGetLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
}

function showPosition(position) {
    let userCoordLatitude = parseFloat(position.coords.latitude);
    let userCoordLongitude = parseFloat(position.coords.longitude);
    setMap(userCoordLatitude, userCoordLongitude);
    setDivUserLocation(userCoordLatitude, userCoordLongitude);
}

function setMap(coordLatitude, coordLongitude) {
    map.setView([coordLatitude, coordLongitude], 13, {animation: true});
}

function setDivUserLocation(coordLatitude, coordLongitude) {
    let divUserLocation = document.getElementById("userCoords");

    divUserLocation.removeAttribute('hidden');
    divUserLocation.innerText = 'You location: Latitude: ' + coordLatitude + ', Longitude: ' + coordLongitude;
}

// function clickButtonGetRaster() {
//     leafletImage(map, function(err, canvas) {
//         let canvasMapToRaster = document.getElementById('mapToRaster');
//         let rasterContext = canvasMapToRaster.getContext('2d');
//
//         rasterContext.drawImage(canvas, 0, 0, 300, 150);
//     });
//
// }