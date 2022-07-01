/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.
 */
// Initialize and add the map
var geocoder;
let map;
let markers = [];
let markerCluster;
let coordinates = [];
let flightPath;
const imagePath = "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m";
let poly;
function initMap() {
  geocoder = new google.maps.Geocoder();
  const startingLocation = { lat: 19.380, lng: -72.296 };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: startingLocation,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.HYBRID]
    }, // here´s the array of controls
    mapTypeControl: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
  
   markerClusterer = new MarkerClusterer(map, markers, {imagePath: imagePath});

  const datapoints = [
    {lat: 19.380, lng: -72.296},
    {lat: 19.390, lng: -72.296},
    { lat: 37.772, lng: -122.214 },
    { lat: 37.772, lng: -122.214 },
    { lat: 21.291, lng: -157.821 },
    { lat: -18.142, lng: 178.431 },
    { lat: -27.467, lng: 153.027 },
  ];
  datapoints.forEach((point) => {
    addMarker(point);
  })
  
}

function addMarker(location) {
    
    var marker = new google.maps.Marker({
        position: location,
        title: "Hello",
        map: map
    });
    var infoWindow = new google.maps.InfoWindow({
      content: '<h2>In need of water</h2>'
    });
    marker.addListener('click', function(){
      infoWindow.open(map, marker);
    });
    markers.push(marker);
    //markerClusterer.setMap(null);
    markerClusterer.addMarkers(markers);
    coordinates.push(marker.position);
    flightPath = new google.maps.Polyline({
      path: coordinates,
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });
    flightPath.setMap(map);
  }

  function codeAddress() {
    var address = document.getElementById('pac-input').value;
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == 'OK') {
         addMarker(results[0].geometry.location);
      } else {
        alert("That is not a valid location");//alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  // function getLocation() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(showPosition);
  //   } else {
  //     alert("Geolocation is not supported by this browser.");
  //   }
  // }
  // function showPosition(position) {
  //   var lat = position.coords.latitude;
  //   var lng = position.coords.longitude;
  //   map.setCenter(new google.maps.LatLng(lat, lng));
  //   var marker = new google.maps.Marker({
  //       position: location,
  //       title: "Hello",
  //       map: map
  //   });
  //   var infoWindow = new google.maps.InfoWindow({
  //     content: '<h2>In need of water</h2>'
  //   });
  //   marker.addListener('click', function(){
  //     infoWindow.open(map, marker);
  //   });
  //   markers.unshift(marker);
  // }


var input = document.getElementById("pac-input");

input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    codeAddress();
  }
});


window.initMap = initMap;


//TODO

// load map with hard coded latitude and longitude of where the 
// water distributer is located



// when clicking a point on the map allow user to "request water" which creates a marker at that point

// when there is many markers in a close proximity, show them as a cluster. 

// create a route to deliver water to people in a region

//