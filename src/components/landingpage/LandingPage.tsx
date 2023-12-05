import Box from "@mui/material/Box";
import NavBar from "../navbar/NavBar";
import AboutUs from "../about-us/AboutUs";
import Carousel from "../carousel/Carousel";
import ContactUS from "../contact-us/ContactUS";
import RulesAndRegulation from "../rules/RulesAndRegulation";
import CopyRight from "../copyright/CopyRight";

const winnersData = [
  {
    name: "Sumathi",
    imageUrl: "/winner_1.jpeg",
    amountWon: "1,00,000",
  },
  {
    name: "Priya",
    imageUrl: "/winner_2.jpeg",
    amountWon: "2,00,000",
  },
  {
    name: "Vivek",
    imageUrl: "/winner_3.jpeg",
    amountWon: "5,00,000",
  },
  {
    name: "Sid",
    imageUrl: "/winner_4.jpeg",
    amountWon: "4,00,000",
  },
  {
    name: "Soniya",
    imageUrl: "/winner_5.jpeg",
    amountWon: "4,00,000",
  },
  {
    name: "John",
    imageUrl: "/winner_6.jpeg",
    amountWon: "4,00,000",
  },
];

const LandingPage = () => {
  return (
    <Box
      sx={{
        height: { xs: "100%" },
        backgroundImage: `url('/monthly.jpeg')`,
        width: "100%",
        backgroundSize: "auto",
      }}
    >
      <NavBar />

      <Box
        component={"div"}
        sx={{
          height: "100%",
          width: "100%",
        }}
      >
        <Box
          id="home"
          component={"div"}
          sx={{
            height: { xs: "100%", sm: "100vh" },
            mt: { xs: 3, sm: 0 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              mt: "-30px",
              flexDirection: { xs: "column", sm: "row" },
              width: "100%",
              justifyContent: { xs: "center", sm: "space-between" },
              alignItems: "center",
              height: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", sm: "space-around" },
                flexDirection: { xs: "column", sm: "row" },
                width: "100%",
                alignItems: "center",
                mt: 2,
                gap: { xs: 2, sm: 8 },
              }}
            >
              <Box
                component={"div"}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Box
                  sx={{
                    background: "#093375",
                    backgroundImage: `url('/spinner_background.svg')`,
                    p: 4,
                    width: { xs: "80px", sm: "160px" },
                    height: { xs: "80px", sm: "160px" },
                    borderRadius: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      background: "#0B437C",
                      p: 4,
                      width: "10px",
                      height: "10px",
                      borderRadius: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    component={"div"}
                    onClick={() => {
                      window.location.href = "/login-page";
                    }}
                  >
                    <Box
                      component={"div"}
                      sx={{
                        color: "#fff",
                        fontWeight: "700",
                        p: 1,
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Daily
                    </Box>
                  </Box>
                </Box>
                <Box
                  component={"div"}
                  sx={{
                    color: "#f0f0f0",
                    fontWeight: "700",
                    fontSize: "1.5rem",
                    mt: "4px",
                  }}
                >
                  "Win Upto 2 lakh"
                </Box>
              </Box>
              <Box
                component={"div"}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Box
                  sx={{
                    background: "#093375",
                    backgroundImage: `url('/spinner_background.svg')`,
                    p: 4,
                    width: { xs: "80px", sm: "160px" },
                    height: { xs: "80px", sm: "160px" },
                    borderRadius: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      background: "#0B437C",
                      p: 4,
                      width: "10px",
                      height: "10px",
                      borderRadius: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    component={"div"}
                    onClick={() => {
                      window.location.href = "/login-page";
                    }}
                  >
                    <Box
                      component={"div"}
                      sx={{
                        color: "#fff",
                        fontWeight: "700",
                        p: 1,
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Weekly
                    </Box>
                  </Box>
                </Box>
                <Box
                  component={"div"}
                  sx={{
                    color: "#f0f0f0",
                    fontWeight: "700",
                    fontSize: "1.5rem",
                    mt: "4px",
                  }}
                >
                  "Win Upto 6 lakh"
                </Box>
              </Box>
              <Box
                component={"div"}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Box
                  sx={{
                    background: "#093375",
                    backgroundImage: `url('/spinner_background.svg')`,
                    p: 4,
                    width: { xs: "80px", sm: "160px" },
                    height: { xs: "80px", sm: "160px" },
                    borderRadius: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      background: "#0B437C",
                      p: 4,
                      width: "10px",
                      height: "10px",
                      borderRadius: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    component={"div"}
                    onClick={() => {
                      window.location.href = "/login-page";
                    }}
                  >
                    <Box
                      component={"div"}
                      sx={{
                        color: "#fff",
                        fontWeight: "700",
                        p: 1,
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Monthly
                    </Box>
                  </Box>
                </Box>
                <Box
                  component={"div"}
                  sx={{
                    color: "#f0f0f0",
                    fontWeight: "700",
                    fontSize: "1.4rem",
                    textAlign: "center",
                    mt: "4px",
                  }}
                >
                  <Box
                    component={"div"}
                    sx={{ display: { xs: "none", sm: "block" } }}
                  >
                    "37 lakh or 10k <br />
                    per day upto 1 year"
                  </Box>
                  <Box
                    component={"div"}
                    sx={{ display: { xs: "block", sm: "none" } }}
                  >
                    "37 lakh or 10k per day upto 1 year"
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box id="about" component={"div"} sx={{ height: "120vh" }}>
          <AboutUs />
        </Box>

        <Box
          id="winners"
          component={"div"}
          sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Carousel winners={winnersData} />
        </Box>
        <Box
          id="contact-us"
          component={"div"}
          sx={{ height: "100vh", display: "flex", justifyContent: "center" }}
        >
          <ContactUS />
        </Box>
        <Box
          id="rules"
          component={"div"}
          sx={{ height: "100%", display: "flex", justifyContent: "center" }}
        >
          <RulesAndRegulation />
        </Box>

        <Box
          id="rules"
          component={"div"}
          sx={{
            height: "100%",
            width: "100%",
            background: "#160c3d",
          }}
        >
          <CopyRight />
        </Box>
      </Box>
    </Box>
  );
};
export default LandingPage;
