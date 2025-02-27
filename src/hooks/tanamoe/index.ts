import { TanamoeApi } from "@/api";
import useSWRImmutable from "swr/immutable";

export function useUpcomingBooks(params: { page: number; perPage?: number }) {
  return useSWRImmutable(["tanamoe-upcoming-books", params], async () =>
    TanamoeApi.getUpcomingBooks(params),
  );
}

export function useTitle(titleId: string) {
  return useSWRImmutable(["tanamoe-title", titleId], async () =>
    TanamoeApi.getTitle(titleId),
  );
}
