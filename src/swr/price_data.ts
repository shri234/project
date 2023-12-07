import moment from "moment";

import useSWR from "swr";
let date = new Date();
let datee = moment(date).format("YYYY-MM-DD");
export const fetcher = async (...args: Parameters<typeof fetch>) => {
  const res = await fetch(...args);
  return res.json() as any;
};

function usePriceData(path: string) {
  const { data, mutate, isValidating, error } = useSWR<any>(
    `${process.env.REACT_APP_IP}/ticket/get-${path}-price-rate?date=${datee}`,
    fetcher
  );

  return {
    price_data: data,
    pricedataIsLoading: !data && !error,
    isError: error,
    isValidating,
    pricedataRefetch: mutate,
  };
}

export default usePriceData;
