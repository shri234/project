import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import Box from "@mui/material/Box";
import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface FormData {
  fullName: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    message: "",
  });
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    const body = {
      fullname: fullName,
      email: email,
      message: message,
    };
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_IP}/user/sendMail`,
        body
      );
      if (response.status == 200) {
        window.alert("Success");
        window.location.href = "/";
      }
    } catch (err) {
      console.log(err);
    }
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
          >
            Full Name
          </InputLabel>
          <OutlinedInput
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
            onChange={(e) => setFullName(e.target.value)}
            type={"text"}
            label="Full Name"
          />
        </FormControl>
        <FormControl
          sx={{ m: 1, maxWidth: "400px", width: { xs: "250px", sm: "400px" } }}
          variant="outlined"
        >
          <InputLabel
            htmlFor="outlined-adornment-password"
            sx={{ color: "#fff" }}
          >
            E-mail
          </InputLabel>
          <OutlinedInput
            sx={{ border: "1px solid #fff", color: "#fff" }}
            id="outlined-adornment-password"
            onChange={(e) => setEmail(e.target.value)}
            type={"mail"}
            label="E-mail"
          />
        </FormControl>
        <FormControl
          sx={{ m: 1, maxWidth: "400px", width: { xs: "250px", sm: "400px" } }}
          variant="outlined"
        >
          <InputLabel
            htmlFor="outlined-adornment-password"
            sx={{ color: "#fff", fontWeight: "700" }}
          >
            Message
          </InputLabel>
          <OutlinedInput
            sx={{ border: "1px solid #fff", color: "#fff" }}
            id="outlined-adornment-password"
            onChange={(e) => setMessage(e.target.value)}
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
            }}
          >
            Contact Us
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Contact;
