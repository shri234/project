import axios from "axios";

export const ticketCount = async (path: string) => {
  const url =
    path === "daily" ? "daily" : path === "weekly" ? "weekly" : "monthly";
  return await axios
    .get(
      `${
        process.env.REACT_APP_IP
      }/ticket/get-${url}-ticket-count?userId=${sessionStorage.getItem(
        "userId"
      )}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res)
    .catch((error) => error);
};
