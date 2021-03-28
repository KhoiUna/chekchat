import {
  createMuiTheme,
  MuiThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Badge from "@material-ui/core/Badge";
import { useState } from "react";
import MissionPopupView from "./mission_popup_view";

const useStyles = makeStyles({
  root: {
    width: 270,
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

const badgeTheme = createMuiTheme({
  overrides: {
    MuiBadge: {
      colorSecondary: {
        backgroundColor: "#2cb32c",
      },
    },
  },
});

export default function MissionRequest({
  requestId,
  status,
  username,
  subject,
}) {
  const classes = useStyles();

  const [missionPopupView, setMissionPopupView] = useState(false);
  const toggleMissionPopupView = () => {
    setMissionPopupView(!missionPopupView);
  };

  return (
    <>
      <MuiThemeProvider theme={badgeTheme}>
        <Badge
          badgeContent={
            status !== "Pending"
              ? status === "Accepted"
                ? `${status} ✔`
                : `${status} x`
              : `${status} ...`
          }
          color={
            status !== "Pending"
              ? status === "Accepted"
                ? "secondary"
                : "error"
              : "primary"
          }
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          className={classes.badge}
          onClick={toggleMissionPopupView}
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
                  {subject}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Badge>
      </MuiThemeProvider>

      {missionPopupView && (
        <MissionPopupView
          requestId={requestId}
          toggleMissionPopupView={toggleMissionPopupView}
          fromPage="assigning"
        />
      )}
    </>
  );
}
