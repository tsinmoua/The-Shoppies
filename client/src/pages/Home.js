import React from "react"
import { Button, Grid, makeStyles, TextField, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    searchInput: {
        height: '5rem',
        width: '100%'
    },
    button: {
        height: '5rem'
    }
}));

const Home = (props) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Grid container direction='column' justify='center' alignItems='center'>

                <Grid item>
                    <Typography variant='h1'>
                        The Shoppies
                    </Typography>
                </Grid>

                <Grid item style={{width: '66%'}}>
                    <TextField
                        id="outlined-basic"
                        label="Search a movie by Title"
                        variant="outlined"
                        className={classes.searchInput}
                    />
                    <Button variant='contained' className={classes.button}>
                        Search
                    </Button>
                </Grid>


            </Grid>
        </React.Fragment>
    )
};

export default Home;
