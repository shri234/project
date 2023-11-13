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
            }}
          >
            <img
              src="./about_us.png"
              alt="about us"
              height={"100%"}
              width={"100%"}
            />
          </Box>
          <Box sx={{ width: { xs: "100%", sm: "60%" }, color: "#fff" }}>
            <Typography variant="h4" gutterBottom>
              About Us
            </Typography>
            <Typography variant="h6" gutterBottom>
              How we work
            </Typography>
            <Typography variant="body1" paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Deserunt
              repudiandae deleniti a nulla officiis eveniet soluta quia ex.
              Unde, sit, aliquam. Fugit, aliquid, beatae. Sunt minus
              consectetur, quam? Deserunt, earum, eiusmod? Neque amet adipisci
              quidem earum tempore ut repellat officiis accusantium. In
              delectus, facilis dolore ipsa ab sed maiores atque.
            </Typography>
            <Button variant="contained" color="primary">
              See more
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default AboutUs;
