import axios from "axios";
import moment from "moment";

let date = new Date();
let datee = moment(date).format("YYYY-MM-DD");
export const ticketPriceData = async (path: string) => {
  return await axios
    .get(
      `${process.env.REACT_APP_IP}/ticket/get-${path}-ticket-rate?date=${datee}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res)
    .catch((error) => error);
};
