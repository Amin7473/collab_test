import { useMutation ,useQueryClient } from "@tanstack/react-query";
import makeApiRequest from '@/common/services/makeApiRequest'; 
import apiEndPoints from "@/common/services/apiEndPoints";
import { SuccessToast } from '@/common/services/toasterServices';

export function usePostGroup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      const response = await makeApiRequest.post(
        apiEndPoints.GROUPS,
        data
      );
      return response?.data;
    },
    onSuccess: (data) => {
      queryClient?.invalidateQueries({ queryKey: ["admin", "chatGroups"] });
      SuccessToast({ text: data?.message });
    },
  });
}
