import Box from "@mui/material/Box";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Pagination } from "@mui/material";
import BackOfficeNavbar from "./NavBar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { isAuthenticated } from "../isAuthenticated/IsAuthenticated";

const table_head = [
  { id: 1, title: "Name" },
  { id: 2, title: "Mail" },
  { id: 3, title: "Phone" },
  { id: 4, title: "Address" },
  { id: 5, title: "Acc. No" },
  { id: 6, title: "IFSC" },
  { id: 7, title: "PAN No" },
  { id: 8, title: "Aadhar No" },
  { id: 9, title: "Play History" },
  { id: 10, title: "Wallet History" },
];
const table_body = [
  {
    id: 1,
    name: "John",
    mail: "john12@abc.com",
    phone: "+1324589765",
    address: "Address",
    acc_no: "3214568979",
    ifsc: "ABCS123109",
    pan_no: "JKLM0876451V",
    aadhar_no: "123487650912",
  },
  {
    id: 1,
    name: "John",
    mail: "john12@abc.com",
    phone: "+1324589765",
    address: "Address",
    acc_no: "3214568979",
    ifsc: "ABCS123109",
    pan_no: "JKLM0876451V",
    aadhar_no: "123487650912",
  },
  {
    id: 1,
    name: "John",
    mail: "john12@abc.com",
    phone: "+1324589765",
    address: "Address",
    acc_no: "3214568979",
    ifsc: "ABCS123109",
    pan_no: "JKLM0876451V",
    aadhar_no: "123487650912",
  },
  {
    id: 1,
    name: "John",
    mail: "john12@abc.com",
    phone: "+1324589765",
    address: "Address",
    acc_no: "3214568979",
    ifsc: "ABCS123109",
    pan_no: "JKLM0876451V",
    aadhar_no: "123487650912",
  },
  {
    id: 1,
    name: "John",
    mail: "john12@abc.com",
    phone: "+1324589765",
    address: "Address",
    acc_no: "3214568979",
    ifsc: "ABCS123109",
    pan_no: "JKLM0876451V",
    aadhar_no: "123487650912",
  },
];

const BackOfficeUserDetail = () => {
  const [userDetailData, setUserDetailData] = useState<any[]>([]);
  const [search_username, setSearchData] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [current_page, setCurrentPage] = useState(0);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_IP}/user/getAllUserData?pageno=${current_page}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(response.data, "respone");
      setUserDetailData(response.data.data);
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

  const fetchSearchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_IP}/user/searchUser?username=${search_username}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data, "response");
      console.log(response.data.data);
      setUserDetailData(response.data.data);
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
    isAuthenticated("back-office") && (
      <Box>
        <BackOfficeNavbar path="/back-office" />
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
            <button onClick={fetchSearchData}>search</button>
          </Box>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead sx={{ background: "#b51271" }}>
              <TableRow>
                {table_head.map((cell) => (
                  <TableCell
                    sx={{ color: "#fff", fontWeight: "bold" }}
                    align="center"
                  >
                    {cell.title}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {userDetailData.map((row) => (
                <TableRow
                  key={row.username}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {row.username}
                  </TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.mobileNumber}</TableCell>
                  <TableCell align="center">{row.address}</TableCell>
                  <TableCell align="center">{row.accountNo}</TableCell>
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
                      onClick={() =>
                        (window.location.href = "/back-office-play-history")
                      }
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
                      onClick={() =>
                        (window.location.href = "/back-office-wallet-history")
                      }
                    >
                      Wallet History
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
            defaultPage={1}
            siblingCount={0}
            boundaryCount={1}
            onChange={(e, page) => {
              setCurrentPage(page - 1);
            }}
          />
        </Box>
      </Box>
    )
  );
};
export default BackOfficeUserDetail;
