import { CompaniesService } from "@/services/companies.service";
import { PartnersPriorityService } from "@/services/partner-priority.service";
import { PartnersService } from "@/services/partners.service";
import { ProductsService } from "@/services/products.service";
import { UsersService } from "@/services/users.service";

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
  partnerpriority: {
    name: "Sugestão de Prioridade",
    plural: "Sugestões de Prioridade",
    key: "partner-priorities",
    service: PartnersPriorityService,
  },
};
