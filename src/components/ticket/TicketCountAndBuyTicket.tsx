import { Box } from "@mui/material";
import { Dispatch, FC, SetStateAction } from "react";

export const TicketCountandBuyTicket: FC<{
  ticketcount: number;
  setBuyTicketWarningDlg: Dispatch<SetStateAction<boolean>>;
  path: string;
}> = ({ ticketcount, setBuyTicketWarningDlg, path }) => {
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
          if (now.getHours() >= 17 && now.getHours() < 18) {
            setBuyTicketWarningDlg((pre) => !pre);
          } else window.location.href = path;
        }}
      >
        Buy Tickets
      </Box>
    </Box>
  );
};
