import React from 'react';
import Cell from './Cell';
const Row = (props) => {
    return (
        <li className={props.header ? 'my-list__row header' : 'my-list__row'} >
            {props.cells.map((cell, index) => <Cell {...cell} index={index} />)}
        </li>
    );
};

export default Row;