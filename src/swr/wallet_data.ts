import useSWR from "swr";

export const fetcher = async (...args: Parameters<typeof fetch>) => {
  const res = await fetch(...args);
  return res.json() as any;
};

function useUserWallet(path: string) {
  const { data, mutate, isValidating, error } = useSWR<any>(
    `${
      process.env.REACT_APP_IP
    }/ticket/getWalletAmount?userId=${sessionStorage.getItem("userId")}`,
    fetcher
  );

  return {
    user_wallet: data,
    userWalletIsLoading: !data && !error,
    isError: error,
    isValidating,
    userWalletRefetch: mutate,
  };
}

export default useUserWallet;
