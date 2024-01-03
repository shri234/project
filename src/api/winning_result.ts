import axios from "axios";

export const winning_ticket_result = async (path: string) => {
  return await axios
    .get(`${process.env.REACT_APP_IP}/ticket/get-${path}-price-amount`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res)
    .catch((error) => error);
};
