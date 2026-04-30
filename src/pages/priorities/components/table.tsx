import { Select, Table, Tag, Typography } from "antd";
import type { TableColumnsType } from "antd";
import { useMemo } from "react";
import { useStyle } from "@/style/tableStyle";

export interface PriorityRow {
    uf: string;
    stateName: string;
    partnerOptions: Array<{ label: string; value: number }>;
}

interface PriorityTableProps {
    rows: PriorityRow[];
    isLoading: boolean;
    selectedByUf: Record<string, number | undefined>;
    onChangePriority: (uf: string, partnerId: number | undefined) => void;
}

export function PriorityTable({
    rows,
    isLoading,
    selectedByUf,
    onChangePriority,
}: PriorityTableProps) {
    const { styles } = useStyle();

    const columns = useMemo<TableColumnsType<PriorityRow>>(
        () => [
            {
                title: "Estado",
                dataIndex: "uf",
                key: "uf",
                width: 180,
                render: (_: string, record: PriorityRow) => (
                    <div className="flex items-center gap-2">
                        <Tag color="blue" style={{ marginInlineEnd: 0 }}>
                            {record.uf}
                        </Tag>
                        <span>{record.stateName}</span>
                    </div>
                ),
            },
            {
                title: "Parceiro prioritario",
                key: "partner",
                width: 320,
                render: (_: unknown, record: PriorityRow) => (
                    <Select
                        allowClear
                        placeholder="sem prioridade definida"
                        style={{ width: "100%" }}
                        options={record.partnerOptions}
                        value={selectedByUf[record.uf]}
                        onChange={(value) => onChangePriority(record.uf, value)}
                    />
                ),
            },
            {
                title: "Status",
                key: "status",
                width: 240,
                render: (_: unknown, record: PriorityRow) => {
                    const selectedPartnerId = selectedByUf[record.uf];
                    const selectedPartner = record.partnerOptions.find(
                        (partner) => partner.value === selectedPartnerId,
                    );

                    if (!selectedPartner)
                        return (
                            <Typography.Text type="secondary">nao definido</Typography.Text>
                        );

                    return (
                        <Typography.Text style={{ color: "#389e0d" }}>
                            {selectedPartner.label}
                        </Typography.Text>
                    );
                },
            },
        ],
        [onChangePriority, selectedByUf],
    );

    return (
        <Table
            rowKey="uf"
            columns={columns}
            dataSource={rows}
            className={styles.customTable}
            loading={isLoading}
            pagination={false}
            locale={{ emptyText: "Nenhum estado encontrado para os filtros" }}
        />
    );
}
