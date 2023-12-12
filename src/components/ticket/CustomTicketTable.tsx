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
import { NoDataFoundTable } from "../custom-table/NoDataFound";
import useTableTicketData from "../../swr/table_ticket_data";
import {
  isDailyPublishPossibleAndUserCannotBuyTicket,
  isMonthlyPublishIsAvailableandUserCannotBuyTicket,
  isWeeklyPublishPossibleandUserCannotBuyTicket,
} from "../../utill";

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

export default function CustomizedTables({
  name,
  timeLeft,
}: {
  name: string;
  timeLeft: { day: string; hours: string; minutes: string; seconds: string };
}) {
  const handlePath = (): string => {
    return name === "Daily Spin"
      ? "daily"
      : name === "Weekly Spin"
      ? "weekly"
      : "monthly";
  };

  const { use_table_tickets_data, table_ticket_isLoading, tableTicketRefetch } =
    useTableTicketData(handlePath());

  const [digits, setDigits] = useState<any[]>(
    use_table_tickets_data !== undefined ? use_table_tickets_data.data : []
  );

  useEffect(() => {
    const now = new Date();
    if (handlePath() === "daily" && now.getHours() < 17 && now.getHours() < 19)
      tableTicketRefetch().then((res) => {
        if (res !== undefined)
          if (res.data !== undefined && res.data !== null) {
            setDigits(res.data);
          }
      });
    else if (isDailyPublishPossibleAndUserCannotBuyTicket())
      tableTicketRefetch().then((res) => {
        if (res !== undefined)
          if (res.data !== undefined && res.data !== null) {
            setDigits(res.data);
          }
      });
  }, [table_ticket_isLoading, use_table_tickets_data, timeLeft.hours]);

  useEffect(() => {
    const now = new Date();
    if (handlePath() === "daily" && now.getHours() < 18 && now.getHours() < 20)
      tableTicketRefetch().then((res) => {
        if (res !== undefined)
          if (res.data !== undefined && res.data !== null) {
            setDigits(res.data);
          }
      });
    else if (isWeeklyPublishPossibleandUserCannotBuyTicket())
      tableTicketRefetch().then((res) => {
        if (res !== undefined)
          if (res.data !== undefined && res.data !== null) {
            setDigits(res.data);
          }
      });
  }, [table_ticket_isLoading, use_table_tickets_data, timeLeft.hours]);
  useEffect(() => {
    const now = new Date();
    if (
      handlePath() === "monthly" &&
      now.getHours() < 19 &&
      now.getHours() < 21
    )
      tableTicketRefetch().then((res) => {
        if (res !== undefined)
          if (res.data !== undefined && res.data !== null) {
            setDigits(res.data);
          }
      });
    else if (isMonthlyPublishIsAvailableandUserCannotBuyTicket())
      tableTicketRefetch().then((res) => {
        if (res !== undefined)
          if (res.data !== undefined && res.data !== null) {
            setDigits(res.data);
          }
      });
  }, [table_ticket_isLoading, use_table_tickets_data, timeLeft.hours]);

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
          {!table_ticket_isLoading && digits.length > 0 ? (
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
