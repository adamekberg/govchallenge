import {
  GeoJsonLayer
} from "deck.gl";

import tramStationData from "../data/tram_stations_points.json";
import { MAP_COLORS } from '../constants';

const tramStationLayer = (show = true) => {
  return new GeoJsonLayer({
    id: "tram-station-layer",
    data: tramStationData,
    pickable: true,
    stroked: false,
    filled: true,
    // extruded: true,
    // lineWidthScale: 20,
    // lineWidthMinPixels: 2,
    getFillColor: [...MAP_COLORS[3], 200],
    // getLineColor: [255, 120, 255, 200],
    getRadius: 20,
    // getLineWidth: 1,
    // getElevation: 0,
    visible: show
  });
};

export default tramStationLayer;
