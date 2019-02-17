import { GeoJsonLayer, HexagonLayer } from 'deck.gl';

import parkingData from '../data/Stockholm_Parking.json';
import busStopData from '../data/bus_stops_geo.json';
import cycleTrafficData from '../data/cycle_data_final.json';
import carTrafficData from '../data/cars_data_final.json';

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
    filled: false,
    extruded: true,
    lineWidthScale: 20,
    lineWidthMinPixels: 2,
    getFillColor: [200, 200, 255, 200],
    getLineColor: [200, 200, 255, 200],
    getRadius: 100,
    getLineWidth: 1,
    getElevation: 0,
    visible: show,
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
    // extruded: true,
    lineWidthScale: 20,
    lineWidthMinPixels: 2,
    getFillColor: [255, 120, 255, 200],
    getLineColor: [255, 120, 255, 200],
    getRadius: 10,
    getLineWidth: 1,
    getElevation: 0,
    visible: show,
    // onHover: ({object, x, y}) => {
    // //console.log('h', object)
    //   if(object) {
    //     const tooltip = `${object.properties.StopPointName}
    //       ${object.properties.StopPointNumber}`

    //     // this.props.onHover(tooltip)
    //   }
    // }
  })

}

const cycleTrafficLayer = (show=true, extruded=true) => {

  function getColorValue(points) {
    return points.reduce((a,c) => a + c.value, 0)
  }

  return new HexagonLayer({
    id: 'hexagon-layer',
    data: cycleTrafficData,
    pickable: true,
    extruded: extruded,
    radius: 20,
    elevationScale: 1,
    colorRange,
    getPosition: d => {
      return [ +d.long, +d.lat ]
    },
    getColorValue,
    getElevationValue: getColorValue,
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

const carTrafficLayer = (show=true, extruded=true) => {

  function getColorValue(points) {
    return points.reduce((a,c) => a + +c.value, 0)
  }
  
    return new HexagonLayer({
      id: 'car-traffic-layer',
      data: carTrafficData,
      pickable: true,
      extruded: extruded,
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
      visible: show
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
  carTrafficLayer
}
