
import { type TableColumnsType } from "antd";
import type { EntityType } from "../config-page.const";

export function getColumns(): TableColumnsType<EntityType> {
  return [
    {
      title: "Plano",
      dataIndex: "name",
      key: "name",
      width: 140,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Valor ",
      dataIndex: ["pricing", "base_monthly"],
      width: 140,
      render: (_value, record) => {
        const monthlyCurrentPrice =
          typeof record?.pricing?.base_monthly === "number"
            ? record.pricing.base_monthly
            : Number(record?.pricing?.base_monthly?.current_price ?? 0);

        return `R$ ${monthlyCurrentPrice.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
        })}`;
      },
    },
    { title: " Tipo", dataIndex: "client_type", width: 100 },

    // {
    //     title: "",
    //     dataIndex: "online",
    //     width: 50,
    //     render: (_value, record) => (
    //         <ConfigProvider
    //             theme={{
    //                 components: {
    //                     Switch: { colorPrimary: "#0026d9", colorPrimaryHover: "#550088" },
    //                 },
    //             }}
    //         >
    //             <Tooltip
    //                 title="Ative ou desative o aparelho da plataforma"
    //                 placement="top"
    //                 styles={{ body: { fontSize: "12px" } }}
    //             >
    //                 <Switch
    //                     className={blueOutlineButtonClass}
    //                     size="small"
    //                     checked={!!record.online}
    //                     onChange={(checked) => {
    //                         updateProductBL({
    //                             id: record.id,
    //                             values: {
    //                                 online: checked,
    //                                 uf: Array.isArray(record.uf) ? record.uf : [],
    //                             },
    //                         });
    //                     }}
    //                 />
    //             </Tooltip>
    //         </ConfigProvider>
    //     ),
    // },
  ];
}
