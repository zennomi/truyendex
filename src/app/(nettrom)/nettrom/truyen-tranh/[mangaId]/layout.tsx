import { Metadata, ResolvingMetadata } from "next";
import config from "@/config";
import { MangadexApi } from "@/api";
import { getMangaTitle, transLocalizedStr } from "@/utils/mangadex";

export async function generateMetadata(
  { params }: { params: { mangaId: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const id = params.mangaId;

  const previousImages = (await parent).openGraph?.images || [];
  const mdImage = {
    url: `https://og.mangadex.org/og-image/manga/${id}`,
    width: 1200,
    height: 630,
  };
  try {
    // fetch data
    const {
      data: { data: manga },
    } = await MangadexApi.Manga.getMangaId(id);
    return {
      title: `${getMangaTitle(manga)} - Đọc ngay tại ${config.appName}`,
      description: transLocalizedStr(manga.attributes.description),
      openGraph: {
        images: [mdImage],
      },
      twitter: {
        images: [mdImage],
      },
    };
  } catch {}
  // optionally access and extend (rather than replace) parent metadata

  return {
    title: "Đọc ngay tại NetTrom",
    description: "NetTrom - Website Trộm Truyện Văn Minh",
    openGraph: {
      images: [mdImage, ...previousImages],
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="">{children}</div>;
}
