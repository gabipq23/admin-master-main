import { dictionaryQueryClient } from "@/constants/dictionaryQueryClient.const";
import { useCreateProductMutation } from "@/hooks/products/useCreateProductMutation";
import { useDeleteProductMutation } from "@/hooks/products/useDeleteProductMutation";
import { useProductQuery } from "@/hooks/products/useProductQuery";
import { useUpdateProductMutation } from "@/hooks/products/useUpdateProductMutation";
import type { IProduct } from "@/types/IProduct.type";

export const entityPage = dictionaryQueryClient.products;
export const productModel = "telecom" as const;
export const useCreateEntity = () => useCreateProductMutation(productModel);
export const useUpdateEntity = () => useUpdateProductMutation(productModel);
export const useListEntity = () => useProductQuery({ model: productModel });
export const useDeleteEntity = () => useDeleteProductMutation(productModel);
export type EntityType = IProduct;

export type FormValues = Partial<IProduct>;
