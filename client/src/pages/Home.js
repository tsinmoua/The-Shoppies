import React, { useState } from "react"
import { Button, Grid, makeStyles, TextField, Typography } from '@material-ui/core';

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
    const [results, setResults] = useState('');

    function searchMovies(query) {
        API.search(query)
            .then(res => {
                console.log(res);
                // console.log(res.data.items);
                // setResults(res.data.items)
            })
            .catch(err => console.log(err));
    };

    function handleInputChange(event) {
        const { value } = event.target;
        console.log(value);
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
                            label="Search a movie by Title"
                            variant="outlined"
                            className={classes.searchInput}
                            onChange={handleInputChange}
                            value={search}
                            autoFocus
                        />
                        <Button variant='contained' className={classes.button} onClick={handleFormSubmit}>
                            Search
                    </Button>
                    </form>
                </Grid>


            </Grid>
        </React.Fragment>
    )
};

export default Home;
