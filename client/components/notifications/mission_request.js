import {
  makeStyles,
  MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import DoneIcon from "@material-ui/icons/Done";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles({
  root: {
    maxWidth: 270,
  },
  gridColumn: {
    display: "grid",
    gridTemplateColumns: "1fr 0fr 2fr",
  },
  gridRow: {
    display: "grid",
    gridTemplateRows: "1fr 1fr",
  },
  notificationgridRow: {
    display: "grid",
    gridTemplateRows: "2fr 1fr",
  },
  badge: {
    margin: "0.8rem 0",
  },
  overflowText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  notificationRoot: {
    maxWidth: 270,
    margin: "0.8rem 0",
  },
  divider: {
    margin: "0.7rem 0 0.7rem 0",
  },
});

const friendRequestButtonTheme = createMuiTheme({
  palette: {
    primary: { main: "#2cb32c" },
  },
});

export default function MissionRequest({ requestId, username, subject }) {
  const classes = useStyles();

  return (
    <Card className={classes.notificationRoot}>
      <CardActionArea className={classes.gridColumn}>
        <div className={classes.gridRow}>
          <Typography gutterBottom variant="inherit" component="h2">
            From:
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

        <Divider orientation="vertical" flexItem className={classes.divider} />

        <CardContent className={classes.notificationgridRow}>
          <Typography
            gutterBottom
            variant="h6"
            className={classes.overflowText}
          >
            holder
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            email
          </Typography>

          <CardActions>
            <MuiThemeProvider theme={friendRequestButtonTheme}>
              <IconButton
                aria-label="accept"
                color="primary"
                onClick={() => onClickAction("accept", requestId)}
              >
                <DoneIcon />
              </IconButton>
            </MuiThemeProvider>
          </CardActions>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
