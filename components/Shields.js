import React, { Component } from 'react'
import Shield from './Shield'

export default class Shields extends Component {

  showShipShields = (pilot) => {
    console.log(pilot)
    const shields = []
    if(typeof(pilot.stats) !== 'undefined'){
      const stat = pilot.stats.filter(obj => obj.type === 'shields')[0]
      if(typeof(stat) !==  'undefined'){
        for(let x=1; x<= stat.value; x++) {
          shields.push(
            <Shield/>
          )
        }
      }
    }
    return (
      <div className={'flex my-2'}>{shields}</div>
    )
  }

  render() {
    return this.showShipShields(this.props.pilot)
  }
}
