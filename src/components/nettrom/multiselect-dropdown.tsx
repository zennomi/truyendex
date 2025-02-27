import React, { useState, useRef } from "react";
import { twMerge } from "tailwind-merge";

type Option = {
  label: string;
  value: string;
};

type MultiSelectDropdownProps = {
  options: Option[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  anyLabel?: string;
};

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  options,
  selectedValues,
  onChange,
  anyLabel = "Tất cả",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close dropdown
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCheckboxChange = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-lg border-2 border-neutral-300 bg-neutral-50 p-4 text-neutral-900 focus:border-purple-500 focus:ring-purple-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-400 dark:focus:border-purple-500 dark:focus:ring-purple-500"
      >
        <span className="line-clamp-1">
          {selectedValues.length > 0
            ? selectedValues
                .map(
                  (v) =>
                    options.find((option) => option.value === v)?.label || "",
                )
                .join(", ")
            : anyLabel}
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
            <ul
              className="py-2 text-neutral-700 dark:text-neutral-200"
              aria-labelledby="states-button"
            >
              {options.map((option) => {
                const active = selectedValues.includes(option.value);
                return (
                  <li key={option.value}>
                    <button
                      type="button"
                      className="inline-flex w-full px-4 py-2 text-neutral-700 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-600 dark:hover:text-white"
                      onClick={() => handleCheckboxChange(option.value)}
                    >
                      <div className="inline-flex items-center gap-2 md:gap-3">
                        <div
                          className={twMerge(
                            "h-4 w-4 rounded-full border",
                            active
                              ? "border-purple-500 bg-purple-500"
                              : "border-neutral-400",
                          )}
                        />
                        <span
                          className={twMerge(
                            active ? "text-purple-500" : "text-neutral-400",
                          )}
                        >
                          {option.label}
                        </span>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
