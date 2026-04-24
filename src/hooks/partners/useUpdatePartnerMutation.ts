import { useMutation, useQueryClient } from "@tanstack/react-query";
import { messageQueryFeedback as fb } from "@/helpers/MessageQueryFeedback.helper";
import { dictionaryQueryClient } from "@/constants/dictionaryQueryClient.const";
import type { IUpdatePartner, IPartner } from "@/types/IPartner.type";

export function useUpdatePartnerMutation() {
  const queryClient = useQueryClient();
  const entity = dictionaryQueryClient["partners"];

  return useMutation({
    mutationFn: entity.service.update,
    onMutate: async (newEntity: IUpdatePartner) => {
      await queryClient.cancelQueries({ queryKey: [entity.key] });

      const previousClients = queryClient.getQueryData<IPartner[]>([
        entity.key,
      ]);
      //basicamente atualiza a info da query sem precisar chamar o get novamente
      queryClient.setQueryData<IPartner[]>([entity.key], (old) =>
        old?.map((entity) => {
          if (entity.id == newEntity.id) return { ...entity, ...newEntity };
          return entity;
        }),
      );

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
