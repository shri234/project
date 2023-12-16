import useSWR from "swr";
import { fetcher } from "./wallet_ticket_count";
  const now =new Date();


function useWinningTicket(path: string) {

  const { data, mutate, isValidating, error } = useSWR<any>(
    `${process.env.REACT_APP_IP}/ticket/get-${path}-result`,
    fetcher
  );
  
  if(now.getHours()==18 && now.getMinutes()==45){
  return {
    user_winning_ticket: data,
    winningTicketisLoading: !data && !error,
    isError: error,
    isValidating,
    userWinningTicketRefetch: mutate,
  };
}
}

export default useWinningTicket;
