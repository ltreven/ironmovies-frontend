import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { Button } from 'reactstrap';
import Cookies from 'universal-cookie';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../Details.css';
import { baseUrl } from '../BaseUrl.js';

class MovieDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            movie: {},
            redirect: false
        }
        this.handleDelete = this.handleDelete.bind(this);
    }

    deleteMovie() {
        const cookies = new Cookies();

        fetch(baseUrl + 'movies/' + this.state.movie._id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + cookies.get("iron-token")
            },
            method: 'DELETE'
        })
        .then((res) => {
            if (!res.ok) {
                if (res.status === 401) {
                    alert('Unauthorized. Please login.');
                }
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then((movie) => {
            this.setState({
                movie: {},
                redirect: true
            });
            alert("Movie deleted successfully!"); 
        })
        .catch((err) => alert("Could not delete movie. "));            

    }

    handleDelete(event) {
        
        confirmAlert({
            title: 'Attention',
            message: 'Do you really want to DELETE this movie?',
            buttons: [
            {
                label: 'Yes',
                onClick: () => this.deleteMovie()
            },
            {
                label: 'No'
            }
            ]
        });
          

    }

    componentDidMount() {
        const pathName = window.location.pathname;
        const pathSplit = pathName.split('/');
        const pMovieId = pathSplit[pathSplit.length-1];

        fetch(baseUrl + 'movies/' + pMovieId)
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then((movie) => {
            this.setState({
                movie: movie
            });

        })
        .catch(err => console.log("THERE IS AN ERROR: ", err));
    }

    render () {

        if (this.state.redirect) {
            const redirect = '/list';
            return (
                <div>
                    <Redirect to={redirect} />
                </div>
            );
        }

        const dateOpt = { year: 'numeric', month: 'long', day: 'numeric' };
        const theDate = new Date(this.state.movie.release);
        const releaseDate = theDate.toLocaleDateString("en-US", dateOpt);

        const details = () => {
            if (this.state.movie._id) {
                return(
                    <div className="details-grid-container">
                        <div className="movietitle">
                            {this.state.movie.title}
                        </div>
                        <div className="poster">
                            <img src={this.state.movie.posterImageUrl} alt={this.state.movie.title} />
                        </div>
                        <div className="director">
                            Director: {this.state.movie.director}
                        </div>
                        <div className="release">
                            {releaseDate.toString()}
                        </div>
                        <div className="movieCategory">
                            {this.state.movie.category}
                        </div>
                        <div className="score">
                            Score: {this.state.movie.score} points
                        </div>
                        <div className="buttonEdit">
                            <NavLink to={`/edit/${this.state.movie._id}`}>
                                EDIT DATA
                            </NavLink>
                        </div>
                        <div className="buttonDelete">
                            <Button color="secondary" onClick={this.handleDelete}>
                                DELETE MOVIE
                            </Button>
                        </div>
                    </div>                        
                );
            } 
            return (
                <div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                </div>           
            );
        };

        return (
            <div>
                {details()}
            </div>
        );
    }
    
}

export default MovieDetails;