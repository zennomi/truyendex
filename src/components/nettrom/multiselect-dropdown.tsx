import React, { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

import useDebounce from "@/hooks/useDebounce";

import Input from "./input";
import LanguageIcon from "../language-icon";

type Option = {
  label: string;
  value: string;
};

type MultiSelectDropdownProps = {
  options: Option[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  anyLabel?: string;
  onSearch?: (query: string) => Promise<Option[]>;
  language?: boolean;
};

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  options = [],
  selectedValues,
  onChange,
  anyLabel = "Tất cả",
  onSearch,
  language = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [cachedOptions, setCachedOptions] = useState<Record<string, string>>(
    Object.fromEntries(options.map((option) => [option.value, option.label])),
  );
  const [loading, setLoading] = useState(false);
  const [resultOptions, setResultOptions] = useState<Option[]>(options);
  const [query, setQuery] = useState("");
  const deboucedQuery = useDebounce(query, 1000);

  // Handle click outside to close dropdown
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!onSearch) return;
    if (!deboucedQuery) {
      setLoading(false);
      setResultOptions(options);
      return;
    }
    if (deboucedQuery) {
      setLoading(true);
      setResultOptions(options);
      onSearch(deboucedQuery)
        .then((data) => {
          setResultOptions(data);
        })
        .finally(() => setLoading(false));
    }
  }, [deboucedQuery, onSearch]);

  const handleCheckboxChange = (option: Option) => {
    const value = option.value;
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
    setCachedOptions((_options) => ({
      ..._options,
      [option.value]: option.label,
    }));
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-lg border-2 border-neutral-300 bg-neutral-50 p-4 text-left text-neutral-900 focus:border-purple-500 focus:ring-purple-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-400 dark:focus:border-purple-500 dark:focus:ring-purple-500"
      >
        <span className="line-clamp-1">
          {selectedValues.length > 0 ? (
            language ? (
              <div className="flex w-full gap-2 overflow-hidden">
                {selectedValues.map((v) => (
                  <div className="h-[21px]">
                    <LanguageIcon
                      key={v}
                      languageCode={v}
                      width="100%"
                      height="100%"
                    />
                  </div>
                ))}
              </div>
            ) : (
              selectedValues.map((v) => cachedOptions[v] || "").join(", ")
            )
          ) : (
            anyLabel
          )}
        </span>
        <svg
          className={`h-4 w-4 transition-transform ${
            isOpen ? "rotate-180" : ""
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

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full divide-y divide-neutral-100 rounded-lg bg-white shadow-sm dark:bg-neutral-700">
          <div className="max-h-60 overflow-y-auto p-2">
            {onSearch && (
              <Input
                type="search"
                placeholder="Tìm kiếm..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                icon={<FaSearch />}
              />
            )}
            {onSearch && selectedValues.length > 0 && (
              <div className="flex flex-wrap gap-1 py-2">
                {selectedValues.map((value) => (
                  <div
                    key={value}
                    className="flex items-center gap-1 rounded bg-purple-500 px-2 py-1 text-white"
                  >
                    <div className="max-w-40 truncate">
                      {cachedOptions[value]}
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        onChange(selectedValues.filter((v) => v !== value))
                      }
                    >
                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
            {loading && (
              <div className="pt-4 text-center">Đang tìm kiếm...</div>
            )}
            <ul
              className="pb-2 text-neutral-700 dark:text-neutral-200"
              aria-labelledby="states-button"
            >
              {resultOptions.map((option) => {
                const active = selectedValues.includes(option.value);
                return (
                  <li key={option.value}>
                    <button
                      type="button"
                      className="inline-flex w-full px-4 py-2 text-neutral-700 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-600 dark:hover:text-white"
                      onClick={() => handleCheckboxChange(option)}
                    >
                      <div className="inline-flex cursor-pointer items-center gap-2 md:gap-3">
                        <div
                          className={twMerge(
                            "h-4 w-4 rounded-full border",
                            active
                              ? "border-purple-500 bg-purple-500"
                              : "border-neutral-400",
                          )}
                        />
                        <div
                          className={twMerge(
                            "line-clamp-1 text-left",
                            active ? "text-purple-500" : "text-neutral-400",
                          )}
                        >
                          {option.label}
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
              {!loading && resultOptions.length === 0 && (
                <div className="pt-4 text-center">Không có kết quả nào</div>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
