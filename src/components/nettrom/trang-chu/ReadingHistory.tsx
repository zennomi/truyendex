"use client";

import Link from "next/link";

import useReadingHistory from "@/hooks/useReadingHistory";

import { FaHistory } from "react-icons/fa";
import { AspectRatio } from "@/components/shadcn/aspect-ratio";
import { Constants } from "@/constants";

export default function ReadingHistory() {
  const { history, removeHistory } = useReadingHistory();
  return (
    <div>
      <div>
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-[20px] text-web-title">
            <FaHistory />
            Lịch sử đọc truyện
          </h2>
          <Link
            className="text-web-title transition hover:text-web-titleLighter"
            href={Constants.Routes.nettrom.history}
          >
            Xem tất cả
          </Link>
        </div>
        <ul className="grid grid-cols-4 gap-4">
          {Object.entries(history)
            .slice(0, 5)
            .map(([mangaId, manga]) => (
              <li className="group" key={mangaId}>
                <div className="flex gap-3">
                  <Link
                    className="block w-full shrink-0"
                    title={manga.mangaTitle}
                    href={Constants.Routes.nettrom.manga(mangaId)}
                  >
                    <AspectRatio
                      ratio={Constants.Nettrom.MANGA_COVER_RATIO}
                      className="shrink-0 overflow-hidden rounded group-hover:shadow-lg"
                    >
                      <img
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[102%]"
                        alt={manga.mangaTitle}
                        src={manga.cover}
                      />
                    </AspectRatio>
                  </Link>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
