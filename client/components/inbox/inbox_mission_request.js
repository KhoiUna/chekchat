import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import { buttonTheme } from "../../themes/theme";
import { useState } from "react";
import MissionPopupView from "../missions/mission_popup_view";

const useStyles = makeStyles({
  notificationRoot: {
    width: "85%",
    maxWidth: 600,
    margin: "0.8rem 0",
    padding: "0.8rem 0",
  },
  gridColumn: {
    display: "grid",
    gridTemplateColumns: "2fr 0fr 1fr",
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
    margin: "0",
  },
});

export default function InboxMissionRequest({
  requestId,
  username,
  subject,
  onClickAction,
}) {
  const classes = useStyles();

  const [missionPopupView, setMissionPopupView] = useState(false);
  const toggleMissionPopupView = () => {
    setMissionPopupView(!missionPopupView);
  };

  return (
    <>
      <Card className={classes.notificationRoot}>
        <CardActionArea className={classes.gridColumn}>
          <div className={classes.gridRow}>
            <Typography
              gutterBottom
              variant="inherit"
              component="h2"
              style={{ margin: "auto" }}
            >
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

            <CardActions>
              <MuiThemeProvider theme={buttonTheme}>
                <Button
                  variant="outlined"
                  aria-label="view and reply"
                  color="primary"
                  onClick={toggleMissionPopupView}
                >
                  <b>View & Reply</b>
                </Button>
              </MuiThemeProvider>
            </CardActions>
          </div>

          <Divider
            orientation="vertical"
            flexItem
            className={classes.divider}
          />

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
          </CardContent>
        </CardActionArea>
      </Card>

      {missionPopupView && (
        <MissionPopupView
          requestId={requestId}
          toggleMissionPopupView={toggleMissionPopupView}
          onClickAction={onClickAction}
          fromPage="inbox"
        />
      )}
    </>
  );
}
