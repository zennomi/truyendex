"use client";

import Link from "next/link";

import useReadingHistory from "@/hooks/useReadingHistory";
import routes from "@/routes";
import { FaHistory } from "react-icons/fa";
import { AspectRatio } from "@/components/shadcn/aspect-ratio";
import { AppConstants } from "@/constants";

export default function ReadingHistory() {
  const { history, removeHistory } = useReadingHistory();
  return (
    <div>
      <div>
        <div className="flex items-center gap-3 justify-between mb-4">
          <h2 className="text-[20px] text-web-title flex items-center gap-2">
            <FaHistory />
            Lịch sử đọc truyện
          </h2>
          <Link
            className="text-web-title hover:text-web-titleLighter transition"
            href={routes.nettrom.history}
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
                    className="block shrink-0 w-full"
                    title={manga.mangaTitle}
                    href={routes.nettrom.manga(mangaId)}
                  >
                    <AspectRatio
                      ratio={AppConstants.MANGA_COVER_RATIO}
                      className="shrink-0 overflow-hidden rounded group-hover:shadow-lg"
                    >
                      <img
                        className="w-full h-full object-cover group-hover:scale-[102%] transition duration-500"
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
