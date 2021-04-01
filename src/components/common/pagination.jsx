import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { blueGrey, blue } from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography";
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  grey: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    color: theme.palette.getContrastText(blueGrey[200]),
    backgroundColor: blueGrey[200],
  },
  blue: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    color: theme.palette.getContrastText(blue[900]),
    backgroundColor: blue[900],
  },
}));

const Pagination = (props) => {
  const classes = useStyles();

  const { itemsCount, pageSize, currentPage, onPageChange } = props;

  const pagesCount = Math.ceil(itemsCount / pageSize);

  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  const renderedPages =
    _.indexOf(pages, currentPage + 1, 0) - pages[0] === 0
      ? _.slice(pages, currentPage - 1, _.indexOf(pages, currentPage + 4, 0))
      : _.size(pages) - currentPage < 3
      ? _.slice(pages, currentPage - 2, _.size(pages))
      : _.slice(pages, currentPage - 2, _.indexOf(pages, currentPage + 3, 0));
  return (
    <nav>
      <ul className="pagination">
        {renderedPages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
            style={{ marginRight: "5px" }}
          >
            <Avatar
              variant="rounded"
              className={page === currentPage ? classes.blue : classes.grey}
              onClick={() => onPageChange(page)}
            >
              <Typography
                variant="body2" 
                // style={{ fontSize: "14" }}
                color="inherit"
                gutterBottom
              >
                {page}
              </Typography>
            </Avatar>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
