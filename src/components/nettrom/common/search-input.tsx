"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { MouseEvent, useCallback, useState } from "react";

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
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            onClick={handleBackdropClick}
          ></div>
          <div className="suggestsearch">
            {
              <DataLoader isLoading={isLoading} error={error}>
                <></>
              </DataLoader>
            }
            <ul>
              {mangaList.map((manga) => {
                const title = Utils.Mangadex.getMangaTitle(manga);
                const altTitles = Utils.Mangadex.getMangaAltTitles(manga);
                const cover = Utils.Mangadex.getCoverArt(manga);
                return (
                  <li>
                    <Link
                      href={Constants.Routes.nettrom.manga(manga.id)}
                      onClick={clearTitle}
                    >
                      <img
                        className="lazy image-thumb"
                        src={cover}
                        alt={title}
                      />
                      <h3>{title}</h3>
                      <h4>
                        <i>{altTitles.join(",")}</i>
                        <i>
                          <b>
                            {manga.author?.attributes?.name || "N/A"} -{" "}
                            {manga.artist?.attributes?.name || "N/A"}{" "}
                          </b>
                        </i>
                        <i>
                          {manga.attributes.tags
                            .map((t) => t.attributes.name.en)
                            .join(", ")}
                        </i>
                      </h4>
                    </Link>
                  </li>
                );
              })}
              {!isLoading && mangaList.length === 0 && (
                <li className="px-2 text-black">
                  <h3>Không tìm thấy truyện nào</h3>
                </li>
              )}
            </ul>
          </div>
        </>
      )}
    </form>
  );
}
