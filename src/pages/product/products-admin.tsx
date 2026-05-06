import { Alert, Card, Typography } from "antd";
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
        { label: "Maquininha", value: "Maquininha" },
        { label: "Empréstimo", value: "Empréstimo" },
    ],
};

const defaultCategoryByModel: Record<ProductModel, string> = {
    telecom: telecomConfig.TELECOM_DEFAULT_CATEGORY,
    financies: financiesConfig.FINANCIES_DEFAULT_CATEGORY,
};

function TelecomPanel({ category, categorySelect }: { category: string; categorySelect: { options: Array<{ label: string; value: string }>; value: string; onChange: (v: string) => void } }) {
    const { data, isLoading } = telecomConfig.useListEntity(category);
    return <TelecomTable data={data?.products ?? []} isLoading={isLoading} category={category} categorySelect={categorySelect} />;
}

function FinanciesPanel({ category, categorySelect }: { category: string; categorySelect: { options: Array<{ label: string; value: string }>; value: string; onChange: (v: string) => void } }) {
    const { data, isLoading } = financiesConfig.useListEntity(category);
    return <FinanciesTable data={data?.products ?? []} isLoading={isLoading} category={category} categorySelect={categorySelect} />;
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
                <Card style={{ marginBottom: 16 }}>
                    <Typography.Paragraph>
                        Selecione um modelo/segmento usando o seletor "Modelo/Segmento" no topo da página.
                    </Typography.Paragraph>

                </Card>

                // <Alert
                //     type="info"
                //     showIcon
                //     message="Selecione um modelo/segmento no subheader"
                //     description="Use o seletor 'Modelo/Segmento' no topo da página para filtrar por Telecom ou Financeiro. Você também pode refinar por empresa e parceiro."
                // />
            ) : (
                resolvedModel === "telecom" ? (
                    <TelecomPanel
                        category={selectedCategory}
                        categorySelect={{
                            options: categoryOptions[resolvedModel],
                            value: selectedCategory,
                            onChange: setSelectedCategory,
                        }}
                    />
                ) : (
                    <FinanciesPanel
                        category={selectedCategory}
                        categorySelect={{
                            options: categoryOptions[resolvedModel],
                            value: selectedCategory,
                            onChange: setSelectedCategory,
                        }}
                    />
                )
            )}
        </div>
    );
}
