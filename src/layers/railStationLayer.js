import {
  GeoJsonLayer
} from "deck.gl";

import railStationData from "../data/rail_stations_points.json";
import { MAP_COLORS } from '../constants';

const railStationLayer = (show = true) => {
  return new GeoJsonLayer({
    id: "rail-station-layer",
    data: railStationData,
    pickable: true,
    stroked: false,
    filled: true,
    // extruded: true,
    // lineWidthScale: 20,
    // lineWidthMinPixels: 2,
    getFillColor: [...MAP_COLORS[5], 200],
    // getLineColor: [255, 120, 255, 200],
    getRadius: 20,
    // getLineWidth: 1,
    // getElevation: 0,
    visible: show
  });
};

export default railStationLayer;
