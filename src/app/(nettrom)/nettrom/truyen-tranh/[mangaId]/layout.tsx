import { Metadata, ResolvingMetadata } from 'next'
import { ExtendManga } from '@/api/extend'
import { getMangaTitle } from '@/utils/getMangaTitle'
import transLocalizedStr from '@/utils/transLocalizedStr'
import config from '@/config'

export async function generateMetadata(
    { params }: { params: { mangaId: string } },
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const id = params.mangaId

    const previousImages = (await parent).openGraph?.images || []
    const mdImage = { url: `https://og.mangadex.org/og-image/manga/${id}`, width: 1200, height: 630 }
    try {
        // fetch data
        const { data: manga }: { data: ExtendManga } = await fetch(`https://api.mangadex.org/manga/${id}`).then((res) => res.json())
        return {
            title: `${getMangaTitle(manga)} - Đọc ngay tại ${config.appName}`,
            description: transLocalizedStr(manga.attributes.description),
            openGraph: {
                images: [mdImage],
            },
            twitter: {
                images: [mdImage]
            }
        }
    } catch (error) {

    }
    // optionally access and extend (rather than replace) parent metadata

    return {
        title: "Đọc ngay tại NetTrom",
        description: "NetTrom - Website Trộm Truyện Văn Minh",
        openGraph: {
            images: [mdImage, ...previousImages],
        },
    }
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode,

}) {
    return (
        <div className="">
            {children}
        </div>
    )
}
