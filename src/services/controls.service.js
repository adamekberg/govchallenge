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
    dep: "showBikeTraffic",
    indent: true
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
    dep: "showCarTraffic",
    indent: true
  },
  {
    label: "Electric Vehicle Charging Stations",
    ref: "evChargingCheck",
    key: "showEvCharging"
  },
  {
    label: "Public transit",
    ref: "publicTransitCheck",
    key: "showPublicTransit",
    isMaster: true
  },
  {
    label: "Bus Stops",
    ref: "busStopCheck",
    key: "showBusStops",
    masterKey: "showPublicTransit",
    indent: true
  },
  {
    label: "Metro Stations",
    ref: "metroStopCheck",
    key: "showMetroStops",
    masterKey: "showPublicTransit",
    indent: true
  },
  {
    label: "Railway Stations",
    ref: "railStopCheck",
    key: "showRailStops",
    masterKey: "showPublicTransit",
    indent: true
  },
  {
    label: "Ferry Stops",
    ref: "shipStopCheck",
    key: "showShipStops",
    masterKey: "showPublicTransit",
    indent: true
  },
  {
    label: "Tram Stations",
    ref: "tramStopCheck",
    key: "showTramStops",
    masterKey: "showPublicTransit",
    indent: true
  },
  {
    label: "Car Ferry Stops",
    ref: "ferryStopCheck",
    key: "showFerryStops",
    masterKey: "showPublicTransit",
    indent: true
  }
];
