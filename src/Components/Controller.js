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
    // Note: Dirty - find the right way to do this
    setTimeout(this._updateLayers,0)
  }

  _toggleBusStops = () => {
    this.setState({showBusStops: this.refs.busStopCheck.checked })
    // Note: Dirty - find the right way to do this
    setTimeout(this._updateLayers,0)
  }

  _toggleCycleTraffic = () => {
    this.setState({showCycleTraffic: this.refs.cycleTrafficCheck.checked })
    // Note: Dirty - find the right way to do this
    setTimeout(this._updateLayers,0)
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
          <label>Parking</label>
        </div>
        <div style={{ position: 'relative' }} className="bus-stops">
          <input ref="busStopCheck" type="checkbox" defaultChecked="true" onChange={ this._toggleBusStops }/>
          <label>Bus stops</label>
        </div>
        <div style={{ position: 'relative' }} className="cycle-traffic">
          <input ref="cycleTrafficCheck" type="checkbox" defaultChecked="true" onChange={ this._toggleCycleTraffic }/>
          <label>Cycle Traffic</label>
        </div>
      </div>
    )
  }

}

export default App;
