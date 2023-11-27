import { Box, Button } from "@mui/material";
import CustomizedTables from "./CustomTicketTable";
import TicketNavBar from "./TicketNavbar";
import { FC, useEffect } from "react";
import axios from "axios";
import React, { useState } from "react";
import SpinnerWheel from "../Test";
import Marquee from "./marque";

import { isAuthenticated } from "../isAuthenticated/IsAuthenticated";
import Loader from "../loader/Loader";
import "./UserTicketBuy.css";
import BuyTicketWarningDlg from "./BuyTicketDialog";
const numbers = [
  { id: 0, value: 0 },
  { id: 1, value: 1 },
  { id: 2, value: 2 },
  { id: 3, value: 3 },
  { id: 4, value: 4 },
  { id: 5, value: 5 },
  { id: 6, value: 6 },
  { id: 7, value: 7 },
  { id: 8, value: 8 },
  { id: 9, value: 9 },
];

const UserTicketBuy: FC<{ name: string; path: string }> = ({ name, path }) => {
  const [ticket, setTicket] = useState<any[]>([]);
  const [ticketcount, setTicketCount] = useState(0);
  const [renderCount, setRenderCount] = useState(0);
  const [buy_ticket_warning_dlg, setBuyTicketWarningDlg] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: "",
    minutes: "",
    seconds: "",
  });
  const [winner, setWinner] = useState("");
  const [walletAmount, setWalletAmount] = useState(0);
  const [open, setOpen] = React.useState(false);

  const [result, setResult] = useState([1, 2, 3, 5]);

  const [winning_ticket, setWinningTicket] = useState([]);
  const [tmp_spinner, setTmpSpinner] = useState(0);

  const handleLoader = async () => {
    setOpen((pre) => !pre);
  };

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const targetTime = new Date();
      if (now.getHours() >= 18) {
        targetTime.setDate(now.getDate() + 1);
      }

      targetTime.setHours(18, 0, 0, 0);

      const diffInSeconds = Math.round(
        (targetTime.getTime() - now.getTime()) / 1000
      );
      const hours = Math.floor(diffInSeconds / 3600);
      const minutes = Math.floor((diffInSeconds % 3600) / 60);
      let seconds = diffInSeconds % 60;

      setTimeLeft({
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
      });
    };

    updateCountdown();
    const intervalId = setInterval(updateCountdown, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (new Date().getHours() === 18) {
      const intervalId = setInterval(() => {
        setRenderCount((prevCount) => {
          if (prevCount === 3) {
            clearInterval(intervalId);
            return prevCount;
          }
          return prevCount + 1;
        });
      }, 8000);

      setTmpSpinner(result[renderCount]);

      return () => clearInterval(intervalId);
    }
  }, [renderCount, result, timeLeft.hours]);

  const handleDigitSelect = (digits: any) => {
    let digitset = {
      digit: digits,
      status: "null",
    };

    if (ticket.length < 4)
      if (ticket.includes(digits)) {
        setTicket((prevNumbers) => prevNumbers.filter((n) => n !== digitset));
      } else {
        setTicket((prevNumbers) => [...prevNumbers, digitset]);
      }
  };

  const handleBuyTicket = async () => {
    const body = { ticket: ticket, userId: sessionStorage.getItem("userId") };

    await axios
      .post(`${process.env.REACT_APP_IP}/ticket/addticket`, body)
      .then((res) => {
        if (ticketcount > 0) {
          if (res.status === 200) {
            handleLoader();
            window.alert("Success! Ticket has been bought.");
          }
          window.location.href = "/daily";
        } else {
          handleLoader();
          window.alert("Buy more Tickets to get tickets to spin");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setTicket([]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${
            process.env.REACT_APP_IP
          }/ticket/getWallet?userId=${sessionStorage.getItem("userId")}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setTicketCount(response.data.data.ticketCount);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_IP}/ticket/getWinner`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setWinner(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_IP}/ticket/result`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setWinningTicket(response.data.data.result_ticket.split(""));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    isAuthenticated("user") && (
      <Box
        sx={{
          height: { xs: "100%", sm: "100%" },
          backgroundImage: `url('/monthly.jpeg')`,
          width: "100%",
        }}
      >
        {open && <Loader />}
        {buy_ticket_warning_dlg && (
          <BuyTicketWarningDlg
            setBuyTicketWarningDlg={setBuyTicketWarningDlg}
          />
        )}
        <TicketNavBar name={name} setWalletAmount={setWalletAmount} />

        <Box sx={{ mb: 1, mt: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              px: { xs: "0%", sm: "15%" },
              py: 1,
            }}
          >
            <Box
              sx={{
                background: "#cfcc42",
                p: 1,
                px: 2,
                color: "#fff",
                fontWeight: "bold",
                borderRadius: "10px",
              }}
            >
              Tickets Count:{ticketcount}
            </Box>
            <Box
              sx={{
                background: "#188759",
                p: 1,
                px: 2,
                color: "#fff",
                fontWeight: "bold",
                borderRadius: "10px",
                cursor: "pointer",
              }}
              component={"div"}
              onClick={() => {
                const now = new Date();
                if (now.getHours() >= 17 && now.getHours() <= 19) {
                  setBuyTicketWarningDlg((pre) => !pre);
                } else window.location.href = path;
              }}
            >
              Buy Tickets
            </Box>
          </Box>
          <Marquee data={winner} />

          <Box
            component={"div"}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              px: { xs: "0%", sm: "15%" },
              py: 1,
            }}
          >
            <Box
              component={"div"}
              className="count-down"
              sx={{
                display: "flex",
                flexDirection: "column",
                border: "none",
                borderRadius: "5px",
                p: { xs: "4px", sm: 2 },
              }}
            >
              <Box
                component={"div"}
                sx={{ fontWeight: 700, color: "#fff", fontSize: "1.25rem" }}
              >
                Count Down:
              </Box>
              <Box
                component={"div"}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "1.25rem",
                  color: "#d1dae8",
                }}
              >
                <Box
                  component={"div"}
                  sx={{
                    background: "#074fad",
                    height: "fit-content",
                    p: 1,
                    borderRadius: "5px",
                    fontWeight: "bold",
                    fontSize: "20px",
                    color: "#fff",
                  }}
                >
                  {timeLeft.hours}
                </Box>
                :
                <Box
                  component={"div"}
                  sx={{
                    background: "#074fad",
                    height: "fit-content",
                    p: 1,
                    borderRadius: "5px",
                    fontWeight: "bold",
                    fontSize: "20px",
                    color: "#fff",
                  }}
                >
                  {timeLeft.minutes}
                </Box>
                :
                <Box
                  component={"div"}
                  sx={{
                    background: "#074fad",
                    height: "fit-content",
                    p: 1,
                    borderRadius: "5px",
                    fontWeight: "bold",
                    fontSize: "20px",
                    color: "#fff",
                  }}
                >
                  {timeLeft.seconds}
                </Box>
              </Box>
            </Box>
            {winning_ticket.length > 0 && (
              <Box
                className="result"
                component={"div"}
                sx={{
                  display: "flex",
                  alignItems: "start",
                  justifyContent: "start",
                  flexDirection: "column",
                  borderRadius: "6px",
                  border: "none",
                  p: { xs: "4px", sm: 2 },
                }}
              >
                <Box
                  component={"div"}
                  sx={{ fontWeight: "700", color: "#fff", fontSize: "1.25rem" }}
                >
                  Result:
                </Box>

                <Box
                  component={"div"}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "2px",
                  }}
                >
                  {winning_ticket.map((value) => {
                    return (
                      <Box
                        component={"div"}
                        sx={{
                          width: "25px",
                          height: "25px",
                          border: "none",
                          textAlign: "center",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#fff",
                          fontWeight: 600,
                          fontSize: "1.15rem",
                          borderRadius: "5px",
                          background: "#84bd13",
                          p: 0.5,
                        }}
                      >
                        {value}
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            )}
          </Box>

          <Box
            component={"div"}
            sx={{ display: "flex", justifyContent: "center", my: 6 }}
          >
            <SpinnerWheel value={tmp_spinner} />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              mb: 1,
              mt: 1,
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gridGap: "10px",
                rowGap: "10px",
                mt: 2,
              }}
            >
              {numbers.map((number) => (
                <Button
                  key={number.id}
                  component={"div"}
                  onClick={() => handleDigitSelect(number.value)}
                  sx={{
                    minWidth: "20px",

                    height: "20px",
                    background: ticket.length === 4 ? "#7e6580" : "violet",
                    fontWeight: "700",
                    color: "#fff",

                    px: 2,
                    py: 3,
                    ":hover": {
                      background: ticket.length === 4 ? "#7e6580" : "violet",
                    },
                    textAlign: "center",
                    borderRadius: "5px",
                    cursor: "pointer",
                    boxShadow: `rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px`,
                  }}
                >
                  {number.value}
                </Button>
              ))}
            </Box>
            <Box
              sx={{
                display: "flex",
                mt: 1,
                gridGap: "10px",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "5px",
                  background: "grey",
                  color: "#fff",
                  fontWeight: "600",
                  textAlign: "center",
                  p: 1,
                  borderRadius: "4px",
                  minWidth: "80px",
                  minHeight: "20px",
                }}
              >
                {ticket.map((value) => (
                  <Box>{value.digit}</Box>
                ))}
              </Box>
              {ticket.length > 0 && (
                <Box
                  onClick={() => {
                    setTicket([]);
                  }}
                  sx={{
                    background: "red",
                    color: "#fff",
                    fontWeight: "600",
                    textAlign: "center",
                    p: 1,
                    maxWidth: "fit-content",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Clear
                </Box>
              )}
              <Box
                onClick={async () => {
                  if (ticketcount === 0) alert("Your ticket count is 0");
                  else if (ticket.length === 4) {
                    await handleLoader();
                    await handleBuyTicket();
                  } else {
                    setTicket([]);
                    alert("Please fill 4 digit");
                  }
                }}
                sx={{
                  background: "green",
                  color: "#fff",
                  fontWeight: "600",
                  textAlign: "center",
                  p: 1,
                  maxWidth: "fit-content",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Confirm
              </Box>
            </Box>

            <CustomizedTables />
          </Box>
        </Box>
      </Box>
    )
  );
};

export default UserTicketBuy;
