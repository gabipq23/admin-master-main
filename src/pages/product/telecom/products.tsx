import { Typography } from "antd";
import { TableMain } from "./components/table";
import { entityPage, useListEntity } from "./config-page.const";

export function ProductsPage() {
    const { data, isLoading } = useListEntity();

    return (
        <div className="py-6 ">
            <Typography.Title level={3} style={{ marginBottom: 16 }}>
                {entityPage.plural}
            </Typography.Title>
            <TableMain data={data?.products ?? []} isLoading={isLoading} />
        </div>
    );
}
