import { dictionaryQueryClient } from "@/constants/dictionaryQueryClient.const";
import { useCreateProductMutation } from "@/hooks/products/useCreateProductMutation";
import { useDeleteProductMutation } from "@/hooks/products/useDeleteProductMutation";
import { useProductQuery } from "@/hooks/products/useProductQuery";
import { useUpdateProductMutation } from "@/hooks/products/useUpdateProductMutation";
import type { IProduct } from "@/types/IProduct.type";

export const entityPage = dictionaryQueryClient.products;
export const productModel = "financies" as const;
export const FINANCIES_DEFAULT_CATEGORY = "Crédito Pessoal" as const;

const financiesCategoryLabelMap: Record<string, string> = {
  "credito-pessoal": "Crédito Pessoal",
  "credito-pj": "Crédito PJ",
  seguros: "Seguros",
};

export function getFinanciesCategoryLabel(category: string) {
  return financiesCategoryLabelMap[category] ?? category;
}

export const useCreateEntity = () => useCreateProductMutation(productModel);
export const useUpdateEntity = () => useUpdateProductMutation(productModel);
export const useListEntity = (category: string = FINANCIES_DEFAULT_CATEGORY) =>
  useProductQuery({
    model: productModel,
    filters: { category },
  });
export const useDeleteEntity = () => useDeleteProductMutation(productModel);
export type EntityType = IProduct;

export type FormValues = {
  name: string;
  company: string;
  business_partner: string;
  badge?: string;
  category?: string;
  company_id?: number | null;
  partner_id?: number | null;
  // Campos específicos do FINANCIES
  interest_rate?: number;
  max_amount?: number;
  min_amount?: number;
  description?: string;
};
