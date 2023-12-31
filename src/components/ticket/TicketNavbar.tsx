import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

import { handleLogout } from "../../utill";

const settings = ["Profile", "Logout"];

const TicketNavBar: React.FC<{
  name: string;
  wallet_amount: number;
}> = ({ name, wallet_amount }) => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (name: string) => {
    if (name === "Profile") {
      window.location.href = "/profile";
    } else if (name === "Logout") {
      handleLogout();
      window.location.href = "/";
    } else if (name === "Balance") {
    }
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky" sx={{ background: "#1a1c6b" }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: { xs: 0, sm: 2 } }}
          onClick={() => {
            window.location.href = "/spin";
          }}
        >
          <ArrowBackIcon sx={{ fontSize: { xs: "1.25rem", sm: "2.25rem" } }} />
        </IconButton>
        <Typography
          variant="h5"
          component="div"
          sx={{
            flexGrow: 1,
            textAlign: "center",
            fontWeight: "600",
            fontSize: "1.25rem",
          }}
        >
          {name}
        </Typography>
        <Box
          sx={{
            flexGrow: 0,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box
            component={"div"}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: { xs: "10px", sm: "35px" },
            }}
          >
            <Box
              component={"div"}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
                cursor: "pointer",
              }}
            >
              <Box component={"div"} sx={{ mt: 0.5 }}>
                <AccountBalanceWalletIcon
                  sx={{ fontSize: { xs: "20px", sm: "30px" } }}
                />
              </Box>

              <Tooltip title={`Balance:${wallet_amount}`}>
                <Box
                  component={"div"}
                  sx={{
                    fontSize: { xs: "1rem", sm: "18px" },
                    fontWeight: 650,
                  }}
                >
                  {" "}
                  ₹{wallet_amount}
                </Box>
              </Tooltip>
            </Box>
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
                  {sessionStorage.getItem("username")}
                </Box>
              </Box>
            </Tooltip>
          </Box>
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
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default TicketNavBar;
