import Link from "next/link";
import routes from "../../routes";
import getTitleManga from "../../utils/getTitleManga";
import { useChapterContext } from "../../contexts/chapter";
import getTitleChapter from "../../utils/getTitleChapter";
import { useParams } from "next/navigation";

export default function ChapterControl() {
    const { manga, chapter, canNext, canPrev, next, prev, chapters, goTo } = useChapterContext()
    const params = useParams()
    const chapterId = params.chapterId
    const mangaTitle = getTitleManga(manga)
    const chapterTitle = getTitleChapter(chapter)

    return (
        <>
            {
                chapter &&
                <div className="top">
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
                            <a
                                href="https://www.nettruyento.com/tim-truyen"
                                className="itemcrumb"
                                itemProp="item"
                                itemType="http://schema.org/Thing"
                            >
                                <span itemProp="name">Truyện tranh</span>
                            </a>
                            <meta itemProp="position" content={"2"} />
                        </li>
                        <li
                            itemProp="itemListElement"

                            itemType="http://schema.org/ListItem"
                        >
                            <Link
                                href={routes.nettrom.manga(manga?.id || "")}
                                className="itemcrumb"
                                itemProp="item"
                                itemType="http://schema.org/Thing"
                            >
                                <span itemProp="name">{getTitleManga(manga)}</span>
                            </Link>
                            <meta itemProp="position" content={"3"} />
                        </li>
                        <li
                            itemProp="itemListElement"

                            itemType="http://schema.org/ListItem"
                        >
                            <Link
                                href={routes.nettrom.chapter(chapter.id)}
                                className="itemcrumb active"
                                itemProp="item"
                                itemType="http://schema.org/Thing"
                            >
                                <span itemProp="name">{chapterTitle}</span>
                            </Link>
                            <meta itemProp="position" content={"4"} />
                        </li>
                    </ul>
                    <h1 className="txt-primary">
                        <Link href={routes.nettrom.manga(manga?.id || "")}>
                            {mangaTitle}
                        </Link>{" "}
                        <span>- {chapterTitle}</span>
                    </h1>
                    <i>[Cập nhật lúc: 09:28 28/05/2023]</i>
                </div>
            }
            <div className="reading-control">
                <div className="mrb5">
                    Nếu không xem được truyện vui lòng đổi "SERVER ẢNH" bên dưới
                    <div className="mrt10">
                        <a
                            rel="nofollow"

                            data-server={1}
                            className="loadchapter btn btn-primary btn-success mrb5"
                        >
                            Server 1
                        </a>
                        <a
                            rel="nofollow"

                            data-server={2}
                            className="loadchapter btn btn-primary mrb5"
                        >
                            Server 2
                        </a>
                        <a
                            rel="nofollow"

                            data-server={4}
                            className="loadchapter btn btn-primary mrb5 hidden"
                        >
                            <i className="fa fa-diamond" /> Server VIP
                        </a>
                        <a
                            rel="nofollow"

                            data-server={5}
                            className="loadchapter btn btn-primary mrb5 hidden"
                        >
                            <i className="fa fa-diamond" /> Server VIP 2
                        </a>
                    </div>
                </div>
                <div className="mrb10">
                    <a
                        rel="nofollow"

                        className="alertError btn btn-warning"
                    >
                        <i className="fa fa-exclamation-triangle" /> Báo lỗi
                    </a>
                </div>
                <div className="alert alert-info mrb10 hidden-xs hidden-sm">
                    <i className="fa fa-info-circle" />{" "}
                    <em>Sử dụng mũi tên trái (←) hoặc phải (→) để chuyển chapter</em>
                </div>
                <div
                    className="chapter-nav"
                    id="chapterNav"
                    style={{ zIndex: "auto", position: "static", top: "auto" }}
                >
                    <a className="home" href="/" title="Trang chủ">
                        <i className="fa fa-home" />
                    </a>
                    <Link
                        className="home backward"
                        href="https://www.nettruyento.com/truyen-tranh/ba-vuong-sung-ai-co-vo-mu-66961#nt_listchapter"
                        title={mangaTitle}
                    >
                        <i className="fa fa-list" />
                    </Link>
                    <a className="home changeserver" href="#" title="Đổi server">
                        <i className="fa fa-undo error" />
                        <span>1</span>
                    </a>
                    <a
                        className={`prev a_prev ${canPrev ? "" : "disabled"}`}
                        onClick={() => prev()}
                    >
                        <i className="fa fa-chevron-left" />
                    </a>
                    <select
                        name="ctl00$mainContent$ddlSelectChapter"
                        id="ctl00_mainContent_ddlSelectChapter"
                        className="select-chapter"
                        value={chapterId}
                        onChange={(event) => { goTo(event.target.value) }}
                    >
                        {
                            chapters.map(item => (
                                <option value={item.id} key={item.id}>
                                    Tập {item.volume} Chương {item.chapter}
                                </option>
                            ))
                        }
                    </select>
                    <a
                        className={`next a_next ${canNext ? "" : "disabled"}`}
                        onClick={() => next()}
                    >
                        <i className="fa fa-chevron-right" />
                    </a>
                    <a
                        className="follow-link btn btn-success"

                        data-id={66961}
                    >
                        <i className="fa fa-heart" /> <span>Theo dõi</span>
                    </a>
                </div>
                <div style={{ display: "none", width: 920, height: 42, float: "none" }} />
            </div>
        </>
    )
}