import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import BackOfficeNavbar from "./NavBar";
import { useState, useEffect } from "react";
import { Pagination } from "@mui/material";
import axios from "axios";
import { isAuthenticated } from "../isAuthenticated/IsAuthenticated";
import { CustomTableHead } from "../custom-table/CustomTableHead";
import { CustomPagination } from "../custom-table/CustomPagination";
import { NoDataFoundTable } from "../custom-table/NoDataFound";
import { TableLoader } from "../custom-table/TableLoader";
import Loader from "../loader/Loader";
import { TicketResult } from "../master/PlayHistory";

const table_head = ["S.No", "Date", "Ticket"];

function getUserName() {
  return sessionStorage.getItem("userName");
}

const BackOfficePlayHistory = () => {
  const username = getUserName();
  const [play_history_data, setPlayHistoryData] = useState<any[]>([]);
  const [current_page, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [open_loader, setOpenLoader] = useState(false);
  const [table_loader, setOpenTableLoader] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_IP}/ticket/getHistory?username=${username}&pageno=${current_page}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setPlayHistoryData(response.data.data);

      let count = 0;
      if (response.data.data.count < 10) {
        count = Math.ceil(response.data.data.count / 10) + 1;
      } else {
        count = Math.ceil(response.data.count / 10);
      }
      setPageCount(count);
      setOpenLoader(false);
      setOpenTableLoader(false);
    } catch (err) {
      console.log(err);
      setOpenLoader(false);
      setOpenTableLoader(false);
    }
  };

  useEffect(() => {
    setOpenLoader(true);
    fetchData();
  }, []);

  useEffect(() => {
    setOpenTableLoader(true);
    fetchData();
  }, [current_page]);

  return (
    isAuthenticated("back-office") && (
      <Box>
        <BackOfficeNavbar path="/back-office-user-details" />
        {open_loader && <Loader />}
        <Box
          component={"div"}
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              p: 2,
              m: 2,
              borderRadius: "5px",
            }}
          >
            <Box
              sx={{
                color: "#210759",
                fontWeight: "bold",
                fontSize: "1.5rem",
                my: 2,
                textAlign: "start",
              }}
            >
              Play History
            </Box>
            <TableContainer component={Paper}>
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
                    play_history_data.length === 0 ? (
                    <NoDataFoundTable
                      description="No data found..."
                      colSpan={table_head.length}
                    />
                  ) : (
                    play_history_data.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row" align="center">
                          {index + 1}
                        </TableCell>
                        <TableCell align="center">{row.CreatedAt}</TableCell>
                        <TableCell align="center" sx={{ display: "flex" }}>
                          {row.ticket.map((value: any) => {
                            return (
                              <TicketResult value={value} key={value.id} />
                            );
                          })}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {play_history_data.length !== 0 && (
              <CustomPagination
                pageCount={pageCount}
                setCurrentPage={setCurrentPage}
              />
            )}
          </Box>
        </Box>
      </Box>
    )
  );
};
export default BackOfficePlayHistory;
