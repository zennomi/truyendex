import useSWR from "swr/immutable";
import { MangadexApi } from "@/api";
import { ScanlationGroupResponse } from "@/types/mangadex";

export default function useScanlationGroup(groupId: string) {
  const { data, isLoading, error } = useSWR(["scanlation_group", groupId], () =>
    MangadexApi.Group.getGroupId(groupId),
  );
  const successData = data && (data.data as ScanlationGroupResponse).data;
  return { data: successData, isLoading, error };
}
