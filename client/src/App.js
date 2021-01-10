import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from '@material-ui/core/styles';
import Theme from "./components/Theme";

import Home from "./pages/Home";
import Nominated from "./pages/Nominated";
import Navbar from "./components/Navbar";

function App() {
  return (
    <React.Fragment>
    <ThemeProvider theme={Theme}>
      <BrowserRouter>
        <Switch>
          <Navbar>
            <Route exact path="/" component={Home} />
            <Route exact path="/nominated" component={Nominated} />
          </Navbar>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
