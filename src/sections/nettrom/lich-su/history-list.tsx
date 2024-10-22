"use client";

import Image from "next/image";
import Link from "next/link";

import useReadingHistory from "@/hooks/useReadingHistory";
import routes from "@/routes";

export default function HistoryList() {
  const { history, removeHistory } = useReadingHistory();

  return (
    <div className="items visited-comics-page Module Module-273">
      <div className="row visited-list">
        {Object.entries(history).map(([mangaId, manga]) => (
          <div className="item" key={mangaId}>
            <figure className="clearfix">
              <div className="image">
                <Link
                  title={manga.mangaTitle}
                  href={routes.nettrom.manga(mangaId)}
                >
                  <Image
                    className="lazy center"
                    alt={manga.mangaTitle}
                    data-original={manga.cover}
                    src={manga.cover}
                  />
                </Link>
                <div className="view">
                  <a
                    className="visited-remove"
                    onClick={() => removeHistory(mangaId)}
                  >
                    <i className="fa fa-times" /> Xóa
                  </a>
                </div>
              </div>
              <figcaption>
                <h3>
                  <Link
                    title={manga.mangaTitle}
                    href={routes.nettrom.manga(mangaId)}
                  >
                    {manga.mangaTitle}
                  </Link>
                </h3>
                <ul>
                  <li className="chapter clearfix">
                    <Link href={routes.nettrom.chapter(manga.chapterId)}>
                      Đọc tiếp {manga.chapterTitle}{" "}
                      <i className="fa fa-angle-right" />
                    </Link>
                  </li>
                </ul>
              </figcaption>
            </figure>
          </div>
        ))}
      </div>
    </div>
  );
}
