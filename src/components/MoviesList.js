import React, { Component } from 'react';

import Carrusel from './Carrusel';

class MoviesList extends Component {

    render () {

        return (
            <div>
                <br/>
                <Carrusel category="documentary" />
                <br/><br/><br/>
                <Carrusel category="drama" />
                <br/><br/><br/>
                <Carrusel category="comedy" />
                <br/><br/><br/>
                <Carrusel />
            </div>
        );    
    }
    
}

export default MoviesList;