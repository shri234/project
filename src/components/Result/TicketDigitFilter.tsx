import Box from "@mui/material/Box";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Ticket } from "./TicketPublish";
import { minimumTicketFilter } from "../../api/minimumTicketFIlter";

const TicketDigitFilter: FC<{
  setTicket: Dispatch<SetStateAction<Ticket>>;
  name: string;
  filter_value: number;
  ticket: Ticket;
  path: string;
}> = ({ setTicket, name, filter_value, ticket, path }) => {
  const [digits, setDigits] = useState<any[]>([]);

  const [LowestValue, setLowestValue] = useState<number>();

  const handlePath = () => {
    return path === "Daily"
      ? "daily"
      : path === "Weekly"
      ? "weekly"
      : "monthly";
  };

  useEffect(() => {
    minimumTicketFilter(handlePath(), filter_value, ticket)
      .then((res) => {
        setDigits(res.data.data);
        if (ticket[name as keyof Ticket].length === 0)
          setTicket((prev_ticket) => ({
            ...prev_ticket,
            [name]: res.data.LowestValue,
          }));

        setLowestValue(res.data.LowestValue);
      })
      .catch((error) => {
        console.log(error);
      });
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
