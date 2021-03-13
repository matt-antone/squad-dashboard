import React, { Component } from 'react'
import { default as listData } from '../json/sample-list';
import manifestData from '../data/manifest.json'
import { default as Pilots } from './Pilots'

const loadManifest = () => JSON.parse(JSON.stringify(manifestData));

class Squad extends Component {
  state = { 
    squad: listData,
    manifest: loadManifest(),
  }

  loading = {
    active: false,
    fetches: []
  }


  setManifest = (json) => {
    this.setState({manifest: json})
  }

  getManifest = async () => {
    const { squad } = this.state
    fetch('/data/manifest.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    ).then((response) => {
      return response.json()
    }).then((manifest) => {
      this.setManifest(manifest)
      this.getData(manifest)
    });
  }

  getData = async (manifest) => {
    const getProperty = (val,property) => {
      this.loading.active = true
      this.loading.fetches.push(
        fetch(val).then((response) => {
          return response.json()
        }).then((data) => {
          if(typeof(this.state[property]) === 'undefined'){
            const newState = {}
            newState[property] = []
            this.setState(newState)
          }
          const joined = this.state.[property].concat(data)
          const newData = {}
          newData[property] = joined
          this.setState(newData)
          this.loading.active = false
          return property
        }).catch(status, err => {return console.log(status, err);})
      )
    }

    for(const property in manifest ){
      if(Array.isArray(manifest[property])){
        manifest[property].map( val => {
            switch(true){
            case typeof(val) === 'string':
              getProperty(val,property)
              break
            case typeof(val) === 'object':
              for(const property in val){
                if(Array.isArray(val[property])) {
                  val[property].map( (i) => {
                    getProperty(i,property)
                  })
                }      
              }
          }
        })
      }
    }
    Promise.all(this.loading.fetches).then( (a) => {
      console.log(a,this.loading)
      if(!this.loading.active){
        console.log (this.state);
        this.getShips()
      }
    });
  }

  getShips = () => {
    console.log('gettingships')
    const { squad,ships } = this.state
    const pilots = []
    squad.pilots.forEach( (pilot,i) => {
      const { upgrades } = pilot
      const ship = ships.filter(obj => obj.xws === pilot.ship)[0]
      const data = ship.pilots.filter(obj => obj.xws === pilot.id)[0]
      data.id = i
      data.stats = ship.stats
      data.actions = ship.actions
      data.upgrades = []
      for( const property in upgrades){
        const upgrade = upgrades[property][0]
        let upgradeData = this.state.upgrades.filter( obj => obj.xws === upgrade )[0]
        upgradeData.type = property
        data.upgrades.push(upgradeData)
      }
      data.hp = this.getHitPoints(data)
      pilots.push(data)
    })
    this.setState({pilots: pilots})
  }

  getUpgrades = (pilot) => {
    console.log();
  }

/**
 * Get Hit Points
 **/
  
  getHitPoints = (ship) => {
    let hp = 0;
    const hpStats = ship.stats.filter( obj => obj.type === 'hull')
    hpStats.map( stat => {
      hp += stat.value
    })
    if(typeof(ship.upgrades) !== 'undefined'){
      console.log('ship has upgrades')
      const hpUpgrades = ship.upgrades.filter( obj => obj.xws === 'shieldupgrade'  || obj.xws === 'hullupgrade' )
      hpUpgrades.map( upgrade => {
        upgrade.sides.map( side => {
          console.log(side.grants)
          if(typeof(side.grants) !== 'undefined'){
            side.grants.map( grant => {
              if(grant.value === 'shields' || grant.value === 'hull'){
                hp += grant.amount
              }
            })  
          }
        })
      } )  
    }
    return hp;
  }
 
  componentDidMount = () => {
    // console.log('loaded');
    this.getManifest()
  }

  render() { 
    const { squad, pilots } = this.state
    return ( 
      <div className={`squad`}>
        <h1 className="pb-5">{squad.name} <small>({squad.points})</small></h1>
        <h2 className="text-lg">{squad.version}</h2>
        <Pilots pilots={pilots} faction={squad.faction}/>
      </div>
     );
  }
}
 
export default Squad;