import {
  Alert as ShadCnAlert,
  AlertDescription,
  AlertTitle,
} from "@/components/shadcn/alert";
import { FC } from "react";
import { FaExclamationCircle } from "react-icons/fa";

export const Alert: FC<{
  title: string;
  description?: string;
}> = (props) => {
  return (
    <ShadCnAlert className="bg-neutral-800 [&>svg]:text-muted-foreground [&>svg~*]:pl-12">
      <FaExclamationCircle className="text-[20px]" />
      <AlertTitle className="text-[14px] text-muted-foreground">
        {props.title}{" "}
      </AlertTitle>
      {props.description && (
        <AlertDescription className="text-[12px] text-muted-foreground">
          {props.description}
        </AlertDescription>
      )}
    </ShadCnAlert>
  );
};
