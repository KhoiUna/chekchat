import {
  createMuiTheme,
  makeStyles,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import RefreshIcon from "@material-ui/icons/Refresh";
import Fab from "@material-ui/core/Fab";
import HUE from "@material-ui/core/colors/blue";

const useStyles = makeStyles({
  refreshButton: {
    position: "fixed",
    bottom: "1rem",
    left: "0.8rem",
    zIndex: 1,
  },
});

const buttonTheme = createMuiTheme({
  palette: {
    primary: { main: HUE[500], contrastText: "white" },
  },
});

export default function RefreshButton() {
  const classes = useStyles();

  const refresh = () => location.reload();

  return (
    <MuiThemeProvider theme={buttonTheme}>
      <Fab
        color="primary"
        aria-label="refresh inbox"
        className={classes.refreshButton}
        onClick={refresh}
      >
        <RefreshIcon style={{ fontSize: "2rem" }} />
      </Fab>
    </MuiThemeProvider>
  );
}
