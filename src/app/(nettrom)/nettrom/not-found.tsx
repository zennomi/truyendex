"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Home, Search } from "lucide-react";

import { Button } from "@/components/nettrom/Button";
import { Constants } from "@/constants";

export default function NotFound() {
  const router = useRouter();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      // If no history, go to home page
      router.push(Constants.Routes.nettrom.index);
    }
  };

  const handleGoHome = () => {
    router.push(Constants.Routes.nettrom.index);
  };

  const handleSearch = () => {
    router.push(Constants.Routes.nettrom.search);
  };

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-8">
        <div className="mb-4 text-8xl font-bold text-red-500">404</div>
        <h1 className="mb-4 text-3xl font-bold text-gray-500">
          Không tìm thấy truyện/chương
        </h1>
        <p className="mb-6 max-w-md text-gray-200">
          Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển. Có thể
          truyện/chương này đã bị MangaDex xóa.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
        <Button onClick={handleGoBack} icon={<ArrowLeft className="size-6" />}>
          Quay lại trang trước
        </Button>

        <Button
          onClick={handleGoHome}
          variant="outline"
          icon={<Home className="size-6" />}
        >
          Về trang chủ
        </Button>

        <Button
          onClick={handleSearch}
          variant="ghost"
          icon={<Search className="size-6" />}
        >
          Tìm truyện khác
        </Button>
      </div>

      <div className="mt-8 text-sm text-gray-500">
        <p>
          Nếu bạn nghĩ đây là lỗi, vui lòng{" "}
          <a
            href={Constants.Routes.report}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            báo cáo
          </a>{" "}
          cho chúng tôi.
        </p>
      </div>
    </div>
  );
}
