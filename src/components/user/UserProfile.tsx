import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ResponsiveAppBar from "./Test";
import axios from "axios";
import { isAuthenticated } from "../isAuthenticated/IsAuthenticated";

const Profile = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [accountno, setAccountNo] = useState("");
  const [pan, setPan] = useState("");
  const [ifsc, setIfsc] = useState("");

  const [redeem, setRedeem] = useState(false);
  // Handlers for each button
  const initialRendering = async () => {
    await axios
      .get(
        `${
          process.env.REACT_APP_IP
        }/user/getUserData?userId=${sessionStorage.getItem("userId")}`
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.data.length > 0) {
          setName(res.data.data[0].username);
          setPhone(res.data.data[0].mobileNumber);
          setEmail(res.data.data[0].email);
          setAccountNo(res.data.data[0].accountNo);
          setPan(res.data.data[0].panNo);
          setAadhar(res.data.data[0].aadharNo);
          setIfsc(res.data.data[0].IFSC);
          setAddress(res.data.data[0].address);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdate = async () => {
    const body = {
      accountNo: accountno,
      IFSC: ifsc,
      panNo: pan,
      aadharNo: aadhar,
      address: address,
    };

    await axios
      .put(
        `${
          process.env.REACT_APP_IP
        }/user/updateUserDetails?userId=${sessionStorage.getItem("userId")}`,
        body
      )
      .then((res) => alert("updated successfully"))
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    initialRendering();
  }, []);

  const handleWallet = () => {
    // Implement wallet logic
    alert("Wallet clicked");
  };

  return (
    isAuthenticated("user") && (
      <Box>
        <ResponsiveAppBar path="/spin" />
        <Box
          component={"div"}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Box
            sx={{
              margin: "20px",
              maxWidth: "350px",
              p: 2,
              my: 10,
              borderRadius: "5px",
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            }}
          >
            <Box
              component={"div"}
              sx={{
                color: "#444",
                fontWeight: "bold",
                fontSize: "25px",
                // textAlign: "center",
                my: 2,
              }}
            >
              {" "}
              User Profile
            </Box>
            <Stack direction="column" spacing={2}>
              <Box
                component="div"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Box sx={{ minWidth: "100px" }}>Name:</Box>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your Name"
                  style={inputStyle}
                />
              </Box>
              <Box
                component="div"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Box sx={{ minWidth: "100px" }}>Phone No:</Box>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your Phone number"
                  style={inputStyle}
                />
              </Box>
              <Box
                component="div"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Box sx={{ minWidth: "100px" }}>Mail:</Box>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your Mail"
                  style={inputStyle}
                />
              </Box>
              <Box
                component="div"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Box sx={{ minWidth: "100px" }}>Address:</Box>
                <textarea
                  // type="textarea"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your Address"
                  style={inputStyle}
                />
              </Box>
              <Box
                component="div"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Box sx={{ minWidth: "100px" }}>Aadhar:</Box>
                <input
                  type="text"
                  value={aadhar}
                  onChange={(e) => setAadhar(e.target.value)}
                  placeholder="Enter your Aadhar number"
                  style={inputStyle}
                />
              </Box>
              <Box
                component="div"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Box sx={{ minWidth: "100px" }}>PAN:</Box>
                <input
                  type="text"
                  value={pan}
                  onChange={(e) => setPan(e.target.value)}
                  placeholder="Enter your PAN"
                  style={inputStyle}
                />
              </Box>
              <Box
                component="div"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Box sx={{ minWidth: "100px" }}>Account No:</Box>
                <input
                  type="text"
                  value={accountno}
                  onChange={(e) => setAccountNo(e.target.value)}
                  placeholder="Enter your Acc no"
                  style={inputStyle}
                />
              </Box>
              <Box
                component="div"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Box sx={{ minWidth: "100px" }}>IFSC:</Box>
                <input
                  type="text"
                  value={ifsc}
                  onChange={(e) => setIfsc(e.target.value)}
                  placeholder="Enter your IFSC code"
                  style={inputStyle}
                />
              </Box>
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              sx={{ marginTop: "20px", justifyContent: "center" }}
            >
              <Button
                variant="outlined"
                onClick={handleUpdate}
                sx={{
                  width: "100px",
                  background: "#081680",
                  color: "#fff",
                  fontWeight: "600",
                  ":hover": {
                    background: "#081680",
                  },
                }}
              >
                Update
              </Button>
            </Stack>
          </Box>
        </Box>
      </Box>
    )
  );
};

const inputStyle = {
  flexGrow: 1,
  padding: "10px",
  marginLeft: "10px",
  border: "1px solid #ccc",
  borderRadius: "4px",
};

export default Profile;
