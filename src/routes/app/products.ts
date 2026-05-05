import { createFileRoute, redirect } from "@tanstack/react-router";
import { can, getStoredUserRole } from "@/helpers/access-control.helper";
import { TELECOM_DEFAULT_CATEGORY } from "@/pages/product/telecom/config-page.const";

export const Route = createFileRoute("/app/products")({
  beforeLoad: () => {
    if (!can(getStoredUserRole(), "products", "view")) {
      throw redirect({ to: "/app" });
    }

    throw redirect({
      to: "/app/products/$category",
      params: { category: TELECOM_DEFAULT_CATEGORY },
    });
  },
});
