import { Button, FormControl, InputLabel, OutlinedInput } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useState, FormEvent } from "react";
import { STATUS, dialog_timeout } from "../../utill";
import { CustomizedStatusDialogs } from "../custom-table/CustomDialog";
import { contactUs } from "../../api/contactUs";

const Contact: React.FC = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  const [error, setError] = useState({
    username_error: "",
    email_error: "",
    message_error: "",
  });

  const isAllValueEntered = (): boolean => {
    if (username.length === 0 && email.length === 0 && message.length === 0) {
      setError({
        username_error: "Please enter username!",
        email_error: "Please enter email!",
        message_error: "please enter message!",
      });
      return false;
    }
    if (
      error.email_error.length === 0 &&
      error.message_error.length === 0 &&
      error.message_error.length === 0
    )
      return true;
    return false;
  };

  const handleSubmit = async (e: FormEvent) => {
    if (isAllValueEntered()) {
      if (!emailRegex.test(email)) {
        setError({ ...error, email_error: "Invalid email !" });
        setEmail("");
        return;
      }
      const body = {
        fullname: username,
        email: email,
        message: message,
      };

      await contactUs(body)
        .then((res) => {
          setStatus(true);

          setTimeout(() => {
            setStatus(false);
          }, dialog_timeout);

          window.location.href = "/";
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newUserName = event.target.value;

    setUserName(newUserName);
    setError({
      ...error,
      username_error: "",
    });
  };

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const message = event.target.value;
    setMessage(message);
    setError({
      ...error,
      message_error: "",
    });
  };

  const emailRegex = /\S+@\S+\.\S+/;
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setError({
      ...error,
      email_error: "",
    });
  };

  return (
    <Box sx={{ color: "#fff" }}>
      <Box
        component={"div"}
        sx={{ display: "flex", flexDirection: "column", p: 2, color: "#fff" }}
      >
        <FormControl
          sx={{
            m: 1,
            maxWidth: "400px",
            width: { xs: "250px", sm: "400px" },
            color: "#fff",
          }}
          variant="outlined"
        >
          <InputLabel
            htmlFor="outlined-adornment-password"
            sx={{ color: "#fff" }}
            style={
              error.username_error.length > 0
                ? { color: "red", display: "none" }
                : {}
            }
          >
            Full Name
          </InputLabel>
          <OutlinedInput
            onFocus={() => {
              setError({ ...error, username_error: "" });
            }}
            value={
              error.username_error.length > 0 ? error.username_error : username
            }
            style={
              error.username_error.length > 0
                ? { color: "red", border: "1px solid red" }
                : {}
            }
            sx={{
              border: "1px solid #fff",
              color: "#fff",
              ":active": {
                border: "none",
              },
              ":focus": {
                border: "none",
              },
            }}
            id="outlined-adornment-password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleUserNameChange(e)
            }
            type={"text"}
            label="Username"
          />
        </FormControl>
        <FormControl
          sx={{ m: 1, maxWidth: "400px", width: { xs: "250px", sm: "400px" } }}
          variant="outlined"
        >
          <InputLabel
            htmlFor="outlined-adornment-password"
            sx={{ color: "#fff" }}
            style={
              error.email_error.length > 0
                ? { color: "red", display: "none" }
                : {}
            }
          >
            E-mail
          </InputLabel>
          <OutlinedInput
            onFocus={() => {
              setError({ ...error, email_error: "" });
            }}
            value={error.email_error.length > 0 ? error.email_error : email}
            style={
              error.email_error.length > 0
                ? { color: "red", border: "1px solid red" }
                : {}
            }
            sx={{ border: "1px solid #fff", color: "#fff" }}
            id="outlined-adornment-password"
            onChange={handleEmailChange}
            type={"mail"}
            label="E-mail"
          />
        </FormControl>
        <FormControl
          sx={{ m: 1, maxWidth: "400px", width: { xs: "250px", sm: "400px" } }}
          variant="outlined"
        >
          <InputLabel
            style={
              error.message_error.length > 0
                ? { color: "red", display: "none" }
                : {}
            }
            htmlFor="outlined-adornment-password"
            sx={{ color: "#fff", fontWeight: "700" }}
          >
            Message
          </InputLabel>
          <OutlinedInput
            onFocus={() => {
              setError({ ...error, message_error: "" });
            }}
            value={
              error.message_error.length > 0 ? error.message_error : message
            }
            style={
              error.message_error.length > 0
                ? { color: "red", border: "1px solid red" }
                : {}
            }
            sx={{ border: "1px solid #fff", color: "#fff" }}
            id="outlined-adornment-password"
            onChange={handleMessageChange}
            type={"text"}
            label="Message"
          />
        </FormControl>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6, mb: 2 }}>
          <Button
            onClick={handleSubmit}
            sx={{
              background: "green",
              color: "#fff",
              width: "140px",
              borderRadius: "10px",
              whiteSpace: "nowrap",
              ":hover": {
                background: "green",
              },
            }}
          >
            Contact Us
          </Button>
        </Box>
        {status && (
          <CustomizedStatusDialogs
            setOpenStatusDlg={setStatus}
            description={"Message sent successfully"}
            status={STATUS.SUCCESS}
          />
        )}
      </Box>
    </Box>
  );
};

export default Contact;
