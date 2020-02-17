import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './Header';
import Homepage from './Homepage';
import MoviesList from './MoviesList';
import RecentMovies from './RecentMovies';
import MovieDetails from './MovieDetails';
import EditMovie from './EditMovie';
import Footer from './Footer';

class Main extends Component {

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

    const RecentMoviesRoute = () => {
        return (
            <RecentMovies />
        );
    }

    const MovieDetailsRoute = () => {
        return (
            <MovieDetails />
        );
    }

    const EditMovieRoute = () => {
        return (
            <EditMovie />
        );
    }

    return (
        <div>
            <Header />
            <Switch>
                <Route exact path="/home" component={HomepageRoute} />
                <Route exact path="/list/" component={MoviesListRoute} />
                <Route exact path="/recent/" component={RecentMoviesRoute} />
                <Route exact path="/details/:id" component={MovieDetailsRoute} />
                <Route exact path="/edit/:id" component={EditMovieRoute} />
                <Redirect to="/home" />
            </Switch>
            <Footer/>
        </div>
    );  
  }
}

export default Main;
