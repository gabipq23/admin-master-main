import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/app/products/")({
  beforeLoad: () => {
    throw redirect({
      to: "/app/products/$model/$category",
      params: { model: "telecom", category: "Banda Larga" },
    });
  },
});
