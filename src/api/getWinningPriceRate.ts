import axios from "axios";

export const getWinningPriceRate = async (path: string) => {
  const formatteddate = `${new Date().getFullYear()}-${
    new Date().getMonth() + 1
  }-${new Date().getDate()}`;
  return await axios
    .get(
      `${process.env.REACT_APP_IP}/ticket/get-${path}-price-rate?date=${formatteddate}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res)
    .catch((error) => error);
};
