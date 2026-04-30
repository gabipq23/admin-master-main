import { Select, Table, Tag } from "antd";
import type { TableColumnsType } from "antd";
import { useMemo } from "react";
import { useStyle } from "@/style/tableStyle";

const mockRows: PriorityRow[] = [
    {
        uf: "BA",
        stateName: "Bahia",
        partnerOptions: [
            { label: "Parceiro C", value: 401 },
            { label: "Parceiro D", value: 402 },
        ],
    },
    {
        uf: "PE",
        stateName: "Pernambuco",
        partnerOptions: [
            { label: "Parceiro E", value: 403 },
            { label: "Parceiro F", value: 404 },
        ],
    },
    {
        uf: "RJ",
        stateName: "Rio de Janeiro",
        partnerOptions: [
            { label: "Parceiro X", value: 101 },
            { label: "Parceiro Y", value: 102 },
        ],
    },
    {
        uf: "SP",
        stateName: "Sao Paulo",
        partnerOptions: [
            { label: "Parceiro Z", value: 201 },
            { label: "Parceiro W", value: 202 },
        ],
    },
    {
        uf: "MG",
        stateName: "Minas Gerais",
        partnerOptions: [
            { label: "Parceiro A", value: 301 },
            { label: "Parceiro B", value: 302 },
        ],
    },
    {
        uf: "PR",
        stateName: "Parana",
        partnerOptions: [
            { label: "Parceiro G", value: 501 },
            { label: "Parceiro H", value: 502 },
        ],
    },
    {
        uf: "SC",
        stateName: "Santa Catarina",
        partnerOptions: [
            { label: "Parceiro M", value: 503 },
            { label: "Parceiro N", value: 504 },
        ],
    },
];

const mockSelectedByUf: Record<string, number | undefined> = {
    BA: 401,
    PE: undefined,
    RJ: 101,
    SP: 202,
    MG: 301,
    PR: 502,
    SC: undefined,
};

export interface PriorityRow {
    uf: string;
    stateName: string;
    partnerOptions: Array<{ label: string; value: number }>;
}

type RegionName =
    | "Norte"
    | "Nordeste"
    | "Centro-Oeste"
    | "Sudeste"
    | "Sul"
    | "Outras";

type PriorityRowWithRegion = PriorityRow & {
    region: RegionName;
};

const REGION_BY_UF: Record<string, RegionName> = {
    AC: "Norte",
    AL: "Nordeste",
    AP: "Norte",
    AM: "Norte",
    BA: "Nordeste",
    CE: "Nordeste",
    DF: "Centro-Oeste",
    ES: "Sudeste",
    GO: "Centro-Oeste",
    MA: "Nordeste",
    MT: "Centro-Oeste",
    MS: "Centro-Oeste",
    MG: "Sudeste",
    PA: "Norte",
    PB: "Nordeste",
    PR: "Sul",
    PE: "Nordeste",
    PI: "Nordeste",
    RJ: "Sudeste",
    RN: "Nordeste",
    RS: "Sul",
    RO: "Norte",
    RR: "Norte",
    SC: "Sul",
    SP: "Sudeste",
    SE: "Nordeste",
    TO: "Norte",
};

const REGION_ORDER: RegionName[] = [
    "Norte",
    "Nordeste",
    "Centro-Oeste",
    "Sudeste",
    "Sul",
    "Outras",
];

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
    const isUsingMockData = rows.length === 0;
    const dataSource = isUsingMockData ? mockRows : rows;
    const selectedMap = isUsingMockData ? mockSelectedByUf : selectedByUf;

    const dataSourceByRegion = useMemo<PriorityRowWithRegion[]>(() => {
        return [...dataSource]
            .map((row) => ({
                ...row,
                region: REGION_BY_UF[row.uf] ?? "Outras",
            }))
            .sort((a, b) => {
                const regionDiff =
                    REGION_ORDER.indexOf(a.region) - REGION_ORDER.indexOf(b.region);

                if (regionDiff !== 0) return regionDiff;

                return a.stateName.localeCompare(b.stateName, "pt-BR");
            });
    }, [dataSource]);

    const regionRowSpanByIndex = useMemo<Record<number, number>>(() => {
        const groupCountByRegion = new Map<RegionName, number>();
        const firstIndexByRegion = new Map<RegionName, number>();

        dataSourceByRegion.forEach((row, index) => {
            if (!firstIndexByRegion.has(row.region)) {
                firstIndexByRegion.set(row.region, index);
            }

            groupCountByRegion.set(row.region, (groupCountByRegion.get(row.region) ?? 0) + 1);
        });

        const rowSpanByIndex: Record<number, number> = {};

        dataSourceByRegion.forEach((row, index) => {
            const firstIndex = firstIndexByRegion.get(row.region);

            if (firstIndex === index) {
                rowSpanByIndex[index] = groupCountByRegion.get(row.region) ?? 1;
            } else {
                rowSpanByIndex[index] = 0;
            }
        });

        return rowSpanByIndex;
    }, [dataSourceByRegion]);

    const columns = useMemo<TableColumnsType<PriorityRowWithRegion>>(
        () => [
            {
                title: "Região",
                key: "region",
                width: 80,
                render: (_: unknown, record: PriorityRowWithRegion, index: number) => ({
                    children: (
                        <Tag color="geekblue" style={{ marginInlineEnd: 0 }}>
                            {record.region}
                        </Tag>
                    ),
                    props: {
                        rowSpan: regionRowSpanByIndex[index] ?? 1,
                    },
                }),
            },
            {
                title: "Estado",
                dataIndex: "uf",
                key: "uf",
                width: 180,
                render: (_: string, record: PriorityRowWithRegion) => (
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
                width: 280,
                render: (_: unknown, record: PriorityRowWithRegion) => (
                    <Select
                        allowClear
                        placeholder="Sem prioridade definida"
                        style={{ width: "50%" }}
                        options={record.partnerOptions}
                        value={selectedMap[record.uf]}
                        onChange={(value) => onChangePriority(record.uf, value)}
                    />
                ),
            },
            // {
            //     title: "Status",
            //     key: "status",
            //     width: 240,
            //     render: (_: unknown, record: PriorityRowWithRegion) => {
            //         const selectedPartnerId = selectedMap[record.uf];
            //         const selectedPartner = record.partnerOptions.find(
            //             (partner) => partner.value === selectedPartnerId,
            //         );

            //         if (!selectedPartner)
            //             return (
            //                 <Typography.Text type="secondary">nao definido</Typography.Text>
            //             );

            //         return (
            //             <Typography.Text style={{ color: "#389e0d" }}>
            //                 {selectedPartner.label}
            //             </Typography.Text>
            //         );
            //     },
            // },
        ],
        [onChangePriority, regionRowSpanByIndex, selectedMap],
    );

    return (
        <Table
            rowKey="uf"
            columns={columns}
            dataSource={dataSourceByRegion}
            className={styles.customTable}
            loading={isLoading}
            pagination={false}
            locale={{ emptyText: "Nenhum estado encontrado para os filtros" }}
        />
    );
}
