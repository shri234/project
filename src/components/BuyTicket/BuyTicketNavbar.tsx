import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const BuyTicketNavBar: React.FC<{ name: string; path: string }> = ({
  name,
  path,
}) => {
  return (
    <AppBar position="sticky" sx={{ background: "#1a1c6b", width: "100%" }}>
      <Toolbar>
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
        <Typography
          variant="h5"
          component="div"
          sx={{ flexGrow: 1, textAlign: "center", fontWeight: "700" }}
        >
          {name}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
export default BuyTicketNavBar;
