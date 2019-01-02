import React, { Component } from 'react';
import Header from './modules/header';
import UserView from './modules/UserView/UserView';
import { FaEye } from 'react-icons/fa';
import Counter from './modules/Counter/CounterWidget';
import {connect} from 'react-redux';
import ProgressBar from './modules/ProgressBar/ProgressBar';
class App extends Component {

  state = {
    results : [],
    progress: 1
  }

  componentDidMount() {
    console.log("did mount");
    fetch("https://randomuser.me/api/?results=10", { dataType: 'json' })
      .then( res => res.json())
      .then( result => {
        this.setState({
          results : result.results
        });
      });


      var intervalId = setInterval(() => {
        this.setState((prevState) => {
            var newProgress = prevState.progress + 5;
            if(newProgress >= 100)
              clearTimeout(intervalId);
            console.log(newProgress);
            return {
                ...prevState,
                progress: newProgress
            }
        });
      },1000)
  }

  render() {
    return (
      <div className="App"> 
        <UserView listdata={this.state.results} />
        <Counter  value={this.props.value}  decrement={this.props.decrement} increment={this.props.increment}/>
        <div style={{ width: '300px', padding: '10px;'}}>
          <ProgressBar progress={this.state.progress} /> 
        </div>
      </div>
    );
  }
}

const mapStateToProp = (state) => {
  return {
    value: state.counterReducer.counter
  }
}

const mapActionToProp = (dispatch) => {

    return {
      increment : () => {
        setTimeout(() => {
          dispatch({ type: "PLUS" })
        },3000);
      },
      decrement : () => dispatch({ type: "MINUS"})
    };

}

export default connect(mapStateToProp, mapActionToProp)(App);

