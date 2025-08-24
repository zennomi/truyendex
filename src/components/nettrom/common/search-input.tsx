"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { MouseEvent, useCallback, useState } from "react";

import { MangadexApi } from "@/api";
import { DataLoader } from "@/components/DataLoader";
import { TooltipComponent } from "@/components/shadcn/tooltip";
import { Constants } from "@/constants";
import { useSearchManga } from "@/hooks/mangadex";
import useDebounce from "@/hooks/useDebounce";
import { Utils } from "@/utils";
import Link from "next/link";

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
      <div className="input-group-btn z-2">
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
          <div className="absolute left-0 top-full z-[1000] max-h-[350px] w-full overflow-hidden border border-gray-200 bg-white shadow-lg transition-all duration-300 ease-out md:max-h-[400px] md:w-[295px] lg:w-[455px]">
            <div className="border-b border-gray-100 bg-gray-50 px-4 py-3">
              <h3 className="mb-1 text-xl font-semibold text-gray-700">
                Kết quả tìm kiếm
              </h3>
              <p className="text-lg text-gray-500">
                {isLoading ? "Đang tìm kiếm..." : `${mangaList.length} kết quả`}
              </p>
            </div>

            <div className="max-h-[270px] overflow-y-auto md:max-h-[320px]">
              <DataLoader isLoading={isLoading} error={error}>
                {mangaList.length > 0 ? (
                  <ul className="m-0 list-none p-0">
                    {mangaList.map((manga) => {
                      const title = Utils.Mangadex.getMangaTitle(manga);
                      const altTitles = Utils.Mangadex.getMangaAltTitles(manga);
                      const cover = Utils.Mangadex.getCoverArt(manga);
                      const tags = manga.attributes.tags.map(
                        (t) => t.attributes.name.en,
                      );

                      return (
                        <li className="border-b border-gray-100 transition-colors duration-150 last:border-b-0 hover:bg-gray-50">
                          <Link
                            href={Constants.Routes.nettrom.manga(manga.id)}
                            onClick={clearTitle}
                            className="block p-4 text-inherit no-underline hover:text-inherit focus:text-inherit active:text-inherit"
                          >
                            <div className="float-left mr-3 h-32 w-24 overflow-hidden rounded shadow-sm">
                              <img
                                className="h-full w-full object-cover"
                                src={cover}
                                alt={title}
                                loading="lazy"
                              />
                            </div>
                            <div className="overflow-hidden">
                              <h3 className="mb-1 overflow-hidden text-ellipsis whitespace-nowrap text-xl font-semibold leading-tight text-gray-900">
                                <TooltipComponent
                                  size="xl"
                                  content={title}
                                  side="top"
                                >
                                  <span className="text-xl font-semibold leading-tight text-gray-900">
                                    {title}
                                  </span>
                                </TooltipComponent>
                              </h3>
                              {altTitles.length > 0 && (
                                <p className="mb-1.5 overflow-hidden text-ellipsis whitespace-nowrap text-base text-gray-500">
                                  {altTitles.join(", ")}
                                </p>
                              )}
                              <div className="mb-1.5 text-[11px] text-gray-500">
                                {manga.author?.attributes?.name && (
                                  <span className="mb-0.5 block overflow-hidden text-ellipsis whitespace-nowrap">
                                    Tác giả: {manga.author.attributes.name}
                                  </span>
                                )}
                                {manga.artist?.attributes?.name && (
                                  <span className="mb-0.5 block overflow-hidden text-ellipsis whitespace-nowrap">
                                    Họa sĩ: {manga.artist.attributes.name}
                                  </span>
                                )}
                              </div>
                              {tags.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                  {tags.map((tag, index) => (
                                    <span
                                      key={index}
                                      className="whitespace-nowrap rounded-full bg-blue-100 px-1.5 py-0.5 text-[10px] font-medium text-blue-700"
                                    >
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
                  <div className="px-4 py-8 text-center">
                    <div className="mb-3 text-3xl">📚</div>
                    <h3 className="mb-1 text-sm font-semibold text-gray-700">
                      Không tìm thấy truyện
                    </h3>
                    <p className="text-xs text-gray-500">
                      Thử tìm kiếm với từ khóa khác
                    </p>
                  </div>
                ) : null}
              </DataLoader>
            </div>

            {mangaList.length > 0 && (
              <div className="border-t border-gray-100 bg-gray-50 px-4 py-2 text-center">
                <p className="text-[11px] text-gray-500">
                  Nhấn Enter để tìm kiếm nâng cao
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </form>
  );
}
