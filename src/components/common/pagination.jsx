import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import _ from "lodash";

const Pagination = (props) => {
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
            <Button
              variant="contained"
              color={page === currentPage ? "primary" : "default"}
              onClick={() => onPageChange(page)}
            >
              {page}
            </Button>
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
