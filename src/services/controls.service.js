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
    ptMaster: true
  },
  {
    label: "Bus Stops",
    ref: "busStopCheck",
    key: "showBusStops",
    ptSub: true,
    indent: true
  },
  {
    label: "Metro Stations",
    ref: "metroStopCheck",
    key: "showMetroStops",
    ptSub: true,
    indent: true
  },
  {
    label: "Railway Stations",
    ref: "railStopCheck",
    key: "showRailStops",
    ptSub: true,
    indent: true
  },
  {
    label: "Ferry Stops",
    ref: "shipStopCheck",
    key: "showShipStops",
    ptSub: true,
    indent: true
  },
  {
    label: "Tram Stations",
    ref: "tramStopCheck",
    key: "showTramStops",
    ptSub: true,
    indent: true
  },
  {
    label: "Car Ferry Stops",
    ref: "ferryStopCheck",
    key: "showFerryStops",
    ptSub: true,
    indent: true
  }
];
