export type UserRole =
  | "ADMIN"
  | "GESTOR"
  | "DIRETOR"
  | "GERENTE"
  | "LIDER"
  | "CONSULTOR";

export interface IUser {
  company_id: string | null;
  cpf: string;
  email: string;
  id: string;
  name: string;
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
}

export interface ICreateUser {
  company_id: string | null;
  cpf: string;
  email: string;
  name: string;
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
  id: string;
  name: string;
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
