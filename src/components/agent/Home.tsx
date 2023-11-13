import { Box, Pagination } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AgentNavbar from "./Navbar";
import { useState,useEffect } from "react";
import axios from "axios";
const table_head = ["S.No", "Username", "Created At", "Total Amount Win"];
const table_body = [
  {
    id: 1,
    s_no: 1,
    username: "john",
    created_at: "12/04/2023",
    win_amount: "$100",
  },
  {
    id: 2,
    s_no: 2,
    username: "john",
    created_at: "12/04/2023",
    win_amount: "$100",
  },
  {
    id: 3,
    s_no: 3,
    username: "john",
    created_at: "12/04/2023",
    win_amount: "$100",
  },
];

function getAgentId(){
  let agentId=sessionStorage.getItem("agentId")
  return agentId;
  }

const AgentHome = () => {
  const agentid=getAgentId();
  const [getuserdata,setAgentUserData]=useState<any[]>([])
  const [current_page, setCurrentPage] = useState(0);
  const pageCount = 10;
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3002/user/getAllUsers?referralId=${agentid}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    
      setAgentUserData(response.data.data);
      
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
      <AgentNavbar path="/" />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box component={"div"} sx={{ minWidth: "300px" }}>
          <Box
            sx={{
              color: "#210759",
              fontWeight: "bold",
              fontSize: "1.5rem",
              my: 2,
            }}
          >
            Agent Table
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
                  {getuserdata.map((row) => (
                    <TableRow
                      key={row.s_no}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" align="center">
                        {row.s_no}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ cursor: "pointer" }}
                        onClick={() => (window.location.href = "/user-profile")}
                      >
                        {row.username}
                      </TableCell>
                      <TableCell align="center">{row.CreatedAt}</TableCell>
                      <TableCell align="center">{row.amount}</TableCell>
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
              defaultPage={0}
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
export default AgentHome;
