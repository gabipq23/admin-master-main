interface MenuItem {
  label: string;
  to?: string;
  items?: MenuItem[];
}

// telas do menu comum a todas as empresas
export const menuOptionsCommon: MenuItem[] = [
  {
    label: "Gestão",
    items: [
      {
        label: "Usuários",
        to: "/app/users",
      },
      {
        label: "Parceiros",
        to: "/app/partners",
      },
      {
        label: "Empresas",
        to: "/app/companies",
      },
    ],
  },
];

export const menuOptionsAdmin: MenuItem[] = [
  ...menuOptionsCommon,
  {
    label: "Produtos",
    to: "/app/products",
  },
];

// telas do menu específicas para cada empresa
export const menuOptionsTim: MenuItem[] = [
  ...menuOptionsCommon,
  // {
  //   label: "Dashboard",
  //   to: "/app",
  // },
  {
    label: "Produtos",
    items: [
      {
        label: "Banda Larga",
        to: "/app/products/telecom/Banda Larga",
      },
      {
        label: "Telefonia Móvel",
        to: "/app/products/telecom/Telefonia Móvel",
      },
    ],
  },
];

export const menuOptionsClaro: MenuItem[] = [...menuOptionsCommon];

export const menuOptionsVivo: MenuItem[] = [
  ...menuOptionsCommon,
  // {
  //   label: "Dashboard",
  //   to: "/app",
  // },
];

export const menuOptionsVR: MenuItem[] = [...menuOptionsCommon];

export const menuOptionsC6: MenuItem[] = [
  ...menuOptionsCommon,
  {
    label: "Produtos",
    items: [
      {
        label: "Maquininha",
        to: "/app/products/financies/Maquininha",
      },
      {
        label: "Empréstimo",
        to: "/app/products/financies/Empréstimo",
      },
    ],
  },
];

export const menuOptionsBrisanet: MenuItem[] = [...menuOptionsCommon];
export const menuOptionsAlgar: MenuItem[] = [...menuOptionsCommon];
