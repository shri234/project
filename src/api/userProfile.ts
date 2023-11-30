import axios from "axios";

export const initialRendering = async () => {
  return await axios
    .get(
      `${
        process.env.REACT_APP_IP
      }/user/getUserData?userId=${sessionStorage.getItem("userId")}`
    )
    .then((res) => res)
    .catch((error) => error);
};
