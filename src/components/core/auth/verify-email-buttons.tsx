"use client";

import { useAuth } from "@/hooks/useAuth";
import { useCallback } from "react";
import { toast } from "react-toastify";

export default function VerifyEmailButtons() {
  const { logout, resendEmailVerification } = useAuth({ middleware: "auth" });

  const handleResendClick = useCallback(async () => {
    await resendEmailVerification();
    toast("Gửi email thành công");
  }, [resendEmailVerification]);

  return (
    <div className="mt-6 flex flex-col gap-2">
      <button
        onClick={logout}
        className="hover:border-indigobg-indigo-700 inline-block rounded-md border border-indigo-600 bg-indigo-600 px-5 py-2 text-center align-middle text-base tracking-wide text-white duration-500 hover:bg-indigo-700"
      >
        Đăng xuất
      </button>
      <button
        onClick={handleResendClick}
        className="hover:border-indigobg-indigo-700 inline-block rounded-md border border-indigo-600 bg-indigo-600 px-5 py-2 text-center align-middle text-base tracking-wide text-white duration-500 hover:bg-indigo-700"
      >
        Gửi lại email xác nhận
      </button>
    </div>
  );
}
