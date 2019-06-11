import {
  PolygonLayer,
  PathLayer
} from "deck.gl";

import parkingData from "../data/Stockholm_Parking.json";
import { MAP_COLORS } from '../constants';

const parkingLayer = (show = true) => {
  return new PathLayer({
    id: "parking-layer",
    data: parkingData.features.map(d => d.geometry),
    pickable: true,
    stroked: true,
    filled: true,
    // extruded: true,
    // lineWidthScale: 20,
    // lineWidthMinPixels: 2,
    getPath: d => d.coordinates,
    getFillColor: [0, 0, 0, 64],
    getColor: [...MAP_COLORS[4], 200],
    // getRadius: 100,
    getWidth: 5,
    // getElevation: 2,
    visible: show
    // onHover: ({object, x, y}) => {
    //console.log('h', object)
    //   const tooltip = object.properties.name || object.properties.station;
    //    Update tooltip
    //      http://deck.gl/#/documentation/developer-guide/adding-interactivity?section=example-display-a-tooltip-for-hovered-object

    // }
  });
};

export default parkingLayer
