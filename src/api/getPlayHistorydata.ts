import axios from "axios";

export const getPlayHistoryData = async (
  username: string,
  current_page: number
) => {
  return await axios
    .get(
      `${process.env.REACT_APP_IP}/ticket/getHistory?username=${username}&pageno=${current_page}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res)
    .catch((error) => error);
};
