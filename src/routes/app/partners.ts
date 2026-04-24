import { createFileRoute } from "@tanstack/react-router";
import { PartnersPage } from "@/pages/partners/partners";

export const Route = createFileRoute("/app/partners")({
  component: PartnersPage,
});
