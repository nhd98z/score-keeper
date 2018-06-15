import React, { Component } from "react";

import "../css/Play.css";
import Round from "./Round";

class Play extends Component {
  state = {
    // Single Source Truth
    scores: [[1, 2, 3, 4], [2, 3, 4, 5]]
  };

  _addRound = () => {
    this.setState({
      scores: [...this.state.scores, [0, 0, 0, 0]]
    });
  };

  _handleChange = newScores => {
    this.setState({ scores: newScores });
  };
  
  render() {
    (() => {
      console.log(this.state.scores);
    })();

    const playersNameDisplay = this.props.playersName.map(name => (
      <strong className="col-2">{name}</strong>
    ));

    const sosArr = this.state.scores.reduce(
      (sumArr, round) =>
        sumArr.map((playerSum, index) => playerSum + round[index]),
      [0, 0, 0, 0]
    );

    const sopDisplay = sosArr.map(num => (
      <strong className="col-2">{num}</strong>
    ));
    const sos = sosArr.reduce((total, num) => total + num, 0);

    const roundsDisplay = this.state.scores.map((scoreArr, round) => (
      
        <Round scores={this.state.scores} scoreArr={scoreArr} round={round} handleChange={this._handleChange}/>
      
    ));

    return (
      <div>
        <div className="row text-center py-2">
          <div className="col-3" />
          {playersNameDisplay}
        </div>
        <div className="row text-center sos py-2">
          <strong className="col-3">{sos}</strong>
          {sopDisplay}
        </div>
        {roundsDisplay}
        <div className="text-center">
          <input
            type="button"
            className="btn mx-auto mt-5 px-5 py-2"
            onClick={this._addRound}
            value="ADD ROUND"
          />
        </div>
      </div>
    );
  }
}

export default Play;
