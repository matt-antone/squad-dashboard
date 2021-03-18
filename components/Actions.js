import React, { Component } from 'react'
import Icon from './Icon'

export default class Actions extends Component {

  listLinkedActions = (action) => {
    if(action && typeof(action.linked) === 'object'){
      return (

        <div className={`text-${action.linked.difficulty.toLowerCase()}-500 text-md linked-action`}>
          <Icon name={`${action.linked.type.toLowerCase().replace(/\s/g, '')}`}/>
        </div>
      )
    }
  }

  listActions = (list = []) => {
    return list.map( (action,i) => {
      let triangle = [];
      if(typeof(action.linked) === 'object'){
        triangle.push(<div className="flex jusitfy-center items-center">&#9654;</div>)
      }
        return (
        <div className={`border-bottom-2 border-white py-4 flex justify-center ${action.linked ? 'linked' : ''}`}>
          <div className={`text-${action.difficulty.toLowerCase()}-600 ${typeof(action.linked) === 'object' ? 'text-md' : 'text-2xl'}`}>
            <Icon name={`${action.type.toLowerCase().replace(/\s/g, '')}`}/>
          </div>
          {triangle}
          {this.listLinkedActions(action)}
        </div>
      )
    })  
  }

  render() {
    return (
      <div>
        <button className="text-white bg-red-900 rounded-full mt-4 py-1 px-2 ring-2 ring-red-400 mx-auto block border-0 border-transparent" onClick={this.props.drawDamage}>Hit  +</button>
        {this.listActions(this.props.actions)}
      </div>
    )
  }
}
