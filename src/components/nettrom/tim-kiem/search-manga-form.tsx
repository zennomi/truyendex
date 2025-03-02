"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "nextjs-toploader/app";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { FaArrowDown, FaArrowUp, FaRedo, FaSearch } from "react-icons/fa";

import { MangadexApi } from "@/api";
import { Utils } from "@/utils";
import { useToggle } from "@/hooks/useToggle";
import { Constants } from "@/constants";

import MultiSelectDropdown from "../multiselect-dropdown";
import { Button } from "../Button";

import FilterTag from "./filter-tag";
import Input from "../input";
import AuthorSearchInput from "./author-search-input";

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

  const dirtyValues = useMemo(() => {
    const result = [];
    if (values.artists && values.artists.length) result.push("artists");
    if (values.authors && values.authors.length) result.push("authors");
    if (
      values.availableTranslatedLanguage &&
      values.availableTranslatedLanguage.length
    )
      result.push("availableTranslatedLanguage");
    if (values.contentRating && values.contentRating.length)
      result.push("contentRating");
    if (values.originalLanguage && values.originalLanguage.length)
      result.push("originalLanguage");
    if (values.publicationDemographic && values.publicationDemographic.length)
      result.push("publicationDemographic");
    if (values.status && values.status.length) result.push("status");
    if (values.year) result.push("year");
    if (
      (values.includedTags && values.includedTags.length) ||
      (values.excludedTags && values.excludedTags.length)
    )
      result.push("tag");
    return result;
  }, [values]);

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
            <Input
              type="search"
              id="default-search"
              placeholder="Tìm kiếm truyện"
              icon={<FaSearch />}
            />
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
              <FilterTag values={values} setValue={setValue} />
            </div>
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
              <label>Năm phát hành</label>
              <Input
                type="number"
                {...register("year")}
                placeholder="Năm phát hành"
              />
            </div>
            <div>
              <AuthorSearchInput
                type="author"
                values={values}
                setValue={setValue}
              />
            </div>
            <div>
              <AuthorSearchInput
                type="artist"
                values={values}
                setValue={setValue}
              />
            </div>
            <div>
              <label>Quốc gia</label>
              <MultiSelectDropdown
                options={Constants.Nettrom.languages.map((v) => ({
                  value: v.code,
                  label: v.name,
                }))}
                selectedValues={values.originalLanguage || []}
                onChange={(newValue) => {
                  setValue("originalLanguage", newValue);
                }}
                language
                anyLabel="Tất cả quốc gia"
              />
            </div>
            <div>
              <label>Ngôn ngữ bản dịch</label>
              <MultiSelectDropdown
                options={[
                  {
                    value: "vi",
                    label: "Tiếng Việt",
                  },
                  {
                    value: "en",
                    label: "Tiếng Anh",
                  },
                ]}
                selectedValues={values.availableTranslatedLanguage || []}
                onChange={(newValue) => {
                  setValue("availableTranslatedLanguage", newValue);
                }}
                language
                anyLabel="Tất cả ngôn ngữ"
              />
            </div>
            <div>
              <label>Xếp theo</label>
              <div className="relative">
                <select
                  className="form-control block w-full appearance-none items-center justify-between rounded-lg border-2 border-neutral-300 bg-neutral-50 p-4 pr-10 capitalize leading-[21px] text-neutral-900 focus:border-purple-500 focus:ring-purple-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:focus:border-purple-500 dark:focus:ring-purple-500"
                  {...register("orderType")}
                >
                  {Object.entries(ORDER_TYPE).map(([key, value]) => (
                    <option className="capitalize" key={key} value={key}>
                      {value}
                    </option>
                  ))}
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
          </div>
        </div>
        <div className="flex flex-col items-baseline justify-between md:flex-row">
          {!showFilter && dirtyValues.length > 0 && (
            <div className="mb-2">
              Bạn đang lọc theo{" "}
              {dirtyValues.map((f) => TRANSLATED_FIELD[f] || f).join(", ")} và
              sắp xếp theo thứ tự {ORDER_TYPE[values.orderType || "0"]}.
            </div>
          )}
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
        </div>
      </form>
    </>
  );
}

const TRANSLATED_FIELD: Record<string, string> = {
  artists: "hoạ sĩ",
  authors: "tác giả",
  availableTranslatedLanguage: "ngôn ngữ bản dịch",
  contentRating: "nội dung",
  originalLanguage: "quốc gia",
  publicationDemographic: "đối tượng",
  status: "tình trạng",
  year: "năm phát hành",
  tag: "tag",
};

const ORDER_TYPE: Record<string, string> = {
  "0": "mới cập nhật",
  "1": "truyện mới",
  "2": "theo dõi nhiều nhất",
  "3": "bảng chữ cái",
  "4": "liên quan nhất",
  "5": "đánh giá cao nhất",
};
