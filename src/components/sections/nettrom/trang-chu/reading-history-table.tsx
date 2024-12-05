"use client";

import Link from "next/link";
import useReadingHistory from "@/hooks/useReadingHistory";
import { Constants } from "@/constants";

export default function ReadingHistory() {
  const { history, removeHistory } = useReadingHistory();
  return (
    <div className="visited-comics">
      <div className="box darkBox">
        <h2>
          Lịch sử đọc truyện
          <Link className="view-all" href={Constants.Routes.nettrom.history}>
            Xem tất cả
          </Link>
        </h2>
        <ul className="list-unstyled">
          {Object.entries(history)
            .slice(0, 5)
            .map(([mangaId, manga]) => (
              <li className="clearfix" key={mangaId}>
                <div className="t-item">
                  <Link
                    className="thumb"
                    title={manga.mangaTitle}
                    href={Constants.Routes.nettrom.manga(mangaId)}
                  >
                    <img
                      className="w-full"
                      alt={manga.mangaTitle}
                      src={manga.cover}
                    />
                  </Link>
                  <h3 className="title">
                    <Link href={Constants.Routes.nettrom.manga(mangaId)}>
                      {manga.mangaTitle}
                    </Link>
                  </h3>
                  <p className="chapter">
                    <Link
                      href={Constants.Routes.nettrom.chapter(manga.chapterId)}
                    >
                      Đọc tiếp {manga.chapterTitle}{" "}
                      <i className="fa fa-angle-right" />
                    </Link>
                    <span className="view pull-right">
                      <a
                        className="visited-remove"
                        onClick={() => removeHistory(mangaId)}
                      >
                        <i className="fa fa-times" /> Xóa
                      </a>
                    </span>
                  </p>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
