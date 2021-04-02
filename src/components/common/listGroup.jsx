import React from "react";

const ListGroup = (props) => {
  const { items, selectedItem, onItemSelect } = props;
  return (
    <div>
      <button
        className="btn btn-dark btn-sm dropdown-toggle dropdown-toggle-split"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {selectedItem ? selectedItem : items[0]}
      </button>
      <div className="dropdown-menu">
        {items.map((item) => (
          <button
            type="button"
            onClick={() => onItemSelect(item)}
            key={item}
            className={
              item === selectedItem
                ? "btn btn-sm btn-secondary dropdown-item active "
                : " btn btn-sm btn-secondary dropdown-item"
            }
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ListGroup;
