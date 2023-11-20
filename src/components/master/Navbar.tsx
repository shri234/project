import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Avatar, Menu, MenuItem, Tooltip } from "@mui/material";

const settings = ["Logout"];
const MasterNavbar: React.FC<{ path: string }> = ({ path }) => {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (name: string) => {
    if (name === "Logout") {
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
              alignItems: "start",
              justifyContent: "start",
            }}
          >
            <IconButton
              onClick={handleOpenUserMenu}
              sx={{
                p: 0,
                // width: "60px",
                // height: "60px",
                borderRadius: "100%",
                // background: "grey",
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
              {/* Master */}
              {sessionStorage.getItem("username")}
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
