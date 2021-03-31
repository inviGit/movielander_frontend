import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Movies from "./components/view/movies";
import MoviesInfo from "./components/view/movieInfo";

function App() {

  return (
    <React.Fragment>
        <Switch>
        <Route path="/movie/:movieId" exact component={MoviesInfo} />
          <Route path="/" exact component={Movies} />
        </Switch>
    </React.Fragment>
  );
}

export default App;
