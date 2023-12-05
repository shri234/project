import Box from "@mui/material/Box";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { isAuthenticated } from "../isAuthenticated/IsAuthenticated";
import Loader from "../loader/Loader";
import { NoDataFoundTable } from "../custom-table/NoDataFound";
import { CustomTableHead } from "../custom-table/CustomTableHead";
import { TableLoader } from "../custom-table/TableLoader";
import { CustomizedStatusDialogs } from "../custom-table/CustomDialog";
import { STATUS } from "../../utill";
import { CustomPagination } from "../custom-table/CustomPagination";
import MasterNavbar from "./Navbar";
import { getPaymentRequestData } from "../../api/getPaymentRequestData";
import { deltePaymentRequest } from "../../api/deletePaymentRequest";
import { updatePaymentRequest } from "../../api/updatePaymentRequest";

const table_head = ["User Name", "Mail", "Request Amount", "Confirm", "Delete"];

const PaymentRequest = () => {
  const [paymentRequest, setPaymentRequest] = useState<any[]>([]);
  const [current_page, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [open_loader, setOpenLoader] = useState(false);
  const [table_loader, setOpenTableLoader] = useState(false);
  const [status_dlg, setOpenStatusDlg] = useState(false);
  const [status, setStatus] = useState({
    paid: false,
    paid_error: false,
    delete: false,
    delete_error: false,
  });

  const handleRedeem = async (redeemId: number) => {
    setOpenTableLoader(true);
    const body = {};
    await updatePaymentRequest(redeemId, body)
      .then(async (res) => {
        setOpenStatusDlg(true);
        await getPaymentRequestData(current_page).then((response) => {
          setPaymentRequest(response.data.data);
          let count = 0;
          if (response.data.data.count < 10) {
            count = Math.ceil(response.data.data.count / 10) + 1;
          } else {
            count = Math.ceil(response.data.count / 10);
          }
          setPageCount(count);
          setOpenLoader(false);
          setOpenTableLoader(false);
          setOpenTableLoader(false);
        });

        setStatus((prevStatus) => ({
          ...prevStatus,
          paid: true,
        }));
        setTimeout(() => {
          setOpenStatusDlg(false);
          setStatus((prevStatus) => ({
            ...prevStatus,
            paid: false,
          }));
        }, 5000);
      })
      .catch((error) => {
        setOpenTableLoader(false);
        setOpenStatusDlg(true);
        setStatus((prevStatus) => ({
          ...prevStatus,
          paid_error: true,
        }));
        setTimeout(() => {
          setOpenStatusDlg(false);
          setStatus((prevStatus) => ({
            ...prevStatus,
            paid_error: false,
          }));
        }, 5000);
        console.error(error);
      });
  };

  const handleDeleteRedeem = async (redeemId: number) => {
    setOpenTableLoader(true);
    await deltePaymentRequest(redeemId)
      .then(async () => {
        setOpenStatusDlg(true);
        await getPaymentRequestData(current_page).then((response) => {
          setPaymentRequest(response.data.data);
          let count = 0;
          if (response.data.data.count < 10) {
            count = Math.ceil(response.data.data.count / 10) + 1;
          } else {
            count = Math.ceil(response.data.count / 10);
          }
          setPageCount(count);
          setOpenLoader(false);
          setOpenTableLoader(false);
          setOpenTableLoader(false);
        });

        setStatus((prevStatus) => ({
          ...prevStatus,
          delete: true,
        }));
        setTimeout(() => {
          setOpenStatusDlg(false);
          setStatus((prevStatus) => ({
            ...prevStatus,
            delete: false,
          }));
        }, 5000);
      })
      .catch((err) => {
        setOpenTableLoader(false);
        setOpenStatusDlg(true);
        setStatus((prevStatus) => ({
          ...prevStatus,
          delete_error: true,
        }));
        setTimeout(() => {
          setOpenStatusDlg(false);
          setStatus((prevStatus) => ({
            ...prevStatus,
            delete_error: false,
          }));
        }, 5000);
        console.error(err);
      });
  };

  useEffect(() => {
    setOpenLoader(true);
    (async () => {
      await getPaymentRequestData(current_page)
        .then((response) => {
          setPaymentRequest(response.data.data);
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
        .catch((error) => {
          console.log(error);
          setOpenLoader(false);
          setOpenTableLoader(false);
        });
    })();
  }, []);

  useEffect(() => {
    setOpenTableLoader(true);
    (async () => {
      await getPaymentRequestData(current_page)
        .then((response) => {
          setPaymentRequest(response.data.data);
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
        .catch((error) => {
          console.log(error);
          setOpenLoader(false);
          setOpenTableLoader(false);
        });
    })();
  }, [current_page]);

  return (
    isAuthenticated("master") && (
      <Box>
        <MasterNavbar path="/master" />

        {open_loader && <Loader />}
        {status_dlg && status.paid && (
          <CustomizedStatusDialogs
            setOpenStatusDlg={setOpenStatusDlg}
            description="Paid Successfully"
            status={STATUS.SUCCESS}
          />
        )}
        {status_dlg && status.paid_error && (
          <CustomizedStatusDialogs
            setOpenStatusDlg={setOpenStatusDlg}
            description="Payment faild"
            status={STATUS.ERROR}
          />
        )}

        {status_dlg && status.delete && (
          <CustomizedStatusDialogs
            setOpenStatusDlg={setOpenStatusDlg}
            description="Deleted Successfully"
            status={STATUS.ERROR}
          />
        )}
        {status_dlg && status.delete_error && (
          <CustomizedStatusDialogs
            setOpenStatusDlg={setOpenStatusDlg}
            description="Delete Failed"
            status={STATUS.ERROR}
          />
        )}
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
                <CustomTableHead table_head={table_head} />

                <TableBody>
                  {!open_loader && table_loader ? (
                    <TableLoader colSpan={table_head.length} />
                  ) : !table_loader &&
                    !open_loader &&
                    paymentRequest.length === 0 ? (
                    <NoDataFoundTable
                      description="No Payment Request Detail found"
                      colSpan={table_head.length}
                    />
                  ) : (
                    paymentRequest.map((row) => (
                      <TableRow
                        key={row.userId}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row" align="center">
                          {row.username}
                        </TableCell>
                        <TableCell align="center">{row.email}</TableCell>
                        <TableCell align="center">{row.amount}</TableCell>
                        <TableCell align="center">
                          <Button
                            onClick={() => {
                              !row.status && handleRedeem(row.redeemId);
                            }}
                            style={
                              row.status
                                ? { background: "red" }
                                : { background: "green" }
                            }
                            sx={{ color: "#fff", fontWeight: "bold" }}
                          >
                            {row.status ? "paid" : "pay"}{" "}
                          </Button>
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            onClick={() => {
                              handleDeleteRedeem(row.redeemId);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            {paymentRequest.length !== 0 && (
              <CustomPagination
                pageCount={pageCount}
                setCurrentPage={setCurrentPage}
              />
            )}
          </Box>
        </Box>
      </Box>
    )
  );
};
export default PaymentRequest;
