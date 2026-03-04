import { omit } from "lodash";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  icon?: React.ReactNode;
};

export default function Input(props: Props) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-5">
        <div
          className="h-4 w-4 text-neutral-500 dark:text-neutral-400"
          aria-hidden="true"
        >
          {props.icon}
        </div>
      </div>
      <input
        className={twMerge(
          "form-control block w-full rounded-lg border-2 border-neutral-300 bg-neutral-50 p-5 py-2.5 leading-[21px] text-neutral-900 focus:border-purple-500 focus:ring-purple-500 focus-visible:ring-purple-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-400 dark:focus:border-purple-500 dark:focus:ring-purple-500",
          props.icon && "ps-[50px]",
        )}
        {...omit(props, "icon")}
      />
    </div>
  );
}
