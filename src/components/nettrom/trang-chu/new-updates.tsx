"use client";

import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { FaClock, FaFilter } from "react-icons/fa";

import LastestChapters from "./new-updated-titles";
import LastChapterUpdatedTitles from "./last-chapter-updated-titles";

export default function NewUpdates() {
  const [filtered, setFiltered] = useState(false);

  return (
    <div>
      <div className="relative mb-5 flex items-center justify-between">
        <h1 className="my-0 flex items-center gap-3 text-[20px] text-web-title">
          <FaClock />
          <span>
            {filtered ? "Chương mới lọc theo cài đặt" : "Truyện mới cập nhật"}
          </span>
        </h1>
        <button
          onClick={() => setFiltered((prev) => !prev)}
          className={twMerge(
            "rounded-full border-2 border-orange-500 p-3",
            filtered ? "text-web-title" : "text-muted-foreground",
          )}
          title="Lọc theo cài đặt"
        >
          <FaFilter />
        </button>
      </div>
      {filtered ? <LastestChapters /> : <LastChapterUpdatedTitles />}
    </div>
  );
}
