import React, { Component } from 'react'
import Icon from './Icon'
export default class ForceCharge extends Component {
  state = {
    active: true
  }

  toggleForce = (e) => {
    e.preventDefault()
    this.setState({active: this.state.active ? false : true })
  }

  render() {
    return (
      <div className={`text-md text-center mx-1 leading-6 mt-2 w-8 h-8 p-0 ring-4 ring-opacity-50 rounded-full ${ this.state.active ? 'ring-purple-300 text-purple-300' : 'ring-red-900 text-red-900' }`} onClick={this.toggleForce}>
        <Icon name="forcecharge"/>
      </div>
    )
  }
}
