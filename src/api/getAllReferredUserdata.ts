import axios from "axios";

export const getAllReferredUsersData = async (
  agent_id: string,
  current_page: number
) => {
  return await axios
    .get(
      `${process.env.REACT_APP_IP}/user/getAllUsers?referralId=${agent_id}&pageno=${current_page}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res)
    .catch((error) => error);
};
