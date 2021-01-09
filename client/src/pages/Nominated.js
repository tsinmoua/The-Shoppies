import React, { useEffect, useState } from "react"
import { Box, Button, Card, CardMedia, Grid, makeStyles, Snackbar, Typography } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import API from "../utils/API";

const useStyles = makeStyles((theme) => ({
    movieCards: {
        margin: '1rem',
        width: '15%',
        height: '30rem'
    },
    line: {
        height: '1px',
        width: '90vw',
        backgroundColor: 'black'
    }
}));

const Nominated = (props) => {

    const classes = useStyles();

    const [nominated, setNominated] = useState([]);
    const [open, setOpen] = useState(false);
    const [votes, setVotes] = useState([])

    console.log(nominated)

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('movies')) !== null) {
            setNominated(JSON.parse(localStorage.getItem('movies')))
        }

        API.get()
            .then(res => {
                let data = res.data
                console.log(data)
                setVotes(data)
            })
    }, [])

    let titles = []

    for (let i = 0; i < votes.length; i++) {
        titles.push(votes[i].title)
    }
    console.log(titles)

    let obj = {};
    for (let i = 0; i < titles.length; i++) {
        if (obj[titles[i]]) {
            obj[titles[i]]++;
        }
        else {
            obj[titles[i]] = 1;
        }
    }

    let sortable = [];
    for (let movie in obj) {
        sortable.push([movie, obj[movie]]);
    }

    sortable.sort(function (a, b) {
        return b[1] - a[1];
    });

    console.log(sortable);

    console.log('votes', votes)
    // console.log(sortable[0][0])
    console.log(votes.findIndex(movie => movie.title === sortable[0][0]))



    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    function unNominate(event) {
        event.preventDefault()
        event.stopPropagation()

        const title = event.currentTarget.getAttribute("title")
        const year = event.currentTarget.getAttribute("year")
        const image = event.currentTarget.getAttribute("image")

        const movieObject = ({ title, year, image });

        API.save(movieObject)
            .then(res => {
                // console.log(res)
                setOpen(true);
                setNominated([...nominated, movieObject])
            })
            .then(res => {
                localStorage.setItem('movies', JSON.stringify([...nominated, movieObject]))
            })
            .catch(err => console.log(err));
    }

    return (
        <Grid container justify='center' alignItems='center'>
            <Typography variant='h2' gutterBottom>
                Nominations
                </Typography>

            <hr className={classes.line} />
            <Typography variant='h6' gutterBottom>
                My Nominations
            </Typography>

            <Grid container justify='center' alignItems='center' >
                {nominated === null ? null :
                    (
                        nominated.map((movie, index) => (
                            <Card key={index} className={classes.movieCards}>
                                <CardMedia style={{ height: '65%' }}>
                                    <img
                                        src={movie.image}
                                        alt={`${movie.title} Poster`}
                                        style={{ height: '100%', width: '100%' }}
                                    />
                                </CardMedia>
                                <Box style={{ padding: '1rem', height: '29%' }}>
                                    <Typography
                                        gutterBottom
                                        variant='subtitle2'
                                        style={{ fontWeight: 'bold' }}
                                    >
                                        {movie.title}
                                    </Typography>
                                    <Typography
                                        variant="subtitle2"
                                        color="textSecondary"
                                    >
                                        Year Released: {movie.year}
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
                                            title={movie.title}
                                            year={movie.year}
                                            image={movie.image}
                                            onClick={unNominate}
                                        // disabled={nominated.includes(movie.Title) || nominated.length >= 5}
                                        >
                                            Un-Nominate
                                        </Button>
                                    </Box>
                                </Box>
                            </Card>
                        ))
                    )
                }
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert onClose={handleClose} severity="success">
                        Successfully nominated
                    </Alert>
                </Snackbar>
            </Grid>

            <hr className={classes.line} />
            <Typography variant='h6' gutterBottom>
                Overall Nominations
            </Typography>

        </Grid>
    )
};

export default Nominated;
