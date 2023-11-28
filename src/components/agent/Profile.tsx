import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import axios from "axios";
import { isAuthenticated } from "../isAuthenticated/IsAuthenticated";
import { handleLogout } from "../../utill";
import Loader from "../loader/Loader";

function getAgentId() {
  let agentId = sessionStorage.getItem("agentId");
  return agentId;
}
const AgentProfile = () => {
  const agentid = getAgentId();
  const [agentname, setAgentName] = useState("");
  const [agentemail, setAgentEmail] = useState("");
  const [agentPhone, setAgentPhone] = useState("");
  const [agentcode, setAgentCode] = useState("");
  const [open_loader, setOpenLoader] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_IP}/user/getAgent?agentId=${agentid}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setAgentName(response.data.data.username);
      setAgentPhone(response.data.data.mobileNumber);
      setAgentCode(response.data.data.agentId);
      setOpenLoader(false);
    } catch (err) {
      setOpenLoader(false);
      console.log(err);
    }
  };

  useEffect(() => {
    setOpenLoader(true);
    fetchData();
  }, []);

  return (
    isAuthenticated("agent") && (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            margin: "20px",
            maxWidth: "350px",

            p: 2,
            borderRadius: "5px",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          }}
        >
          {open_loader && <Loader />}
          <Box
            component={"div"}
            sx={{
              color: "#590651",
              fontWeight: "bold",
              mb: 2,
              fontSize: "20px",
            }}
          >
            Agent Profile
          </Box>
          <Stack direction="column" spacing={2}>
            <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ width: "100px" }}>Name:</Box>
              <input
                type="text"
                value={agentname}
                onChange={(e) => setAgentName(e.target.value)}
                placeholder="Enter your Name"
              />
            </Box>
            <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ width: "100px" }}>Phone:</Box>
              <input
                type="tel"
                value={agentPhone}
                onChange={(e) => setAgentPhone(e.target.value)}
                placeholder="Enter your Phone no"
              />
            </Box>
            <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ width: "100px" }}>Mail:</Box>
              <input
                type="email"
                value={agentemail}
                onChange={(e) => setAgentEmail(e.target.value)}
                placeholder="Enter your Mail"
              />
            </Box>
            <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ width: "100px" }}>Code:</Box>
              <input
                type="text"
                value={agentcode}
                onChange={(e) => setAgentCode(e.target.value)}
                placeholder="Enter your Code"
              />
            </Box>
          </Stack>
          <Box
            sx={{ marginTop: "20px", display: "flex", justifyContent: "start" }}
          >
            <Button
              variant="outlined"
              sx={{
                background: "red",
                color: "#fff",
                fontWeight: "600",
                ":hover": {
                  background: "red",
                },
              }}
              onClick={() => {
                handleLogout();
                window.location.href = "/";
              }}
            >
              Logout
            </Button>
          </Box>
        </Box>
      </Box>
    )
  );
};

export default AgentProfile;
