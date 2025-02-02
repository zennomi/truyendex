"use client";

import { useAuth } from "@/hooks/useAuth";
import { useEffect, useMemo, useState } from "react";
import Iconify from "../iconify";
import { useSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { AppApi } from "@/api";

export default function SyncView() {
  const { user } = useAuth();
  const params = useSearchParams();
  const ids = params.get("ids") ? params.get("ids")!.split(",") : null;
  const source = params.get("source");

  const [result, setResult] = useState(null);

  const [message, isLoading] = useMemo(() => {
    if (!ids || !source) return ["Không tìm thấy thông tin đồng bộ!", false];
    if (["mangadex", "cuutruyen", "cmanga"].includes(source) === false) {
      return ["Nguồn đồng bộ không hợp lệ!", false];
    }

    if (user === undefined) return ["Đang đăng nhập...", true];
    if (user === null) return ["Vui lòng đăng nhập để đồng bộ dữ liệu!", false];
    if (result === null) return [`Đang đồng bộ ${ids.length} manga...`, true];
    return [
      "Bạn đã đồng bộ thành công! Bạn có thể đóng cửa sổ này để tiếp tục.",
      false,
    ];
  }, [user, ids, source]);

  useEffect(() => {
    if (!ids || !source || !user) return;
    if (["mangadex", "cuutruyen", "cmanga"].includes(source) === false) return;
    if (result !== null) return;
    AppApi.User.syncReadList({ ids, source }).then(setResult).catch(setResult);
  }, [ids, source, user, result]);

  return (
    <div className="relative overflow-hidden rounded-md bg-white shadow dark:bg-slate-900 dark:shadow-gray-700">
      <div
        className={twMerge(
          isLoading ? "bg-orange-600" : "bg-emerald-600",
          "px-6 py-12 text-center",
        )}
      >
        <Iconify
          className="mx-auto text-8xl text-white"
          icon={isLoading ? "line-md:loading-loop" : "uil:check-circle"}
        />
        <h5 className="mt-2 text-xl font-semibold uppercase tracking-wide text-white">
          Đồng bộ
        </h5>
      </div>
      <div className="px-6 py-12 text-center">{message}</div>
    </div>
  );
}
