import Link from "next/link"
import Iconify from "@/components/iconify"
import routes from "@/routes"
import { ExtendManga } from "@/types/mangadex"
import { extendRelationship, getMangaTitle, getCoverArt } from "@/utils/mangadex"

export default function LastUpdatedTitles({ mangas }: { mangas: ExtendManga[] }) {

    return (
        <section className="relative md:py-24 py-16">
            <div className="container">
                <div className="grid md:grid-cols-12 grid-cols-1 items-center">
                    <div className="lg:col-span-8 md:col-span-6 md:text-start text-center">
                        <h3 className="text-2xl leading-normal font-semibold">Chương mới cập nhật</h3>
                    </div>

                    <div className="lg:col-span-4 md:col-span-6 md:text-end hidden md:block">
                        <Link href={routes.nettrom.index} className="relative inline-block font-semibold tracking-wide align-middle text-base text-center border-none after:content-[''] after:absolute after:h-px after:w-0 hover:after:w-full after:end-0 hover:after:end-auto after:bottom-0 after:start-0 after:duration-500 text-slate-400 hover:text-indigo-600 after:bg-indigo-600 duration-500 ease-in-out">
                            Xem thêm <Iconify icon="uil:arrow-right" className="inline" />
                        </Link>
                    </div>
                </div>
                <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 mt-8 gap-[30px]">
                    {
                        mangas.map(manga => {
                            const extended = extendRelationship(manga) as ExtendManga
                            const title = getMangaTitle(manga)
                            return (
                                <div className="group" key={extended.id}>
                                    <div className="relative overflow-hidden shadow dark:shadow-gray-800 group-hover:shadow-lg group-hover:dark:shadow-gray-800 rounded-md duration-500">
                                        <img src={getCoverArt(extended)} alt={title} />

                                        <div className="absolute -bottom-20 group-hover:bottom-3 start-3 end-3 duration-500">
                                            <Link href={routes.nettrom.manga(extended.id)} className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-slate-900 border-slate-900 text-white w-full rounded-md">Đọc</Link>
                                        </div>

                                        {
                                            extended.attributes.publicationDemographic &&
                                            <ul className="list-none absolute top-[10px] start-4">
                                                <li><span className="bg-orange-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded h-5">{extended.attributes.publicationDemographic.toUpperCase()}</span></li>
                                            </ul>
                                        }
                                    </div>

                                    <div className="mt-4">
                                        <Link href={routes.nettrom.manga(extended.id)} className="hover:text-indigo-600 md:text-lg text-sm font-semibold">{title}</Link>
                                        <div className="flex justify-between items-center mt-1">
                                            {/* <p className="text-green-600">{extended.attributes.originalLanguage} <del className="text-red-600">$21.00</del></p> */}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}