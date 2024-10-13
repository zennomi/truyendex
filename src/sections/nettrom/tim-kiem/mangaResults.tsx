"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect } from "react"
import useSearchManga from "@/hooks/useSearchManga"
import routes from "@/routes"
import { useMangadex } from "@/contexts/mangadex"
import Link from "next/link"
import ReactPaginate from "react-paginate"
import { getSearchNetTromUrl } from "@/utils/url"
import Loading from "@/components/nettrom/loading"
import { getCoverArt, getMangaTitle, normalizeParams } from "@/utils/mangadex"

export default function MangaResults() {
    const router = useRouter()
    const params = useSearchParams()
    const options = normalizeParams(params)
    const { mangaList, data, isLoading } = useSearchManga(options)
    const { updateMangaStatistics, mangaStatistics, addMangas } = useMangadex()
    const offset = params.get("offset") ? parseInt(params.get("offset")!) : 0
    const total = data ? data.total : 0
    const limit = params.get("limit") ? parseInt(params.get("limit")!) : 24
    const page = Math.floor(offset / limit)
    const goToPage = (toPage: number) => {
        options.offset = (toPage * limit)
        router.push(getSearchNetTromUrl(options))
    }

    useEffect(() => {
        if (mangaList.length > 0) {
            addMangas(mangaList)
            updateMangaStatistics({ manga: mangaList.map(m => m.id) })
        }
    }, [mangaList])

    if (isLoading) return (<Loading title="Đang tìm truyện..." />)

    return (
        <div className={`Module Module-223 ${mangaList.length > 0 ? "min-h-0" : "min-h-screen"}`} id="results">
            <div className="ModuleContent">
                <div className="items">
                    <div className="row">
                        {
                            mangaList.map(manga => {
                                const mangaTitle = getMangaTitle(manga)
                                const coverArt = getCoverArt(manga)
                                return (
                                    <div className="item" key={manga.id}>
                                        <figure className="clearfix">
                                            <div className="image">
                                                <a
                                                    title={mangaTitle}
                                                    href={routes.nettrom.manga(manga.id)}
                                                >
                                                    <img
                                                        src={coverArt}
                                                        className="lazy center"
                                                        data-original={coverArt}
                                                        alt={mangaTitle}
                                                    />
                                                </a>
                                                <div className="view clearfix">
                                                    <span className="pull-left">
                                                        <i className="fa fa-star"></i> {mangaStatistics[manga.id]?.rating.bayesian.toFixed(2) || "N/A"}{" "}
                                                        <i className="fa fa-comment" /> {mangaStatistics[manga.id]?.comments?.repliesCount || "N/A"}{" "}
                                                        <i className="fa fa-heart" /> {mangaStatistics[manga.id]?.follows || "N/A"}
                                                    </span>
                                                </div>
                                            </div>
                                            <figcaption>
                                                <h3>
                                                    <Link
                                                        className="jtip"
                                                        data-jtip="#truyen-tranh-81754"
                                                        href={routes.nettrom.manga(manga.id)}
                                                    >
                                                        {mangaTitle}
                                                    </Link>
                                                </h3>
                                            </figcaption>
                                        </figure>
                                        <div
                                            className="box_tootip"
                                            style={{ display: "none" }}
                                            id="truyen-tranh-81754"
                                        >
                                            <div className="box_li">
                                                <div className="title">{mangaTitle}</div>
                                                <div className="clearfix">
                                                    <div className="box_img">
                                                        <a
                                                            title={mangaTitle}
                                                            href={routes.nettrom.manga(manga.id)}
                                                        >
                                                            <img
                                                                className="img_a"
                                                                src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                                                                data-original={coverArt}
                                                                alt={mangaTitle}
                                                            />
                                                        </a>
                                                    </div>
                                                    <div className="message_main">
                                                        <p>
                                                            <label>Thể loại:</label>Action, Comedy, Manga, School Life,
                                                            Shounen
                                                        </p>
                                                        <p>
                                                            <label>Tác giả:</label>Nii Satoru
                                                        </p>
                                                        <p>
                                                            <label>Tình trạng:</label>Đang tiến hành
                                                        </p>
                                                        <p>
                                                            <label>Lượt xem:</label>44K
                                                        </p>
                                                        <p>
                                                            <label>Bình luận:</label>34
                                                        </p>
                                                        <p>
                                                            <label>Theo dõi:</label>1.096
                                                        </p>
                                                        <p>
                                                            <label>Ngày cập nhật:</label>12:58 28/04
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="box_text">
                                                    Hãy bảo vệ khu phố bằng nắm đấm đó! Huyền thoại về vị anh hùng
                                                    chiến đấu Sakura - học sinh cấp 3 giang hồ. Điểm chuẩn thì lẹt
                                                    đẹt, nhưng đánh nhau thì luôn là mạnh nhất. Nơi nổi danh là ngôi
                                                    trường của những tên giang hồ khủng khiếp nhất: THPT Fuurin. Với
                                                    mục đích trở thành kẻ đứng đầu của một Fuurin như vậy, vào mùa
                                                    xuân năm ấy, học sinh lớp 10 Sakura Haruka đến khu phố Tonpuu và
                                                    biết được về băng nhóm bảo vệ khu phố với tên gọi "Boufuurin"
                                                    của trường. Sakura quyết định sẽ bắt đầu chiến đấu để bảo vệ nơi
                                                    ấy như một thành viên của Fuurin! (Đây là bộ truyện trùng tên
                                                    nhưng khác tác giả)
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div id="ctl00_mainContent_ctl02_divPager" className="pagination-outter">
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={(event) => { goToPage(event.selected) }}
                        pageRangeDisplayed={5}
                        pageCount={Math.floor(total / limit)}
                        previousLabel="<"
                        renderOnZeroPageCount={null}
                        marginPagesDisplayed={2}
                        pageClassName="text-center"
                        containerClassName="pagination"
                        activeClassName="active"
                        previousClassName="text-center"
                        nextClassName="text-center"
                        breakClassName="text-center"
                        forcePage={page}
                    />
                </div>
            </div>
        </div>
    )
}