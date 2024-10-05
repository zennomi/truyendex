import config from "@/config"
import { ChapterContextProvider } from "../../../../../contexts/chapter"
import { Metadata, ResolvingMetadata } from "next"
import { Chapter } from "@/api"
import getTitleChapter from "@/utils/getTitleChapter"

export async function generateMetadata(
    { params }: { params: { chapterId: string } },
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const id = params.chapterId

    const previousImages = (await parent).openGraph?.images || []
    const imageUrl = `https://og.mangadex.org/og-image/chapter/${id}`
    try {
        const { data: { data: chapter } } = await Chapter.getChapterId(id)
        return {
            title: `Đọc chương ${getTitleChapter(chapter)} tại ${config.appName}`,
            openGraph: {
                images: [{ url: imageUrl, ...previousImages }],
            },
            twitter: {
                images: [{ url: imageUrl, ...previousImages }]
            }
        }
    } catch (error) {
        console.error(error)
    }

    return {
        title: `Đọc chương mới nhất tại ${config.appName}`,
        openGraph: {
            images: [{ url: imageUrl, ...previousImages }],
        },
        twitter: {
            images: [{ url: imageUrl, ...previousImages }]
        }
    }
}

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ChapterContextProvider>
            <div className="row">
                <div className="full-width col-sm-12">
                    {children}
                </div>
            </div>
        </ChapterContextProvider>
    )
}
