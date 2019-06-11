import {
  GeoJsonLayer
} from "deck.gl";

import busStopData from "../data/bus_stops_geo.json";

const busStopLayer = (show = true) => {
  return new GeoJsonLayer({
    id: "bus-stop-layer",
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
