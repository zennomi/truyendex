"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/utils/shadcn";

// Define size classes for the slider
const sizeClasses = {
  sm: {
    root: "",
    track:
      "data-[orientation=horizontal]:h-1.5 data-[orientation=vertical]:w-1.5",
    thumb: "size-4",
  },
  md: {
    root: "",
    track: "data-[orientation=horizontal]:h-2 data-[orientation=vertical]:w-2",
    thumb: "size-5",
  },
  lg: {
    root: "",
    track: "data-[orientation=horizontal]:h-3 data-[orientation=vertical]:w-3",
    thumb: "size-7",
  },
};

type SliderSize = keyof typeof sizeClasses;

interface SliderProps
  extends React.ComponentProps<typeof SliderPrimitive.Root> {
  size?: SliderSize;
}

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  size = "md",
  ...props
}: SliderProps) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max],
  );

  const { root, track, thumb } = sizeClasses[size] || sizeClasses.md;

  return (
    <div className="w-full">
      <div className="text-md mb-1 flex w-full select-none items-center justify-between text-muted-foreground">
        <span>{min}</span>
        <span>{max}</span>
      </div>
      <SliderPrimitive.Root
        data-slot="slider"
        defaultValue={defaultValue}
        value={value}
        min={min}
        max={max}
        className={cn(
          "relative flex w-full touch-none select-none items-center data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col data-[disabled]:opacity-50",
          root,
          className,
        )}
        {...props}
      >
        <SliderPrimitive.Track
          data-slot="slider-track"
          className={cn(
            "relative grow overflow-hidden rounded-full bg-muted data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full",
            track,
          )}
        >
          <SliderPrimitive.Range
            data-slot="slider-range"
            className={cn(
              "absolute bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
            )}
          />
        </SliderPrimitive.Track>
        {Array.from({ length: _values.length }, (_, index) => (
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            key={index}
            className={cn(
              "focus-visible:outline-hidden block shrink-0 rounded-full border border-primary bg-background shadow-sm ring-ring/50 transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 disabled:pointer-events-none disabled:opacity-50",
              thumb,
            )}
          />
        ))}
      </SliderPrimitive.Root>
    </div>
  );
}

export { Slider };
