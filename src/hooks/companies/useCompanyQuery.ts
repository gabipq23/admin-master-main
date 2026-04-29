import { dictionaryQueryClient } from "@/constants/dictionaryQueryClient.const";
import { useQuery } from "@tanstack/react-query";

export function useCompanyQuery({
  enabled = true,
}: { enabled?: boolean } = {}) {
  const entity = dictionaryQueryClient["companies"];

  return useQuery({
    queryKey: [entity.key],
    queryFn: entity.service.getAll,
    retry: 2,
    enabled,
  });
}
