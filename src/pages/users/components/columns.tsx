import { Tag } from "antd";
import type { TableColumnsType } from "antd";
import type { EntityType } from "../config-page.const";

export function getColumns(): TableColumnsType<EntityType> {
  return [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      sorter: (a: EntityType, b: EntityType) => a.name.localeCompare(b.name),
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
      filters: [
        { text: "Admin", value: "admin" },
        { text: "Usuário", value: "user" },
      ],
      onFilter: (value, record: EntityType) =>
        (typeof value === "string" || typeof value === "number") && record.role === value,
      render: (role: string) => (
        <Tag color={role === "admin" ? "magenta" : "blue"}>
          {role === "admin" ? "Admin" : "Usuário"}
        </Tag>
      ),
    },

  ];
}
