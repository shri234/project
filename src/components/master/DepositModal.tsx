import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import moment from "moment";
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

export default function DepsoitModal({
  setDepsoitAmount,
}: {
  setDepsoitAmount: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState(0);

  const handleRedeem = async () => {
    const userId = sessionStorage.getItem("userid");

    try {
      const body = {
        amount: amount,
        userId: userId,
        username: sessionStorage.getItem("username"),
      };
      console.log(body);
      let date = new Date();
      let datee = moment(date).format("YYYY-MM-DD");
      console.log(datee);
      const response = await axios.post(
        `${process.env.REACT_APP_IP}/ticket/addWallet`,
        body
      );

      if (response.status == 200) {
        window.location.href = "/user-details";
      }
    } catch (err) {}
  };

  return (
    <div>
      <Modal
        open={true}
        onClose={() => setDepsoitAmount(false)}
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
            Amount
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
              onClick={() => {
                handleRedeem();
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
              Publish
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
