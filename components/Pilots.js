import React, { Component } from 'react';
import { default as Icon } from "./icon";

class Pilots extends Component {
  state = { 

  }
  
  setHitPoints = (pilot) => {
    
  }  

  listStats = (stats = false) => {
    // console.log(stats)
    if(stats){
      return stats.map( (stat) => {
        let icon = false
        let iconColor = 'text-white'
        let ringColor = 'ring-white' 
        switch (true){
          case stat.type === 'attack':
            icon = stat.arc.replace(' ','').toLowerCase();
            iconColor = 'text-red-500'
            ringColor = 'ring-red-500'
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
          default:
            icon = stat.type
        }
        return(
          <div className={`flex-1 block text-center`}>
            <span className={`${iconColor}`}>
              <div className={`inline-flex justify-center align-middle leading-none origin-center w-8 h-8 ring-4 ${ringColor} ring-opacity-50 rounded-full`}>
                <Icon name={icon}/>
              </div><br/>
              <span className={`text-5xl font-bold`}>
                {stat.value}
              </span>
            </span>
          </div>
        )
      })
    }
  }

  listLinkedActions = (action = false) => {
    if(action && action.linked){
      return (
        <div className={`text-${action.linked.difficulty.toLowerCase()}-500`}>
          <Icon name={`${action.linked.type.toLowerCase().replace(/\s/g, '')}`}/>
        </div>
      )
    }
  }

  listActions = (list = false) => {
    return list.map( (action,i) => {
      // console.log(action)
      return (
        <div className={`flex justify-center ${action.linked ? 'linked' : ''}`}>
          <div className={`text-${action.difficulty.toLowerCase()}-500`}>
            <Icon name={`${action.type.toLowerCase().replace(/\s/g, '')}`}/>
          </div>
          {this.listLinkedActions(action)}
        </div>
      )
    })  
  }

  showHitPoints (pilot) {
    console.log(pilot.hp)
    const points = []
    for(let x=1;x<=pilot.hp;x++){
       points.push(<div className="flex-1 bg-red-500 border-l border-r border-black px-1"><small>{x == 1 ? 'Total HP' : ''}</small></div>)
    }
    return (
      <div className="hp flex border-4 border-black">
        {points}
      </div>
    )
  }

  showTotalCost = (pilot) => {
    let cost = pilot.cost
    console.log(pilot.name,pilot.cost)
    pilot.upgrades.map( upgrade => {
      if(typeof(upgrade.cost.value) !== 'undefined'){
        console.log(upgrade.cost.value)
        cost += upgrade.cost.value  
      } else if(typeof(upgrade.cost.values) !== 'undefined'){
        const vIndex = pilot.stats.filter( stat => stat.type === upgrade.cost.variable )[0].value
        console.log('vcost',upgrade.cost,vIndex,upgrade.cost.values[vIndex])
        cost += upgrade.cost.values[vIndex]
      }
    })
    return cost
  }

  listPilots = (list = false, faction = '') => {

    if(list){
      // console.log('got pilots')
      const markup = []
      return list.map( (pilot,i) => {
        // console.log(pilot)
        return (
          <article key={`ship-${i}`} className={`pilot px-4 pb-4 mb-4 border border-gray-900 bg-black text-white ${faction}`}>
            <header className=" -mx-4 mb-2">
              {this.showHitPoints(pilot)}
              <img className={'border-l-4 border-r-4 border-black'} src={pilot.artwork}/>
              <h3 class="p-4 flex justify-between">
                <span>
                  <span className={`text-xl`}>{i+1}</span> {pilot.name} ({this.showTotalCost(pilot)})
                </span>
                <span>
                  Initiative: {pilot.initiative}
                </span>
              </h3>
            </header>
            <div className="grid grid-cols-12 mb-4">
              <div className={'col-span-9'}>
                <div className={'text-black bg-gray-300 p-4'}>
                  <p class={`text-sm ${pilot.ability ? 'ability' : 'text'}`}>{pilot.ability ? pilot.ability : pilot.text}</p>
                  <hr/>
                  <p class={`text-sm`}><strong>{pilot.shipAbility ? pilot.shipAbility.name : ''}</strong><br/>{pilot.shipAbility.text}</p>
                </div>
                <div className={'bg-black text-white flex p-4'}>
                  {this.listStats(pilot.stats)}
                </div>
              </div>
              <div className={'col-span-3'}>
                {this.listActions(pilot.actions)}
              </div>
            </div>
            <footer class="flex">
            </footer>
          </article>
        )
      })  
    }
  }

  render() { 
    // console.log(this.props)
    return ( 
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {this.listPilots(this.props.pilots,this.props.faction)}
      </div>
     );
  }
}
 
export default Pilots;
