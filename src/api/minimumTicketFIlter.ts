import axios from "axios";
import { Ticket } from "../components/Result/TicketPublish";

export const minimumTicketFilter = async (
  path: string,
  filter_value: number,
  ticket: Ticket
) => {
  const formatteddate = `${new Date().getFullYear()}-${
    new Date().getMonth() + 1
  }-${new Date().getDate()}`;
  return await axios
    .get(
      `${
        process.env.REACT_APP_IP
      }/ticket/get-${path}-minimum?digit=${sessionStorage.getItem(
        "digit"
      )}&digit1=${sessionStorage.getItem(
        "digit1"
      )}&digit2=${sessionStorage.getItem(
        "digit2"
      )}&digit3=${sessionStorage.getItem("digit3")}&value1=${
        ticket.firstdigit
      }&value2=${ticket.seconddigit}&value3=${ticket.thirddigit}
      &date=${formatteddate}&filter_value=${filter_value}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res)
    .catch((error) => error);
};
