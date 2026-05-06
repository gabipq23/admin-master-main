import type { TableColumnsType } from "antd";
import { Tag } from "antd";
import type { EntityType } from "../config-page.const";

export function getColumns(): TableColumnsType<EntityType> {
    return [
        {
            title: "Nome",
            dataIndex: "name",
            key: "name",
            width: 250,
            render: (text: string) => <span className="font-medium">{text}</span>,
        },
        {
            title: "Categoria",
            dataIndex: "category",
            key: "category",
            width: 150,
            render: (category: string) => <Tag color="blue">{category}</Tag>,
        },
        {
            title: "Empresa",
            dataIndex: "company",
            key: "company",
            width: 150,
        },
        {
            title: "Tipo Cliente",
            dataIndex: "client_type",
            key: "client_type",
            width: 120,
            render: (type: "PF" | "PJ") => <Tag color={type === "PF" ? "green" : "orange"}>{type}</Tag>,
        },
        {
            title: "Status",
            dataIndex: "online",
            key: "online",
            width: 100,
            render: (online: boolean) => (
                <Tag color={online ? "green" : "red"}>{online ? "Ativo" : "Inativo"}</Tag>
            ),
        },

    ];
}
