import React, { Component } from "react";
import MovieService from "../../service/movieService";
import { paginate } from "../../utils/paginate";
import Pagination from "../common/pagination";
import MovieTable from "./table/movieTable";
import { Grid, Paper } from "@material-ui/core";
import AutocompleteInput from "../common/autocompleteInput";
import Typography from "@material-ui/core/Typography";
import { MOVIE_QUALITY, MOVIE_YEAR } from "../../constants/movieFilter";
import ListGroup from "../common/listGroup";
import LinearProgress from "@material-ui/core/LinearProgress";
import SearchAppBar from "./appBar"
import Box from '@material-ui/core/Box';
import _ from "lodash";

export class Movies extends Component {
  state = {
    allMovies: [],
    movies: [],
    MovieQualityList: ["No Filter", ...MOVIE_QUALITY],
    selectedQuality: "",
    selectedYear: "",
    pageSize: 10,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    MovieService.getMovies().then((res) => {
      this.setState({ movies: res.data, allMovies: res.data });
    });
  }

  getPagedData = () => {
    const {
      movies,
      selectedQuality,
      selectedYear,
      pageSize,
      currentPage,
      sortColumn,
    } = this.state;

    let filteredYear = selectedYear ? movies.filter((m) => m.name.includes(selectedYear))
      : movies;

    const quality = selectedQuality === "No Filter" ? "" : selectedQuality;

    let filtered = quality
      ? filteredYear.filter((m) => m.name.includes(selectedQuality))
      : filteredYear;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const filteredMovies = paginate(sorted, currentPage, pageSize);

    return { totalCount: _.size(filtered), data: filteredMovies };
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

  handleQualitySelect = (quality) => {
    this.setState({ selectedQuality: quality, currentPage: 1 });
  };

  handleAppBarItemSelect = (event) => {
    const filter = event.target.innerText;
    if (MOVIE_QUALITY.includes(filter)) {
      this.setState({ selectedQuality: filter, selectedYear: "" });
    } else if (MOVIE_YEAR.includes(filter)) {
      this.setState({ selectedYear: filter, selectedQuality: "" });
    } else {
      this.setState({ selectedYear: "", selectedQuality: "" });
    }
  }

  render() {
    const {
      allMovies,
      MovieQualityList,
      selectedQuality,
      pageSize,
      currentPage,
      sortColumn,
    } = this.state;

    const { totalCount, data: filteredMovies } = this.getPagedData();

    return (
      <div>
        <SearchAppBar onItemSelect={this.handleAppBarItemSelect} />
        <div style={{ flexGrow: "1" }}>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={12}>
              <Paper>
                <Typography component="div" color="secondary" >
                  <Box textAlign="center" fontWeight="fontWeightBold" fontStyle="oblique" m={1}>
                    Disclaimer: This app is for project purpose.
                </Box>
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={10}>
              <Paper>
                <AutocompleteInput
                  data={allMovies}
                  label={"name"}
                  onItemSelect={this.handleMovieSelect}
                />
              </Paper>

              <Typography
                variant="overline"
                display="block"
                style={{ fontSize: "14" }}
                color="inherit"
                gutterBottom
              >
                FILTER BY QUALITY
                </Typography>
              <ListGroup
                items={MovieQualityList}
                selectedItem={selectedQuality}
                onItemSelect={this.handleQualitySelect}
              />

              {_.size(allMovies) === 0 ? (
                <div style={{ margin: "20px" }}>
                  <Typography
                    variant="overline"
                    display="block"
                    style={{ fontSize: "14" }}
                    color="inherit"
                    gutterBottom
                  >
                    LOADING MOVIES
                </Typography>
                  <LinearProgress />
                  <LinearProgress color="secondary" />
                </div>
              ) : (
                <MovieTable
                  movies={filteredMovies}
                  sortColumn={sortColumn}
                  onSort={this.handleSort}
                />
              )}

              <div style={{ margin: "20px", float: "right" }}>
                <Typography
                  variant="overline"
                  display="block"
                  style={{ fontSize: "14" }}
                  color="inherit"
                  gutterBottom
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
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Movies;
