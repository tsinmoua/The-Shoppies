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
                let data = res.data
                console.log('Data from useEffect get API ', data)
                setVotes(data)
            })
            .catch(err => console.log(err));
    }, [deleted])

    console.log('Check userNominations ', userNominations)
    console.log('Local storage ', JSON.parse(localStorage.getItem('movies')))

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
    let obj = {};
    let sortable = [];

    for (let i = 0; i < votes.length; i++) {
        titles.push(votes[i].title)
    }

    for (let i = 0; i < titles.length; i++) {
        if (obj[titles[i]]) {
            obj[titles[i]]++;
        }
        else {
            obj[titles[i]] = 1;
        }
    }

    for (let movie in obj) {
        sortable.push([movie, obj[movie]]);
    }

    sortable.sort(function (a, b) {
        return b[1] - a[1];
    });

    // console.log('votes', votes)
    // console.log('sorted list ', sortable[0][0])
    // console.log(votes.findIndex(movie => movie.title === sortable[0][0]))

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
            <Typography variant='h2' gutterBottom>
                Nominations
                </Typography>

            <hr className={classes.line} />
            <Typography variant='h6' gutterBottom>
                My Nominations
            </Typography>

            <Grid container justify='center' alignItems='center' >
                {JSON.parse(localStorage.getItem('movies')) === null ? null :
                    (
                        JSON.parse(localStorage.getItem('movies')).map((movie, index) => (
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
                                            index={index}
                                            year={movie.year}
                                            image={movie.image}
                                            onClick={unNominate}
                                        // disabled={userNominations.includes(movie.Title) || userNominations.length >= 5}
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
                        Successfully un-nominated
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
