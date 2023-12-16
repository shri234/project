import { Box } from "@mui/material";
import { Dispatch, FC, SetStateAction } from "react";
import {
  userCannotBuyDailyTicket,
  userCannotBuyMonthlyTicket,
  userCannotBuyWeeklyTicket,
} from "../../utill";

export const TicketCountandBuyTicket: FC<{
  ticketcount: number;
  setBuyTicketWarningDlg: Dispatch<SetStateAction<boolean>>;
  path: string;
}> = ({ ticketcount, setBuyTicketWarningDlg, path }) => {
  const handlePath = (): string => {
    return path === "/daily-buy-ticket"
      ? "daily"
      : path === "/weekly-buy-ticket"
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

          if (
            (handlePath() === "daily" && userCannotBuyDailyTicket()) ||
            (handlePath() === "weekly" && userCannotBuyWeeklyTicket()) ||
            (handlePath() === "monthly" && userCannotBuyMonthlyTicket())
          ) {
            setBuyTicketWarningDlg((pre) => !pre);
          } else {
            window.location.href = path;
          }
        }}
      >
        Buy Tickets
      </Box>
    </Box>
  );
};
