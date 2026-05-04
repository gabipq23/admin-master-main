import { CompaniesService } from "@/services/companies.service";
import { PartnersService } from "@/services/partners.service";
import { ProductsService } from "@/services/products.service";
import { UsersService } from "@/services/users.service";

// padroniza dados das entidades para reaproveitar em outras pastas, sem ficar com repetições no código
export const dictionaryQueryClient = {
  users: {
    name: "Usuário",
    plural: "Usuários",
    key: "users",
    service: UsersService,
  },
  partners: {
    name: "Parceiro",
    plural: "Parceiros",
    key: "partners",
    service: PartnersService,
  },
  companies: {
    name: "Empresa",
    plural: "Empresas",
    key: "companies",
    service: CompaniesService,
  },
  products: {
    name: "Produto",
    plural: "Produtos",
    key: "products",
    service: ProductsService,
  },
};
