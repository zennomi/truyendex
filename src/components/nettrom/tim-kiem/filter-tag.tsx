import { useCallback, useRef, useState } from "react";
import { groupBy } from "lodash";
import { UseFormSetValue } from "react-hook-form";

import { Constants } from "@/constants";
import { useToggle } from "@/hooks/useToggle";

import { Button } from "../Button";
import { Alert } from "../Alert";
import { Utils } from "@/utils";
import { MangadexApi } from "@/api";
import { twMerge } from "tailwind-merge";
import React from "react";

export default function FilterTag({
  values,
  setValue,
}: {
  values: MangadexApi.Manga.GetSearchMangaRequestOptions;
  setValue: UseFormSetValue<MangadexApi.Manga.GetSearchMangaRequestOptions>;
}) {
  const [showTagFilter, toggleShowTagFilter, setShowTagFilter] =
    useToggle(false);
  const [query, setQuery] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close dropdown
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowTagFilter(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getTagState = useCallback(
    (tag: string) => {
      if (values.includedTags?.includes(tag)) return 1;
      if (values.excludedTags?.includes(tag)) return -1;
      return 0;
    },
    [values.includedTags, values.excludedTags],
  );

  const updateTagState = useCallback(
    (tag: string) => {
      console.log(tag);
      switch (getTagState(tag)) {
        case 1:
          setValue("includedTags", [
            ...(values.includedTags?.filter((t) => t !== tag) || []),
          ]);
          setValue("excludedTags", [...(values.excludedTags || []), tag]);
          break;
        case 0:
          setValue("includedTags", [...(values.includedTags || []), tag]);
          break;
        case -1:
          setValue("includedTags", [
            ...(values.includedTags?.filter((t) => t !== tag) || []),
          ]);
          setValue("excludedTags", [
            ...(values.excludedTags?.filter((t) => t !== tag) || []),
          ]);
          break;
      }
    },
    [getTagState, setValue],
  );

  return (
    <div>
      <label>Thể loại</label>

      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={toggleShowTagFilter}
          className="flex w-full items-center justify-between rounded-lg border-2 border-neutral-300 bg-neutral-50 p-4 text-neutral-900 focus:border-purple-500 focus:ring-purple-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-400 dark:focus:border-purple-500 dark:focus:ring-purple-500"
        >
          <div className="line-clamp-1 capitalize">
            {values.includedTags?.length ? (
              <span>chọn {values.includedTags.length} tag</span>
            ) : (
              ""
            )}
            {values.includedTags?.length && values.excludedTags?.length ? (
              <span> và </span>
            ) : (
              ""
            )}
            {values.excludedTags?.length ? (
              <span>loại {values.excludedTags.length} tag</span>
            ) : (
              ""
            )}
            {!values.includedTags?.length && !values.excludedTags?.length && (
              <span>Tất cả</span>
            )}
          </div>
          <svg
            className={`h-4 w-4 transition-transform ${
              showTagFilter ? "rotate-180" : ""
            }`}
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
        </button>

        {showTagFilter && (
          <div className="absolute z-10 mt-2 w-full max-w-[100vw] divide-y divide-neutral-100 rounded-lg bg-white shadow md:w-[600px] dark:bg-neutral-700">
            <div className="flex h-[50vh] max-h-[50vh] flex-col gap-2 overflow-y-auto p-2 md:h-[300px] dark:bg-neutral-700">
              <div className="flex items-center gap-2">
                <div className="relative w-full">
                  <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-6">
                    <svg
                      className="h-4 w-4 text-neutral-500 dark:text-neutral-400"
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
                    id="tag-search"
                    className="form-control block w-full rounded-lg border-2 border-neutral-300 bg-neutral-50 p-6 py-3 ps-[40px] text-xl text-neutral-900 focus:border-purple-500 focus:ring-purple-500 focus-visible:ring-purple-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-400 dark:focus:border-purple-500 dark:focus:ring-purple-500"
                    placeholder="Tìm kiếm thể loại"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
                <Button type="button" className="" onClick={() => setQuery("")}>
                  Xoá
                </Button>
              </div>
              <Alert
                classNames={{
                  alert: "[&>svg]:text-blue-500 text-blue-500 bg-blue-100",
                }}
                title="Nhấn 1 lần để lựa chọn, nhấn 2 lần để loại trừ"
              />
              <div>
                {Object.entries(
                  groupBy(Constants.Nettrom.tags, "attributes.group"),
                ).map(([group, tags]) => (
                  <div key={group} className="mb-2">
                    <h2 className="mb-2 font-bold">
                      {Utils.Mangadex.translateTagGroup(group)}
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {tags
                        .filter((tag) =>
                          tag.attributes.name.en
                            .toLowerCase()
                            .includes(query.toLowerCase()),
                        )
                        .sort((a, b) =>
                          a.attributes.name.en.localeCompare(
                            b.attributes.name.en,
                          ),
                        )
                        .map((tag) => {
                          const state = getTagState(tag.id);
                          return (
                            <button
                              type="button"
                              key={tag.id}
                              className={twMerge(
                                "rounded-xl border p-2 text-lg dark:bg-neutral-800",
                                state === 1 &&
                                  "border-emerald-500 text-emerald-500",
                                state === -1 &&
                                  "border-dashed border-red-500 text-red-500",
                                state === 0 &&
                                  "border-neutral-800 text-neutral-200",
                              )}
                              onClick={() => {
                                updateTagState(tag.id);
                              }}
                            >
                              {tag.attributes.name.en}
                            </button>
                          );
                        })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
