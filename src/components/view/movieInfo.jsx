import React, { Component } from "react";
import MovieService from "../../service/movieService";
import MovieCard from "./cards/movieCard";
import MovieTable from "./table/movieTable";
import { Box, Grid } from "@material-ui/core";
import { paginate } from "../../utils/paginate";
import Pagination from "../common/pagination";
import Typography from "@material-ui/core/Typography";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import SplitString from "../../service/splitString";
import _ from "lodash";

export class MovieInfo extends Component {
  state = {
    moiveId: "",
    movieName: "",
    movie: [{}],
    relatedMovies: [],
    pageSize: 6,
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
        // let movieNameArray = movieName.split('=').join(',').split(':').join(',').split(',').join(' ').split(' ').join('(').split('(')
        let movieNameArray = movieName.split(/(\d+)/).join('').split(/[$-/:-?{-~!"^_`]/)
        // console.log("mmm",movieNameArray[0])
        await res.data.map((m) => {
          // let string = "";
          // for (let i = 0; i < _.size(movieNameArray); i++) {
          //   string = string.concat(`${movieNameArray[i]} `);
          // }
          // console.log(m.name.match(movieNameArray));
          if (m.name.match(movieNameArray[0]) !== null) {
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
    const { movieId, movie, pageSize, currentPage, sortColumn } = this.state;
    const { totalCount, data: filteredMovies } = this.getPagedData();
    const renderedMovies = SplitString.split(filteredMovies);

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
            <CopyToClipboard text={movieId}
            >
              <Box fontStyle="normal" fontWeight="fontWeightBold">RELATED MOVIES</Box>
            </CopyToClipboard>
            <MovieTable
              place={"info"}
              movies={renderedMovies}
              sortColumn={sortColumn}
              onSort={this.handleSort}
            />
            <div style={{ margin: "20px", float: "right" }}>
              {(totalCount <= pageSize) ? "" :
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
