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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
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
            sx={{ border: "1px solid #fff", color: "#fff" }}
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
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
            type={"text"}
            label="Message"
          />
        </FormControl>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6, mb: 2 }}>
          <Button
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
