import { Box } from "@mui/material";
import MasterNavbar from "./Navbar";

const MasterHome = () => {
  const handleLoginType = (type: string, path: string) => {
    window.location.href = `/${path}`;
    console.log(`Login as: ${type}`);
  };

  return (
    <>
      <Box>
        <MasterNavbar path="/" />
      </Box>
      <Box
        className="login-container"
        sx={{ maxWidth: { xs: "220px", sm: "350px" } }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <h1
            style={{
              textAlign: "center",
              marginBottom: "50px",
              color: "#060538",
              fontWeight: "bold",
              fontSize: "40px",
              // backgroundImage: `url('/spin_background.svg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              display: "inline-block",
              padding: "50px",
            }}
          >
            Welcome Master
          </h1>
        </Box>

        <div className="button-row">
          <button
            className="role-button admin"
            onClick={() => handleLoginType("Admin", "user-details")}
          >
            USER DETAILS
          </button>
          <button
            className="role-button user"
            onClick={() => handleLoginType("User", "spin-wheel")}
          >
            SPIN WHEEL
          </button>
          <button
            className="role-button agent"
            onClick={() => handleLoginType("Agent", "payment-request")}
          >
            PAYMENT REQUEST
          </button>
        </div>
      </Box>
    </>
  );
};
export default MasterHome;
