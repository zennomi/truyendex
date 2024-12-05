"use client"; // Error components must be Client Components

import { Constants } from "@/constants";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2 className="mb-1">
        Đã có lỗi gì đó xảy ra 😭 Bạn thông cảm dự án phi lợi nhuận nên lỗi là
        chuyện bình thường á 🥺
      </h2>
      <button
        className="btn btn-danger mb-2"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Thử lại
      </button>
      <div>Hoặc chụp màn hình lỗi phía dưới và gửi cho mình nhé 👇</div>
      <a
        className="btn btn-warning"
        href={Constants.Routes.report}
        target="_blank"
      >
        Gửi cho mình
      </a>
      <div className="mt-2 break-all rounded bg-black p-3">
        {JSON.stringify(error, Object.getOwnPropertyNames(error))}
      </div>
    </div>
  );
}
