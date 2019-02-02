import React from 'react';
import DeckGL, { LineLayer, GeoJsonLayer } from 'deck.gl';
import { StaticMap } from 'react-map-gl';
import geoData from './data/Stockholm_Parking.json';

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiYWRhbWVrYmVyZyIsImEiOiJjamttcXdjeDMwZHd0M2tvemx1a3BnZ2h5In0.JtC9rUXVaxJ8ONGdfmPmsg';
const STOCKHOLM_PARKING_ACCESS_TOKEN = '2633a10e-8496-4bad-a24d-f2f30be9e659'
// `https://openparking.stockholm.se/LTF-Tolken/v1/ptillaten/within?radius=100&lat=59.3293&lng=18.0686&maxFeatures=200000&outputFormat=JSON&apiKey=2633a10e-8496-4bad-a24d-f2f30be9e659`

// Initial viewport settings
const initialViewState = {
  longitude: 18.0686,
  latitude: 59.3293,
  zoom: 13,
  pitch: 0,
  bearing: 0
};

// Data to be used by the LineLayer
const data = [
  {
    sourcePosition: [18.0686, 59.3293],
    targetPosition: [20.0686, 61.3293]
  }
];

class App extends React.Component {

  render() {
    const layers = [
      new LineLayer({id: 'line-layer', data}),
      new GeoJsonLayer({
        id: 'geojson-layer',
        data: geoData,
        pickable: true,
        stroked: true,
        filled: true,
        extruded: true,
        lineWidthScale: 20,
        lineWidthMinPixels: 2,
        getFillColor: [160, 160, 180, 200],
        getLineColor: [0, 0, 0, 255],
        getRadius: 100,
        getLineWidth: 1,
        getElevation: 30,
        onHover: ({object, x, y}) => {
          console.log('h', object)
        //   const tooltip = object.properties.name || object.properties.station;
        //    Update tooltip
        //      http://deck.gl/#/documentation/developer-guide/adding-interactivity?section=example-display-a-tooltip-for-hovered-object

        }
      })
    ];

    return (
      <div>

      <DeckGL
        initialViewState={initialViewState}
        controller={true}
        layers={layers}
      >
        <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
      </DeckGL>

      <div style={{'zIndex':10000,'position':'absolute'}}>ABCDEFGHI!!!</div>

      </div>
    );
  }
}

export default App;
