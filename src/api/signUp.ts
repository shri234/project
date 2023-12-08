import axios from "axios";

export const SignUp = async (body: any) => {
  return await axios
    .post(`${process.env.REACT_APP_IP}/user/signup`, body)
    .then((res) => res)
    .catch((error) => {
      console.log(error, "api");
      return error;
    });
};
