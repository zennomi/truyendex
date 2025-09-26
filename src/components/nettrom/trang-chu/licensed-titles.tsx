"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { AspectRatio } from "@/components/shadcn/aspect-ratio";
import { Constants } from "@/constants";
import { FaCalendar, FaClock } from "react-icons/fa";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { DataLoader } from "@/components/DataLoader";
import { Utils } from "@/utils";
import { useUpcomingBooks } from "@/hooks/tanamoe";

export default function LicensedTitles() {
  const { data, isLoading, error } = useUpcomingBooks({
    page: 1,
    perPage: 100,
  });

  return (
    <div className="flex flex-col gap-5">
      <h2 className="flex items-center gap-4 text-[20px] font-medium text-web-title">
        <FaCalendar />
        Lịch phát hành truyện bản quyền
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
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
            spaceBetween={20}
            loop
          >
            {data?.items
              .filter((i) => !!i.expand.assets_via_book)
              .map((item) => {
                const title = item.expand.publication.name;
                const cover = Utils.Tanamoe.getCoverImage(
                  item.expand.assets_via_book?.[0]?.resizedImage["480w"],
                );

                const url = Constants.Routes.tanamoe.title(
                  item.expand.publication.expand.release.expand.title.id,
                );
                return (
                  <SwiperSlide key={item.id}>
                    <div key={item.id} className={`item bg-black bg-cover`}>
                      <Link
                        href={url}
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
                              src={cover}
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
                            href={url}
                            className="text-web-title transition hover:text-web-titleLighter"
                          >
                            {""}
                          </Link>
                          <p className="time mb-0 mt-1 flex h-0 items-center gap-2 overflow-hidden text-[12px] text-muted-foreground group-hover:h-auto">
                            <FaClock />{" "}
                            <span>
                              {Utils.Date.formatDate(
                                new Date(item.publishDate),
                              )}{" "}
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
