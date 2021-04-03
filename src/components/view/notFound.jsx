import React from "react";
import { Fab } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import NavigationIcon from "@material-ui/icons/Navigation";

const NotFound = () => {
  const classes = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));
  return (
    <div className="container">
      <h3>Page Not Found</h3>
      <Link to="/">
        <Fab variant="extended" color="secondary">
          <NavigationIcon className={classes.extendedIcon} color="inherit" />
          Navigate To Home
        </Fab>
      </Link>
    </div>
  )
};

export default NotFound;
