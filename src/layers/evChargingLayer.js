import {
  IconLayer
} from "deck.gl";

import evChargingData from "../data/ev_charging_final.json";
import evChargingImage from "../images/icon-atlas.png";

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

export default evChargingLayer;
