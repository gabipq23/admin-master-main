import { useMutation, useQueryClient } from "@tanstack/react-query";
import { messageQueryFeedback as fb } from "@/helpers/MessageQueryFeedback.helper";
import { dictionaryQueryClient } from "@/constants/dictionaryQueryClient.const";
import type { IUpdateUser, IUser, IUserResponse } from "@/types/IUser.type";

export function useUpdateUserMutation() {
  const queryClient = useQueryClient();
  const entity = dictionaryQueryClient["users"];

  return useMutation({
    mutationFn: entity.service.update,
    onMutate: async (newEntity: IUpdateUser) => {
      await queryClient.cancelQueries({ queryKey: [entity.key] });

      const previousClients = queryClient.getQueryData<IUserResponse>([
        entity.key,
      ]);
      //basicamente atualiza a info da query sem precisar chamar o get novamente
      queryClient.setQueryData<IUserResponse>([entity.key], (old) => {
        if (!old) return old;
        return {
          ...old,
          users: old.users.map((entity: IUser) => {
            if (entity.user_id === newEntity.user_id) {
              return { ...entity, ...newEntity };
            }
            return entity;
          }),
        };
      });

      return { previousClients, toastId: fb.updateLoading(entity.name) };
    },
    onError: (_err, _clientId, context) => {
      queryClient.setQueryData([entity.key], context?.previousClients);
      if (context?.toastId) fb.updateError(entity.name, context?.toastId);
    },
    onSuccess: (_err, _clientId, context) => {
      if (context?.toastId) fb.updateSuccess(entity.name, context?.toastId);
    },
  });
}
