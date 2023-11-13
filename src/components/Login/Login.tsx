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
  );
};

export default LoginComponent;
