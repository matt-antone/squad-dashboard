import React, { Component } from 'react'
import Icon from './Icon'

export default class AttackInfo extends Component {
  getOrdinance = (ord) => {
    if(ord) {
      return (
        <span className="text-white">
          <Icon name="rangebonusindicator"/>
        </span>
      )  
    }
  }

  getAttackInfo = (upgrade) => {
    const info = []
    console.log()
    if(typeof(upgrade.sides[0].attack) !== 'undefined'){
      const { attack } = upgrade.sides[0]
      const icon = attack.arc.replace(' ','').toLowerCase();
      info.push(
        <span className="text-red-500"><Icon name={icon}/> {attack.minrange} - {attack.maxrange} { this.getOrdinance( attack.ordnance ) }</span> 
      )  
    }
    return info
  }

  render() {
    return (
      <span>
        {this.getAttackInfo(this.props.upgrade)}
      </span>
    )
  }
}
