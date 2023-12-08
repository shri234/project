import useSWR from "swr";

export const fetcher = async (...args: Parameters<typeof fetch>) => {
  const res = await fetch(...args);
  return res.json() as any;
};

function useUserTicketCount(path: string) {
  const { data, mutate, isValidating, error } = useSWR<any>(
    `${
      process.env.REACT_APP_IP
    }/ticket/get-${path}-ticket-count?userId=${sessionStorage.getItem(
      "userId"
    )}`,
    fetcher
  );

  return {
    userTicketCount: data,
    ticketcountIsLoading: !data && !error,
    isError: error,
    isValidating,
    ticketcountRefetch: mutate,
  };
}

export default useUserTicketCount;
