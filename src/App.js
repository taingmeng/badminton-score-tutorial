import React, { Component } from 'react';
import './App.css';
import annyang from './Annyang'

class App extends Component {
  constructor() {
    super();
    this.state = {
      players: [
        {
          name: 'Player 1',
          score: 0,
          commands: ["You can't see me"]
        },
        {
          name: 'Player 2',
          score: 0,
          commands: ["I'm the king"]
        }
      ],
      serverHistory: [],
      voiceStatus: 'hello',
      voiceInput: ['hello world', 'halo war', 'hallow world']
    };
  }

  componentDidMount() {
    annyang.addCommands(this.reset, this.change, this.undo)
    annyang.addCallback(this.engineCallback, this.resultCallback)
    annyang.start()

    this.setState({
      voiceStatus: annyang.isSupported() ? 'Supported' : 'Unsupported'
    })
  }

  componentWillUnmount() {
    annyang.abort()
  }

  engineCallback = (status) => {
    this.setState({
      voiceStatus: status
    })
  }

  resultCallback = (voiceInput) => {
    this.setState({
      voiceInput: voiceInput
    })
    voiceInput.some(phrase => {
      return this.state.players.some((player, playerIndex) => {
        if (player.commands.map(command => command.toLowerCase()).includes(phrase.trim().toLowerCase())) {
          this.increaseScore(playerIndex)
          return true
        }
        return false
      })
    })
  }

  increaseScore(playerIndex) {
    const players = this.state.players.slice()
    players[playerIndex].score += 1
    this.setState({
      players: players,
      serverHistory: [...this.state.serverHistory, playerIndex]
    })
  }

  reset = () => {
    const players = this.state.players.slice()
    players.forEach(player => player.score = 0)
    this.setState({
      players: players,
      serverHistory: []
    })
  }

  change = () => {
    this.setState({
      players: this.state.players.reverse()
    })
  }

  undo = () => {
    const serverHistory = this.state.serverHistory
    if (serverHistory.length == 0) {
      return
    }
    const lastServerIndex = serverHistory[serverHistory.length - 1]
    const players = this.state.players.slice()
    players[lastServerIndex].score -= 1
    this.setState({
      players: players,
      serverHistory: serverHistory.slice(0, -1)
    })
  }

  servingFromRight() {
    const playerIndex = this.state.serverHistory[this.state.serverHistory.length - 1] || 0;
    const score = this.state.players[playerIndex].score;
    return score % 2 == 0;
  }

  render() {
    let names;
    if (this.servingFromRight()) {
      names = ['', this.state.players[1].name,
        this.state.players[0].name, ''];
    } else {
      names = [this.state.players[0].name, '',
        '', this.state.players[1].name];
    }

    const boxStyle = (text) => {
      return { background: text ? 'lightgreen' : 'transparent' }
    }

    return (
      <div>
        <div className="score-container">
          <div className="score">{this.state.players[0].score}</div>
          <div>
            <div className="court-row">
              <div className="box" style={boxStyle(names[0])}>{names[0]}</div>
              <div className="box" style={boxStyle(names[1])}>{names[1]}</div>
            </div>
            <div className="court-row">
              <div className="box" style={boxStyle(names[2])}>{names[2]}</div>
              <div className="box" style={boxStyle(names[3])}>{names[3]}</div>
            </div>
          </div>
          <div className="score">{this.state.players[1].score}</div>
        </div>
        <div className="info-container">
          <div className="voice-status">
            {'Voice Status: '}
            <span style={{ fontWeight: 'bold' }}>
              {this.state.voiceStatus.toUpperCase()}
            </span>
          </div>
          <div className="voice-input">
            {
              this.state.voiceInput.map((input, index) => {
                return <li>{input}</li>
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
