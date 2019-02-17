import { swedish_params, geodetic_to_grid, grid_to_geodetic } from 'CoordTransformations';
var fs = require('fs');
var flow = require('../data/cars_data_big.json');
var axios = require('axios');

var url1 = 'http://217.21.236.217/LvWS-3.0/Lv.svc/json/TransformGeometry?apikey=e6281fb3-e6ba-4195-8014-590cac423d28&wkt=POINT%20(';
var url2 = ')&fromSrid=3011&toSrid=4326';

var features = flow.features;
ct.swedish_params("sweref_99_1800");

for (var i = 0; i < features.length; i++) {
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

            var result = ct.grid_to_geodetic(lat,lng);
            var latGeodetic = result[0];
            var lngGeodetic = result[1];

            var coordsObj = new Object();
            coordsObj.long = lngGeodetic;
            coordsObj.lat  = latGeodetic;
            coordsObj.value = featureValue;
            var coordsAsJson = JSON.stringify(coordsObj);
            console.log(coordsAsJson);
            /*fs.appendFile('../data/cars_data_final.json', coordsAsJson + ",\n", function (err) {
              if (err) throw err;
            });*/
        }
    }
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
      fs.appendFile('../data/cars_data_big.json', coordsAsJson + ",\n", function (err) {
        if (err) throw err;
      });
      
    })
    .catch(function (error) {
      console.log("ERROR");
      console.log(error);
    })
    .then(function () {
    });
  }
