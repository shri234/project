import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import BackOfficeNavbar from "./NavBar";
import axios from "axios";

const AgentCreation = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const handleAgentCreation = async (digits: any) => {
    const body = {
      role: "Agent",
      username: name,
      email: email,
      password: password,
      mobileNumber: phone,
    };
    await axios
      .post("http://localhost:3002/user/addAgent", body)
      .then((res) => {
        if (res.status === 200) {
          window.alert("Success! Agent has been successfully created.");
        }
        window.location.href = "/back-office";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box>
      <BackOfficeNavbar path="/back-office" />

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        padding={3}
      >
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
            borderRadius: "5px",
            boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;`,
            p: 2,
          }}
          noValidate
          autoComplete="off"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <TextField
            required
            id="name-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Name"
            type="text"
          />
          <TextField
            required
            id="phone-input"
            label="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
          />
          <TextField
            required
            id="email-input"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <TextField
            required
            id="password-input"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAgentCreation}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AgentCreation;
