import { Metadata, ResolvingMetadata } from "next";
import { MangadexApi } from "@/api";
import { Utils } from "@/utils";
import { Constants } from "@/constants";

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
      title: `${Utils.Mangadex.getMangaTitle(manga)} - Đọc ngay tại ${Constants.APP_NAME}`,
      description: Utils.Mangadex.transLocalizedStr(
        manga.attributes.description,
      ),
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
