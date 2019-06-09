var fs = require("fs");
var evSpots = require("../data/ev_charging_big.json");

var result = [];

for (i = 0; i < evSpots.length; i++) {
  var coordsObj = new Object();
  coordsObj.lat = evSpots[i].AddressInfo.Latitude;
  coordsObj.long = evSpots[i].AddressInfo.Longitude;
  coordsObj.numberOfPoints = evSpots[i].NumberOfPoints;
  result.push(coordsObj);
}

fs.writeFileSync(
  "../data/ev_charging_final.json",
  JSON.stringify(result, null, 4)
);
