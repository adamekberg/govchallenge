import {
  GeoJsonLayer
} from "deck.gl";

import parkingData from "../data/Stockholm_Parking.json";

const parkingLayer = (show = true) => {
  return new GeoJsonLayer({
    id: "parking-layer",
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
    visible: show
    // onHover: ({object, x, y}) => {
    //console.log('h', object)
    //   const tooltip = object.properties.name || object.properties.station;
    //    Update tooltip
    //      http://deck.gl/#/documentation/developer-guide/adding-interactivity?section=example-display-a-tooltip-for-hovered-object

    // }
  });
};

export default parkingLayer
