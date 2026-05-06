import { Typography } from "antd";
import { useParams } from "@tanstack/react-router";
import { useMemo } from "react";
import type { ComponentType } from "react";

// Importar configs de cada modelo
import * as telecomConfig from "./telecom/config-page.const";
import * as financiesConfig from "./financies/config-page.const";

// Importar tabelas de cada modelo
import { TableMain as TelecomTable } from "./telecom/components/table";
import { TableMain as FinanciesTable } from "./financies/components/table";
interface ModelConfig {
    entityPage: { plural: string; name: string };
    useListEntity: (category: string) => { data?: { products: any[] }; isLoading: boolean };
    getCategoryLabel: (category: string) => string;
    TableComponent: ComponentType<any>;
}

const configByModel: Record<string, ModelConfig> = {
    telecom: {
        entityPage: telecomConfig.entityPage,
        useListEntity: telecomConfig.useListEntity,
        getCategoryLabel: telecomConfig.getTelecomCategoryLabel,
        TableComponent: TelecomTable,
    },
    financies: {
        entityPage: financiesConfig.entityPage,
        useListEntity: financiesConfig.useListEntity,
        getCategoryLabel: financiesConfig.getFinanciesCategoryLabel,
        TableComponent: FinanciesTable,
    },
};

export function ProductsPage() {
    const params = useParams({ strict: false });
    const { model, category } = params as { model?: string; category?: string };

    const config = useMemo(() => {
        const modelKey = model?.toLowerCase();
        if (!modelKey || !configByModel[modelKey]) {
            throw new Error(`Modelo desconhecido: ${modelKey || "não informado"}`);
        }
        return configByModel[modelKey];
    }, [model]);

    const { data, isLoading } = config.useListEntity(category || "");
    const categoryLabel = config.getCategoryLabel(category || "");
    const TableComponent = config.TableComponent;

    return (
        <div className="py-6">
            <Typography.Title level={3} style={{ marginBottom: 16 }}>
                {config.entityPage.plural} - {categoryLabel}
            </Typography.Title>
            <TableComponent
                data={data?.products ?? []}
                isLoading={isLoading}
                category={category}
                model={model}
            />
        </div>
    );
}
