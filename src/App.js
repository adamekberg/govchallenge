import React from 'react';
import DeckGL, { LineLayer, GeoJsonLayer } from 'deck.gl';
import MapGL from 'react-map-gl';
import geoData from './data/Stockholm_Parking.json';
import { Checkbox } from 'semantic-ui-react';

import { MapboxLayer } from '@deck.gl/mapbox';

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiYWRhbWVrYmVyZyIsImEiOiJjamttcXdjeDMwZHd0M2tvemx1a3BnZ2h5In0.JtC9rUXVaxJ8ONGdfmPmsg';
const STOCKHOLM_PARKING_ACCESS_TOKEN = '2633a10e-8496-4bad-a24d-f2f30be9e659'
// `https://openparking.stockholm.se/LTF-Tolken/v1/ptillaten/within?radius=100&lat=59.3293&lng=18.0686&maxFeatures=200000&outputFormat=JSON&apiKey=2633a10e-8496-4bad-a24d-f2f30be9e659`

// Initial viewport settings
const initialViewState = {
  longitude: 18.0686,
  latitude: 59.3293,
  zoom: 12,
  pitch: 45,
  bearing: 0,
};

const mbLayer = {
      'id': '3d-buildings',
      'source': 'composite',
      'source-layer': 'building',
      'filter': ['==', 'extrude', 'true'],
      'type': 'fill-extrusion',
      'minzoom': 15,
      'paint': {
        'fill-extrusion-color': '#aaa',
        // use an 'interpolate' expression to add a smooth transition effect to the
        // buildings as the user zooms in
        'fill-extrusion-height': [
          "interpolate", ["linear"], ["zoom"],
          15, 0,
          15.05, ["get", "height"]
          ],
          'fill-extrusion-base': [
          "interpolate", ["linear"], ["zoom"],
          15, 0,
          15.05, ["get", "min_height"]
          ],
          'fill-extrusion-opacity': .6
        }
      }


class App extends React.Component {

  constructor() {
    super();

    this.state = {
      showParking: true
    };
  }

  createParkingLayer() {
    const showIt = this.state.showParking;

    return new GeoJsonLayer({
      id: 'geojson-layer',
      data: geoData,
      pickable: true,
      stroked: true,
      filled: true,
      extruded: true,
      lineWidthScale: 20,
      lineWidthMinPixels: 2,
      getFillColor: [160, 160, 180, 200],
      getLineColor: [160, 160, 180, 200],
      getRadius: 100,
      getLineWidth: 1,
      getElevation: 0,
      visible: showIt,
      onHover: ({object, x, y}) => {
      //console.log('h', object)
      //   const tooltip = object.properties.name || object.properties.station;
      //    Update tooltip
      //      http://deck.gl/#/documentation/developer-guide/adding-interactivity?section=example-display-a-tooltip-for-hovered-object

      }
    })
  }

  _onWebGLInitialized = (gl) => {
    this.setState({gl});
  }

  _onMapLoad = () => {
    const map = this._map;
    const deck = this._deck;

    map.addLayer(mbLayer)
    map.addLayer(new MapboxLayer({ id: 'layer-abc', deck }));
  }

  render() {
    const { gl } = this.state;

    const layers = [ this.createParkingLayer() ];

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
          >
          { /* mapStyle="mapbox://styles/mapbox/dark-v9" */}
          </MapGL>

        )}

        </DeckGL>

        <div style={{ position: 'absolute' }} className="controller">
          <input ref="parkingCheck" type="checkbox" defaultChecked="true" onChange={ this._handleChecked }/>
          <label>Show stuff</label>
        </div>

      </div>
    );
  }





  _handleChecked = () => {
    this.setState({showParking: this.refs.parkingCheck.checked })
  }

}

export default App;
