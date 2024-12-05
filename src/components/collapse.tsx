"use client";

import { ReactNode } from "react";
import { useToggle } from "../hooks/useToggle";

type Props = {
  title: ReactNode;
  content: ReactNode;
  defaultValue?: boolean;
};

export default function Collapse({
  title,
  content,
  defaultValue = false,
}: Props) {
  const [value, toggle] = useToggle(defaultValue);

  return (
    <div
      className={`relative overflow-hidden rounded-md shadow transition-all dark:shadow-gray-800`}
    >
      <h2 className="text-base font-semibold" id="accordion-collapse-heading-1">
        <button
          type="button"
          className={`flex w-full items-center justify-between p-5 text-left font-medium ${value ? "bg-gray-50 text-indigo-600 dark:bg-slate-800" : "text-dark dark:text-white"}`}
          aria-expanded="true"
          onClick={toggle}
        >
          <span>{title}</span>
          <svg
            data-accordion-icon=""
            className={`h-4 w-4 shrink-0 ${value ? "" : "rotate-180"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </h2>
      <div className={value ? "" : "hidden"}>
        <div className="p-5">
          <p className="text-slate-400 dark:text-gray-400">{content}</p>
        </div>
      </div>
    </div>
  );
}
