import { Box, Button } from "@mui/material";
import BackOfficeNavbar from "./NavBar";

const BackOfficeHome = () => {
  return (
    <Box>
      <BackOfficeNavbar path="/" />
      <Box
        component={"div"}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh    ",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "30px",
            boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;`,
            borderRadius: "5px",
            p: 2,
          }}
        >
          <Button
            onClick={() => {
              window.location.href = "/back-office-user-details";
            }}
            sx={{
              background: "#183a70",
              color: "#fff",
              fontWeight: "600",
              fontSize: "1rem",
              width: "250px",
              ":hover": {
                background: "#183a70",
              },
            }}
          >
            USER DETAILS
          </Button>
          <Button
            onClick={() => {
              window.location.href = "/back-office-payment-request";
            }}
            sx={{
              background: "#4a075e",
              color: "#fff",
              fontWeight: "600",
              fontSize: "1rem",
              width: "250px",
              ":hover": {
                background: "#4a075e",
              },
            }}
          >
            PAYMENT REQUEST
          </Button>
          <Button
            onClick={() => {
              window.location.href = "/agent-sign-up";
            }}
            sx={{
              background: "#780c2c",
              color: "#fff",
              fontWeight: "600",
              fontSize: "1rem",
              width: "250px",
              ":hover": {
                background: "#780c2c",
              },
            }}
          >
            AGENT CREATE
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
export default BackOfficeHome;
