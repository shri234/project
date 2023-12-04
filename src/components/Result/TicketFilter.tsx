import { Box } from "@mui/material";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { PublishTicketDigit, Ticket, TicketDigit } from "./TicketPublish";

import TicketDigitFilter from "./TicketDigitFilter";

export const TicketFilter: FC<{
  ticket: Ticket;
  setTicket: Dispatch<SetStateAction<Ticket>>;
  path: string;
}> = ({ ticket, setTicket, path }) => {
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
          path={path}
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
  path: string;
}> = ({ setTicket, ticket, name, id, path }) => {
  const [digit, setDigit] = useState<TicketDigit>({
    digit1: false,
    digit2: false,
    digit3: false,
    digit4: false,
  });

  const handleDigit = () => {
    if (id === 1) {
      sessionStorage.setItem("filter_number", "");

      sessionStorage.setItem("digit", "1");
      sessionStorage.removeItem("digit1");
      sessionStorage.removeItem("digit2");
      sessionStorage.removeItem("digit3");

      setDigit((pre) => ({
        ...pre,
        digit1: !pre["digit1"],
      }));
    } else if (id === 2) {
      sessionStorage.setItem("filter_number", ticket.firstdigit.toString());

      sessionStorage.setItem("digit1", "2");
      sessionStorage.removeItem("digit2");
      sessionStorage.removeItem("digit3");
      setDigit((pre) => ({
        ...pre,
        digit2: !pre["digit2"],
      }));
    } else if (id === 3) {
      sessionStorage.setItem("filter_number", ticket.thirddigit.toString());

      sessionStorage.setItem("digit2", "3");
      sessionStorage.removeItem("digit3");
      setDigit((pre) => ({
        ...pre,
        digit3: !pre["digit3"],
      }));
    } else if (id === 4) {
      sessionStorage.setItem("filter_number", ticket.fourthdigit.toString());
      sessionStorage.setItem("digit3", "4");
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
        <TicketDigitFilter
          ticket={ticket}
          setTicket={setTicket}
          name={name}
          filter_value={0}
          path={path}
        />
      ) : digit.digit2 ? (
        <TicketDigitFilter
          setTicket={setTicket}
          name={name}
          ticket={ticket}
          filter_value={parseInt(ticket.firstdigit)}
          path={path}
        />
      ) : digit.digit3 ? (
        <TicketDigitFilter
          setTicket={setTicket}
          name={name}
          ticket={ticket}
          filter_value={parseInt(ticket.seconddigit)}
          path={path}
        />
      ) : digit.digit4 ? (
        <TicketDigitFilter
          setTicket={setTicket}
          name={name}
          ticket={ticket}
          filter_value={parseInt(ticket.thirddigit)}
          path={path}
        />
      ) : (
        <></>
      )}
    </Box>
  );
};
