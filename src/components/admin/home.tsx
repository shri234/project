import { Box } from "@mui/material";
import BackOfficeNavbar from "./NavBar";
import { isAuthenticated } from "../isAuthenticated/IsAuthenticated";

const AdminHome = () => {
  const handleLoginType = (type: string, path: string) => {
    window.location.href = `/${path}`;
  };

  return (
    isAuthenticated("admin") && (
      <Box>
        <BackOfficeNavbar path="/" />
        <Box
          className="login-container"
          sx={{ maxWidth: { xs: "220px", sm: "350px" } }}
        >
          <div className="button-row">
            <button
              className="role-button admin"
              onClick={() => handleLoginType("Admin", "daily-result")}
            >
              Daily
            </button>
            <button
              className="role-button user"
              onClick={() => handleLoginType("User", "weekly-result")}
            >
              Weekly
            </button>
            <button
              className="role-button agent"
              onClick={() => handleLoginType("Agent", "monthly-result")}
            >
              Monthly
            </button>
          </div>
        </Box>
      </Box>
    )
  );
};

export default AdminHome;
