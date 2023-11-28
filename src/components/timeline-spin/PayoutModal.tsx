import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { useState } from "react";
import { STATUS, handleKeyPrevent } from "../../utill";
import { CustomizedStatusDialogs } from "../custom-table/CustomDialog";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

export default function PayoutModal({
  setPayoutOpen,
  walletAmount,
}: {
  setPayoutOpen: React.Dispatch<React.SetStateAction<boolean>>;

  walletAmount: number;
}) {
  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState(false);
  const [loader, setOpenLoader] = useState(false);
  const [status_dlg, setStatusDlg] = useState({
    error: false,
    warning: false,
    success: false,
  });

  const handleRedeem = async () => {
    setOpenLoader(true);
    const userId = sessionStorage.getItem("userId");

    const body = {
      username: sessionStorage.getItem("username"),
      userId: userId,
      amount: amount,
      email: sessionStorage.getItem("email"),
    };

    await axios
      .post(`${process.env.REACT_APP_IP}/payment/redeem`, body)
      .then((res) => {
        setStatus(true);
        setStatusDlg((prevStatus) => ({
          ...prevStatus,
          success: true,
        }));
        setTimeout(() => {
          setStatus(false);
          setStatusDlg((prevStatus) => ({
            ...prevStatus,
            success: false,
          }));
        }, 5000);
        window.location.href = "/spin";
        setOpenLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setOpenLoader(false);
      });
  };

  return (
    <div>
      <Modal
        open={true}
        onClose={() => setPayoutOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          {status && status_dlg.error && (
            <CustomizedStatusDialogs
              setOpenStatusDlg={setStatus}
              description="Insufficient fund..."
              status={STATUS.ERROR}
            />
          )}
          {status && status_dlg.success && (
            <CustomizedStatusDialogs
              setOpenStatusDlg={setStatus}
              description="Redeemed successfully."
              status={STATUS.SUCCESS}
            />
          )}
          {status && status_dlg.warning && (
            <CustomizedStatusDialogs
              setOpenStatusDlg={setStatus}
              description="Please Enter amount..."
              status={STATUS.WARNING}
            />
          )}
          <Box sx={style}>
            <Box
              sx={{
                color: "#092b61",
                fontWeight: "bold",
                my: 1,
                fontSize: "18px",
              }}
            >
              Withdraw
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: { xs: 2, sm: 0 },
                justifyContent: { xs: "start", sm: "center" },
                alignItems: "center",
              }}
            >
              <Box>
                <input
                  type="number"
                  min={0}
                  placeholder="Enter amount..."
                  value={amount === 0 ? "" : amount}
                  onChange={(e) => {
                    handleKeyPrevent(e) && setAmount(parseInt(e.target.value));
                  }}
                />
              </Box>
              <Button
                onClick={() => {
                  if (amount === 0) {
                    setStatus(true);
                    setStatusDlg((prevStatus) => ({
                      ...prevStatus,
                      warning: true,
                    }));
                    setTimeout(() => {
                      setStatus(false);
                      setStatusDlg((prevStatus) => ({
                        ...prevStatus,
                        warning: false,
                      }));
                    }, 5000);
                  } else if (walletAmount > amount) {
                    handleRedeem();
                  } else {
                    setStatus(true);
                    setStatusDlg((prevStatus) => ({
                      ...prevStatus,
                      error: true,
                    }));
                    setTimeout(() => {
                      setStatus(false);
                      setStatusDlg((prevStatus) => ({
                        ...prevStatus,
                        error: false,
                      }));
                    }, 5000);
                  }
                }}
                sx={{
                  background: "green",
                  color: "#fff",
                  fontWeight: "650",
                  ":hover": {
                    background: "green",
                  },
                }}
              >
                Redeem
              </Button>
            </Box>
          </Box>
        </>
      </Modal>
    </div>
  );
}
