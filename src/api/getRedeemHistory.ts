import axios from "axios";

export const getRedeemHistory = async (current_page: number) => {
  return await axios
    .get(
      `${
        process.env.REACT_APP_IP
      }/ticket/getWalletHistory?userId=${sessionStorage.getItem(
        "userid"
      )}&pageno=${current_page}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res)
    .catch((error) => error);
};
