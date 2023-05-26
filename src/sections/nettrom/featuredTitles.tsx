"use client"

import useFeaturedTitles from "../../hooks/useFeaturedTitles"
import getCoverArt from "../../utils/getCoverArt"
import getTitleManga from "../../utils/getTitleManga"

export default function FeaturedTitles() {
    const { featuredTitles, isLoading, error } = useFeaturedTitles()
    if (isLoading || error) return <></>
    return (
        <div>
            <div id="ctl00_divAlt1" className="altcontent1 cmszone">
                <div className="top-comics Module Module-183">
                    <div className="ModuleContent">
                        <h2 className="page-title">
                            Truyện đề cử <i className="fa fa-angle-right" />
                        </h2>
                        <div className="items-slide">
                            <div
                                className="owl-carousel clearfix owl-theme"
                                style={{ opacity: 1, display: "block" }}
                            >
                                <div className="owl-wrapper-outer">
                                    <div
                                        className="owl-wrapper"
                                        style={{
                                            width: 4416,
                                            left: 0,
                                            display: "block",
                                            transition: "all 800ms ease 0s",
                                            transform: "translate3d(-184px, 0px, 0px)"
                                        }}
                                    >
                                        {
                                            featuredTitles.map(manga => {
                                                const title = getTitleManga(manga)
                                                return (
                                                    <div className="owl-item" style={{ width: 184 }}>
                                                        <div className="item">
                                                            <a
                                                                href="https://www.nettruyento.com/truyen-tranh/vo-luyen-dinh-phong-176960"
                                                                title={title}
                                                            >
                                                                <img
                                                                    className="lazyOwl center"
                                                                    src={getCoverArt(manga)}
                                                                    alt={title}
                                                                    style={{}}
                                                                />
                                                            </a>
                                                            <div className="slide-caption">
                                                                <h3>
                                                                    <a
                                                                        href="https://www.nettruyento.com/truyen-tranh/vo-luyen-dinh-phong-176960"
                                                                        title={title}
                                                                    >
                                                                        {title}
                                                                    </a>
                                                                </h3>
                                                                <a
                                                                    href="https://www.nettruyento.com/truyen-tranh/vo-luyen-dinh-phong/chap-3320/1001775"
                                                                    title="Chapter 3320"
                                                                >
                                                                    {manga.attributes.status}
                                                                </a>
                                                                <span className="time">
                                                                    <i className="fa fa-clock-o"></i> {manga.attributes.updatedAt}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            <a href="#" className="prev" aria-label="Trước"></a>
                            <a href="#" className="next" aria-label="Sau"></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}