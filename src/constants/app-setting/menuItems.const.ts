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
        label: "Banda Larga",

        to: "/app/products/banda-larga",
      },
      {
        label: "Telefonia Móvel",
        to: "/app/products/telefonia-movel",
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
        to: "/app/products/banda-larga",
      },
      {
        label: "Aparelhos",
        to: "/app/products/telefonia-movel",
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
