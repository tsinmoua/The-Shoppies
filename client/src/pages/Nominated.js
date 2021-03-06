import React, { useEffect, useState } from "react"
import { Button, Card, CardActions, CardContent, CardMedia, Grid, makeStyles, Snackbar, Typography } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import API from "../utils/API";

const useStyles = makeStyles((theme) => ({
    movieCards: {
        margin: '2rem 1rem 2rem 1rem',
        width: '15rem',
        height: '32rem',
        borderStyle: 'solid',
        borderWidth: '10px',
        borderColor: '#efc62c',
        '&:hover': {
            transition: 'transform .2s',
            transform: 'scale(1.1)',
        },
    },
    line: {
        height: '1px',
        width: '90vw',
        backgroundColor: '#efc62c'
    }
}));

const Nominated = (props) => {
    const classes = useStyles();
    const [userNominations, setUserNominations] = useState([]);
    const [open, setOpen] = useState(false);
    const [votes, setVotes] = useState([])
    const [deleted, setDeleted] = useState(0)

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('movies')) !== null) {
            setUserNominations(JSON.parse(localStorage.getItem('movies')))
        }

        API.get()
            .then(res => {
                // console.log('data from API ', res.data)
                setVotes(res.data)
            })
            .catch(err => console.log(err));
    }, [deleted])

    function deleteUserNomination(title, index) {
        API.delete(title)
            .then(res => {
                // console.log(res)
                setOpen(true);
                setDeleted(deleted + 1)
                userNominations.splice(index, 1)
                localStorage.setItem('movies', JSON.stringify(userNominations))
                setUserNominations(...userNominations)
            })
            .catch(err => console.log(err));
    }

    let titles = []
    let count = {};
    let sortCount = [];
    let results = []

    for (let i = 0; i < votes.length; i++) {
        titles.push(votes[i].title)
    }

    for (let i = 0; i < titles.length; i++) {
        if (count[titles[i]]) {
            count[titles[i]]++;
        } else {
            count[titles[i]] = 1;
        }
    }

    for (let movie in count) {
        sortCount.push([movie, count[movie]]);
    }

    for (let i = 0; i < votes.length; i++) {
        for (let j = 0; j < sortCount.length; j++) {
            if (votes[i].title === sortCount[j][0]) {
                votes[i].count = sortCount[j][1]
            }
        }
    }

    votes.sort((a, b) => {
        return b.count - a.count
    })

    for (let i = 0; i < votes.length; i++) {
        results.push([votes[i].title, votes[i].year, votes[i].image, votes[i].count])
    }

    results = results.map(JSON.stringify)
    results = new Set(results)
    results = Array.from(results, JSON.parse)
    // console.log(results)

    function unNominate(event) {
        event.preventDefault()
        const title = event.currentTarget.getAttribute("title")
        const index = event.currentTarget.getAttribute("index")
        deleteUserNomination(title, index)
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Grid container justify='center' alignItems='center'>
            <Typography variant='h1' gutterBottom style={{ marginTop: '2rem' }} color='secondary'>
                Nominations
            </Typography>

            <hr className={classes.line} />
            <Typography variant='h3' gutterBottom style={{ textAlign: 'center' }} color='secondary'>
                My Nominations
            </Typography>

            <Grid container justify='center' alignItems='center' >
                {JSON.parse(localStorage.getItem('movies')) === null ? null :
                    (
                        JSON.parse(localStorage.getItem('movies')).map((movie, index) => (
                            <Card key={index} className={classes.movieCards}>
                                <CardMedia style={{ height: '68%' }}>
                                    <img
                                        src={movie.image === 'N/A' ? 'https://via.placeholder.com/150?text=No+Image' : movie.image}
                                        alt={`${movie.title} Poster`}
                                        style={{ height: '100%', width: '100%' }}
                                    />
                                </CardMedia>
                                <CardContent style={{ padding: '.75rem', height: '16%' }}>
                                    <Typography
                                        gutterBottom
                                        variant='subtitle2'
                                        style={{ fontWeight: 'bold', textAlign: 'center' }}
                                    >
                                        {movie.title}
                                    </Typography>
                                    <Typography
                                        variant="subtitle2"
                                        color="textSecondary"
                                        style={{ textAlign: 'center' }}
                                    >
                                        Year Released: {movie.year}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        variant='contained'
                                        title={movie.title}
                                        index={index}
                                        year={movie.year}
                                        image={movie.image}
                                        onClick={unNominate}
                                        style={{ display: 'flex', margin: 'auto', fontWeight: 'bold'}}
                                        color='secondary'
                                    >
                                        Un-Nominate
                                        </Button>
                                </CardActions>
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
                        Successfully un-nominated
                    </Alert>
                </Snackbar>
            </Grid>

            <hr className={classes.line} />
            <Typography variant='h3' gutterBottom color='secondary'>
                Overall Nominations
            </Typography>
            <Grid container justify='center' alignItems='center' >
                {results.map((movie, index) => (
                    <Card key={index} className={classes.movieCards}>
                        <CardMedia style={{ height: '68%' }}>
                            <img
                                src={movie[2] === 'N/A' ? 'https://via.placeholder.com/150?text=No+Image' : movie[2]}
                                alt={`${movie[0]} Poster`}
                                style={{ height: '100%', width: '100%' }}
                            />
                        </CardMedia>
                        <CardContent style={{ padding: '.75rem', height: '16%' }}>
                            <Typography
                                variant='subtitle2'
                                style={{ fontWeight: 'bold', textAlign: 'center' }}
                            >
                                {movie[0]}
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                color="textSecondary"
                                style={{ textAlign: 'center' }}
                            >
                                Year Released: {movie[1]}
                            </Typography>
                        </CardContent>
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant='h6'
                                style={{ fontWeight: 'bold', textAlign: 'center' }}
                            >
                                Nominations: {movie[3]}
                            </Typography>
                        </CardContent>
                    </Card>
                ))
                }
            </Grid>
        </Grid>
    )
};

export default Nominated;
