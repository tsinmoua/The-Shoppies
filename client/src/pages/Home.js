import React, { useEffect, useState } from "react"
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

import API from "../utils/API";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    searchInput: {
        width: '90%'
    },
    button: {
        height: '56px',
        width: '9%',
        marginLeft: '1%'
    },
    movieCards: {
        margin: '2rem 1rem 2rem 1rem',
        width: '15rem',
        height: '32rem',
        '&:hover': {
            transition: 'transform .2s',
            transform: 'scale(1.1)'
        },
    }
}));

const Home = (props) => {
    const classes = useStyles();

    const [search, setSearch] = useState("")
    const [results, setResults] = useState([]);
    const [nominated, setNominated] = useState([]);

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('movies')) !== null) {
            setNominated(JSON.parse(localStorage.getItem('movies')))
        }
    }, [])

    function searchMovies(query) {
        API.search(query)
            .then(res => {
                // console.log(res);
                if ('Error' in res.data) {
                    alert(`${res.data.Error} Please search a different title`)
                } else {
                    setResults(res.data.Search)
                }
            })
            .catch(err => console.log(err));
    };

    function handleInputChange(event) {
        const { value } = event.target;
        setSearch(value)
    };

    function handleFormSubmit(event) {
        event.preventDefault();
        if (search !== '') {
            searchMovies(search)
            setSearch("");
        }
    };

    function nominate(event) {
        event.preventDefault()
        event.stopPropagation()

        const title = event.currentTarget.getAttribute("title")
        const year = event.currentTarget.getAttribute("year")
        const image = event.currentTarget.getAttribute("image")

        const movieObject = ({ title, year, image });

        API.save(movieObject)
            .then(res => {
                // console.log(res)
                setNominated([...nominated, movieObject])
                localStorage.setItem('movies', JSON.stringify([...nominated, movieObject]))
            })
            .catch(err => console.log(err));
    }

    const titles = []

    for (let i = 0; i < nominated.length; i++) {
        titles.push(nominated[i].title)
    }

    return (
        <Grid container justify='center' alignItems='center'>
            <Typography variant='h1' gutterBottom style={{marginTop: '2rem'}}>
                The Shoppies
            </Typography>

            <Grid container direction='column' justify='center' alignItems='center'>
                <Grid item >
                    {nominated === null ? null : (
                        nominated.length >= 5 ?
                            <Alert severity="warning" style={{ textAlign: 'center', margin: '2rem' }}>
                                You have nominated the max amount of films (5).<br />
                                If you would like to change your nominations,<br />
                                click on the Nominations tab above
                            </Alert>
                            : null
                    )}
                </Grid>

                <Grid item style={{ width: '66%', margin: '1rem 0 1rem 0' }}>
                    <form onSubmit={handleFormSubmit}>
                        <TextField
                            id="outlined-basic"
                            label="Search for a film"
                            variant="outlined"
                            className={classes.searchInput}
                            onChange={handleInputChange}
                            value={search}
                            autoFocus
                        />
                        <Button
                            variant='contained'
                            className={classes.button}
                            onClick={handleFormSubmit}
                            type='submit'
                        >
                            Search
                        </Button>
                    </form>
                </Grid>
            </Grid>

            <Grid container justify='center' alignItems='center' >
                {results.length === 0 ?
                    (
                        <Grid item style={{ padding: '2rem' }}>
                            <Typography variant='h5' style={{ textAlign: 'center' }}>
                                Welcome!<br /><br />
                                Please help us prepare for The Shoppies<br />
                                by searching and nominating your favorite films!<br />
                                You can nominate up to 5 films.<br />
                                You can check out which films are on top in the Nominations tab
                            </Typography>
                        </Grid>
                    )
                    :
                    (
                        results.map((movie, index) => (
                            <Card key={index} className={classes.movieCards}>
                                <CardMedia style={{ height: '70%' }}>
                                    <img
                                        src={movie.Poster === 'N/A' ? 'https://via.placeholder.com/150?text=No+Image' : movie.Poster}
                                        alt={`${movie.Title} Poster`}
                                        style={{ height: '100%', width: '100%' }}
                                    />
                                </CardMedia>
                                <CardContent style={{ padding: '.75rem', height: '14%' }}>
                                    <Typography
                                        gutterBottom
                                        variant='subtitle2'
                                        style={{ fontWeight: 'bold', textAlign: 'center' }}
                                    >
                                        {movie.Title}
                                    </Typography>
                                    <Typography
                                        variant="subtitle2"
                                        color="textSecondary"
                                        style={{ textAlign: 'center' }}
                                    >
                                        Year Released: {movie.Year}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        title={movie.Title}
                                        year={movie.Year}
                                        image={movie.Poster}
                                        onClick={nominate}
                                        disabled={titles.includes(movie.Title) || nominated.length >= 5}
                                        style={{ display: 'flex', margin: 'auto' }}
                                    >
                                        Nominate
                                    </Button>
                                </CardActions>
                            </Card>
                        ))
                    )
                }
            </Grid>

        </Grid>
    )
};

export default Home;
