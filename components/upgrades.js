export default function Upgrades(props) {
  const upgrades = []
  for( const upgradeType in props.list ){
    if (Object.prototype.hasOwnProperty.call(props.list, upgradeType)) {
      upgrades.push(<li>{upgradeType}<ul>{props.list[upgradeType].map((upgrade,i) => <li>{upgrade}</li>)}</ul></li>)
    }
  }
  return (
    <div>
      <h3>Upgrades</h3>
      <ul>
        {upgrades}
      </ul>
    </div>
  )
}