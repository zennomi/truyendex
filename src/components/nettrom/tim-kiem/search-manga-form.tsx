"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "nextjs-toploader/app";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { FaArrowDown, FaArrowUp, FaRedo, FaSearch } from "react-icons/fa";

import { MangadexApi } from "@/api";
import { Utils } from "@/utils";
import { useToggle } from "@/hooks/useToggle";

import MultiSelectDropdown from "../multiselect-dropdown";
import { Button } from "../Button";

import FilterTag from "./filter-tag";

type Inputs = MangadexApi.Manga.GetSearchMangaRequestOptions & {
  orderType?: string;
};

const optionlize = (
  t: string,
  parser: (t: string) => string = (t) => t.toUpperCase(),
) => ({ value: t, label: parser(t) });

export default function SearchMangaForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [showFilter, toggle] = useToggle(false);

  const { register, handleSubmit, watch, reset, setValue } = useForm<Inputs>(
    {},
  );
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    router.push(Utils.Url.getSearchNetTromUrl(data));
  };
  const values = watch();

  useEffect(() => {
    const normalizedParams: Inputs = Utils.Mangadex.normalizeParams(params);
    if (!params.get("orderType") && normalizedParams.order) {
      if (
        normalizedParams.order.latestUploadedChapter ===
        MangadexApi.Static.Order.DESC
      )
        normalizedParams.orderType = "0";
      else if (
        normalizedParams.order.createdAt === MangadexApi.Static.Order.DESC
      )
        normalizedParams.orderType = "1";
      else if (
        normalizedParams.order.followedCount === MangadexApi.Static.Order.DESC
      )
        normalizedParams.orderType = "2";
      else if (normalizedParams.order.title === MangadexApi.Static.Order.ASC)
        normalizedParams.orderType = "3";
      else if (
        normalizedParams.order.relevance === MangadexApi.Static.Order.DESC
      )
        normalizedParams.orderType = "4";
      else if (normalizedParams.order.rating === MangadexApi.Static.Order.DESC)
        normalizedParams.orderType = "5";
    }
    reset({ ...normalizedParams });
  }, [params, reset]);

  useEffect(() => {
    const orderType = values.orderType;
    switch (orderType) {
      case "0":
        setValue("order", {
          latestUploadedChapter: MangadexApi.Static.Order.DESC,
        });
        break;
      case "1":
        setValue("order", { createdAt: MangadexApi.Static.Order.DESC });
        break;
      case "2":
        setValue("order", { followedCount: MangadexApi.Static.Order.DESC });
        break;
      case "3":
        setValue("order", { title: MangadexApi.Static.Order.ASC });
        break;
      case "4":
        setValue("order", { relevance: MangadexApi.Static.Order.DESC });
        break;
      case "5":
        setValue("order", { rating: MangadexApi.Static.Order.DESC });
        break;
      default:
        break;
    }
  }, [values.orderType, setValue]);

  return (
    <>
      <form className="mb-2 md:mb-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2 flex flex-col gap-2 md:flex-row">
          <div className="w-full">
            <label
              htmlFor="default-search"
              className="sr-only mb-2 font-medium text-neutral-900 dark:text-white"
            >
              Tựa đề
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-8">
                <svg
                  className="h-6 w-6 text-neutral-500 dark:text-neutral-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="form-control block w-full rounded-lg border-2 border-neutral-300 bg-neutral-50 p-8 py-4 ps-20 text-neutral-900 focus:border-purple-500 focus:ring-purple-500 focus-visible:ring-purple-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-400 dark:focus:border-purple-500 dark:focus:ring-purple-500"
                placeholder="One Piece, Naruto, ..."
                {...register("title")}
              />
            </div>
          </div>
          <Button
            className="rounded-lg"
            type="button"
            onClick={toggle}
            icon={showFilter ? <FaArrowUp /> : <FaArrowDown />}
          >
            Hiển thị bộ lọc
          </Button>
        </div>
        <div
          className={twMerge(
            "transition-[max-height] duration-300 ease-in-out",
            showFilter ? "max-h-[1000px]" : "max-h-0 overflow-hidden",
          )}
        >
          <div className="mb-2 grid grid-cols-1 gap-2 md:grid-cols-3 xl:grid-cols-4">
            <div>
              <label>Nội dung</label>
              <MultiSelectDropdown
                options={Object.values(
                  MangadexApi.Static.MangaContentRating,
                ).map((v) =>
                  optionlize(v, Utils.Mangadex.translateContentRating),
                )}
                selectedValues={values.contentRating || []}
                onChange={(newValue) => {
                  setValue(
                    "contentRating",
                    newValue as MangadexApi.Static.MangaContentRating[],
                  );
                }}
              />
            </div>
            <div>
              <label>Đối tượng</label>
              <MultiSelectDropdown
                options={Object.values(
                  MangadexApi.Static.MangaPublicationDemographic,
                ).map((v) => optionlize(v))}
                selectedValues={values.publicationDemographic || []}
                onChange={(newValue) => {
                  setValue(
                    "publicationDemographic",
                    newValue as MangadexApi.Static.MangaPublicationDemographic[],
                  );
                }}
              />
            </div>
            <div>
              <label>Tình trạng</label>
              <MultiSelectDropdown
                options={Object.values(
                  MangadexApi.Static.MangaPublicationStatus,
                ).map((v) => optionlize(v, Utils.Mangadex.translateStatus))}
                selectedValues={values.status || []}
                onChange={(newValue) => {
                  setValue(
                    "status",
                    newValue as MangadexApi.Static.MangaPublicationStatus[],
                  );
                }}
              />
            </div>
            <div>
              <label>Xếp theo</label>
              <div className="relative">
                <select
                  className="form-control block w-full appearance-none items-center justify-between rounded-lg border-2 border-neutral-300 bg-neutral-50 p-4 pr-10 leading-[21px] text-neutral-900 focus:border-purple-500 focus:ring-purple-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:focus:border-purple-500 dark:focus:ring-purple-500"
                  {...register("orderType")}
                >
                  <option value={"0"}>Mới cập nhật</option>
                  <option value={"1"}>Truyện mới</option>
                  <option value={"2"}>Theo dõi nhiều nhất</option>
                  <option value={"3"}>Bảng chữ cái</option>
                  <option value={"4"}>Liên quan nhất</option>
                  <option value={"5"}>Đánh giá cao nhất</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 end-0 flex h-full items-center pr-5">
                  <svg
                    className={`h-4 w-4 transition-transform`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <FilterTag values={values} setValue={setValue} />
            </div>
          </div>
        </div>
        <div className="flex gap-2 md:justify-end">
          <Button
            className="rounded-lg"
            type="button"
            onClick={() => {
              reset();
            }}
            icon={<FaRedo />}
          >
            Reset
          </Button>
          <Button icon={<FaSearch />} className="rounded-lg" type="submit">
            Tìm kiếm
          </Button>
        </div>
      </form>
    </>
  );
}
