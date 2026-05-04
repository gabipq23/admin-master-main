import { httpClientAxios } from "@/http/api";
import type { IProductsResponse } from "@/types/IProduct.type";

export class ProductsService {
  static async getAll(): Promise<IProductsResponse> {
    const { data } =
      await httpClientAxios.get<IProductsResponse>(`/telecom/products`);
    return data;
  }
}
