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
import { TicketBuy } from "./TicketBuy";
import { CountDown } from "./CountDown";
import { TicketCountandBuyTicket } from "./TicketCountAndBuyTicket";
import { WinningTicket } from "./WinningTicket";

export interface WinningTicketInterface {
  first: null | number;
  second: null | number;
  third: null | number;
  fourth: null | number;
}

const UserTicketBuy: FC<{ name: string; path: string }> = ({ name, path }) => {
  const [ticketcount, setTicketCount] = useState(0);
  const [renderCount, setRenderCount] = useState(0);
  const [buy_ticket_warning_dlg, setBuyTicketWarningDlg] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: "",
    minutes: "",
    seconds: "",
  });
  const [winner, setWinner] = useState("");

  const [open, setOpen] = React.useState(false);
  const [result, setResult] = useState([]);

  const [winning_ticket, setWinningTicket] = useState<WinningTicketInterface>({
    first: null,
    second: null,
    third: null,
    fourth: null,
  });

  const [tmp_spinner, setTmpSpinner] = useState(0);

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
    if (new Date().getHours() === 11) {
      const intervalId = setInterval(() => {
        setRenderCount((prevCount) => {
          if (prevCount === 0) {
            setWinningTicket((pre) => ({
              ...pre,
              first: result[0],
            }));
          }
          if (prevCount === 1) {
            setWinningTicket((pre) => ({
              ...pre,
              second: result[1],
            }));
          }
          if (prevCount === 2) {
            setWinningTicket((pre) => ({
              ...pre,
              third: result[2],
            }));
          }
          if (prevCount === 3) {
            setWinningTicket((pre) => ({
              ...pre,
              fourth: result[3],
            }));
            clearInterval(intervalId);
            return prevCount;
          }
          return prevCount + 1;
        });
      }, 8000);

      setTmpSpinner(result[renderCount]);

      return () => clearInterval(intervalId);
    }
  }, [renderCount, result, timeLeft.hours, tmp_spinner]);

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

        console.log(response.data.data, "Winner Response");
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
        const tmp: [] = response.data.data.result_ticket.split("").map(Number);
        setResult(tmp);
      } catch (err) {
        console.log(err);
      }
    };
    if (new Date().getHours() === 11) fetchData();
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
        <TicketNavBar name={name} />

        <Box sx={{ mb: 1, mt: 3 }}>
          <TicketCountandBuyTicket
            ticketcount={ticketcount}
            path={path}
            setBuyTicketWarningDlg={setBuyTicketWarningDlg}
          />
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
            <CountDown timeLeft={timeLeft} />

            <WinningTicket winning_ticket={winning_ticket} />
          </Box>

          <Box
            component={"div"}
            sx={{
              display: "flex",
              justifyContent: "center",
              my: 6,
            }}
          >
            <SpinnerWheel value={tmp_spinner} />
          </Box>
          <TicketBuy ticketcount={ticketcount} />
          <CustomizedTables />
        </Box>
      </Box>
    )
  );
};

export default UserTicketBuy;
