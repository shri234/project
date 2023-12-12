import Box from "@mui/material/Box";
import {
  STATUS,
  isDailyPublishPossibleAndUserCannotBuyTicket,
  dialog_timeout,
  isWeeklyPublishPossibleandUserCannotBuyTicket,
  isMonthlyPublishIsAvailableandUserCannotBuyTicket,
} from "../../utill";
import { FC, useEffect, useState } from "react";
import { ticketPriceData } from "../../api/ticketPriceRate";
import { publishTicketRate } from "../../api/publishTicketRate";
import { CustomizedStatusDialogs } from "../custom-table/CustomDialog";

export const TicketRatePublish: FC<{ path: string }> = ({ path }) => {
  const [ticketrate, setTicketRate] = useState<string>("");
  const [status, setStatus] = useState(false);
  const [is_ticket_rate_published, setTicketRatePublished] = useState(false);
  const handlePath = () => {
    return path === "Daily"
      ? "daily"
      : path === "Weekly"
      ? "weekly"
      : "monthly";
  };
  const handleTicketRate = async () => {
    const body = { ticketRate: ticketrate };

    await publishTicketRate(handlePath(), body)
      .then(() => {
        setStatus(true);
        handleTicketPrice();
        setTimeout(() => {
          setStatus(false);
        }, dialog_timeout);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleTicketPrice = async () => {
    await ticketPriceData(handlePath())
      .then((res) => {
        if (res.data?.data) {
          if (res.data.data.ticketRate !== 0) {
            setTicketRatePublished(true);
            setTicketRate(res.data.data.ticketRate);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    (async () => {
      handleTicketPrice();
    })();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        m: 2,

        gap: { xs: 10, sm: 20 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          gap: "5px",
          // ml: 1,
        }}
      >
        <Box
          sx={{
            fontWeight: "bold",
            fontSize: "1.25rem",
            color: "#ab0a4a",
            // whiteSpace: "nowrap",
          }}
        >
          Ticket Rate:
        </Box>
        <Box>
          <input
            min={0}
            type="number"
            value={ticketrate}
            onChange={(e) => setTicketRate(e.target.value)}
            style={{ minWidth: "40px", maxWidth: "100px" }}
          />
        </Box>
      </Box>
      <Box
        onClick={() => {
          if (handlePath() === "daily") {
            isDailyPublishPossibleAndUserCannotBuyTicket() &&
              handleTicketRate();
          } else if (handlePath() === "weekly") {
            isWeeklyPublishPossibleandUserCannotBuyTicket() &&
              handleTicketRate();
          } else if (handlePath() === "monthly") {
            isMonthlyPublishIsAvailableandUserCannotBuyTicket() &&
              handleTicketRate();
          }
        }}
        sx={{
          p: 1.25,
          background:
            handlePath() === "daily" &&
            !is_ticket_rate_published &&
            isDailyPublishPossibleAndUserCannotBuyTicket()
              ? "#0bb329"
              : !is_ticket_rate_published &&
                handlePath() === "weekly" &&
                isWeeklyPublishPossibleandUserCannotBuyTicket()
              ? "#0bb329"
              : handlePath() === "monthly" &&
                !is_ticket_rate_published &&
                isMonthlyPublishIsAvailableandUserCannotBuyTicket()
              ? "#0bb329"
              : "grey",
          cursor:
            handlePath() === "daily" &&
            !is_ticket_rate_published &&
            isDailyPublishPossibleAndUserCannotBuyTicket()
              ? "pointer"
              : handlePath() === "weekly" &&
                !is_ticket_rate_published &&
                isWeeklyPublishPossibleandUserCannotBuyTicket()
              ? "pointer"
              : handlePath() === "monthly" &&
                !is_ticket_rate_published &&
                isMonthlyPublishIsAvailableandUserCannotBuyTicket()
              ? "pointer"
              : "no-drop",
          borderRadius: "5px",
          color: "#fff",
          fontWeight: 600,
        }}
      >
        Publish
      </Box>
      {status && (
        <CustomizedStatusDialogs
          setOpenStatusDlg={setStatus}
          description="Ticket Price added successfully..."
          status={STATUS.SUCCESS}
        />
      )}
    </Box>
  );
};
