import { Box, Divider, Input } from "@mui/material";
import { FC, useState, useEffect } from "react";
import axios from "axios";
import BackOfficeNavbar from "./NavBar";
import { isAuthenticated } from "../isAuthenticated/IsAuthenticated";
import Filteration from "./Filteration";
import Loader from "../loader/Loader";
import { is5pmto6pm } from "../../utill";
import { Ticket, TicketPublish } from "../Result/TicketPublish";
import { TicketFilter } from "../Result/TicketFilter";

const Result: FC<{ title: string }> = ({ title }) => {
  const [ticket, setTicket] = useState<Ticket>({
    firstdigit: "",
    seconddigit: "",
    thirddigit: "",
    fourthdigit: "",
  });
  const [openDigit, setOpenDigit] = useState("");
  const [result_or_ticket, setStatus] = useState("");
  const [ticketrate, setTicketRate] = useState<string>("");
  const [firstdigit, setFirstDigit] = useState("");
  const [seconddigit, setSecondDigit] = useState("");
  const [thirddigit, setThirdDigit] = useState("");
  const [fourthdigit, setFourthDigit] = useState("");
  const [priceFirstDigit, setPriceFirstDigit] = useState("");
  const [priceSecondDigit, setPriceSecondtDigit] = useState("");
  const [priceThirdDigit, setPriceThirdDigit] = useState("");
  const [priceFourthDigit, setPriceFourthDigit] = useState("");
  const [loader, setLoader] = useState(false);

  const handleTicketRate = async () => {
    const body = { ticketRate: ticketrate };

    await axios
      .post(`${process.env.REACT_APP_IP}/ticket/addTicketRate`, body)
      .then((res) => {
        if (res.status === 200) {
          window.alert("Success! Ticket rate added");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePriceRate = async () => {
    const body = {
      splitup:
        priceFirstDigit + priceSecondDigit + priceThirdDigit + priceFourthDigit,
    };
    await axios
      .put(`${process.env.REACT_APP_IP}/ticket/updatePriceRate`, body)
      .then((res) => {
        if (res.status === 200) {
          window.alert("Success! Price rate splitup added");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePublishResult = async () => {
    setLoader(true);
    const body = [
      { digit: firstdigit },
      { digit: seconddigit },
      { digit: thirddigit },
      { digit: fourthdigit },
    ];

    const formatteddate = `${new Date().getFullYear()}-${
      new Date().getMonth() + 1
    }-${new Date().getDate()}`;

    await axios
      .post(
        `${process.env.REACT_APP_IP}/ticket/publishResult?date=${formatteddate}`,
        body
      )
      .then((res) => {
        setLoader(false);
        if (res.status === 200) {
          window.alert(
            `Result Published successfully! There are ${res.data.Winners} winners.`
          );
        }
        window.location.href = "/daily-result";
      })
      .catch((error) => {
        setLoader(false);
        console.log(error);
      });
  };

  const fetchData = async () => {
    try {
      const formatteddate = `${new Date().getFullYear()}-${
        new Date().getMonth() + 1
      }-${new Date().getDate()}`;
      const response = await axios.get(
        `${process.env.REACT_APP_IP}/ticket/getTicketRate?date=${formatteddate}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setTicketRate(response.data.data.ticketRate);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData1 = async () => {
    try {
      const formatteddate = `${new Date().getFullYear()}-${
        new Date().getMonth() + 1
      }-${new Date().getDate()}`;
      const response = await axios.get(
        `${process.env.REACT_APP_IP}/ticket/getPriceRate?date=${formatteddate}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data.data.priceRate_splitup[0]);
      setPriceFirstDigit(response.data.data.priceRate_splitup[0]);
      setPriceSecondtDigit(response.data.data.priceRate_splitup[1]);
      setPriceThirdDigit(response.data.data.priceRate_splitup[2]);
      setPriceFourthDigit(response.data.data.priceRate_splitup[3]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData1();
  }, []);

  console.log(ticket, "TIcket");
  return (
    isAuthenticated("admin") && (
      <Box>
        <BackOfficeNavbar path="/admin" />
        {loader && <Loader />}
        <Box
          component={"div"}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Box
            component={"div"}
            sx={{
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              borderRadius: "5px",
              py: 2,
              mt: 2,
              minWidth: "300px",
            }}
          >
            <Box>
              <h2>{title} Spin</h2>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  m: 2,
                }}
              >
                <Box
                  sx={{
                    background: "green",
                    color: "#fff",
                    fontWeight: "600",
                    p: 1,
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  component={"div"}
                  onClick={() =>
                    setStatus((prev) => (prev === "result" ? "" : "result"))
                  }
                >
                  RESULT
                </Box>

                <Box
                  sx={{
                    background: "#191a5e",
                    color: "#fff",
                    fontWeight: "600",
                    cursor: "pointer",
                    p: 1,
                    borderRadius: "5px",
                  }}
                  component={"div"}
                  onClick={() =>
                    setStatus((prev) => (prev === "ticket" ? "" : "ticket"))
                  }
                >
                  AMOUNT
                </Box>
              </Box>
            </Box>
            {result_or_ticket === "result" && (
              <>
                <Divider sx={{ my: 1 }} />
                <Box>
                  <h2>{title} Spin Result</h2>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "start",
                      gap: "4px",
                      alignItems: "center",
                      ml: 2,
                    }}
                  >
                    <Box
                      sx={{
                        color: "#47397d",
                        fontWeight: "700",
                        cursor: "pointer",
                      }}
                      component={"div"}
                      onClick={() => {
                        setOpenDigit((prev) =>
                          prev === "digit_1" ? "" : "digit_1"
                        );
                        sessionStorage.setItem("digit", "1");
                      }}
                    >
                      Number 1:
                    </Box>
                    <Box>
                      <Input
                        value={firstdigit}
                        onChange={(e) => {
                          setFirstDigit(e.target.value);
                          setTicket((pre) => ({
                            ...pre,
                            firstdigit: e.target.value,
                          }));
                        }}
                        sx={{
                          width: "40px",
                          borderRadius: "5px",
                          border: "none",
                          boxShadow: `rgba(0, 0, 0, 0.35) 0px 0px 5px;`,
                        }}
                      />
                    </Box>
                  </Box>
                  {openDigit === "digit_1" && (
                    <Filteration
                      setFiltered={setFirstDigit}
                      setTicket={setTicket}
                      name="firstdigit"
                    />
                  )}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "start",
                      gap: "4px",
                      alignItems: "center",
                      ml: 2,
                    }}
                  >
                    <Box
                      sx={{
                        color: "#47397d",
                        fontWeight: "700",
                        cursor: "pointer",
                      }}
                      component={"div"}
                      onClick={() => {
                        setOpenDigit((prev) =>
                          prev === "digit_2" ? "" : "digit_2"
                        );
                        sessionStorage.setItem("digit", "2");
                        sessionStorage.setItem("digit1", firstdigit);
                      }}
                    >
                      Number 2:
                    </Box>
                    <Box>
                      <Input
                        value={seconddigit}
                        onChange={(e) => {
                          setSecondDigit(e.target.value);
                          setTicket((pre) => ({
                            ...pre,
                            seconddigit: e.target.value,
                          }));
                        }}
                        sx={{
                          width: "40px",
                          borderRadius: "5px",
                          border: "none",
                          boxShadow: `rgba(0, 0, 0, 0.35) 0px 0px 5px;`,
                        }}
                      />
                    </Box>
                  </Box>
                  {openDigit === "digit_2" && (
                    <Filteration
                      setFiltered={setFirstDigit}
                      setTicket={setTicket}
                      name="seconddigit"
                    />
                  )}

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "start",
                      gap: "4px",
                      alignItems: "center",
                      ml: 2,
                    }}
                  >
                    <Box
                      sx={{
                        color: "#47397d",
                        fontWeight: "700",
                        cursor: "pointer",
                      }}
                      component={"div"}
                      onClick={() => {
                        setOpenDigit((prev) =>
                          prev === "digit_3" ? "" : "digit_3"
                        );
                        sessionStorage.setItem("digit", "3");
                        sessionStorage.setItem("digit2", seconddigit);
                      }}
                    >
                      Number 3:
                    </Box>
                    <Box>
                      <Input
                        value={thirddigit}
                        onChange={(e) => {
                          setThirdDigit(e.target.value);
                          setTicket((pre) => ({
                            ...pre,
                            thirddigit: e.target.value,
                          }));
                        }}
                        sx={{
                          width: "40px",
                          borderRadius: "5px",
                          border: "none",
                          boxShadow: `rgba(0, 0, 0, 0.35) 0px 0px 5px;`,
                        }}
                      />
                    </Box>
                  </Box>
                  {openDigit === "digit_3" && (
                    <Filteration
                      setFiltered={setFirstDigit}
                      setTicket={setTicket}
                      name="thirddigit"
                    />
                  )}

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "start",
                      gap: "4px",
                      alignItems: "center",
                      ml: 2,
                    }}
                  >
                    <Box
                      sx={{
                        color: "#47397d",
                        fontWeight: "700",
                        cursor: "pointer",
                      }}
                      component={"div"}
                      onClick={() => {
                        setOpenDigit((prev) =>
                          prev === "digit_4" ? "" : "digit_4"
                        );
                        sessionStorage.setItem("digit", "4");
                        sessionStorage.setItem("digit3", thirddigit);
                      }}
                    >
                      Number 4:
                    </Box>
                    <Box>
                      <Input
                        value={fourthdigit}
                        onChange={(e) => {
                          setFourthDigit(e.target.value);
                          setTicket((pre) => ({
                            ...pre,
                            fourthdigit: e.target.value,
                          }));
                        }}
                        sx={{
                          width: "40px",
                          borderRadius: "5px",
                          border: "none",
                          boxShadow: `rgba(0, 0, 0, 0.35) 0px 0px 5px;`,
                        }}
                      />
                    </Box>
                  </Box>
                  {openDigit === "digit_4" && (
                    <Filteration
                      setFiltered={setFirstDigit}
                      setTicket={setTicket}
                      name="fourthdigit"
                    />
                  )}
                </Box>
                {/* <TicketFilter ticket={ticket} setTicket={setTicket} /> */}
                <Divider sx={{ my: 1 }} />
                <TicketPublish ticket={ticket} setTicket={setTicket} />
              </>
            )}

            {result_or_ticket === "ticket" && (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    m: 2,

                    gap: { xs: 10, sm: 20 },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "start",
                      alignItems: "center",
                      gap: "5px",
                      // ml: 1,
                    }}
                  >
                    <Box
                      sx={{
                        fontWeight: "bold",
                        fontSize: "1.25rem",
                        color: "#ab0a4a",
                        // whiteSpace: "nowrap",
                      }}
                    >
                      Ticket Rate:
                    </Box>
                    <Box>
                      <input
                        type="number"
                        value={ticketrate}
                        onChange={(e) => setTicketRate(e.target.value)}
                        style={{ minWidth: "40px", maxWidth: "100px" }}
                      />
                    </Box>
                  </Box>
                  <Box
                    onClick={() => {
                      is5pmto6pm() && handleTicketRate();
                    }}
                    sx={{
                      p: 1.25,
                      background: is5pmto6pm() ? "#0bb329" : "grey",
                      cursor: is5pmto6pm() ? "pointer" : "no-drop",
                      borderRadius: "5px",
                      color: "#fff",
                      fontWeight: 600,
                    }}
                  >
                    Publish
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    m: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: { xs: "start", sm: "center" },
                      gap: "10px",
                      flexDirection: { xs: "column", sm: "row" },
                    }}
                  >
                    <Box
                      sx={{
                        fontWeight: "bold",
                        fontSize: "1.25rem",
                        color: "#ab0a4a",
                      }}
                    >
                      Price Rate:
                    </Box>
                    <Box component={"div"} sx={{ display: "flex", gap: "2px" }}>
                      <Box
                        component={"div"}
                        sx={{
                          borderRadius: "5px",
                          boxShadow: `rgba(0, 0, 0, 0.35) 0px 5px 15px;`,
                          p: 1,
                        }}
                      >
                        <Box
                          component={"div"}
                          sx={{
                            color: "#08285c",
                            fontWeight: "700",
                            my: "2px",
                            whiteSpace: "nowrap",
                            fontSize: "14px",
                          }}
                        >
                          Level 1:
                        </Box>
                        {/* <Divider sx={{ my: "2px", background: "#545b66" }} /> */}
                        <input
                          type="text"
                          value={priceFirstDigit}
                          onChange={(e) => {
                            setPriceFirstDigit(e.target.value);
                          }}
                          style={{ minWidth: "20px", maxWidth: "60px" }}
                        />
                      </Box>
                      <Box
                        component={"div"}
                        sx={{
                          borderRadius: "5px",
                          boxShadow: `rgba(0, 0, 0, 0.35) 0px 5px 15px;`,
                          p: 1,
                        }}
                      >
                        <Box
                          component={"div"}
                          sx={{
                            color: "#08285c",
                            fontWeight: "700",
                            my: "2px",
                            whiteSpace: "nowrap",
                            fontSize: "14px",
                          }}
                        >
                          Level 2:
                        </Box>
                        <input
                          type="text"
                          value={priceSecondDigit}
                          onChange={(e) => {
                            setPriceSecondtDigit(e.target.value);
                          }}
                          style={{ minWidth: "20px", maxWidth: "60px" }}
                        />
                      </Box>
                      <Box
                        component={"div"}
                        sx={{
                          borderRadius: "5px",
                          boxShadow: `rgba(0, 0, 0, 0.35) 0px 5px 15px;`,
                          p: 1,
                        }}
                      >
                        <Box
                          component={"div"}
                          sx={{
                            color: "#08285c",
                            fontWeight: "700",
                            my: "2px",
                            whiteSpace: "nowrap",
                            fontSize: "14px",
                          }}
                        >
                          Level 3:
                        </Box>
                        <input
                          type="text"
                          value={priceThirdDigit}
                          onChange={(e) => {
                            setPriceThirdDigit(e.target.value);
                          }}
                          style={{ minWidth: "20px", maxWidth: "60px" }}
                        />
                      </Box>
                      <Box
                        component={"div"}
                        sx={{
                          borderRadius: "5px",
                          boxShadow: `rgba(0, 0, 0, 0.35) 0px 5px 15px;`,
                          p: 1,
                        }}
                      >
                        <Box
                          component={"div"}
                          sx={{
                            color: "#08285c",
                            fontWeight: "700",
                            my: "2px",
                            whiteSpace: "nowrap",
                            fontSize: "14px",
                          }}
                        >
                          Level 4:
                        </Box>
                        <input
                          type="text"
                          value={priceFourthDigit}
                          onChange={(e) => {
                            setPriceFourthDigit(e.target.value);
                          }}
                          style={{ minWidth: "20px", maxWidth: "60px" }}
                        />
                      </Box>
                    </Box>
                    <Box
                      onClick={() => {
                        is5pmto6pm() && handlePriceRate();
                      }}
                      sx={{
                        display: { xs: "none", sm: "block" },
                        p: 1.25,
                        background: is5pmto6pm() ? "#0bb329" : "grey",
                        borderRadius: "5px",
                        cursor: is5pmto6pm() ? "pointer" : "no-drop",
                        color: "#fff",
                        fontWeight: 600,
                      }}
                    >
                      Publish
                    </Box>
                  </Box>
                </Box>
                <Box
                  component={"div"}
                  sx={{
                    display: { xs: "flex", sm: "none" },
                    justifyContent: "end",
                    mr: 2,
                  }}
                >
                  <Box
                    sx={{
                      p: 1.25,
                      background: "#0bb329",
                      borderRadius: "5px",
                      color: "#fff",
                      fontWeight: 600,
                    }}
                  >
                    Publish
                  </Box>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Box>
    )
  );
};
export default Result;
