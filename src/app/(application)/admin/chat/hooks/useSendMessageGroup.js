import { useQueryClient, useMutation } from "@tanstack/react-query";
import makeApiRequest from '@/common/services/makeApiRequest'; 
import apiEndPoints from "@/common/services/apiEndPoints";
import createQueryParamsForGetReq from "@/common/services/createQueryParamsForGetReq";
import { SuccessToast } from "@/common/services/toasterServices";

export function useSendMessageGroup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      const formData = new FormData();
      formData.append('message', data.message);
      formData.append('group_id', data?.group_id);

      if (data.attachments && data.attachments.length > 0) {
        data.attachments.forEach((file, index) => {
          formData.append(`attachments`, file); // `attachments` will be sent as an array
        });
      }

      const response = await makeApiRequest.post(
        apiEndPoints.GROUP_MESSAGES,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      return response?.data;
    },
    onSuccess: (data) => {
      SuccessToast({ text: data?.message });
      queryClient.invalidateQueries({ queryKey: ["messages"] }); // Optional, if you want to refresh messages
    },
  });
  }
