import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortAlphaUp, faSortAlphaDownAlt, faSort } from '@fortawesome/free-solid-svg-icons'
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class tableHeader extends Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = (column) =>{
        const {sortColumn} = this.props;
      if(column.path !== sortColumn.path) return <FontAwesomeIcon icon={faSort}/>;
      if(sortColumn.order==='asc') return <FontAwesomeIcon icon={faSortAlphaUp}/>
      else return <FontAwesomeIcon icon={faSortAlphaDownAlt}/>
  }

  render() {
    return (
      <TableHead>
        <TableRow>
          {this.props.columns.map((column) => (
            <TableCell className="clickable"
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label} {this.renderSortIcon(column)}
            </TableCell>
            
          ))}
        </TableRow>
      </TableHead>
    );
  }
}

export default tableHeader;
