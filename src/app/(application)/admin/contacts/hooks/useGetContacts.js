import { useQuery } from "@tanstack/react-query";
import makeApiRequest from '@/common/services/makeApiRequest'; 
import apiEndPoints from "@/common/services/apiEndPoints";
import createQueryParamsForGetReq from "@/common/services/createQueryParamsForGetReq";

export function useGetContacts(queryData) {
  return useQuery({
    queryKey: ["admin", "contacts", queryData],
    queryFn: async () => {
      const res = await makeApiRequest.get(
        createQueryParamsForGetReq(apiEndPoints.CONTACTS, {
          ...queryData,
        })
      );
      return res.data;
    },
  });
}
