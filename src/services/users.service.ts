import { httpClientAxios } from "@/http/api";
import type { ICreateUser, IUpdateUser, IUser } from "@/types/IUser.type";

export class UsersService {
  static async getAll(): Promise<IUser[]> {
    // const { data } = await httpClientAxios.get<IUser[]>(`/user`);
    // return data;

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const data = [] as IUser[];

    for (let i = 1; i <= 50; i++) {
      data.push({
        id: String(i),
        name: `Usuário ${i}`,
        cpf: `123456789${i.toString().padStart(2, "0")}`,
        email: `usuario${i}@example.com`,
        telephone: `1198765432${i.toString().padStart(2, "0")}`,
        role: i % 2 === 0 ? "admin" : "user",
        company_id: null,
        partner_id: null,
        allow_email_notifications: i % 3 === 0,
        allow_sms_notifications: i % 4 === 0,
        person_responsible_id: `Supervisor ${i * 4}`,
        consultant_hash: `hash${i}`,
        user_type: i % 2 === 0 ? "equipe" : "subcredenciado",
        team: `Time ${i % 5}`,
        cnpj: `123456780001${i.toString().padStart(2, "0")}`,
      });
    }

    return data;
  }

  static async create(entity: ICreateUser): Promise<IUser> {
    const { data } = await httpClientAxios.post<IUser>(`/user`, entity);
    return data;
  }

  static async update(entity: IUpdateUser): Promise<void> {
    await httpClientAxios.put(`/user/${entity.id}`, entity);
  }

  static async deleteItems({ ids }: { ids: string[] }): Promise<void> {
    for (const idx in ids) {
      await httpClientAxios.delete(`users/${ids[idx]}`);
    }
  }
}
