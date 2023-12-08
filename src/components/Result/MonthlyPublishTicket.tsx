import { Dispatch, FC, SetStateAction } from "react";
import Box from "@mui/material/Box";
import { PublishTicketDigit } from "./TicketPublish";

export interface Ticket {
  firstdigit: string;
  seconddigit: string;
  thirddigit: string;
  fourthdigit: string;
}
export interface TicketDigit {
  digit1: boolean;
  digit2: boolean;
  digit3: boolean;
  digit4: boolean;
}

export const MonthlyTicketPublish: FC<{
  ticket: Ticket;
  setTicket: Dispatch<SetStateAction<Ticket>>;
  setLoader: Dispatch<SetStateAction<boolean>>;
  path: string;
}> = ({ ticket, setTicket }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "start",
        gap: "2px",
        alignItems: "center",
      }}
    >
      <PublishTicketDigit
        value={ticket.firstdigit}
        onChange={(e) => {
          setTicket({ ...ticket, firstdigit: e.target.value });
        }}
      />
      <PublishTicketDigit
        value={ticket.seconddigit}
        onChange={(e) => {
          setTicket({ ...ticket, seconddigit: e.target.value });
        }}
      />
      <PublishTicketDigit
        value={ticket.thirddigit}
        onChange={(e) => {
          setTicket({ ...ticket, thirddigit: e.target.value });
        }}
      />
      <PublishTicketDigit
        value={ticket.fourthdigit}
        onChange={(e) => {
          setTicket({ ...ticket, fourthdigit: e.target.value });
        }}
      />
    </Box>
  );
};
