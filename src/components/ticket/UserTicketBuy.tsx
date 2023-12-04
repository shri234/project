import { Box } from "@mui/material";
import CustomizedTables from "./CustomTicketTable";
import TicketNavBar from "./TicketNavbar";
import { FC, useEffect } from "react";
import React, { useState } from "react";
import SpinnerWheel from "../Test";
import Marquee from "./marque";

import { isAuthenticated } from "../isAuthenticated/IsAuthenticated";
import Loader from "../loader/Loader";
import "./UserTicketBuy.css";
import BuyTicketWarningDlg from "./BuyTicketDialog";
import { TicketBuy } from "./TicketBuy";
import { CountDown } from "./CountDown";
import { TicketCountandBuyTicket } from "./TicketCountAndBuyTicket";
import { WinningTicket } from "./WinningTicket";
import { winnerData } from "../../api/winnerData";
import useUserWalletAndTicketCount from "../../swr/wallet_ticket_count";
import useWinningTicket from "../../swr/winningTicket";
import { handleSpinner, spinnerTimeline } from "../../utill";
import { MonthlyWinningTicket } from "./MonthlyWinningTicket";

export interface WinningTicketInterface {
  first: null | number;
  second: null | number;
  third: null | number;
  fourth: null | number;
}

const UserTicketBuy: FC<{ name: string; path: string }> = ({ name, path }) => {
  const handlePath = (): string => {
    return name === "Daily Spin"
      ? "daily"
      : name === "Weekly Spin"
      ? "weekly"
      : "monthly";
  };

  const { user_wallet_and_ticket_count, isLoading, refetch } =
    useUserWalletAndTicketCount(handlePath());

  const {
    use_winning_ticket,
    winningTicketisLoading,
    winningTicketRefetch: winningTicketRefresh,
  } = useWinningTicket(handlePath());

  const [walletAmount, setWalletAmount] = useState(0);
  const [ticketcount, setTicketCount] = useState(0);

  const [buy_ticket_warning_dlg, setBuyTicketWarningDlg] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: "",
    minutes: "",
    seconds: "",
  });
  const [winner, setWinner] = useState("");

  const [open, setOpen] = React.useState(false);
  const [result, setResult] = useState([]);

  const [winning_ticket, setWinningTicket] = useState<WinningTicketInterface[]>(
    [
      {
        first: null,
        second: null,
        third: null,
        fourth: null,
      },
    ]
  );
  const [renderCount, setRenderCount] = useState(0);
  const [tmp_spinner, setTmpSpinner] = useState(0);

  useEffect(() => {
    refetch().then((res) => {
      if (res) {
        if (res.data !== null && res.data !== undefined) {
          setWalletAmount(
            res.data !== undefined && res.data !== null ? res.data.amount : 0
          );
          setTicketCount(
            res.data !== undefined && res.data !== null
              ? handlePath() === "daily"
                ? res.data.dailyTicketCount
                : handlePath() === "weekly"
                ? res.data.weeklyTicketCount
                : handlePath() === "monthly"
                ? res.data.monthlyTicketCount
                : 0
              : 0
          );
        }
      }
    });
  }, [isLoading, user_wallet_and_ticket_count]);

  useEffect(() => {
    winningTicketRefresh().then((res) => {
      if (res !== undefined)
        if (res.data !== undefined && res.data !== null) {
          const tmp: [] = res.data.data.result_ticket.split("").map(Number);
          setResult(tmp);
        }
    });
  }, [winningTicketisLoading, use_winning_ticket]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      spinnerTimeline(name, setTimeLeft);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [name]);

  useEffect(() => {
    handleSpinner(
      name,
      result,
      renderCount,
      setWinningTicket,
      setRenderCount,
      setTmpSpinner
    );
  }, [renderCount, result, timeLeft.hours, tmp_spinner, name]);

  useEffect(() => {
    winnerData(handlePath())
      .then((res) => {
        setWinner(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [name]);

  return (
    isAuthenticated("user") && (
      <Box
        sx={{
          height: { xs: "100%", sm: "100%" },
          backgroundImage: `url('/monthly.jpeg')`,
          width: "100%",
        }}
      >
        {open && <Loader />}
        {buy_ticket_warning_dlg && (
          <BuyTicketWarningDlg
            setBuyTicketWarningDlg={setBuyTicketWarningDlg}
          />
        )}
        <TicketNavBar name={name} wallet_amount={walletAmount} />

        <Box sx={{ mb: 1, mt: 3 }}>
          <TicketCountandBuyTicket
            ticketcount={ticketcount}
            path={path}
            setBuyTicketWarningDlg={setBuyTicketWarningDlg}
          />
          <Marquee data={winner} />

          <Box
            component={"div"}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              px: { xs: "0%", sm: "15%" },
              py: 1,
            }}
          >
            <CountDown timeLeft={timeLeft} />

            {handlePath() === "monthly" ? (
              <>
                <MonthlyWinningTicket winning_ticket={winning_ticket} />
              </>
            ) : (
              <WinningTicket winning_ticket={winning_ticket} />
            )}
          </Box>

          <Box
            component={"div"}
            sx={{
              display: "flex",
              justifyContent: "center",
              my: 6,
            }}
          >
            <SpinnerWheel value={tmp_spinner} />
          </Box>
          <TicketBuy ticketcount={ticketcount} />
          <CustomizedTables name={name} />
        </Box>
      </Box>
    )
  );
};

export default UserTicketBuy;

// useEffect(() => {
//   (async () => {
//     await winningTicket(handlePath())
//       .then((res) => {
//         if (res.data.data) {
//           const tmp: [] = res.data.data.result_ticket.split("").map(Number);
//           setResult(tmp);
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   })();
// }, [name]);
