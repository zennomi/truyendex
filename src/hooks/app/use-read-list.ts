import { AppApi } from "@/api"
import useSWR from "swr"

export const useReadList = (page: number) => {
    return useSWR(['following-manga', page], () => AppApi.User.getReadList({ page }))
}