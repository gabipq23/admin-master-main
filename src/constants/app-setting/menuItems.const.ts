import type { UserRole } from "../../types/IUser.type";

interface MenuItem {
  label: string;
  to?: string;
  items?: MenuItem[];
  role?: UserRole;
}

// telas do menu comum a todas as empresas
export const menuOptionsCommon: MenuItem[] = [
  {
    label: "Gestão",
    items: [
      {
        label: "Usuários",
        to: "/app/users",
        role: "ADMIN",
      },
      {
        label: "Parceiros",
        to: "/app/partners",
        role: "ADMIN",
      },
      {
        label: "Empresas",
        to: "/app/companies",
        role: "ADMIN",
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
