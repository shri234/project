import axios from "axios";

export const agentCreation = async (body: any) => {
  await axios
    .post(`${process.env.REACT_APP_IP}/user/addAgent`, body)
    .then((res) => res)
    .catch((error) => error);
};
