import React from "react";

import history from "../history";
import {
  parkingLayer,
  cycleTrafficLayer,
  carTrafficLayer,
  evChargingLayer,
  busStopLayer,
  ferryBerthLayer,
  metroStationLayer,
  railStationLayer,
  shipBerthLayer,
  tramStationLayer
} from "../layers/layers";
import "../Controller.css";

import { slide as Menu } from "react-burger-menu";
import { isMobile } from "react-device-detect";
import TWEEN from "@tweenjs/tween.js";
import {
  addUrlProps,
  UrlQueryParamTypes,
  replaceInUrlQuery,
  decode,
  encode
} from "react-url-query";
import { Checkbox } from "semantic-ui-react";

function mapUrlToProps(url, props) {
  return {
    showParking: decode(UrlQueryParamTypes.boolean, url.cp),
    showCycleTraffic: decode(UrlQueryParamTypes.boolean, url.bt),
    extrudeCycleTraffic: decode(UrlQueryParamTypes.boolean, url.xbt),
    showCarTraffic: decode(UrlQueryParamTypes.boolean, url.ct),
    extrudeCarTraffic: decode(UrlQueryParamTypes.boolean, url.xct),
    showEvCharging: decode(UrlQueryParamTypes.boolean, url.evc),
    menuOpen: decode(UrlQueryParamTypes.boolean, url.m),
    showBusStops: decode(UrlQueryParamTypes.boolean, url.bs),
    showFerryStops: decode(UrlQueryParamTypes.boolean, url.fs),
    showMetroStops: decode(UrlQueryParamTypes.boolean, url.ms),
    showRailStops: decode(UrlQueryParamTypes.boolean, url.rs),
    showShipStops: decode(UrlQueryParamTypes.boolean, url.ss),
    showTramStops: decode(UrlQueryParamTypes.boolean, url.ts)
  };
}

function mapUrlChangeHandlersToProps(props) {
  return {
    onChange: value => {
      replaceInUrlQuery(
        "cp",
        encode(UrlQueryParamTypes.boolean, value.showParking)
      );
      replaceInUrlQuery(
        "bt",
        encode(UrlQueryParamTypes.boolean, value.showCycleTraffic)
      );
      replaceInUrlQuery(
        "xbt",
        encode(UrlQueryParamTypes.boolean, value.extrudeCycleTraffic)
      );
      replaceInUrlQuery(
        "ct",
        encode(UrlQueryParamTypes.boolean, value.showCarTraffic)
      );
      replaceInUrlQuery(
        "xct",
        encode(UrlQueryParamTypes.boolean, value.extrudeCarTraffic)
      );
      replaceInUrlQuery(
        "evc",
        encode(UrlQueryParamTypes.boolean, value.showEvCharging)
      );
      replaceInUrlQuery(
        "m",
        encode(UrlQueryParamTypes.boolean, value.menuOpen)
      );
      replaceInUrlQuery(
        "bs",
        encode(UrlQueryParamTypes.boolean, value.showBusStops)
      );
      replaceInUrlQuery(
        "fs",
        encode(UrlQueryParamTypes.boolean, value.showFerryStops)
      );
      replaceInUrlQuery(
        "ms",
        encode(UrlQueryParamTypes.boolean, value.showMetroStops)
      );
      replaceInUrlQuery(
        "rs",
        encode(UrlQueryParamTypes.boolean, value.showRailStops)
      );
      replaceInUrlQuery(
        "ss",
        encode(UrlQueryParamTypes.boolean, value.showShipStops)
      );
      replaceInUrlQuery(
        "ts",
        encode(UrlQueryParamTypes.boolean, value.showTramStops)
      );
    }
  };
}

class Controller extends React.Component {
  static defaultProps = {
    showParking: false,
    showCycleTraffic: true,
    extrudeCycleTraffic: true,
    showCarTraffic: !isMobile,
    extrudeCarTraffic: false,
    showEvCharging: true,
    menuOpen: !isMobile,
    onLayerChange: () => {},
    showBusStops: true,
    showFerryStops: true,
    showMetroStops: true,
    showRailStops: true,
    showShipStops: true,
    showTramStops: true
  };

  constructor(props) {
    super(props);

    this._cycleTrafficHeight = props.extrudeCycleTraffic ? 1 : 0.01;
    this._carTrafficHeight = props.extrudeCarTraffic ? 1 : 0.01;
  }

  _toggleParking = (e, { checked }) => {
    this.props.onChange({ ...this.props, showParking: checked });
    // Note: Dirty - find the right way to do this
    setTimeout(this._updateLayers, 0);
  };

  _toggleCycleTraffic = (e, { checked }) => {
    this.props.onChange({ ...this.props, showCycleTraffic: checked });
    // Note: Dirty - find the right way to do this
    setTimeout(this._updateLayers, 0);
  };

  _toggleCycleTrafficExtrude = (e, { checked }) => {
    this.props.onChange({ ...this.props, extrudeCycleTraffic: checked });
    this._animateLayer(v => (this._cycleTrafficHeight = v), checked);
    // Note: Dirty - find the right way to do this
    setTimeout(this._updateLayers, 0);
  };

  _toggleCarTraffic = (e, { checked }) => {
    this.props.onChange({ ...this.props, showCarTraffic: checked });
    // Note: Dirty - find the right way to do this
    setTimeout(this._updateLayers, 0);
  };

  _toggleCarTrafficExtrude = (e, { checked }) => {
    this.props.onChange({ ...this.props, extrudeCarTraffic: checked });
    this._animateLayer(v => (this._carTrafficHeight = v), checked);
    // Note: Dirty - find the right way to do this
    setTimeout(this._updateLayers, 0);
  };

  _toggleEvCharging = (e, { checked }) => {
    this.props.onChange({ ...this.props, showEvCharging: checked });
    // Note: Dirty - find the right way to do this
    setTimeout(this._updateLayers, 0);
  };

  _toggleBusStops = (e, { checked }) => {
    this.props.onChange({ ...this.props, showBusStops: checked });
    // Note: Dirty - find the right way to do this
    setTimeout(this._updateLayers, 0);
  };

  _toggleFerryStops = (e, { checked }) => {
    this.props.onChange({ ...this.props, showFerryStops: checked });
    // Note: Dirty - find the right way to do this
    setTimeout(this._updateLayers, 0);
  };

  _toggleMetroStops = (e, { checked }) => {
    this.props.onChange({ ...this.props, showMetroStops: checked });
    // Note: Dirty - find the right way to do this
    setTimeout(this._updateLayers, 0);
  };

  _toggleRailStops = (e, { checked }) => {
    this.props.onChange({ ...this.props, showRailStops: checked });
    // Note: Dirty - find the right way to do this
    setTimeout(this._updateLayers, 0);
  };

  _toggleShipStops = (e, { checked }) => {
    this.props.onChange({ ...this.props, showShipStops: checked });
    // Note: Dirty - find the right way to do this
    setTimeout(this._updateLayers, 0);
  };

  _toggleTramStops = (e, { checked }) => {
    this.props.onChange({ ...this.props, showTramStops: checked });
    // Note: Dirty - find the right way to do this
    setTimeout(this._updateLayers, 0);
  };

  _updateLayers = () => {
    let layers = [
      parkingLayer(this.props.showParking),
      cycleTrafficLayer(this.props.showCycleTraffic, this._cycleTrafficHeight),
      carTrafficLayer(this.props.showCarTraffic, this._carTrafficHeight),
      evChargingLayer(this.props.showEvCharging),
      busStopLayer(this.props.showBusStops),
      ferryBerthLayer(this.props.showFerryStops),
      metroStationLayer(this.props.showMetroStops),
      railStationLayer(this.props.showRailStops),
      shipBerthLayer(this.props.showShipStops),
      tramStationLayer(this.props.showTramStops)
    ];

    this.props.onLayerChange(layers);
  };

  _animateLayer = (setHeight, extrude) => {
    let height = { value: extrude ? 0.01 : 1 },
      target = extrude ? 1 : 0.01;

    new TWEEN.Tween(height)
      .to({ value: target }, 500)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(() => {
        setHeight(height.value);
        this._updateLayers();
      })
      .start();
  };

  componentDidMount() {
    this._updateLayers();

    animate();

    function animate() {
      requestAnimationFrame(animate);
      TWEEN.update();
    }

    history.listen(() => this.forceUpdate());
  }

  render() {
    return (
      <Menu
        width={200}
        className={"controller-container"}
        right
        noOverlay
        disableOverlayClick
        isOpen={this.props.menuOpen}
        onStateChange={state =>
          this.props.onChange({ ...this.props, menuOpen: state.isOpen })
        }
      >
        <h3>Stockholm Sustainable Traffic Planning</h3>
        <p>Toggle the checkboxes below to turn layers on&nbsp;and&nbsp;off</p>

        <div className="controller-option option-parking">
          <Checkbox
            label="Parking"
            ref="parkingCheck"
            type="checkbox"
            defaultChecked={this.props.showParking}
            onChange={this._toggleParking}
          />
        </div>
        <div className="controller-option option-cycle-traffic">
          <Checkbox
            label="Bicycle Traffic"
            ref="cycleTrafficCheck"
            type="checkbox"
            defaultChecked={this.props.showCycleTraffic}
            onChange={this._toggleCycleTraffic}
          />
        </div>
        <div className="controller-option option-extrude-checkbox">
          {this.props.showCycleTraffic ? (
            <Checkbox
              label="Extrude Bicycle Traffic"
              ref="cycleTrafficCheck"
              type="checkbox"
              defaultChecked={this.props.extrudeCycleTraffic}
              onChange={this._toggleCycleTrafficExtrude}
            />
          ) : (
            <Checkbox
              label="Extrude Bicycle Traffic"
              ref="cycleTrafficCheck"
              type="checkbox"
              defaultChecked={this.props.extrudeCycleTraffic}
              disabled
              onChange={this._toggleCycleTrafficExtrude}
            />
          )}
        </div>

        <div className="controller-option option-car-traffic">
          <Checkbox
            label="Vehicle Traffic"
            ref="carTrafficCheck"
            type="checkbox"
            defaultChecked={this.props.showCarTraffic}
            onChange={this._toggleCarTraffic}
          />
        </div>
        <div className="controller-option option-extrude-checkbox">
          {this.props.showCarTraffic ? (
            <Checkbox
              label="Extrude Vehicle Traffic"
              ref="carTrafficCheck"
              type="checkbox"
              defaultChecked={this.props.extrudeCarTraffic}
              onChange={this._toggleCarTrafficExtrude}
            />
          ) : (
            <Checkbox
              label="Extrude Vehicle Traffic"
              ref="carTrafficCheck"
              type="checkbox"
              defaultChecked={this.props.extrudeCarTraffic}
              disabled
              onChange={this._toggleCarTrafficExtrude}
            />
          )}
        </div>

        <div className="controller-option option-ev-charging">
          <Checkbox
            label="Electric vehicle charging stations"
            ref="evChargingCheck"
            type="checkbox"
            defaultChecked={this.props.showEvCharging}
            onChange={this._toggleEvCharging}
          />
        </div>

        <div className="controller-option option-bus-stops">
          <Checkbox
            label="Bus Stops"
            ref="busStopCheck"
            type="checkbox"
            defaultChecked={this.props.showBusStops}
            onChange={this._toggleBusStops}
          />
        </div>

        <div className="controller-option option-ferry-stops">
          <Checkbox
            label="Ferry Berths"
            ref="ferryStopCheck"
            type="checkbox"
            defaultChecked={this.props.showFerryStops}
            onChange={this._toggleFerryStops}
          />
        </div>

        <div className="controller-option option-metro-stops">
          <Checkbox
            label="Metro Stations"
            ref="metroStopCheck"
            type="checkbox"
            defaultChecked={this.props.showMetroStops}
            onChange={this._toggleMetroStops}
          />
        </div>

        <div className="controller-option option-rail-stops">
          <Checkbox
            label="Rail Stations"
            ref="railStopCheck"
            type="checkbox"
            defaultChecked={this.props.showRailStops}
            onChange={this._toggleRailStops}
          />
        </div>

        <div className="controller-option option-ship-stops">
          <Checkbox
            label="Ship Berths"
            ref="shipStopCheck"
            type="checkbox"
            defaultChecked={this.props.showShipStops}
            onChange={this._toggleShipStops}
          />
        </div>

        <div className="controller-option option-tram-stops">
          <Checkbox
            label="Tram Stations"
            ref="tramStopCheck"
            type="checkbox"
            defaultChecked={this.props.showTramStops}
            onChange={this._toggleTramStops}
          />
        </div>

        <div className="controller-option">
          *right click and drag to rotate camera
        </div>
      </Menu>
    );
  }
}

export default addUrlProps({ mapUrlToProps, mapUrlChangeHandlersToProps })(
  Controller
);
