import {
  GeoJsonLayer
} from "deck.gl";

import railStationData from "../data/rail_stations_points.json";

const railStationLayer = (show = true) => {
  return new GeoJsonLayer({
    id: "rail-station-layer",
    data: railStationData,
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

export default railStationLayer;
