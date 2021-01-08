import React, { useState } from "react"
import { Button, Card, CardActions, CardContent, CardMedia, Grid, makeStyles, TextField, Typography } from '@material-ui/core';

import API from "../utils/API";

const useStyles = makeStyles((theme) => ({
    searchInput: {
        width: '90%'
    },
    button: {
        height: '56px',
        width: '9%',
        marginLeft: '1%'
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

    console.log(results)
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



    return (
        <React.Fragment>

            <Grid container direction='column' justify='center' alignItems='center'>
                <Grid item >
                    <Typography variant='h1' gutterBottom>
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

            {results.length === 0 ? null :
                <Grid container justify='center' alignItems='center'>
                    <Card>
                        <CardMedia
                            component='img'
                            alt={results[0].Title}
                            src={results[0].Poster}
                            title={results[0].Title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5">
                                {results[0].Title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Year Released: {results[0].Year}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button variant='contained' color='primary'>
                                Nominate
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            }

        </React.Fragment>
    )
};

export default Home;
