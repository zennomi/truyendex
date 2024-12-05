import {
  Alert as ShadCnAlert,
  AlertDescription,
  AlertTitle,
} from "@/components/shadcn/alert";
import { FC } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

export const Alert: FC<{
  title: string;
  description?: string;
  action?: React.ReactNode;
  classNames?: {
    alert?: string;
    title?: string;
    description?: string;
  };
}> = (props) => {
  return (
    <ShadCnAlert
      className={twMerge(
        "flex flex-col gap-3 bg-neutral-700 text-muted-foreground sm:flex-row",
        props.classNames?.alert,
      )}
    >
      <div className="flex grow gap-3 sm:items-center">
        <span className="shrink-0">
          <FaExclamationCircle className="inline text-[20px]" />
        </span>
        <div className="flex h-full grow flex-col justify-center">
          <AlertTitle
            className={twMerge("mb-0 text-[14px]", props.classNames?.title)}
          >
            {props.title}{" "}
          </AlertTitle>
          {props.description && (
            <AlertDescription
              className={twMerge("text-[12px]", props.classNames?.description)}
            >
              {props.description}
            </AlertDescription>
          )}
        </div>
      </div>
      <div className="shrink-0 pl-10 sm:pl-5">{props.action}</div>
    </ShadCnAlert>
  );
};
