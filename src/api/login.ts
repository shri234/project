import axios from "axios";

export const loginPost = async (body: any) =>
  await axios
    // .post(`${process.env.REACT_APP_IP}/user/login`, body)
  .post("https://moneyminninggame.cloud/user/login", body)
     .then((res) => res)
    .catch((error) => error);
