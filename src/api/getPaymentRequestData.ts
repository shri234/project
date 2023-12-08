import axios from "axios";

export const getPaymentRequestData = async (current_page: number) => {
  return await axios
    .get(
      `${process.env.REACT_APP_IP}/payment/getRedeem?pageno=${current_page}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => response)
    .catch((error) => error);
};
