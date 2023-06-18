import Link from "next/link";
import routes from "../../../routes";
import { getMangaTitle } from "../../../utils/getMangaTitle";
import { useChapterContext } from "../../../contexts/chapter";
import getTitleChapter from "../../../utils/getTitleChapter";
import { useParams } from "next/navigation";
import useOffSetTop from "../../../hooks/useOffSetTop";

export default function ChapterControl() {
    const { manga, chapter, canNext, canPrev, next, prev, chapters, goTo, others } = useChapterContext()
    const offsetTop = useOffSetTop(100)
    const params = useParams()
    const chapterId = params.chapterId
    const mangaTitle = getMangaTitle(manga)
    const chapterTitle = getTitleChapter(chapter)
    console.log("ChapterControl reload")
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
                            <Link
                                href={routes.nettrom.search}
                                className="itemcrumb"
                                itemProp="item"
                                itemType="http://schema.org/Thing"
                            >
                                <span itemProp="name">Truyện tranh</span>
                            </Link>
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
                                <span itemProp="name">{getMangaTitle(manga)}</span>
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
                {
                    others.length > 0 &&
                    <div className="mrb5">
                        Chuyển sang đọc bản dịch nhóm khác
                        <div className="mrt10">
                            {
                                others.map((other, idx) => (
                                    <Link
                                        rel="nofollow"
                                        key={other}
                                        data-server={1}
                                        className="loadchapter btn btn-primary btn-success mrb5"
                                        href={routes.nettrom.chapter(other)}
                                    >
                                        Nhóm {idx}
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                }
                <div className="mrb10">
                    <a
                        rel="nofollow"
                        href="https://www.facebook.com/Zennomi"
                        target="_blank"
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
                    className={`chapter-nav mx-auto flex justify-around items-center gap-x-1 ${offsetTop ? "fixed bottom-0 right-0 w-full bg-black" : ""}`}
                    id="chapterNav"
                >
                    <div className="flex items-center justify-center gap-x-1">
                        <Link className="home" href="/" title="Trang chủ">
                            <i className="fa fa-home" />
                        </Link>
                        <Link
                            className="home backward"
                            href={`${routes.nettrom.manga(manga?.id || "")}#nt_listchapter`}
                            title={mangaTitle}
                        >
                            <i className="fa fa-list" />
                        </Link>
                        <a className="home changeserver" href="#" title="Đổi server">
                            <i className="fa fa-undo error" />
                            <span>1</span>
                        </a>
                    </div>
                    <div className="flex items-center justify-center gap-x-1">
                        <a
                            className={`prev a_prev ${canPrev ? "" : "disabled"}`}
                            onClick={() => prev()}
                        >
                            <i className="fa fa-chevron-left" />
                        </a>
                        <select
                            name="ctl00$mainContent$ddlSelectChapter"
                            id="ctl00_mainContent_ddlSelectChapter"
                            className="select-chapter min-w-[100px] md:min-w-[200px]"
                            value={chapterId}
                            onChange={(event) => { goTo(event.target.value) }}
                        >
                            {
                                chapters.map(item => (
                                    <option value={item.id} key={item.id}>
                                        {
                                            item.volume !== "none" ?
                                                `Tập ${item.volume} Chương ${item.chapter}` :
                                                item.chapter !== "none" ? `Chương ${item.chapter}` : "Oneshot"
                                        }

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
                    </div>
                    <a
                        className="follow-link btn btn-success"
                        href={routes.scanlationGroup(chapter?.scanlation_group?.id || "")}
                    >
                        <i className="fa fa-heart" /> <span>Nhóm dịch</span>
                    </a>
                </div>
                <div style={{ display: "none", width: 920, height: 42, float: "none" }} />
            </div>
        </>
    )
}