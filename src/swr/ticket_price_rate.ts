import moment from "moment";

import useSWR from "swr";
let date = new Date();
let datee = moment(date).format("YYYY-MM-DD");
export const fetcher = async (...args: Parameters<typeof fetch>) => {
  const res = await fetch(...args);
  return res.json() as any;
};

function useTicketPriceRate(path: string) {
  const { data, mutate, isValidating, error } = useSWR<any>(
    `${process.env.REACT_APP_IP}/ticket/get-${path}-ticket-rate?date=${datee}`,
    fetcher
  );

  return {
    ticket_price_rate: data,
    ticketpriceIsLoading: !data && !error,
    isError: error,
    isValidating,
    ticketpriceRefetch: mutate,
  };
}

export default useTicketPriceRate;
