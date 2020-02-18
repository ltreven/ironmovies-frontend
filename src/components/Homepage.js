import React, { Component } from 'react';
import Carrusel from './Carrusel';
import '../Home.css';

class HomePage extends Component {

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
                        <br/><br/>
                        <div className="homebutton darkblue">
                            <a href="/list">SEE MOVIES</a>
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
                        <h4>The platform's database is MongoDB.</h4>
                        <br/>
                        <h4>Back End</h4>
                        <h4>The backend was developed in Javascript using Node
                            and Express as the web server.
                            It exposes a secure and restful API.</h4>
                        <br/>
                        <h4>Front End</h4>
                        <h4>Developed using React. Responsiveness was achieved
                            by the use of Flexbox and CSS Grid.
                        </h4>
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