import { dictionaryQueryClient } from "@/constants/dictionaryQueryClient.const";
import { useAuth } from "@/context/auth-provider";
import { useAdminScope } from "@/context/admin-scope-provider";
import { isAdminDomain } from "@/constants/app-setting/config.const";
import { useQuery } from "@tanstack/react-query";

export function usePartnerQuery({
  enabled = true,
}: { enabled?: boolean } = {}) {
  const entity = dictionaryQueryClient["partners"];
  const { user } = useAuth();
  const { selectedCompanyId, selectedSegmentId } = useAdminScope();

  const filters = isAdminDomain
    ? {
        ...(selectedSegmentId ? { segment: selectedSegmentId } : {}),
        ...(selectedCompanyId != null ? { company_id: selectedCompanyId } : {}),
      }
    : { company_id: user?.user.company_id ?? undefined };

  return useQuery({
    queryKey: [entity.key, filters.segment ?? null, filters.company_id ?? null],
    queryFn: () => entity.service.getAll(filters),
    retry: 2,
    enabled,
  });
}
