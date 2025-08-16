/**
 * Tooltip Component - Dựa trên Shadcn/ui và Radix UI
 *
 * Cách sử dụng:
 *
 * 1. TooltipComponent (Khuyến nghị):
 * ```tsx
 * import { TooltipComponent } from "@/components/shadcn/tooltip";
 *
 * <TooltipComponent content="This is a tooltip">
 *   <Button>Hover me</Button>
 * </TooltipComponent>
 *
 * // Với variant và size
 * <TooltipComponent
 *   content="Success message"
 *   variant="success"
 *   size="lg"
 *   side="right"
 * >
 *   <Button>Success Button</Button>
 * </TooltipComponent>
 * ```
 *
 * 2. Manual Tooltip:
 * ```tsx
 * import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/shadcn/tooltip";
 *
 * <TooltipProvider>
 *   <Tooltip>
 *     <TooltipTrigger asChild>
 *       <Button>Hover me</Button>
 *     </TooltipTrigger>
 *     <TooltipContent>
 *       <p>Custom tooltip content</p>
 *     </TooltipContent>
 *   </Tooltip>
 * </TooltipProvider>
 * ```
 *
 * Props:
 * - variant: "default" | "destructive" | "success" | "warning" | "info"
 * - size: "sm" | "default" | "lg"
 * - side: "top" | "right" | "bottom" | "left"
 * - delayDuration: number (ms)
 */

import { cn } from "@/utils/shadcn";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const tooltipVariants = cva(
  "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {
      variant: {
        default: "bg-neutral-800 text-white border-neutral-700",
        destructive: "bg-red-500 text-white border-red-600",
        success: "bg-green-500 text-white border-green-600",
        warning: "bg-yellow-500 text-black border-yellow-600",
        info: "bg-blue-500 text-white border-blue-600",
      },
      size: {
        sm: "px-2 py-1 text-xs",
        default: "px-3 py-1.5 text-sm",
        lg: "px-4 py-2 text-base",
        xl: "px-5 py-3 text-lg",
        "2xl": "px-6 py-4 text-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
    VariantProps<typeof tooltipVariants> {}

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(({ className, sideOffset = 4, variant, size, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(tooltipVariants({ variant, size }), className)}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

// Compound component for easier usage
interface TooltipComponentProps {
  children: React.ReactNode;
  content: React.ReactNode;
  variant?: VariantProps<typeof tooltipVariants>["variant"];
  size?: VariantProps<typeof tooltipVariants>["size"];
  delayDuration?: number;
  className?: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
}

const TooltipComponent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipComponentProps
>(
  (
    {
      children,
      content,
      variant,
      size,
      delayDuration = 300,
      className,
      side = "top",
      align = "center",
      ...props
    },
    ref,
  ) => (
    <TooltipProvider>
      <Tooltip delayDuration={delayDuration}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          ref={ref}
          variant={variant}
          size={size}
          side={side}
          align={align}
          className={className}
          {...props}
        >
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
);
TooltipComponent.displayName = "TooltipComponent";

export {
  Tooltip,
  TooltipComponent,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  tooltipVariants,
};
