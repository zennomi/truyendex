import { FC } from "react";
import {
  Select as ShadcnSelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../shadcn/select";
import { twMerge } from "tailwind-merge";

export const Select: FC<{
  disabled?: boolean;
  placeholder?: string;
  value?: string;
  classNames?: {
    select?: string;
    trigger?: string;
    value?: string;
    content?: string;
    group?: string;
    label?: string;
    item?: string;
  };
  items: { value: string; label: string }[];
  onValueChange?: (value: string) => void;
}> = (props) => {
  return (
    <ShadcnSelect value={props.value} onValueChange={props.onValueChange}>
      <SelectTrigger
        className={twMerge(
          "w-[300px] bg-foreground text-[14px]",
          props.classNames?.trigger,
        )}
      >
        <SelectValue
          placeholder={props.placeholder}
          className={twMerge(props.classNames?.value)}
        />
      </SelectTrigger>
      <SelectContent className={twMerge(props.classNames?.content)}>
        <SelectGroup className={twMerge(props.classNames?.group)}>
          {props.items.map((item) => {
            return (
              <SelectItem
                className={twMerge("text-[14px]", props.classNames?.item)}
                key={item.value}
                value={item.value}
              >
                {item.label}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </ShadcnSelect>
  );
};
