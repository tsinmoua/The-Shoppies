import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Navbar>
          <Route exact path="/" component={Home} />
        </Navbar>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
