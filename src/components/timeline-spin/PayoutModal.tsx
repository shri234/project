import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { useEffect, useState } from "react";
import { DialogTitle } from "@mui/material";

const loadRazorpayScript = (src: string) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //   width: 400,
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

export default function PayoutModal({
  setPayoutOpen,
}: {
  setPayoutOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [amount, setAmount] = useState(0);

  const handleRedeem = async () => {
    const userId = sessionStorage.getItem("userId")

    const body = { username:sessionStorage.getItem("username"), userId: userId,amount:amount };
    console.log(body);
    await axios
      .post("http://localhost:3002/payment/redeem", body)
      .then((res) => {
        if (res.status === 200) {
          window.alert("Success! Redeem request has been submitted");
        }
        window.location.href = "/spin";
      })
      .catch((error) => {
        console.log(error);
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
              justifyContent: "center",
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
              onClick={() => {handleRedeem()}}
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
