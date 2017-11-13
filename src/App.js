import React, { Component } from 'react';
import './App.css';

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
      return { background: text ? 'lightgreen' : 'null' }
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
