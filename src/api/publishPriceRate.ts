import axios from "axios";

export const publishPriceRate = async (path: string, body: any) => {
  return await axios
    .post(`${process.env.REACT_APP_IP}/ticket/add-${path}-price-rate`, body)
    .then((res) => res)
    .catch((error) => error);
};
