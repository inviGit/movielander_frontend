import React, { Component } from "react";
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import _ from "lodash";

class tableBody extends Component {
  renderCell = (item, column) => {
    const content = _.get(item, column.path);
    if (typeof content === "boolean") {
      const a = content ? "Available" : "Not available";
      return a.toString();
    }
    if (column.content) return column.content(item);
    return content;
  };

  createKey = (item, column) => {
    return item.id + (column.path || column.key);
  };
  render() {
    const { data, columns } = this.props;

    return (
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            {columns.map((column) => (
              <TableCell key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    );
  }
}

export default tableBody;
