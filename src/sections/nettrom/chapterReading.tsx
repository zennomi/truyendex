"use client"

import ChapterPages from "./chapterPages"
import ChapterControl from "./chapterControl"

export default function ChapterReading() {

    return (
        <>
            <div className="reading">
                <ChapterControl />
            </div>
            <ChapterPages />
        </>
    )
}