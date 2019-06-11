import {
  HexagonLayer
} from "deck.gl";

import bikeTrafficData from "../data/cycle_data_final.json";
import {
  LIGHT_SETTINGS,
  HEXAGON_COLOR_RANGE
} from '../constants'

const bikeTrafficLayer = (show = true, height = 1) => {
  function getColorValue(points) {
    return points.reduce((a, c) => a + c.value, 0);
  }

  return new HexagonLayer({
    id: "hexagon-layer",
    data: bikeTrafficData,
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
    // onHover: ({object, x, y}) => {
    // const tooltip = `${object.centroid.join(', ')}\nCount: ${object.points.length}`;
    /* Update tooltip
         http://deck.gl/#/documentation/developer-guide/adding-interactivity?section=example-display-a-tooltip-for-hovered-object
      */
    // }
  });
};

export default bikeTrafficLayer;
