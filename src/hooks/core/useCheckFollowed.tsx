import { AppApi } from "@/api";
import useSWR from "swr";

export const useCheckFollowed = (mangaId: string) => {
  return useSWR(["followed-manga", mangaId], () =>
    AppApi.Series.checkFollow(mangaId),
  );
};
