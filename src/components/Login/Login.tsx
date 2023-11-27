import React from "react";
import "./Login.css";
import { Box } from "@mui/material";

const LoginComponent: React.FC = () => {
  const handleLoginType = (type: string) => {
    sessionStorage.setItem("Role", type);
    window.location.href = "/login";
  };

  return (
    <Box
      component={"div"}
      className="login-page-container"
      sx={{
        display: "flex",
        height: { xs: "100%", sm: "100vh" },
        backgroundImage: `url('/monthly.jpeg')`,
        width: "100%",
      }}
    >
      <Box
        className="login-container"
        sx={{ maxWidth: { xs: "220px", sm: "350px" } }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "50px",
            color: "#060538",
            fontWeight: "bold",
            fontSize: "40px",
          }}
        >
          Login
        </h1>
        <div className="button-row">
          <button
            className="role-button user"
            onClick={() => handleLoginType("User")}
          >
            User
          </button>
          <button
            className="role-button admin"
            onClick={() => handleLoginType("Agent")}
          >
            Agent
          </button>

          <button
            className="role-button agent"
            onClick={() => handleLoginType("Management")}
          >
            Management
          </button>
        </div>
      </Box>
    </Box>
  );
};

export default LoginComponent;
