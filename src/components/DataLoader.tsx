"use client";

import { Loader2 } from "lucide-react";

import { ErrorDisplay } from "./nettrom/error-display";

export const DataLoader = (props: {
  isLoading: boolean;
  loadingText?: string;
  children: React.ReactNode;
  error?: any;
}) => {
  if (props.isLoading) {
    return (
      <div className="flex min-h-[100px] flex-col items-center justify-center gap-2 text-center text-muted-foreground">
        <Loader2 className="h-[40px] w-[40px] animate-spin" />
        <span>{props.loadingText || "Đang tải..."}</span>
      </div>
    );
  }

  if (props.error) {
    return <ErrorDisplay error={props.error} />;
  }

  return props.children;
};
