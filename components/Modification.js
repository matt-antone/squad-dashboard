import React, { Component } from 'react'
import Icon from "./Icon"
import Shield from "./Shield"

export default class Modification extends Component {

  grants = (grants = []) => {
    //console.log('grants',grants)
    var collected = []
    grants.map((grant) => {
      //console.log('grant',grant)
      switch(grant.value) {
        case 'shields':
            collected.push(<Shield/>)
      }
    })
    return (
      <div className={`flex`}>
        {collected}
      </div>
    )
  }

  render() {
    const { upgrade } =  this.props
    return (
      <details className={`${upgrade.type} py-2`}>
        <summary className={`mb-2 pb-1 font-bold overflow-hidden text-md flex justify-between items-center`}>
          <span>
            <Icon name={upgrade.type}/> {upgrade.name}
            {this.grants(upgrade.sides[0].grants)}
          </span>
        </summary>
        {upgrade.sides[0].ability}
      </details>

    )
  }
}
