import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { baseUrl } from '../BaseUrl.js';
import '../Recent.css';

class RecentMovies extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movies: []
        };
    }

    componentDidMount() {
        fetch(baseUrl + 'movies/?limit=5&offset=0&sort=-release')
        .then(res => res.json())
        .then(movies => this.setState({
            movies: movies
        }) );
    }

    render () {

        const movies = this.state.movies.map((movie) => {
            return (
                <div className="poster-img">
                    <NavLink to={`/details/${movie._id}`}>
                        <img src={movie.posterImageUrl} alt={movie.title} className="poster-img" />
                    </NavLink>
                    <br/>{new Date(movie.release).getFullYear()}
                </div>
            );
        });

        return (
            <div className="flex-container">
                {movies}
            </div>
        );    
    }
    
}

export default RecentMovies;