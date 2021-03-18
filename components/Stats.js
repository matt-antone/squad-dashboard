import React, { Component } from 'react'
import Icon from './Icon'

export default class Stats extends Component {

  listStats = (stats = []) => {
    // //console.log(stats)
    const collected = []
    stats.map( (stat) => {
      let icon = false
      let iconColor = 'text-white'
      let ringColor = 'ring-white' 
      switch (true){
        case stat.type === 'attack':
          icon = stat.arc.replace(' ','').toLowerCase();
          iconColor = 'text-red-600'
          ringColor = 'ring-red-600'
          break;
        case stat.type === 'agility':
          iconColor = 'text-green-400'
          ringColor = 'ring-green-400'
          icon = stat.type
          break;
        case stat.type === 'hull':
          iconColor = 'text-yellow-500'
          ringColor = 'ring-yellow-500'
          icon = stat.type
          break;
        case stat.type === 'shields':
          iconColor = 'text-blue-300'
          ringColor = 'ring-blue-300'
          icon = 'shield'
          break
        default:
          icon = stat.type
      }
      collected.push(
        <div className={`flex-1 block text-center`}>
          <span className={`${iconColor}`}>
            <div className={`inline-flex justify-center align-middle leading-none origin-center w-8 h-8 ring-4 ${ringColor} ring-opacity-50 rounded-full`}>
              <Icon name={icon}/>
            </div><br/>
            <span className={`text-4xl font-bold`}>
              {stat.value}
            </span>
          </span>
        </div>
      )
    })
    
    if( typeof(this.props.force) !== 'undefined'){
      const{ force } = this.props
      collected.push(
        <div className={`flex-1 block text-center`}>
          <span className={`text-purple-400`}>
            <div className={`inline-flex justify-center align-middle leading-none origin-center w-8 h-8 ring-4 ring-purple-400 ring-opacity-50 rounded-full`}>
              <Icon name={'forcecharge'}/>
            </div><br/>
            <span className={`text-4xl font-bold`}>
              {force.value}
            </span>
          </span>
        </div>
      )
    }
    return collected
  }

  render() {
    return (
      <div className={`flex justify-start px-2`}>
        {this.listStats(this.props.stats)}
      </div>
    )
  }
}
