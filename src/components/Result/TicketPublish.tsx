import { Dispatch, FC, SetStateAction } from "react";
import { is5pmto6pm } from "../../utill";
import Box from "@mui/material/Box";
import { Input } from "@mui/material";
import axios from "axios";

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

export const TicketPublish: FC<{
  ticket: Ticket;
  setTicket: Dispatch<SetStateAction<Ticket>>;
  setLoader: Dispatch<SetStateAction<boolean>>;
}> = ({ ticket, setTicket, setLoader }) => {
  const handlePublishResult = async () => {
    setLoader(true);
    const body = [
      { digit: ticket.firstdigit },
      { digit: ticket.seconddigit },
      { digit: ticket.thirddigit },
      { digit: ticket.fourthdigit },
    ];

    const formatteddate = `${new Date().getFullYear()}-${
      new Date().getMonth() + 1
    }-${new Date().getDate()}`;

    await axios
      .post(
        `${process.env.REACT_APP_IP}/ticket/publishResult?date=${formatteddate}`,
        body
      )
      .then((res) => {
        setLoader(false);
        if (res.status === 200) {
          window.alert(
            `Result Published successfully! There are ${res.data.Winners} winners.`
          );
        }
        window.location.href = "/daily-result";
      })
      .catch((error) => {
        setLoader(false);
        console.log(error);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          gap: "2px",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            p: 1,
            borderRadius: "5px",
            background: "#d67349",
            color: "#fff",
            fontWeight: "600",
          }}
        >
          Result:
        </Box>
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
      <Box
        onClick={() => {
          const now = new Date();
          if (is5pmto6pm())
            if (
              ticket.firstdigit &&
              ticket.seconddigit &&
              ticket.thirddigit &&
              ticket.fourthdigit
            ) {
              setLoader((pre) => !pre);
              handlePublishResult();
            } else {
              alert("Fill all digits");
            }
        }}
        sx={{
          p: 1,
          borderRadius: "5px",
          background: is5pmto6pm() ? "#7a1160" : "grey",
          color: "#fff",
          fontWeight: "600",
          cursor: is5pmto6pm() ? "pointer" : "no-drop",
        }}
      >
        PUBLISH
      </Box>
    </Box>
  );
};

export const PublishTicketDigit: FC<{
  value: string;
  onChange?:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
}> = ({ value, onChange }) => {
  return (
    <Box>
      <Input
        value={value}
        onChange={onChange}
        sx={{
          width: "40px",
          borderRadius: "5px",
          border: "none",
          boxShadow: `rgba(0, 0, 0, 0.35) 0px 0px 5px;`,
        }}
      />
    </Box>
  );
};
