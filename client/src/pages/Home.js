import React, { useState } from "react"
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, makeStyles, TextField, Typography } from '@material-ui/core';

import API from "../utils/API";

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
        margin: '1rem',
        width: '15%',
        height: '30rem'
    }
}));

const Home = (props) => {
    const classes = useStyles();

    const [search, setSearch] = useState("")
    const [results, setResults] = useState([]);

    function searchMovies(query) {
        API.search(query)
            .then(res => {
                // console.log(res);
                setResults(res.data.Search)
            })
            .catch(err => console.log(err));
    };

    // console.log(results)
    // console.log(results.length)
    // console.log(results[0].Poster)

    function handleInputChange(event) {
        const { value } = event.target;
        // console.log(value);
        setSearch(value)
    };

    function handleFormSubmit(event) {
        event.preventDefault();
        searchMovies(search)
        setSearch("");
    };

    function saveMovie(object, index) {
        API.save(object)
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err));
    }

    function handleButtonClick(event) {
        // event.preventDefault()
        event.stopPropagation()

        const title = event.currentTarget.getAttribute("title")
        const year = event.currentTarget.getAttribute("year")
        const image = event.currentTarget.getAttribute("image")

        console.log({ title, year, image })

        saveMovie({ title, year, image });

    }

    return (
        <div style={{ backgroundColor: 'lightblue' }}>

            <Grid container direction='column' justify='center' alignItems='center'>
                <Grid item >
                    <Typography variant='h2' gutterBottom>
                        The Shoppies
                    </Typography>
                </Grid>

                <Grid item style={{ width: '66%' }}>
                    <form onSubmit={handleFormSubmit}>
                        <TextField
                            id="outlined-basic"
                            label="Search for a Movie"
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
                {results.length === 0 ? null :
                    (
                        results.map((movie, index) => (
                            <Card key={index} className={classes.movieCards}>
                                <CardMedia style={{ height: '65%' }}>
                                    <img
                                        src={movie.Poster}
                                        alt={`${movie.Title} Poster`}
                                        style={{ height: '100%', width: '100%' }}
                                    />
                                </CardMedia>
                                <Box style={{ padding: '1rem', height: '29%' }}>
                                    <Typography
                                        gutterBottom
                                        variant='subtitle2'
                                        style={{ fontWeight: 'bold' }}
                                    >
                                        {movie.Title}
                                    </Typography>
                                    <Typography
                                        variant="subtitle2"
                                        color="textSecondary"
                                    >
                                        Year Released: {movie.Year}
                                    </Typography>
                                    <Box
                                        display='flex'
                                        justifyContent='center'
                                        alignSelf="flex-end"
                                        style={{ paddingBottom: 'auto' }}
                                    >
                                        <Button
                                            variant='contained'
                                            color='primary'
                                            title={movie.Title}
                                            year={movie.Year}
                                            image={movie.Poster}
                                            onClick={handleButtonClick}
                                        >
                                            Nominate
                                        </Button>
                                    </Box>
                                </Box>
                            </Card>
                        ))
                    )
                }
            </Grid>

        </div >
    )
};

export default Home;
