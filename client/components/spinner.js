import CircularProgress from "@material-ui/core/CircularProgress";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import HUE from "@material-ui/core/colors/blue";

const progressTheme = createMuiTheme({
  palette: {
    primary: { main: HUE[500], contrastText: "red" },
  },
});

export default function Spinner() {
  return (
    <MuiThemeProvider theme={progressTheme}>
      <CircularProgress style={{ margin: "5% 0" }} />
    </MuiThemeProvider>
  );
}
