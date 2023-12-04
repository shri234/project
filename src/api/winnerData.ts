import axios from "axios";

export const winnerData = async (path: string) => {
  return await axios
    .get(`${process.env.REACT_APP_IP}/ticket/get-${path}-winner`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res)
    .catch((error) => error);
};
