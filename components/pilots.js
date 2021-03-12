import { default as Upgrades } from './upgrades'

export default function Pilots (props) { 
  return (
    <div>
      <h2>Pilots</h2>
      <ol>
        {props.list.map((pilot, i) => 
          <li key={pilot + i}>
            {pilot.id}({pilot.points})<br/>
            <Upgrades list={pilot.upgrades}/>
          </li>
        )}
      </ol>
    </div>
  )
}