var fs = require('fs');
var flow = require('./data/cars_traffic_flow.json');
var axios = require('axios');

var url1 = 'http://openstreetws.stockholm.se/LvWS-3.0/Lv.svc/json/TransformGeometry?apikey=e6281fb3-e6ba-4195-8014-590cac423d28&wkt=POINT%20(';
var url2 = ')&fromSrid=3011&toSrid=4326';


var features = flow.features;

for (var i = 0; i < 10; i++) {
    var feature = features[i];
    var coordinates = feature.geometry.coordinates;
    for (var j = 0; j < coordinates.length; j++) {
        var coordinateList = coordinates[j];
        for (var k = 0; k < coordinateList.length; k++) {
            var coords = coordinateList[k];
            var lng = coords[0];
            var lat = coords[1];
            var url3 = url1 + lng + ' ' + lat + url2;
            httpGet(url3);
        }
    }
  }

function httpGet(url) {
    axios.get(url)
    .then(function (response) {
      var formattedCoords = /\(([^)]+)\)/.exec(response.data)[1].split(' ');
      

      var coordsObj = new Object();
      coordsObj.long = formattedCoords[0];
      coordsObj.lat  = formattedCoords[1];
      var coordsAsJson = JSON.stringify(coordsObj);

      console.log(coordsAsJson);
      fs.appendFileSync('./data/cars_traffic_flow_coords.json', coordsAsJson + ",");
    })
    .catch(function (error) {
      console.log("ERROR");
      console.log(error);
    })
    .then(function () {
    });
  }


