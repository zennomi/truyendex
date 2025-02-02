"use client";

import { AppApi } from "@/api";
import { useEffect, useState } from "react";

export default function TestView() {
  const [result, setResult] = useState<any>();
  useEffect(() => {
    AppApi.Comment.getRecentCommentList({
      limit: 10,
    })
      .then(setResult)
      .catch(setResult);
  }, []);
  return (
    <pre className="whitespace-pre-wrap break-words rounded bg-gray-800 p-4 text-white">
      <code className="whitespace-pre-wrap break-words">
        {JSON.stringify(result)}
      </code>
    </pre>
  );
}
