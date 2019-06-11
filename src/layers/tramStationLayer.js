import {
  GeoJsonLayer
} from "deck.gl";

import tramStationData from "../data/tram_stations_points.json";

const tramStationLayer = (show = true) => {
  return new GeoJsonLayer({
    id: "tram-station-layer",
    data: tramStationData,
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

export default tramStationLayer;
