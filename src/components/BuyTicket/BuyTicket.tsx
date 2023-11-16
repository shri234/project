import { FC} from "react";
import Box from "@mui/material/Box";
import BuyTicketNavBar from "./BuyTicketNavbar"; // Ensure this import is correct
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import axios from "axios";
import { RazorpayOptions } from "../../razorpay";
import React,{useState,useEffect} from "react"
import moment from "moment";


const BuyTicket: FC<{ name: string; path: string }> = ({ name, path }) => {
  const [ticket_count, setTicketCount] = useState(0);
  const[walletamount,setWalletAmount] = useState(0)
  const [ticket_price,setTicketprice] =useState(0);
  const[alreadyticketcount,setBeforeTicketCount] =useState(0)
  const [order, setOrder] = useState(null);

  const increaseCount = () => {
    if (ticket_count < 15) {
      setTicketCount(ticket_count + 1);
    }
  };

  const decreaseCount = () => {
    if (ticket_count > 0) {
      setTicketCount(ticket_count - 1);
    }
  };

    const fetchData=async () =>{
      try{
    const body = {ticketCount:ticket_count };
    console.log(body);
    let date=new Date();
    let datee=moment(date).format("YYYY-MM-DD");
    console.log("date",datee)
    if(walletamount>ticket_price){
     const response=await axios.post(`http://43.204.150.238:3002/ticket/addTicketCount?userId=${sessionStorage.getItem("userId")}`, body);
     
     if(response.status==200){
      alert("Tickets has been Successfully bought")
     
      try{
        console.log(walletamount)
        const body = { amount:walletamount-ticket_count * ticket_price,userId:sessionStorage.getItem("userId")};
        const res=await axios.post(`http://43.204.150.238:3002/ticket/addWalletAmount`, body);
      }
      catch(err){
      }
        window.location.href = "/daily-buy-ticket";
     }
    }
    else{
      window.alert("Please add amount in wallet to continue")
    }
  }
    catch(err){
    }
  }

  useEffect(() => {
    let date=new Date();
    let datee=moment(date).format("YYYY-MM-DD")
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://43.204.150.238:3002/ticket/getWallet?userId=${sessionStorage.getItem("userId")}`,{
          headers: {
            'Content-Type':"application/json"
          }
        });
        setWalletAmount(response.data.data.amount);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }
,[]);

  useEffect(() => {
    let date=new Date();
    let datee=moment(date).format("YYYY-MM-DD");
    console.log("date",datee)
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://43.204.150.238:3002/ticket/getTicketRate?date=${datee}`,{
          headers: {
            'Content-Type':"application/json"
          }
        });
        setTicketprice(response.data.data.ticketRate);
        // setWalletAmount(response.data.data.walletAmount)
        // setBeforeTicketCount(response.data.data.ticketCount)
      } catch (err) {
        console.log(err);
      }
    };
  
    fetchData();
  }
,[]);
  
  return (
    <Box>
      <BuyTicketNavBar name={name} path={path} />
      <br />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: { xs: "300px", sm: "800px" },
            minWidth: { xs: "300px", sm: "400px" },

            // maxWidth: "350px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            borderRadius: "8px",
            p: 2,
            m: 1,
            boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;`,
          }}
        >
          <h2
            style={{ textAlign: "start", marginLeft: "8px", color: "#2f0457" }}
          >
            Buy Ticket
          </h2>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                gap: "5px",
                alignItems: "center",
              }}
            >
              <Box sx={{ fontWeight: "bold", fontSize: "20px" }}>Ticket:</Box>
              <Box
                sx={{ fontWeight: "bold", cursor: "pointer" }}
                onClick={decreaseCount}
              >
                <RemoveCircleOutlineIcon
                  sx={{ color: "red", fontSize: "25px" }}
                />
              </Box>
              <Box
           
                sx={{
                  width: "20px",
                  height: "20px",
                  border: "2px solid grey",
                  textAlign: "center",
                  borderRadius: "5px",
                  padding: 1.2,
                }}
              >
                {ticket_count}
              </Box>
              <Box
                sx={{ fontWeight: "bold", cursor: "pointer" }}
                onClick={increaseCount}
              >
                <AddCircleOutlineIcon sx={{ fontSize: "25px" }} />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <Box sx={{ fontWeight: "bold", fontSize: "20px" }}>Price:</Box>
              <Box
                sx={{
                  minWidth: "20px",
                  height: "20px",
                  border: "2px solid grey",
                  textAlign: "center",
                  borderRadius: "5px",
                  padding: 1.2,
                }}
              >
                {ticket_price}
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              my: 2,
              alignItems: "center",
            }}
          >
            <Box sx={{ fontWeight: "bold", fontSize: "20px" }}>Amount:</Box>
            <Box
              sx={{
                fontWeight: "bold",
                ml: 2,
                color: "blue",
                fontSize: "20px",
              }}
            >
              {ticket_price * ticket_count}
            </Box>
          </Box>
          <br />
          <Box
            sx={{
              p: 1,
              background: "#10a162",
              width: "fit-content",
              borderRadius: "5px",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={() => {
              if (ticket_count === 0) {
                alert("Please select at least one ticket.");
              } else {
                fetchData()
              }
            }}
          >
            PAY
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BuyTicket;
