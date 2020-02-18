import React, { Component } from 'react';
import { Button } from 'reactstrap';
import MovieCard from './MovieCard';
import { baseUrl } from '../BaseUrl.js';
import '../Results.css';

class Results extends Component {

    constructor(props) {
        super(props);

        let search = (new URLSearchParams(window.location.search)).get('q');
        if (search == null) {
            search = '';
        }
        let sort = (new URLSearchParams(window.location.search)).get('sort');
        if (sort == null) {
            sort = '';
        }

        this.state = {
            movies: [],
            limit: 5,
            offset: 0,
            sort: sort,
            search: search,
            nomore: false
        };

        this.sort = this.sort.bind(this);

        this.fetchMovies(null, null);
    }

    componentDidUpdate(prevProps) {
        let search = (new URLSearchParams(window.location.search)).get('q');
        if (search == null) {
            search = '';
        }
        if (this.state.search !== search) {
            let sort = (new URLSearchParams(window.location.search)).get('sort');
            if (sort == null) {
                sort = '';
            }
            
            this.fetchMovies(sort, search);
        }
      }

    fetchMovies(sort, search) {
        let offset = this.state.offset;
        let nextmovies = this.state.movies;
        if (sort !== null || search != null) {
            offset = 0;
            nextmovies = [];
        }
        if (sort == null) {
            sort = this.state.sort;
        }
        if (search == null) {
            search = this.state.search;
        }
        const filter = 'limit=' + this.state.limit +
                    '&offset=' + offset + 
                    '&sort=' + sort + 
                    '&search=' + search;

        fetch(baseUrl + 'movies/?' + filter)
        .then(res => res.json())
        .then((movies) => {
            this.setState({
                movies: [...nextmovies, ...movies ],
                offset: offset + this.state.limit,
                sort: sort,
                search: search,
                nomore: movies.length === 0
            });    
        })
        .catch((err) => {
            alert("Could not load data from " + baseUrl + 'movies/?' + filter);
        });
    }

    loadMore = (event) => {
        this.fetchMovies(null, null);
    }

    sort = (sort) => (event) => {
        this.fetchMovies(sort, null);
    }

    render () {

        const movies = this.state.movies.map((movie) => {
            return (
                <div>
                    <MovieCard movie={movie} see={`/details/${movie._id}`} edit={`/edit/${movie._id}`} />
                </div>
            );
        });

        const loadMore = () => {
            
            if (this.state.nomore) return (<></>);

            return(
                <div className="load-more">
                    <Button onClick={this.loadMore}>
                        LOAD MORE
                    </Button>
                </div>
            );
        }

        return (
            <>
            <div className="pagetitle">
                <div className="sort">
                    <div className="but-sort">
                        <Button onClick={this.sort('-release')}>
                            sort by newest
                        </Button>
                    </div>
                    <div className="but-sort">
                        <Button onClick={this.sort('title')}>
                            sort by title
                        </Button>
                    </div>
                </div>
                <div className ="title">
                    Results
                </div>
            </div>
            <div className="flex-container">
                {movies}
                {loadMore()}
            </div>
            <br/>
            <br/>
            <br/>
            </>
        );    
    }
    
}

export default Results;