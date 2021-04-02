import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
// import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
// import SearchIcon from '@material-ui/icons/Search';
import SvgIcon from '@material-ui/core/SvgIcon';
import clsx from 'clsx';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HdIcon from '@material-ui/icons/Hd';
import HighQualityIcon from '@material-ui/icons/HighQuality';
import MovieIcon from '@material-ui/icons/Movie';
import Switch from '@material-ui/core/Switch'
import Box from '@material-ui/core/Box';
import { MOVIE_QUALITY, MOVIE_YEAR } from "../../constants/movieFilter";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    // display: 'none',
    // [theme.breakpoints.up('sm')]: {
    //   display: 'block',
    // },
  },
  color: {
    color: 'secondary',
    backgroundColor: 'secondary',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}));

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

function handleItemSelect(item) {
  window.location = `/movies/${item.target.innerText}`;
}

function handleHomeSelect(item) {
  window.location = `/`;
}

function handleDarkCheckChange() {
  const theme = localStorage.getItem("theme");
  if (theme === null) {
    localStorage.setItem("theme", "dark");
  } else {
    if (theme === "dark") {
      localStorage.setItem("theme", "light");
      window.location.reload();
    } else if (theme === "light") {
      localStorage.setItem("theme", "dark");
      window.location.reload();
    }
  }
}

export default function SearchAppBar() {
  const classes = useStyles();

  const theme = localStorage.getItem("theme");

  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Typography
          variant="subtitle2"
          style={{ marginLeft: "10px", marginTop: "10px" }}
          color="inherit"
        >
          FIND BY QUALITY
        </Typography>
        {MOVIE_QUALITY.map((text, index) => (
          <ListItem button key={text} onClick={handleItemSelect}>
            <ListItemIcon>{index % 2 === 0 ? <Box color="error.main">
              <HdIcon />
            </Box> : <Box color="info.main">
              <HighQualityIcon />
            </Box>}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <Typography
        variant="subtitle2"
        style={{ marginLeft: "10px", marginTop: "10px" }}
        color="inherit"
      >
        FIND BY RELEASE YEAR
        </Typography>
      <List>
        {MOVIE_YEAR.map((text, index) => (
          <ListItem button key={text} onClick={handleItemSelect}>
            <ListItemIcon>
              <Box color="warning.main">
                <MovieIcon />
              </Box>
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button key={"All"} onClick={handleItemSelect}>
          <ListItemIcon><Box color="info.main">
            <MovieIcon />
          </Box></ListItemIcon>
          <ListItemText primary={"All Movies"} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <SwipeableDrawer
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
        onOpen={toggleDrawer("left", true)}
      >
        {list("left")}
      </SwipeableDrawer>
      <AppBar position="static" color="primary">
        <Toolbar>

          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer("left", true)}
          >
            <MenuIcon />
          </IconButton>

          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={handleHomeSelect}
          >
            <HomeIcon />
          </IconButton>

          <Typography className={classes.title} variant="subtitle1" noWrap>
            Movie Lander
          </Typography>
          {/* <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div> */}
          <Typography variant="caption" style={{ float: "right" }} >
            Dark Mode
          </Typography>
          <Switch
            checked={theme === "dark" ? true : false}
            onChange={handleDarkCheckChange}
            color={"default"}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
}
