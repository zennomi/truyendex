"use client"; // Error components must be Client Components

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
      <h2>Đã có lỗi gì xảy ra</h2>
      <button
        className="btn btn-danger"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Thử lại
      </button>
    </div>
  );
}
