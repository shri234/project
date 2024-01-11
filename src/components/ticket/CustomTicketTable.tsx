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
  dailyTicketResultShowTime,
  monthlyResultShowTime,
  weeklyTicketResultShowTime,
} from "../../utill";
import { winning_ticket_result } from "../../api/winning_result";

import { TableLoader } from "../custom-table/TableLoader";
import { WinningTicketInterface } from "./UserTicketBuy";

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
  winning_ticket,
}: {
  name: string;
  timeLeft: { day: string; hours: string; minutes: string; seconds: string };
  winning_ticket: number | null;
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

  const [open_loader, setLoader] = useState(false);

  useEffect(() => {
    if (
      handlePath() === "daily" &&
      dailyTicketResultShowTime() &&
      winning_ticket !== null
    ) {
      setLoader(true);

      winning_ticket_result(handlePath())
        .then((res) => {
          if (res.data?.data) {
            setDigits(res.data.data);
          }
          setLoader(false);
        })
        .catch((error) => {
          console.log(error);
          setLoader(false);
        });
    } else {
      if (
        handlePath() === "daily" &&
        (winning_ticket === null || !dailyTicketResultShowTime())
      ) {
        setLoader(true);
        tableTicketRefetch()
          .then((res) => {
            if (res !== undefined)
              if (res.data !== undefined && res.data !== null) {
                setDigits(res.data);
              }
            setLoader(false);
          })
          .catch((error) => {
            setLoader(false);
          });
      }
    }
  }, [
    table_ticket_isLoading,
    use_table_tickets_data,
    timeLeft.hours,
    timeLeft.minutes,
    winning_ticket,
  ]);

  useEffect(() => {
    if (
      handlePath() === "weekly" &&
      weeklyTicketResultShowTime() &&
      winning_ticket !== null
    ) {
      setLoader(true);

      winning_ticket_result(handlePath())
        .then((res) => {
          if (res.data?.data) {
            setDigits(res.data.data);
          }
          setLoader(false);
        })
        .catch((error) => {
          console.log(error);
          setLoader(false);
        });
    } else {
      if (
        (handlePath() === "weekly" && winning_ticket === null) ||
        !weeklyTicketResultShowTime()
      )
        tableTicketRefetch().then((res) => {
          if (res !== undefined)
            if (res.data !== undefined && res.data !== null) {
              setDigits(res.data);
            }
        });
    }
  }, [
    table_ticket_isLoading,
    use_table_tickets_data,
    timeLeft.hours,
    timeLeft.minutes,
    winning_ticket,
  ]);

  useEffect(() => {
    if (
      handlePath() === "monthly" &&
      monthlyResultShowTime() &&
      winning_ticket !== null
    ) {
      setLoader(true);

      winning_ticket_result(handlePath())
        .then((res) => {
          if (res.data?.data) {
            setDigits(res.data.data);
          }
          setLoader(false);
        })
        .catch((error) => {
          console.log(error);
          setLoader(false);
        });
    } else {
      if (
        handlePath() === "monthly" &&
        (winning_ticket === null || !monthlyResultShowTime())
      )
        tableTicketRefetch().then((res) => {
          if (res !== undefined)
            if (res.data !== undefined && res.data !== null) {
              setDigits(res.data);
            }
        });
    }
  }, [
    table_ticket_isLoading,
    use_table_tickets_data,
    timeLeft.hours,
    timeLeft.minutes,
    winning_ticket,
  ]);

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
          {open_loader ? (
            <TableLoader colSpan={2} key={"table-loader"} />
          ) : !table_ticket_isLoading && digits.length > 0 ? (
            <TableBody>
              {digits.map((row, index) => (
                <StyledTableRow key={`row-${index}`}>
                  <StyledTableCell align="center">{index + 1}</StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "10px",
                    }}
                  >
                    {row.ticket.map((value: any, index: number) => {
                      return (
                        <StyledTableCell
                          key={`${value._id}-ticket-${index}`}
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
