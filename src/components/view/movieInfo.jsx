import React, { Component } from "react";
import MovieCard from "./cards/movieCard";
import { Grid } from "@material-ui/core";

export class MovieInfo extends Component {
  state = {
    moiveId: "",
    movieName: "",
    movies: [{}],
  };

  componentDidMount() {
    const movieName = this.props.location.state.name;
    const movieId = this.props.match.params.movieId;
    const movies = [{ id: movieId, name: movieName }];
    this.setState({ movieName, movieId, movies });
  }

  handleDownloadClick = () => {
    window.open(`https://drive.google.com/file/d/${this.state.movieId}/edit`);
  };

  render() {
    const { movies } = this.state;
    return (
      <div style={{ flexGrow: "1", marginTop: "20px", alignItems: "center" }}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={4}>
            <MovieCard
              movies={movies}
              onDownloadClick={this.handleDownloadClick}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default MovieInfo;
