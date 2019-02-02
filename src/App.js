import React from 'react';
import DeckGL, { LineLayer, GeoJsonLayer } from 'deck.gl';
import { StaticMap } from 'react-map-gl';
import geoData from './data/Stockholm_Parking.json';
import { Checkbox } from 'semantic-ui-react'

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

const parkingLayer = new GeoJsonLayer({
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
  visible: false,
  onHover: ({object, x, y}) => {
  //console.log('h', object)
  //   const tooltip = object.properties.name || object.properties.station;
  //    Update tooltip
  //      http://deck.gl/#/documentation/developer-guide/adding-interactivity?section=example-display-a-tooltip-for-hovered-object

  }
})



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
      getLineColor: [0, 0, 0, 255],
      getRadius: 100,
      getLineWidth: 1,
      getElevation: 30,
      visible: showIt,
      onHover: ({object, x, y}) => {
      //console.log('h', object)
      //   const tooltip = object.properties.name || object.properties.station;
      //    Update tooltip
      //      http://deck.gl/#/documentation/developer-guide/adding-interactivity?section=example-display-a-tooltip-for-hovered-object
    
      }
    })
  }

  

  render() {
    console.log('hej')
    const layers = [this.createParkingLayer()];
    
    return (
      <div>

      <DeckGL
        initialViewState={initialViewState}
        controller={true}
        layers={layers}
      >
        <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
      </DeckGL>
      <div style={{'zIndex':10000,'position':'absolute'}}>
        <input ref="parkingCheck" type="checkbox" defaultChecked="true" className="hidden" readOnly="" tabIndex="0" onChange={ () => this.handleChecked() }/>
        <label>Show stuff</label>
      </div>
      
      </div>
    );
  }





  handleChecked() {
    console.log(this.refs.parkingCheck.checked)
    this.setState({showParking: this.refs.parkingCheck.checked })
  }

}

export default App;
