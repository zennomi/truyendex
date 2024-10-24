"use client";

import { useEffect } from "react";
import { useFeaturedTitles } from "@/hooks/mangadex";
import { useMangadex } from "@/contexts/mangadex";
import { getCoverArt, getMangaTitle } from "@/utils/mangadex";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import routes from "@/routes";
import { formatDistance } from "date-fns";
import { vi } from "date-fns/locale";
import { AspectRatio } from "@/components/shadcn/aspect-ratio";
import { AppConstants } from "@/constants";
import { FaClock, FaStar } from "react-icons/fa";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

export default function FeaturedTitles() {
  const { mangaList: featuredTitles, isLoading, error } = useFeaturedTitles();
  const { addMangas } = useMangadex();

  useEffect(() => {
    if (featuredTitles.length > 0) addMangas(featuredTitles);
  }, [featuredTitles, addMangas]);

  if (isLoading || error) return <></>;
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-web-title flex items-center gap-3 text-[20px]">
        <FaStar />
        Truyện đề cử
      </h2>
      <div>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          autoplay={{ delay: 3000 }}
          breakpoints={{
            360: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
          spaceBetween={20}
          loop
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {featuredTitles.map((manga) => {
            const title = getMangaTitle(manga);
            return (
              <SwiperSlide key={manga.id}>
                <div key={manga.id} className={`item bg-black bg-cover`}>
                  <Link
                    href={routes.nettrom.manga(manga.id)}
                    title={title}
                    className="transtion group relative block h-full w-full"
                  >
                    <AspectRatio
                      ratio={AppConstants.MANGA_COVER_RATIO}
                      className="w-full group-hover:shadow-lg transition overflow-hidden rounded-lg"
                    >
                      <div className="relative w-full h-full">
                        <div className="z-[1] absolute bottom-0 left-0 w-full duration-500 group-hover:h-3/5 h-2/5 transition-all bg-gradient-to-t from-black from-[10%] to-transparent"></div>
                        <Image
                          fill={true}
                          src={getCoverArt(manga)}
                          alt={title}
                          className="h-full w-full object-cover group-hover:scale-[102%] transition duration-500"
                        />
                      </div>
                    </AspectRatio>
                    <div className="min-h-[80px] z-[2] transition-all bottom-0 absolute left-0 w-full px-3 py-2">
                      <h3 className="line-clamp-2 text-[16px] mb-1 leading-tight text-white font-semibold">
                        {title}
                      </h3>
                      <Link
                        href={routes.nettrom.manga(manga.id)}
                        className="text-web-title hover:text-web-titleLighter transition"
                      >
                        {manga.author?.attributes?.name || ""}
                      </Link>
                      <p className="time flex h-0 overflow-hidden items-center gap-2 text-muted-foreground group-hover:h-auto">
                        <FaClock />{" "}
                        <span>
                          {formatDistance(
                            new Date(manga.attributes.updatedAt),
                            new Date(),
                            { locale: vi },
                          )}{" "}
                          trước
                        </span>
                      </p>
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
