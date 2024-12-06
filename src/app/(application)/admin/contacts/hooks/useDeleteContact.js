import { useMutation ,useQueryClient } from "@tanstack/react-query";
import makeApiRequest from '@/common/services/makeApiRequest'; 
import apiEndPoints from "@/common/services/apiEndPoints";
import { SuccessToast } from '@/common/services/toasterServices';

export function useDeleteContact() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      const response = await makeApiRequest.delete(
        apiEndPoints.CONTACTS,
        {
          data: data, // Ensures the payload is sent in the request body
        }
      );
      return response?.data;
    },
    onSuccess: (data) => {
      queryClient?.invalidateQueries({ queryKey: ["admin", "contacts"] });
      SuccessToast({ text: data?.message });
    },
  });
}
