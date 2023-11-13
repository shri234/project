import React, { useEffect, useState } from "react";
import "./TimelineSpin.css";
import { Box, Button } from "@mui/material";
import TicketNavBar from "../ticket/TicketNavbar";
import ResponsiveAppBar from "./Test";
import PayInModal from "./PayInModal";
import PayoutModal from "./PayoutModal";
import axios from "axios";
import moment from "moment"



const TimelineSpin: React.FC = () => {
 
  const [walletAmount, setWalletAmount] = useState(0);
  const ticket_price = 60;
  const [open, setOpen] = React.useState(false);
  const [open_payout, setPayoutOpen] = React.useState(false);

  const handleLoginType = (type: string, path: string) => {
    window.location.href = `/${path}`;
    console.log(`Login as: ${type}`);
  };
  const tmp = sessionStorage.getItem("user");

 
  return (
    <Box component={"div"}>
      <TicketNavBar name={""} />
      {open && <PayInModal setOpen={setOpen} />}
      {open_payout && <PayoutModal setPayoutOpen={setPayoutOpen} />}
      <Box
        component={"div"}
        sx={{ display: "flex", justifyContent: "space-between", mx: 2, mt: 1 }}
      >
        <Button
          onClick={() => {setOpen(true)}}
          sx={{
            background: "#099633",
            color: "#fff",
            fontWeight: "bold",
            ":hover": {
              background: "#099633",
            },
          }}
        >
          PAY IN
        </Button>
        <Button
          onClick={() => setPayoutOpen(true)}
          sx={{
            background: "#b30c2e",
            color: "#fff",
            fontWeight: "bold",
            ":hover": {
              background: "#b30c2e",
            },
          }}
        >
          PAY OUT
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          width: "100%",
          justifyContent: { xs: "center", sm: "space-between" },
          alignItems: "center",
          mt: { xs: 4, sm: 2 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "center", sm: "space-around" },
            flexDirection: { xs: "column", sm: "row" },
            width: "100%",
            alignItems: "center",
            mt: 2,
            gap: { xs: 2, sm: 8 },
          }}
        >
          <Box
            component={"div"}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Box
              sx={{
                background: "#093375",
                backgroundImage: `url('/spinner_background.svg')`,
                p: 4,
                width: { xs: "80px", sm: "130px", lg: "160px" },
                height: { xs: "80px", sm: "130px", lg: "160px" },
                borderRadius: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  background: "#0B437C",
                  p: 4,
                  width: "10px",
                  height: "10px",
                  borderRadius: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                component={"div"}
                onClick={() => handleLoginType("Admin", "daily")}
              >
                <Box
                  component={"div"}
                  sx={{
                    color: "#fff",
                    fontWeight: "700",
                    p: 1,
                    borderRadius: "5px",
                  }}
                >
                  Daily
                </Box>
              </Box>
            </Box>
            <Box component={"div"} sx={{ color: "#cc0e90", fontWeight: "700" }}>
              "Win Upto 1 lakh"
            </Box>
            <Box component={"div"} sx={{ display: "flex", gap: "4px" }}>
              <Box>
                <img src="/diamond.svg" alt="diamond" />
              </Box>
              <Box
                component={"div"}
                sx={{ color: "#10438f", fontWeight: "650" }}
              >
                Instructions 1
              </Box>
            </Box>
            <Box component={"div"} sx={{ display: "flex", gap: "4px" }}>
              <Box>
                <img src="/diamond.svg" alt="diamond" />
              </Box>
              <Box
                component={"div"}
                sx={{ color: "#10438f", fontWeight: "650" }}
              >
                {" "}
                Instructions 2
              </Box>
            </Box>
          </Box>
          <Box
            component={"div"}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Box
              sx={{
                background: "#093375",
                backgroundImage: `url('/spinner_background.svg')`,
                p: 4,
                width: { xs: "80px", sm: "130px", lg: "160px" },
                height: { xs: "80px", sm: "130px", lg: "160px" },
                borderRadius: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <Box
                sx={{
                  background: "#0B437C",
                  p: 4,
                  width: "10px",
                  height: "10px",
                  borderRadius: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                component={"div"}
                onClick={() => handleLoginType("User", "weekly")}
              >
                <Box
                  component={"div"}
                  sx={{
                    color: "#fff",
                    fontWeight: "700",
                    p: 1,
                    borderRadius: "5px",
                  }}
                >
                  Weekly
                </Box>
              </Box>
            </Box>
            <Box component={"div"} sx={{ color: "#cc0e90", fontWeight: "700" }}>
              "Win Upto 5 lakh"
            </Box>
            <Box component={"div"} sx={{ display: "flex", gap: "4px" }}>
              <Box>
                <img src="/diamond.svg" alt="diamond" />
              </Box>
              <Box
                component={"div"}
                sx={{ color: "#10438f", fontWeight: "650" }}
              >
                Instructions 1
              </Box>
            </Box>
            <Box component={"div"} sx={{ display: "flex", gap: "4px" }}>
              <Box>
                <img src="/diamond.svg" alt="diamond" />
              </Box>
              <Box
                component={"div"}
                sx={{ color: "#10438f", fontWeight: "650" }}
              >
                {" "}
                Instructions 2
              </Box>
            </Box>
          </Box>
          <Box
            component={"div"}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Box
              sx={{
                background: "#093375",
                backgroundImage: `url('/spinner_background.svg')`,
                p: 4,
                width: { xs: "80px", sm: "130px", lg: "160px" },
                height: { xs: "80px", sm: "130px", lg: "160px" },
                borderRadius: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  background: "#0B437C",
                  p: 4,
                  width: "10px",
                  height: "10px",
                  borderRadius: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                component={"div"}
                onClick={() => handleLoginType("Agent", "monthly")}
              >
                <Box
                  component={"div"}
                  sx={{
                    color: "#fff",
                    fontWeight: "700",
                    p: 1,
                    borderRadius: "5px",
                  }}
                >
                  Monthly
                </Box>
              </Box>
            </Box>
            <Box component={"div"} sx={{ color: "#cc0e90", fontWeight: "700" }}>
              "Win Upto 15 lakh"
            </Box>
            <Box component={"div"} sx={{ display: "flex", gap: "4px" }}>
              <Box>
                <img src="/diamond.svg" alt="diamond" />
              </Box>
              <Box
                component={"div"}
                sx={{ color: "#10438f", fontWeight: "650" }}
              >
                Instructions 1
              </Box>
            </Box>
            <Box component={"div"} sx={{ display: "flex", gap: "4px" }}>
              <Box>
                <img src="/diamond.svg" alt="diamond" />
              </Box>
              <Box
                component={"div"}
                sx={{ color: "#10438f", fontWeight: "650" }}
              >
                Instructions 2
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TimelineSpin;
