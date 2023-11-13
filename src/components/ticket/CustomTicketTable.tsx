import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import React, { useState, useEffect } from "react";
import axios from "axios";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables() {
  const [digits, setDigits] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formatteddate = `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()}`;
        const response = await axios.get(
          `http://localhost:3002/ticket/getTickets?userId=${sessionStorage.getItem(
            "userId"
          )}&&date=${formatteddate}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        setDigits(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);
  return (
    <TableContainer component={Paper} sx={{ maxWidth: "300px", mt: 2 }}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">S.No.</StyledTableCell>
            <StyledTableCell align="center">Your Ticket</StyledTableCell>
            {/* <StyledTableCell align="center">Result</StyledTableCell>
            <StyledTableCell align="center" sx={{ whiteSpace: "nowrap" }}>
              Cash Price
            </StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {digits.map((row) => (
            <StyledTableRow key={row.ticketId}>
              <StyledTableCell align="center">{row.ticketId}</StyledTableCell>
              <StyledTableCell
                align="center"
                sx={{ display: "flex", justifyContent: "center", gap: "10px" }}
              >
                {row.ticket.map(
                  (value:any) => {
                    console.log(value)
                    if(value.status=="true"){
                    return (
                      <Box
                        component={"div"}
                        sx={{
                          height: "20px",
                          width: "20px",
                          p: 0.5,
                          fontWeight: "bold",
                          color: "#fff",
                          background:  "green",
                          borderRadius: "50%",
                        }}
                      >
                        {value.digit}
                      </Box>
                    );
                      }
                      else if(value.status=="false"){
                        return (
                          <Box
                            component={"div"}
                            sx={{
                              height: "20px",
                              width: "20px",
                              p: 0.5,
                              fontWeight: "bold",
                              color: "#fff",
                              background:  "grey",
                              borderRadius: "50%",
                            }}
                          >
                            {value.digit}
                          </Box>
                        );
                      }
                  }
                )}
              </StyledTableCell>
              {/* <StyledTableCell align="center">{row.result}</StyledTableCell>
              <StyledTableCell align="center">{row.cash_price}</StyledTableCell> */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
