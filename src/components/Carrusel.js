import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../Carrusel.css';
import { baseUrl } from '../BaseUrl.js';
import { categories } from '../Categories.js';
import MovieCard from './MovieCard';

class MovieDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            error: null
        };

        this.loadMovies();
    }

    loadMovies = () => {
        fetch(baseUrl + 'movies/')
        .then(res => res.json())
        .then(movies => this.setState({
            movies: movies
            })
        )
        .catch((err) => {
            const msg = "Could not load data from " + baseUrl + "movies/ "
            console.log(msg, err);
            this.setState({
                error: msg
            })
        });
    }

    findMoviesByCategory = (category) => {
        if (category) {
            return this.state.movies.filter((movie) => movie.category === category);
        } 
        return this.state.movies;
    }

    getTitle = (category) => {
        if (category) {
            const catObj = categories.filter((cat) => cat.id === category);
            return catObj.length > 0 ? catObj[0].title : "Category not found: " + category;    
        } 
        return "All Movies";
    }

    render () {

        const movies = this.findMoviesByCategory(this.props.category).map((movie) => {
            return (
                <div className="card">
                    <MovieCard movie={movie} see={`/details/${movie._id}`} edit={`/edit/${movie._id}`} />
                </div>
            );
        });

        const errorMsg = () => {
            return (
                <div className="error">
                    ERROR Loading movies: {this.state.error}
                </div>
            );
        }

        const empty = () => {
            return (
                <div className="empty">
                    No Movies here yet :(
                </div>
            );
        }

        let show  = movies;
        
        if (this.state.error !== null) {
            // show error message
            show = errorMsg();
        } else if (!movies || movies.length === 0) {
            // show empty
            show = empty();
        }

        return (
            <div className="scrollcontainer">
                <div className="category">
                    {this.getTitle(this.props.category)}
                </div>
                {show}
            </div>
        );    
    }
    
}

export default MovieDetails;