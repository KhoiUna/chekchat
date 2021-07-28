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
import Checkbox from "@material-ui/core/Checkbox";
import { useState } from "react";
import MissionPopupView from "../missions/mission_popup_view";
import FormatDatetime from "../../helpers/FormatDatetime";
import StarIcon from "@material-ui/icons/Star";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles({
  root: {
    width: "85%",
    maxWidth: 600,
    margin: "1rem 0",
  },
  gridColumn: {
    display: "grid",
    gridTemplateColumns: "1fr 0fr 5fr 0fr",
  },
  gridRow: {
    display: "grid",
    gridTemplateRows: "1fr 1fr",
    textAlign: "left",
    margin: 0,
  },
  overflowText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    margin: 0,
  },
  divider: {
    margin: "0.7rem 0 0.7rem 0",
  },
  checkbox: {
    backgroundColor: "transparent",
  },
  due_date: {
    marginTop: "0.5rem",
  },
});

const theme = createTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
});

export default function MissionCheckbox({
  missionId,
  completed,
  starred,
  subject,
  due_date,
  username,
  updateMissionState,
  status,
}) {
  const classes = useStyles();

  const [missionPopupView, setMissionPopupView] = useState(false);
  const toggleMissionPopupView = () => {
    setMissionPopupView(!missionPopupView);
  };

  const [checked, setChecked] = useState(completed);
  const handleChange = ({ target }, missionId) => {
    setChecked(target.checked);
    updateMissionState(missionId, "check", target.checked);
  };

  const [star, setStar] = useState(starred);
  const starTask = (e, missionId) => {
    setStar(!star);
    updateMissionState(missionId, "star", !star);
  };

  return (
    <>
      <MuiThemeProvider theme={theme}>
        <Card
          className={classes.root}
          style={checked ? { opacity: 0.6 } : null}
        >
          <CardActionArea className={classes.gridColumn}>
            <Checkbox
              checked={checked}
              onChange={(e) => handleChange(e, missionId)}
              color="primary"
              inputProps={{ "aria-label": "mission checkbox" }}
              className={classes.checkbox}
            />

            <Divider
              orientation="vertical"
              flexItem
              className={classes.divider}
            />

            <CardContent
              className={classes.gridRow}
              onClick={toggleMissionPopupView}
            >
              <Typography
                gutterBottom
                variant="h6"
                className={classes.overflowText}
                style={checked ? { textDecoration: "line-through" } : null}
              >
                <b>From:</b> {username}
              </Typography>

              <Typography
                gutterBottom
                variant="h6"
                className={classes.overflowText}
                style={checked ? { textDecoration: "line-through" } : null}
              >
                <b>Subject:</b> {subject}
              </Typography>

              <Typography
                variant="body2"
                gutterBottom
                className={classes.due_date}
                style={checked ? { textDecoration: "line-through" } : null}
              >
                <b>Due: </b>
                {new Date(due_date).toLocaleDateString()}
                <span style={{ marginLeft: "0.3rem" }}>
                  {FormatDatetime.forTodoAndMissions(due_date)}
                </span>
              </Typography>
            </CardContent>

            <IconButton
              onClick={(e) => starTask(e, missionId)}
              aria-label="Star task"
            >
              {star ? (
                <StarIcon style={{ color: "#ffa500", fontSize: "2rem" }} />
              ) : (
                <StarOutlineIcon style={{ fontSize: "2rem" }} />
              )}
            </IconButton>
          </CardActionArea>
        </Card>
      </MuiThemeProvider>

      {missionPopupView && (
        <MissionPopupView
          requestId={missionId}
          toggleMissionPopupView={toggleMissionPopupView}
          fromPage="todo"
          status={status}
        />
      )}
    </>
  );
}
