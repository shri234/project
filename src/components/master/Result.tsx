import { Box, Divider, Input, Pagination } from "@mui/material";
import { FC, useState, useEffect, Dispatch, SetStateAction } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import MasterNavbar from "./Navbar";
import { isAuthenticated } from "../isAuthenticated/IsAuthenticated";
import { TicketResult } from "./PlayHistory";
import Loader from "../loader/Loader";
import Filteration from "../admin/Filteration";

const table_head = ["S.No", "Username", "Ticket"];

const MasterResult: FC<{ title: string }> = ({ title }) => {
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
  const [current_page, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [history_data, setHistoryData] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_IP}/ticket/getAllHistory?&pageno=${current_page}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setHistoryData(response.data.data);

      let count = 0;
      if (response.data.data.count < 10) {
        count = Math.ceil(response.data.data.count / 10) + 1;
      } else {
        count = Math.ceil(response.data.count / 10);
      }
      setPageCount(count);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [current_page]);

  const handleTicketRate = async () => {
    const body = { ticketRate: ticketrate };
    console.log(body);
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
    console.log(body);
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
    let date = new Date();
    const formatteddate = `${new Date().getFullYear()}-${
      new Date().getMonth() + 1
    }-${new Date().getDate()}`;
    console.log(body);

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

  return (
    isAuthenticated("master") && (
      <Box>
        <MasterNavbar path="/spin-wheel" />
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
                {/* {sessionStorage.getItem("role") === "master" && ( */}
                <Box
                  sx={{
                    background: "#191a5e",
                    color: "#fff",
                    fontWeight: "600",
                    p: 1,
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  component={"div"}
                  onClick={() =>
                    setStatus((prev) => (prev === "history" ? "" : "history"))
                  }
                >
                  HISTORY
                </Box>
                {/* )} */}
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
                    <Box
                      sx={{
                        marginRight: "2px",
                        p: 2,
                        fontWeight: "bold",
                        borderRadius: "5px",
                        boxShadow: `rgba(0, 0, 0, 0.35) 0px 0px 5px;`,
                      }}
                    >
                      {firstdigit}
                    </Box>
                  </Box>
                  {openDigit === "digit_1" && (
                    <Filteration setFiltered={setFirstDigit} />
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
                      }}
                    >
                      Number 2:
                    </Box>
                    <Box
                      sx={{
                        marginRight: "2px",
                        p: 2,
                        fontWeight: "bold",
                        borderRadius: "5px",
                        boxShadow: `rgba(0, 0, 0, 0.35) 0px 0px 5px;`,
                      }}
                    >
                      {seconddigit}
                    </Box>
                  </Box>
                  {openDigit === "digit_2" && (
                    <Filteration setFiltered={setSecondDigit} />
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
                      }}
                    >
                      Number 3:
                    </Box>
                    <Box
                      sx={{
                        marginRight: "2px",
                        p: 2,
                        fontWeight: "bold",
                        borderRadius: "5px",
                        boxShadow: `rgba(0, 0, 0, 0.35) 0px 0px 5px;`,
                      }}
                    >
                      {thirddigit}
                    </Box>
                  </Box>
                  {openDigit === "digit_3" && (
                    <Filteration setFiltered={setThirdDigit} />
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
                      }}
                    >
                      Number 4:
                    </Box>
                    <Box
                      sx={{
                        marginRight: "2px",
                        p: 2,
                        fontWeight: "bold",
                        borderRadius: "5px",
                        boxShadow: `rgba(0, 0, 0, 0.35) 0px 0px 5px;`,
                      }}
                    >
                      {fourthdigit}
                    </Box>
                  </Box>
                  {openDigit === "digit_4" && (
                    <Filteration setFiltered={setFourthDigit} />
                  )}
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "start",
                      gap: "2px",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        p: 1,
                        borderRadius: "5px",
                        background: "#d67349",
                        color: "#fff",
                        fontWeight: "600",
                      }}
                    >
                      Result:
                    </Box>
                    <Box>
                      <Input
                        value={firstdigit}
                        onChange={(e) => setFirstDigit(e.target.value)}
                        sx={{
                          width: "40px",

                          borderRadius: "5px",
                          border: "none",
                          boxShadow: `rgba(0, 0, 0, 0.35) 0px 0px 5px;`,
                        }}
                      />
                    </Box>
                    <Box>
                      <Input
                        value={seconddigit}
                        onChange={(e) => setSecondDigit(e.target.value)}
                        sx={{
                          width: "40px",

                          borderRadius: "5px",
                          border: "none",
                          boxShadow: `rgba(0, 0, 0, 0.35) 0px 0px 5px;`,
                        }}
                      />
                    </Box>
                    <Box>
                      <Input
                        value={thirddigit}
                        onChange={(e) => setThirdDigit(e.target.value)}
                        sx={{
                          width: "40px",

                          borderRadius: "5px",
                          border: "none",
                          boxShadow: `rgba(0, 0, 0, 0.35) 0px 0px 5px;`,
                        }}
                      />
                    </Box>

                    <Box component={"div"} sx={{ borderRadius: "0px" }}>
                      <Input
                        value={fourthdigit}
                        onChange={(e) => setFourthDigit(e.target.value)}
                        sx={{
                          width: "40px",

                          borderRadius: "5px",
                          border: "none",
                          boxShadow: `rgba(0, 0, 0, 0.35) 0px 0px 5px;`,
                        }}
                      />
                    </Box>
                  </Box>
                  <Box
                    onClick={() => {
                      if (
                        firstdigit &&
                        seconddigit &&
                        thirddigit &&
                        fourthdigit
                      ) {
                        setLoader((pre) => !pre);
                        handlePublishResult();
                      } else {
                        alert("Fill all digits");
                      }
                    }}
                    sx={{
                      p: 1,
                      borderRadius: "5px",
                      background: "#7a1160",
                      color: "#fff",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                  >
                    PUBLISH
                  </Box>
                </Box>
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
                    onClick={handleTicketRate}
                    sx={{
                      p: 1.25,
                      background: "#0bb329",
                      cursor: "pointer",
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
                          onChange={(e) => {
                            setPriceFirstDigit(e.target.value);
                          }}
                          style={{ minWidth: "20px", maxWidth: "50px" }}
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
                          onChange={(e) => {
                            setPriceSecondtDigit(e.target.value);
                          }}
                          style={{ minWidth: "20px", maxWidth: "50px" }}
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
                          onChange={(e) => {
                            setPriceThirdDigit(e.target.value);
                          }}
                          style={{ minWidth: "20px", maxWidth: "50px" }}
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
                          onChange={(e) => {
                            setPriceFourthDigit(e.target.value);
                          }}
                          style={{ minWidth: "20px", maxWidth: "50px" }}
                        />
                      </Box>
                    </Box>
                    <Box
                      onClick={handlePriceRate}
                      sx={{
                        display: { xs: "none", sm: "block" },
                        p: 1.25,
                        background: "#0bb329",
                        borderRadius: "5px",
                        cursor: "pointer",
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

            {result_or_ticket === "history" && (
              <>
                {" "}
                <Box
                  sx={{
                    color: "#210759",
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                    my: 2,
                    ml: 2,
                  }}
                >
                  History
                </Box>
                <Box
                  component={"div"}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <TableContainer
                    component={Paper}
                    sx={{ width: "fit-content" }}
                  >
                    <Table
                      sx={{ maxWidth: 450 }}
                      size="small"
                      aria-label="a dense table"
                    >
                      <TableHead sx={{ background: "#b51271" }}>
                        <TableRow>
                          {table_head.map((cell) => (
                            <TableCell
                              sx={{ color: "#fff", fontWeight: "bold" }}
                              align="center"
                            >
                              {cell}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {history_data.length === 0 ? (
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              align="center"
                              colSpan={table_head.length}
                            >
                              No data found...
                            </TableCell>
                          </TableRow>
                        ) : (
                          history_data.map((row, index) => (
                            <TableRow
                              key={index}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell
                                component="th"
                                scope="row"
                                align="center"
                              >
                                {index + 1}
                              </TableCell>
                              <TableCell align="center">
                                {row.username}
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{ display: "flex" }}
                              >
                                {row.ticket.map((value: any) => (
                                  <TicketResult value={value} key={value.id} />
                                ))}
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
                {history_data.length !== 0 && (
                  <Box
                    component={"div"}
                    sx={{
                      display: "flex",
                      justifyContent: { xs: "start", sm: "end" },
                      mt: 1,
                    }}
                  >
                    <Pagination
                      count={pageCount}
                      defaultPage={6}
                      siblingCount={0}
                      boundaryCount={1}
                      onChange={(e, page) => {
                        setCurrentPage(page - 1);
                      }}
                    />
                  </Box>
                )}
              </>
            )}
          </Box>
        </Box>
      </Box>
    )
  );
};
export default MasterResult;
