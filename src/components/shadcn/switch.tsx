"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/utils/shadcn";

const sizeClasses = {
  sm: {
    root: "h-[1.15rem] w-8",
    thumb: "size-4",
  },
  md: {
    root: "h-6 w-11",
    thumb: "size-5",
  },
  lg: {
    root: "h-8 w-16",
    thumb: "size-7",
  },
};

type SwitchSize = keyof typeof sizeClasses;

interface SwitchProps
  extends React.ComponentProps<typeof SwitchPrimitive.Root> {
  size?: SwitchSize;
}

function Switch({ className, size = "md", ...props }: SwitchProps) {
  const { root, thumb } = sizeClasses[size] || sizeClasses.md;
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "shadow-xs peer inline-flex shrink-0 items-center rounded-full border border-transparent outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80",
        root,
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block rounded-full bg-background ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0 dark:data-[state=checked]:bg-primary-foreground dark:data-[state=unchecked]:bg-foreground",
          thumb,
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
