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

  render() {
    let names = ['', this.state.players[1].name, this.state.players[0].name, ''];
    return (
      <div>
        <div className="score-container">
          <div className="score">{this.state.players[0].score}</div>
          <div>
            <div className="court-row">
              <div className="box">{names[0]}</div>
              <div className="box">{names[1]}</div>
            </div>
            <div className="court-row">
              <div className="box">{names[2]}</div>
              <div className="box">{names[3]}</div>
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
