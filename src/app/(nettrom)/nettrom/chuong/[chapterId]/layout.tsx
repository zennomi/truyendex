import { Metadata, ResolvingMetadata } from "next";
import { ChapterContextProvider } from "@/contexts/chapter";
import { MangadexApi } from "@/api";
import { Constants } from "@/constants";
import { Utils } from "@/utils";
import { ExtendChapter, ExtendManga } from "@/types/mangadex";

export async function generateMetadata(
  { params }: { params: { chapterId: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const id = params.chapterId;

  const previousImages = (await parent).openGraph?.images || [];
  const mdImage = {
    url: `https://og.mangadex.org/og-image/chapter/${id}`,
    width: 1200,
    height: 630,
  };
  try {
    const {
      data: { data: chapter },
    } = await MangadexApi.Chapter.getChapterId(id, { includes: ["manga"] });
    const mangaTitle = Utils.Mangadex.getMangaTitle(
      Utils.Mangadex.extractRelationship(
        chapter.relationships,
        "manga",
      ) as unknown as ExtendManga,
    );
    return {
      title: `Đọc chương ${Utils.Mangadex.getChapterTitle(chapter)} - ${mangaTitle} tại ${Constants.APP_NAME}`,
      openGraph: {
        images: [mdImage, ...previousImages],
      },
      twitter: {
        images: [mdImage, ...previousImages],
      },
    };
  } catch (error) {
    console.error(error);
  }

  return {
    title: `Đọc chương mới nhất tại ${Constants.APP_NAME}`,
    openGraph: {
      images: [mdImage, ...previousImages],
    },
    twitter: {
      images: [mdImage, ...previousImages],
    },
  };
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { chapterId: string };
}) {
  const {
    data: { data: chapter },
  } = await MangadexApi.Chapter.getChapterId(params.chapterId, {
    includes: ["manga"],
  });
  const extenedChapter = Utils.Mangadex.extendRelationship(
    chapter,
  ) as ExtendChapter;
  return (
    <ChapterContextProvider prefectchedChapter={extenedChapter}>
      <div className="row">
        <div className="full-width col-sm-12">{children}</div>
      </div>
    </ChapterContextProvider>
  );
}
