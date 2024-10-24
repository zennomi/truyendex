"use client";

import { useCallback, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { toast } from "react-toastify";
import Link from "next/link";

import { useMangadex } from "@/contexts/mangadex";
import { getMangaTitle, getMangaAltTitles } from "@/utils/mangadex";
import { formatNowDistance } from "@/utils/date-fns";
import routes from "@/routes";
import config from "@/config";
import Loading from "@/sections/nettrom/layout/loading";
import { AppApi, MangadexApi } from "@/api";
import { translateStatus, getCoverArt } from "@/utils/mangadex";
import { useAuth } from "@/hooks/useAuth";
import Iconify from "@/components/iconify";
import { useCheckFollowed } from "@/hooks/app";

import ChapterList from "./chapter-list";

export default function Manga({ mangaId }: { mangaId: string }) {
  const { user } = useAuth();
  const { mangas, updateMangas, updateMangaStatistics, mangaStatistics } =
    useMangadex();
  const manga = mangas[mangaId];
  const { data: followed, mutate } = useCheckFollowed(mangaId);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mangaId]);

  useEffect(() => {
    updateMangaStatistics({ manga: [mangaId] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mangaId]);

  if (!manga) return <Loading title="Đang tải thông tin manga" />;

  const title = getMangaTitle(manga);
  const altTitles = getMangaAltTitles(manga);
  const url = routes.nettrom.manga(mangaId);

  return (
    <>
      <ul className="breadcrumb" itemType="http://schema.org/BreadcrumbList">
        <li itemProp="itemListElement" itemType="http://schema.org/ListItem">
          <Link
            href={routes.nettrom.index}
            className="itemcrumb"
            itemProp="item"
            itemType="http://schema.org/Thing"
          >
            <span itemProp="name">Trang chủ</span>
          </Link>
          <meta itemProp="position" content={"1"} />
        </li>
        <li itemProp="itemListElement" itemType="http://schema.org/ListItem">
          <Link
            href={routes.nettrom.search}
            className="itemcrumb"
            itemProp="item"
            itemType="http://schema.org/Thing"
          >
            <span itemProp="name">Truyện Tranh</span>
          </Link>
          <meta itemProp="position" content={"2"} />
        </li>
        <li itemProp="itemListElement" itemType="http://schema.org/ListItem">
          <a
            href={url}
            className="itemcrumb active"
            itemProp="item"
            itemType="http://schema.org/Thing"
          >
            <span itemProp="name">{title}</span>
          </a>
          <meta itemProp="position" content={"3"} />
        </li>
      </ul>
      <article id="item-detail">
        <h1 className="title-detail">{title}</h1>
        <time className="small">
          [Cập nhật lúc:{" "}
          {formatNowDistance(new Date(manga.attributes.updatedAt))} trước]
        </time>
        <div className="detail-info">
          <div className="row">
            <div className="col-xs-4 col-image">
              <div className="relative w-full">
                <Image
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-auto"
                  src={getCoverArt(manga)}
                  alt={title}
                />
              </div>
            </div>
            <div className="col-xs-8 col-info">
              <ul className="list-info">
                {altTitles.length > 0 && (
                  <li className="othername row">
                    <p className="name col-xs-4">
                      <i className="fa fa-plus-square"></i> Tên khác
                    </p>
                    <p className="other-name col-xs-8">
                      {altTitles.join("; ")}
                    </p>
                  </li>
                )}
                <li className="author row">
                  <p className="name col-xs-4">
                    <i className="fa fa-user"></i> Tác giả
                  </p>
                  <p className="col-xs-8">
                    {manga.author?.attributes
                      ? manga.author?.attributes.name
                      : "Đang cập nhật"}{" "}
                    /{" "}
                    {manga.artist?.attributes
                      ? manga.artist?.attributes.name
                      : "Đang cập nhật"}
                  </p>
                </li>
                <li className="status row">
                  <p className="name col-xs-4">
                    <i className="fa fa-rss"></i> Tình trạng
                  </p>
                  <p className="col-xs-8">
                    {translateStatus(manga.attributes.status)}
                  </p>
                </li>
                <li className="kind row">
                  <p className="name col-xs-4">
                    <i className="fa fa-tags"></i> Thể loại
                  </p>
                  <p className="col-xs-8">
                    {manga.attributes.tags.map((tag, idx) => (
                      <span key={tag.id}>
                        <Link
                          href={`${routes.nettrom.search}?includedTags=${tag.id}`}
                        >
                          {tag.attributes.name.en}
                        </Link>
                        {idx !== manga.attributes.tags.length - 1 && ", "}
                      </span>
                    ))}
                  </p>
                </li>
                <li className="row">
                  <p className="name col-xs-4">
                    <i className="fa fa-eye"></i> Lượt xem
                  </p>
                  <p className="col-xs-8">N/A</p>
                </li>
              </ul>
              <div className="mrt5 mrb10" itemType="http://schema.org/Book">
                <a href={routes.nettrom.manga(manga.id)}>
                  <span itemProp="name">{title}</span>
                </a>
                <span
                  itemProp="aggregateRating"
                  itemType="https://schema.org/AggregateRating"
                >
                  {" "}
                  Xếp hạng:{" "}
                  <span itemProp="ratingValue">
                    {mangaStatistics[mangaId]?.rating.bayesian.toFixed(2) || 10}
                  </span>
                  /<span itemProp="bestRating">10</span> -{" "}
                  <span itemProp="ratingCount">
                    {mangaStatistics[mangaId]?.follows}
                  </span>{" "}
                  Lượt theo dõi.
                </span>
              </div>
              <div className="follow">
                <a className="btn btn-danger mr-2" href="#nt_listchapter">
                  <i className="fa fa-eye mr-2" />
                  <span>Đọc ngay</span>
                </a>
                {user ? (
                  <a
                    className="follow-url btn btn-danger"
                    onClick={followManga}
                  >
                    <Iconify
                      icon={followed ? "fa:times-circle" : "fa:heart"}
                      className="inline mr-2"
                    />
                    <span>{followed ? "Bỏ theo dõi" : "Theo dõi"}</span>
                  </a>
                ) : (
                  <Link
                    className="follow-url btn btn-danger"
                    href={routes.loginWithRedirect(window.location.pathname)}
                  >
                    <Iconify icon="fa:heart" className="inline mr-2" />
                    <span>Đăng nhập để theo dõi</span>
                  </Link>
                )}
              </div>
              <div className="read-action mrt10">
                {manga.attributes.links.raw && (
                  <a
                    className="btn btn-warning mrb5 mr-2"
                    href={`https://mangadex.org/title/${manga.id}`}
                    target="_blank"
                  >
                    {" "}
                    Link Mangadex
                  </a>
                )}
                {manga.attributes.links.raw && (
                  <a
                    className="btn btn-warning mrb5 mr-2"
                    href={manga.attributes.links.raw}
                    target="_blank"
                  >
                    {" "}
                    Link Raw
                  </a>
                )}
                {manga.attributes.links.amz && (
                  <a
                    className="btn btn-warning mrb5 mr-2"
                    href={manga.attributes.links.amz}
                    target="_blank"
                  >
                    {" "}
                    Link Amazon
                  </a>
                )}
                {manga.attributes.links.mu && (
                  <a
                    className="btn btn-warning mrb5 mr-2"
                    href={`https://www.mangaupdates.com/series.html?id=${manga.attributes.links.mu}`}
                    target="_blank"
                  >
                    {" "}
                    MangaUpdates
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="detail-content">
          <h3 className="list-title">
            <i className="fa fa-file-text-o"></i> Nội dung
          </h3>
          <div className="">
            <ReactMarkdown>
              {manga.attributes.description.vi ||
                manga.attributes.description.en ||
                ""}
            </ReactMarkdown>
            <Link href="/">Truyện tranh</Link> <Link href={url}>{title}</Link>{" "}
            được cập nhật nhanh và đầy đủ nhất tại {config.appName}. Bạn đọc
            đừng quên để lại bình luận và chia sẻ, ủng hộ {config.appName} ra
            các chương mới nhất của truyện <a href={url}>{title}</a>.
          </div>
          {/* <a href="#" className="morelink less">
                        <i className="fa fa-angle-left" /> Thu gọn
                    </a> */}
        </div>
        <ChapterList mangaId={mangaId} />
      </article>
    </>
  );
}
