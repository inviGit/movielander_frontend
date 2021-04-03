import React, { Component } from "react";
import MovieService from "../../service/movieService";
import { paginate } from "../../utils/paginate";
import Pagination from "../common/pagination";
import MovieTable from "./table/movieTable";
import { Grid } from "@material-ui/core";
import AutocompleteInput from "../common/autocompleteInput";
import Typography from "@material-ui/core/Typography";
import { MOVIE_QUALITY, MOVIE_YEAR } from "../../constants/movieFilter";
import ListGroup from "../common/listGroup";
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from '@material-ui/core/Box';
import SplitString from "../../service/splitString";
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
    if (_.size(this.props.match.params) > 0) {
      const filter = this.props.match.params.filter;
      if (MOVIE_QUALITY.includes(filter)) {
        this.setState({ selectedQuality: filter, selectedYear: "" });
      } else if (MOVIE_YEAR.includes(filter)) {
        this.setState({ selectedYear: filter });
      }
    }
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

    const renderedMovies = SplitString.split(filteredMovies);

    return (
      <div style={{ flexGrow: "1", marginTop: "20px" }}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={10}>
            <AutocompleteInput
              data={allMovies}
              label={"name"}
              onItemSelect={this.handleMovieSelect}
            />
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
                >
                  LOADING MOVIES
                </Typography>
                <LinearProgress />
                <LinearProgress color="secondary" />
              </div>
            ) : (
              <MovieTable
                movies={renderedMovies}
                sortColumn={sortColumn}
                onSort={this.handleSort}
              />
            )}

            {_.size(filteredMovies) === 0 && _.size(allMovies) !== 0 ?
              <Box color="error.main" textAlign="center" fontWeight="fontWeightBold" fontStyle="oblique" fontSize="1.5rem" m={1}>
                No Movies
                </Box>
              :
              ""
            }
            {(totalCount <= pageSize) ? "" :
              <div style={{ margin: "20px", float: "right" }}>
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
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Movies;
