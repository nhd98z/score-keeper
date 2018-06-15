import React, { Component } from "react";
import "../css/PlayGame.css";
import axios from "../axios";
import Round from "../components/Round";
import NavBar from "../components/NavBar";

class PlayGame extends Component {
  state = {
    // Single Source Truth
    scores: [],
    playersName: []
  };

  componentDidMount() {
    axios
      .get(`/api/games/${this.props.match.params.gameId}`)
      .then(data => {
        console.log(this.props);
        var newScores = [];
        for (let elementOfScores of data.data.scores)
          newScores = [...newScores, elementOfScores.round];
        this.setState({
          scores: newScores,
          playersName: data.data.playersName
        });
      })
      .catch(err => console.error(err));
  }

  _addRound = () => {
    axios
      .put(`/api/games/${this.props.match.params.gameId}`)
      .then(this.setState({ scores: [...this.state.scores, [0, 0, 0, 0]] }))
      .catch(err => console.error(err));
  };

  _handleChange = (r, i, v) => {
    axios
      .put(`/api/games/${this.props.match.params.gameId}/update`, {
        round: r + 1,
        index: i + 1,
        value: v
      })
      .then(data => {
        this.setState({
          // [
          //   [. . . .],
          //   [. . . .],
          //   [. . * .]
          // ]
          scores: this.state.scores.map(
            (scoresInSpecificRound, round) =>
              round === r
                ? scoresInSpecificRound.map(
                    (value, index) => (index === i ? v : value)
                  )
                : scoresInSpecificRound
          )
        });
      })
      .catch(err => console.error(err));
  };

  render() {
    const playersNameDisplay = this.state.playersName.map((name, index) => (
      <strong key={`playersName ${index}`} className="col-2">
        {name}
      </strong>
    ));

    // [
    //   1. [. . . .],
    //   2. [. . . .],     => [. . . .] (= array_1 + array_2 + array_3)
    //   3. [. . . .]
    // ]
    const sumScoresOfPlayers = this.state.scores.reduce(
      (total, round) =>
        total.map(
          (sumScoresOfPlayer, index) => sumScoresOfPlayer + round[index]
        ),
      [0, 0, 0, 0]
    );

    const sumScoresOfPlayersDisplay = sumScoresOfPlayers.map((num, index) => (
      <strong key={`sumScoresOfPlayers${index + 1}`} className="col-2">
        {num}
      </strong>
    ));

    const totalsumScoresOfPlayers = sumScoresOfPlayers.reduce(
      (total, num) => total + num,
      0
    );

    const roundsDisplay = this.state.scores.map(
      (scoresInSpecificRound, round) => (
        <Round
          key={`round${round + 1}`}
          scoresInSpecificRound={scoresInSpecificRound}
          round={round}
          handleChange={this._handleChange}
        />
      )
    );

    return (
      <div>
        <NavBar />
        <div className="row text-center py-2">
          <div className="col-3" />
          {playersNameDisplay}
        </div>
        <div className="row text-center sos py-2">
          <strong className="col-3">{totalsumScoresOfPlayers}</strong>
          {sumScoresOfPlayersDisplay}
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

export default PlayGame;
