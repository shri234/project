import React, { useState } from "react";
import "./TimelineSpin.css";
import { Box, Button } from "@mui/material";
import TicketNavBar from "../ticket/TicketNavbar";
import PayInModal from "./PayInModal";
import PayoutModal from "./PayoutModal";

import { isAuthenticated } from "../isAuthenticated/IsAuthenticated";
import Loader from "../loader/Loader";

const TimelineSpin: React.FC = () => {
  const [walletAmount, setWalletAmount] = useState<number>(0);

  const [open, setOpen] = useState(false);
  const [open_loader, setOpenLoader] = useState(false);

  const [open_payout, setPayoutOpen] = React.useState(false);

  const handleLoginType = (type: string, path: string) => {
    window.location.href = `/${path}`;
  };
  return (
    isAuthenticated("user") && (
      <Box
        sx={{
          height: { xs: "100%", sm: "100vh" },
          backgroundImage: `url('/monthly.jpeg')`,
          width: "100%",
        }}
      >
        <TicketNavBar name={""} setWalletAmount={setWalletAmount} />

        {open && <PayInModal setOpen={setOpen} />}
        {open_payout && (
          <PayoutModal
            setPayoutOpen={setPayoutOpen}
            walletAmount={walletAmount !== undefined ? walletAmount : 0}
          />
        )}
        {open_loader && <Loader />}
        <Box
          component={"div"}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mx: 2,
            mt: 4,
          }}
        >
          <Button
            onClick={() => {
              setOpen(true);
            }}
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
              <Box
                component={"div"}
                sx={{ color: "#cc0e90", fontWeight: "700" }}
              >
                "Win Upto 1 lakh"
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  flexDirection: "column",
                  alignItems: "start",
                }}
              >
                <Box component={"div"} sx={{ display: "flex", gap: "4px" }}>
                  <Box>
                    <img src="/diamond.svg" alt="diamond" />
                  </Box>
                  <Box
                    component={"div"}
                    sx={{ color: "#F5F5F5", fontWeight: "650" }}
                  >
                    It will spin automatically every 5pm daily
                  </Box>
                </Box>
                <Box component={"div"} sx={{ display: "flex", gap: "4px" }}>
                  <Box>
                    <img src="/diamond.svg" alt="diamond" />
                  </Box>
                  <Box
                    component={"div"}
                    sx={{ color: "#F5F5F5", fontWeight: "650" }}
                  >
                    you will win the prize worth 130000 RS
                  </Box>
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
              <Box
                component={"div"}
                sx={{ color: "#cc0e90", fontWeight: "700" }}
              >
                "Win Upto 5 lakh"
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  flexDirection: "column",
                  alignItems: "start",
                }}
              >
                <Box component={"div"} sx={{ display: "flex", gap: "4px" }}>
                  <Box>
                    <img src="/diamond.svg" alt="diamond" />
                  </Box>
                  <Box
                    component={"div"}
                    sx={{ color: "#F5F5F5", fontWeight: "650" }}
                  >
                    It will spin automatically every Friday 6pm weekly
                  </Box>
                </Box>
                <Box component={"div"} sx={{ display: "flex", gap: "4px" }}>
                  <Box>
                    <img src="/diamond.svg" alt="diamond" />
                  </Box>
                  <Box
                    component={"div"}
                    sx={{ color: "#F5F5F5", fontWeight: "650" }}
                  >
                    you will win the prize worth 500000 RS
                  </Box>
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
              <Box
                component={"div"}
                sx={{ color: "#cc0e90", fontWeight: "700" }}
              >
                "Win Upto 15 lakh"
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  flexDirection: "column",
                  alignItems: "start",
                }}
              >
                <Box component={"div"} sx={{ display: "flex", gap: "4px" }}>
                  <Box>
                    <img src="/diamond.svg" alt="diamond" />
                  </Box>
                  <Box
                    component={"div"}
                    sx={{ color: "#F5F5F5", fontWeight: "650" }}
                  >
                    It will spin automatically every 7pm monthly
                  </Box>
                </Box>
                <Box component={"div"} sx={{ display: "flex", gap: "4px" }}>
                  <Box>
                    <img src="/diamond.svg" alt="diamond" />
                  </Box>
                  <Box
                    component={"div"}
                    sx={{ color: "#F5F5F5", fontWeight: "650" }}
                  >
                    you will win the minumum prize worth 10000 RS per day
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    )
  );
};

export default TimelineSpin;
