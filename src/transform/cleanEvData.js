var fs = require("fs");
var evSpots = require("../data/ev_charging_big.json");

var result = [];

for (i = 0; i < evSpots.length; i++) {
  var coordsObj = new Object();
  coordsObj.lat = evSpots[i].AddressInfo.Latitude;
  coordsObj.long = evSpots[i].AddressInfo.Longitude;
  coordsObj.message = "Charging spots: " + evSpots[i].NumberOfPoints;
  result.push(coordsObj);
}

fs.writeFileSync(
  "../data/ev_charging_final.json",
  JSON.stringify(result, null, 4)
);

// Manually removed since its in norway
// "Latitude": 71.107949
// "Longitude": 25.8121315999999
