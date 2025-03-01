"use client";

import Link from "next/link";

import useReadingHistory from "@/hooks/useReadingHistory";

import { FaHistory } from "react-icons/fa";
import { AspectRatio } from "@/components/shadcn/aspect-ratio";
import { Constants } from "@/constants";
import { useMemo } from "react";

export default function ReadingHistory() {
  const { history } = useReadingHistory();

  const historyEntries = useMemo(() => Object.entries(history), [history]);

  return (
    <div>
      <div>
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="flex items-center gap-4 text-[20px] font-medium text-web-title">
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
          {historyEntries.slice(0, 4).map(([mangaId, manga]) => (
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
        {historyEntries.length === 0 && (
          <AspectRatio ratio={8 / 3}>
            <div className="flex h-full w-full items-center justify-center text-lg text-gray-500">
              Không có lịch sử đọc truyện
            </div>
          </AspectRatio>
        )}
      </div>
    </div>
  );
}
