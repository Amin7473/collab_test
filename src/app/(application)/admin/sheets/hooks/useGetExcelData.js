import { useQuery } from "@tanstack/react-query";
import makeApiRequest from '@/common/services/makeApiRequest'; 
import apiEndPoints from "@/common/services/apiEndPoints";
import createQueryParamsForGetReq from "@/common/services/createQueryParamsForGetReq";

export function useGetExcelData(queryData) {
  return useQuery({
    queryKey: ["admin", "sheets", queryData],
    queryFn: async () => {
      const res = await makeApiRequest.get(
        createQueryParamsForGetReq(apiEndPoints.EXCEL_DATA, {
          ...queryData,
        })
      );
      // console.log("res res", res)
      return res.data;
    },
  });
}
