import axios from "axios";

export const publishTicketRate = async (path: string, body: any) => {
  return await axios
    .post(`${process.env.REACT_APP_IP}/ticket/addTicketRate`, body)
    .then((res) => res)
    .catch((error) => error);
};
