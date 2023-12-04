import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

import { useState } from "react";
import { handleKeyPrevent } from "../../utill";
import { amountDeposit } from "../../api/amountDeposit";

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

  const handleRedeem = async () => {
    const body = {
      amount: amount,
      userId: sessionStorage.getItem("userid"),
      username: sessionStorage.getItem("userName"),
    };

    amountDeposit(body)
      .then(() => {
        window.location.href = "/user-details";
      })
      .catch((error) => {
        console.log(error);
      });
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
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "center",
              alignItems: "center",
              gap: { xs: 2, sm: 0 },
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
