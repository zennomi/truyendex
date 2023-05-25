"use client"

import useLastUpdates from "../../hooks/useLastUpdates"

export default function LastUpdates() {
    const { chapters, isLoading, error } = useLastUpdates();
    if (isLoading) return <div>loading...</div>
    if (error) return <div>error</div>
    return (
        <div>
            {

            }
        </div>
    )
}