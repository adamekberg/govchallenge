import React from "react";
import DeckGL from "deck.gl";
import MapGL from "react-map-gl";

import history from "./history";
import { mapUrlManager } from "./services/urlManagement.service";
import Controller from "./Components/Controller";

import "mapbox-gl/dist/mapbox-gl.css";
import "./App.css";

// Initial viewport settings
const initialViewState = {
  longitude: 18.0686,
  latitude: 59.3293,
  zoom: 13,
  pitch: 45,
  bearing: 0
};

class App extends React.Component {
  static defaultProps = initialViewState;

  constructor() {
    super();

    this.state = {
      mapLayers: []
    };
  }

  _onWebGLInitialized = gl => {
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    this.setState({ gl });
  };

  // _onMapLoad = () => {
  // const map = this._map;
  // const deck = this._deck;

  // map.addLayer(buildingsLayer())
  // map.addLayer(new MapboxLayer({ id: 'layer-abc', deck }));
  // }

  _onLayerChange = mapLayers => {
    this.setState({ mapLayers });
  };

  _toolTipCallback = info => {
    this.setState({
      hoveredObject: info.object,
      pointerX: info.x,
      pointerY: info.y
    });
  };

  _renderTooltip() {
    const { hoveredObject, pointerX, pointerY } = this.state || {};
    return (
      hoveredObject && (
        <div
          style={{
            position: "absolute",
            zIndex: 1,
            pointerEvents: "none",
            left: pointerX,
            top: pointerY,
            color: "green",
            backgroundColor: "white",
            fontFamily: "Open Sans",
            padding: 5
          }}
        >
          {hoveredObject.message}
        </div>
      )
    );
  }

  _updateUrl({ viewState }) {
    console.log(viewState);
    clearTimeout(this.urlTimer);

    this.urlTimer = setTimeout(() => {
      this.props.onChange(viewState);
    }, 500);
  }

  componentDidMount() {
    document
      .getElementById("container")
      .addEventListener("contextmenu", evt => evt.preventDefault());

    history.listen(() => this.forceUpdate());
  }

  render() {
    const { gl } = this.state;

    const layers = this.state.mapLayers;

    return (
      <div id="container">
        <DeckGL
          ref={ref => {
            // save a reference to the Deck instance
            this._deck = ref && ref.deck;
          }}
          onWebGLInitialized={this._onWebGLInitialized}
          initialViewState={this.props}
          onViewStateChange={viewport => this._updateUrl(viewport)}
          controller={true}
          layers={layers}
        >
          {gl && (
            <MapGL
              ref={ref => {
                // save a reference to the mapboxgl.Map instance
                this._map = ref && ref.getMap();
              }}
              mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
              // gl={gl}
              onLoad={this._onMapLoad}
              mapStyle="mapbox://styles/mapbox/dark-v10"
              preventStyleDiffing={true}
            />
          )}
          {this._renderTooltip()}
        </DeckGL>

        <Controller
          onLayerChange={this._onLayerChange}
          toolTipCallback={this._toolTipCallback}
        />

        <div className="footer">
          2019 -{" "}
          <a
            href="http://tylernwolf.com?ref=mobilityObserver"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tyler Wolf
          </a>{" "}
          and Adam Ekberg - Data Source:{" "}
          <a
            href="https://dataportalen.stockholm.se/dataportalen/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://dataportalen.stockholm.se/dataportalen/
          </a>
        </div>
      </div>
    );
  }
}

export default mapUrlManager(App);
