"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Button } from "../Button";
import { MangadexApi } from "@/api";
import { toast } from "react-toastify";
import { Constants } from "@/constants";
import Iconify from "@/components/iconify";

export default function FirstChapterButton({ mangaId }: { mangaId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const readFirstChapter = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await MangadexApi.Manga.getMangaIdAggregate(mangaId, {
        translatedLanguage: ["vi"],
      });
      const firstChapterId = Object.values(
        Object.values(data.volumes)[0].chapters,
      )[0].id;
      setLoading(false);
      router.push(Constants.Routes.nettrom.chapter(firstChapterId));
    } catch {
      toast("Manga này không có chương đầu", { type: "error" });
    }
  }, [mangaId]);
  return (
    <Button
      onClick={readFirstChapter}
      className="w-full sm:w-auto"
      icon={
        loading ? <Iconify icon="uil:spinner" /> : <Iconify icon="fa:eye" />
      }
      disabled={loading}
    >
      Đọc ngay
    </Button>
  );
}
