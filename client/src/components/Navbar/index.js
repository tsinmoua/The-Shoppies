import React from 'react';
import { AppBar, Toolbar, Typography, useScrollTrigger, Button } from '@material-ui/core';
import { Link } from 'react-router-dom'

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

export default function ElevateAppBar(props) {
    return (
        <React.Fragment>
            <ElevationScroll {...props}>
                <AppBar>
                    <Toolbar>
                        <Typography
                            variant="h4"
                            component={Link} to='/'
                            style={{ textDecoration: 'none', color: 'white' }}
                        >
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
            <Toolbar />
            {props.children}
        </React.Fragment>
    );
}
