"use client";

import { useCallback, useState } from "react";
import { toast } from "react-toastify";

import Iconify from "@/components/iconify";
import { useAuth } from "@/hooks/useAuth";
import TurnstileWidget from "@/components/turnstile-widget";
import { Utils } from "@/utils";

export default function VerifyEmailButtons() {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const { logout, resendEmailVerification } = useAuth({ middleware: "auth" });

  const handleResendClick = useCallback(async () => {
    if (!token) {
      toast.error("Vui lòng hoàn thành captcha trước khi gửi lại email");
      return;
    }
    setLoading(true);
    try {
      await resendEmailVerification({ "cf-turnstile-response": token });
      toast("Gửi email thành công");
    } catch (error) {
      Utils.Error.handleError(error, "Gửi email thất bại");
    }
    setLoading(false);
  }, [resendEmailVerification]);

  return (
    <div className="mt-6 flex flex-col gap-2">
      <TurnstileWidget onVerify={(_token) => setToken(_token)} />
      <button
        disabled={loading}
        onClick={handleResendClick}
        className="hover:border-indigobg-indigo-700 flex items-center justify-center gap-2 rounded-md border border-indigo-600 bg-indigo-600 px-5 py-2 text-center align-middle text-base tracking-wide text-white duration-500 hover:bg-indigo-700"
      >
        {loading ? <Iconify icon="uil:spinner" /> : null}
        Gửi lại email xác nhận
      </button>
      <button
        onClick={logout}
        className="hover:border-indigobg-indigo-700 inline-block rounded-md border border-indigo-600 bg-indigo-600 px-5 py-2 text-center align-middle text-base tracking-wide text-white duration-500 hover:bg-indigo-700"
      >
        Đăng xuất
      </button>
    </div>
  );
}
