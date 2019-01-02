import React from 'react';
import "./Counter.scss";

const counter = (props) => {
    return (
    <div className="counter">
        <div className="value" >{props.value}</div>
        <div className="footer" > 
            <button onClick={props.increment}>+</button>
            <button onClick={props.decrement}>-</button>
        </div>
    </div>);
};

export default counter;