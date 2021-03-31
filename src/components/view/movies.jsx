import React, { Component } from "react";
import MovieService from "../../service/movieService";
import { paginate } from "../../utils/paginate";
import Pagination from "../common/pagination";
import MovieTable from "./table/movieTable";
import { Grid } from "@material-ui/core";
import AutocompleteInput from "../common/autocompleteInput";
import _ from "lodash";

export class Movies extends Component {
  state = {
    allMovies: [],
    movies: [],
    pageSize: 10,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    MovieService.getMovies().then((res) => {
      this.setState({ movies: res.data.objects, allMovies: res.data.objects });
    });
  }

  getPagedData = () => {
    const { movies, pageSize, currentPage, sortColumn } = this.state;

    const sorted = _.orderBy(movies, [sortColumn.path], [sortColumn.order]);

    const filteredMovies = paginate(sorted, currentPage, pageSize);

    return { totalCount: _.size(movies), data: filteredMovies };
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleMovieSelect = (event, movie) => {
    let a = {};
    if (_.isNull(movie)) {
      a = { ...this.state.allMovies };
      this.setState({ movies: a });
    } else {
      a = [movie];
      this.setState({ movies: a });
    }
  };

  render() {
    const { allMovies, pageSize, currentPage, sortColumn } = this.state;

    const { totalCount, data: filteredMovies } = this.getPagedData();

    return (
      <div style={{ flexGrow: "1", marginTop: "20px" }}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={8}>
            <AutocompleteInput
              data={allMovies}
              label={"name"}
              onItemSelect={this.handleMovieSelect}
            />
          </Grid>

          <Grid item xs={8}>
            <MovieTable
              movies={filteredMovies}
              sortColumn={sortColumn}
              onSort={this.handleSort}
            />

            <div style={{ margin: "20px", float: "right" }}>
              <Pagination
                itemsCount={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Movies;
