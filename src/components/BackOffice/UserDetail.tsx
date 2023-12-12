import Box from "@mui/material/Box";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import BackOfficeNavbar from "./NavBar";
import { useState, useEffect } from "react";
import { isAuthenticated } from "../isAuthenticated/IsAuthenticated";
import { CustomPagination } from "../custom-table/CustomPagination";
import { CustomTableHead } from "../custom-table/CustomTableHead";
import Loader from "../loader/Loader";
import { TableLoader } from "../custom-table/TableLoader";
import { NoDataFoundTable } from "../custom-table/NoDataFound";
import { getAllUsersData } from "../../api/getAllUsersData";
import { searchUserName } from "../../api/searchUsername";

const table_head = [
  "Name",
  "Mail",
  "Phone",
  "Address",
  "Acc. No",
  "UPI ID",
  "IFSC",
  "PAN No",
  "Aadhar No",
  "Play History",
  "Wallet History",
];

const BackOfficeUserDetail = () => {
  const [userDetailData, setUserDetailData] = useState<any[]>([]);
  const [search_username, setSearchData] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [current_page, setCurrentPage] = useState(0);
  const [open_loader, setOpenLoader] = useState(false);
  const [table_loader, setOpenTableLoader] = useState(false);

  const fetchSearchData = async () => {
    setOpenTableLoader(true);
    await searchUserName(search_username)
      .then((response) => {
        setOpenTableLoader(false);
        setUserDetailData(response.data.data);
      })
      .catch((error) => {
        setOpenTableLoader(false);
        console.log(error);
      });
  };

  useEffect(() => {
    setOpenLoader(true);
    (async () => {
      await getAllUsersData(current_page)
        .then((response) => {
          setUserDetailData(response.data.data);
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
          console.log(err);
          setOpenLoader(false);
          setOpenTableLoader(false);
        });
    })();
  }, []);

  useEffect(() => {
    setOpenTableLoader(true);
    (async () => {
      await getAllUsersData(current_page)
        .then((response) => {
          setUserDetailData(response.data.data);
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
          console.log(err);
          setOpenLoader(false);
          setOpenTableLoader(false);
        });
    })();
  }, [current_page]);

  return (
    isAuthenticated("back-office") && (
      <Box>
        <BackOfficeNavbar path="/back-office" />
        {open_loader && <Loader />}
        <Box
          component={"div"}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
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
            User Details
          </Box>
          <Box
            sx={{
              display: "flex",
            }}
          >
            <input
              type="text"
              value={search_username}
              onChange={(e) => setSearchData(e.target.value)}
              placeholder="search username..."
            />
            <button onClick={fetchSearchData} style={{ cursor: "pointer" }}>
              search
            </button>
          </Box>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <CustomTableHead table_head={table_head} />
            <TableBody>
              {!open_loader && table_loader ? (
                <TableLoader colSpan={table_head.length} />
              ) : !table_loader &&
                !open_loader &&
                userDetailData.length === 0 ? (
                <NoDataFoundTable
                  description="No data found..."
                  colSpan={table_head.length}
                />
              ) : (
                userDetailData.map((row) => (
                  <TableRow
                    key={row.username}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {row.username.includes(null)
                        ? row.username.split("(")[0]
                        : row.username}
                    </TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">{row.mobileNumber}</TableCell>
                    <TableCell align="center">{row.address}</TableCell>
                    <TableCell align="center">{row.accountNo}</TableCell>
                    <TableCell align="center">{row.upi_id}</TableCell>
                    <TableCell align="center">{row.IFSC}</TableCell>
                    <TableCell align="center">{row.panNo}</TableCell>
                    <TableCell align="center">{row.aadharNo}</TableCell>

                    <TableCell align="center">
                      <Box
                        sx={{
                          background: "#410961",
                          p: 1,
                          borderRadius: "5px",
                          color: "#fff",
                          fontWeight: "bold",
                          cursor: "pointer",
                        }}
                        component={"div"}
                        onClick={() => {
                          sessionStorage.setItem("userName", row.username);
                          sessionStorage.setItem("userid", row.userId);
                          window.location.href = "/back-office-play-history";
                        }}
                      >
                        Play History
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box
                        sx={{
                          background: "#057507",
                          p: 1,
                          borderRadius: "5px",
                          color: "#fff",
                          fontWeight: "bold",
                          cursor: "pointer",
                        }}
                        component={"div"}
                        onClick={() => {
                          sessionStorage.setItem("userName", row.username);
                          sessionStorage.setItem("userid", row.userId);
                          window.location.href = "/back-office-wallet-history";
                        }}
                      >
                        Wallet History
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {userDetailData.length !== 0 && (
          <CustomPagination
            pageCount={pageCount}
            setCurrentPage={setCurrentPage}
          />
        )}
      </Box>
    )
  );
};
export default BackOfficeUserDetail;
