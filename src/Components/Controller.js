import React from "react";

import history from "../history";
import layers from "../layers";

import controls from '../services/controls.service'
import controlOption from './controlOption'
import { controllerUrlManager } from '../services/urlManagement.service'

import "../Controller.css";

import { slide as Menu } from "react-burger-menu";
import { isMobile } from "react-device-detect";

class Controller extends React.Component {
  static defaultProps = {
    showParking: false,
    showBikeTraffic: true,
    extrudeBikeTraffic: true,
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

    this.controlOptions = controls;

    this._bikeTrafficHeight = props.extrudeBikeTraffic ? 1 : 0.01;
    this._carTrafficHeight = props.extrudeCarTraffic ? 1 : 0.01;

  }

  componentDidMount() {
    this._updateLayers();

    history.listen(() => this.forceUpdate());

    layers.onLayerLoaded(() => this._updateLayers());
  }

  _updateLayers = () => {
    const layerSettings = {
      ...this.props,
      _bikeTrafficHeight: this._bikeTrafficHeight,
      _carTrafficHeight: this._carTrafficHeight
    }

    const visibleLayers = layers.setLayers( layerSettings );

    this.props.onLayerChange( visibleLayers );
  };

  _toggleLayer = ({ checked, key, animate, heightKey }) => {
    let newState = { ...this.props };
    newState[ key ] = checked;

    if( animate && heightKey ) {
      layers.animateLayer(
        v => ( this[ heightKey ] = v ),
        checked,
        () => this._updateLayers()
      );
    }

    this.props.onChange( newState );

    setTimeout(this._updateLayers, 0);
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

        {
          this.controlOptions.map((option, i) => {
            return controlOption(
              this.props,
              option,
              (settings) => { this._toggleLayer(settings) },
              i
            )
          })
        }

        <div className="controller-option">
          *right click and drag to rotate camera
        </div>
      </Menu>
    );
  }
}

export default controllerUrlManager( Controller );
