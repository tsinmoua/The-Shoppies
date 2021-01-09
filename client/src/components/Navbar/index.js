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
        paddingRight: 0
    },
    button: {
        marginLeft: 'auto',
        color: 'white',
        '&:hover': {
            backgroundColor: 'transparent',
            color: theme.palette.common.orange
        }
    },
    title: {
        fontSize: '2rem',
        color: 'white',
        textDecoration: 'none',
        '&:hover': {
            color: theme.palette.common.orange
        }
    }
}));

export default function ElevateAppBar(props) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <ElevationScroll {...props}>
                <AppBar>
                    <Toolbar>
                        <Typography
                            variant="h4"
                            component={Link} to='/'
                            className={classes.title}
                        >
                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                <img src={reel} alt='Movie Reel'
                                    style={{ height: '57px', margin: 'auto' }}
                                />
                            </IconButton>
                            THE SHOPPIES
                        </Typography>

                        <Button
                            disableRipple
                            component={Link} to='/nominated'
                            className={classes.button}
                        >
                            Nominations
                        </Button>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <Toolbar style={{ height: '81px' }} />
            {props.children}
        </React.Fragment>
    );
}
