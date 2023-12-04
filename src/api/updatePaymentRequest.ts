import axios from "axios";

export const updatePaymentRequest = async (redeemId: number, body: any) => {
  return await axios
    .put(
      `${process.env.REACT_APP_IP}/payment/updateRedeem?redeemId=${redeemId}`,
      body
    )
    .then((res) => res)
    .catch((error) => error);
};
