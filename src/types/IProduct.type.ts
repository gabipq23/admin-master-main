interface Extra {
  id: string;
  label: string;
  images: string[];
  options: {
    id: string;
    label: string;
    price: number;
    description: string;
    bonus: {
      type: string;
      price: number;
      speed: number;
      description: string;
    };
  }[];
  input_type: "radio" | "checkbox" | "checkbox_group";
}

export interface IProduct {
  id: number;
  company: string;
  company_id: number;
  business_partner: string;
  partner_id: number;
  category: string;
  client_type: "PF" | "PJ";
  landing_page: string;
  name: string;
  online: boolean;
  offer_conditions: {
    url: string;
    type: string;
  }[];
  badge: string;
  offer_title: string;
  offer_subtitle: string;
  pricing: {
    base_monthly: { current_price: number; original_price?: number };
    installation: { current_price: number; original_price?: number };
  };
  details: {
    title: string;
    images: string[];
    description: string;
    highlight_top: boolean;
    highlight_bottom: boolean;
  }[];
  extras: {
    client: Extra[];
    non_client: Extra[];
  };
  uf: string[];
  created_at: string;
  updated_at: string;
}

export interface IProductsResponse {
  success: boolean;
  products: IProduct[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export interface CreatedProductResponse {
  id: number;
}

export interface UploadedProductDetailImageResponse {
  success?: boolean;
  url?: string;
  product?: IProduct;
}

export interface IProductFilters {
  page?: number;
  perPage?: number;
  company_id?: number;
  partner_id?: number;
  category?: string;
}

export interface ICreateProductApiResponse {
  product?: {
    id?: number | string;
  };
}

export type ProductModel =
  | "telecom"
  | "telecom-vivo"
  | "financies"
  | "benefits";

export type ProductRequestEntity = FormData | Record<string, unknown>;

export interface IUpdateProductPayload {
  id: number;
  entity: Record<string, unknown>;
  conditionFiles?: File[];
  detailsImages?: { detailIndex: number; files: File[] }[];
  extrasImages?: { extraId: string; files: File[] }[];
  pricing_base_monthly?: number;
  pricing_installation?: number;
  pricing_base_monthly_original?: number;
}

export interface IDeleteProductPayload {
  ids: number[];
  model?: ProductModel;
}
export interface ICreateProductPayload {
  entity: Record<string, unknown>;
  conditionFiles?: File[];
  detailsImages?: { detailIndex: number; files: File[] }[];
  extrasImages?: { extraId: string; files: File[] }[];
  company?: string;
  category?: string;
  pricing_base_monthly?: number;
  pricing_installation?: number;
  pricing_base_monthly_original?: number;
}
// IDEIA PARA FUTURAMENTE USAR UM MODELO DE PRODUCT QUE SEJA FLEXIVEL PARA OS DIFERENTES SEGMENTOS

// type ProductModel = "telecom" | "financeiro" | "beneficios" | "telecom-vivo" | "financeiro-c6";

// export interface IProductBase {
//   id: number;
//   name: string;
//   description: string;
//   model: ProductModel; // telecom, financeiro,...
//   company_id: number;
//   partner_id: number;
//   online: boolean;
//   created_at: string;
//   updated_at: string;
//   // Aqui fica genérico — qualquer JSON específico do segmento
//   metadata: Record<string, unknown>;
// }

// export interface IProductTelecom extends IProductBase {
//   model: "telecom"
//   metadata: {
//     landing_page: string;
//     pricing: {
//       base_monthly: { current_price: number; original_price?: number };
//       installation: { current_price: number; original_price?: number };
//     };
//     offer_title: string;
//     offer_subtitle: string;
//     uf: string[];
//      ...
//   };
// }

//   model: "financeiro" ;
//   metadata: {
//     taxa_juros: number;
//     limite_credito: number;
//     parcelas_maximas: number;
//     // ...
//   };
// }

// export type IProduct = IProductTelecom | IProductFinanceiro;

// export interface IProductsResponse {
//   success: boolean;
//   products: IProduct[];
//   total: number;
//   page: number;
//   perPage: number;
//   totalPages: number;
// }
