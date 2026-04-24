import { useMutation, useQueryClient } from "@tanstack/react-query";
import { messageQueryFeedback as fb } from "@/helpers/MessageQueryFeedback.helper";
import { dictionaryQueryClient } from "@/constants/dictionaryQueryClient.const";
import type { IUser } from "@/types/IUser.type";

export function useDeleteUserMutation() {
  const queryClient = useQueryClient();
  const entity = dictionaryQueryClient["users"];

  return useMutation({
    mutationFn: entity.service.deleteItems,
    onMutate: async ({ ids }: { ids: string[] }) => {
      await queryClient.cancelQueries({ queryKey: [entity.key] });

      const previousClients = queryClient.getQueryData<IUser[]>([entity.key]);

      queryClient.setQueryData<IUser[]>([entity.key], (old) =>
        old?.filter((client) => !ids.includes(client.id)),
      );

      return {
        previousClients,
        toastId: fb.deleteLoading(entity, ids.length),
      };
    },
    onError: (_err, _clientId, context) => {
      queryClient.setQueryData([entity.key], context?.previousClients);

      if (context?.toastId) fb.deleteError(entity, context.toastId);
    },
    onSuccess: (_, variables, context) => {
      if (context?.toastId)
        fb.deleteSuccess(entity, variables.ids.length, context.toastId);
    },
  });
}
