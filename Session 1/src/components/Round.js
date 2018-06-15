import React, { Component } from "react";
import ScoreInput from "./ScoreInput";

class Round extends Component {
  _handleChange = (r, i, v) => {
    let newScores = [];
    for (let round = 0; round < this.props.scores.length; round++) {
      if (round === r) {
        let score = [];
        for (let index = 0; index < 4; index++)
          if (index === i) score.push(v);
          else score.push(this.props.scores[round][index]);
        newScores.push(score);
      } else {
        newScores.push(this.props.scores[round]);
      }
    }
    this.props.handleChange(newScores);
  };

  render() {
    return (
      <div className="row text-center py-2">
        <div className="col-3">{`Round ${this.props.round}`}</div>
        {this.props.scoreArr.map((value, index) => (
          <div className="col-2">
            <ScoreInput handleChange={this._handleChange} round={this.props.round} index={index} value={value}/>
          </div>
        ))}
      </div>
    );
  }
}

export default Round;
