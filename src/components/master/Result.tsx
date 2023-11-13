import { Box, Divider, Pagination } from "@mui/material";
import { FC, useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import axios from "axios";
import MasterNavbar from "./Navbar";

const table_head = ["S.No", "Username", "Ticket"];
const table_body = [
  {
    id: 1,
    user_name: "John",
    ticket_number: 1324,
  },
  {
    id: 2,
    user_name: "simens",
    ticket_number: 4321,
  },
  {
    id: 3,
    user_name: "Tim",
    ticket_number: 5431,
  },
  {
    id: 4,
    user_name: "David",
    ticket_number: 6543,
  },
  {
    id: 5,
    user_name: "John",
    ticket_number: 5643,
  },
];

const Filteration: FC = () => {
  const [digits, setDigits] = useState<any[]>([]);
  const [LowestValue, setLowestValue] = useState<number>();
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3002/ticket/getMinimum",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setDigits(response.data.data);
        setLowestValue(response.data.LowestValue);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
      }}
    >
      {digits.map((value) => (
        <Box
          key={value._id}
          sx={{
            display: "flex",
            justifyContent: "start",
            gap: "5px",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              background: "#4d0b63",
              color: "#fff",
              fontWeight: "600",
              borderRadius: "5px",
              textAlign: "center",
              fontSize: "1.15rem",
              p: "2px",
              width: "30px",
            }}
          >
            {value._id}
          </Box>
          <Box>:</Box>
          <Box>{value.count}</Box>
        </Box>
      ))}
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          gap: "10px",
          alignItems: "Center",
        }}
      >
        <Box
          sx={{
            color: "#6b0c37",
            fontWeight: "bold",
            fontSize: "1.25rem",
          }}
        >
          Lowest Number
        </Box>
        <Box
          sx={{
            color: "#fff",
            fontWeight: "bold",
            fontSize: "1.25rem",
            background: "#19617d",
            p: 0.5,
            width: "40px",
            textAlign: "center",
            borderRadius: "5px",
          }}
        >
          {LowestValue}
        </Box>
      </Box>
    </Box>
  );
};

const MasterResult: FC<{ title: string }> = ({ title }) => {
  const [openDigit, setOpenDigit] = useState("");
  const [result_or_ticket, setStatus] = useState("");
  const [current_page, setCurrentPage] = useState(0);
  const pageCount = 10;
  return (
    <Box>
      <MasterNavbar path="/spin-wheel" />
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
                    }}
                  >
                    Number 1:
                  </Box>
                  <Box>
                    <input
                      type="text"
                      style={{ width: "40px", marginRight: "2px" }}
                    />
                  </Box>
                </Box>
                {openDigit === "digit_1" && <Filteration />}
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
                    }}
                  >
                    Number 2:
                  </Box>
                  <Box>
                    <input
                      type="text"
                      style={{ width: "40px", marginRight: "2px" }}
                    />
                  </Box>
                </Box>
                {openDigit === "digit_2" && <Filteration />}

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
                    }}
                  >
                    Number 3:
                  </Box>
                  <Box>
                    <input
                      type="text"
                      style={{ width: "40px", marginRight: "2px" }}
                    />
                  </Box>
                </Box>
                {openDigit === "digit_3" && <Filteration />}

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
                    }}
                  >
                    Number 4:
                  </Box>
                  <Box>
                    <input
                      type="text"
                      style={{ width: "40px", marginRight: "2px" }}
                    />
                  </Box>
                </Box>
                {openDigit === "digit_4" && <Filteration />}
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
                    <input
                      type="text"
                      style={{ width: "30px", marginRight: "2px" }}
                    />
                  </Box>
                  <Box>
                    <input
                      type="text"
                      style={{ width: "30px", marginRight: "2px" }}
                    />
                  </Box>
                  <Box>
                    <input
                      type="text"
                      style={{ width: "30px", marginRight: "2px" }}
                    />
                  </Box>
                  <Box>
                    <input
                      type="text"
                      style={{ width: "30px", marginRight: "2px" }}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    p: 1,
                    borderRadius: "5px",
                    background: "#7a1160",
                    color: "#fff",
                    fontWeight: "600",
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
                      type="text"
                      style={{ minWidth: "40px", maxWidth: "100px" }}
                    />
                  </Box>
                </Box>
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
                        style={{ minWidth: "20px", maxWidth: "50px" }}
                      />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: { xs: "none", sm: "block" },
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
                <TableContainer component={Paper} sx={{ width: "fit-content" }}>
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
                      {table_body.map((row) => (
                        <TableRow
                          key={row.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row" align="center">
                            {row.id}
                          </TableCell>
                          <TableCell align="center">{row.user_name}</TableCell>
                          <TableCell align="center">
                            {row.ticket_number}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
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
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};
export default MasterResult;
