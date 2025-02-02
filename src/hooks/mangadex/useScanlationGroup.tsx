import useSWR from "swr/immutable";
import { useEffect, useState } from "react";

import { MangadexApi } from "@/api";
import { ScanlationGroupResponse } from "@/types/mangadex";

export default function useScanlationGroup(groupId: string | null) {
  const [group, setGroup] = useState<ScanlationGroupResponse["data"] | null>(
    null,
  );
  const { data, isLoading, error } = useSWR(
    groupId ? ["scanlation_group", groupId] : null,
    () =>
      MangadexApi.Group.getGroupId(groupId!, {
        includes: [
          MangadexApi.Static.Includes.LEADER,
          MangadexApi.Static.Includes.MEMBER,
        ],
      }),
  );

  useEffect(() => {
    if (!data?.data) return;
    setGroup(data.data.data);
  }, [data]);
  return { data: group, isLoading, error };
}
