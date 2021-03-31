import React, { Component } from "react";
import CardComponent from "../../common/card";

export class MovieCard extends Component {
  columns = [
    {
      key: "image",
      img:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx9zhPpRej1IrjdLjml-YSbJ8rfPygwk0Msw&usqp=CAU",
      type: "image",
      title: "image",
    },
    {
      path: "name",
      label: "Name",
      type: "title",
    },
    {
      key: "button",
      title:"Download",
      type: "button",
    },
  ];
  render() {
    const { movies, onDownloadClick } = this.props;
    return (
      <div>
        <CardComponent columns={this.columns} data={movies} onActionClick={onDownloadClick} />
      </div>
    );
  }
}

export default MovieCard;
