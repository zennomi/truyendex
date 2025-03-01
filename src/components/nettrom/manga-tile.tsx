import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

import { Constants } from "@/constants";
import { ReadingHistory } from "@/types";
import { MangaStatistic } from "@/types/mangadex";
import { Utils } from "@/utils";
import Skeleton from "react-loading-skeleton";

const MangaTile = (props: {
  id: string;
  title: string;
  thumbnail: string;
  chapters: { id: string; title: string; subTitle: string }[];
  readedChapters?: ReadingHistory;
  mangaStatistic?: MangaStatistic;
  className?: string;
}) => {
  const readedChaptersId = props.readedChapters?.chapterId ?? null;
  return (
    <div className={twMerge("group", props.className)}>
      <figure className="clearfix">
        <div className="relative mb-2">
          <Link
            title={props.title}
            href={Constants.Routes.nettrom.manga(props.id)}
          >
            <AspectRatio
              ratio={Constants.Nettrom.MANGA_COVER_RATIO}
              className="overflow-hidden rounded-lg group-hover:shadow-lg"
            >
              <div className="absolute bottom-0 left-0 z-[1] h-3/5 w-full bg-gradient-to-t from-neutral-900 from-[15%] to-transparent transition-all duration-500 group-hover:h-3/4"></div>
              <img
                src={props.thumbnail}
                className="lazy h-full w-full object-cover transition duration-500 group-hover:scale-[102%]"
                data-original={props.thumbnail}
                alt={props.title}
              />
            </AspectRatio>
            <div className="absolute bottom-0 left-0 z-[2] w-full px-2 py-1.5">
              <h3 className="mb-2 line-clamp-2 text-[14px] font-semibold leading-tight text-white transition group-hover:line-clamp-4">
                {props.title}
              </h3>
              <span className="flex items-center justify-between gap-[4px] text-[11px] text-muted-foreground">
                <span className="flex items-center gap-[4px]">
                  <i className="fa fa-star"></i>
                  {Utils.Number.formatViews(
                    Math.round(
                      (props.mangaStatistic?.rating?.bayesian || 0) * 10,
                    ) / 10,
                  )}
                </span>
                <span className="flex items-center gap-[4px]">
                  <i className="fa fa-comment" />
                  {Utils.Number.formatViews(
                    props.mangaStatistic?.comments?.repliesCount || 0,
                  )}
                </span>
                <span className="flex items-center gap-[4px]">
                  <i className="fa fa-heart" />
                  {Utils.Number.formatViews(props.mangaStatistic?.follows || 0)}
                </span>
              </span>
            </div>
          </Link>
        </div>
        <figcaption>
          <ul className="flex flex-col gap-[4px]">
            {props.chapters.map((chapter) => (
              <li
                className="flex items-center justify-between gap-x-2 text-[12px]"
                key={chapter.id}
              >
                <Link
                  href={Constants.Routes.nettrom.chapter(chapter.id)}
                  title={chapter.title}
                  className={twMerge(
                    "flex-grow overflow-hidden text-ellipsis whitespace-nowrap transition visited:text-web-titleDisabled hover:text-web-titleLighter",
                    readedChaptersId === chapter.id
                      ? "text-web-titleDisabled"
                      : "text-web-title",
                  )}
                >
                  {chapter.title}
                </Link>
                <span className="whitespace-nowrap leading-[13px] text-muted-foreground">
                  {chapter.subTitle}
                </span>
              </li>
            ))}
          </ul>
        </figcaption>
      </figure>
    </div>
  );
};

export const MangaTileSkeleton = () => {
  return (
    <div className="group">
      <figure className="clearfix">
        <div className="relative mb-2">
          <AspectRatio
            ratio={Constants.Nettrom.MANGA_COVER_RATIO}
            className="overflow-hidden rounded-lg group-hover:shadow-lg"
          >
            <div className="absolute bottom-0 left-0 z-[1] h-3/5 w-full bg-gradient-to-t from-neutral-900 from-[15%] to-transparent transition-all duration-500 group-hover:h-3/4"></div>
            <div className="lazy h-full w-full object-cover transition duration-500">
              <Skeleton width="100%" height="100%" />
            </div>
          </AspectRatio>
          <div className="absolute bottom-0 left-0 z-[2] w-full px-2 py-1.5">
            <h3 className="mb-2 line-clamp-2 text-[14px] font-semibold leading-tight text-white transition group-hover:line-clamp-4">
              <Skeleton />
            </h3>
            <span className="flex items-center justify-between gap-[4px] text-[11px] text-muted-foreground">
              <span className="flex items-center gap-[4px]">
                <i className="fa fa-star"></i>
                <Skeleton />
              </span>
              <span className="flex items-center gap-[4px]">
                <i className="fa fa-comment" />
                <Skeleton />
              </span>
              <span className="flex items-center gap-[4px]">
                <i className="fa fa-heart" />
                <Skeleton />
              </span>
            </span>
          </div>
        </div>
        <figcaption>
          <ul className="flex flex-col gap-[4px]">
            {[...Array(3)].map((_, index) => (
              <li
                className="flex items-center justify-between gap-x-2 text-[12px]"
                key={index}
              >
                <Link
                  href="#"
                  className={
                    "flex-grow overflow-hidden text-ellipsis whitespace-nowrap transition visited:text-web-titleDisabled hover:text-web-titleLighter"
                  }
                >
                  <Skeleton />
                </Link>
                <span className="whitespace-nowrap leading-[13px] text-muted-foreground">
                  <Skeleton />
                </span>
              </li>
            ))}
          </ul>
        </figcaption>
      </figure>
    </div>
  );
};

export default MangaTile;
