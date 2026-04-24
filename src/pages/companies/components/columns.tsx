
import type { TableColumnsType } from "antd";
import type { EntityType } from "../config-page.const";
import { formatPhoneNumber } from "@/utils/number.utils";
import { formatCNPJ } from "@/utils/document.util";

export function getColumns(): TableColumnsType<EntityType> {
  return [
    { title: "Segmento", dataIndex: "segment", key: "segment" },
    {
      title: "Nome da empresa",
      dataIndex: "company_name",
      key: "company_name",
      sorter: (a, b) => a.company_name.localeCompare(b.company_name),
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

  ];
}
