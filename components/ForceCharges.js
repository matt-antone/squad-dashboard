import React, { Component } from 'react'
import ForceCharge from './ForceCharge'

export default class ForceCharges extends Component {

  showShipForce = (pilot) => {
    console.log(pilot)
    const forceCharges = []
    if(typeof(pilot.force) !== 'undefined'){
      for(let x=1; x<= pilot.force.value; x++) {
        forceCharges.push(
          <ForceCharge/>
        )
      }
    }
    return forceCharges
  }

  render() {
    return (
      <div className={'flex my-2'}>
        {this.showShipForce(this.props.pilot)}       
      </div>
    )
  }
}
