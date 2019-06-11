import {
  GeoJsonLayer
} from "deck.gl";

import metroStationData from "../data/metro_stations_points.json";

import { MAP_COLORS } from '../constants'

const metroStationLayer = (show = true) => {
  return new GeoJsonLayer({
    id: "metro-station-layer",
    data: metroStationData,
    pickable: true,
    stroked: false,
    filled: true,
    // extruded: true,
    // lineWidthScale: 20,
    // lineWidthMinPixels: 2,
    getFillColor: [...MAP_COLORS[2], 200],
    // getLineColor: [...MAP_COLORS[2], 200],
    getRadius: 20,
    getLineWidth: 1,
    getElevation: 0,
    visible: show
  });
};

export default metroStationLayer;
