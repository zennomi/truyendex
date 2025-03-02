"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "nextjs-toploader/app";
import Link from "next/link";

import { useSearchManga } from "@/hooks/mangadex";
import { useMangadex } from "@/contexts/mangadex";
import { Utils } from "@/utils";
import { Constants } from "@/constants";
import { AspectRatio } from "@/components/shadcn/aspect-ratio";
import LanguageIcon from "@/components/language-icon";

import Pagination from "../Pagination";
import Markdown from "../Markdown";
import ScrollToButton from "../scroll-to-button";
import ReadMore from "../see-more";
import Skeleton from "react-loading-skeleton";

const LIMIT = 12;

export default function MangaResults() {
  const router = useRouter();
  const params = useSearchParams();
  const options = Utils.Mangadex.normalizeParams(params);
  const { mangaList, data, isLoading } = useSearchManga(options);
  const { updateMangaStatistics, mangaStatistics, addMangas } = useMangadex();
  const offset = params.get("offset") ? parseInt(params.get("offset")!) : 0;
  const total = data ? data.total : 0;
  const limit = params.get("limit") ? parseInt(params.get("limit")!) : LIMIT;
  const page = Math.floor(offset / limit);
  const goToPage = (toPage: number) => {
    options.offset = toPage * limit;
    router.push(Utils.Url.getSearchNetTromUrl(options));
  };

  useEffect(() => {
    if (mangaList.length > 0) {
      addMangas(mangaList);
      updateMangaStatistics({ manga: mangaList.map((m) => m.id) });
    }
  }, [mangaList, addMangas, updateMangaStatistics]);

  return (
    <div
      className={` ${mangaList.length > 0 ? "min-h-0" : "min-h-screen"}`}
      id="results"
    >
      <ScrollToButton targetId="results" />
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        {mangaList.map((manga) => {
          const mangaTitle = Utils.Mangadex.getMangaTitle(manga);
          const coverArt = Utils.Mangadex.getCoverArt(manga);
          const mangaStatistic = mangaStatistics[manga.id];
          const url = Constants.Routes.nettrom.manga(manga.id);
          return (
            <div key={manga.id}>
              <div className="h-auto min-h-0 rounded-lg bg-neutral-800 p-2">
                <div className="flex gap-4">
                  <div className="w-[50px] shrink-0 md:w-[100px]">
                    <AspectRatio
                      ratio={Constants.Nettrom.MANGA_COVER_RATIO}
                      className="overflow-hidden rounded-lg group-hover:shadow-lg"
                    >
                      <Link href={url}>
                        <img
                          src={coverArt}
                          className="lazy h-full w-full object-cover transition duration-500 group-hover:scale-[102%]"
                          data-original={coverArt}
                          alt={mangaTitle}
                        />
                      </Link>
                    </AspectRatio>
                  </div>
                  <ReadMore maxHeight={150}>
                    <div className="w-full">
                      <div className="mb-1 flex flex-col items-baseline justify-between md:flex-row">
                        <div className="flex items-center gap-2">
                          <div className="shink-0">
                            <LanguageIcon
                              languageCode={manga.attributes.originalLanguage}
                            />
                          </div>
                          <h1 className="line-clamp-1 font-bold md:text-2xl">
                            <Link href={url}>{mangaTitle}</Link>
                          </h1>
                        </div>
                        <div className="flex items-center justify-between gap-4 text-[11px] text-muted-foreground">
                          <span className="flex items-center gap-[4px]">
                            <i className="fa fa-star"></i>
                            {Utils.Number.formatViews(
                              Math.round(
                                (mangaStatistic?.rating?.bayesian || 0) * 10,
                              ) / 10,
                            )}
                          </span>
                          <span className="flex items-center gap-[4px]">
                            <i className="fa fa-comment" />
                            {Utils.Number.formatViews(
                              mangaStatistic?.comments?.repliesCount || 0,
                            )}
                          </span>
                          <span className="flex items-center gap-[4px]">
                            <i className="fa fa-heart" />
                            {Utils.Number.formatViews(
                              mangaStatistic?.follows || 0,
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="flex w-full flex-wrap overflow-hidden hover:overflow-visible md:overflow-visible">
                        {manga.attributes.tags.map((tag) => (
                          <span
                            key={tag.id}
                            className="mb-2 mr-2 whitespace-nowrap rounded bg-purple-500 px-2 py-1 text-sm text-white md:text-lg"
                          >
                            {tag.attributes.name.en}
                          </span>
                        ))}
                      </div>
                      <div className="text-md hidden text-muted-foreground md:block">
                        <Markdown
                          content={
                            manga.attributes.description.vi ||
                            manga.attributes.description.en ||
                            ""
                          }
                        />
                      </div>
                    </div>
                  </ReadMore>
                </div>
                <div className="text-md block text-muted-foreground md:hidden">
                  <ReadMore maxHeight={150}>
                    <Markdown
                      content={
                        manga.attributes.description.vi ||
                        manga.attributes.description.en ||
                        ""
                      }
                    />
                  </ReadMore>
                </div>
              </div>
            </div>
          );
        })}
        {isLoading && <ListResultSkeleton />}
      </div>

      <Pagination
        onPageChange={(event) => {
          goToPage(event.selected);
        }}
        pageCount={Math.floor(total / limit)}
        forcePage={page}
      />
    </div>
  );
}

function ListResultSkeleton() {
  return [...Array(LIMIT)].map((_, index) => (
    <div key={index} className="rounded-lg bg-neutral-800 p-2">
      <div className="flex gap-4">
        <div className="w-[50px] shrink-0 md:w-[100px]">
          <AspectRatio
            ratio={Constants.Nettrom.MANGA_COVER_RATIO}
            className="overflow-hidden rounded-lg group-hover:shadow-lg"
          >
            <Skeleton width="100%" height="100%" />
          </AspectRatio>
        </div>
        <div className="w-full">
          <div className="mb-1 flex flex-col items-baseline justify-between md:flex-row">
            <div className="flex items-center gap-2">
              <div>
                <Skeleton circle width={14} height={14} />
              </div>
              <h1 className="block font-bold md:text-2xl">
                <Skeleton width="100%" />
              </h1>
            </div>
            <div className="flex items-center justify-between gap-4 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-[4px]">
                <i className="fa fa-star"></i>
                <Skeleton width={20} />
              </span>
              <span className="flex items-center gap-[4px]">
                <i className="fa fa-comment" />
                <Skeleton width={20} />
              </span>
              <span className="flex items-center gap-[4px]">
                <i className="fa fa-heart" />
                <Skeleton width={20} />
              </span>
            </div>
          </div>
          <div className="flex w-full flex-wrap overflow-hidden hover:overflow-visible md:overflow-visible">
            {[...Array(3)].map((_, tag) => (
              <span
                key={tag}
                className="mb-2 mr-2 whitespace-nowrap rounded text-sm text-white md:text-lg"
              >
                <Skeleton width={35} />
              </span>
            ))}
          </div>
          <Skeleton count={3} />
        </div>
      </div>
      <div className="block md:hidden">
        <Skeleton count={5} />
      </div>
    </div>
  ));
}
