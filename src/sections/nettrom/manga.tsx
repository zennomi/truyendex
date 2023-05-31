"use client"

import { useEffect } from "react"
import ReactMarkdown from 'react-markdown'

import { useMangadex } from "../../contexts/mangadex"
import getTitleManga from "../../utils/getTitleManga"
import { formatNowDistance } from "../../utils/dateFns"
import getCoverArt from "../../utils/getCoverArt"
import { Includes } from "../../api/static"
import ChapterList from "./chapterList"
import Link from "next/link"
import routes from "../../routes"
import { parseStatus } from "../../utils/parseMangadex"

export default function Manga({ mangaId }: { mangaId: string }) {
    const { mangas, updateMangas, updateMangaStatistics, mangaStatistics } = useMangadex()
    const manga = mangas[mangaId]
    useEffect(() => {
        updateMangas({ ids: [mangaId], includes: [Includes.ARTIST, Includes.AUTHOR] })
        updateMangaStatistics({ manga: [mangaId] })
    }, [])

    if (!manga) return <div>Loading...</div>

    const title = getTitleManga(manga)
    const url = routes.nettrom.manga(mangaId)
    return (
        <div id="ctl00_divCenter" className="center-side col-md-8">
            <ul
                className="breadcrumb"
                itemType="http://schema.org/BreadcrumbList"
            >
                <li
                    itemProp="itemListElement"
                    itemType="http://schema.org/ListItem"
                >
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
                <li
                    itemProp="itemListElement"
                    itemType="http://schema.org/ListItem"
                >
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
                <li
                    itemProp="itemListElement"
                    itemType="http://schema.org/ListItem"
                >
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
                <time className="small">[Cập nhật lúc: {formatNowDistance(new Date(manga.attributes.updatedAt))} trước]</time>
                <div className="detail-info">
                    <div className="row">
                        <div className="col-xs-4 col-image">
                            <img
                                src={getCoverArt(manga)}
                                alt={title}
                            />
                        </div>
                        <div className="col-xs-8 col-info">
                            <ul className="list-info">
                                <li className="author row">
                                    <p className="name col-xs-4">
                                        <i className="fa fa-user"></i> Tác giả
                                    </p>
                                    <p className="col-xs-8">{manga.author?.attributes ? manga.author?.attributes.name : "Đang cập nhật"} / {manga.artist?.attributes ? manga.artist?.attributes.name : "Đang cập nhật"}</p>
                                </li>
                                <li className="status row">
                                    <p className="name col-xs-4">
                                        <i className="fa fa-rss"></i> Tình trạng
                                    </p>
                                    <p className="col-xs-8">{parseStatus(manga.attributes.status)}</p>
                                </li>
                                <li className="kind row">
                                    <p className="name col-xs-4">
                                        <i className="fa fa-tags"></i> Thể loại
                                    </p>
                                    <p className="col-xs-8">
                                        {
                                            manga.attributes.tags.map((tag, idx) => (
                                                <>
                                                    <Link key={tag.id} href={`${routes.nettrom.search}?includedTags=${tag.id}`}>
                                                        {tag.attributes.name.en}
                                                    </Link>
                                                    {
                                                        idx !== manga.attributes.tags.length && ", "
                                                    }
                                                </>
                                            ))
                                        }
                                    </p>
                                </li>
                                <li className="row">
                                    <p className="name col-xs-4">
                                        <i className="fa fa-eye"></i> Lượt xem
                                    </p>
                                    <p className="col-xs-8">N/A</p>
                                </li>
                            </ul>
                            <div
                                className="mrt5 mrb10"
                                itemType="http://schema.org/Book"
                            >
                                <a href={routes.nettrom.manga(manga.id)}>
                                    <span itemProp="name">{title}</span>
                                </a>
                                <span
                                    itemProp="aggregateRating"
                                    itemType="https://schema.org/AggregateRating"
                                >
                                    {" "}
                                    Xếp hạng: <span itemProp="ratingValue">{mangaStatistics[mangaId]?.rating.bayesian.toFixed(2) || 10}</span>/
                                    <span itemProp="bestRating">10</span> -{" "}
                                    <span itemProp="ratingCount">{mangaStatistics[mangaId]?.follows}</span> Lượt theo dõi.
                                </span>
                            </div>
                            <div className="read-action mrt10">
                                <a
                                    className="btn btn-warning mrb5 mr-2"
                                    href="https://www.nettruyento.com/truyen-tranh/dai-quan-gia-la-ma-hoang/chap-0/459973"
                                >
                                    {" "}
                                    Đọc từ đầu
                                </a>
                                <a
                                    className="btn btn-warning mrb5"
                                    href="https://www.nettruyento.com/truyen-tranh/dai-quan-gia-la-ma-hoang/chap-400/1002325"
                                >
                                    {" "}
                                    Đọc mới nhất
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="detail-content">
                    <h3 className="list-title">
                        <i className="fa fa-file-text-o"></i> Nội dung
                    </h3>
                    <p className="">
                        <ReactMarkdown>
                            {manga.attributes.description.vi || manga.attributes.description.en || ""}
                        </ReactMarkdown>
                        <Link href="/">Truyện tranh</Link>{" "}
                        <Link href={url}>
                            {title}
                        </Link>{" "}
                        được cập nhật nhanh và đầy đủ nhất tại NetTrom. Bạn đọc đừng quên để
                        lại bình luận và chia sẻ, ủng hộ NetTrom ra các chương mới nhất của
                        truyện{" "}
                        <a href={url}>
                            {title}
                        </a>
                        .
                    </p>
                    <a href="#" className="morelink less">
                        <i className="fa fa-angle-left" /> Thu gọn
                    </a>
                </div>
                <ChapterList mangaId={mangaId} />
            </article>
        </div>
    )
} 