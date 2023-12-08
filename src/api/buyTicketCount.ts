import axios from "axios";

export const buyTicketCount = async (body: any, path: string) => {
  return await axios
    .post(
      `${
        process.env.REACT_APP_IP
      }/ticket/add-${path}-ticket-count?userId=${sessionStorage.getItem(
        "userId"
      )}`,
      body
    )
    .then((res) => res)
    .catch((error) => error);
};

