import { useMutation, useQueryClient } from "@tanstack/react-query";
import { messageQueryFeedback as fb } from "@/helpers/MessageQueryFeedback.helper";
import { dictionaryQueryClient } from "@/constants/dictionaryQueryClient.const";
import type {
  ICreateProductPayload,
  ProductModel,
} from "@/types/IProduct.type";

export function useCreateProductMutation(model: ProductModel = "telecom") {
  const queryClient = useQueryClient();
  const entity = dictionaryQueryClient["products"];

  return useMutation({
    mutationFn: async ({
      entity: payload,
      conditionFiles,
      detailsImages,
      extrasImages,
    }: ICreateProductPayload) => {
      const createdProduct = await entity.service.create(payload, model);

      if (conditionFiles?.length) {
        await entity.service.uploadConditions(
          createdProduct.id,
          conditionFiles,
          model,
        );
      }

      if (detailsImages?.length) {
        await Promise.all(
          detailsImages.map(({ detailIndex, files }) =>
            entity.service.uploadDetails(
              createdProduct.id,
              detailIndex,
              files,
              model,
            ),
          ),
        );
      }

      if (extrasImages?.length) {
        await Promise.all(
          extrasImages.map(({ extraId, files }) =>
            entity.service.uploadExtras(
              createdProduct.id,
              extraId,
              files,
              model,
            ),
          ),
        );
      }

      return createdProduct;
    },
    onMutate: () => {
      return {
        toastId: fb.createLoading(entity.name),
      };
    },
    onError: (_err, _payload, context) => {
      if (context?.toastId) fb.createError(entity.name, context.toastId);
    },
    onSuccess: (_data, _payload, context) => {
      queryClient.invalidateQueries({
        queryKey: [entity.key],
      });
      if (context?.toastId) fb.createSuccess(entity.name, context.toastId);
    },
  });
}
