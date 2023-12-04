import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { CustomizedStatusDialogs } from "../custom-table/CustomDialog";
import { STATUS, dialog_timeout } from "../../utill";
import { forgotPassword } from "../../api/forgotPassword";

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
  const [email, setEmail] = useState("");
  const [email_error, setEmailError] = useState<string>("");
  const [status, setStatus] = useState(false);
  const emailRegex = /\S+@\S+\.\S+/;
  const isEmailValid = (): boolean => {
    if (email.length === 0) {
      setEmailError("Enter email id...");
      setEmail("");
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError("Enter valid email...");
      setEmail("");
      return false;
    }
    return true;
  };
  const handleForgotPassword = async () => {
    if (isEmailValid()) {
      const body = {
        email: email,
      };

      await forgotPassword(body)
        .then((res) => {
          setStatus(true);
          setTimeout(() => {
            setStatus(false);
          }, dialog_timeout);
          window.location.href = "/login";
        })
        .catch((err) => {
          setEmailError("email id is not exist...");
          setEmail("");
          console.log(err);
        });
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
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 2, sm: 0.2 },
              justifyContent: { xs: "start", sm: "center" },
              alignItems: "center",
            }}
          >
            <Box component={"div"} className="input-container">
              <label className="label-color">Email</label>
              <input
                type="email"
                onFocus={() => {
                  setEmailError("");
                }}
                style={email_error.length > 0 ? { color: "red" } : {}}
                value={email_error.length > 0 ? email_error : email}
                onChange={(e) => {
                  setEmailError("");
                  setEmail(e.target.value);
                }}
                className={email_error.length > 0 ? "invalid" : ""}
                placeholder="Enter your email"
              />

              {/* {email_error.length > 1 && <p className="error">{email_error}</p>} */}
            </Box>
            <Button
              onClick={handleForgotPassword}
              sx={{
                background: "green",
                color: "#fff",
                fontWeight: "650",
                mt: 1.2,
                ":hover": {
                  background: "green",
                },
              }}
            >
              Send
            </Button>
          </Box>
          {status && (
            <CustomizedStatusDialogs
              setOpenStatusDlg={setStatus}
              description="Password sent successfully..."
              status={STATUS.SUCCESS}
            />
          )}
        </Box>
      </Modal>
    </div>
  );
}
