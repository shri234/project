import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Menu, MenuItem, Tooltip } from "@mui/material";
import { handleLogout } from "../../utill";

const settings = ["Logout"];
const MasterNavbar: React.FC<{ path: string }> = ({ path }) => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (name: string) => {
    if (name === "Logout") {
      handleLogout();
      window.location.href = "/";
    }
  };

  return (
    <AppBar position="sticky" sx={{ background: "#1a1c6b" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => {
            window.location.href = path;
          }}
        >
          <ArrowBackIcon sx={{ fontSize: "2.25rem" }} />
        </IconButton>

        <Tooltip title="Open settings">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton
              onClick={handleOpenUserMenu}
              sx={{
                p: 0,

                borderRadius: "100%",
              }}
            >
              <Avatar alt="Remy Sharp" src="/avatar.svg" />
            </IconButton>
            <Box
              component={"div"}
              sx={{
                fontWeight: "650",
                fontSize: "18px",
                color: "#ac92e8",
                mb: 0.5,
              }}
            >
              Master
            </Box>
          </Box>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting) => (
            <MenuItem
              key={setting}
              onClick={() => handleCloseUserMenu(setting)}
            >
              <Typography textAlign="center">{setting}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
export default MasterNavbar;
