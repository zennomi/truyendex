"use client";

import { AppApi } from "@/api";
import { useEffect, useState } from "react";

export default function TestView() {
  const [result, setResult] = useState<any>();
  useEffect(() => {
    AppApi.Comment.storeComment({
      content: "<p>Đoạn văn này có 10 ký tự</p>",
      parentId: 0,
      type: "series",
      typeId: "d7037b2a-874a-4360-8a7b-07f2899152fd",
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
