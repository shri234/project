import Box from "@mui/material/Box";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { isAuthenticated } from "../isAuthenticated/IsAuthenticated";
import BackOfficeNavbar from "./NavBar";

const table_head = ["User Name", "Mail", "Request Amount", "Confirm", "Delete"];

const PaymentRequest = () => {
  const [paymentRequest, setPaymentRequest] = useState<any[]>([]);
  const [redeemId, setRedeemId] = useState(0);
  const [current_page, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_IP}/payment/getRedeem?pageno=${current_page}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setPaymentRequest(response.data.data);
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
  const handleRedeem = async (redeemId: number) => {
    const userId = sessionStorage.getItem("userid");

    try {
      const body = {};
      console.log(body);

      const response = await axios.put(
        `${process.env.REACT_APP_IP}/payment/updateRedeem?redeemId=${redeemId}`,
        body
      );

      if (response.status == 200) {
        window.location.href = "/payment-request";
      }
    } catch (err) {}
  };

  const handleDeleteRedeem = async (redeemId: number) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_IP}/payment/deleteRedeem?redeemId=${redeemId}`
      );

      if (response.status == 200) {
        window.location.href = "/payment-request";
      }
    } catch (err) {}
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [current_page]);

  return (
    isAuthenticated("back-office") && (
      <Box>
        <BackOfficeNavbar path="/back-office" />
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
                my: 4,
              }}
            >
              Payment Request
            </Box>
            <TableContainer
              component={Paper}
              sx={{ maxWidth: { xs: 300, sm: 450 }, overflowX: "scroll" }}
            >
              <Table sx={{}} size="small" aria-label="a dense table">
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
                  {paymentRequest.length === 0 ? (
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
                        No Payment Request Detail found
                      </TableCell>
                    </TableRow>
                  ) : (
                    paymentRequest.map((row) => (
                      <TableRow
                        key={row.userId}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row" align="center">
                          {row.username}
                        </TableCell>
                        <TableCell align="center">{row.email}</TableCell>
                        <TableCell align="center">{row.amount}</TableCell>
                        <TableCell align="center">
                          <Button
                            onClick={() => {
                              handleRedeem(row.redeemId);
                            }}
                          >
                            {row.status ? "paid" : "pay"}{" "}
                          </Button>
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            onClick={() => {
                              handleDeleteRedeem(row.redeemId);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            {paymentRequest.length !== 0 && (
              <Box
                component={"div"}
                sx={{
                  display: "flex",

                  justifyContent: { xs: "start", sm: "flex-end" },
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
export default PaymentRequest;
