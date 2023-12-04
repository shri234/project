import axios from "axios";

export const agentProfile = async (agentid: string) => {
  return await axios
    .get(`${process.env.REACT_APP_IP}/user/getAgent?agentId=${agentid}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res)
    .catch((error) => error);
};
