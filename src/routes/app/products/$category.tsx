import { createFileRoute, redirect } from "@tanstack/react-router";
import { can, getStoredUserRole } from "@/helpers/access-control.helper";
import { ProductsPage } from "@/pages/product/telecom/products";

export const Route = createFileRoute("/app/products/$category")({
    component: ProductsPage,
    beforeLoad: () => {
        if (!can(getStoredUserRole(), "products", "view")) {
            throw redirect({ to: "/app" });
        }
    },
});
