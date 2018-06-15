import React, { Component } from "react";
import axios from "../axios";
import "../css/Homepage.css";
import NavBar from "../components/NavBar";

class Homepage extends Component {
  state = {
    playersName: ["", "", "", ""]
  };

  handleChange = (index, value) => {
    const newPlayersName = this.state.playersName.map(
      (pValue, pIndex) => (pIndex === index ? value : pValue)
    );
    this.setState({ playersName: newPlayersName });
  };

  _handleSubmit = event => {
    event.preventDefault();
    const obj = this.state.playersName.reduce((acc, cur, i) => {
      acc[`name${i + 1}`] = cur;
      return acc;
    }, {});
    axios
      .post("/api/games", obj)
      .then(data => this.props.history.push(`/${data.data.id}`))
      .catch(err => console.error(err));
  };

  render() {
    const nameInputs = this.state.playersName.map((value, index) => (
      <input
        type="text"
        className="name-field"
        placeholder={`Player ${index + 1} name`}
        key={`name${index + 1}`}
        onChange={event => this.handleChange(index, event.target.value)}
      />
    ));

    return (
      <div>
        <NavBar />
        <form onSubmit={this._handleSubmit}>
          {nameInputs}
          <div className="text-center">
            <input type="submit" value="CREATE NEW GAME" className="btn" />
          </div>
        </form>
      </div>
    );
  }
}

export default Homepage;
