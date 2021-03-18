import React, { Component } from 'react'
import { default as icons } from '../json/icons'

export default class Icon extends Component {
  render() {
    const {props} = this
    if( typeof(props.name) !== 'undefined' ){  
      const iconClass = icons[props.name];
      if(typeof(iconClass) !== 'undefined'){
        const iconType = iconClass.includes("font") ? "font" : "ship"
        return (
          <i aria-hidden="true" className={`xwing-miniatures-${iconType} ${iconClass} ${props.color}`}></i>
        )  
      }
    }
    return (
      <span></span>
    )
  }
}
