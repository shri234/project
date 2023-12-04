import axios from "axios";

export const winningTicket = async (path: string) => {
  return await axios
    .get(`${process.env.REACT_APP_IP}/ticket/get-${path}-result`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res)
    .catch((error) => error);
};
