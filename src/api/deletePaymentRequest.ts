import axios from "axios";

export const deltePaymentRequest = async (redeemId: number) => {
  return await axios
    .delete(
      `${process.env.REACT_APP_IP}/payment/deleteRedeem?redeemId=${redeemId}`
    )
    .then((res) => res)
    .catch((error) => error);
};
