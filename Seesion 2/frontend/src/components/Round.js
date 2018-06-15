import React, { Component } from "react";
import ScoreInput from "./ScoreInput";

class Round extends Component {
  _handleChange = (r, i, v) => {
    this.props.handleChange(r, i, v);
  };

  render() {
    return (
      <div className="row text-center py-2">
        <div className="col-3">{`Round ${this.props.round + 1}`}</div>
        {this.props.scoresInSpecificRound.map((value, index) => (
          <div className="col-2" key={`scoresInSpecificRound${index + 1}`}>
            <ScoreInput
              handleChange={this._handleChange}
              round={this.props.round}
              index={index}
              value={value}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default Round;
