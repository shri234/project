import Box from "@mui/material/Box";
import NavBar from "../navbar/NavBar";
import AboutUs from "../about-us/AboutUs";
import Carousel from "../carousel/Carousel";
import ContactUS from "../contact-us/ContactUS";
import RulesAndRegulation from "../rules/RulesAndRegulation";
import CopyRight from "../copyright/CopyRight";

const segments = [
  { number: 1, color: "red" },
  { number: 2, color: "orange" },
  { number: 3, color: "yellow" },
  { number: 4, color: "lime" },
  { number: 5, color: "green" },
  { number: 6, color: "cyan" },
  { number: 7, color: "blue" },
  { number: 8, color: "purple" },
  { number: 9, color: "violet" },
  { number: 10, color: "magenta" },
];

const winnersData = [
  {
    name: "MARIA FERGUSON",
    imageUrl:
      "https://res.cloudinary.com/diqqf3eq2/image/upload/v1595959131/person-2_ipcjws.jpg",
    amountWon: "1,00,000",
  },
  {
    name: "JOHN DOE",
    imageUrl:
      "https://res.cloudinary.com/diqqf3eq2/image/upload/v1595959121/person-1_aufeoq.jpg",
    amountWon: "2,00,000",
  },
  {
    name: "PETER SMITH",
    imageUrl:
      "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883417/person-3_ipa0mj.jpg",
    amountWon: "5,00,000",
  },
  {
    name: "SUSAN ANDERSEN",
    imageUrl:
      "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883334/person-1_rfzshl.jpg",
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
                    fontSize: "1.5rem",
                    mt: "4px",
                  }}
                >
                  "37 lakh or 10k per daily upto 1 year"
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
