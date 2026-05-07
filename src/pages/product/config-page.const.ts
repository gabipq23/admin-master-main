import type { ComponentType } from "react";

import * as telecomConfig from "./telecom/config-page.const";
import * as financiesConfig from "./financies/config-page.const";

import { TableMain as TelecomTable } from "./telecom/components/table";
import { TableMain as FinanciesTable } from "./financies/components/table";
interface ModelConfig {
  entityPage: { plural: string; name: string };
  useListEntity: (category: string) => {
    data?: { products: any[] };
    isLoading: boolean;
  };
  getCategoryLabel: (category: string) => string;
  TableComponent: ComponentType<any>;
}

export const configByModel: Record<string, ModelConfig> = {
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
