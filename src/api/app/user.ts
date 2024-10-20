import { ReadListResponse } from "@/types"
import { axios } from "./axios"

export const getReadList = async (query: { page?: number } = {}) => {
    const { data } = await axios<ReadListResponse>({
        url: "/api/user/read-list",
        params: { ...query }
    })
    return data
}