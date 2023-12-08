import axios from "axios";

export const tableTicketDatas = async (path: string) => {
  const formatteddate = `${new Date().getFullYear()}-${
    new Date().getMonth() + 1
  }-${new Date().getDate()}`;

  return await axios
    .get(
      `${
        process.env.REACT_APP_IP
      }/ticket/get-${path}-tickets?userId=${sessionStorage.getItem(
        "userId"
      )}&&date=${formatteddate}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res)
    .catch((error) => error);
};
