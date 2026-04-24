import { CompaniesPage } from "@/pages/companies/companies";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/companies")({
  component: CompaniesPage,
});
