import { createFileRoute, redirect } from "@tanstack/react-router";
import { can, getStoredUserRole } from "@/helpers/access-control.helper";
import { isAdminDomain } from "@/constants/app-setting/config.const";
import { ProductsAdminPage } from "@/pages/product/products-admin";

export const Route = createFileRoute("/app/products/")({
  component: ProductsAdminPage,
  beforeLoad: () => {
    if (!can(getStoredUserRole(), "products", "view")) {
      throw redirect({ to: "/app" });
    }
    // Tenant: redireciona direto para a categoria padrão
    if (!isAdminDomain) {
      throw redirect({
        to: "/app/products/$model/$category",
        params: { model: "telecom", category: "Banda Larga" },
      });
    }
  },
});
