import axios from "axios";

export const buyTicketCount = async (body: any) => {
  return await axios
    .post(
      `${
        process.env.REACT_APP_IP
      }/ticket/addTicketCount?userId=${sessionStorage.getItem("userId")}`,
      body
    )
    .then((res) => res)
    .catch((error) => error);
};
