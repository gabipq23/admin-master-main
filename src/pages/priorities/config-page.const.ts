import { dictionaryQueryClient } from "@/constants/dictionaryQueryClient.const";
import { useDeletePartnerPriorityMutation } from "@/hooks/partners-prioritiy/useDeletePartnerPriorityMutation";
import { usePartnerPriorityQuery } from "@/hooks/partners-prioritiy/usePartnerPriorityQuery";
import { useUpdatePartnerPriorityMutation } from "@/hooks/partners-prioritiy/useUpdatePartnerPriorityMutation";
import type { IPartner } from "@/types/IPartner.type";
import type {
  IPartnerPriority,
  IPartnerPriorityClientType,
} from "@/types/IPartnerPriority.type";
import { UF_OPTIONS } from "@/utils/ufOptions";

export const entityPage = dictionaryQueryClient.partnerpriority;
export const useUpdateEntity = useUpdatePartnerPriorityMutation;
export const useDeleteEntity = useDeletePartnerPriorityMutation;
export const useListEntity = usePartnerPriorityQuery;
export type EntityType = IPartnerPriority;
export type PriorityClientTypeFilter = IPartnerPriorityClientType | "PF e PJ";

export const clientTypeOptions = [
  { label: " B2C - Pessoa Física", value: "PF" },
  { label: " B2B - Pessoa Jurídica", value: "PJ" },
  { label: "B2B e B2C - Pessoa Física e Jurídica", value: "PF e PJ" },
] as const satisfies Array<{
  label: string;
  value: PriorityClientTypeFilter;
}>;

const ufNameByCode = new Map(
  UF_OPTIONS.map((option) => {
    const [code, ...nameParts] = option.label.split(" - ");
    return [code, nameParts.join(" - ")];
  }),
);

export function getUfName(uf: string) {
  return ufNameByCode.get(uf) ?? uf;
}

export function normalizePartnerClientTypes(partner: IPartner): string[] {
  return Array.isArray(partner.client_type)
    ? partner.client_type
    : partner.client_type
      ? [String(partner.client_type)]
      : [];
}

export function hasClientType(
  partner: IPartner,
  clientType: PriorityClientTypeFilter,
) {
  if (clientType === "PF e PJ")
    return normalizePartnerClientTypes(partner).length > 0;

  return normalizePartnerClientTypes(partner).includes(clientType);
}

export function normalizePartnerUfs(partner: IPartner): string[] {
  return Array.isArray(partner.uf)
    ? partner.uf
    : partner.uf
      ? [String(partner.uf)]
      : [];
}
