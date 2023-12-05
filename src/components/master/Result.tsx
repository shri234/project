import { Box, Divider } from "@mui/material";
import { FC, useState } from "react";

import MasterNavbar from "./Navbar";
import { isAuthenticated } from "../isAuthenticated/IsAuthenticated";

import Loader from "../loader/Loader";
import MasterHistoryTable from "./HistoryTable";
import { Ticket, TicketPublish } from "../Result/TicketPublish";
import { TicketRatePublish } from "../Result/TicketRatePublish";
import { WinningPriceTicket } from "../Result/WinningPrice";
import { TicketFilter } from "../Result/TicketFilter";
import { winningTicketPublish } from "../../api/winningTicketPublish";
import { monthlyPublishResultIsAvailable } from "../../utill";
import { MonthlyTicketPublish } from "../Result/MonthlyPublishTicket";

const MasterResult: FC<{ title: string }> = ({ title }) => {
  const handlePath = () => {
    return title === "Daily"
      ? "daily"
      : title === "Weekly"
      ? "weekly"
      : "monthly";
  };
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

  const [loader, setLoader] = useState(false);

  const handlePublishResult = async () => {
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
        if (res.status === 200) {
          window.alert(
            `Result Published successfully! There are ${res.data.Winners} winners.`
          );
        }
        window.location.href = "/daily-result";
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

        window.location.href = `/${handlePath()}-result`;
      })
      .catch((error) => {
        setLoader(false);
        console.log(error);
      });
  };
  return (
    isAuthenticated("master") && (
      <Box>
        <MasterNavbar path="/spin-wheel" />
        {loader && <Loader />}
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
                        handlePublishResult={handlePublishMonthlyResult}
                      />
                      <br />
                      <MonthlyTicketPublish
                        setLoader={setLoader}
                        ticket={monthly_ticket_2}
                        setTicket={setMonthlyTicket2}
                        path={title}
                        handlePublishResult={handlePublishMonthlyResult}
                      />
                      <br />
                      <MonthlyTicketPublish
                        setLoader={setLoader}
                        ticket={monthly_ticket_3}
                        setTicket={setMonthlyTicket3}
                        path={title}
                        handlePublishResult={handlePublishMonthlyResult}
                      />
                      <Box
                        onClick={() => {
                          if (
                            monthly_ticket_1.firstdigit.length !== 1 &&
                            monthly_ticket_1.seconddigit.length !== 1 &&
                            monthly_ticket_1.thirddigit.length !== 1 &&
                            monthly_ticket_1.fourthdigit.length !== 1 &&
                            monthly_ticket_2.firstdigit.length !== 1 &&
                            monthly_ticket_2.seconddigit.length !== 1 &&
                            monthly_ticket_2.thirddigit.length !== 1 &&
                            monthly_ticket_2.fourthdigit.length !== 1 &&
                            monthly_ticket_3.firstdigit.length !== 1 &&
                            monthly_ticket_3.seconddigit.length !== 1 &&
                            monthly_ticket_3.thirddigit.length !== 1 &&
                            monthly_ticket_3.fourthdigit.length !== 1 &&
                            monthlyPublishResultIsAvailable()
                          ) {
                            setLoader((pre) => !pre);
                            handlePublishMonthlyResult();
                          }
                        }}
                        sx={{
                          p: 1,
                          mt: 1,
                          borderRadius: "5px",
                          background: monthlyPublishResultIsAvailable()
                            ? "#7a1160"
                            : "grey",
                          color: "#fff",
                          fontWeight: "600",
                          cursor: monthlyPublishResultIsAvailable()
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

            {result_or_ticket === "history" && <MasterHistoryTable />}
          </Box>
        </Box>
      </Box>
    )
  );
};
export default MasterResult;
