import React, { Component } from 'react';
import "./header.css";

class Header extends Component {

    render() {
        return (
            <h1 className="my-header" >{this.props.children}</h1>
        );
    }
}

export default Header;