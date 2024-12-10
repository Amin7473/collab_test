import { useQueryClient, useMutation } from "@tanstack/react-query";
import makeApiRequest from '@/common/services/makeApiRequest'; 
import apiEndPoints from "@/common/services/apiEndPoints";
import createQueryParamsForGetReq from "@/common/services/createQueryParamsForGetReq";
import { SuccessToast } from "@/common/services/toasterServices";

export function useSendMessageGroup() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (data) => {
        const response = await makeApiRequest.post(
          apiEndPoints.GROUP_MESSAGES,
          data
        );
        return response?.data;
      },
      onSuccess: (data) => {
        // queryClient?.invalidateQueries({ queryKey: ["admin", "annotators"] });
        // toast.success(data?.message);
        SuccessToast({ text: data?.message });
      },
    });
  }
