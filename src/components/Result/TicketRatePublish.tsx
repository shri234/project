import Box from "@mui/material/Box";
import { is5pmto6pm } from "../../utill";
import axios from "axios";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

export const TicketRatePublish: FC = () => {
  const [ticketrate, setTicketRate] = useState<string>("");
  const handleTicketRate = async () => {
    const body = { ticketRate: ticketrate };

    await axios
      .post(`${process.env.REACT_APP_IP}/ticket/addTicketRate`, body)
      .then((res) => {
        if (res.status === 200) {
          window.alert("Success! Ticket rate added");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchData = async () => {
    try {
      const formatteddate = `${new Date().getFullYear()}-${
        new Date().getMonth() + 1
      }-${new Date().getDate()}`;
      const response = await axios.get(
        `${process.env.REACT_APP_IP}/ticket/getTicketRate?date=${formatteddate}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setTicketRate(response.data.data.ticketRate);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        m: 2,

        gap: { xs: 10, sm: 20 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          gap: "5px",
          // ml: 1,
        }}
      >
        <Box
          sx={{
            fontWeight: "bold",
            fontSize: "1.25rem",
            color: "#ab0a4a",
            // whiteSpace: "nowrap",
          }}
        >
          Ticket Rate:
        </Box>
        <Box>
          <input
            type="number"
            value={ticketrate}
            onChange={(e) => setTicketRate(e.target.value)}
            style={{ minWidth: "40px", maxWidth: "100px" }}
          />
        </Box>
      </Box>
      <Box
        onClick={() => {
          is5pmto6pm() && handleTicketRate();
        }}
        sx={{
          p: 1.25,
          background: is5pmto6pm() ? "#0bb329" : "grey",
          cursor: is5pmto6pm() ? "pointer" : "no-drop",
          borderRadius: "5px",
          color: "#fff",
          fontWeight: 600,
        }}
      >
        Publish
      </Box>
    </Box>
  );
};
