import {
  PolygonLayer
} from "deck.gl";

import { MAP_COLORS } from '../constants'

import kista from '../data/stockholmAreas/kista'
import stockholm_royal_seaport from '../data/stockholmAreas/stockholm_royal_seaport'
import barkarby_staden from '../data/stockholmAreas/barkarby_staden'
import hammarby_sjostad from '../data/stockholmAreas/hammarby_sjostad'

const geometries = [
  kista.features[0].geometry,
  stockholm_royal_seaport.features[0].geometry,
  barkarby_staden.features[0].geometry,
  hammarby_sjostad.features[0].geometry
]

geometries.forEach((d,i) => {
  d.index = i
})

const stockholmAreaLayers = new PolygonLayer({
  id: 'kista-layer',
  data: geometries,
  pickable: true,
  stroked: true,
  filled: true,
  // wireframe: true,
  lineWidthMinPixels: 1,
  getPolygon: d => d.coordinates,
  getFillColor: d => [0, 0, 0, 32],
  // filled: false,
  getLineColor: d => MAP_COLORS[ d.index % 4 ],
  getLineWidth: 1,
  // onHover: ({object, x, y}) => {
    // const tooltip = `${object.zipcode}\nPopulation: ${object.population}`;
    /* Update tooltip
       http://deck.gl/#/documentation/developer-guide/adding-interactivity?section=example-display-a-tooltip-for-hovered-object
    */
  // }
})

export default stockholmAreaLayers
