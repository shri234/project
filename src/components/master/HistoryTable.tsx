import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { CustomPagination } from "../custom-table/CustomPagination";
import { CustomTableHead } from "../custom-table/CustomTableHead";
import { TicketResult } from "./PlayHistory";
import { NoDataFoundTable } from "../custom-table/NoDataFound";
import { TableLoader } from "../custom-table/TableLoader";
import { FC, useEffect, useState } from "react";
import Loader from "../loader/Loader";
import { getAllTicketHistoryData } from "../../api/getAllTicketHistoryData";

const table_head = ["S.No", "Username", "Ticket"];

const MasterHistoryTable: FC<{ path: string }> = ({ path }) => {
  const handlePath = () => {
    return path === "Daily"
      ? "daily"
      : path === "Weekly"
      ? "weekly"
      : "monthly";
  };
  const [current_page, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [history_data, setHistoryData] = useState<any[]>([]);
  const [open_loader, setOpenLoader] = useState(false);
  const [table_loader, setOpenTableLoader] = useState(false);

  useEffect(() => {
    setOpenLoader(true);
    (async () => {
      await getAllTicketHistoryData(current_page, handlePath())
        .then((response) => {
          setHistoryData(response.data.data);

          let count = 0;
          if (response.data.data.count < 10) {
            count = Math.ceil(response.data.data.count / 10) + 1;
          } else {
            count = Math.ceil(response.data.count / 10);
          }
          setPageCount(count);
          setOpenLoader(false);
          setOpenTableLoader(false);
        })
        .catch((err) => {
          setOpenTableLoader(false);
        });
    })();
  }, []);

  useEffect(() => {
    setOpenTableLoader(true);
    (async () => {
      await getAllTicketHistoryData(current_page, handlePath())
        .then((response) => {
          setHistoryData(response.data.data);

          let count = 0;
          if (response.data.data.count < 10) {
            count = Math.ceil(response.data.data.count / 10) + 1;
          } else {
            count = Math.ceil(response.data.count / 10);
          }
          setPageCount(count);
          setOpenLoader(false);
          setOpenTableLoader(false);
        })
        .catch((err) => {
          setOpenTableLoader(false);
        });
    })();
  }, [current_page]);

  return (
    <>
      {open_loader && <Loader />}
      <Box
        sx={{
          color: "#210759",
          fontWeight: "bold",
          fontSize: "1.5rem",
          my: 2,
          ml: 2,
        }}
      >
        History
      </Box>
      <Box component={"div"} sx={{ display: "flex", justifyContent: "center" }}>
        <TableContainer component={Paper} sx={{ width: "fit-content" }}>
          <Table sx={{ maxWidth: 450 }} size="small" aria-label="a dense table">
            <CustomTableHead table_head={table_head} />
            <TableBody>
              {!open_loader && table_loader ? (
                <TableLoader colSpan={table_head.length} />
              ) : !table_loader && !open_loader && history_data.length === 0 ? (
                <NoDataFoundTable
                  description="No data found..."
                  colSpan={table_head.length}
                />
              ) : (
                history_data.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                    }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">{row.username}</TableCell>
                    <TableCell align="center" sx={{ display: "flex" }}>
                      {row.ticket.map((value: any) => (
                        <TicketResult value={value} key={value.id} />
                      ))}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {history_data.length !== 0 && (
        <CustomPagination
          setCurrentPage={setCurrentPage}
          pageCount={pageCount}
        />
      )}
    </>
  );
};
export default MasterHistoryTable;
