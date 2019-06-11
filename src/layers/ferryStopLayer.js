import {
  GeoJsonLayer
} from "deck.gl";

import ferryStopData from "../data/ship_berths_points.json";

const ferryStopLayer = (show = true) => {
  return new GeoJsonLayer({
    id: "ship-berth-layer",
    data: ferryStopData,
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
  });
};

export default ferryStopLayer;
