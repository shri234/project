import { Box } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AgentNavbar from "./Navbar";
import { useState, useEffect } from "react";
import { formattedDate } from "../../utill";
import { isAuthenticated } from "../isAuthenticated/IsAuthenticated";
import { CustomPagination } from "../custom-table/CustomPagination";
import { CustomTableHead } from "../custom-table/CustomTableHead";
import { TableLoader } from "../custom-table/TableLoader";
import { NoDataFoundTable } from "../custom-table/NoDataFound";
import Loader from "../loader/Loader";
import { getAllReferredUsersData } from "../../api/getAllReferredUserdata";
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
  const [open_loader, setOpenLoader] = useState(false);
  const [table_loader, setOpenTableLoader] = useState(false);

  useEffect(() => {
    setOpenLoader(true);
    (async () => {
      await getAllReferredUsersData(agentid!, current_page)
        .then((res) => {
          setAgentUserData(res.data.data);
          let count = 0;
          if (res.data.data.count < 10) {
            count = Math.ceil(res.data.data.count / 10) + 1;
          } else {
            count = Math.ceil(res.data.count / 10);
          }
          setPageCount(count);
          setOpenLoader(false);
          setOpenTableLoader(false);
        })
        .catch((error) => {
          console.log(error);
          setOpenLoader(false);
          setOpenTableLoader(false);
        });
    })();
  }, []);

  useEffect(() => {
    setOpenLoader(true);
    (async () => {
      await getAllReferredUsersData(agentid!, current_page)
        .then((res) => {
          setAgentUserData(res.data.data);
          let count = 0;
          if (res.data.data.count < 10) {
            count = Math.ceil(res.data.data.count / 10) + 1;
          } else {
            count = Math.ceil(res.data.count / 10);
          }
          setPageCount(count);
          setOpenLoader(false);
          setOpenTableLoader(false);
        })
        .catch((error) => {
          console.log(error);
          setOpenLoader(false);
          setOpenTableLoader(false);
        });
    })();
  }, [current_page]);

  return (
    isAuthenticated("agent") && (
      <Box>
        <AgentNavbar path="/" />
        {open_loader && <Loader />}
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
                  <CustomTableHead table_head={table_head} />

                  <TableBody>
                    {!open_loader && table_loader ? (
                      <TableLoader colSpan={table_head.length} />
                    ) : !table_loader &&
                      !open_loader &&
                      getuserdata.length === 0 ? (
                      <NoDataFoundTable
                        description="No data found..."
                        colSpan={table_head.length}
                      />
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
                          <TableCell align="center" sx={{ cursor: "pointer" }}>
                            {row.username}
                          </TableCell>
                          <TableCell align="center">
                            {formattedDate(row.CreatedAt)}
                          </TableCell>
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
                              onClick={() => {
                                sessionStorage.setItem(
                                  "userName",
                                  row.username
                                );
                                sessionStorage.setItem("userid", row.userId);

                                window.location.href = "/agent-play-history";
                              }}
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
              <CustomPagination
                setCurrentPage={setCurrentPage}
                pageCount={pageCount}
              />
            )}
          </Box>
        </Box>
      </Box>
    )
  );
};
export default AgentHome;
