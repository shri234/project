import { Box } from "@mui/material";
import { FC } from "react";
import { WinningTicketInterface } from "./UserTicketBuy";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

export const MonthlyWinningTicket: FC<{
  winning_ticket: WinningTicketInterface[];
}> = ({ winning_ticket }) => {
  return (
    <Box
      className="result"
      component={"div"}
      sx={{
        display: "flex",
        alignItems: "start",
        justifyContent: "start",
        flexDirection: "column",
        borderRadius: "6px",
        border: "none",
        p: { xs: "4px", sm: 2 },
      }}
    >
      <Box
        component={"div"}
        sx={{ fontWeight: "700", color: "#fff", fontSize: "1.25rem" }}
      >
        Result
      </Box>

      <Box
        component={"div"}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "2px",
        }}
      >
        {winning_ticket.map((ticket, index) => {
          return (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  fontWeight: "bold",
                  color: "#fff",
                  pr: 1,
                  fontSize: "1.25rem",
                }}
              >
                {index + 1}st:
              </Box>
              <ResultTicketDigit value={ticket.first} />
              <ResultTicketDigit value={ticket.second} />
              <ResultTicketDigit value={ticket.third} />
              <ResultTicketDigit value={ticket.fourth} />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

const ResultTicketDigit: FC<{ value: null | number }> = ({ value }) => {
  return value !== null ? (
    <Box
      component={"div"}
      sx={{
        width: "25px",
        height: "25px",
        border: "none",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontWeight: 600,
        fontSize: "1.15rem",
        borderRadius: "5px",
        background: "#84bd13",
        p: 0.5,
      }}
    >
      {value}
    </Box>
  ) : (
    <Box
      component={"div"}
      sx={{
        width: "25px",
        height: "25px",
        border: "none",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontWeight: 600,
        fontSize: "1.15rem",
        borderRadius: "5px",
        background: "#84bd13",
        p: 0.5,
      }}
    >
      <CurrencyRupeeIcon />
    </Box>
  );
};
