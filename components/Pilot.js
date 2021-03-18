import React, { Component } from 'react'
import Stats from './Stats'
import Upgrades from './Upgrades'
import Actions from './Actions'
import Damage from './Damage'
import Shields from './Shields'
import PilotHitPoints from './PilotHitPoints'
import ForceCharges from './ForceCharges'

export default class Pilot extends Component {

  state = {
    pilot: {},
    damage: []  ,
    crits: [],
  }

  showTotalCost = (pilot) => {
    let cost = pilot.cost
    ////console.log(pilot.name,pilot.cost)
    if(typeof(pilot.upgrades) !== 'undefined'){
      pilot.upgrades.map( upgrade => {
        if(typeof(upgrade.cost.value) !== 'undefined'){
          ////console.log(upgrade.cost.value)
          cost += upgrade.cost.value  
        } else if(typeof(upgrade.cost.values) !== 'undefined'){
          if (upgrade.cost.variable === 'initiative') {
            cost += upgrade.cost.values[pilot.initiative]
          } else {
            const vIndex = pilot.stats.filter( stat => stat.type === upgrade.cost.variable )[0]
            ////console.log(`${upgrade.name} cost: `,upgrade.cost.values[vIndex],vIndex)
            cost += upgrade.cost.values[vIndex]
          }
        }
      })  
    }
    return cost
  }

  componentDidMount() {
    this.setState({pilot: this.props.pilot})
  }

  drawDamage = () => {
    let damage = Array.from(this.state.damage)
    damage.push({ crit: false, card: this.props.drawDamage()})
    this.setState({damage: damage})
  }

  updateDamage = (damage,index) => {
    console.log(damage,index)
    let combined = Array.from(this.state.damage)
    if(typeof(combined[index]) != 'undefined'){
      combined.splice(index,1)
    }
    combined.push(damage)
    console.log(combined)
    this.setState({damage: combined})
  }

  showDamage = () => {
    const damage = []
    this.state.damage.map((hit,i) => {
      damage.push(
        <Damage index={i} card={hit} updateDamage={this.updateDamage}/>
      )
    })
    return (
      <div className={`flex flex-wrap leading-7`}>
        {damage}
      </div>
    )
  }


  showCrits = () => {
    const crits = []
    this.state.damage.map((damage) => {
      if(damage.crit && typeof(damage.card) != 'undefined'){
        crits.push(
          <div className={`bg-red-900 mt-4 p-1 text-sm`}>
            {damage.card.text}
          </div>
        )    
      }
    })
    return crits
  }

  render() {
    const { pilot } = this.state
    return (
      <article key={`ship-${pilot.id+1}`} className={`pilot relative bg-gray-900 mb-4 text-gray-400 ${this.props.faction}`}>
      <header className="relative border-top-0 flex flex-wrap relative p-0">
        <h3 className="w-7/8 text-xs flex items-center rounded-full pr-4 absolute bottom-4 left-5 bg-black">
          <span className={`text-xl flex items-center justify-center w-8 h-8 rounded-full bg-black ring-4 ring-gray-500 -ml-1`}><span className={`font-bold text-2xl`}>{pilot.id+1}</span></span>
          <span className={`uppercase font-bold py-1 px-2`}>
            {pilot.name} ({this.showTotalCost(pilot)})
          </span>
          <span className={`uppercase font-bold py-1 px-2`}>
            Initiative: {pilot.initiative}
          </span>
        </h3>
        <img className={'block w-full h-36 object-cover'} src={pilot.artwork}/>
      </header>
      <PilotHitPoints pilot={pilot}/>
      <div className="grid grid-cols-12 px-4">
        <div className={'col-span-9'}>
          <div className={'text-sm leading-7 text-gray-400 p-y4 mb-4'}>
            <div className={`flex`}>
              <Shields pilot={pilot}/>
              <ForceCharges pilot={pilot}/>
            </div>
            {this.showCrits()}
            <p className={`py-2 ${pilot.ability ? 'ability' : 'text'}`}>
              {pilot.ability ? (<span className={`font-bold`}>Ship Ability: </span>) : ''}
              {pilot.ability ? pilot.ability : pilot.text}</p>
            <hr className="border-top-2 border-gray-200"/>
            <p className={`py-2`}><strong>{typeof(pilot.shipAbility) !== 'undefined' ? pilot.shipAbility.name : ''}</strong><br/>{ typeof(pilot.shipAbility) !== 'undefined' ? pilot.shipAbility.text : ''}</p>
            <Upgrades pilot={pilot}/>
          </div>
        </div>
        <div className={'col-span-3'}>
          <Actions actions={pilot.actions} drawDamage={this.drawDamage}/>
        </div>
      </div>
      <footer className={'flex flex-wrap py-5 text-white justify-between items-top leading-3'}>
        <div class={`w-7/12`}>
          <Stats stats={pilot.stats} force={pilot.force}/>
        </div>
        <div className={`w-5/12 relative text-red-500`}>
          <h4 className="text-xs"></h4>
          {this.showDamage()}
        </div>
      </footer>
    </article>
    )
  }
}
