import {
  ContourLayer
} from "deck.gl";

import busStopData from "../data/bus_stops_geo.json";

const busCoverageLayer = (show=true) => {

  return new ContourLayer({
    id: 'contourLayer',
    // Three contours are rendered.
    contours: [
      {threshold: 1, color: [255, 0, 0, 255], strokeWidth: 1}, // => Isoline for threshold 1
      {threshold: 5, color: [0, 255, 0], strokeWidth: 2}, // => Isoline for threshold 5
      {threshold: [6, 10], color: [0, 0, 255, 128]} // => Isoband for threshold range [6, 10)
    ],
    cellSize: 200,
    getPosition: d => d.COORDINATES,
  })

}

export default busCoverageLayer;
