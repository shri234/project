import axios from "axios";

export const getAllTicketHistoryData = async (
  current_page: number,
  path: string
) => {
  return await axios
    .get(
      `${process.env.REACT_APP_IP}/ticket/get-all-${path}-history?&pageno=${current_page}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res)
    .catch((error) => error);
};
