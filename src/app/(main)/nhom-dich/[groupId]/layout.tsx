import { Group } from "@/api"
import config from "@/config"
import { Metadata, ResolvingMetadata } from "next"

export async function generateMetadata(
    { params }: { params: { groupId: string } },
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const id = params.groupId

    const previousImages = (await parent).openGraph?.images || []
    const mdImage = { url: `https://og.mangadex.org/og-image/group/${id}`, width: 1200, height: 630 }
    try {
        // fetch data
        const { data: { data: group } } = await Group.getGroupId(id)

        return {
            title: `Nhóm dịch ${group.attributes.name} - Đọc ngay tại ${config.appName}`,
            description: `${group.attributes.description}`,
            openGraph: {
                images: [mdImage],
            },
            twitter: {
                images: [mdImage]
            }
        }
    } catch (error) {
        console.error(error)
    }
    // optionally access and extend (rather than replace) parent metadata

    return {
        title: "Đọc ngay tại NetTrom",
        description: "NetTrom - Website Trộm Truyện Văn Minh",
        openGraph: {
            images: [...previousImages],
        },
    }
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode,

}) {
    return (
        <div className="text-base text-black dark:text-white dark:bg-slate-900">
            {children}
        </div>
    )
}
