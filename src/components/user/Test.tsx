import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

import Container from "@mui/material/Container";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function ResponsiveAppBar({ path }: { path: string }) {
  return (
    <AppBar position="fixed" sx={{ background: "#1a1c6b" }}>
      <Container>
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
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
            <span
              style={{ marginLeft: "4px", fontSize: "20px", fontWeight: "600" }}
            >
              Profile
            </span>
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
