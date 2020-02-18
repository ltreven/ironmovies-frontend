import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
});


const MovieCard = (props) => {

    // this only works on functional components
    const classes = useStyles();

    const [url, setRedirect] = useState('');
    const handleClick = (url) => (evt) => {
        setRedirect(url);
    }

    if (url !== '') {
        return (<Redirect to={url} />);
    }

    const movieYear = (new Date(props.movie.release)).getFullYear();

    return (
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={props.movie.posterImageUrl}
            title={props.movie.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
            {props.movie.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            {'by ' + props.movie.director + ' (' + movieYear + ')'}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={handleClick(props.see)}>
            VIEW
          </Button>
          <Button size="small" color="primary" onClick={handleClick(props.edit)}>
            EDIT
          </Button>
        </CardActions>
      </Card>
    );
}

export default MovieCard;
