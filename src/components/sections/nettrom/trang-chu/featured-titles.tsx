"use client";

import formatDistance from "date-fns/formatDistance";
import vi from "date-fns/locale/vi";
import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useFeaturedTitles } from "@/hooks/mangadex";
import { useMangadex } from "@/contexts/mangadex";
import { Utils } from "@/utils";
import { Constants } from "@/constants";

export default function FeaturedTitles() {
  const { mangaList: featuredTitles, isLoading, error } = useFeaturedTitles();
  const { addMangas } = useMangadex();
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
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 2 },
      },
    ],
  };

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  useEffect(() => {
    if (featuredTitles.length > 0) addMangas(featuredTitles);
  }, [featuredTitles, addMangas]);

  if (isLoading || error) return <></>;
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
                {featuredTitles.map((manga) => {
                  const title = Utils.Mangadex.getMangaTitle(manga);
                  return (
                    <div key={manga.id} className={`item bg-black bg-cover`}>
                      <Link
                        href={Constants.Routes.nettrom.manga(manga.id)}
                        title={title}
                        className="relative block h-full w-full"
                      >
                        <Image
                          fill={true}
                          src={Utils.Mangadex.getCoverArt(manga)}
                          className="lazy h-full w-full object-cover"
                          alt={title}
                        />
                      </Link>
                      <div className="slide-caption">
                        <h3>
                          <Link
                            href={Constants.Routes.nettrom.manga(manga.id)}
                            title={title}
                          >
                            {title}
                          </Link>
                        </h3>
                        <Link
                          href={Constants.Routes.nettrom.manga(manga.id)}
                          title="Chapter 3320"
                        >
                          {manga.author?.attributes?.name || ""}
                        </Link>
                        <span className="time">
                          <i className="fa fa-clock-o"></i>{" "}
                          {formatDistance(
                            new Date(manga.attributes.updatedAt),
                            new Date(),
                            { locale: vi },
                          )}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </Slider>
              <a
                href="#"
                className="prev"
                aria-label="Trước"
                onClick={handlePrevious}
              ></a>
              <a
                href="#"
                className="next"
                aria-label="Sau"
                onClick={handleNext}
              ></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
