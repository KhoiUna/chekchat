import { useState } from "react";
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import SortIcon from "@material-ui/icons/Sort";
import utilsStyle from "../../styles/utils.module.css";
import HUE from "@material-ui/core/colors/blue";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: "#f1f1f1",
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: HUE[500],
      },
    },
  },
}))(MenuItem);

const buttonTheme = createMuiTheme({
  palette: {
    primary: { main: HUE[500], contrastText: "white" },
  },
});

export default function FilterButton({ filterSentMissionList }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = ({ currentTarget }) => {
    setAnchorEl(currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={utilsStyle.filterButton}>
      <MuiThemeProvider theme={buttonTheme}>
        <Button
          aria-controls="sort menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
          onClick={handleClick}
        >
          <b>Filter</b> <SortIcon style={{ marginLeft: "0.3rem" }} />
        </Button>
      </MuiThemeProvider>

      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <ListItemText
            primary="None"
            onClick={() => filterSentMissionList("None")}
          />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemText
            primary="Pending"
            onClick={() => filterSentMissionList("Pending")}
          />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemText
            primary="Accepted"
            onClick={() => filterSentMissionList("Accepted")}
          />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemText
            primary="Rejected"
            onClick={() => filterSentMissionList("Rejected")}
          />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}
