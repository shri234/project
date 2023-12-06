import useSWR from "swr";
import { fetcher } from "./wallet_ticket_count";

function useTableTicketData(path: string) {
  const formatteddate = `${new Date().getFullYear()}-${
    new Date().getMonth() + 1
  }-${new Date().getDate()}`;

  const { data, mutate, isValidating, error } = useSWR<any>(
    `${
      process.env.REACT_APP_IP
    }/ticket/get-${path}-tickets?userId=${sessionStorage.getItem(
      "userId"
    )}&date=${formatteddate}`,
    fetcher
  );

  return {
    use_table_tickets_data: data,
    table_ticket_isLoading: !data && !error,
    isError: error,
    isValidating,
    tableTicketRefetch: mutate,
  };
}

export default useTableTicketData;
