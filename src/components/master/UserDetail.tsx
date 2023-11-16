import Box from "@mui/material/Box";
import MasterNavbar from "./Navbar";
import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import axios from "axios";
import PaginationRounded from "../pagination/CustomPagination";
import Pagination from "@mui/material/Pagination";

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

const handleUserName=(username:string)=>{

}


const UserDetail = () => {
  const [userDetailData, setUserDetailData] = useState<any[]>([]);
  const [current_page, setCurrentPage] = useState(0);
  const [search_username,setSearchData] =useState("");
  const [pageCount,setPageCount] = useState<number>(0)
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://43.204.150.238:3002/user/getAllUserData?pageno=${current_page}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    
      setUserDetailData(response.data.data);
      let count=0;
      if(response.data.data.count<10){
      count = Math.ceil(response.data.data.count / 10)+1;
      }
      else{
       count = Math.ceil(response.data.count / 10);
      }
      console.log(count)
      setPageCount(count);
     
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSearchData = async () => {
    try {
      const response = await axios.get(
        `http://65.2.141.218:3002/user/searchUser?username=${search_username}`,
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
  useEffect(()=>{
console.log(userDetailData)
  },[])
  useEffect(() => {
    fetchData();
  }, [current_page]);

  return (
    <Box>
      <MasterNavbar path="/master" />
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
          display:"flex"
        }}>
          <input type="text" value={search_username} onChange={(e)=> setSearchData(e.target.value)} placeholder="search username..." />
          <button
          onClick={fetchSearchData}>
            search
          </button>
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
                    onClick={() =>  { sessionStorage.setItem("userName",row.username);sessionStorage.setItem("userid",row.userId);window.location.href = "/play-history"}}
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
                    onClick={() => (window.location.href = "/wallet-history")}
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
  );
};
export default UserDetail;
