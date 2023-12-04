import axios from "axios";

export const winningTicketPublish = async (path: string, body: any) => {
  const formatteddate = `${new Date().getFullYear()}-${
    new Date().getMonth() + 1
  }-${new Date().getDate()}`;

  return await axios
    .post(
      `${process.env.REACT_APP_IP}/ticket/publishResult?date=${formatteddate}`,
      body
    )
    .then((res) => res)
    .catch((error) => error);
};
