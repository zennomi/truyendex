import { AppApi } from "@/api";
import useSWR from "swr";

export const useHomepageSeries = (params: { limit: number; page?: number }) => {
  return useSWR(["homepage-series", params], () =>
    AppApi.Series.getHomepageSeries(params),
  );
};
