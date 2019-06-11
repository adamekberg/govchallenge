import {
  GeoJsonLayer
} from "deck.gl";

import carFerryStopData from "../data/ferry_berths_points.json";

import { MAP_COLORS } from '../constants'

const carFerryStopLayer = (show = true) => {
  return new GeoJsonLayer({
    id: "ferry-berths-layer",
    data: carFerryStopData,
    pickable: true,
    stroked: false,
    filled: true,
    // extruded: true,
    // lineWidthScale: 20,
    // lineWidthMinPixels: 2,
    getFillColor: [...MAP_COLORS[0], 200],
    // getLineColor: [255, 120, 255, 200],
    getRadius: 40,
    // getLineWidth: 1,
    getElevation: 0,
    visible: show
  });
};

export default carFerryStopLayer;
