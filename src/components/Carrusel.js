import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../Carrusel.css';
import { baseUrl } from '../BaseUrl.js';
import { categories } from '../Categories.js';

class MovieDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movies: []
        };
    }

    componentDidMount() {
        fetch(baseUrl + 'movies/')
        .then(res => res.json())
        .then(movies => this.setState({
            movies: movies
        }) );
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
                    <NavLink to={`/details/${movie._id}`}>
                        <img src={movie.posterImageUrl} alt={movie.title}/>
                    </NavLink>
                );
            });
        
        return (
            <div className="scrollcontainer">
                <div className="category">
                    {this.getTitle(this.props.category)}
                </div>
                <div className="scrollmenu">
                    {movies}
                </div>
            </div>
        );    
    }
    
}

export default MovieDetails;