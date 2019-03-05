import React from "react";
import DeckGL from "deck.gl";
import MapGL from "react-map-gl";

import Controller from "./Components/Controller";

import "mapbox-gl/dist/mapbox-gl.css";
import "./App.css";

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiYWRhbWVrYmVyZyIsImEiOiJjamttcXdjeDMwZHd0M2tvemx1a3BnZ2h5In0.JtC9rUXVaxJ8ONGdfmPmsg";

// Initial viewport settings
const initialViewState = {
  longitude: 18.0686,
  latitude: 59.3293,
  zoom: 13,
  pitch: 45,
  bearing: 0
};

class App extends React.Component {
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
            top: pointerY
          }}
        >
          {hoveredObject.message}
        </div>
      )
    );
  }

  componentDidMount() {
    document
      .getElementById("container")
      .addEventListener("contextmenu", evt => evt.preventDefault());
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
          initialViewState={initialViewState}
          controller={true}
          layers={layers}
        >
          {gl && (
            <MapGL
              ref={ref => {
                // save a reference to the mapboxgl.Map instance
                this._map = ref && ref.getMap();
              }}
              mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
              // gl={gl}
              onLoad={this._onMapLoad}
              mapStyle="mapbox://styles/mapbox/dark-v10"
              preventStyleDiffing={true}
            />
          )}
          {this._renderTooltip()}
        </DeckGL>

        <Controller onLayerChange={this._onLayerChange} />

        <div className="footer">
          2019 Tyler Wolf and Adam Ekberg - Data Source:{" "}
          <a href="https://open.stockholm.se/">https://open.stockholm.se/</a>
        </div>
      </div>
    );
  }
}

export default App;
