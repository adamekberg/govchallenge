import React from "react";
import DeckGL from "deck.gl";
import MapGL from "react-map-gl";
import {
  addUrlProps,
  UrlQueryParamTypes,
  replaceInUrlQuery,
  decode,
  encode,
} from 'react-url-query';

import history from './history';
import Controller from "./Components/Controller";

import "mapbox-gl/dist/mapbox-gl.css";
import "./App.css";

function mapUrlToProps(url, props) {
  return {
    longitude: decode(UrlQueryParamTypes.number, url.lng) || 18.0686,
    latitude: decode(UrlQueryParamTypes.number, url.lat) || 59.3293,
    zoom: decode(UrlQueryParamTypes.number, url.z) || 13,
    pitch: decode(UrlQueryParamTypes.number, url.p) || 45,
    bearing: decode(UrlQueryParamTypes.number, url.b) || 0,
  }
}

function mapUrlChangeHandlersToProps(props) {
  return {
    onChange: (value) => {
      replaceInUrlQuery('lng', encode(UrlQueryParamTypes.number, value.longitude));
      replaceInUrlQuery('lat', encode(UrlQueryParamTypes.number, value.latitude));
      replaceInUrlQuery('z', encode(UrlQueryParamTypes.number, value.zoom.toFixed(1)));
      replaceInUrlQuery('p', encode(UrlQueryParamTypes.number, value.pitch.toFixed(1)));
      replaceInUrlQuery('b', encode(UrlQueryParamTypes.number, value.bearing.toFixed(1)));
    }
  }
}

// Initial viewport settings
const initialViewState = {
  longitude: 18.0686,
  latitude: 59.3293,
  zoom: 13,
  pitch: 45,
  bearing: 0,
};

class App extends React.Component {
  static defaultProps = initialViewState

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

  _updateUrl({viewState}) {
    clearTimeout(this.urlTimer);

    this.urlTimer = setTimeout(() => {
      this.props.onChange(viewState)
    },500);

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
          onViewStateChange={ viewport => this._updateUrl(viewport) }
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

        <Controller onLayerChange={this._onLayerChange} />

        <div className="footer">
          2019 - <a href="http://tylernwolf.com?ref=mobilityObserver" target="_blank">Tyler Wolf</a> and Adam Ekberg - Data Source:{" "}
          <a href="https://dataportalen.stockholm.se/dataportalen/" target="_blank">https://dataportalen.stockholm.se/dataportalen/</a>
        </div>
      </div>
    );
  }
}

export default addUrlProps({ mapUrlToProps, mapUrlChangeHandlersToProps })(App);
