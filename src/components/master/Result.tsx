import { Box, Divider } from "@mui/material";
import { FC, useEffect, useState } from "react";

import MasterNavbar from "./Navbar";
import { isAuthenticated } from "../isAuthenticated/IsAuthenticated";

import Loader from "../loader/Loader";
import MasterHistoryTable from "./HistoryTable";
import { Ticket, TicketPublish } from "../Result/TicketPublish";
import { TicketRatePublish } from "../Result/TicketRatePublish";
import { WinningPriceTicket } from "../Result/WinningPrice";
import { TicketFilter } from "../Result/TicketFilter";
import { winningTicketPublish } from "../../api/winningTicketPublish";
import {
  STATUS,
  isMonthlyPublishIsAvailableandUserCannotBuyTicket,
} from "../../utill";
import { MonthlyTicketPublish } from "../Result/MonthlyPublishTicket";
import { winningTicket } from "../../api/winningTicket";
import usePriceData from "../../swr/price_data";
import { CustomizedStatusDialogs } from "../custom-table/CustomDialog";

const MasterResult: FC<{ title: string }> = ({ title }) => {
  const handlePath = () => {
    return title === "Daily"
      ? "daily"
      : title === "Weekly"
      ? "weekly"
      : "monthly";
  };
  const { price_data, pricedataIsLoading, pricedataRefetch } = usePriceData(
    handlePath()
  );
  const [price, setPrice] = useState({
    priceFirstDigit: price_data?.data?.priceRate_splitup[0].first_digit,
    priceSecondDigit: price_data?.data?.priceRate_splitup[0].second_digit,
    priceThirdDigit: price_data?.data?.priceRate_splitup[0].third_digit,
    priceFourthDigit: price_data?.data?.priceRate_splitup[0].fourth_digit,
  });
  const [ticket, setTicket] = useState<Ticket>({
    firstdigit: "",
    seconddigit: "",
    thirddigit: "",
    fourthdigit: "",
  });
  const [monthly_ticket_1, setMonthlyTicket1] = useState<Ticket>({
    firstdigit: "",
    seconddigit: "",
    thirddigit: "",
    fourthdigit: "",
  });
  const [monthly_ticket_2, setMonthlyTicket2] = useState<Ticket>({
    firstdigit: "",
    seconddigit: "",
    thirddigit: "",
    fourthdigit: "",
  });
  const [monthly_ticket_3, setMonthlyTicket3] = useState<Ticket>({
    firstdigit: "",
    seconddigit: "",
    thirddigit: "",
    fourthdigit: "",
  });

  const [result_or_ticket, setStatus] = useState("");
  const [open_publish_dlg, setOpenPublishDlg] = useState(false);
  const [is_result_published, setResultPublished] = useState(false);
  const [loader, setLoader] = useState(false);

  const isPriceRatePublished = () => {
    if (
      price.priceFirstDigit &&
      price.priceSecondDigit &&
      price.priceThirdDigit &&
      price.priceFourthDigit
    )
      return true;
    return false;
  };

  const handlePublishResult = async () => {
    if (!isPriceRatePublished()) {
      setOpenPublishDlg(true);
      return;
    }

    setLoader(true);
    const body = [
      { digit: ticket.firstdigit },
      { digit: ticket.seconddigit },
      { digit: ticket.thirddigit },
      { digit: ticket.fourthdigit },
    ];

    await winningTicketPublish(handlePath(), body)
      .then((res) => {
        setLoader(false);

        window.location.href = `/master-${handlePath()}-result`;
      })
      .catch((error) => {
        setLoader(false);
        console.log(error);
      });
  };

  const handlePublishMonthlyResult = async () => {
    setLoader(true);
    const body = {
      ticket_1:
        monthly_ticket_1.firstdigit +
        monthly_ticket_1.seconddigit +
        monthly_ticket_1.thirddigit +
        monthly_ticket_1.fourthdigit,
      ticket_2:
        monthly_ticket_2.firstdigit +
        monthly_ticket_2.seconddigit +
        monthly_ticket_2.thirddigit +
        monthly_ticket_2.fourthdigit,
      ticket_3:
        monthly_ticket_3.firstdigit +
        monthly_ticket_3.seconddigit +
        monthly_ticket_3.thirddigit +
        monthly_ticket_3.fourthdigit,
    };

    await winningTicketPublish(handlePath(), body)
      .then((res) => {
        console.log(res, "res");
        setLoader(false);

        window.location.href = `/master-${handlePath()}-result`;
      })
      .catch((error) => {
        setLoader(false);
        console.log(error);
      });
  };

  useEffect(() => {
    pricedataRefetch().then((res) => {
      if (res?.data?.priceRate_splitup)
        setPrice({
          priceFirstDigit: res.data.priceRate_splitup[0].first_digit,
          priceSecondDigit: res.data.priceRate_splitup[0].second_digit,
          priceThirdDigit: res.data.priceRate_splitup[0].third_digit,
          priceFourthDigit: res.data.priceRate_splitup[0].fourth_digit,
        });
    });
  }, [price_data, pricedataIsLoading]);

  useEffect(() => {
    winningTicket(handlePath())
      .then((res) => {
        if (handlePath() === "monthly") {
          if (res.data?.data?.length > 0) {
            const tmp_1: string[] =
              res.data?.data[0].winning_ticket[0].result_ticket_1.split("");
            if (tmp_1.length > 0) {
              setMonthlyTicket1(
                (pre) =>
                  ({
                    ...pre,
                    firstdigit: tmp_1.length > 0 ? tmp_1[0] : "",
                    seconddigit: tmp_1.length > 0 ? tmp_1[1] : "",
                    thirddigit: tmp_1.length > 0 ? tmp_1[2] : "",
                    fourthdigit: tmp_1.length > 0 ? tmp_1[3] : "",
                  } as Ticket)
              );
            }
            const tmp_2: string[] =
              res.data?.data[0].winning_ticket[0].result_ticket_2.split("");

            if (tmp_2.length > 0) {
              setMonthlyTicket2(
                (pre) =>
                  ({
                    ...pre,
                    firstdigit: tmp_2.length > 0 ? tmp_2[0] : "",
                    seconddigit: tmp_2.length > 0 ? tmp_2[1] : "",
                    thirddigit: tmp_2.length > 0 ? tmp_2[2] : "",
                    fourthdigit: tmp_2.length > 0 ? tmp_2[3] : "",
                  } as Ticket)
              );
            }
            const tmp_3: string[] =
              res.data?.data[0].winning_ticket[0].result_ticket_3.split("");
            if (tmp_3.length > 0) {
              setMonthlyTicket3(
                (pre) =>
                  ({
                    ...pre,
                    firstdigit: tmp_3.length > 0 ? tmp_3[0] : "",
                    seconddigit: tmp_3.length > 0 ? tmp_3[1] : "",
                    thirddigit: tmp_3.length > 0 ? tmp_3[2] : "",
                    fourthdigit: tmp_3.length > 0 ? tmp_3[3] : "",
                  } as Ticket)
              );
              setResultPublished(true);
            }
          }
        } else if (res.data.data) {
          const tmp: string[] = res.data.data.result_ticket.split("");

          if (tmp.length > 0) {
            setTicket(
              (pre) =>
                ({
                  ...pre,
                  firstdigit: tmp.length > 0 ? tmp[0] : "",
                  seconddigit: tmp.length > 0 ? tmp[1] : "",
                  thirddigit: tmp.length > 0 ? tmp[2] : "",
                  fourthdigit: tmp.length > 0 ? tmp[3] : "",
                } as Ticket)
            );
            setResultPublished(true);
          }
        }
      })
      .catch((error) => {});
  }, []);

  return (
    isAuthenticated("master") && (
      <Box>
        <MasterNavbar path="/spin-wheel" />
        {loader && <Loader />}
        {open_publish_dlg && (
          <CustomizedStatusDialogs
            setOpenStatusDlg={setOpenPublishDlg}
            description="Price Rate need to publish"
            status={STATUS.WARNING}
          />
        )}
        <Box
          component={"div"}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Box
            component={"div"}
            sx={{
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              borderRadius: "5px",
              py: 2,
              mt: 2,
              minWidth: "300px",
            }}
          >
            <Box>
              <h2>{title} Spin</h2>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  m: 2,
                }}
              >
                <Box
                  sx={{
                    background: "green",
                    color: "#fff",
                    fontWeight: "600",
                    p: 1,
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  component={"div"}
                  onClick={() =>
                    setStatus((prev) => (prev === "result" ? "" : "result"))
                  }
                >
                  RESULT
                </Box>

                <Box
                  sx={{
                    background: "#191a5e",
                    color: "#fff",
                    fontWeight: "600",
                    p: 1,
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  component={"div"}
                  onClick={() =>
                    setStatus((prev) => (prev === "history" ? "" : "history"))
                  }
                >
                  HISTORY
                </Box>

                <Box
                  sx={{
                    background: "#191a5e",
                    color: "#fff",
                    fontWeight: "600",
                    cursor: "pointer",
                    p: 1,
                    borderRadius: "5px",
                  }}
                  component={"div"}
                  onClick={() =>
                    setStatus((prev) => (prev === "ticket" ? "" : "ticket"))
                  }
                >
                  AMOUNT
                </Box>
              </Box>
            </Box>
            {result_or_ticket === "result" && (
              <>
                <Divider sx={{ my: 1 }} />
                <h2>{title} Spin Result</h2>
                <TicketFilter
                  ticket={ticket}
                  setTicket={setTicket}
                  path={title}
                />
                <Divider sx={{ my: 1 }} />

                {title === "Monthly" ? (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "column",
                        alignItems: "center",
                        px: 2,
                      }}
                    >
                      <Box
                        sx={{
                          p: 1,
                          borderRadius: "5px",
                          background: "#d67349",
                          color: "#fff",
                          fontWeight: "600",
                          mb: 2,
                        }}
                      >
                        Result:
                      </Box>

                      <MonthlyTicketPublish
                        setLoader={setLoader}
                        ticket={monthly_ticket_1}
                        setTicket={setMonthlyTicket1}
                        path={title}
                      />
                      <br />
                      <MonthlyTicketPublish
                        setLoader={setLoader}
                        ticket={monthly_ticket_2}
                        setTicket={setMonthlyTicket2}
                        path={title}
                      />
                      <br />
                      <MonthlyTicketPublish
                        setLoader={setLoader}
                        ticket={monthly_ticket_3}
                        setTicket={setMonthlyTicket3}
                        path={title}
                      />
                      <Box
                        onClick={() => {
                          if (
                            !is_result_published &&
                            monthly_ticket_1.firstdigit.length === 1 &&
                            monthly_ticket_1.seconddigit.length === 1 &&
                            monthly_ticket_1.thirddigit.length === 1 &&
                            monthly_ticket_1.fourthdigit.length === 1 &&
                            monthly_ticket_2.firstdigit.length === 1 &&
                            monthly_ticket_2.seconddigit.length === 1 &&
                            monthly_ticket_2.thirddigit.length === 1 &&
                            monthly_ticket_2.fourthdigit.length === 1 &&
                            monthly_ticket_3.firstdigit.length === 1 &&
                            monthly_ticket_3.seconddigit.length === 1 &&
                            monthly_ticket_3.thirddigit.length === 1 &&
                            monthly_ticket_3.fourthdigit.length === 1 &&
                            isMonthlyPublishIsAvailableandUserCannotBuyTicket()
                          ) {
                            setLoader((pre) => !pre);
                            handlePublishMonthlyResult();
                          } else {
                            alert("select");
                          }
                        }}
                        sx={{
                          p: 1,
                          mt: 1,
                          borderRadius: "5px",
                          background:
                            !is_result_published &&
                            isMonthlyPublishIsAvailableandUserCannotBuyTicket()
                              ? "#7a1160"
                              : "grey",
                          color: "#fff",
                          fontWeight: "600",
                          cursor:
                            !is_result_published &&
                            isMonthlyPublishIsAvailableandUserCannotBuyTicket()
                              ? "pointer"
                              : "no-drop",
                        }}
                      >
                        PUBLISH
                      </Box>
                    </Box>
                  </>
                ) : (
                  <TicketPublish
                    setLoader={setLoader}
                    ticket={ticket}
                    setTicket={setTicket}
                    path={title}
                    handlePublishResult={handlePublishResult}
                    isResultPublished={is_result_published}
                    isPriceRatePublished={isPriceRatePublished()}
                  />
                )}
              </>
            )}

            {result_or_ticket === "ticket" && (
              <>
                <TicketRatePublish path={title} />
                {title !== "Monthly" && <WinningPriceTicket path={title} />}
              </>
            )}

            {result_or_ticket === "history" && (
              <MasterHistoryTable path={title} />
            )}
          </Box>
        </Box>
      </Box>
    )
  );
};
export default MasterResult;
