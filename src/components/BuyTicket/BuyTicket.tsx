import { FC } from "react";
import Box from "@mui/material/Box";
import BuyTicketNavBar from "./BuyTicketNavbar"; // Ensure this import is correct
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import axios from "axios";
import { useState, useEffect } from "react";
import moment from "moment";
import { isAuthenticated } from "../isAuthenticated/IsAuthenticated";
import "./BuyTicket.css";
import { CustomizedStatusDialogs } from "../custom-table/CustomDialog";
import { STATUS } from "../../utill";

const BuyTicket: FC<{ name: string; path: string }> = ({ name, path }) => {
  const [ticket_count, setTicketCount] = useState(0);
  const [walletamount, setWalletAmount] = useState(0);
  const [ticket_price, setTicketprice] = useState(0);
  const [alreadyticketcount, setBeforeTicketCount] = useState(0);
  const [alreadyticketcount1, setAlreadyTicketCount] = useState(0);
  const [status, setStatus] = useState(false);
  const [loader, setOpenLoader] = useState(false);
  const [status_dlg, setStatusDlg] = useState({
    error: false,
    warning: false,
    success: false,
    info: false,
  });

  const increaseCount = () => {
    if (ticket_count < 15 - alreadyticketcount) {
      setTicketCount(ticket_count + 1);
    } else {
      setStatus(true);
      setStatusDlg((prevStatus) => ({
        ...prevStatus,
        warning: true,
      }));
      setTimeout(() => {
        setStatus(false);
        setStatusDlg((prevStatus) => ({
          ...prevStatus,
          warning: false,
        }));
      }, 5000);
    }
  };

  const decreaseCount = () => {
    if (ticket_count > 0) {
      setTicketCount(ticket_count - 1);
    }
  };

  const fetchData = async () => {
    if (alreadyticketcount1 + ticket_count <= 15) {
      if (walletamount >= ticket_count * ticket_price) {
        try {
          const body = { ticketCount: alreadyticketcount + ticket_count };

          const response = await axios.post(
            `${
              process.env.REACT_APP_IP
            }/ticket/addTicketCount?userId=${sessionStorage.getItem("userId")}`,
            body
          );

          setStatus(true);
          setStatusDlg((prevStatus) => ({
            ...prevStatus,
            success: true,
          }));
          setTimeout(() => {
            setStatus(false);
            setStatusDlg((prevStatus) => ({
              ...prevStatus,
              success: false,
            }));
          }, 5000);
          if (response.status == 200) {
            try {
              const body = {
                amount: walletamount - ticket_count * ticket_price,
                userId: sessionStorage.getItem("userId"),
              };
              const res = await axios.post(
                `${process.env.REACT_APP_IP}/ticket/addWalletAmount`,
                body
              );
            } catch (err) {}
            window.location.href = "/daily-buy-ticket";
          }
        } catch (err) {}
      } else {
        setStatus(true);
        setStatusDlg((prevStatus) => ({
          ...prevStatus,
          error: true,
        }));
        setTimeout(() => {
          setStatus(false);
          setStatusDlg((prevStatus) => ({
            ...prevStatus,
            error: false,
          }));
        }, 5000);
      }
    } else {
      setStatus(true);
      setStatusDlg((prevStatus) => ({
        ...prevStatus,
        warning: true,
      }));
      setTimeout(() => {
        setStatus(false);
        setStatusDlg((prevStatus) => ({
          ...prevStatus,
          warning: false,
        }));
      }, 5000);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${
            process.env.REACT_APP_IP
          }/ticket/getWallet?userId=${sessionStorage.getItem("userId")}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setAlreadyTicketCount(response.data.data.alreadyTicketCount);
        setWalletAmount(response.data.data.amount);
        setBeforeTicketCount(response.data.data.ticketCount);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let date = new Date();
    let datee = moment(date).format("YYYY-MM-DD");
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_IP}/ticket/getTicketRate?date=${datee}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setTicketprice(response.data.data.ticketRate);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    isAuthenticated("user") && (
      <Box
        component={"div"}
        sx={{
          height: { xs: "100%", sm: "100vh" },
          backgroundImage: `url('/monthly.jpeg')`,
          width: "100%",
        }}
      >
        <Box component={"div"}>
          <BuyTicketNavBar name={name} path={path} />
          <br />

          {status && status_dlg.error && (
            <CustomizedStatusDialogs
              setOpenStatusDlg={setStatus}
              description="Insufficient fund..."
              status={STATUS.ERROR}
            />
          )}
          {status && status_dlg.success && (
            <CustomizedStatusDialogs
              setOpenStatusDlg={setStatus}
              description="Ticket bought successfully."
              status={STATUS.SUCCESS}
            />
          )}
          {status && status_dlg.info && (
            <CustomizedStatusDialogs
              setOpenStatusDlg={setStatus}
              description="Please select minimum 1 ticket."
              status={STATUS.INFO}
            />
          )}
          {status && status_dlg.warning && (
            <CustomizedStatusDialogs
              setOpenStatusDlg={setStatus}
              description={`You already bought ${alreadyticketcount1} tickets you can buy  Only ${15 - alreadyticketcount1} tickets`}
              status={STATUS.WARNING}
            />
          )}
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
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                borderRadius: "8px",
                p: 2,
                m: 1,
                boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;`,
                background: "#fff",
              }}
            >
              <h2
                style={{
                  textAlign: "start",
                  marginLeft: "8px",
                  color: "#2f0457",
                }}
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
                  <Box sx={{ fontWeight: "bold", fontSize: "20px" }}>
                    Ticket:
                  </Box>
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
                  <Box sx={{ fontWeight: "bold", fontSize: "20px" }}>
                    Price:
                  </Box>
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
                    setStatus(true);
                    setStatusDlg((prevStatus) => ({
                      ...prevStatus,
                      info: true,
                    }));
                    setTimeout(() => {
                      setStatus(false);
                      setStatusDlg((prevStatus) => ({
                        ...prevStatus,
                        info: false,
                      }));
                    }, 6000);
                  } else {
                    fetchData();
                  }
                }}
              >
                PAY
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    )
  );
};

export default BuyTicket;
