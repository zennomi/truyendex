import { Metadata } from "next";
import {
  FlagTriangleRight,
  Github,
  BookOpen,
  History,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { headers, cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Demo Only - TruyenDex",
};

export default function MaintenancePage() {
  const headersList = headers();
  const cookieStore = cookies();
  const originalPath = headersList.get("x-original-path") || "";
  const isLoggedIn = cookieStore.has("userId");

  let extraLinks = null;

  if (originalPath.startsWith("/nettrom/truyen-tranh/")) {
    const mangaId = originalPath.split("/")[3];
    if (mangaId) {
      extraLinks = (
        <Link
          href={`https://cubari.moe/read/mangadex/${mangaId}/`}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative mt-2 inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-[#ff914d] px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-[#ff914d]/90 active:scale-95"
        >
          <ExternalLink className="h-6 w-6" />
          <span className="text-lg">Đọc trên Cubari</span>
        </Link>
      );
    }
  } else if (originalPath.startsWith("/nettrom/chuong/")) {
    const chapterId = originalPath.split("/")[3];
    if (chapterId) {
      extraLinks = (
        <Link
          href={`https://canary.mangadex.dev/chapter/${chapterId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative mt-2 inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-[#ff914d] px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-[#ff914d]/90 active:scale-95"
        >
          <ExternalLink className="h-6 w-6" />
          <span className="text-lg">Đọc trên MangaDex Canary</span>
        </Link>
      );
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-900 via-zinc-900 to-black">
      {/* Decorative background elements */}
      <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-purple-600/20 blur-[120px]" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />

      <div className="relative z-10 mx-4 w-full max-w-lg rounded-3xl border border-zinc-800/50 bg-zinc-900/50 p-8 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-zinc-700/50 hover:shadow-purple-500/10">
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className="group relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-zinc-700/50 bg-zinc-800/80 shadow-inner">
            <div className="absolute inset-0 bg-purple-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <FlagTriangleRight className="h-10 w-10 text-purple-400 transition-all duration-300 group-hover:animate-bounce" />
          </div>

          <div className="space-y-4">
            <h1 className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent text-white">
              Đây là phiên bản Demo
            </h1>
            <p className="text-base font-medium leading-relaxed text-zinc-400 md:text-lg">
              Dự án nhằm mục đích học tập và nghiên cứu, bạn có thể tự deploy
              TruyenDex của riêng mình bằng source code sau:
            </p>
          </div>

          <div className="flex w-full flex-col gap-3">
            <Link
              href="https://github.com/zennomi/truyendex"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-white px-8 py-4 font-semibold text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-blue-200 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <Github className="relative z-10 h-6 w-6 transition-transform group-hover:rotate-12" />
              <span className="relative z-10 text-lg">zennomi/truyendex</span>
            </Link>

            <div className="mt-2 flex gap-3">
              {isLoggedIn && (
                <Link
                  href="/nettrom/theo-doi"
                  className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-zinc-700 active:scale-95"
                >
                  <BookOpen className="h-5 w-5 text-purple-400" />
                  <span>Theo dõi</span>
                </Link>
              )}
              <Link
                href="/nettrom/lich-su"
                className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-zinc-700 active:scale-95"
              >
                <History className="h-5 w-5 text-blue-400" />
                <span>Lịch sử</span>
              </Link>
            </div>

            {extraLinks}
          </div>
        </div>
      </div>
    </div>
  );
}
