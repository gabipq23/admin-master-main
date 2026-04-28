import { Tag } from "antd";
import type { TableColumnsType } from "antd";
import type { EntityType } from "../config-page.const";

const roleLabelMap: Record<EntityType["role"], string> = {
  ADMIN: "Admin",
  GESTOR: "Gestor",
  DIRETOR: "Diretor",
  GERENTE: "Gerente",
  LIDER: "Líder",
  CONSULTOR: "Consultor",
};

export function getColumns(): TableColumnsType<EntityType> {
  return [
    {
      title: "Nome",
      dataIndex: "user_name",
      key: "user_name",
      sorter: (a: EntityType, b: EntityType) => a.user_name.localeCompare(b.user_name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Telefone",
      dataIndex: "telephone",
      key: "telephone",
    },
    {
      title: "CPF",
      dataIndex: "cpf",
      key: "cpf",
    },
    {
      title: "Nível de Acesso",
      dataIndex: "role",
      key: "role",
      filters: Object.entries(roleLabelMap).map(([value, text]) => ({ text, value })),
      onFilter: (value, record: EntityType) =>
        (typeof value === "string" || typeof value === "number") && record.role === value,
      render: (role: EntityType["role"]) => (
        <Tag color={role === "ADMIN" ? "magenta" : "gray"}>
          {roleLabelMap[role]}
        </Tag>
      ),
    },

  ];
}
