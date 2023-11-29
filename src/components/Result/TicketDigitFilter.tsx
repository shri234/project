import Box from "@mui/material/Box";
import axios from "axios";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Ticket } from "./TicketPublish";

const TicketDigitFilter: FC<{
  setTicket: Dispatch<SetStateAction<Ticket>>;
  name: string;
}> = ({ setTicket, name }) => {
  const [digits, setDigits] = useState<any[]>([]);

  const [LowestValue, setLowestValue] = useState<number>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formatteddate = `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()}`;
        const response = await axios.get(
          `${
            process.env.REACT_APP_IP
          }/ticket/getMinimum?digit=${sessionStorage.getItem(
            "digit"
          )}&digit1=${sessionStorage.getItem(
            "digit1"
          )}&digit2=${sessionStorage.getItem(
            "digit2"
          )}&digit3=${sessionStorage.getItem("digit3")}&date=${formatteddate}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setDigits(response.data.data);
        setTicket((prev_ticket) => ({
          ...prev_ticket,
          [name]: response.data.LowestValue,
        }));

        setLowestValue(response.data.LowestValue);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
      }}
    >
      {digits.map((value) => (
        <Box
          key={value.id}
          sx={{
            display: "flex",
            justifyContent: "start",
            gap: "5px",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              background: "#4d0b63",
              color: "#fff",
              fontWeight: "600",
              borderRadius: "5px",
              textAlign: "center",
              fontSize: "1.15rem",
              p: "2px",
              width: "30px",
            }}
          >
            {value.id}
          </Box>
          <Box>:</Box>
          <Box>{value.count}</Box>
        </Box>
      ))}
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          gap: "10px",
          alignItems: "Center",
        }}
      >
        <Box
          sx={{
            color: "#6b0c37",
            fontWeight: "bold",
            fontSize: "1.25rem",
          }}
        >
          Lowest Number
        </Box>
        <Box
          sx={{
            color: "#fff",
            fontWeight: "bold",
            fontSize: "1.25rem",
            background: "#19617d",
            p: 0.5,
            width: "40px",
            textAlign: "center",
            borderRadius: "5px",
          }}
        >
          {LowestValue}
        </Box>
      </Box>
    </Box>
  );
};
export default TicketDigitFilter;
