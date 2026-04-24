import { httpClientAxios } from "@/http/api";
import type {
  ICreatePartner,
  IUpdatePartner,
  IPartner,
} from "@/types/IPartner.type";

export class PartnersService {
  static async getAll(): Promise<IPartner[]> {
    // const { data } = await httpClientAxios.get<IPartner[]>(`/partner`);
    // return data;

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const data = [] as IPartner[];

    for (let i = 1; i <= 50; i++) {
      data.push({
        id: String(i),
        partner_name: `Parceiro ${i}`,
        cnpj: `123456789${i.toString().padStart(2, "0")}`,
        email: `parceiro${i}@example.com`,
        telephone: `1198765432${i.toString().padStart(2, "0")}`,
        logo_url: `https://via.placeholder.com/150?text=Logo+${i}`,
        manager_name: `Nome ${i}`,
        company_id: `company_${i}`,
        partner_hash: `hash_${i}`,
      });
    }

    return data;
  }

  static async create(entity: ICreatePartner): Promise<IPartner> {
    const { data } = await httpClientAxios.post<IPartner>(`/partner`, entity);
    return data;
  }

  static async update(entity: IUpdatePartner): Promise<void> {
    await httpClientAxios.put(`/partner/${entity.id}`, entity);
  }

  static async deleteItems({ ids }: { ids: string[] }): Promise<void> {
    for (const idx in ids) {
      await httpClientAxios.delete(`partners/${ids[idx]}`);
    }
  }
}
