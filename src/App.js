import React from 'react';
import DeckGL from 'deck.gl';
import MapGL from 'react-map-gl';
import StaticMap from 'react-map-gl';
// import { Checkbox } from 'semantic-ui-react';
import { MapboxLayer } from '@deck.gl/mapbox';
import { buildingsLayer } from './layers/layers'

import Controller from './Components/Controller'

import 'mapbox-gl/dist/mapbox-gl.css'

const GeoJSON = require('geojson');

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiYWRhbWVrYmVyZyIsImEiOiJjamttcXdjeDMwZHd0M2tvemx1a3BnZ2h5In0.JtC9rUXVaxJ8ONGdfmPmsg';
// const STOCKHOLM_PARKING_ACCESS_TOKEN = '2633a10e-8496-4bad-a24d-f2f30be9e659'
// `https://openparking.stockholm.se/LTF-Tolken/v1/ptillaten/within?radius=100&lat=59.3293&lng=18.0686&maxFeatures=200000&outputFormat=JSON&apiKey=2633a10e-8496-4bad-a24d-f2f30be9e659`

// Initial viewport settings
const initialViewState = {
  longitude: 18.0686,
  latitude: 59.3293,
  zoom: 12,
  pitch: 45,
  bearing: 0,
};

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      showParking: true,
      showBusStops: true,
      mapLayers: []
    };
  }

  _onWebGLInitialized = (gl) => {
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    this.setState({gl});
  }

  _onMapLoad = () => {
    const map = this._map;
    const deck = this._deck;

    map.addLayer(buildingsLayer())
    map.addLayer(new MapboxLayer({ id: 'layer-abc', deck }));
  }

  _onLayerChange = (mapLayers) => {
    this.setState({ mapLayers })
  }

  render() {
    const { gl } = this.state;

    const layers = this.state.mapLayers

    return (
      <div>

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
        { gl && (
          <MapGL
            ref={ref => {
                // save a reference to the mapboxgl.Map instance
                this._map = ref && ref.getMap();
              }}
            mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
            gl={gl}
            onLoad={this._onMapLoad}
            mapStyle="mapbox://styles/mapbox/dark-v9"
            preventStyleDiffing={true}
          >

          </MapGL>

        )}

        </DeckGL>

        <Controller onLayerChange={ this._onLayerChange }/>

      </div>
    );
  }

}

export default App;
