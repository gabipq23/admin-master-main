import { Typography } from "antd";


import { entityPage, useListEntity } from "./config-page.const";
import { TableMain } from "./components/table";

export function OrdersPage() {
  const { data, isLoading } = useListEntity();
  console.log(data?.orders)
  return (
    <div className="py-6 ">
      <Typography.Title level={3} style={{ marginBottom: 16 }}>
        {entityPage.plural}
      </Typography.Title>
      <TableMain data={data?.orders || []} isLoading={isLoading} />
    </div>
  );
}
