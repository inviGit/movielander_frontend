import React, { Component } from "react";
import MovieService from "../../service/movieService";
import MovieCard from "./cards/movieCard";
import MovieTable from "./table/movieTable";
import { Grid } from "@material-ui/core";
import { paginate } from "../../utils/paginate";
import Pagination from "../common/pagination";
import Typography from "@material-ui/core/Typography";
import _ from "lodash";

export class MovieInfo extends Component {
  state = {
    moiveId: "",
    movieName: "",
    movie: [{}],
    relatedMovies: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: "",
  };

  componentDidMount() {
    const movieName = this.props.match.params.movieName;
    const movieId = this.props.match.params.movieId;
    const movie = [{ id: movieId, name: movieName }];
    this.setState({ movieName, movieId, movie });

    MovieService.getMovies().then((res) => {
      async function filterMovies() {
        let relatedMovies = [];
        await res.data.map((m) => {
          let string = "";
          let movieNameArray = movieName.split('=').join(',').split(':').join(',').split(',').join(' ').split(' ')
          for (let i = 0; i < 2; i++) {
            string = string.concat(`${movieNameArray[i]} `);
          }
          if (m.name.match(string) !== null) {
            relatedMovies.push({ fileid: m.fileid, name: m.name });
          }
          return relatedMovies
        })
        return relatedMovies;
      }
      filterMovies().then(_ => { this.setState({ relatedMovies: _ }) })
    });
  }

  getPagedData = () => {
    const {
      relatedMovies,
      pageSize,
      currentPage,
      sortColumn,
    } = this.state;

    const sorted = _.orderBy(relatedMovies, [sortColumn.path], [sortColumn.order]);

    const filteredMovies = paginate(sorted, currentPage, pageSize);

    return { totalCount: _.size(relatedMovies), data: filteredMovies };
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleHomeClick = () => {
    window.location.href = "/";
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleAction = () => {
    // window.open(`${process.env.REACT_APP_MOVIE_LINK}/${this.state.movieId}/edit`);
  };

  render() {
    const { movie, pageSize, currentPage, sortColumn } = this.state;
    const { totalCount, data: filteredMovies } = this.getPagedData();

    return (
      <div style={{ flexGrow: "1", marginTop: "20px", alignItems: "center" }}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={"auto"}>
            <MovieCard
              movies={movie}
              onActionClick={this.handleAction}
            />
          </Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={10} style={{ marginTop: "20px" }}>
            <Typography
              variant="overline"
              display="block"
              style={{ fontSize: "14" }}
              color="inherit"
            >
              RELATED MOVIES
                </Typography>
            <MovieTable
              movies={filteredMovies}
              sortColumn={sortColumn}
              onSort={this.handleSort}
            />
            <div style={{ margin: "20px", float: "right" }}>
              {(totalCount <= pageSize) ? "":
                <div>
                  <Typography
                    variant="overline"
                    display="block"
                    style={{ fontSize: "14" }}
                    color="inherit"
                  >
                    GO TO PAGE
                  </Typography>
                  <Pagination
                    itemsCount={totalCount}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={this.handlePageChange}
                  />
                </div>
              }
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default MovieInfo;
