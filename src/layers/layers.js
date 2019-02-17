import { GeoJsonLayer, HexagonLayer } from 'deck.gl';

import parkingData from '../data/Stockholm_Parking.json';
import busStopData from '../data/bus_stops_geo.json';
import cycleTrafficData from '../data/cleaned_cycle_data.json';
import carTrafficData from '../data/cars_traffic_flow_coords.json';

const colorRange = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78]
];

const LIGHT_SETTINGS = {
  lightsPosition: [16.56, 57.83, 8000, 19.56, 60.83, 8000],
  ambientRatio: 0.4,
  diffuseRatio: 0.6,
  specularRatio: 0.2,
  lightsStrength: [0.8, 0.0, 0.8, 0.0],
  numberOfLights: 2
};

const parkingLayer = (show=true) => {
  return new GeoJsonLayer({
    id: 'parking-layer',
    data: parkingData,
    pickable: true,
    stroked: true,
    filled: true,
    extruded: true,
    lineWidthScale: 20,
    lineWidthMinPixels: 2,
    getFillColor: [160, 160, 180, 200],
    getLineColor: [160, 160, 180, 200],
    getRadius: 100,
    getLineWidth: 1,
    getElevation: 0,
    visible: show,
    // visible: this.state.showParking,
    // onHover: ({object, x, y}) => {
    //console.log('h', object)
    //   const tooltip = object.properties.name || object.properties.station;
    //    Update tooltip
    //      http://deck.gl/#/documentation/developer-guide/adding-interactivity?section=example-display-a-tooltip-for-hovered-object

    // }
  })
}

const busStopLayer = (show=true) => {

  return new GeoJsonLayer({
    id: 'bus-stop-layer',
    data: busStopData,
    pickable: true,
    stroked: true,
    filled: true,
    extruded: true,
    lineWidthScale: 20,
    lineWidthMinPixels: 2,
    getFillColor: [300, 160, 180, 200],
    getLineColor: [300, 160, 180, 200],
    getRadius: 10,
    getLineWidth: 1,
    getElevation: 0,
    visible: show,
    // visible: this.state.showBusStops,
    // onHover: ({object, x, y}) => {
    //console.log('h', object)
    //   const tooltip = object.properties.name || object.properties.station;
    //    Update tooltip
    //      http://deck.gl/#/documentation/developer-guide/adding-interactivity?section=example-display-a-tooltip-for-hovered-object

    // }
  })
}

const cycleTrafficLayer = (show=true) => {

  function getColorValue(points) {
    return points.reduce((a,c) => a + c.value, 0)
  }

  return new HexagonLayer({
    id: 'hexagon-layer',
    data: cycleTrafficData,
    pickable: true,
    extruded: true,
    radius: 20,
    elevationScale: 1,
    colorRange,
    getPosition: d => {
      return [ +d.long, +d.lat ]
    },
    getColorValue,
    getElevationValue: getColorValue,
    visible: true,
    lightSettings: LIGHT_SETTINGS,
    opacity:1,
    visible: show,
    // onHover: ({object, x, y}) => {
      // const tooltip = `${object.centroid.join(', ')}\nCount: ${object.points.length}`;
      /* Update tooltip
         http://deck.gl/#/documentation/developer-guide/adding-interactivity?section=example-display-a-tooltip-for-hovered-object
      */
    // }
  })
}

const carTrafficLayer = (show=true) => {

  /*function getColorValue(points) {
    return points.reduce((a,c) => a + c.value, 0)
  }*/
  
    return new HexagonLayer({
      id: 'car-traffic-layer',
      data: carTrafficData,
      pickable: true,
      extruded: true,
      radius: 20,
      elevationScale: 1,
      colorRange,
      getPosition: d => {
        return [ +d.long, +d.lat ]
      },
      //getColorValue,
      //getElevationValue: getColorValue,
      visible: true,
      lightSettings: LIGHT_SETTINGS,
      opacity:1,
      visible: show,
      // onHover: ({object, x, y}) => {
        // const tooltip = `${object.centroid.join(', ')}\nCount: ${object.points.length}`;
        /* Update tooltip
           http://deck.gl/#/documentation/developer-guide/adding-interactivity?section=example-display-a-tooltip-for-hovered-object
        */
      // }
    })
  }

const buildingsLayer = () => {

  return {
    'id': '3d-buildings',
    'source': 'composite',
    'source-layer': 'building',
    'filter': ['==', 'extrude', 'true'],
    'type': 'fill-extrusion',
    'minzoom': 15,
    'paint': {
      'fill-extrusion-color': '#aaa',
      // use an 'interpolate' expression to add a smooth transition effect to the
      // buildings as the user zooms in
      'fill-extrusion-height': [
        "interpolate", ["linear"], ["zoom"],
        15, 0,
        15.05, ["get", "height"]
        ],
        'fill-extrusion-base': [
        "interpolate", ["linear"], ["zoom"],
        15, 0,
        15.05, ["get", "min_height"]
        ],
        'fill-extrusion-opacity': .6
    }
  }
}

export {
  parkingLayer,
  busStopLayer,
  cycleTrafficLayer,
  carTrafficLayer,
  buildingsLayer,
}
