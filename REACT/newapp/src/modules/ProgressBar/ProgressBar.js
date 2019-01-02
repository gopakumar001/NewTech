import React from 'react';
import "./ProgressBar.scss";

const progressBar = (props) => {

    const width  = (props.progress > 100 ? 100 : props.progress) + "%";
    return (<div className="progress-bar-cntr" >
        <div className="bar" style={ {width: width} }></div>
    </div>);
}

export default progressBar;