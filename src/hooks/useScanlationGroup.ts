import useSWR from "swr/immutable";
import { Group } from "../api";
import { ScanlationGroupResponse } from "../api/schema";

export default function useScanlationGroup(groupId: string) {
    const { data, isLoading, error } = useSWR(['scanlation_group', groupId], () => Group.getGroupId(groupId))
    const successData = data && (data.data as ScanlationGroupResponse).data
    return { data: successData, isLoading, error }
}