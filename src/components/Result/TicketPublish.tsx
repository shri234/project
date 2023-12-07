import { Dispatch, FC, SetStateAction, useState } from "react";
import {
  STATUS,
  dailyPublishResultIsAvailable,
  dialog_timeout,
  monthlyPublishResultIsAvailable,
  weeklyPublishResultIsAvailable,
} from "../../utill";
import Box from "@mui/material/Box";
import { Input } from "@mui/material";
import { CustomizedStatusDialogs } from "../custom-table/CustomDialog";

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
  handlePublishResult: () => Promise<void>;
  isPriceRatePublished: boolean;
}> = ({
  ticket,
  setTicket,
  setLoader,
  path,
  handlePublishResult,
  isPriceRatePublished,
}) => {
  const handlePath = () => {
    return path === "Daily"
      ? "daily"
      : path === "Weekly"
      ? "weekly"
      : "monthly";
  };
  const [status, setStatus] = useState(false);
  return (
    <>
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
            if (
              (handlePath() === "daily" && dailyPublishResultIsAvailable()) ||
              (handlePath() === "weekly" && weeklyPublishResultIsAvailable())
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
                setStatus(true);
                setTimeout(() => {
                  setStatus(false);
                }, dialog_timeout);
              }
          }}
          sx={{
            p: 1,
            borderRadius: "5px",
            background:
              handlePath() === "daily" &&
              dailyPublishResultIsAvailable() &&
              !isPriceRatePublished
                ? "#7a1160"
                : handlePath() === "weekly" &&
                  weeklyPublishResultIsAvailable() &&
                  !isPriceRatePublished
                ? "#7a1160"
                : handlePath() === "monthly" &&
                  monthlyPublishResultIsAvailable()
                ? "#7a1160"
                : "grey",
            color: "#fff",
            fontWeight: "600",
            cursor:
              handlePath() === "daily" &&
              dailyPublishResultIsAvailable() &&
              !isPriceRatePublished
                ? "pointer"
                : handlePath() === "weekly" &&
                  weeklyPublishResultIsAvailable() &&
                  !isPriceRatePublished
                ? "pointer"
                : handlePath() === "monthly" &&
                  monthlyPublishResultIsAvailable()
                ? "pointer"
                : "no-drop",
          }}
        >
          PUBLISH
        </Box>
      </Box>
      {status && (
        <CustomizedStatusDialogs
          setOpenStatusDlg={setStatus}
          description="Fill All digits"
          status={STATUS.WARNING}
        />
      )}
    </>
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
          textAlign: "center",
          boxShadow: `rgba(0, 0, 0, 0.35) 0px 0px 5px;`,
        }}
      />
    </Box>
  );
};
