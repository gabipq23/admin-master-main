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
  {
    label: "Produtos",
    items: [
      {
        label: "Telecom - Banda Larga",
        to: "/app/products/telecom/Banda Larga",
      },
      {
        label: "Telecom - Telefonia Móvel",
        to: "/app/products/telecom/Telefonia Móvel",
      },
      {
        label: "Financeiro - Crédito Pessoal",
        to: "/app/products/financies/Crédito Pessoal",
      },
      {
        label: "Financeiro - Crédito PJ",
        to: "/app/products/financies/Crédito PJ",
      },
      {
        label: "Financeiro - Seguros",
        to: "/app/products/financies/Seguros",
      },
    ],
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
    label: "Pedidos",
    items: [
      {
        label: "Banda Larga PF",
        to: "/app/tim/example",
      },
      {
        label: "Banda Larga PJ",
        to: "/app/tim/example",
      },
    ],
  },
  {
    label: "Produtos",
    items: [
      {
        label: "Banda Larga",
        to: "/app/products/telecom/Banda Larga",
      },
      {
        label: "Aparelhos",
        to: "/app/products/telecom/Telefonia Móvel",
      },
    ],
  },
];

export const menuOptionsClaro: MenuItem[] = [
  ...menuOptionsCommon,
  // {
  //   label: "Dashboard",
  //   to: "/app",
  // },
  {
    label: "Pedidos",
    items: [
      {
        label: "Banda Larga PF",
        to: "/app/claro/example",
      },
      {
        label: "Banda Larga PJ",
        to: "/app/claro/example",
      },
    ],
  },
];

export const menuOptionsVivo: MenuItem[] = [
  ...menuOptionsCommon,
  // {
  //   label: "Dashboard",
  //   to: "/app",
  // },
  {
    label: "Pedidos",
    items: [
      {
        label: "Banda Larga PF",
        to: "/app/vivo/example",
      },
      {
        label: "Banda Larga PJ",
        to: "/app/vivo/example",
      },
      {
        label: "Aparelhos",
        to: "/app/vivo/example",
      },
    ],
  },
  {
    label: "Produtos",
    items: [
      {
        label: "Banda Larga",
        to: "/app/vivo/example",
      },
      {
        label: "Aparelhos",
        to: "/app/vivo/example",
      },
    ],
  },
];

export const menuOptionsVR: MenuItem[] = [
  ...menuOptionsCommon,
  // {
  //   label: "Dashboard",
  //   to: "/app",
  // },
  {
    label: "Pedidos",
    items: [
      {
        label: "Exemplo 1",
        to: "/app/vr/example",
      },
      {
        label: "Exemplo 2",
        to: "/app/vr/example",
      },
    ],
  },
];

export const menuOptionsC6: MenuItem[] = [
  ...menuOptionsCommon,
  // {
  //   label: "Dashboard",
  //   to: "/app",
  // },
  {
    label: "Pedidos",
    items: [
      {
        label: "Exemplo 1",
        to: "/app/c6/example",
      },
      {
        label: "Exemplo 2",
        to: "/app/c6/example",
      },
    ],
  },
];

export const menuOptionsBrisanet: MenuItem[] = [
  ...menuOptionsCommon,
  // {
  //   label: "Dashboard",
  //   to: "/app",
  // },
];
export const menuOptionsAlgar: MenuItem[] = [
  ...menuOptionsCommon,
  // {
  //   label: "Dashboard",
  //   to: "/app",
  // },
];
