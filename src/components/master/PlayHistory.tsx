import Box from "@mui/material/Box";
import MasterNavbar from "./Navbar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import { isAuthenticated } from "../isAuthenticated/IsAuthenticated";
import Loader from "../loader/Loader";
import { CustomTableHead } from "../custom-table/CustomTableHead";
import { TableLoader } from "../custom-table/TableLoader";
import { NoDataFoundTable } from "../custom-table/NoDataFound";
import { CustomPagination } from "../custom-table/CustomPagination";
import { getPlayHistoryData } from "../../api/getPlayHistorydata";
const table_head = ["S.No", "Date", "Ticket"];

function getUserName() {
  return sessionStorage.getItem("userName");
}

const PlayHistory = () => {
  const username = getUserName();
  const [play_history_data, setPlayHistoryData] = useState<any[]>([]);
  const [current_page, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [open_loader, setOpenLoader] = useState(false);
  const [table_loader, setOpenTableLoader] = useState(false);

  useEffect(() => {
    setOpenLoader(true);
    (async () => {
      await getPlayHistoryData(username!, current_page)
        .then((res) => {
          setPlayHistoryData(res.data.data);

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
    setOpenTableLoader(true);
    (async () => {
      await getPlayHistoryData(username!, current_page)
        .then((res) => {})
        .catch((error) => {
          console.log(error);
        });
    })();
  }, [current_page]);

  return (
    isAuthenticated("master") && (
      <Box>
        <MasterNavbar path="/user-details" />
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
                          {row.number}
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
export default PlayHistory;

export const TicketResult = (value: any) => {
  return (
    <Box
      component={"div"}
      sx={{
        height: "20px",
        width: "20px",
        p: 0.5,
        fontWeight: "bold",
        color: "#fff",
        background:"white",
        borderRadius: "50%",
      }}
    >
      {value.value.digit}
    </Box>
  );
};
