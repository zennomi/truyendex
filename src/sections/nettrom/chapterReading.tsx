"use client"

import ChapterPages from "./chapterPages"
import ChapterControl from "./chapterControl"

export default function ChapterReading() {

    return (
        <>
            <div className="reading">
                <div className="container">
                    <ChapterControl />
                </div>
            </div>
            <ChapterPages />
        </>
    )
}