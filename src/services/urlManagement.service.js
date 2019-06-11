import {
  addUrlProps,
  UrlQueryParamTypes,
  replaceInUrlQuery,
  decode,
  encode
} from "react-url-query";

const controller = {

  mapUrlToProps: (url, props) => {
    return {
      showParking: decode(UrlQueryParamTypes.boolean, url.cp),
      showBikeTraffic: decode(UrlQueryParamTypes.boolean, url.bt),
      extrudeBikeTraffic: decode(UrlQueryParamTypes.boolean, url.xbt),
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
  },

  mapUrlChangeHandlersToProps: (props) => {
    return {
      onChange: value => {
        replaceInUrlQuery(
          "cp",
          encode(UrlQueryParamTypes.boolean, value.showParking)
        );
        replaceInUrlQuery(
          "bt",
          encode(UrlQueryParamTypes.boolean, value.showBikeTraffic)
        );
        replaceInUrlQuery(
          "xbt",
          encode(UrlQueryParamTypes.boolean, value.extrudeBikeTraffic)
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

}

const controllerUrlManager = addUrlProps({
  mapUrlToProps: controller.mapUrlToProps,
  mapUrlChangeHandlersToProps: controller.mapUrlChangeHandlersToProps
})

const map = {

  mapUrlToProps: (url, props) => {
    return {
      longitude: decode(UrlQueryParamTypes.number, url.lng) || 18.0686,
      latitude: decode(UrlQueryParamTypes.number, url.lat) || 59.3293,
      zoom: decode(UrlQueryParamTypes.number, url.z) || 13,
      pitch: decode(UrlQueryParamTypes.number, url.p) || 45,
      bearing: decode(UrlQueryParamTypes.number, url.b) || 0
    };
  },

  mapUrlChangeHandlersToProps: (props) => {
    return {
      onChange: value => {
        replaceInUrlQuery(
          "lng",
          encode(UrlQueryParamTypes.number, value.longitude)
        );
        replaceInUrlQuery(
          "lat",
          encode(UrlQueryParamTypes.number, value.latitude)
        );
        replaceInUrlQuery(
          "z",
          encode(UrlQueryParamTypes.number, value.zoom.toFixed(1))
        );
        replaceInUrlQuery(
          "p",
          encode(UrlQueryParamTypes.number, value.pitch.toFixed(1))
        );
        replaceInUrlQuery(
          "b",
          encode(UrlQueryParamTypes.number, value.bearing.toFixed(1))
        );
      }
    };
  }

}

const mapUrlManager = addUrlProps({
  mapUrlToProps: map.mapUrlToProps,
  mapUrlChangeHandlersToProps: map.mapUrlChangeHandlersToProps
})

export {
  controllerUrlManager,
  mapUrlManager
}