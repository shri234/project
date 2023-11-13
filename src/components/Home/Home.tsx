import React from "react";
import "./Home.css";
import { Box } from "@mui/material";

const HomeLand: React.FC = () => {
  const handleLoginType = (type: string, path: string) => {
    // Handle login logic based on the type (Admin, User, or Agent)
    window.location.href = `/${path}`;
    console.log(`Login as: ${type}`);
  };

  return (
    <Box
      className="login-container"
      sx={{ maxWidth: { xs: "220px", sm: "350px" } }}
    >
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <h1
          style={{
            textAlign: "center",
            marginBottom: "50px",
            color: "#060538",
            fontWeight: "bold",
            fontSize: "40px",
            backgroundImage: `url('/spin_background.svg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            display: "inline-block", // to restrict the background to content width
            padding: "50px", // to give space around the text relative to the background
          }}
        >
          SPIN
        </h1>
      </Box>

      <div className="button-row">
        <button
          className="role-button admin"
          onClick={() => handleLoginType("Admin", "daily")}
        >
          Daily
        </button>
        <button
          className="role-button user"
          onClick={() => handleLoginType("User", "weekly")}
        >
          Weekly
        </button>
        <button
          className="role-button agent"
          onClick={() => handleLoginType("Agent", "monthly")}
        >
          Monthly
        </button>
      </div>
    </Box>
  );
};

export default HomeLand;
