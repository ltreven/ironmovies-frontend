import React, { Component } from 'react';
import Carrusel from './Carrusel';
import '../Home.css';

class HomePage extends Component {

    render () {
        return (
            <div className="homepage">
                <div className="feat1">
                    <div className="feat1text">
                        <div className="feat1text1">
                            IRON MOVIES
                        </div>
                        <div className="feat1text2">
                            PUBLISH, SHARE AND WATCH INCREDIBLE MOVIES
                        </div>
                    </div>
                </div>
                <div className="highlight-feat2">
                    SOME TEXT THAT WILL DISAPPEAR WHEN RESIZING
                </div>
                <div className="feat2">
                    
                </div>
                <div className="carrusel">
                    <Carrusel category="comedy"/>
                </div>
                <div className="feat3">
                    PUBLISH HERE YOUR FAVORITE MOVIES
                </div>
            </div>
        );    
    }
    
}

export default HomePage;