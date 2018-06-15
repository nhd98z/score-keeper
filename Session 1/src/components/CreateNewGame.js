import React, { Component } from "react";

import "../css/CreateNewGame.css";

class CreateNewGame extends Component {
  state = {
    playersName: ["", "", "", ""]
  };

  handleChange = (index, value) => {
    const newPlayersName = this.state.playersName.map(
      (pValue, pIndex) => (pIndex === index ? value : pValue)
    );
    this.setState({ playersName: newPlayersName });
  };

  _onClick = () => this.props.startGame(this.state.playersName);

  render() {
    const nameInputs = this.state.playersName.map((value, index) => (
      <input
        type="text"
        className="name-field"
        placeholder={`Player ${index + 1} name`}
        onChange={event => this.handleChange(index, event.target.value)}
      />
    ));

    return (
      <form>
        {nameInputs}
        <div className="text-center">
          <input
            type="submit"
            value="CREATE NEW GAME"
            className="btn"
            onClick={this._onClick}
          />
        </div>
      </form>
    );
  }
}

export default CreateNewGame;
