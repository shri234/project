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

export default function EmailModal({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [amount, setAmount] = useState(0);
  const [email, setEmail] = useState("");
  const handleForgotPassword = async () => {
    const body = {
      email: email,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_IP}/user/sendPasswordMail`,
        body
      );
      if (response.status == 200) {
        window.alert("Success sent password to you mail");
        window.location.href = "/login";
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Modal
        open={true}
        onClose={() => setOpen(false)}
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
            Email ID
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
                type="text"
                placeholder="Enter email id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Button
              onClick={handleForgotPassword}
              sx={{
                background: "green",
                color: "#fff",
                fontWeight: "650",
                ":hover": {
                  background: "green",
                },
              }}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
