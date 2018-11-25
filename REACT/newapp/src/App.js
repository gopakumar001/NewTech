import React, { Component } from 'react';
import Header from './modules/header';
import UserView from './modules/UserView/UserView';
import { FaEye } from 'react-icons/fa';

class App extends Component {

  state = {
    results : []
  }

  componentDidMount() {
    fetch("https://randomuser.me/api/?results=10", { dataType: 'json' })
      .then( res => res.json())
      .then( result => {
        this.setState({
          results : result.results
        });
      });
  }

  render() {
    return (
      <div className="App"> 
        <UserView listdata={this.state.results} />
      </div>
    );
  }
}

export default App;
