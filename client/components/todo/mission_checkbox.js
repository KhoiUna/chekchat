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
import Checkbox from "@material-ui/core/Checkbox";
import { useState } from "react";
import MissionPopupView from "../missions/mission_popup_view";

const useStyles = makeStyles({
  root: {
    width: "90%",
    maxWidth: 600,
    margin: "1rem 0",
  },
  gridColumn: {
    display: "grid",
    gridTemplateColumns: "1fr 0fr 5fr",
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

const theme = createMuiTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
});

export default function MissionCheckbox({
  missionId,
  completed,
  subject,
  due_date,
  username,
}) {
  const classes = useStyles();

  const [missionPopupView, setMissionPopupView] = useState(false);
  const toggleMissionPopupView = () => {
    setMissionPopupView(!missionPopupView);
  };

  const [checked, setChecked] = useState(completed);
  const handleChange = ({ target }) => {
    setChecked(target.checked);
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
              onChange={handleChange}
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
                  {new Date(due_date).toLocaleTimeString()}
                </span>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </MuiThemeProvider>

      {missionPopupView && (
        <MissionPopupView
          requestId={missionId}
          toggleMissionPopupView={toggleMissionPopupView}
          fromPage="todo"
        />
      )}
    </>
  );
}
