import Box from "@mui/material/Box";
import MasterNavbar from "./Navbar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import { isAuthenticated } from "../isAuthenticated/IsAuthenticated";

const table_head = [
  { id: 1, title: "S.No" },
  { id: 2, title: "Date" },
  { id: 3, title: "Ticket" },
];

function getUserName() {
  return sessionStorage.getItem("userName");
}

const PlayHistory = () => {
  const username = getUserName();
  const [play_history_data, setPlayHistoryData] = useState<any[]>([]);
  const [current_page, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

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
      // let ticketarr = [];
      // for (let i = 0; i < response.data.data.length; i++) {
      //   let ticket_data = {
      //     id: i + 1,
      //     ticket:
      //       String(response.data.data[i].ticket[0].digit) +
      //       String(response.data.data[i].ticket[1].digit) +
      //       String(response.data.data[i].ticket[2].digit) +
      //       String(response.data.data[i].ticket[3].digit),
      //     CreatedAt: response.data.data[i].CreatedAt,
      //   };
      //   ticketarr.push(ticket_data);
      // }

      setPlayHistoryData(response.data.data);

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
    isAuthenticated("master") && (
      <Box>
        <MasterNavbar path="/user-details" />
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
            <TableContainer component={Paper} sx={{ width: "fit-content" }}>
              <Table
                size="small"
                aria-label="a dense table"
                sx={{ maxWidth: 450 }}
              >
                <TableHead sx={{ background: "#b51271" }}>
                  <TableRow>
                    {table_head.map((cell) => (
                      <TableCell
                        key={cell.id}
                        sx={{ color: "#fff", fontWeight: "bold" }}
                        align="center"
                      >
                        {cell.title}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                {play_history_data.length === 0 ? (
                  <TableBody>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        align="center"
                        colSpan={table_head.length}
                        sx={{
                          fontWeight: "800",
                          fontSize: "1.15rem",
                          color: "blue",
                        }}
                      >
                        No Play History data found ...
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ) : (
                  <TableBody>
                    {play_history_data.map((row, index) => (
                      <TableRow
                        key={row.id}
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
                    ))}
                  </TableBody>
                )}
              </Table>
            </TableContainer>
            {play_history_data.length !== 0 && (
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
        background:
          value.value.status === "true"
            ? "green"
            : value.value.status === "null"
            ? "grey"
            : "red",
        borderRadius: "50%",
      }}
    >
      {value.value.digit}
    </Box>
  );
};
