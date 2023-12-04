import { Box, Divider, Input, Pagination } from "@mui/material";
import { FC, useState, useEffect, Dispatch, SetStateAction } from "react";

import MasterNavbar from "./Navbar";
import { isAuthenticated } from "../isAuthenticated/IsAuthenticated";

import Loader from "../loader/Loader";
import MasterHistoryTable from "./HistoryTable";
import { Ticket, TicketPublish } from "../Result/TicketPublish";
import { TicketRatePublish } from "../Result/TicketRatePublish";
import { WinningPriceTicket } from "../Result/WinningPrice";
import { TicketFilter } from "../Result/TicketFilter";

const MasterResult: FC<{ title: string }> = ({ title }) => {
  const [ticket, setTicket] = useState<Ticket>({
    firstdigit: "",
    seconddigit: "",
    thirddigit: "",
    fourthdigit: "",
  });

  const [result_or_ticket, setStatus] = useState("");

  const [loader, setLoader] = useState(false);

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
                {/* {sessionStorage.getItem("role") === "master" && ( */}
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
                {/* )} */}
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
                    <TicketPublish
                      setLoader={setLoader}
                      ticket={ticket}
                      setTicket={setTicket}
                      path={title}
                    />
                    <TicketPublish
                      setLoader={setLoader}
                      ticket={ticket}
                      setTicket={setTicket}
                      path={title}
                    />
                    <TicketPublish
                      setLoader={setLoader}
                      ticket={ticket}
                      setTicket={setTicket}
                      path={title}
                    />
                  </>
                ) : (
                  <TicketPublish
                    setLoader={setLoader}
                    ticket={ticket}
                    setTicket={setTicket}
                    path={title}
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
