import {
  GeoJsonLayer,
  HexagonLayer,
  IconLayer
  // ContourLayer,
} from "deck.gl";

import parkingData from "../data/Stockholm_Parking.json";
import busStopData from "../data/bus_stops_geo.json";
import cycleTrafficData from "../data/cycle_data_final.json";
import carTrafficData1 from "../data/cars_data_part1.json";
import carTrafficData2 from "../data/cars_data_part2.json";
import evChargingData from "../data/ev_charging_final.json";
import ferryBerthData from "../data/ferry_berths_points.json";
import metroStationData from "../data/metro_stations_points.json";
import railStationData from "../data/rail_stations_points.json";
import shipBerthData from "../data/ship_berths_points.json";
import tramStationData from "../data/tram_stations_points.json";

import evChargingImage from "../images/icon-atlas.png";

const carTrafficData = carTrafficData1.concat(carTrafficData2);

const colorRange = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78]
];

const LIGHT_SETTINGS = {
  lightsPosition: [16.56, 57.83, 8000, 19.56, 60.83, 8000],
  ambientRatio: 0.4,
  diffuseRatio: 0.6,
  specularRatio: 0.2,
  lightsStrength: [0.8, 0.0, 0.8, 0.0],
  numberOfLights: 2
};

const parkingLayer = (show = true) => {
  return new GeoJsonLayer({
    id: "parking-layer",
    data: parkingData,
    pickable: true,
    stroked: true,
    filled: false,
    extruded: true,
    lineWidthScale: 20,
    lineWidthMinPixels: 2,
    getFillColor: [200, 200, 255, 200],
    getLineColor: [200, 200, 255, 200],
    getRadius: 100,
    getLineWidth: 1,
    getElevation: 0,
    visible: show
    // onHover: ({object, x, y}) => {
    //console.log('h', object)
    //   const tooltip = object.properties.name || object.properties.station;
    //    Update tooltip
    //      http://deck.gl/#/documentation/developer-guide/adding-interactivity?section=example-display-a-tooltip-for-hovered-object

    // }
  });
};

const busStopLayer = (show = true) => {
  return new GeoJsonLayer({
    id: "bus-stop-layer",
    data: busStopData,
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
    // onHover: ({object, x, y}) => {
    // //console.log('h', object)
    //   if(object) {
    //     const tooltip = `${object.properties.StopPointName}
    //       ${object.properties.StopPointNumber}`

    //     // this.props.onHover(tooltip)
    //   }
    // }
  });
};

const ferryBerthLayer = (show = true) => {
  return new GeoJsonLayer({
    id: "ferry-berths-layer",
    data: ferryBerthData,
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

const metroStationLayer = (show = true) => {
  return new GeoJsonLayer({
    id: "metro-station-layer",
    data: metroStationData,
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

const shipBerthLayer = (show = true) => {
  return new GeoJsonLayer({
    id: "ship-berth-layer",
    data: shipBerthData,
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

// const busCoverageLayer = (show=true) => {

//   return new ContourLayer({
//     id: 'contourLayer',
//     // Three contours are rendered.
//     contours: [
//       {threshold: 1, color: [255, 0, 0, 255], strokeWidth: 1}, // => Isoline for threshold 1
//       {threshold: 5, color: [0, 255, 0], strokeWidth: 2}, // => Isoline for threshold 5
//       {threshold: [6, 10], color: [0, 0, 255, 128]} // => Isoband for threshold range [6, 10)
//     ],
//     cellSize: 200,
//     getPosition: d => d.COORDINATES,
//   })

// }

const cycleTrafficLayer = (show = true, height = 1) => {
  function getColorValue(points) {
    return points.reduce((a, c) => a + c.value, 0);
  }

  return new HexagonLayer({
    id: "hexagon-layer",
    data: cycleTrafficData,
    pickable: true,
    extruded: true,
    radius: 20,
    elevationScale: height,
    colorRange,
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
    colorRange,
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

const evChargingLayer = (show = true) => {
  return new IconLayer({
    id: "ev-charging-layer",
    data: evChargingData,
    pickable: true,
    iconAtlas: evChargingImage,
    iconMapping: {
      marker: { x: 0, y: 0, width: 128, height: 128, mask: true }
    },
    getIcon: d => "marker",
    sizeScale: 15,
    getPosition: d => {
      return [+d.long, +d.lat];
    },
    getSize: d => 2,
    getColor: d => [Math.sqrt(d.exits), 140, 0],
    visible: show
    // onHover: (
    //   info //console.log("info: ", info)
    // ) =>
    //   this.setState({
    //     hoveredObject: info.object,
    //     pointerX: info.x,
    //     pointerY: info.y
    //   })
  });
};

const buildingsLayer = () => {
  return {
    id: "3d-buildings",
    source: "composite",
    "source-layer": "building",
    filter: ["==", "extrude", "true"],
    type: "fill-extrusion",
    minzoom: 15,
    paint: {
      "fill-extrusion-color": "#aaa",
      // use an 'interpolate' expression to add a smooth transition effect to the
      // buildings as the user zooms in
      "fill-extrusion-height": [
        "interpolate",
        ["linear"],
        ["zoom"],
        15,
        0,
        15.05,
        ["get", "height"]
      ],
      "fill-extrusion-base": [
        "interpolate",
        ["linear"],
        ["zoom"],
        15,
        0,
        15.05,
        ["get", "min_height"]
      ],
      "fill-extrusion-opacity": 0.6
    }
  };
};

export {
  parkingLayer,
  busStopLayer,
  cycleTrafficLayer,
  carTrafficLayer,
  evChargingLayer,
  ferryBerthLayer,
  metroStationLayer,
  railStationLayer,
  shipBerthLayer,
  tramStationLayer
};
