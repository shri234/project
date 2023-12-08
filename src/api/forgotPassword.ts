import axios from "axios";

export const forgotPassword = async (body: any) => {
  return await axios
    .post(`${process.env.REACT_APP_IP}/user/sendPasswordMail`, body)
    .then((res) => res)
    .catch((error) => error);
};
