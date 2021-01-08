import React, { useState } from "react"
import { Box, Button, Card, CardMedia, Grid, makeStyles, Snackbar, TextField, Typography } from '@material-ui/core';
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
        margin: '1rem',
        width: '15%',
        height: '30rem'
    }
}));

const Home = (props) => {
    const classes = useStyles();

    const [search, setSearch] = useState("")
    const [results, setResults] = useState([]);
    const [open, setOpen] = useState(false);

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
        setOpen(true);

        const title = event.currentTarget.getAttribute("title")
        const year = event.currentTarget.getAttribute("year")
        const image = event.currentTarget.getAttribute("image")

        // console.log({ title, year, image })
        saveMovie({ title, year, image });
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

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
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert onClose={handleClose} severity="success">
                        Successfully nominated
                    </Alert>
                </Snackbar>
            </Grid>

        </div >
    )
};

export default Home;
