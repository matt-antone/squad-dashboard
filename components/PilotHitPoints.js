import React, { Component } from 'react'

export default class PilotHitPoints extends Component {
  hitPoints (pilot) {
    const points = []
    for(let x=1;x<=pilot.hpTotal;x++){
       points.push(<div className={`text-xs text-black font-bold flex-1 ${ x <= pilot.hp ? 'bg-red-600' : 'bg-gray-700' } border-l border-r border-black px-1`}><small>{x == 1 ? 'HP' : ''}</small></div>)
    }
    return points
  }

  render() {
    return (
      <div className="hp">
        {this.hitPoints(this.props.pilot)}
      </div>
    )
  }
}
