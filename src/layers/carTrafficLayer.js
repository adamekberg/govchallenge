import {
  HexagonLayer
} from "deck.gl";

import carTrafficData1 from "../data/cars_data_part1.json";
import carTrafficData2 from "../data/cars_data_part2.json";
import {
  LIGHT_SETTINGS,
  HEXAGON_COLOR_RANGE
} from '../constants'

const carTrafficData = carTrafficData1.concat(carTrafficData2);

const carTrafficLayer = (show = true, height = 0.01) => {
  function getColorValue(points) {
    return points.reduce((a, c) => a + +c.value, 0);
  }

  return new HexagonLayer({
    id: "car-traffic-layer",
    data: carTrafficData,
    pickable: true,
    extruded: true,
    radius: 20,
    elevationScale: height,
    colorRange: HEXAGON_COLOR_RANGE,
    getPosition: d => {
      return [+d.long, +d.lat];
    },
    getColorValue,
    getElevationValue: getColorValue,
    lightSettings: LIGHT_SETTINGS,
    opacity: 1,
    visible: show
  });
};

export default carTrafficLayer;
