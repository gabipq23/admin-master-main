import { useMutation, useQueryClient } from "@tanstack/react-query";
import { messageQueryFeedback as fb } from "@/helpers/MessageQueryFeedback.helper";
import { dictionaryQueryClient } from "@/constants/dictionaryQueryClient.const";
import type {
  IProduct,
  IProductsResponse,
  IUpdateProductPayload,
  ProductModel,
} from "@/types/IProduct.type";

export function useUpdateProductMutation(model: ProductModel = "telecom") {
  const queryClient = useQueryClient();
  const entity = dictionaryQueryClient["products"];

  return useMutation({
    mutationFn: async ({
      id,
      entity: payload,
      conditionFiles,
      detailsImages,
      extrasImages,
    }: IUpdateProductPayload) => {
      await entity.service.update(id, payload, model);

      if (conditionFiles?.length) {
        await entity.service.uploadConditions(id, conditionFiles, model);
      }

      if (detailsImages?.length) {
        await Promise.all(
          detailsImages.map(({ detailIndex, files }) =>
            entity.service.uploadDetails(id, detailIndex, files, model),
          ),
        );
      }

      if (extrasImages?.length) {
        await Promise.all(
          extrasImages.map(({ extraId, files }) =>
            entity.service.uploadExtras(id, extraId, files, model),
          ),
        );
      }
    },
    onMutate: async ({ id, entity: payload }: IUpdateProductPayload) => {
      await queryClient.cancelQueries({ queryKey: [entity.key] });

      const previousQueries = queryClient.getQueriesData<IProductsResponse>({
        queryKey: [entity.key],
      });

      queryClient.setQueriesData<IProductsResponse>(
        { queryKey: [entity.key] },
        (old) => {
          if (!old) return old;

          return {
            ...old,
            products: old.products.map((product: IProduct) => {
              if (product.id !== id) return product;
              return { ...product, ...payload } as IProduct;
            }),
          };
        },
      );

      return { previousQueries, toastId: fb.updateLoading(entity.name) };
    },
    onError: (_err, _payload, context) => {
      context?.previousQueries?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });

      if (context?.toastId) fb.updateError(entity.name, context.toastId);
    },
    onSuccess: (_data, _payload, context) => {
      queryClient.invalidateQueries({
        queryKey: [entity.key],
      });

      if (context?.toastId) fb.updateSuccess(entity.name, context.toastId);
    },
  });
}
