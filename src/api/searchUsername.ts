import axios from "axios";

export const searchUserName = async (search_username: string) => {
  return await axios
    .get(
      `${process.env.REACT_APP_IP}/user/searchUser?username=${search_username}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res)
    .catch((error) => error);
};
