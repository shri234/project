import React,{useState,useEffect} from "react";
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
import axios from "axios";
import moment from "moment";

const settings = ["Profile", "Logout"];

const TicketNavBar: React.FC<{ name: string }> = ({ name }) => {
  const [balance, setBalance] = React.useState(0);

  const [auth, setAuth] = React.useState(true);
  // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

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
      window.location.href = "/";
    } else if (name === "Balance") {
    }
    setAnchorElUser(null);
  };
  useEffect(() => {
    let date=new Date();
    let datee=moment(date).format("YYYY-MM-DD")
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://43.204.150.238:3002/ticket/getWallet?userId=${sessionStorage.getItem("userId")}`,{
          headers: {
            'Content-Type':"application/json"
          }
        });
        setBalance(response.data.data.amount);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }
,[]);
  return (
    <AppBar position="sticky" sx={{ background: "#1a1c6b" }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => {
            window.location.href = "/spin";
          }}
        >
          <ArrowBackIcon sx={{ fontSize: "2.25rem" }} />
        </IconButton>
        <Typography
          variant="h5"
          component="div"
          sx={{ flexGrow: 1, textAlign: "center", fontWeight: "700" }}
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
              gap: "35px",
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
                <AccountBalanceWalletIcon sx={{ fontSize: "30px" }} />
              </Box>
              <Tooltip title={`Balance:${balance}`}>
                <Box
                  component={"div"}
                  sx={{ fontSize: "18px", fontWeight: 650 }}
                >
                  {" "}
                  ₹{balance}
                </Box>
              </Tooltip>
            </Box>
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
