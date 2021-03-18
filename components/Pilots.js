import React, { Component } from 'react';
import { default as Icon } from "./Icon";
import Upgrades from './Upgrades'
import Actions from './Actions'
import Stats from './Stats'
import Pilot from './Pilot'

class Pilots extends Component {
  state = { 
    pilots: [],
    damageDeckShuffled: [] 
  }



  listPilots = (list = [], faction = '') => {

    if(list){
      // //console.log('got pilots')
      const markup = []
      return list.map( (pilot,i) => {
        // //console.log(pilot)
        return (
          <Pilot pilot={pilot} faction={faction} drawDamage={this.props.drawDamage}/>
        )
      })  
    }
  }

  render() { 
    // //console.log(this.props)
    return ( 
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {this.listPilots(this.props.pilots,this.props.faction)}
      </div>
     );
  }
}
 
export default Pilots;
