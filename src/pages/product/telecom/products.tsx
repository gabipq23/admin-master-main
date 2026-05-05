import { Typography } from "antd";
import { useParams } from "@tanstack/react-router";
import { TableMain } from "./components/table";
import {
    entityPage,
    getTelecomCategoryLabel,
    TELECOM_DEFAULT_CATEGORY,
    useListEntity,
} from "./config-page.const";

export function ProductsPage() {
    const params = useParams({ strict: false });
    const category = (params as { category?: string }).category ?? TELECOM_DEFAULT_CATEGORY;
    const { data, isLoading } = useListEntity(category);
    const categoryLabel = getTelecomCategoryLabel(category);

    return (
        <div className="py-6 ">
            <Typography.Title level={3} style={{ marginBottom: 16 }}>
                {entityPage.plural} - {categoryLabel}
            </Typography.Title>
            <TableMain data={data?.products ?? []} isLoading={isLoading} category={category} />
        </div>
    );
}
