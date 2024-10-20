export type ReadListResponse = {
    current_page: number
    from: number
    last_page: number
    per_page: number
    total: number
    to: number
    data: {
        series_id: string
    }[]
}

export type GetUserResponse = {
    email: string
    created_at: string
    email_verified_at: string | null
    id: number
    name: string
}