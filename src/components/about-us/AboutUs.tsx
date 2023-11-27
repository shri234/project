import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const AboutUs = () => {
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
        padding="2rem"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: { xs: "60%", sm: "30%" },
              height: { xs: "60%", sm: "30%" },
              display: { xs: "none", sm: "block" },
            }}
          >
            <img
              src="./about_us.png"
              alt="about us"
              height={"100%"}
              width={"100%"}
            />
          </Box>
          <Box
            sx={{
              width: { xs: "100%", sm: "60%" },
              color: "#fff",
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              sx={{ color: "#D81159", fontWeight: "bold", fontSize: "2.5rem" }}
            >
              About Us
            </Typography>
            <Typography variant="h6" gutterBottom>
              How we work
            </Typography>
            <Typography variant="body1" paragraph>
              Spin and Win is an exciting Rewards Program offered by Spin Mining
              Game. Every day, you have the opportunity to spin the wheel and
              win up to ₹10,000 in cash prizes. When you participate in the Spin
              & Win Wheel by Spin Mining Game, the amount is instantly added to
              your Spin Mining Game wallet.Money Mining game provides customer
              support to manage any queries or concerns you may have.
            </Typography>
            {/* <Button variant="contained" color="primary">
              See more
            </Button> */}
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default AboutUs;
