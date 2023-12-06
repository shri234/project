import axios from "axios";

export const getPlayHistoryData = async (
  username: string,
  current_page: number
) => {
  let tmp_username = username.split("(")[0].trim();
  console.log(tmp_username, "username");
  return await axios
    .get(
      `${process.env.REACT_APP_IP}/ticket/getHistory?username=${tmp_username}&pageno=${current_page}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res)
    .catch((error) => error);
};
