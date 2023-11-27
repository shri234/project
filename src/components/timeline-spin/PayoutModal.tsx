import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { useState } from "react";

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
  setOpenLoader,
}: {
  setPayoutOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenLoader: React.Dispatch<React.SetStateAction<boolean>>;
  walletAmount: number;
}) {
  const [amount, setAmount] = useState(0);

  const handleRedeem = async () => {
    // setOpenLoader(true);
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
        if (res.status === 200) {
          window.alert("Success! Redeem request has been submitted");
        }
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
                placeholder="Enter amount..."
                value={amount === 0 ? "" : amount}
                onChange={(e) => setAmount(parseInt(e.target.value))}
              />
            </Box>
            <Button
              onClick={() => {
                if (amount === 0) {
                  alert("Please enter amount");
                } else if (walletAmount > amount) {
                  handleRedeem();
                } else {
                  alert("Insufficient fund");
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
      </Modal>
    </div>
  );
}
