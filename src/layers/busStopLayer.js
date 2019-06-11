import {
  GeoJsonLayer
} from "deck.gl";

import { MAP_COLORS } from '../constants'

import busStopData from "../data/bus_stops_geo.json";

const busStopLayer = (show = true) => {
  return new GeoJsonLayer({
    id: "bus-stop-layer",
    data: busStopData,
    pickable: true,
    stroked: false,
    filled: true,
    // extruded: true,
    // lineWidthScale: 20,
    // lineWidthMinPixels: 2,
    getFillColor: [...MAP_COLORS[1], 200],
    // getLineColor: [255, 120, 255, 200],
    getRadius: 20,
    getLineWidth: 1,
    getElevation: 0,
    visible: show
    // onHover: ({object, x, y}) => {
    // //console.log('h', object)
    //   if(object) {
    //     const tooltip = `${object.properties.StopPointName}
    //       ${object.properties.StopPointNumber}`

    //     // this.props.onHover(tooltip)
    //   }
    // }
  });
};

export default busStopLayer;
