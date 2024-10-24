"use client";

import Link from "next/link";

import useReadingHistory from "@/hooks/useReadingHistory";
import routes from "@/routes";
import { FaClock, FaHistory } from "react-icons/fa";
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
        <ul className="flex flex-col gap-4">
          {Object.entries(history)
            .slice(0, 5)
            .map(([mangaId, manga]) => (
              <li className="clearfix" key={mangaId}>
                <div className="flex gap-3">
                  <Link
                    className="block shrink-0 w-[72px]"
                    title={manga.mangaTitle}
                    href={routes.nettrom.manga(mangaId)}
                  >
                    <AspectRatio
                      ratio={AppConstants.MANGA_COVER_RATIO}
                      className="shrink-0 overflow-hidden rounded"
                    >
                      <img
                        className="w-full h-full"
                        alt={manga.mangaTitle}
                        src={manga.cover}
                      />
                    </AspectRatio>
                  </Link>
                  <div className="grow">
                    <h3 className="w-full">
                      <Link
                        href={routes.nettrom.manga(mangaId)}
                        className="font-semibold text-white text-[16px] hover:no-underline"
                      >
                        {manga.mangaTitle}
                      </Link>
                    </h3>

                    <p className="inline-flex items-center gap-4">
                      <span className="text-muted-foreground inline-flex items-center gap-2">
                        <FaClock />
                        <span>N/A</span>
                      </span>
                      <Link
                        href={routes.nettrom.chapter(manga.chapterId)}
                        className="hover:text-web-title transition"
                      >
                        Đọc tiếp {manga.chapterTitle}{" "}
                        <i className="fa fa-angle-right" />
                      </Link>
                      {/* <span className="view pull-right">
                        <a
                          className="visited-remove"
                          onClick={() => removeHistory(mangaId)}
                        >
                          <i className="fa fa-times" /> Xóa
                        </a>
                      </span> */}
                    </p>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
