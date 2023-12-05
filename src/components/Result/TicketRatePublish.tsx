import Box from "@mui/material/Box";
import {
  STATUS,
  dailyPublishTicketRateIsAvailable,
  dialog_timeout,
  monthlyPublishTicketRateIsAvailable,
  weeklyPublishTicketRateIsAvailable,
} from "../../utill";
import { FC, useEffect, useState } from "react";
import { ticketPriceData } from "../../api/ticketPriceRate";
import { publishTicketRate } from "../../api/publishTicketRate";
import { CustomizedStatusDialogs } from "../custom-table/CustomDialog";

export const TicketRatePublish: FC<{ path: string }> = ({ path }) => {
  const [ticketrate, setTicketRate] = useState<string>("");
  const [status, setStatus] = useState(false);
  // const [is_ticket_published, setTicketPublished] = useState(false);
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
        console.log(res);

        if (res.data) {
          if (res.data.data.ticketRate !== 0)
            setTicketRate(res.data.data.ticketRate);
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
            dailyPublishTicketRateIsAvailable() && handleTicketRate();
          } else if (handlePath() === "weekly") {
            weeklyPublishTicketRateIsAvailable() && handleTicketRate();
          } else if (handlePath() === "monthly") {
            monthlyPublishTicketRateIsAvailable() && handleTicketRate();
          }
        }}
        sx={{
          p: 1.25,
          background:
            handlePath() === "daily" && dailyPublishTicketRateIsAvailable()
              ? "#0bb329"
              : handlePath() === "weekly" &&
                weeklyPublishTicketRateIsAvailable()
              ? "#0bb329"
              : handlePath() === "monthly" &&
                monthlyPublishTicketRateIsAvailable()
              ? "#0bb329"
              : "grey",
          cursor:
            handlePath() === "daily" && dailyPublishTicketRateIsAvailable()
              ? "pointer"
              : handlePath() === "weekly" &&
                weeklyPublishTicketRateIsAvailable()
              ? "pointer"
              : handlePath() === "monthly" &&
                monthlyPublishTicketRateIsAvailable()
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
