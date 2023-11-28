import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import axios from "axios";
import { NoDataFoundTable } from "../custom-table/NoDataFound";

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

  const fetchTableData = async () => {
    try {
      const formatteddate = `${new Date().getFullYear()}-${
        new Date().getMonth() + 1
      }-${new Date().getDate()}`;

      const response = await axios.get(
        `${
          process.env.REACT_APP_IP
        }/ticket/getTickets?userId=${sessionStorage.getItem(
          "userId"
        )}&&date=${formatteddate}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setDigits(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  return (
    <Box component={"div"} sx={{ display: "flex", justifyContent: "center" }}>
      <TableContainer component={Paper} sx={{ maxWidth: "300px", mt: 2 }}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">S.No.</StyledTableCell>
              <StyledTableCell align="center">Your Ticket</StyledTableCell>
            </TableRow>
          </TableHead>
          {digits.length > 0 ? (
            <TableBody>
              {digits.map((row, index) => (
                <StyledTableRow key={row.ticketId}>
                  <StyledTableCell align="center">{index + 1}</StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "10px",
                    }}
                  >
                    {row.ticket.map((value: any) => {
                      return (
                        <StyledTableCell
                          key={`${value._id}-ticket`}
                          component={"div"}
                          align="center"
                          sx={{
                            height: "20px",
                            width: "20px",
                            p: 0.5,
                            fontWeight: "bold",

                            color: "#fff",
                            background:
                              value.status === "true"
                                ? "green"
                                : value.status === "null"
                                ? "grey"
                                : "red",
                            borderRadius: "50%",
                          }}
                        >
                          {value.digit}
                        </StyledTableCell>
                      );
                    })}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <NoDataFoundTable colSpan={2} description="No Data Found..." />
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </Box>
  );
}
