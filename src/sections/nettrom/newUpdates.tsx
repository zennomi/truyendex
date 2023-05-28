"use client"

import Link from "next/link";
import { useEffect } from "react";

import useLastUpdates from "../../hooks/useLastUpdates"
import { useMangadex } from "../../contexts/mangadex";
import getCoverArt from "../../utils/getCoverArt";
import { ExtendChapter } from "../../api/extend";
import getTitleManga from "../../utils/getTitleManga";
import getTitleChapter from "../../utils/getTitleChapter";
import { formatNowDistance } from "../../utils/dateFns";


export default function NewUpdates() {
    const { chapters, isLoading, error } = useLastUpdates();
    const { mangas, updateMangas, updateMangaStatistics, mangaStatistics } = useMangadex()
    const updates: Record<string, ExtendChapter[]> = {}

    if (chapters) {
        for (const chapter of chapters) {
            const mangaId = chapter.manga?.id!
            if (!updates[mangaId]) {
                updates[mangaId] = []
            }
            updates[mangaId].push(chapter)
        }
    }

    useEffect(() => {
        if (chapters?.length > 0) {
            updateMangas({ ids: chapters.filter(c => !!c?.manga?.id).map(c => c.manga?.id!) })
            updateMangaStatistics({ manga: chapters.filter(c => !!c?.manga?.id).map(c => c.manga?.id!) })
        }
    }, [chapters])

    useEffect(() => {

    }, [mangas])

    if (isLoading) return <div>loading...</div>;
    if (error) return <div>error</div>;

    return (
        <div id="ctl00_divCenter" className="center-side col-md-8">
            <div className="Module Module-163">
                <div className="ModuleContent">
                    <div className="items">
                        <div className="relative">
                            <h1 className="page-title">
                                Truyện mới cập nhật <i className="fa fa-angle-right" />
                            </h1>
                            <a
                                className="filter-icon"
                                title="Tìm truyện nâng cao"
                                href="/tim-truyen-nang-cao"
                            >
                                <i className="fa fa-filter"></i>
                            </a>
                        </div>
                        <div className="row">
                            {
                                Object.entries(updates).map(([mangaId, chapterList]) => {
                                    const coverArt = getCoverArt(mangas[mangaId])
                                    const mangaTitle = getTitleManga(mangas[mangaId])
                                    return (
                                        <div className="item" key={mangaId}>
                                            <figure className="clearfix">
                                                <div className="image">
                                                    <Link
                                                        title={mangaTitle}
                                                        href={`/nettrom/truyen-tranh/${mangaId}`}
                                                    >
                                                        <img
                                                            src={coverArt}
                                                            className="lazy center"
                                                            data-original={coverArt}
                                                            alt={mangaTitle}
                                                        />
                                                    </Link>
                                                    <div className="view clearfix">
                                                        <span className="pull-left">
                                                            <i className="fa fa-star"></i> {mangaStatistics[mangaId] && Math.round((mangaStatistics[mangaId].rating.bayesian || 0) * 10) / 10 || "N/A"}{" "}
                                                            <i className="fa fa-comment" /> {mangaStatistics[mangaId] && mangaStatistics[mangaId].comments?.repliesCount || "N/A"}{" "}
                                                            <i className="fa fa-heart" /> {mangaStatistics[mangaId] && mangaStatistics[mangaId].follows || "N/A"}
                                                        </span>
                                                    </div>
                                                </div>
                                                <figcaption>
                                                    <h3>
                                                        <Link
                                                            className="jtip"
                                                            data-jtip="#truyen-tranh-83823"
                                                            href={`/nettrom/truyen-tranh/${mangaId}`}
                                                        >
                                                            {mangaTitle}
                                                        </Link>
                                                    </h3>
                                                    <ul className="comic-item">
                                                        {chapterList.slice(0, 3).map(chapter => (
                                                            <li className="flex gap-x-1 items-center justify-between" key={chapter.id}>
                                                                <a
                                                                    href="#"
                                                                    title={getTitleChapter(chapter)}
                                                                    className="flex-grow text-[13px] whitespace-nowrap overflow-hidden !text-white text-ellipsis"
                                                                >
                                                                    {getTitleChapter(chapter)}
                                                                </a>
                                                                <i className="text-[11px] text-[#999] italic leading-[13px] whitespace-nowrap">{formatNowDistance(new Date(chapter.attributes.readableAt))}</i>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </figcaption>
                                            </figure>
                                            <div
                                                className="box_tootip"
                                                style={{ display: "none" }}
                                                id="truyen-tranh-83823"
                                            >
                                                <div className="box_li">
                                                    <div className="title">Anh Chồng Giàu Có Chiều Hư Tôi</div>
                                                    <div className="clearfix">
                                                        <div className="box_img">
                                                            <a
                                                                title="Anh Chồng Giàu Có Chiều Hư Tôi"
                                                                href={`/nettrom/truyen-tranh/${mangaId}`}
                                                            >
                                                                <img
                                                                    className="img_a"
                                                                    src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                                                                    data-original={coverArt}
                                                                    alt="Anh Chồng Giàu Có Chiều Hư Tôi"
                                                                />
                                                            </a>
                                                        </div>
                                                        <div className="message_main">
                                                            <p>
                                                                <label>Thể loại:</label>Drama, Manhua, Ngôn Tình, Truyện
                                                                Màu
                                                            </p>
                                                            <p>
                                                                <label>Tình trạng:</label>Đang tiến hành
                                                            </p>
                                                            <p>
                                                                <label>Lượt xem:</label>235K
                                                            </p>
                                                            <p>
                                                                <label>Bình luận:</label>78
                                                            </p>
                                                            <p>
                                                                <label>Theo dõi:</label>4.906
                                                            </p>
                                                            <p>
                                                                <label>Ngày cập nhật:</label>29 phút trước
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="box_text" />
                                                </div>
                                            </div>
                                        </div>)
                                })
                            }

                        </div>
                    </div>
                    <div id="ctl00_mainContent_ctl00_divPager" className="pagination-outter">
                        <ul className="pagination">
                            <li className="hidden">Trang 1 / 589 </li>
                            <li className="active">
                                <a
                                    href="/nettrom/"
                                    title="Đang hiện kết quả 1 tới 36 / 21200"
                                >
                                    1
                                </a>{" "}
                            </li>
                            <li>
                                <a
                                    href="/nettrom/?page=2"
                                    title="Hiện kết quả 37 tới 72 / 21200"
                                >
                                    2
                                </a>{" "}
                            </li>
                            <li>
                                <a
                                    href="/nettrom/?page=3"
                                    title="Hiện kết quả 73 tới 108 / 21200"
                                >
                                    3
                                </a>{" "}
                            </li>
                            <li>
                                <a
                                    href="/nettrom/?page=4"
                                    title="Hiện kết quả 109 tới 144 / 21200"
                                >
                                    4
                                </a>{" "}
                            </li>
                            <li>
                                <a
                                    href="/nettrom/?page=5"
                                    title="Hiện kết quả 145 tới 180 / 21200"
                                >
                                    5
                                </a>{" "}
                            </li>
                            <li className="PagerSSCCells">
                                <a
                                    href="/nettrom/?page=100"
                                    title="Hiện kết quả 3565 tới 3600 / 21200"
                                >
                                    100
                                </a>{" "}
                            </li>
                            <li className="PagerSSCCells">
                                <a
                                    href="/nettrom/?page=200"
                                    title="Hiện kết quả 7165 tới 7200 / 21200"
                                >
                                    200
                                </a>{" "}
                            </li>
                            <li className="PagerSSCCells">
                                <a
                                    href="/nettrom/?page=290"
                                    title="Hiện kết quả 10405 tới 10440 / 21200"
                                >
                                    290
                                </a>{" "}
                            </li>
                            <li className="PagerSSCCells">
                                <a
                                    href="/nettrom/?page=390"
                                    title="Hiện kết quả 14005 tới 14040 / 21200"
                                >
                                    390
                                </a>{" "}
                            </li>
                            <li className="PagerSSCCells">
                                <a
                                    href="/nettrom/?page=490"
                                    title="Hiện kết quả 17605 tới 17640 / 21200"
                                >
                                    490
                                </a>{" "}
                            </li>
                            <li>
                                <a
                                    className="next-page"
                                    href="/nettrom/?page=2"
                                    title="Chuyển đến trang 2"
                                >
                                    ›
                                </a>{" "}
                            </li>
                            <li>
                                <a href="/nettrom/?page=589" title="Trang cuối">
                                    »
                                </a>{" "}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}