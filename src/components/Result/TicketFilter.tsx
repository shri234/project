import { Box } from "@mui/material";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { PublishTicketDigit, Ticket, TicketDigit } from "./TicketPublish";
import Filteration from "../admin/Filteration";
import TicketDigitFilter from "./TicketDigitFilter";
// type TicketIndex = {
//   [key: string]: string;
//   // other properties...
// };

export const TicketFilter: FC<{
  ticket: Ticket;
  setTicket: Dispatch<SetStateAction<Ticket>>;
}> = ({ ticket, setTicket }) => {
  const digit = [
    { name: "firstdigit", id: 1 },
    { name: "seconddigit", id: 2 },
    { name: "thirddigit", id: 3 },
    { name: "fourthdigit", id: 4 },
  ];
  return (
    <React.Fragment>
      {digit.map((value) => (
        <FilterDigit
          key={value.id}
          id={value.id}
          name={value.name}
          ticket={ticket}
          setTicket={setTicket}
        />
      ))}
    </React.Fragment>
  );
};

const FilterDigit: FC<{
  id: number;
  name: string;
  ticket: Ticket;
  setTicket: Dispatch<SetStateAction<Ticket>>;
}> = ({ setTicket, ticket, name, id }) => {
  const [digit, setDigit] = useState<TicketDigit>({
    digit1: false,
    digit2: false,
    digit3: false,
    digit4: false,
  });

  const handleDigit = () => {
    if (id === 1)
      setDigit((pre) => ({
        ...pre,
        digit1: !pre["digit1"],
      }));
    else if (id === 2) {
      setDigit((pre) => ({
        ...pre,
        digit2: !pre["digit2"],
      }));
    } else if (id === 3) {
      setDigit((pre) => ({
        ...pre,
        digit3: !pre["digit3"],
      }));
    } else if (id === 4) {
      setDigit((pre) => ({
        ...pre,
        digit4: !pre["digit4"],
      }));
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          gap: "4px",
          alignItems: "center",
          ml: 2,
        }}
      >
        <Box
          sx={{
            color: "#47397d",
            fontWeight: "700",
            cursor: "pointer",
          }}
          onClick={() => {
            handleDigit();
          }}
          component={"div"}
        >
          Number {id}:
        </Box>
        <PublishTicketDigit
          value={ticket[name as keyof Ticket]}
          onChange={(e) => {
            setTicket((prev_ticket) => ({
              ...prev_ticket,
              [name]: e.target.value,
            }));
          }}
        />
      </Box>

      {digit.digit1 ? (
        <TicketDigitFilter setTicket={setTicket} name={name} />
      ) : digit.digit2 ? (
        <TicketDigitFilter setTicket={setTicket} name={name} />
      ) : digit.digit3 ? (
        <TicketDigitFilter setTicket={setTicket} name={name} />
      ) : digit.digit4 ? (
        <TicketDigitFilter setTicket={setTicket} name={name} />
      ) : (
        <></>
      )}
    </Box>
  );
};
