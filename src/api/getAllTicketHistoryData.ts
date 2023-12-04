import axios from "axios";

export const getAllTicketHistoryData = async (current_page: number) => {
  return await axios
    .get(
      `${process.env.REACT_APP_IP}/ticket/getAllHistory?&pageno=${current_page}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res)
    .catch((error) => error);
};
