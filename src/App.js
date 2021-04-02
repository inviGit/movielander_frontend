import React from "react";
import { Route, Switch } from "react-router-dom";
import Movies from "./components/view/movies";
import MoviesInfo from "./components/view/movieInfo";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import "./App.css";


const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    flexGrow: 1,
  },
  // https://source.unsplash.com/random?&query=nas
  image: {
    flexGrow: "1",
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

function App() {
  const classes = useStyles();

  const darkTheme = createMuiTheme({
    palette: {
      type: localStorage.getItem("theme"),
    },
  });

  return (
    <React.Fragment>
      <ThemeProvider theme={darkTheme}>
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item sm={12} md={12} with="100%" className={classes.image}>
            <Switch>
              <Route path="/movie/:movieId" exact component={MoviesInfo} />
              <Route path="/" exact component={Movies} />
            </Switch>
          </Grid>
        </Grid>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
