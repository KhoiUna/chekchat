import { useState } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import FilterListIcon from "@material-ui/icons/FilterList";
import utilsStyle from "../../styles/utils.module.css";
import { buttonTheme } from "../../themes/theme";

const StyledMenu = (props) => (
  <Menu
    elevation={3}
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
);

export default function FilterButton({ filterSentMissionList }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = ({ currentTarget }) => {
    setAnchorEl(currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [activeMenuItem, setActiveMenuItem] = useState("None");
  const handleClickMenuItem = (target, status) => {
    setActiveMenuItem(target.innerHTML);
    filterSentMissionList(status);
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
        <MenuItem
          onClick={({ target }) => handleClickMenuItem(target, "None")}
          style={
            activeMenuItem === "None"
              ? { backgroundColor: "#c0c0c078", color: "#2196f3" }
              : { backgroundColor: "transparent", color: "black" }
          }
        >
          <ListItemText primary="None" />
        </MenuItem>
        <MenuItem
          onClick={({ target }) => handleClickMenuItem(target, "Pending")}
          style={
            activeMenuItem === "Pending"
              ? { backgroundColor: "#c0c0c078", color: "#2196f3" }
              : { backgroundColor: "transparent", color: "black" }
          }
        >
          <ListItemText primary="Pending" />
        </MenuItem>
        <MenuItem
          onClick={({ target }) => handleClickMenuItem(target, "Accepted")}
          style={
            activeMenuItem === "Accepted"
              ? { backgroundColor: "#c0c0c078", color: "#2196f3" }
              : { backgroundColor: "transparent", color: "black" }
          }
        >
          <ListItemText primary="Accepted" />
        </MenuItem>
        <MenuItem
          onClick={({ target }) => handleClickMenuItem(target, "Rejected")}
          style={
            activeMenuItem === "Rejected"
              ? { backgroundColor: "#c0c0c078", color: "#2196f3" }
              : { backgroundColor: "transparent", color: "black" }
          }
        >
          <ListItemText primary="Rejected" />
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
