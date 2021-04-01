import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 300
  },
  media: {
    width: "100%",
    height: "100%",
    paddingTop: "56.25%", // 16:9
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const CardComponent = (props) => {
  const classes = useStyles();
  // const bull = <span className={classes.bullet}>•</span>;

  const { data, columns, onActionClick } = props;
  return (
    <div className="row">
      {data.map((item, index) => [
        <Card key={index} className={classes.root}>
          <CardContent key={index}>
            {columns.map((m) => {
              if (m.type === "title") {
                return (
                  <Typography
                    key={m.path}
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    {item[m.path]}
                  </Typography>
                );
              } else if (m.type === "subTitle") {
                return (
                  <Typography key={m.path} variant="body2" component="p">
                    {m.label}: {item[m.path]}
                    <br />
                    {'"a benevolent smile"'}
                  </Typography>
                );
              } else if (m.type === "boolean") {
                return (
                  <Typography key={m.path} variant="body2" component="p">
                    {m.label}: {item[m.path].toString()}
                    <br />
                    {'"a benevolent smile"'}
                  </Typography>
                );
              } else if (m.type === "image") {
                return (
                  <CardMedia
                    key={m.key}
                    className={classes.media}
                    image={m.img}
                    title={m.title}
                  />
                );
              } else if (m.type === "button") {
                return (
                  <CardActions key={m.key}>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ marginBottom: "20px" }}
                      onClick={onActionClick}
                    >
                      {m.title}
                    </Button>
                  </CardActions>
                );
              } else {
                 return (
                  <div></div>
                 )
              }
            })}
          </CardContent>
        </Card>,
      ])}
    </div>
  );
};

export default CardComponent;
