export interface IPartner {
  cnpj: string;
  email: string;
  id: string;
  logo_url: string;
  manager_name: string;
  partner_name: string;
  telephone: string;
  company_id: string;
  partner_hash: string;
}

export interface ICreatePartner {
  id: string;
  cnpj: string;
  email: string;
  logo_url: string;
  manager_name: string;
  partner_name: string;
  telephone: string;
  company_id: string;
}

export interface IUpdatePartner {
  cnpj: string;
  email: string;
  id: string;
  logo_url: string;
  manager_name: string;
  partner_name: string;
  telephone: string;
  company_id: string;
  partner_hash: string;
}
