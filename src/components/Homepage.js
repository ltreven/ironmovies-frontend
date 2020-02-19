import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Carrusel from './Carrusel';
import '../Home.css';
import { baseUrl } from '../BaseUrl.js';
import { MOVIES }  from '../loaddb.js';

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.loadDB = this.loadDB.bind(this); 
        this.loginLoadDB = this.loginLoadDB.bind(this); 
    }

    loginLoadDB() {
        console.log("loggin in with load db user");
        // LOGIN
        fetch(baseUrl + 'users/login', {
            headers: {'Content-Type': 'application/json'},
            method: "POST",
            body: JSON.stringify(
                { username: "loaduser", password: "1234"})
        })
        .then(res => res.json())
        .then((data) => {
            if (data.success) {
                // for each movie on MOVIES:
                // CREATE MOVIE
                MOVIES.forEach((movie, index) => {
                    fetch(baseUrl + 'movies/', {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + data.token
                        },
                        method: "POST",
                        body: JSON.stringify(movie)
                    })
                    .catch((err) => console.log(err));
                });
                // refresh
                alert("movies loaded successfully. Please frefresh.");
                
            }
        })
        .catch((err) => {
            console.log(err);
        });

    }

    loadDB() {
        //signup on an empty database
        console.log("Signing up with load db user");
        fetch(baseUrl + 'users/signup', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify(
                { fullName: "loaduser", username: "loaduser", password: "1234" })
        })
        .then(res => res.json())
        .then((data) => {
            this.loginLoadDB();
        })
        .catch((err) => {
            console.log(err);
            // try to login with 
            this.loginLoadDB();
        });
        
    }

    render () {
        return (
            <div>
                <div className="row rosa">
                    <div className="side">
                        <div>
                            <h4>
                                Search, see and publish your own movies.
                                You don't have to be authenticated to navigate, but 
                                to create, update or delete movies, you must
                                login. If you don't have an account, create one using
                                the signup feature.
                            </h4>
                            <br/>
                            <div className="homebutton darkblue">
                                <a href="/list">SEE MOVIES</a>
                            </div>
                            <br/>
                            <br/>
                            <h5>For a full test experience, click the button below.
                                It will full your database with some nice movies.
                            </h5>
                            <div>
                                <Button color="danger" className="menu" onClick={this.loadDB}>
                                    LOAD DB
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="main darjeeling">
                        <br /><br /><br /><br /><br />
                    </div>
                </div>
                <div className="row">
                    <div className="main hitchcock">
                        <br /><br /><br /><br /><br />
                    </div>
                    <div className="side darkblue">
                        <div>
                        <h1>TECH STACK</h1>
                        <h4>Database</h4>
                        <h5>
                            The platform's database is MongoDB. 
                        </h5>
                        <br/>
                        <h4>Back End</h4>
                        <h5>The backend was developed in Javascript using Node
                            and Express as the web server.
                            It exposes a secure and restful API.</h5>
                        <br/>
                        <h4>Front End</h4>
                        <h5>Developed using React. Responsiveness was achieved
                            by the use of Flexbox and CSS Grid.
                        </h5>
                        <br/><br/>
                        <div className="homebutton rosa">
                            <a href="https://documenter.getpostman.com/view/2306941/SzKPUfw5?version=latest" target="_blank" rel="noopener noreferrer">
                                CHECK THIS API
                            </a>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="carrusel">
                    <Carrusel />
                    <br/><br/>
                </div>
                <div className="row">
                    <div className="main almodovar">
                        <br /><br /><br /><br /><br />
                    </div>
                    <div className="side rosa">
                        <div>
                        <h2>EASY CLONE AND EXECUTION</h2>
                        <h5>
                            Clone both front and backend repositories. Make 
                            sure you have Docker installed to create a container for MongoDB.
                            Execute the application with npm/yarn.
                        </h5>
                        <h5>Front will listen to PORT 8000 and the back end, 3000.</h5>
                        <br/><br/>
                        <div className="homebutton darkblue">
                            <a href="https://github.com/ltreven/" target="_blank" rel="noopener noreferrer">
                                REPOSITORIES
                            </a>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        );    
    }
}

export default HomePage;