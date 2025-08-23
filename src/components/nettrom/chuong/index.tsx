"use client";

import ChapterControl from "./chapter-control";
import ChapterPages from "./chapter-pages";
import OptimisticChapterView from "./optimistic-chapter-view";

export default function ChapterView() {
  return (
    <OptimisticChapterView>
      <div className="container">
        <ChapterControl />
      </div>
      <ChapterPages />
    </OptimisticChapterView>
  );
}
