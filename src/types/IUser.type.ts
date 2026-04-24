export type UserRole =
  | "ADMIN"
  | "GESTOR"
  | "DIRETOR"
  | "GERENTE"
  | "LIDER"
  | "CONSULTOR";

export interface IUserResponse {
  page: number;
  per_page: number;
  success: boolean;
  total: number;
  total_pages: number;
  users: IUser[];
}

export interface IUser {
  company_id: string | null;
  cpf: string;
  email: string;
  user_id: number;
  user_name: string;
  partner_id: string | null;
  role: UserRole;
  telephone: string;
  allow_email_notifications: boolean;
  allow_sms_notifications: boolean;
  person_responsible_id: string;
  consultant_hash: string;
  user_type: string;
  team: string;
  cnpj: string;
  created_at: string;
  updated_at: string;
  company: {
    company_id: string;
    company_name: string;
  };
  partner: {
    partner_id: string;
    partner_name: string;
    partner_hash: string;
  };
  person_responsible: {
    person_responsible_id: string;
    person_responsible_name: string;
  };
}

export interface ICreateUser {
  company_id: string | null;
  cpf: string;
  email: string;
  user_name: string;
  partner_id: string | null;
  password: string;
  role: UserRole;
  telephone: string;
  allow_email_notifications: boolean;
  allow_sms_notifications: boolean;
  person_responsible_id: string;
  user_type: string;
  team: string;
  cnpj: string;
}

export interface IUpdateUser {
  company_id: string | null;
  cpf: string;
  email: string;
  user_id: number;
  user_name: string;
  partner_id: string | null;
  password?: string;
  role: UserRole;
  telephone: string;
  allow_email_notifications: boolean;
  allow_sms_notifications: boolean;
  person_responsible_id: string;
  user_type: string;
  team: string;
  cnpj: string;
}
