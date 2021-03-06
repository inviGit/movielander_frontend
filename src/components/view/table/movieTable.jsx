import _ from "lodash";
import React, { Component } from "react";
import TableComponent from "../../common/table";
// import { Link } from "react-router-dom";

export class MovieTable extends Component {
  columns = [
    {
      path: "name",
      label: "Name",
      content: (movie) => (
        <div
          className="clickable"
          onClick={() => window.location.href = `/movie/${movie.name}/${movie.fileid}`}
          style={localStorage.getItem("theme") === "dark" ? { color: "white" } : { color: "black" }}
        >
          {movie.name}
        </div>
      ),

    },

  ];

  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <div>
        <TableComponent
          columns={_.compact(this.columns)}
          data={movies}
          sortColumn={sortColumn}
          onSort={onSort}
        />
      </div>
    );
  }
}

export default MovieTable;
