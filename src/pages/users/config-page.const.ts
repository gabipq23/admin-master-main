import { dictionaryQueryClient } from "@/constants/dictionaryQueryClient.const";
import { useCreateUserMutation } from "@/hooks/users/useCreateUserMutation";
import { useDeleteUserMutation } from "@/hooks/users/useDeleteUserMutation";
import { useUpdateUserMutation } from "@/hooks/users/useUpdateUserMutation";
import { useUserQuery } from "@/hooks/users/useUserQuery";
import type { IUser, UserRole } from "@/types/IUser.type";

export const entityPage = dictionaryQueryClient.users;
export const useCreateEntity = useCreateUserMutation;
export const useUpdateEntity = useUpdateUserMutation;
export const useDeleteEntity = useDeleteUserMutation;
export const useListEntity = useUserQuery;
export type EntityType = IUser;

export type FormValues = {
  user_name: string;
  email: string;
  cpf: string;
  telephone: string;
  role: UserRole;
  password?: string;
  company_id?: number | null;
  partner_id?: number | null;
  allow_email_notifications?: boolean;
  allow_sms_notifications?: boolean;
  person_responsible_id?: number | null;
  consultant_hash?: string;
  user_type?: string;
  team?: string;
  cnpj?: string;
};
