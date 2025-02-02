import Link from "next/link";

import Iconify from "@/components/iconify";
import Buttons from "@/components/core/auth/verify-email-buttons";
import { Constants } from "@/constants";

export default function VerifyEmailPage() {
  return (
    <div>
      <section className="relative flex h-screen items-center justify-center bg-slate-50 dark:bg-slate-800">
        <div className="container relative">
          <div className="justify-center md:flex">
            <div className="lg:w-2/5">
              <div className="relative overflow-hidden rounded-md bg-white shadow dark:bg-slate-900 dark:shadow-gray-700">
                <div className="bg-yellow-600 px-6 py-12 text-center">
                  <Iconify
                    className="mx-auto text-8xl text-white"
                    icon="uil:question-circle"
                  />
                  <h5 className="mt-2 text-xl font-semibold uppercase tracking-wide text-white">
                    Chưa nhận được mail?
                  </h5>
                </div>
                <div className="px-6 py-12 text-center">
                  <p className="text-xl font-semibold text-black dark:text-white">
                    Chúc mừng! 🎉
                  </p>
                  <p className="mt-4 text-slate-400">
                    Tài khoản của bạn đã được tạo thành công <br /> Vui lòng
                    kiểm tra email (cả mục spam) để xác thực email và tiếp tục
                    sử dụng TruyenDex!
                  </p>
                  <Buttons />
                </div>
                <div className="border-t border-gray-100 p-6 text-center dark:border-gray-700">
                  <Link
                    href={Constants.Routes.nettrom.index}
                    className="mb-0 text-slate-400"
                  >
                    © TruyenDex
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*end container*/}
      </section>
    </div>
  );
}
