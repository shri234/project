import { Box } from "@mui/material";
import { Dispatch, FC, SetStateAction } from "react";
import {
  isDailyPublishPossibleAndUserCannotBuyTicket,
  isMonthlyPublishIsAvailableandUserCannotBuyTicket,
  isWeeklyPublishPossibleandUserCannotBuyTicket,
} from "../../utill";

export const TicketCountandBuyTicket: FC<{
  ticketcount: number;
  setBuyTicketWarningDlg: Dispatch<SetStateAction<boolean>>;
  path: string;
}> = ({ ticketcount, setBuyTicketWarningDlg, path }) => {
  console.log(path)
  const handlePath = (): string => {
    return path === "daily-buy-ticket"
      ? "daily"
      : path === "daily-buy-ticket"
      ? "weekly"
      : "monthly";
  };

  return (
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
        onClick={() => {
          const now = new Date();
          console.log(handlePath(),typeof handlePath());
          console.log(now.getHours())
          console.log(now.getMinutes())
          if (
            (handlePath() === "daily" &&
              isDailyPublishPossibleAndUserCannotBuyTicket()) ||
            (handlePath() === "weekly" &&
              isWeeklyPublishPossibleandUserCannotBuyTicket()) ||
            (handlePath() === "monthly" &&
              isMonthlyPublishIsAvailableandUserCannotBuyTicket())
          ) {
            setBuyTicketWarningDlg((pre) => !pre);
          } else {
            console.log("inside")
          }
        }}
      >
        Buy Tickets
      </Box>
    </Box>
  );
};
