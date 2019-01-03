import React, { Component } from 'react';
import LoginPage from './modules/Login/LoginPage';
import MainPage from './modules/Main/MainPage';
import {BrowserRouter, Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
        <Route path="/login" exact component={LoginPage} />
        <Route path="/main" exact component={MainPage} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
