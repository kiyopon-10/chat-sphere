import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import DarkModeSwitch from "./DarkMode/DarkModeSwitch";
import { useState } from "react";

const AccountButton = () => {
  // setting the anchor element with respect to what the menu will be positioned and displayed
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);  // if there is an anchor element it will be true or false

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }; // setting the anchor element

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={isMenuOpen}
      keepMounted
      onClose={handleMenuClose}
    >
      <MenuItem>
        <DarkModeSwitch />
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ display: { xs: "flex" } }}>
      <IconButton edge="end" color="inherit" onClick={handleProfileMenuOpen}>
        <AccountCircle />
      </IconButton>
      {renderMenu}
    </Box>
  );
};
export default AccountButton;
