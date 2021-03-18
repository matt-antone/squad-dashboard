import React, { Component } from 'react';
import { default as Icon } from "./Icon";
import Configuration from './Configuration'
import Modification from './Modification'
import Charges from './Charges'
import AttackInfo from './AttackInfo'



class Upgrades extends Component {

  showUpgrades = (pilot) => {
    //console.log(pilot.upgrades)
    const upgrades = []
    if(typeof(pilot.upgrades) !== 'undefined'){
      pilot.upgrades.map(  upgrade => {
        let uType = '';
        switch(upgrade.type){
          case 'configuration':
            uType = 'config'
            upgrades.push(<Configuration upgrade={upgrade}/>)
            break
          case 'modification':
            upgrades.push(<Modification upgrade={upgrade}/>)
            break
          default:
            uType = upgrade.type
            upgrades.push(
              <details className={`${upgrade.type} py-2`}>
                <summary className={`mb-2 pb-1 font-bold overflow-hidden text-md flex justify-between items-center`}>
                    <span>
                      {upgrade.name}&nbsp;<AttackInfo upgrade={upgrade}/>
                      <Charges upgrade={upgrade}/>
                    </span>
                </summary>
                {upgrade.sides[0].ability}
              </details>
            )
        }
      })  
    }
    return upgrades
  }

  render() {
    return (
      <div>
        {this.showUpgrades(this.props.pilot)}
      </div>
    );
  }
}

export default Upgrades;