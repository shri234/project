import Box from "@mui/material/Box";
import MasterNavbar from "./Navbar";
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
import React,{ useEffect,useState } from "react";
import axios from "axios";


const table_head = ["User Name", "Mail", "Request Amount", "Confirm", "Delete"];
const table_body = [
  {
    id: 1,
    user_name: "John",
    mail: "johnxyz@abc.com",
    req_rupee: 100,
    confirm: true,
  },
  {
    id: 2,
    user_name: "John",
    mail: "johnxyz@abc.com",
    req_rupee: 100,
    confirm: true,
  },
  {
    id: 3,
    user_name: "John",
    mail: "johnxyz@abc.com",
    req_rupee: 100,
    confirm: false,
  },
  {
    id: 4,
    user_name: "John",
    mail: "johnxyz@abc.com",
    req_rupee: 100,
    confirm: true,
  },
  {
    id: 5,
    user_name: "John",
    mail: "johnxyz@abc.com",
    req_rupee: 100,
    confirm: false,
  },
];

const PaymentRequest = () => {
  const [paymentRequest, setPaymentRequest] = useState<any[]>([]);
  const [current_page, setCurrentPage] = useState(0);
  const [pageCount,setPageCount] =useState(0);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3002/payment/getRedeem?pageno=${current_page}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      setPaymentRequest(response.data.data);
      let count=0;
      if(response.data.data.count<10){
      count = Math.ceil(response.data.data.count / 10)+1;
      }
      else{
       count = Math.ceil(response.data.count / 10);
      }
      setPageCount(count)
      
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
    <Box>
      <MasterNavbar path="/master" />
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
                {paymentRequest.map((row) => (
                  <TableRow
                    key={row.userId}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {row.username}
                    </TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">{row.amount}</TableCell>
                    <TableCell align="center">
                      <Button> {row.status ? "paid" : "pay"} </Button>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton>
                        <DeleteIcon />{" "}
                      </IconButton>
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
        </Box>
      </Box>
    </Box>
  );
};
export default PaymentRequest;
