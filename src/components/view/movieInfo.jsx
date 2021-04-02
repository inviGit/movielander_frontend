import React, { Component } from "react";
import MovieCard from "./cards/movieCard";
import MovieService from "../../service/movieService";
import { Button, Grid } from "@material-ui/core";
import { paginate } from "../../utils/paginate";
import MovieTable from "./table/movieTable";
import Pagination from "../common/pagination";
import Typography from "@material-ui/core/Typography";
import { MOVIE_QUALITY, MOVIE_YEAR } from "../../constants/movieFilter";
import SearchAppBar from "./appBar"
import _ from "lodash";

export class MovieInfo extends Component {
  state = {
    moiveId: "",
    movieName: "",
    movie: [{}],
    relatedMovies: [],
    selectedQuality: "",
    selectedYear: "",
    pageSize: 5,
    currentPage: 1,
    sortColumn: "",
  };

  componentDidMount() {
    const movieName = this.props.location.state.name;
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
        })
        return relatedMovies;
      }
      filterMovies().then(_ => { this.setState({ relatedMovies: _ }) })
    });
  }

  getPagedData = () => {
    const {
      relatedMovies,
      selectedQuality,
      selectedYear,
      pageSize,
      currentPage,
      sortColumn,
    } = this.state;

    let filteredYear = selectedYear ? relatedMovies.filter((m) => m.name.includes(selectedYear))
      : relatedMovies;

    const quality = selectedQuality === "No Filter" ? "" : selectedQuality;

    let filtered = quality
      ? filteredYear.filter((m) => m.name.includes(selectedQuality))
      : filteredYear;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const filteredMovies = paginate(sorted, currentPage, pageSize);

    return { totalCount: _.size(filtered), data: filteredMovies };
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleDownloadClick = () => {
    window.open(`https://drive.google.com/file/d/${this.state.movieId}/edit`);
  };

  handleHomeClick = () => {
    window.location.href = "/";
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
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
    const { movie, relatedMovies, pageSize, currentPage, sortColumn } = this.state;
    const { totalCount, data: filteredMovies } = this.getPagedData();
    return (
      <div>
        <SearchAppBar onItemSelect={this.handleAppBarItemSelect} />
        <div style={{ flexGrow: "1", marginTop: "20px", alignItems: "center" }}>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={"auto"}>
              <MovieCard
                movies={movie}
                onDownloadClick={this.handleDownloadClick}
              />
            </Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={10} style={{ marginTop: "20px" }}>
              <Typography
                variant="overline"
                display="block"
                style={{ fontSize: "14" }}
                color="inherit"
                gutterBottom
              >
                RELATED MOVIES
                </Typography>
              <MovieTable
                movies={filteredMovies}
                sortColumn={sortColumn}
                onSort={this.handleSort}
              />
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

export default MovieInfo;
