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
import Button from "@material-ui/core/Button";
import HUE from "@material-ui/core/colors/blue";

const useStyles = makeStyles({
  notificationRoot: {
    maxWidth: 320,
    margin: "0.8rem 0",
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
});

const buttonTheme = createMuiTheme({
  palette: {
    primary: { main: HUE[500] },
  },
});

export default function MissionRequest({
  requestId,
  username,
  subject,
  onClickAction,
}) {
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
          <Typography gutterBottom variant="inherit" component="h2">
            Subject:
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            component="h2"
            className={classes.overflowText}
          >
            {subject}
          </Typography>

          <CardActions>
            <MuiThemeProvider theme={buttonTheme}>
              <Button
                variant="outlined"
                aria-label="view and reply"
                color="primary"
                onClick={() => onClickAction(requestId)}
              >
                View & Reply
              </Button>
            </MuiThemeProvider>
          </CardActions>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
