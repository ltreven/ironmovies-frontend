import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './Header';
import Homepage from './Homepage';
import MoviesList from './MoviesList';
import MovieDetails from './MovieDetails';

class Main extends Component {

    componentDidMount () {
        console.log("componentDidMount");
    }

    render() {
    
    const HomepageRoute = () => {
        return (
            <Homepage />
        );
    }

    const MoviesListRoute = () => {
        return (
            <MoviesList />
        );
    }

    const MovieDetailsRoute = () => {
        return (
            <MovieDetails />
        );
    }

    return (
        <div>
            <Header />
            <Switch>
                <Route exact path="/home" component={HomepageRoute} />
                <Route exact path="/list" component={MoviesListRoute} />
                <Route exact path="/details" component={MovieDetailsRoute} />
                <Redirect to="/home" />
            </Switch>
        </div>
    );  
  }
}

export default Main;
