import {
  GeoJsonLayer
} from "deck.gl";

import carFerryStopData from "../data/ferry_berths_points.json";

const carFerryStopLayer = (show = true) => {
  return new GeoJsonLayer({
    id: "ferry-berths-layer",
    data: carFerryStopData,
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

export default carFerryStopLayer;
