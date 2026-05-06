import { Alert, Card, Select, Space, Typography } from "antd";
import { useState, useEffect } from "react";
import { useAdminScope } from "@/context/admin-scope-provider";
import * as telecomConfig from "./telecom/config-page.const";
import * as financiesConfig from "./financies/config-page.const";
import { TableMain as TelecomTable } from "./telecom/components/table";
import { TableMain as FinanciesTable } from "./financies/components/table";

type ProductModel = "telecom" | "financies";

const categoryOptions: Record<ProductModel, Array<{ label: string; value: string }>> = {
    telecom: [
        { label: "Banda Larga", value: "Banda Larga" },
        { label: "Telefonia Móvel", value: "Telefonia Móvel" },
    ],
    financies: [
        { label: "Crédito Pessoal", value: "Crédito Pessoal" },
        { label: "Crédito PJ", value: "Crédito PJ" },
        { label: "Seguros", value: "Seguros" },
    ],
};

const defaultCategoryByModel: Record<ProductModel, string> = {
    telecom: telecomConfig.TELECOM_DEFAULT_CATEGORY,
    financies: financiesConfig.FINANCIES_DEFAULT_CATEGORY,
};

function TelecomPanel({ category }: { category: string }) {
    const { data, isLoading } = telecomConfig.useListEntity(category);
    return <TelecomTable data={data?.products ?? []} isLoading={isLoading} category={category} />;
}

function FinanciesPanel({ category }: { category: string }) {
    const { data, isLoading } = financiesConfig.useListEntity(category);
    return <FinanciesTable data={data?.products ?? []} isLoading={isLoading} category={category} />;
}

export function ProductsAdminPage() {
    const { selectedSegmentId } = useAdminScope();

    const resolvedModel: ProductModel =
        selectedSegmentId === "telecom" || selectedSegmentId === "financies"
            ? selectedSegmentId
            : "telecom";

    const [selectedCategory, setSelectedCategory] = useState<string>(
        defaultCategoryByModel[resolvedModel],
    );

    useEffect(() => {
        setSelectedCategory(defaultCategoryByModel[resolvedModel]);
    }, [resolvedModel]);

    const hasSegment = !!selectedSegmentId;

    return (
        <div className="py-6">
            <Typography.Title level={3} style={{ marginBottom: 16 }}>
                Produtos
            </Typography.Title>

            {!hasSegment ? (
                <Alert
                    type="info"
                    showIcon
                    message="Selecione um modelo/segmento no subheader"
                    description="Use o seletor 'Modelo/Segmento' no topo da página para filtrar por Telecom ou Financeiro. Você também pode refinar por empresa e parceiro."
                />
            ) : (
                <>
                    <Card style={{ marginBottom: 16 }}>
                        <Space size={12} wrap align="center">
                            <Typography.Text strong>Categoria:</Typography.Text>
                            <Select
                                style={{ minWidth: 240 }}
                                options={categoryOptions[resolvedModel]}
                                value={selectedCategory}
                                onChange={setSelectedCategory}
                            />
                        </Space>
                    </Card>

                    {resolvedModel === "telecom" ? (
                        <TelecomPanel category={selectedCategory} />
                    ) : (
                        <FinanciesPanel category={selectedCategory} />
                    )}
                </>
            )}
        </div>
    );
}
