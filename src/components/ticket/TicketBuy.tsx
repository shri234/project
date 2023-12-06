import { Box, Button } from "@mui/material";
import { STATUS, numbers } from "../../utill";
import { FC, useState } from "react";
import axios from "axios";
import { CustomizedStatusDialogs } from "../custom-table/CustomDialog";
import Loader from "../loader/Loader";

export const TicketBuy: FC<{
  ticketcount: number;
  name: string;
}> = ({ ticketcount, name }) => {
  const handlePath = (): string => {
    return name === "Daily Spin"
      ? "daily"
      : name === "Weekly Spin"
      ? "weekly"
      : "monthly";
  };
  const [ticket, setTicket] = useState<any[]>([]);
  const [status_dlg, setOpenStatusDlg] = useState(false);
  const [loader, setLoader] = useState(false);
  const [status, setStatus] = useState({
    ticket_buy: false,
    ticket_count: false,
    ticket_buy_error: false,
    ticket_digit: false,
  });

  const handleDigitSelect = (digits: any) => {
    let digitset = {
      digit: digits,
      status: "null",
    };

    if (ticket.length < 4)
      if (ticket.includes(digits)) {
        setTicket((prevNumbers) => prevNumbers.filter((n) => n !== digitset));
      } else {
        setTicket((prevNumbers) => [...prevNumbers, digitset]);
      }
  };

  const handleBuyTicket = async () => {
    const body = { ticket: ticket, userId: sessionStorage.getItem("userId") };
    await axios
      .post(
        `${process.env.REACT_APP_IP}/ticket/add-${handlePath()}-ticket`,
        body
      )
      .then((res) => {
        setLoader(false);
        if (res.status === 200) {
          setOpenStatusDlg(true);
          setStatus((prevStatus) => ({
            ...prevStatus,
            ticket_buy: true,
          }));
          setTimeout(() => {
            setOpenStatusDlg(false);
            setStatus((prevStatus) => ({
              ...prevStatus,
              ticket_buy: false,
            }));
          }, 6000);
        }
        window.location.href = `/${handlePath()}`;
      })
      .catch((error) => {
        setLoader(false);
        setOpenStatusDlg(true);
        setStatus((prevStatus) => ({
          ...prevStatus,
          ticket_buy_error: true,
        }));
        setTimeout(() => {
          setOpenStatusDlg(false);
          setStatus((prevStatus) => ({
            ...prevStatus,
            ticket_buy_error: false,
          }));
        }, 6000);
      });
    setTicket([]);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        mb: 1,
        mt: 1,
      }}
    >
      {loader && <Loader />}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gridGap: "10px",
          rowGap: "10px",
          mt: 2,
        }}
      >
        {numbers.map((number) => (
          <Button
            key={number.id}
            component={"div"}
            onClick={() => handleDigitSelect(number.value)}
            sx={{
              minWidth: "20px",

              height: "20px",
              background: ticket.length === 4 ? "#7e6580" : "violet",
              fontWeight: "700",
              color: "#fff",

              px: 2,
              py: 3,
              ":hover": {
                background: ticket.length === 4 ? "#7e6580" : "violet",
              },
              textAlign: "center",
              borderRadius: "5px",
              cursor: "pointer",
              boxShadow: `rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px`,
            }}
          >
            {number.value}
          </Button>
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          mt: 1,
          gridGap: "10px",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "5px",
            background: "grey",
            color: "#fff",
            fontWeight: "600",
            textAlign: "center",
            p: 1,
            borderRadius: "4px",
            minWidth: "80px",
            minHeight: "20px",
          }}
        >
          {ticket.map((value, index) => (
            <Box key={index}>{value.digit}</Box>
          ))}
        </Box>
        {ticket.length > 0 && (
          <Box
            onClick={() => {
              setTicket([]);
            }}
            sx={{
              background: "red",
              color: "#fff",
              fontWeight: "600",
              textAlign: "center",
              p: 1,
              maxWidth: "fit-content",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Clear
          </Box>
        )}
        <Box
          onClick={async () => {
            if (ticket.length === 4 && ticketcount === 0) {
              setOpenStatusDlg(true);
              setStatus((prevStatus) => ({
                ...prevStatus,
                ticket_count: true,
              }));
              setTimeout(() => {
                setOpenStatusDlg(false);
                setStatus((prevStatus) => ({
                  ...prevStatus,
                  ticket_count: false,
                }));
              }, 5000);
            } else if (ticket.length === 4) {
              setLoader(true);
              await handleBuyTicket();
            } else {
              setTicket([]);
              setOpenStatusDlg(true);
              setStatus((prevStatus) => ({
                ...prevStatus,
                ticket_digit: true,
              }));
              setTimeout(() => {
                setOpenStatusDlg(false);
                setStatus((prevStatus) => ({
                  ...prevStatus,
                  ticket_digit: false,
                }));
              }, 5000);
            }
          }}
          sx={{
            background: "green",
            color: "#fff",
            fontWeight: "600",
            textAlign: "center",
            p: 1,
            maxWidth: "fit-content",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Confirm
        </Box>
      </Box>
      {status_dlg && status.ticket_buy && (
        <CustomizedStatusDialogs
          setOpenStatusDlg={setOpenStatusDlg}
          description="Success! Ticket has been bought."
          status={STATUS.SUCCESS}
        />
      )}
      {status_dlg && status.ticket_count && (
        <CustomizedStatusDialogs
          setOpenStatusDlg={setOpenStatusDlg}
          description="Can't buy ticket. Your ticket count is 0 !"
          status={STATUS.WARNING}
        />
      )}
      {status_dlg && status.ticket_buy_error && (
        <CustomizedStatusDialogs
          setOpenStatusDlg={setOpenStatusDlg}
          description="Buy ticket Failed!"
          status={STATUS.ERROR}
        />
      )}
      {status_dlg && status.ticket_digit && (
        <CustomizedStatusDialogs
          setOpenStatusDlg={setOpenStatusDlg}
          description="Must Fill All Columns!"
          status={STATUS.ERROR}
        />
      )}
    </Box>
  );
};
