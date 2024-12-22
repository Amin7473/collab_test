import { useQueryClient, useMutation } from "@tanstack/react-query";
import makeApiRequest from '@/common/services/makeApiRequest'; 
import apiEndPoints from "@/common/services/apiEndPoints";
import { SuccessToast } from "@/common/services/toasterServices";

export function useSendMessage() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (data) => {
        const formData = new FormData();
        formData.append('message', data.message);
        formData.append('user_id', data?.user_id);

        if (data.attachments && data.attachments.length > 0) {
          data.attachments.forEach((file, index) => {
            formData.append(`attachments`, file); // `attachments` will be sent as an array
          });
        }

        const response = await makeApiRequest.post(
          apiEndPoints.MESSAGES,
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
