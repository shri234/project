import Box from "@mui/material/Box";
import MasterNavbar from "./Navbar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { isAuthenticated } from "../isAuthenticated/IsAuthenticated";

const table_head = [
  { id: 1, title: "S.No" },
  { id: 2, title: "Date" },
  { id: 3, title: "Amount" },
];
const table_body = [
  {
    id: 1,
    s_no: "1",
    date: "29/10/2023",
    amount: "$100",
  },
  {
    id: 2,
    s_no: "2",
    date: "19/10/2023",
    amount: "$200",
  },
  {
    id: 3,
    s_no: "3",
    date: "12/10/2023",
    amount: "$250",
  },
  {
    id: 4,
    s_no: "4",
    date: "29/10/2023",
    amount: "$400",
  },
  {
    id: 5,
    s_no: "5",
    date: "29/10/2023",
    amount: "$300",
  },
];
const RedeemHistory = () => {
  const [wallethistory, setWalletHistory] = useState<any[]>([]);
  const [current_page, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${
          process.env.REACT_APP_IP
        }/ticket/getWalletHistory?userId=${sessionStorage.getItem(
          "userid"
        )}&pageno=${current_page}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data.data);
      setWalletHistory(response.data.data);
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
              }}
            >
              Wallet History
            </Box>
            <TableContainer component={Paper}>
              <Box
                component={"div"}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
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
                          key={cell.id}
                          sx={{ color: "#fff", fontWeight: "bold" }}
                          align="center"
                        >
                          {cell.title}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  {wallethistory.length === 0 ? (
                    <TableBody>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
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
                          No Wallet History data found ...
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  ) : (
                    <TableBody>
                      {wallethistory.map((row, index) => (
                        <TableRow
                          key={row.number}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row" align="center">
                            {index + 1}
                          </TableCell>
                          <TableCell align="center">{row.CreatedAt}</TableCell>
                          <TableCell
                            align="center"
                            sx={
                              row.status
                                ? { color: "green", fontWeight: "bold" }
                                : { color: "red", fontWeight: "bold" }
                            }
                          >
                            {row.status ? `+${row.amount}` : `-${row.amount}`}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  )}
                </Table>
              </Box>
            </TableContainer>
            {wallethistory.length !== 0 && (
              <Box
                component={"div"}
                sx={{
                  display: "flex",
                  width: "300px",
                  justifyContent: { xs: "start", sm: "end" },
                  mt: 1,
                }}
              >
                <Pagination
                  count={pageCount}
                  defaultPage={1}
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
export default RedeemHistory;
