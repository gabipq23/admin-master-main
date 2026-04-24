
import type { TableColumnsType } from "antd";
import type { EntityType } from "../config-page.const";

export function getColumns(): TableColumnsType<EntityType> {
  return [
    {
      title: "Logo",
      dataIndex: "logo_url", key: "logo_url",
      render: (logo_url: string) => <img src={logo_url} alt="Logo" />
    },
    {
      title: "Nome",
      dataIndex: "partner_name",
      key: "partner_name",
      sorter: (a, b) => a.partner_name.localeCompare(b.partner_name),
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
      title: "CNPJ",
      dataIndex: "cnpj",
      key: "cnpj",
    },
  ];
}
