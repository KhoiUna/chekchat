import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Badge from "@material-ui/core/Badge";

const useStyles = makeStyles({
  root: {
    maxWidth: 270,
  },
  media: {
    height: 20,
  },
  gridColumn: {
    display: "grid",
    gridTemplateColumns: "1fr 0fr 1fr",
  },
  gridRow: {
    display: "grid",
    gridTemplateRows: "1fr 1fr",
  },
  overflowText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  overflowUsername: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    padding: "0 0.5rem",
  },
  divider: {
    margin: "0.7rem 0 0.7rem 0",
  },
  badge: {
    margin: "0.8rem 0",
  },
});

export default function MissionRequest({ status, username, subject }) {
  const classes = useStyles();

  return (
    <Badge
      badgeContent={status === "Pending" ? `${status}...` : status}
      color="primary"
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      className={classes.badge}
    >
      <Card className={classes.root}>
        <CardActionArea className={classes.gridColumn}>
          <div className={classes.gridRow}>
            <Typography gutterBottom variant="inherit" component="h2">
              Sent to:
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              component="h2"
              className={classes.overflowUsername}
            >
              {username}
            </Typography>
          </div>

          <Divider
            orientation="vertical"
            flexItem
            className={classes.divider}
          />

          <CardContent className={classes.gridRow}>
            <Typography gutterBottom variant="inherit" component="h2">
              Subject:
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              component="h2"
              className={classes.overflowText}
            >
              {subject || "Design logo"}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Badge>
  );
}
