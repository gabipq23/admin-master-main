import { dictionaryQueryClient } from "@/constants/dictionaryQueryClient.const";
import { useCreateProductMutation } from "@/hooks/products/useCreateProductMutation";
import { useDeleteProductMutation } from "@/hooks/products/useDeleteProductMutation";
import { useProductQuery } from "@/hooks/products/useProductQuery";
import { useUpdateProductMutation } from "@/hooks/products/useUpdateProductMutation";
import type { IProduct } from "@/types/IProduct.type";
import type { UploadFile } from "antd";

export const entityPage = dictionaryQueryClient.products;
export const productModel = "telecom" as const;
export const useCreateEntity = () => useCreateProductMutation(productModel);
export const useUpdateEntity = () => useUpdateProductMutation(productModel);
export const useListEntity = () => useProductQuery({ model: productModel });
export const useDeleteEntity = () => useDeleteProductMutation(productModel);
export type EntityType = IProduct;

export type FormValues = {
  name: string;
  company: string;
  business_partner: string;
  badge?: string;
  offer_title?: string;
  offer_subtitle?: string;
  client_type: "PF" | "PJ";
  uf?: string[];
  company_id?: number | null;
  partner_id?: number | null;
  category?: string;
  pricing?: {
    base_monthly?: { current_price?: number; original_price?: number };
    installation?: { current_price?: number };
  };
  offer_conditions?: UploadFile[];
  details?: {
    title?: string;
    description?: string;
    highlight_top?: boolean;
    highlight_bottom?: boolean;
    images?: (UploadFile | string)[];
  }[];
};
