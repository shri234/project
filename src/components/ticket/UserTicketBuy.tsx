import { Box, Button } from "@mui/material";
import CustomizedTables from "./CustomTicketTable";
import TicketNavBar from "./TicketNavbar";
import { FC, useEffect } from "react";
import axios from "axios";
import React, { useState } from "react";
import SpinnerWheel from "../Test";
import Marquee from "./marque";
import moment from "moment";

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

function getUserID() {
  return sessionStorage.getItem("userId");
}
const UserTicketBuy: FC<{ name: string; path: string }> = ({ name, path }) => {
  const [ticket, setTicket] = useState<any[]>([]);
  const [ticketcount,setTicketCount]=useState(0)
  const [timeLeft, setTimeLeft] = useState("");
  const [ticketId,setTicketId]=useState(0)

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const today5PM = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        17,
        0,
        0
      );
      const diffInSeconds = Math.round(
        (today5PM.getTime() - now.getTime()) / 1000
      );
      const hours = Math.floor(diffInSeconds / 3600);
      const minutes = Math.floor((diffInSeconds % 3600) / 60);
      const seconds = diffInSeconds % 60;
      setTimeLeft(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")} PM`
      );
    };

    updateCountdown();
    const intervalId = setInterval(updateCountdown, 1000);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleDigitSelect = (digits: any) => {
    let digitset = {
      digit: digits,
      status: "false",
    };

    if (ticket.length < 4)
      if (ticket.includes(digits)) {
        setTicket((prevNumbers) => prevNumbers.filter((n) => n !== digitset));
      } else {
        setTicket((prevNumbers) => [...prevNumbers, digitset]);
      }
  };

  const handleBuyTicket = async (digits: any) => {
    const userId = getUserID();

    const body = { ticket: ticket,userId:sessionStorage.getItem("userId")};
    console.log(body);
    await axios
      .post(`http://43.204.150.238:3002/ticket/addticket`, body)
      .then((res) => {
        if(ticketcount>0){
        if (res.status === 200) {
          window.alert("Success! Ticket has been bought.");
        }
        window.location.href = "/daily";
      }
      else{
        window.alert("Buy more Tickets to get tickets to spin")
      }
    })
      .catch((error) => {
        console.log(error);
      });
    setTicket([]);
  };

  useEffect(() => {
    let date=new Date();
    let datee=moment(date).format("YYYY-MM-DD");
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://43.204.150.238:3002/ticket/getWallet?userId=${sessionStorage.getItem("userId")}`,{
          headers: {
            'Content-Type':"application/json"
          }
        });
        console.log(response.data.data)
        setTicketCount(response.data.data.ticketCount);
        // setTicketId(response.data.data[0].ticketId);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }
,[]);

  return (
    <>
      <TicketNavBar name={name} />
      <Box sx={{ mb: 1 }}>
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
            onClick={() => (window.location.href = path)}
          >
            Buy Tickets
          </Box>
        </Box>
        <Marquee />
        <Box
          component={"div"}
          sx={{ display: "flex", justifyContent: "center", my: 2 }}
        >
          <SpinnerWheel />
          <Box component={"div"} sx={{ display: "flex" }}>
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
              {timeLeft}
            </Box>
          </Box>
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
                  // px: 1,
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
                minWidth: "200px",
                minHeight: "20px",
              }}
            >
              {ticket.map((value) => (
                <Box>{value.digit}</Box>
              ))}
            </Box>
            <Box
              onClick={handleBuyTicket}
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
    </>
  );
};

export default UserTicketBuy;
