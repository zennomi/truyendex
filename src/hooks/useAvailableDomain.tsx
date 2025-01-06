"use client";

import useSWR from "swr";
import axios from "axios";
import useHostname from "./useHostname";
import { Constants } from "@/constants";
import { union } from "lodash";

export default function useAvailableDomain(enable: boolean) {
  const hostname = useHostname();

  return useSWR(enable ? "avalaible-domain" : null, async () => {
    let domains = Constants.AVALABLE_DOMAINS;

    try {
      const { data } = await axios.get(Constants.DOMAIN_LIST_URL);
      domains = union(data, domains);
    } catch {}
    for (const domain of domains) {
      if (domain === hostname) continue;
      try {
        await axios(`https://${domain}/api/health`);
        return domain;
      } catch {
        continue;
      }
    }
    return null;
  });
}
