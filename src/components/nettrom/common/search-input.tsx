"use client";

import { useSearchParams } from "next/navigation";
import { MouseEvent, useCallback, useState } from "react";
import { useRouter } from "nextjs-toploader/app";

import { Utils } from "@/utils";
import useDebounce from "@/hooks/useDebounce";
import { useSearchManga } from "@/hooks/mangadex";
import { DataLoader } from "@/components/DataLoader";
import { MangadexApi } from "@/api";
import Link from "next/link";
import { Constants } from "@/constants";

export default function SearchInput() {
  const params = useSearchParams();
  const router = useRouter();
  const [title, setTitle] = useState(params.get("title") || "");
  const deboucedTitle = useDebounce(title, 500);
  const { mangaList, isLoading, error } = useSearchManga(
    {
      title: deboucedTitle,
      includes: [
        MangadexApi.Static.Includes.ARTIST,
        MangadexApi.Static.Includes.AUTHOR,
        MangadexApi.Static.Includes.COVER_ART,
      ],
    },
    { enable: !!deboucedTitle },
  );

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const options = Utils.Mangadex.normalizeParams(params);
    options.title = title;
    clearTitle();
    router.push(Utils.Url.getSearchNetTromUrl(options));
  };

  const clearTitle = useCallback(() => setTitle(""), [setTitle]);

  const handleBackdropClick = useCallback(
    (e: MouseEvent) => {
      if ((e.target as HTMLElement)?.id === "suggest-backdrop") {
        clearTitle();
      }
    },
    [clearTitle],
  );

  return (
    <form onSubmit={handleSubmit} className="input-group">
      <input
        type="text"
        className="searchinput form-control"
        placeholder="Tìm truyện..."
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <div className="input-group-btn">
        <input
          type="submit"
          value=""
          className="searchbutton btn btn-default"
          onClick={handleSubmit}
        />
      </div>
      {title && (
        <>
          <div
            id="suggest-backdrop"
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 backdrop-blur-sm"
            onClick={handleBackdropClick}
          ></div>
          <div className="suggestsearch">
            <div className="suggest-header">
              <h3>Kết quả tìm kiếm</h3>
              <p>
                {isLoading ? "Đang tìm kiếm..." : `${mangaList.length} kết quả`}
              </p>
            </div>

            <div className="suggest-content">
              <DataLoader isLoading={isLoading} error={error}>
                {mangaList.length > 0 ? (
                  <ul className="suggest-list">
                    {mangaList.map((manga) => {
                      const title = Utils.Mangadex.getMangaTitle(manga);
                      const altTitles = Utils.Mangadex.getMangaAltTitles(manga);
                      const cover = Utils.Mangadex.getCoverArt(manga);
                      const tags = manga.attributes.tags
                        .slice(0, 3)
                        .map((t) => t.attributes.name.en);

                      return (
                        <li className="suggest-item">
                          <Link
                            href={Constants.Routes.nettrom.manga(manga.id)}
                            onClick={clearTitle}
                            className="suggest-link"
                          >
                            <div className="suggest-cover">
                              <img
                                className="suggest-image"
                                src={cover}
                                alt={title}
                                loading="lazy"
                              />
                            </div>
                            <div className="suggest-info">
                              <h3 className="suggest-title">{title}</h3>
                              {altTitles.length > 0 && (
                                <p className="suggest-alt-titles">
                                  {altTitles.join(", ")}
                                </p>
                              )}
                              <div className="suggest-meta">
                                {manga.author?.attributes?.name && (
                                  <span className="suggest-author">
                                    Tác giả: {manga.author.attributes.name}
                                  </span>
                                )}
                                {manga.artist?.attributes?.name && (
                                  <span className="suggest-artist">
                                    Họa sĩ: {manga.artist.attributes.name}
                                  </span>
                                )}
                              </div>
                              {tags.length > 0 && (
                                <div className="suggest-tags">
                                  {tags.map((tag, index) => (
                                    <span key={index} className="suggest-tag">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                ) : !isLoading ? (
                  <div className="suggest-empty">
                    <div className="suggest-empty-icon">📚</div>
                    <h3>Không tìm thấy truyện</h3>
                    <p>Thử tìm kiếm với từ khóa khác</p>
                  </div>
                ) : null}
              </DataLoader>
            </div>

            {mangaList.length > 0 && (
              <div className="suggest-footer">
                <p>Nhấn Enter để tìm kiếm nâng cao</p>
              </div>
            )}
          </div>
        </>
      )}
    </form>
  );
}
