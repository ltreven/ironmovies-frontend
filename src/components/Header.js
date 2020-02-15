import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';
import '../Header.css';

class Header extends Component {

    render () {
        return (
            <div className="header">
                <div className="logo">
                    <NavLink to="/home">&nbsp;&nbsp;&nbsp;&nbsp;</NavLink>
                </div>
                <div className="title">
                    Iron Movies
                </div>
                <div className="filter">
                    <NavLink to="/list">ALL</NavLink>
                </div>
                <div className="search">
                    <input type="text" id="search" value="(search)" />
                </div>
                <div className="add">
                    <NavLink to="/details">ADD</NavLink>
                </div>
                <div className="avatar">
                    &nbsp;
                </div>
            </div>
        );    
    }
    
}

export default Header;