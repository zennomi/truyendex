"use client";

import { useAuth } from "@/hooks/useAuth";

export default function LogoutButton() {
  const { logout } = useAuth({ middleware: "auth" });

  return (
    <div className="mt-6">
      <button
        onClick={logout}
        className="hover:border-indigobg-indigo-700 inline-block rounded-md border border-indigo-600 bg-indigo-600 px-5 py-2 text-center align-middle text-base tracking-wide text-white duration-500 hover:bg-indigo-700"
      >
        Đăng xuất
      </button>
    </div>
  );
}
