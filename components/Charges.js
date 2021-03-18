import React, { Component } from 'react'
import Charge from './Charge'

export default class Charges extends Component {

  showCharges = ( upgrade ) => {
    const charges = []
    if(typeof(upgrade.sides[0].charges) != 'undefined'){
      for(let x=1;x<=upgrade.sides[0].charges.value;x++){
        charges.push(<Charge/>)
      }
    }
    return charges
  }

  render() {
    return (
      <div className={`flex`}>
        {this.showCharges(this.props.upgrade)}
      </div>
    )
  }
}
