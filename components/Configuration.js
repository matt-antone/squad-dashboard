import React, { Component } from 'react'
import Icon from './Icon'
export default class Configuration extends Component {
  state = {
    activeSide: 0,
    buttonText: [
      "Activate",
      "Deactivate",
    ]
  }

  turnCardOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.setState({ activeSide: (1 - this.state.activeSide) })
  }

  componentDidMount() {
    //console.log(this.props.upgrade.sides)
  }

  cardTitle = (upgrade) => {
    switch(true){
      default:
        return upgrade.sides[this.state.activeSide].title
    }
  }

  render() {
    const { state, props } = this
    const { upgrade } = this.props

    return (
      <details className={`${upgrade.type} py-2`}>
        <summary className={`font-bold overflow-hidden text-md flex justify-between items-center`}>
          <span className={ state.activeSide === 0 && props.upgrade.sides.length > 1 ? 'text-gray-400' : 'text-white' }>
            <Icon name="config"/> {this.cardTitle(upgrade)}
          </span>
          <div className={`w-10 h-4 flex items-center bg-gray-400 rounded-full p-1 ${ upgrade.sides.length === 1 ? 'hidden' : '' }`} onClick={this.turnCardOver}>
            <div className={`w-4 h-4 rounded-full shadow-md duration-300 ease-in-out transform ${ state.activeSide === 0 ? 'bg-gray-200' : 'bg-blue-500 translate-x-4'}`}></div>
          </div>
          {/* <button 
            className={`text-xs mx-1 bg-blue-500`}
            onClick={this.turnCardOver}
          >{state.buttonText[state.activeSide]}</button> */}
        </summary>
        {upgrade.sides[this.state.activeSide].ability}
      </details>
    )
  }
}
