import axios from "axios";

export const contactUs = async (body: any) => {
  return await axios
    .post(`${process.env.REACT_APP_IP}/user/sendMail`, body)
    .then((res) => res)
    .catch((error) => error);
};
