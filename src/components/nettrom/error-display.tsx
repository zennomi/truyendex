"use client";

import { AxiosError } from "axios";
import { useCallback } from "react";

import { MangadexApi } from "@/api";

export const ErrorDisplay = (props: { error?: any; refresh?: Function }) => {
  const refreshPage = useCallback(() => {
    if (typeof window !== "undefined") window.location.reload();
  }, []);

  console.error(props.error);
  let errorMessage;
  const error = props.error;
  if (error instanceof AxiosError) {
    errorMessage = error.response?.data?.message || error.message;
  } else if (error instanceof MangadexApi.Utils.MangaDexError) {
    errorMessage = error.response?.data?.message || error.message;
  } else errorMessage = "Đã có lỗi xảy ra khi tải dữ liệu này";

  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center text-muted-foreground">
      <span>{errorMessage}</span>
      {props.refresh && (
        <button
          className="btn btn-warning"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => props.refresh!()
          }
        >
          Tải lại dữ liệu
        </button>
      )}
      <button
        className="btn btn-danger"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => refreshPage()
        }
      >
        Tải lại toàn bộ trang
      </button>
    </div>
  );
};
