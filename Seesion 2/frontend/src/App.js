import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";
import Homepage from "./containers/Homepage";
import PlayGame from "./containers/PlayGame";
import { BrowserRouter, Route } from "react-router-dom";

// FIXED PROBLEM 1 : Khi chuyển từ số âm sang số dương hoặc ngược lại sẽ bị auto chuyển thành số 0
// FIXED PROBLEM 2 : Thỉnh thoảng ấn ADD ROUND app không render ra page mới

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App container">
          <Route exact path="/" component={Homepage} />
          <Route exact path="/:gameId" component={PlayGame} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
