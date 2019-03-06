import React from "react";
import {
  parkingLayer,
  busStopLayer,
  cycleTrafficLayer,
  carTrafficLayer
} from "../layers/layers";
import "../Controller.css";
import { slide as Menu } from 'react-burger-menu'
import { isMobile } from 'react-device-detect'

import { Checkbox } from "semantic-ui-react";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      showParking: false,
      showBusStops: true,
      showCycleTraffic: true,
      extrudeCycleTraffic: true,
      showCarTraffic: !isMobile,
      extrudeCarTraffic: false,
    };
  }

  _toggleParking = (e, { checked }) => {
    this.setState({ showParking: checked });
    // Note: Dirty - find the right way to do this
    setTimeout(this._updateLayers, 0);
  };

  _toggleBusStops = (e, { checked }) => {
    this.setState({ showBusStops: checked });
    // Note: Dirty - find the right way to do this
    setTimeout(this._updateLayers, 0);
  };

  _toggleCycleTraffic = (e, { checked }) => {
    this.setState({ showCycleTraffic: checked });
    // Note: Dirty - find the right way to do this
    setTimeout(this._updateLayers, 0);
  };

  _toggleCycleTrafficExtrude = (e, { checked }) => {
    this.setState({ extrudeCycleTraffic: checked });
    // Note: Dirty - find the right way to do this
    setTimeout(this._updateLayers, 0);
  };

  _toggleCarTraffic = (e, { checked }) => {
    this.setState({ showCarTraffic: checked });
    // Note: Dirty - find the right way to do this
    setTimeout(this._updateLayers, 0);
  };

  _toggleCarTrafficExtrude = (e, { checked }) => {
    this.setState({ extrudeCarTraffic: checked });
    // Note: Dirty - find the right way to do this
    setTimeout(this._updateLayers, 0);
  };

  _updateLayers = () => {
    let layers = [
      parkingLayer(this.state.showParking),
      busStopLayer(this.state.showBusStops),
      cycleTrafficLayer(
        this.state.showCycleTraffic,
        this.state.extrudeCycleTraffic
      ),
      carTrafficLayer(this.state.showCarTraffic, this.state.extrudeCarTraffic)
    ];

    this.props.onLayerChange(layers);
  };

  componentDidMount() {
    this._updateLayers();
  }

  render() {
    return (
      <Menu width={ 200 } className={ "controller-container" } right isOpen={ !isMobile } noOverlay disableOverlayClick >
        <h3>Stockholm Sustainable Traffic Planning</h3>
        <p>Toggle the checkboxes below to turn layers on&nbsp;and&nbsp;off</p>

        <div className="controller-option option-parking">
          <Checkbox
            label="Parking"
            ref="parkingCheck"
            type="checkbox"
            onChange={this._toggleParking}
          />
        </div>
        <div className="controller-option option-bus-stops">
          <Checkbox
            label="Bus Stops"
            ref="busStopCheck"
            type="checkbox"
            defaultChecked
            onChange={this._toggleBusStops}
          />
        </div>
        <div className="controller-option option-cycle-traffic">

          <Checkbox
            label="Bicycle Traffic"
            ref="cycleTrafficCheck"
            type="checkbox"
            defaultChecked
            onChange={this._toggleCycleTraffic}
          />

        </div>
        <div className="controller-option option-extrude-checkbox">
          {this.state.showCycleTraffic ? (
            <Checkbox
              label="Extrude Bicycle Traffic"
              ref="cycleTrafficCheck"
              type="checkbox"
              defaultChecked
              onChange={this._toggleCycleTrafficExtrude}
            />
          ) : (
            <Checkbox
              label="Extrude Bicycle Traffic"
              ref="cycleTrafficCheck"
              type="checkbox"
              defaultChecked
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
            defaultChecked={ !isMobile }
            onChange={this._toggleCarTraffic}
          />
        </div>
        <div className="controller-option option-extrude-checkbox">

          {this.state.showCarTraffic ? (
            <Checkbox
              label="Extrude Vehicle Traffic"
              ref="carTrafficCheck"
              type="checkbox"
              onChange={this._toggleCarTrafficExtrude}
            />
          ) : (
            <Checkbox
              label="Extrude Vehicle Traffic"
              ref="carTrafficCheck"
              type="checkbox"
              disabled
              onChange={this._toggleCarTrafficExtrude}
            />
          )}

        </div>

        <div className="controller-option">
          *right click and drag to rotate camera
        </div>

      </Menu>
    );
  }
}

export default App;
