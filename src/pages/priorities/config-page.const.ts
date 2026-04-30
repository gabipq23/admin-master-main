import type { IPartner } from "@/types/IPartner.type";
import { UF_OPTIONS } from "@/utils/ufOptions";

export const entityPage = {
  name: "Prioridade",
  plural: "Gestao de prioridades",
};

export const clientTypeOptions = [
  { label: "PF - Pessoa Fisica", value: "PF" },
  { label: "PJ - Pessoa Juridica", value: "PJ" },
];

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

export function hasClientType(partner: IPartner, clientType: string) {
  return normalizePartnerClientTypes(partner).includes(clientType);
}

export function normalizePartnerUfs(partner: IPartner): string[] {
  return Array.isArray(partner.uf)
    ? partner.uf
    : partner.uf
      ? [String(partner.uf)]
      : [];
}
