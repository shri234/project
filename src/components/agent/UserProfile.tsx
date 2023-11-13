import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AgentNavbar from "./Navbar";
import { useState } from "react";
import Pagination from "@mui/material/Pagination";
const table_head = ["S.No", "Date", "Ticket"];
const table_body = [
  { id: 1, s_no: 1, date: "12/05/2023", ticket: "3421" },
  { id: 2, s_no: 2, date: "12/05/2023", ticket: "4214" },
  { id: 3, s_no: 3, date: "12/05/2023", ticket: "5643" },
  { id: 4, s_no: 4, date: "12/05/2023", ticket: "1213" },
];

const UserProfile = () => {
  const [current_page, setCurrentPage] = useState(0);
  const pageCount = 10;

  return (
    <Box>
      <AgentNavbar path="/agent" />
      <Box component={"div"} sx={{ display: "flex", justifyContent: "center" }}>
        <Box component={"div"} sx={{ minWidth: "300px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Box
              sx={{
                background: "grey",
                p: 4,
                width: "60px",
                height: "60px",
                borderRadius: "100%",
              }}
            ></Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mx: 2,
              fontWeight: "bold",
            }}
          >
            <Box>UserName</Box>
            <Box>DOJ</Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mx: 2,
              fontWeight: "bold",
            }}
          >
            <Box>Mail</Box>
            <Box>Balance</Box>
          </Box>
          <Box
            sx={{
              color: "#3f106b",
              fontWeight: "bold",
              fontSize: "1.25rem",
              mt: 2,
              mb: 1,
            }}
          >
            History Table
          </Box>
          <Box
            component={"div"}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <TableContainer
              component={Paper}
              sx={{
                width: "fit-content",
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
                        sx={{ color: "#fff", fontWeight: "bold" }}
                        align="center"
                      >
                        {cell}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {table_body.map((row) => (
                    <TableRow
                      key={row.s_no}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" align="center">
                        {row.s_no}
                      </TableCell>
                      <TableCell align="center">{row.date}</TableCell>
                      <TableCell align="center">{row.ticket}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
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
        </Box>
      </Box>
    </Box>
  );
};
export default UserProfile;
