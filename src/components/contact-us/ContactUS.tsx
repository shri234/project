import { Box } from "@mui/material";
import "./contactus.css";
import Contact from "./Content";
const ContactUS = () => {
  return (
    <Box
      component={"div"}
      sx={{
        textAlign: "center",
        fontWeight: "600",
        color: "#fff",
        fontSize: "30px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <Box
        sx={{ color: "#fff", fontSize: "2.5rem", fontWeight: "bold", pt: 4 }}
      >
        Contact Us
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          justifyContent: { xs: "center", sm: "center" },
          mt: 4,
        }}
      >
        <Box
          sx={{
            border: "1px solid #fff",
            borderRadius: "10px",
            background: "transparent",
            boxShadow: `rgba(0, 0, 0, 0.35) 0px 5px 15px;`,
          }}
        >
          <Contact />
        </Box>
      </Box>
    </Box>
  );
};
export default ContactUS;
