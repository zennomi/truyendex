import { AppApi } from "@/api";
import useSWR from "swr";

export const useSeriesInfo = (mangaId: string) => {
  return useSWR(["followed-manga", mangaId], () =>
    AppApi.Series.checkInfo(mangaId),
  );
};
