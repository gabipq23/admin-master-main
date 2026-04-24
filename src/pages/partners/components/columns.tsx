
import type { TableColumnsType } from "antd";
import type { EntityType } from "../config-page.const";
import { formatPhoneNumber } from "@/utils/number.utils";
import { formatCNPJ } from "@/utils/document.util";

export function getColumns(): TableColumnsType<EntityType> {
  return [
    {
      title: "Logo",
      dataIndex: "logo_url", key: "logo_url",
      render: (logo_url: string) => <img src={logo_url} alt="Logo" className="h-6 " />
    },
    {
      title: "Nome",
      dataIndex: "partner_name",
      key: "partner_name",
      sorter: (a, b) => a.partner_name.localeCompare(b.partner_name),
    },
    {
      title: "CNPJ",
      dataIndex: "cnpj",
      key: "cnpj",
      render: (cnpj: string) => formatCNPJ(cnpj)
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
      render: (telephone: string) => formatPhoneNumber(telephone)
    },
    {
      title: "Responsável",
      dataIndex: "manager_name",
      key: "manager_name",
    },
    {
      title: "Empresa",
      dataIndex: ["company", "company_name"],
      key: "company_name",
    },
  ];
}
