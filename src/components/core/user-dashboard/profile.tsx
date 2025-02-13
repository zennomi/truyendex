"use client";

import Iconify from "@/components/iconify";
import { useAuth } from "@/hooks/useAuth";

export default function UserProfileView() {
  const { user } = useAuth({ middleware: "auth" });
  if (!user) return null;
  return (
    <div className="grid grid-cols-1 gap-[30px] pt-6">
      <div>
        <h5 className="text-xl font-semibold">Thông tin tài khoản :</h5>
        <div className="mt-6 flex flex-col gap-3">
          <div className="flex items-center">
            <Iconify
              icon="feather:mail"
              className="me-3 size-6 text-slate-400"
            />
            <div className="flex flex-1 flex-row gap-1 md:flex-row">
              <h6 className="mb-0 font-medium text-indigo-600 dark:text-white">
                Email :
              </h6>
              <span className="text-slate-400">{user.email}</span>
            </div>
          </div>
          <div className="flex items-center">
            <Iconify
              icon="feather:clock"
              className="me-3 size-6 text-slate-400"
            />
            <div className="flex flex-1 flex-row gap-1 md:flex-row">
              <h6 className="mb-0 font-medium text-indigo-600 dark:text-white">
                Tài khoản tạo lúc :
              </h6>
              <span className="text-slate-400">
                {new Date(user.created_at).toLocaleString()}
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <Iconify
              icon="feather:message-square"
              className="me-3 size-6 text-slate-400"
            />
            <div className="flex flex-1 flex-row gap-1 md:flex-row">
              <h6 className="mb-0 font-medium text-indigo-600 dark:text-white">
                Số bình luận :
              </h6>
              <span className="text-slate-400">{user.comment_count}</span>
            </div>
          </div>
          <div className="flex items-center">
            <Iconify
              icon="feather:bookmark"
              className="me-3 size-6 text-slate-400"
            />
            <div className="flex flex-1 flex-row gap-1 md:flex-row">
              <h6 className="mb-0 font-medium text-indigo-600 dark:text-white">
                Chức danh :
              </h6>
              <span className="text-slate-400">
                {user.display_roles.map((t) => t.toUpperCase()).join(", ")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
