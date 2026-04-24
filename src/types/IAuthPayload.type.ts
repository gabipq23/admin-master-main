import type { UserRole } from "./IUser.type";

export interface IAuthPayload {
  success: boolean;
  user: IAuthUser;
}

export interface IAuthUser {
  id: string | number;
  name: string;
  email: string;
  role: UserRole;
  user_type: string;
  company_id?: string | number;
  partner_id?: string | number;
  partner_url_logo?: string;
}
