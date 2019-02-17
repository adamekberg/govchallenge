var fs = require('fs');
var flow = require('./data/cars_traffic_flow.json');
var axios = require('axios');

var url1 = 'http://217.21.236.217/LvWS-3.0/Lv.svc/json/TransformGeometry?apikey=e6281fb3-e6ba-4195-8014-590cac423d28&wkt=POINT%20(';
var url2 = ')&fromSrid=3011&toSrid=4326';

var features = flow.features;
//16690
var start = 2100;
var stop = start + 200;
for (var i = start; i < stop; i++) {
    /*if (i % 500 === 0 ) {
      console.log("Index: " + i);
      console.log("500 features done, sleeping for 10 sec");
      sleep(10);
    }*/
    console.log("fetching feature: " + i);

    var feature = features[i];
    var featureValue = feature.properties.MAIN_ATTRIBUTE_VALUE;
    var coordinates = feature.geometry.coordinates;
    for (var j = 0; j < coordinates.length; j++) {
        var coordinateList = coordinates[j];
        for (var k = 0; k < coordinateList.length; k++) {
            var coords = coordinateList[k];
            var lng = coords[0];
            var lat = coords[1];
            var url3 = url1 + lng + ' ' + lat + url2;
            
            httpGet(url3, featureValue);
        }
    }
}

function sleep(seconds) {
  var e = new Date().getTime() + (seconds * 1000);
  while (new Date().getTime() <= e) {}
}

function httpGet(url, value) {
    axios.get(url)
    .then(function (response) {
      var formattedCoords = /\(([^)]+)\)/.exec(response.data)[1].split(' ');
      

      var coordsObj = new Object();
      coordsObj.long = formattedCoords[0];
      coordsObj.lat  = formattedCoords[1];
      coordsObj.value = value;
      var coordsAsJson = JSON.stringify(coordsObj);
      //console.log(coordsAsJson);
      /*fs.appendFile('./data/cars_traffic_flow_coords.json', coordsAsJson + ",\n", function (err) {
        if (err) throw err;
      });*/
      var stream = fs.createWriteStream('./data/cars_traffic_flow_coords.json', {flags:'a'});
      stream.write(coordsAsJson + ",\n");
      stream.end();
    })
    .catch(function (error) {
      console.log("ERROR");
      console.log(error);
    })
    .then(function () {
    });
  }


