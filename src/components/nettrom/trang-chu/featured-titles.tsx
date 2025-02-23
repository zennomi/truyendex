"use client";

import { useEffect } from "react";
import { useFeaturedTitles } from "@/hooks/mangadex";
import { useMangadex } from "@/contexts/mangadex";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { AspectRatio } from "@/components/shadcn/aspect-ratio";
import { Constants } from "@/constants";
import { FaClock, FaFire } from "react-icons/fa";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { DataLoader } from "@/components/DataLoader";
import { Utils } from "@/utils";

export default function FeaturedTitles() {
  const { mangaList: featuredTitles, isLoading, error } = useFeaturedTitles();
  const { addMangas } = useMangadex();

  useEffect(() => {
    if (featuredTitles.length > 0) addMangas(featuredTitles);
  }, [featuredTitles, addMangas]);

  return (
    <div className="flex flex-col gap-5">
      <h2 className="flex items-center gap-4 text-[20px] font-medium text-web-title">
        <FaFire />
        Truyện đề cử
      </h2>
      <div>
        <DataLoader isLoading={isLoading} error={error}>
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
          >
            {featuredTitles.map((manga) => {
              const title = Utils.Mangadex.getMangaTitle(manga);
              return (
                <SwiperSlide key={manga.id}>
                  <div key={manga.id} className={`item bg-black bg-cover`}>
                    <Link
                      href={Constants.Routes.nettrom.manga(manga.id)}
                      title={title}
                      className="transtion group relative block h-full w-full"
                    >
                      <AspectRatio
                        ratio={Constants.Nettrom.MANGA_COVER_RATIO}
                        className="w-full overflow-hidden rounded-lg transition group-hover:shadow-lg"
                      >
                        <div className="relative h-full w-full">
                          <div className="absolute bottom-0 left-0 z-[1] h-2/5 w-full bg-gradient-to-t from-neutral-900 from-[10%] to-transparent transition-all duration-500 group-hover:h-3/5"></div>
                          <img
                            src={Utils.Mangadex.getCoverArt(manga)}
                            alt={title}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-[102%]"
                          />
                        </div>
                      </AspectRatio>
                      <div className="absolute bottom-0 left-0 z-[2] w-full px-3 py-2 transition-all">
                        <h3 className="mb-1 line-clamp-2 text-[16px] font-semibold leading-tight text-white group-hover:line-clamp-4">
                          {title}
                        </h3>
                        <Link
                          href={Constants.Routes.nettrom.manga(manga.id)}
                          className="text-web-title transition hover:text-web-titleLighter"
                        >
                          {manga.author?.attributes?.name || ""}
                        </Link>
                        <p className="time mb-0 mt-1 flex h-0 items-center gap-2 overflow-hidden text-[12px] text-muted-foreground group-hover:h-auto">
                          <FaClock />{" "}
                          <span>
                            {Utils.Date.formatNowDistance(
                              new Date(manga.attributes.updatedAt),
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
        </DataLoader>
      </div>
    </div>
  );
}
