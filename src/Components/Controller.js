import React from 'react';
import {
  parkingLayer,
  busStopLayer,
  cycleTrafficLayer,
  buildingsLayer,
} from '../layers/layers'


// import { Checkbox } from 'semantic-ui-react';

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      showParking: true,
      showBusStops: true,
      showCycleTraffic: true,
    };
  }

  _toggleParking = () => {
    this.setState({showParking: this.refs.parkingCheck.checked })
  }

  _toggleBusStops = () => {
    this.setState({showBusStops: this.refs.busStopCheck.checked })
  }

  _toggleCycleTraffic = () => {
    this.setState({showCycleTraffic: this.refs.cycleTrafficCheck.checked })
  }

  _updateLayers = () => {

    let layers = [
        parkingLayer( this.state.showParking ),
        busStopLayer( this.state.showBusStops ),
        cycleTrafficLayer( this.state.showCycleTraffic )
      ]

    this.props.onLayerChange( layers )

  }

  componentDidMount() {
    this._updateLayers()
  }

  render() {
    return(
      <div className="controller">
        <div style={{ position: 'relative' }} className="parking">
          <input ref="parkingCheck" type="checkbox" defaultChecked="true" onChange={ this._toggleParking }/>
          <label>Show parking</label>
        </div>
        <div style={{ position: 'relative' }} className="busStops">
          <input ref="busStopCheck" type="checkbox" defaultChecked="true" onChange={ this._toggleBusStops }/>
          <label>Show bus stops</label>
        </div>
        <div style={{ position: 'relative' }} className="busStops">
          <input ref="busStopCheck" type="checkbox" defaultChecked="true" onChange={ this._toggleCycleTraffic }/>
          <label>Show bus stops</label>
        </div>
      </div>
    )
  }

}

export default App;
