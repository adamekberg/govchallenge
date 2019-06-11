export default [
  {
    label: "Parking",
    ref: "parkingCheck",
    key: "showParking"
  },
  {
    label: "Bicycle Traffic",
    ref: "bikeTrafficCheck",
    key: "showBikeTraffic"
  },
  {
    label: "3D Bicycle Traffic",
    ref: "bikeExtrudeCheck",
    key: "extrudeBikeTraffic",
    animate: true,
    heightKey: "_bikeTrafficHeight",
    dep: "showBikeTraffic"
  },
  {
    label: "Vehicle Traffic",
    ref: "carTrafficCheck",
    key: "showCarTraffic"
  },
  {
    label: "3D Vehicle Traffic",
    ref: "carTrafficCheck",
    key: "extrudeCarTraffic",
    heightKey: "_carTrafficHeight",
    animate: true,
    dep: "showCarTraffic"
  },
  {
    label: "Electric Vehicle Charging Stations",
    ref: "evChargingCheck",
    key: "showEvCharging"
  },
  {
    label: "Bus Stops",
    ref: "busStopCheck",
    key: "showBusStops"
  },
  {
    label: "Metro Stations",
    ref: "metroStopCheck",
    key: "showMetroStops"
  },
  {
    label: "Railway Stations",
    ref: "railStopCheck",
    key: "showRailStops"
  },
  {
    label: "Ferry Stops",
    ref: "shipStopCheck",
    key: "showShipStops"
  },
  {
    label: "Tram Stations",
    ref: "tramStopCheck",
    key: "showTramStops"
  },
  {
    label: "Car Ferry Stops",
    ref: "ferryStopCheck",
    key: "showFerryStops"
  }
];
