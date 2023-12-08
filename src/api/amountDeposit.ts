import axios from "axios";

export const amountDeposit = async (body: any) => {
  return await axios
    .post(`${process.env.REACT_APP_IP}/ticket/addWallet`, body)
    .then((res) => res)
    .catch((error) => error);
};
