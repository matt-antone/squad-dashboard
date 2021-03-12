import { default as icons } from '../json/icons'

export default function Icon (props) {
  if( typeof(props.name) !== 'undefined' ){  
    const iconClass = icons[props.name];
    const iconType = iconClass.includes("font") ? "font" : "ship"
    return (
      <i aria-hidden="true" className={`xwing-miniatures-${iconType} ${iconClass} ${props.color}`}></i>
    )
  }
  return (
    <span></span>
  )
}
