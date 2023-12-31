import { FC } from "react";
import Box from "@mui/material/Box";
import BuyTicketNavBar from "./BuyTicketNavbar";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import axios from "axios";
import { useState, useEffect } from "react";
import { isAuthenticated } from "../isAuthenticated/IsAuthenticated";
import "./BuyTicket.css";
import { CustomizedStatusDialogs } from "../custom-table/CustomDialog";
import { STATUS } from "../../utill";
import { buyTicketCount } from "../../api/buyTicketCount";
import { walletData } from "../../api/getWalletAmount";
import Loader from "../loader/Loader";
import useTicketPriceRate from "../../swr/ticket_price_rate";
import useUserTicketCount from "../../swr/user_ticket_count";

const BuyTicket: FC<{ name: string; path: string }> = ({ name, path }) => {
  const handlePath = (): string => {
    return name === "Daily Spin"
      ? "daily"
      : name === "Weekly Spin"
      ? "weekly"
      : "monthly";
  };

  const { ticket_price_rate, ticketpriceRefetch, ticketpriceIsLoading } =
    useTicketPriceRate(handlePath());

  const { userTicketCount, ticketcountIsLoading, ticketcountRefetch } =
    useUserTicketCount(handlePath());

  const [ticket_count, setTicketCount] = useState(0);
  const [walletamount, setWalletAmount] = useState(0);
  const [ticket_price, setTicketprice] = useState(0);
  const [alreadyticketcount1, setAlreadyTicketCount] = useState(0);
  const [status, setStatus] = useState(false);
  const [open_loader, setOpenLoader] = useState(false);
  const [status_dlg, setStatusDlg] = useState({
    error: false,
    warning: false,
    success: false,
    info: false,
  });

  useEffect(() => {
    ticketcountRefetch().then((res) => {
      if (res?.data) {
        setAlreadyTicketCount(
          res !== undefined
            ? handlePath() === "daily"
              ? res.data.alreadyDailyTicketCount
              : handlePath() === "weekly"
              ? res.data.alreadyWeeklyTicketCount
              : handlePath() === "monthly"
              ? res.data.alreadyMonthlyTicketCount
              : 0
            : 0
        );
      }
    });
  }, [userTicketCount, ticketcountIsLoading]);

  const increaseCount = () => {
    if (ticket_count < 15 - alreadyticketcount1) {
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

  const handleBuyTicket = async () => {
    if (alreadyticketcount1 + ticket_count <= 15 && ticket_price > 0) {
      if (walletamount >= ticket_count * ticket_price) {
        const body = {
          ticketCount: ticket_count,
          userId: sessionStorage.getItem("userId"),
        };

        await buyTicketCount(body, handlePath())
          .then(async () => {
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

            const body = {
              amount: walletamount - ticket_count * ticket_price,
              userId: sessionStorage.getItem("userId"),
            };
            await axios.post(
              `${process.env.REACT_APP_IP}/ticket/addWalletAmount`,
              body
            );
            window.location.href = `/${handlePath()}-buy-ticket`;
            setOpenLoader(false);
          })
          .catch((error) => {
            setOpenLoader(false);
            console.log(error);
          });
      } else {
        setOpenLoader(false);
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
      setOpenLoader(false);
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
    ticketpriceRefetch().then((res) => {
      if (res?.data) setTicketprice(res.data.ticketRate);
    });
  }, [ticket_price_rate, ticketpriceIsLoading]);
  useEffect(() => {
    (async () => {
      await walletData()
        .then((res) => {
          setWalletAmount(res.data.data.amount);
        })
        .catch((error) => {
          console.log(error);
        });
    })();
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

          {open_loader && <Loader />}
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
          {status && status_dlg.warning && ticket_price > 0 && (
            <CustomizedStatusDialogs
              setOpenStatusDlg={setStatus}
              description={`You already bought ${alreadyticketcount1} tickets you can buy  Only ${
                15 - alreadyticketcount1
              } tickets`}
              status={STATUS.WARNING}
            />
          )}
          {status && status_dlg.warning && ticket_price === 0 && (
            <CustomizedStatusDialogs
              setOpenStatusDlg={setStatus}
              description={`Please wait to add the Ticket amount!`}
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
                    setOpenLoader(true);
                    handleBuyTicket();
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
