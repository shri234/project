import { Box, Pagination } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AgentNavbar from "./Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { formattedDate } from "../../utill";
import { isAuthenticated } from "../isAuthenticated/IsAuthenticated";
const table_head = ["S.No", "Username", "Created At", "Play History"];
// "Total Amount Win"

function getAgentId() {
  let agentId = sessionStorage.getItem("agentId");
  return agentId;
}

const AgentHome = () => {
  const agentid = getAgentId();
  const [getuserdata, setAgentUserData] = useState<any[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [current_page, setCurrentPage] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_IP}/user/getAllUsers?referralId=${agentid}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setAgentUserData(response.data.data);
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

  return (
    isAuthenticated("agent") && (
      <Box>
        <AgentNavbar path="/" />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box component={"div"} sx={{ minWidth: "300px" }}>
            <Box
              sx={{
                color: "#210759",
                fontWeight: "bold",
                fontSize: "1.5rem",
                my: 2,
              }}
            >
              Agent Table
            </Box>
            <Box
              component={"div"}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <TableContainer
                component={Paper}
                sx={{
                  width: "fit-content",
                }}
              >
                <Table
                  sx={{ maxWidth: 450 }}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead sx={{ background: "#b51271" }}>
                    <TableRow>
                      {table_head.map((cell, index) => (
                        <TableCell
                          sx={{ color: "#fff", fontWeight: "bold" }}
                          align="center"
                          key={index}
                        >
                          {cell}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {getuserdata.length === 0 ? (
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
                          No Data found...
                        </TableCell>
                      </TableRow>
                    ) : (
                      getuserdata.map((row, index) => (
                        <TableRow
                          key={row.s_no}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row" align="center">
                            {index + 1}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ cursor: "pointer" }}
                            onClick={() =>
                              (window.location.href = "/user-profile")
                            }
                          >
                            {row.username}
                          </TableCell>
                          <TableCell align="center">
                            {formattedDate(row.CreatedAt)}
                          </TableCell>
                          {/* <TableCell align="center">{row.amount}</TableCell> */}
                          <TableCell align="center">
                    <Box
                      sx={{
                        background: "#410961",
                        p: 0.5,
                        borderRadius: "5px",
                        color: "#fff",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                      component={"div"}
                      onClick={() =>
                        (window.location.href = "/agent-play-history")
                      }
                    >
                      Play History
                    </Box>
                  </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            {getuserdata.length !== 0 && (
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
                  defaultPage={0}
                  siblingCount={0}
                  boundaryCount={1}
                  onChange={(e, page) => {
                    setCurrentPage(page - 1);
                  }}
                />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    )
  );
};
export default AgentHome;
