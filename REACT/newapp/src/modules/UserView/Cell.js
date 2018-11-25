import React from 'react';
const Cell = (props) => {

    var cellCls = "my-list__row__cell";
    return (
        <div className={cellCls + " " + (props.cls || "cell"+props.index)}>{props.icon ? <img className={cellCls+"__img"} src={props.src} alt={props.alt} /> : props.content}</div>
    );
}
export default Cell;