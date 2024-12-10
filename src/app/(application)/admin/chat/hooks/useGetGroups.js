import { useQuery } from "@tanstack/react-query";
import makeApiRequest from '@/common/services/makeApiRequest'; 
import apiEndPoints from "@/common/services/apiEndPoints";
import createQueryParamsForGetReq from "@/common/services/createQueryParamsForGetReq";

export function useGetGroups(queryData) {

  console.log(1)
  return useQuery({
    queryKey: ["admin", "chatGroups", queryData],
    queryFn: async () => {
      try {
        const res = await makeApiRequest.get(
          createQueryParamsForGetReq(apiEndPoints.GROUPS, {
            ...queryData,
          })
        );
        console.log(22, res.status, res.data);
        return res.data;
      } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Failed to fetch users");
      }
    },
  });
}
