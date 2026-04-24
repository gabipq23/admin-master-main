import { dictionaryQueryClient } from "@/constants/dictionaryQueryClient.const";
import { useQuery } from "@tanstack/react-query";

export function usePartnerQuery() {
  const entity = dictionaryQueryClient["partners"];

  return useQuery({
    queryKey: [entity.key],
    queryFn: entity.service.getAll,
    retry: 2,
  });
}
