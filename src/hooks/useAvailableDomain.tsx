"use client";

import useSWR from "swr";
import axios from "axios";
import useHostname from "./useHostname";
import { Constants } from "@/constants";

export default function useAvailableDomain(enable: boolean) {
  const hostname = useHostname();

  return useSWR(enable ? "avalaible-domain" : null, async () => {
    for (const domain of Constants.AVALABLE_DOMAINS) {
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
