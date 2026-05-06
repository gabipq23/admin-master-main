import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/app/products/$model/")({
  beforeLoad: ({ params }) => {
    const { model } = params as { model: string };

    const defaultCategoryByModel: Record<string, string> = {
      telecom: "Banda Larga",
      financies: "Crédito Pessoal",
      benefits: "Benefício-Padrão",
    };

    const defaultCategory = defaultCategoryByModel[model] ?? "default";

    throw redirect({
      to: "/app/products/$model/$category",
      params: { model, category: defaultCategory },
    });
  },
});
