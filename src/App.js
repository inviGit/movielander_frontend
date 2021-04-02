import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Movies from "./components/view/movies";
import MoviesInfo from "./components/view/movieInfo";
import SearchAppBar from "./components/view/appBar"
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Paper } from "@material-ui/core";


function App() {

  if (localStorage.getItem("theme") === null) {
    localStorage.setItem("theme", "dark");
  }

  const darkTheme = createMuiTheme({
    palette: {
      type: localStorage.getItem("theme"),
    }
  });

  const styles = {
    paperContainer: {
      flexGrow: "1",
      backgroundImage: `url(https://source.unsplash.com/random)`,
      backgroundRepeat: "no-repeat",
      minHeight:  window.innerHeight,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }
  };

  return (
    <React.Fragment>
      <Paper style={styles.paperContainer}>
        <ThemeProvider theme={darkTheme}>
          <SearchAppBar />
          <Switch>
            <Route path="/movie/:movieId" exact component={MoviesInfo} />
            <Route path="/movies/:filter" exact component={Movies} />
            <Route path="/" exact component={Movies} />
          </Switch>
        </ThemeProvider>
      </Paper>
    </React.Fragment>
  );
}

export default App;
