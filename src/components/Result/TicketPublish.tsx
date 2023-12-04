import { Dispatch, FC, SetStateAction } from "react";
import {
  dailyPublishResultIsAvailable,
  is5pmto6pm,
  monthlyPublishResultIsAvailable,
  weeklyPublishResultIsAvailable,
} from "../../utill";
import Box from "@mui/material/Box";
import { Input } from "@mui/material";
import axios from "axios";
import { winningTicketPublish } from "../../api/winningTicketPublish";

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
  path: string;
}> = ({ ticket, setTicket, setLoader, path }) => {
  const handlePath = () => {
    return path === "Daily"
      ? "daily"
      : path === "Weekly"
      ? "weekly"
      : "monthly";
  };

  const handlePublishResult = async () => {
    setLoader(true);
    const body = [
      { digit: ticket.firstdigit },
      { digit: ticket.seconddigit },
      { digit: ticket.thirddigit },
      { digit: ticket.fourthdigit },
    ];

    await winningTicketPublish(handlePath(), body)
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
          if (
            (handlePath() === "daily" && dailyPublishResultIsAvailable()) ||
            (handlePath() === "weekly" && weeklyPublishResultIsAvailable()) ||
            (handlePath() === "monthly" && monthlyPublishResultIsAvailable())
          )
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
          background:
            handlePath() === "daily" && dailyPublishResultIsAvailable()
              ? "#7a1160"
              : handlePath() === "weekly" && weeklyPublishResultIsAvailable()
              ? "#7a1160"
              : handlePath() === "monthly" && monthlyPublishResultIsAvailable()
              ? "#7a1160"
              : "grey",
          color: "#fff",
          fontWeight: "600",
          cursor:
            handlePath() === "daily" && dailyPublishResultIsAvailable()
              ? "pointer"
              : handlePath() === "weekly" && weeklyPublishResultIsAvailable()
              ? "pointer"
              : handlePath() === "monthly" && monthlyPublishResultIsAvailable()
              ? "pointer"
              : "no-drop",
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
