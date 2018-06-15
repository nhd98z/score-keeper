import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./css/App.css";
import NavBar from "./components/NavBar";
import CreateNewGame from "./components/CreateNewGame";
import Play from "./components/Play";

class App extends Component {
  state = {
    initializing: true
  };

  playersName = [];

  _startGame = playersName => {
    this.playersName = playersName;
    this.setState({ initializing: false });
  };
  render() {
    const status =
      this.state.initializing ? (
        <CreateNewGame startGame={this._startGame} />
      ) : (
        <Play playersName={this.playersName} />
      );
    return (
      <div className="App container">
        <NavBar />
        {status}
      </div>
    );
  }
}

export default App;
