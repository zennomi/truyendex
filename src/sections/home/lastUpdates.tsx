"use client"

import { useEffect } from "react";
import useLastUpdates from "../../hooks/useLastUpdates"
import { useMangadex } from "../../contexts/mangadex";
import getCoverArt from "../../utils/getCoverArt";
import Image from "next/image";

export default function LastUpdates() {
    const { chapters, isLoading, error } = useLastUpdates();
    const { mangas, updateMangas } = useMangadex()

    useEffect(() => {
        if (chapters?.length > 0) {
            updateMangas({ ids: chapters.filter(c => !!c?.manga?.id).map(c => c.manga?.id!) })
        }
    }, [chapters])

    if (isLoading) return <div>loading...</div>;
    if (error) return <div>error</div>;

    return (
        <div className="grid grid-cols-4">
            {
                chapters.map(chapter => (
                    <div key={chapter.id}>
                        {chapter.id}
                        {
                            chapter.manga &&
                            <img alt="" src={getCoverArt(mangas[chapter.manga.id])} />
                        }
                        {chapter.manga && getCoverArt(mangas[chapter.manga.id])}
                    </div>
                ))
            }
        </div>
    )
}