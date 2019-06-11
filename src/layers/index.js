import TWEEN from "@tweenjs/tween.js";

// import parkingLayer from './parkingLayer'
// import busStopLayer from './busStopLayer'
// import carFerryStopLayer from './carFerryStopLayer'
// import bikeTrafficLayer from './bikeTrafficLayer'
// import carTrafficLayer from './carTrafficLayer'
// import evChargingLayer from './evChargingLayer'
// import metroStationLayer from './metroStationLayer'
// import railStationLayer from './railStationLayer'
// import ferryStopLayer from './ferryStopLayer'
// import tramStationLayer from './tramStationLayer'
// import busCoverageLayer from './busCoverageLayer'

let parkingLayer = () => {};
let busStopLayer = () => {};
let carFerryStopLayer = () => {};
let bikeTrafficLayer = () => {};
let carTrafficLayer = () => {};
let evChargingLayer = () => {};
let metroStationLayer = () => {};
let railStationLayer = () => {};
let ferryStopLayer = () => {};
let tramStationLayer = () => {};

import("./parkingLayer").then(layer => {
  parkingLayer = layer.default;
  layers.layerLoaded();
});
import("./busStopLayer").then(layer => {
  busStopLayer = layer.default;
  layers.layerLoaded();
});
import("./carFerryStopLayer").then(layer => {
  carFerryStopLayer = layer.default;
  layers.layerLoaded();
});
import("./bikeTrafficLayer").then(layer => {
  bikeTrafficLayer = layer.default;
  layers.layerLoaded();
});
import("./carTrafficLayer").then(layer => {
  carTrafficLayer = layer.default;
  layers.layerLoaded();
});
import("./evChargingLayer").then(layer => {
  evChargingLayer = layer.default;
  layers.layerLoaded();
});
import("./metroStationLayer").then(layer => {
  metroStationLayer = layer.default;
  layers.layerLoaded();
});
import("./railStationLayer").then(layer => {
  railStationLayer = layer.default;
  layers.layerLoaded();
});
import("./ferryStopLayer").then(layer => {
  ferryStopLayer = layer.default;
  layers.layerLoaded();
});
import("./tramStationLayer").then(layer => {
  tramStationLayer = layer.default;
  layers.layerLoaded();
});

// layerFiles.forEach(lf => {
//   import(lf).then(layer => {
//     allLayers.push(layer.default)
//     console.log('al', allLayers)
//   })
// })

function animate() {
  requestAnimationFrame(animate);
  TWEEN.update();
}

animate();

const layers = {
  layerLoaded() {},

  onLayerLoaded(cb) {
    layers.layerLoaded = cb;
  },

  setLayers(layerSettings) {
    return [
      parkingLayer(layerSettings.showParking),
      bikeTrafficLayer(
        layerSettings.showBikeTraffic,
        layerSettings._bikeTrafficHeight
      ),
      carTrafficLayer(
        layerSettings.showCarTraffic,
        layerSettings._carTrafficHeight
      ),
      evChargingLayer(
        layerSettings.showEvCharging,
        layerSettings.toolTipCallback
      ),
      busStopLayer(layerSettings.showBusStops),
      carFerryStopLayer(layerSettings.showFerryStops),
      metroStationLayer(layerSettings.showMetroStops),
      railStationLayer(layerSettings.showRailStops),
      ferryStopLayer(layerSettings.showShipStops),
      tramStationLayer(layerSettings.showTramStops)
    ];
  },

  animateLayer(setHeight, extrude, cb) {
    let height = { value: extrude ? 0.01 : 1 },
      target = extrude ? 1 : 0.01;

    new TWEEN.Tween(height)
      .to({ value: target }, 500)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(() => {
        setHeight(height.value);
        cb();
      })
      .start();
  }
};

export {
  parkingLayer,
  busStopLayer,
  bikeTrafficLayer,
  carTrafficLayer,
  evChargingLayer,
  carFerryStopLayer,
  metroStationLayer,
  railStationLayer,
  ferryStopLayer,
  tramStationLayer
};

export default layers;
