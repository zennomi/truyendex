"use client";

import { Loader2 } from "lucide-react";
import { useCallback } from "react";

export const DataLoader = (props: {
  isLoading: boolean;
  loadingText?: string;
  children: React.ReactNode;
  error?: any;
}) => {
  const refresh = useCallback(() => {
    if (window) window.location.reload();
  }, [window]);

  if (props.isLoading) {
    return (
      <div className="flex min-h-[100px] flex-col items-center justify-center gap-2 text-center text-muted-foreground">
        <Loader2 className="h-[40px] w-[40px] animate-spin" />
        <span>{props.loadingText || "Đang tải..."}</span>
      </div>
    );
  }

  if (props.error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 text-center text-muted-foreground">
        <span>
          {props.error.message || "Đã có lỗi xảy ra khi tải dữ liệu này"}
        </span>
        <button
          className="btn btn-danger"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => refresh()
          }
        >
          Tải lại toàn bộ trang
        </button>
      </div>
    );
  }

  return props.children;
};
