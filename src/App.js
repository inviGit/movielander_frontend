import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Movies from "./components/view/movies";
import MoviesInfo from "./components/view/movieInfo";
import SearchAppBar from "./components/view/appBar"
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
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
      backgroundImage: `url(https://source.unsplash.com/random?nature)`,
      backgroundRepeat: "no-repeat",
      minHeight: window.innerHeight,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }
  };

  return (
    <React.Fragment>
      <Paper style={styles.paperContainer}>
        <ThemeProvider theme={darkTheme}>
          <SearchAppBar />
          <Paper style={{marginTop:"-10px"}}>
            <Box color="error.main" textAlign="center" fontWeight="fontWeightBold" fontStyle="oblique" m={1}>
              Disclaimer: This app is for project purpose.
          </Box>
          </Paper>
          <Switch>
            <Route path="/movie/:movieName/:movieId" exact component={MoviesInfo} />
            <Route path="/movies/:filter" exact component={Movies} />
            <Route path="/" exact component={Movies} />
          </Switch>
        </ThemeProvider>
      </Paper>
    </React.Fragment>
  );
}

export default App;
