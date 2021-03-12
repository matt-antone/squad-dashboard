import { default as listData } from '../json/sample-list';
import { default as Icon } from './icon'
import { default as Pilots } from './pilots'

export default function Squad (props) {
  return (
    <div>
      <h1><Icon name={listData.faction}/> {listData.name} <small>{listData.faction}&nbsp;({listData.points} points)</small></h1>
      <p>{listData.description}</p>
      <Pilots list={listData.pilots} faction={listData.faction}/>
    </div>
  )
}