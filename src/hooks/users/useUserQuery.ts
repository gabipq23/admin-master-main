import { dictionaryQueryClient } from "@/constants/dictionaryQueryClient.const";
import { useQuery } from "@tanstack/react-query";

export function useUserQuery() {
  const entity = dictionaryQueryClient['users'];

  return useQuery({
    queryKey: [entity.key],
    queryFn: entity.service.getAll,
    retry: 2,
  });
}
