export interface IPartnerResponse {
  page: number;
  per_page: number;
  success: boolean;
  total: number;
  total_pages: number;
  partners: IPartner[];
}

export interface IPartner {
  cnpj: string;
  email: string;
  partner_id: number;
  logo_url: string;
  manager_name: string;
  partner_name: string;
  company_id: number;
  telephone: string;
  partner_hash: string;
  created_at: string;
  updated_at: string;
  company: {
    company_id: number;
    company_name: string;
  };
  _count: {
    users: number;
  };
}

export interface ICreatePartner {
  partner_id: number;
  cnpj: string;
  email: string;
  logo_url: string;
  manager_name: string;
  partner_name: string;
  telephone: string;
  company_id: number;
  company: {
    company_id: number;
    company_name: string;
  };
}

export interface IUpdatePartner {
  cnpj: string;
  email: string;
  partner_id: number;
  logo_url: string;
  manager_name: string;
  partner_name: string;
  telephone: string;
  company_id: number;
  company: {
    company_id: number;
    company_name: string;
  };
}
