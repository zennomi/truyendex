"use client";

import { Constants } from "@/constants";
import useHostname from "@/hooks/useHostname";
import useOnlineStatus from "@/hooks/useOnlineStatus";
import axios from "axios";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function OfflineView() {
  const isOnline = useOnlineStatus();
  const hostname = useHostname();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isOnline || !hostname || !pathname) return;
    (async () => {
      let available = false;
      for (const domain of Constants.AVALABLE_DOMAINS) {
        if (domain === hostname) continue;
        try {
          await axios(`https://${domain}/api/health`);

          toast(`${domain} khả dụng, chuyển hướng...`);
          // delay 5s to show toast
          await new Promise((resolve) => setTimeout(resolve, 5000));

          router.push(`https://${domain}${pathname}`);
          available = true;
          break;
        } catch (error) {
          continue;
        }
      }
      if (!available) {
        toast(
          "Không domain nào khả dụng. Vui lòng nhấn vào nút bên dưới để được hỗ trợ.",
        );
      }
    })();
  }, [isOnline, hostname, pathname, router]);

  if (!isOnline)
    return (
      <section className="relative bg-indigo-600/5">
        <div className="container-fluid relative">
          <div className="grid grid-cols-1">
            <div className="flex min-h-screen flex-col justify-center px-4 py-10 md:px-10">
              <div className="title-heading my-auto text-center">
                <h1 className="mb-6 mt-3 text-3xl font-bold md:text-5xl">
                  Mất kết nối mạng
                </h1>
                <p className="text-slate-400">
                  Vui lòng kiểm tra lại đường truyền mạng của thiết bị
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );

  return (
    <section className="relative bg-indigo-600/5">
      <div className="container-fluid relative">
        <div className="grid grid-cols-1">
          <div className="flex min-h-screen flex-col justify-center px-4 py-10 md:px-10">
            <div className="title-heading my-auto text-center">
              <img src="assets/images/error.png" className="mx-auto" alt="" />
              <h1 className="mb-6 mt-3 text-3xl font-bold md:text-5xl">
                Tên miền {hostname} đã bị chặn
              </h1>
              <p className="text-slate-400">
                Nhưng chill đi, để tôi tìm tên miền khả dụng khác
              </p>
              <div className="mt-4">
                <Link
                  href={Constants.Routes.report}
                  target="_blank"
                  className="inline-block rounded-md border border-indigo-600 bg-indigo-600 px-5 py-2 text-center align-middle text-base font-semibold tracking-wide text-white duration-500 hover:border-indigo-700 hover:bg-indigo-700"
                >
                  Hỗ trợ
                </Link>
              </div>
            </div>
            <div className="text-center">
              <p className="mb-0 text-slate-400">© TruyenDex</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
