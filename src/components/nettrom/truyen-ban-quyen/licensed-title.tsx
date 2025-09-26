"use client";

import { DataLoader } from "@/components/DataLoader";
import { useTitle } from "@/hooks/tanamoe";
import { Utils } from "@/utils";
import { useParams } from "next/navigation";
import Markdown from "../Markdown";
import Link from "next/link";

export default function LicensedTitleView() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useTitle(id);

  return (
    <DataLoader isLoading={isLoading} error={error}>
      {data && (
        <>
          <header className="flex flex-col-reverse gap-6 sm:flex-row sm:items-end">
            <div className="z-20 -mt-24 flex-1 sm:mt-0">
              <div className="space-y-3">
                <h1 className="text-4xl font-bold lg:text-6xl">{data.name}</h1>
              </div>
            </div>
            <div className="relative mb-5 ml-auto w-[256px] flex-shrink-0 md:mb-0 xl:w-[320px]">
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-gray-50 to-transparent to-50% sm:hidden dark:from-[#252525]" />
              <img
                src={Utils.Tanamoe.getCoverImage(
                  data.expand.defaultRelease?.expand.front?.resizedImage?.[
                    "480w"
                  ],
                )}
                sizes="(max-width: 640px) 80vw, (max-width: 1280px) 30vw, 15vw"
                loading="eager"
                className="h-full w-full rounded-lg object-cover"
                title={data.name}
                alt={data.name}
              />
            </div>
          </header>
          <div className="mt-6 flex flex-col-reverse gap-6 lg:flex-row">
            <div className="flex-1 space-y-12">
              <Markdown content={data.description} />
              {/**/}
              <div className="mt-6 space-y-12">{/**/}</div>
            </div>
            <div className="w-full flex-shrink-0 space-y-6 lg:w-[256px] xl:w-[320px]">
              <div className="hover:prose-a:text-orange-400 dark:hover:prose-a:text-orange-400 prose prose-sm dark:prose-invert prose-h4:my-0 prose-a:text-gray-700 hover:prose-a:underline prose-img:my-0 prose-hr:my-3 dark:prose-a:text-gray-200 max-w-none divide-y divide-gray-200 rounded-lg shadow ring-1 ring-gray-200 dark:divide-white dark:bg-none dark:ring-white">
                {/**/}
                <div className="divide-y divide-gray-200 p-0 sm:p-0 dark:divide-gray-100">
                  <div className="space-y-3 p-4">
                    <div>
                      <h4 className="mb-1">Trạng thái</h4>
                      <span className="inline-flex items-center rounded-md bg-orange-500 px-2 py-1 font-medium text-white dark:bg-orange-400 dark:text-gray-900">
                        {data.expand.defaultRelease?.status}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3 p-4">
                    <div>
                      <h4>Tựa truyện</h4>
                      <Link
                        href={`https://tana.moe/title/${data.slug}`}
                        target="_blank"
                        className=""
                      >
                        {data.name}
                      </Link>
                    </div>
                    {data.expand.demographic && (
                      <div>
                        <h4>Đối tượng</h4>
                        <Link
                          href={`https://tana.moe/browse/titles?demographic=${data.expand.demographic.id}`}
                          target="_blank"
                        >
                          <span className="mr-1.5 mt-1.5 inline-flex items-center rounded-md bg-gray-50 px-2 py-1 font-medium text-gray-700 ring-1 ring-inset ring-purple-300 dark:bg-purple-900 dark:text-purple-200 dark:ring-purple-700">
                            {data.expand.demographic.name}
                          </span>
                        </Link>
                      </div>
                    )}
                    {data.expand.genres && (
                      <div>
                        <h4>Thể loại</h4>
                        {data.expand.genres.map((genre) => (
                          <Link
                            target="_blank"
                            key={genre.id}
                            href={`https://tana.moe/browse/titles?genre=${genre.id}`}
                          >
                            <span className="mr-1.5 mt-1.5 inline-flex items-center rounded-md bg-gray-50 px-2 py-1 font-medium text-gray-700 ring-1 ring-inset ring-purple-300 dark:bg-purple-900 dark:text-purple-200 dark:ring-purple-700">
                              {genre.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                {/**/}
              </div>
              {/**/}
            </div>
          </div>
        </>
      )}
    </DataLoader>
  );
}
