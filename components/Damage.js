import React, { Component } from 'react'
import { formatDiagnosticsWithColorAndContext } from 'typescript'
import Icon from './Icon'

export default class Damage extends Component {
  state = {
    card: {},
    crit: false,
  }

  componentDidMount() {
    this.setState({card: this.props.card.card})
  }

  flipCard = () => {
    console.log('flip damage')
    this.setState({ crit: this.state.crit ? false : true })
    this.props.updateDamage({ card: this.state.card, crit: this.state.crit ? false : true},this.props.index)
  }
  render() {
    return (
      <div className={`px-1`} onClick={this.flipCard}>
        <Icon name={`${this.state.crit ? 'crit' : 'hit'}`}/>
      </div>
    )
  }
}
