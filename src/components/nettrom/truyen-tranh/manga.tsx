"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "nextjs-toploader/app";
import { FaExclamationTriangle, FaExternalLinkAlt } from "react-icons/fa";

import { useMangadex } from "@/contexts/mangadex";
import { AppApi, MangadexApi } from "@/api";
import Iconify from "@/components/iconify";
import { useSeriesInfo } from "@/hooks/core";
import { Utils } from "@/utils";
import ChapterList from "./chapter-list";
import { Constants } from "@/constants";
import { AspectRatio } from "@/components/shadcn/aspect-ratio";
import { Button } from "../Button";
import { DataLoader } from "@/components/DataLoader";
import { useChapterList } from "@/hooks/mangadex";
import { useSettingsContext } from "@/contexts/settings";
import { ExtendManga } from "@/types/mangadex";

import FirstChapterButton from "./first-chapter-button";
import ExternalLinks from "./external-links";
import Markdown from "../Markdown";
import { Alert } from "../Alert";
import { cn } from "@/utils/shadcn";

export default function Manga({
  mangaId,
  prefetchedManga,
}: {
  mangaId: string;
  prefetchedManga: ExtendManga;
}) {
  const { mangas, updateMangas, updateMangaStatistics, mangaStatistics } =
    useMangadex();
  const { filteredLanguages, filteredContent } = useSettingsContext();
  const manga = mangas[mangaId] || prefetchedManga;
  const { data: seriesInfo, mutate } = useSeriesInfo(mangaId);
  const title = Utils.Mangadex.getMangaTitle(manga);
  const altTitles = Utils.Mangadex.getMangaAltTitles(manga);
  const url = Constants.Routes.nettrom.manga(mangaId);
  const [page, setPage] = useState(0);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const { data, chapters, error } = useChapterList(mangaId, {
    offset: page * Constants.Mangadex.CHAPTER_LIST_LIMIT,
    translatedLanguage: filteredLanguages,
  });
  const chapterListData = useMemo(() => data?.data, [data]);
  const router = useRouter();

  const shouldBlock = useMemo(() => {
    return (
      (!filteredContent.includes(
        MangadexApi.Static.MangaContentRating.PORNOGRAPHIC,
      ) &&
        manga.attributes.contentRating ===
          MangadexApi.Static.MangaContentRating.PORNOGRAPHIC) ||
      (!filteredContent.includes(
        MangadexApi.Static.MangaContentRating.EROTICA,
      ) &&
        manga.attributes.contentRating ===
          MangadexApi.Static.MangaContentRating.EROTICA)
    );
  }, [filteredContent, manga.attributes.contentRating]);

  const handleLogin = () => {
    router.push(Constants.Routes.loginWithRedirect(window.location.pathname));
  };

  const followManga = useCallback(async () => {
    try {
      const { followed } = await AppApi.Series.followOrUnfollow(mangaId);
      toast(followed ? "Theo dõi thành công" : "Bỏ theo dõi thành công");
      await mutate();
    } catch {
      toast("Đã có lỗi xảy ra");
    }
  }, [mutate, mangaId]);

  useEffect(() => {
    updateMangas({
      ids: [mangaId],
      includes: [
        MangadexApi.Static.Includes.ARTIST,
        MangadexApi.Static.Includes.AUTHOR,
      ],
    });
    updateMangaStatistics({ manga: [mangaId] });
  }, [mangaId]);

  if (shouldBlock)
    return (
      <div className="mb-2">
        <div className="flex flex-col justify-center">
          <FaExclamationTriangle className="mx-auto text-[100px] text-red-600" />
          <p className="text-center">
            TruyenDex phát hiện truyện có thể có nội dung phản cảm không phù hợp
            với thiết lập của bạn.
          </p>
        </div>
        <div className="mt-4 flex justify-center">
          <Button
            icon={<FaExternalLinkAlt />}
            onClick={() =>
              window.open(`https://mangadex.org/title/${mangaId}`, "_blank")
            }
          >
            Đọc trên MangaDex
          </Button>
        </div>
      </div>
    );

  return (
    <DataLoader
      isLoading={!manga}
      loadingText="Đang tải thông tin truyện..."
      error={error}
    >
      {/* Hero Section Container */}
      <div className="relative mb-8 overflow-hidden rounded-2xl bg-card shadow-lg md:mb-12">
        {/* Dynamic Blurred Background Layer */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat blur-3xl"
          style={{
            backgroundImage: `url('${Utils.Mangadex.getCoverArt(manga, 512)}')`,
          }}
        />
        {/* Semi-transparent Overlay to ensure text readability */}
        <div className="absolute inset-0 z-0 bg-background/80 dark:bg-background/90" />

        {/* Content Layer */}
        <div className="relative z-10 p-6 md:p-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[280px_1fr]">
            {/* Left Column: Cover Art */}
            <div className="mx-auto flex w-[240px] shrink-0 flex-col gap-4 md:mx-0 md:w-full">
              <AspectRatio
                className="overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/20"
                ratio={Constants.Nettrom.MANGA_COVER_RATIO}
              >
                <img
                  className="h-full w-full object-cover transition duration-300 hover:scale-105"
                  src={Utils.Mangadex.getCoverArt(manga, 512)}
                  alt={title}
                />
              </AspectRatio>
              {/* Action Buttons (Prioritized for Mobile) */}
              <div className="flex flex-col justify-between gap-3 md:mb-0">
                <FirstChapterButton mangaId={mangaId} />
                {seriesInfo &&
                  (seriesInfo.followed !== null ? (
                    <Button
                      className={`w-full sm:w-auto ${
                        seriesInfo.followed
                          ? "border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive"
                          : ""
                      }`}
                      icon={
                        <Iconify
                          icon={
                            seriesInfo.followed ? "fa:times-circle" : "fa:heart"
                          }
                        />
                      }
                      variant="outline"
                      onClick={followManga}
                    >
                      {seriesInfo.followed ? "Bỏ theo dõi" : "Theo dõi"}
                    </Button>
                  ) : (
                    <Button
                      className="w-full sm:w-auto"
                      icon={<Iconify icon="fa:heart" />}
                      variant="outline"
                      onClick={handleLogin}
                    >
                      Đăng nhập để theo dõi
                    </Button>
                  ))}
              </div>
            </div>

            {/* Right Column: Meta Info */}
            <div className="flex flex-col">
              {/* Title */}
              <h1
                className={cn(
                  "mb-4 text-center font-bold tracking-tight text-foreground md:text-left",
                  title.length < 50 && "text-3xl md:text-4xl lg:text-5xl",
                  title.length >= 50 &&
                    title.length < 100 &&
                    "text-2xl md:text-3xl lg:text-4xl",
                  title.length >= 100 && "text-xl md:text-2xl lg:text-3xl",
                )}
              >
                {title}
              </h1>

              {/* Toggleable Info Section */}
              <div
                className={`flex flex-col ${showMoreInfo ? "flex" : "hidden md:flex"}`}
              >
                {/* Alt titles if exist */}
                {altTitles.length > 0 && (
                  <div className="mb-4 flex flex-wrap justify-center gap-2 text-sm text-muted-foreground md:justify-start">
                    <span className="font-medium text-foreground">
                      Tên khác:
                    </span>
                    <span className="italic">{altTitles.join(", ")}</span>
                  </div>
                )}

                {/* Stats Bar */}
                <div className="mb-6 flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-foreground md:justify-start md:gap-6">
                  <div className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-primary">
                    <i className="fa fa-star" />
                    <span>
                      {mangaStatistics[mangaId]?.rating.bayesian.toFixed(2) ||
                        6}{" "}
                      / 10
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full bg-secondary/80 px-3 py-1.5">
                    <i className="fa fa-heart text-rose-500" />
                    <span>
                      {Utils.Number.formatViews(
                        mangaStatistics[mangaId]?.follows || 0,
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full bg-secondary/80 px-3 py-1.5">
                    <i className="fa fa-comment text-blue-500" />
                    <span>
                      {Utils.Number.formatViews(seriesInfo?.comment_count || 0)}
                    </span>
                  </div>
                </div>

                {/* Info Grid */}
                <div className="mb-6 flex flex-col gap-y-3 text-sm">
                  <div className="flex">
                    <span className="w-28 shrink-0 font-medium text-muted-foreground">
                      Tác giả
                    </span>
                    <span className="font-medium">
                      {manga?.author?.attributes
                        ? manga?.author?.attributes.name
                        : "N/A"}{" "}
                      <span className="text-muted-foreground">/</span>{" "}
                      {manga?.artist?.attributes
                        ? manga?.artist?.attributes.name
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-28 shrink-0 font-medium text-muted-foreground">
                      Tình trạng
                    </span>
                    <span className="flex items-center gap-1.5 font-medium capitalize">
                      {Utils.Mangadex.translateStatus(manga?.attributes.status)}
                      {manga?.attributes.year && (
                        <span className="rounded bg-secondary px-1.5 py-0.5 text-xs">
                          {manga.attributes.year}
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-28 shrink-0 font-medium text-muted-foreground">
                      Ngôn ngữ gốc
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <Iconify
                        icon={`circle-flags:lang-${manga.attributes.originalLanguage}`}
                      />
                      {Utils.Mangadex.translateISOLanguage(
                        manga.attributes.originalLanguage,
                      )}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-28 shrink-0 font-medium text-muted-foreground">
                      Nội dung
                    </span>
                    <span className="font-medium">
                      {Utils.Mangadex.translateContentRating(
                        manga?.attributes.contentRating,
                      )}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="mt-0.5 w-28 shrink-0 font-medium text-muted-foreground">
                      Nguồn
                    </span>
                    {manga && (
                      <div className="flex-1">
                        <ExternalLinks
                          links={manga.attributes.links}
                          mangaId={manga.id}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Genres / Tags */}
                <div className="mb-4 flex flex-wrap justify-center gap-2 md:mb-8 md:justify-start">
                  {manga?.attributes.tags.map((tag) => (
                    <Link
                      key={tag.id}
                      href={`${Constants.Routes.nettrom.search}?includedTags=${tag.id}`}
                      className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition hover:bg-primary/20 hover:text-primary"
                    >
                      {tag.attributes.name.en}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile Toggle Button */}
              <Button
                variant="ghost"
                className="mt-2 w-full text-muted-foreground md:hidden"
                onClick={() => setShowMoreInfo(!showMoreInfo)}
              >
                {showMoreInfo ? (
                  <>
                    <Iconify icon="fa:angle-up" className="mr-2" /> Ẩn bớt
                  </>
                ) : (
                  <>
                    <Iconify icon="fa:angle-down" className="mr-2" /> Xem thêm
                    thông tin
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <article id="" className="dark:text-foreground">
        {(manga.attributes.contentRating ===
          MangadexApi.Static.MangaContentRating.PORNOGRAPHIC ||
          manga.attributes.contentRating ===
            MangadexApi.Static.MangaContentRating.EROTICA) && (
          <div className="mb-6">
            <Alert
              title="Phát hiện truyện có thể có nội dung phản cảm theo đánh giá của MangaDex. TruyenDex không chịu trách nhiệm với nội dung của truyện."
              classNames={{
                alert: "[&>svg]:text-red-500 text-red-500 bg-red-100",
              }}
            />
          </div>
        )}
        <div
          className={`mb-8 rounded-xl border border-border bg-card p-6 shadow-sm ${showMoreInfo ? "block" : "hidden md:block"}`}
        >
          <div className="mb-4 flex items-center justify-between border-b pb-4">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-foreground">
              <i className="fa fa-align-left text-muted-foreground/60"></i>
              <span>Tóm tắt nội dung</span>
            </h2>
            <div className="text-sm text-muted-foreground">
              <i className="fa fa-clock mr-1.5" />
              <span className="hidden sm:inline">Cập nhật lúc: </span>
              {manga?.attributes?.updatedAt
                ? Utils.Date.formatNowDistance(
                    new Date(manga?.attributes?.updatedAt),
                  )
                : ""}{" "}
              trước
            </div>
          </div>
          <div className="w-full">
            {
              <Markdown
                content={
                  manga?.attributes?.description.vi ||
                  manga?.attributes?.description.en ||
                  ""
                }
              />
            }
            <p className="text-muted-foreground">
              Truyện tranh{" "}
              <Link
                href={url}
                className="text-web-title transition hover:text-web-titleLighter"
              >
                {title}
              </Link>{" "}
              được cập nhật nhanh và đầy đủ nhất tại{" "}
              <Link
                href={"/"}
                className="text-web-title transition hover:text-web-titleLighter"
              >
                {Constants.APP_NAME}
              </Link>
              . Bạn đọc đừng quên để lại bình luận và chia sẻ, ủng hộ{" "}
              {Constants.APP_NAME} ra các chương mới nhất của truyện{" "}
              <Link
                href={url}
                className="text-web-title transition hover:text-web-titleLighter"
              >
                {title}
              </Link>
              .
            </p>
          </div>
          {/* <a href="#" className="morelink less">
                        <i className="fa fa-angle-left" /> Thu gọn
                    </a> */}
        </div>
        <ChapterList
          mangaId={mangaId}
          page={page}
          onPageChange={setPage}
          data={chapterListData}
          items={chapters}
        />
      </article>
    </DataLoader>
  );
}
