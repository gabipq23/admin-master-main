import { Typography } from "antd";
import { useParams } from "@tanstack/react-router";
import { useMemo } from "react";
import { configByModel } from "./config-page.const";

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
