"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState } from "react"
import routes from "../../routes"
import normalizeParams from "../../utils/normalizeParams"
import { buildQueryStringFromOptions } from "../../api/util"

export default function SearchInput() {
    const params = useSearchParams()
    const router = useRouter()
    const [title, setTitle] = useState(params.get("title") || "")

    const handleSubmit = (event: any) => {
        event.preventDefault()
        const options = normalizeParams(params)
        options.title = title
        const queryString = buildQueryStringFromOptions(options)
        router.push(`${routes.nettrom.search}${queryString.replaceAll("[]", "")}#results`)
    }

    return (
        <div className="input-group">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="searchinput form-control"
                    placeholder="Tìm truyện..."
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
                <div className="input-group-btn">
                    <input type="submit" value="" className="searchbutton btn btn-default"

                        onClick={handleSubmit}
                    />
                </div>
            </form>
        </div>
    )
}