import React, { Component } from 'react'
import Icon from './Icon'

export default class Charge extends Component {
  state = {
    active: true
  }

  toggleCharge = (e) => {
    e.preventDefault()
    this.setState({active: this.state.active ? false : true })
  }

  render() {
    return (
      <div className={`text-md text-center mx-1 leading-6 mt-2 w-8 h-8 p-0 ring-4 ring-opacity-50 rounded-full ${ this.state.active ? 'ring-yellow-500 text-yellow-500' : 'ring-red-900 text-red-900' }`} onClick={this.toggleCharge}>
        <Icon name="charge"/>
      </div>
    )
  }
}
