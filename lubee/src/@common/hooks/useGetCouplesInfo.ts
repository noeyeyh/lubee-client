import { useQuery } from "react-query";
import { getCouplesInfo } from "@common/api/getCouplesInfo";

export function useGetCouplesInfo() {
  const { data, isLoading, error } = useQuery("getCouplesInfo", getCouplesInfo, {
    onError: (error) => {
      console.log("에러 발생", error);
    },
  });
  return { data, isLoading, error };
}
