import { Box } from "@mui/material";
import MasterNavbar from "./Navbar";
import { isAuthenticated } from "../isAuthenticated/IsAuthenticated";

  const handleLoginType = (type: string, path: string) => {
    window.location.href = `/${path}`;
    console.log(`Login as: ${type}`);
  };

  return (
    isAuthenticated("master") && (
      <Box>
        <MasterNavbar path="/master" />

        <Box
          className="login-container"
          sx={{ maxWidth: { xs: "220px", sm: "350px" } }}
        >
          <Box
            sx={{
              color: "#210759",
              fontWeight: "bold",
              fontSize: "1.75rem",
              mb: 2,
            }}
          >
            SPIN WHEEL
          </Box>
          <div className="button-row">
            <button
              className="role-button admin"
              onClick={() => handleLoginType("Master", "/master-daily-result")}
            >
              Daily
            </button>
            <button
              className="role-button user"
              onClick={() => handleLoginType("User", "/master-weekly-result")}
            >
              Weekly
            </button>
            <button
              className="role-button agent"
              onClick={() => handleLoginType("Agent", "/master-monthly-result")}
            >
              Monthly
            </button>
          </div>
        </Box>
      </Box>
    )
  );
};
export default SpinWheel;
