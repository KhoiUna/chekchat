import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles";
import { buttonTheme } from "../themes/theme";
import RefreshIcon from "@material-ui/icons/Refresh";
import Fab from "@material-ui/core/Fab";

const useStyles = makeStyles({
  refreshButton: {
    position: "fixed",
    bottom: "1rem",
    right: "0.8rem",
    zIndex: 1,
  },
});

export default function RefreshButton({ refresh }) {
  const classes = useStyles();

  return (
    <MuiThemeProvider theme={buttonTheme}>
      <Fab
        color="primary"
        aria-label="refresh inbox"
        className={classes.refreshButton}
        onClick={() => refresh()}
      >
        <RefreshIcon style={{ fontSize: "2rem" }} />
      </Fab>
    </MuiThemeProvider>
  );
}
