import React from 'react';
import { AppBar, Toolbar, Typography, useScrollTrigger, Button, IconButton, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom'
import reel from "../../assets/reel.png";

function ElevationScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: 0,
    },
    title: {
        flexGrow: 1,
    },
}));

export default function ElevateAppBar(props) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <ElevationScroll {...props}>
                <AppBar>
                    <Toolbar>
                        <Typography
                            variant="h3"
                            component={Link} to='/'
                            style={{ textDecoration: 'none', color: 'white' }}
                        >
                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                <img src={reel} alt='Movie Reel'
                                    style={{ height: '57px', margin: 'auto' }}
                                />
                            </IconButton>
                            The Shoppies
                        </Typography>

                        <Button
                            disableRipple
                            component={Link} to='/nominated'
                            style={{ marginLeft: 'auto', color: 'white' }}
                        >
                            Nominated
                        </Button>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <Toolbar style={{ height: '81px' }} />
            {props.children}
        </React.Fragment>
    );
}
