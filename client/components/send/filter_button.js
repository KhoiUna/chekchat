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
import FilterListIcon from "@material-ui/icons/FilterList";
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
          aria-controls="filter-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
          onClick={handleClick}
        >
          <b>Filter</b> <FilterListIcon style={{ marginLeft: "0.3rem" }} />
        </Button>
      </MuiThemeProvider>

      <StyledMenu
        id="filter-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={() => filterSentMissionList("None")}>
          <ListItemText primary="None" />
        </StyledMenuItem>
        <StyledMenuItem onClick={() => filterSentMissionList("Pending")}>
          <ListItemText primary="Pending" />
        </StyledMenuItem>
        <StyledMenuItem onClick={() => filterSentMissionList("Accepted")}>
          <ListItemText primary="Accepted" />
        </StyledMenuItem>
        <StyledMenuItem onClick={() => filterSentMissionList("Rejected")}>
          <ListItemText primary="Rejected" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}
