import axios from "axios";

export const getAllUsersData = async (current_page: number) => {
  return await axios.get(
    `${process.env.REACT_APP_IP}/user/getAllUserData?pageno=${current_page}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
