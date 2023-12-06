import axios from "axios";
import moment from "moment";

let date = new Date();
let datee = moment(date).format("YYYY-MM-DD");
export const walletData = async () => {
  return await axios
    .get(
      `${process.env.REACT_APP_IP}/ticket/getWalletAmount?userId=${sessionStorage.getItem("userId")}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res)
    .catch((error) => error);
};
