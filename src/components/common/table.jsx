import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";

const TableComponent = ({ columns, sortColumn, onSort, data }) => {
  return (
    <TableContainer component={Paper} >
      <Table aria-label="simple table">
        <TableHeader
          columns={columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody columns={columns} data={data} />
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
