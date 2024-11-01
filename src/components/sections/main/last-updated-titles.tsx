import Link from "next/link";
import Image from "next/image";

import Iconify from "@/components/iconify";
import { ExtendManga } from "@/types/mangadex";
import { Utils } from "@/utils";
import { Constants } from "@/constants";

export default function LastUpdatedTitles({
  mangas,
}: {
  mangas: ExtendManga[];
}) {
  return (
    <section className="relative py-16 md:py-24">
      <div className="container">
        <div className="grid grid-cols-1 items-center md:grid-cols-12">
          <div className="text-center md:col-span-6 md:text-start lg:col-span-8">
            <h3 className="text-2xl font-semibold leading-normal">
              Chương mới cập nhật
            </h3>
          </div>

          <div className="hidden md:col-span-6 md:block md:text-end lg:col-span-4">
            <Link
              href={Constants.Routes.nettrom.index}
              className="relative inline-block border-none text-center align-middle text-base font-semibold tracking-wide text-slate-400 duration-500 ease-in-out after:absolute after:bottom-0 after:end-0 after:start-0 after:h-px after:w-0 after:bg-indigo-600 after:duration-500 after:content-[''] hover:text-indigo-600 hover:after:end-auto hover:after:w-full"
            >
              Xem thêm <Iconify icon="uil:arrow-right" className="inline" />
            </Link>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-[30px] md:grid-cols-3 lg:grid-cols-4">
          {mangas.map((manga) => {
            const extended = Utils.Mangadex.extendRelationship(
              manga,
            ) as ExtendManga;
            const title = Utils.Mangadex.getMangaTitle(manga);
            return (
              <div className="group" key={extended.id}>
                <div className="relative overflow-hidden rounded-md shadow duration-500 group-hover:shadow-lg dark:shadow-gray-800 group-hover:dark:shadow-gray-800">
                  <Image
                    src={Utils.Mangadex.getCoverArt(extended)}
                    alt={title}
                  />

                  <div className="absolute -bottom-20 end-3 start-3 duration-500 group-hover:bottom-3">
                    <Link
                      href={Constants.Routes.nettrom.manga(extended.id)}
                      className="inline-block w-full rounded-md border border-slate-900 bg-slate-900 px-5 py-2 text-center align-middle text-base font-semibold tracking-wide text-white duration-500"
                    >
                      Đọc
                    </Link>
                  </div>

                  {extended.attributes.publicationDemographic && (
                    <ul className="absolute start-4 top-[10px] list-none">
                      <li>
                        <span className="h-5 rounded bg-orange-600 px-2.5 py-0.5 text-[10px] font-bold text-white">
                          {extended.attributes.publicationDemographic.toUpperCase()}
                        </span>
                      </li>
                    </ul>
                  )}
                </div>

                <div className="mt-4">
                  <Link
                    href={Constants.Routes.nettrom.manga(extended.id)}
                    className="text-sm font-semibold hover:text-indigo-600 md:text-lg"
                  >
                    {title}
                  </Link>
                  <div className="mt-1 flex items-center justify-between">
                    {/* <p className="text-green-600">{extended.attributes.originalLanguage} <del className="text-red-600">$21.00</del></p> */}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
