import React, { useState } from "react";
import "./login-user.css";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Box from "@mui/material/Box";
import EmailModal from "./emailenter";
import { loginPost } from "../../api/login";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [open, setOpen] = React.useState(false);

  const handleLogin = async () => {
    setUsernameError("");
    setPasswordError("");
    let isValid = true;

    if (!username.trim()) {
      setUsernameError("Username is required.");
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError("Password is required.");
      isValid = false;
    }

    if (!isValid) return;

    const body = {
      username,
      password,
      role: sessionStorage.getItem("Role")?.toLocaleLowerCase(),
    };

    await loginPost(body)
      .then((response) => {
        sessionStorage.setItem("is_logged", "true");
        sessionStorage.setItem("username", response.data.user.username);
        sessionStorage.setItem("referralID", response.data.user.referralId);
        sessionStorage.setItem("role", response.data.user.role);
        sessionStorage.setItem("userId", response.data.user.userId);
        sessionStorage.setItem("email", response.data.user.email);
        sessionStorage.setItem("agentId", response.data.user.agentId);

        if (response.data.user.role === "user") {
          window.location.href = "/spin";
        } else if (response.data.user.role === "admin") {
          window.location.href = "/admin";
        } else if (response.data.user.role === "agent") {
          window.location.href = "/agent";
        } else if (response.data.user.role === "back-office") {
          window.location.href = "/back-office";
        } else if (response.data.user.role === "master") {
          window.location.href = "/master";
        }
      })
      .catch((error) => {
        console.error(error);
        setUsernameError("Login failed. Please check your credentials.");
        setPasswordError("Login failed. Please check your credentials.");
      });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Box
      component={"div"}
      sx={{
        display: "flex",
        height: { xs: "100%", sm: "100vh" },
        backgroundImage: `url('/monthly.jpeg')`,
        width: "100%",
        backgroundSize: "auto",
      }}
    >
      {open && <EmailModal setOpen={setOpen} />}
      <div className="login-container">
        <div className="logo">
          <h1>Login</h1>
        </div>
        <div className="input-container">
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              if (e.target.value) setUsernameError("");
            }}
            placeholder="Username or E-mail"
            className="login-input"
          />
          {usernameError && (
            <div className="error-message" style={{ color: "red" }}>
              {usernameError}
            </div>
          )}
        </div>
        <div className="input-container">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (e.target.value) setPasswordError("");
            }}
            placeholder="Password"
            className="login-input"
            style={passwordError ? { border: "1px solid red" } : {}}
          />
          <IconButton
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            edge="end"
            style={{ marginLeft: "-40px" }}
          >
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
          {passwordError && (
            <div className="error-message" style={{ color: "red" }}>
              {passwordError}
            </div>
          )}
        </div>
        <button className="login-button" onClick={handleLogin}>
          Sign In
        </button>
        <div
          className="footer-links"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div
            onClick={() => {
              setOpen(true);
            }}
            style={{ color: "#ed644c", fontWeight: "500", cursor: "pointer" }}
          >
            Forgot Password?
          </div>
          {sessionStorage.getItem("Role") === "User" && (
            <div
              style={{ color: "green", fontWeight: "600", cursor: "pointer" }}
              onClick={() => {
                window.location.href = "/sign-up";
              }}
            >
              Sign Up
            </div>
          )}
        </div>
      </div>
    </Box>
  );
};

export default Login;
