import {
  createTheme,
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

//
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

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
    margin: "0.8rem 2rem",
  },
});

const badgeTheme = createTheme({
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
  sent_date,
  cancelOrRemoveTask,
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
        >
          <Card className={classes.root}>
            <TaskOptionMenu
              status={status}
              cancelOrRemoveTask={cancelOrRemoveTask}
              requestId={requestId}
            />

            <CardActionArea
              className={classes.gridColumn}
              onClick={toggleMissionPopupView}
            >
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

            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              style={{ textAlign: "right", margin: "0 3% 2% 0" }}
            >
              Sent on: {new Date(sent_date).toLocaleDateString()}
            </Typography>
          </Card>
        </Badge>
      </MuiThemeProvider>

      {missionPopupView && (
        <MissionPopupView
          requestId={requestId}
          toggleMissionPopupView={toggleMissionPopupView}
          fromPage="send"
          status={status}
        />
      )}
    </>
  );
}

function TaskOptionMenu({ status, requestId, cancelOrRemoveTask }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const options = [status === "Pending" ? "Cancel sending" : "Remove task"];

  return (
    <div style={{ textAlign: "right", backgroundColor: "#c7c7c7c7" }}>
      <IconButton
        aria-label="more"
        aria-controls="sent-task-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>

      <Menu
        id="sent-task-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: "20ch",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            onClick={() => {
              cancelOrRemoveTask(
                status === "Pending" ? "cancel" : "remove",
                requestId
              );
              handleClose();
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
