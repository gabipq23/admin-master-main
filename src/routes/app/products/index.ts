import { createFileRoute, redirect } from "@tanstack/react-router";
import { TELECOM_DEFAULT_CATEGORY } from "@/pages/product/telecom/config-page.const";

export const Route = createFileRoute("/app/products/")({
  beforeLoad: () => {
    throw redirect({
      to: "/app/products/$category",
      params: { category: TELECOM_DEFAULT_CATEGORY },
    });
  },
});
