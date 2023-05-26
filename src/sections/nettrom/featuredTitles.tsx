"use client"

import formatDistance from 'date-fns/formatDistance'
import vi from 'date-fns/locale/vi'
import Slider from "react-slick";

import useFeaturedTitles from "../../hooks/useFeaturedTitles"
import getCoverArt from "../../utils/getCoverArt"
import getTitleManga from "../../utils/getTitleManga"
import { useRef } from 'react';


export default function FeaturedTitles() {
    const { featuredTitles, isLoading, error } = useFeaturedTitles()
    const carouselRef = useRef<Slider | null>(null);
    const carouselSettings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 4 },
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 2 },
            },
            {
                breakpoint: 640,
                settings: { slidesToShow: 1 },
            },
        ],
    };

    const handlePrevious = () => {
        carouselRef.current?.slickPrev();
    };

    const handleNext = () => {
        carouselRef.current?.slickNext();
    };


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
                            <Slider ref={carouselRef} {...carouselSettings}>
                                {
                                    featuredTitles.map(manga => {
                                        const title = getTitleManga(manga)
                                        return (
                                            <div key={manga.id} className="item px-[3.5px]">
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
                                                        {manga.author?.attributes?.name || ""}
                                                    </a>
                                                    <span className="time">
                                                        <i className="fa fa-clock-o"></i> {formatDistance(new Date(manga.attributes.updatedAt), new Date(), { locale: vi })}
                                                    </span>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </Slider>
                            <a href="#" className="prev" aria-label="Trước" onClick={handlePrevious}></a>
                            <a href="#" className="next" aria-label="Sau" onClick={handleNext}></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}