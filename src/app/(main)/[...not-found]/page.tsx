import Link from "next/link";

import Iconify from "@/components/iconify";
import { Constants } from "@/constants";

export default function NotFound() {
  return (
    <div className="font-nunito text-base text-black dark:bg-slate-900 dark:text-white">
      <section className="relative bg-indigo-600/5">
        <div className="container-fluid relative">
          <div className="grid grid-cols-1">
            <div className="flex min-h-screen flex-col justify-center px-4 py-10 md:px-10">
              <div className="text-center">
                <Link href="/">
                  <img
                    src={"/images/logo.png"}
                    className="mx-auto"
                    alt="ruyendex logo"
                    height={64}
                  />
                </Link>
              </div>
              <div className="title-heading my-auto text-center">
                <Iconify
                  className="mx-auto"
                  width={200}
                  icon="hugeicons:file-not-found"
                />
                <h1 className="mb-6 mt-3 text-3xl font-bold md:text-5xl">
                  4 lẻ 4 nót phao
                </h1>
                <p className="text-slate-400">
                  Trang bạn đang truy cập không tồn tại
                </p>
                <div className="mt-4">
                  <Link
                    href="/"
                    className="inline-block rounded-md border border-indigo-600 bg-indigo-600 px-5 py-2 text-center align-middle text-base font-semibold tracking-wide text-white duration-500 hover:border-indigo-700 hover:bg-indigo-700"
                  >
                    Trở về trang chủ
                  </Link>
                </div>
              </div>
              <div className="text-center">
                <p className="mb-0 text-slate-400">
                  Hoặc bạn có thể báo lỗi{" "}
                  <a
                    href={Constants.Routes.report}
                    target="_blank"
                    className="text-reset"
                  >
                    tại đây
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
          {/*end grid*/}
        </div>
        {/*end container*/}
      </section>
      {/*end section*/}
      {/* End */}
      <div className="fixed bottom-3 end-3">
        <a
          href=""
          className="back-button inline-flex size-9 items-center justify-center rounded-full border border-indigo-600 bg-indigo-600 text-center align-middle text-base tracking-wide text-white duration-500 hover:border-indigo-700 hover:bg-indigo-700"
        >
          <i data-feather="arrow-left" className="size-4" />
        </a>
      </div>
    </div>
  );
}
