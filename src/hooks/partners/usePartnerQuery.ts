import { dictionaryQueryClient } from "@/constants/dictionaryQueryClient.const";
import { useAuth } from "@/context/auth-provider";
import { useQuery } from "@tanstack/react-query";

export function usePartnerQuery({
  enabled = true,
}: { enabled?: boolean } = {}) {
  const entity = dictionaryQueryClient["partners"];
  const { user, isGlobalAdmin } = useAuth();
  const filters = isGlobalAdmin
    ? {}
    : { company_id: user?.user.company_id ?? undefined };

  return useQuery({
    queryKey: [entity.key, filters.company_id ?? null],
    queryFn: () => entity.service.getAll(filters),
    retry: 2,
    enabled, // para verificar se o usuario logado tem acesso ou não a query
  });
}
