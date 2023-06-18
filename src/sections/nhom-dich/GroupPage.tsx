"use client"

import { useParams } from "next/navigation"
import PhotoAlbum from "react-photo-album";
import useSearchManga from "../../hooks/useSearchManga"
import { Includes } from "../../api/static"
import { useEffect } from "react"
import { useMangadex } from "../../contexts/mangadex"
import getCoverArt from "../../utils/getCoverArt";
import useScanlationGroup from "../../hooks/useScanlationGroup";
import Iconify from "../../components/iconify";
import Link from "next/link";

export default function GroupPage() {
    const params = useParams()
    const groupId = params.groupId

    const { addMangas } = useMangadex()

    const { data: group, isLoading, error } = useScanlationGroup(groupId)
    const { mangaList } = useSearchManga({
        group: groupId,
        includes: [Includes.COVER_ART]
    })

    useEffect(() => {
        if (mangaList.length > 0)
            addMangas(mangaList)
    }, [mangaList])

    return (
        <>
            <section className="relative md:py-52 py-36 items-center overflow-hidden bg-gradient-to-br to-orange-600/20 via-fuchsia-600/20 from-indigo-600/20">
                <div className="absolute w-1/2 h-full inset-0 top-[74px] left-2/3 rotate-12">
                    {/* <PhotoAlbum 
                        layout="masonry" 
                        photos={mangaList.map(manga => ({ src: getCoverArt(manga), width: 256, height: 364 }))} 
                        
                        /> */}
                    <div className="h-[100vh] flex flex-col flex-wrap items-baseline gap-2">
                        {
                            mangaList.map(manga => (
                                <img key={manga.id} src={getCoverArt(manga)} className="rounded md:rounded-lg" />
                            ))
                        }
                    </div>
                </div>
                <div className="container">
                    <div className="grid grid-cols-1 items-center mt-10 w-full md:w-1/2">
                        <h4 className="font-bold lg:leading-normal leading-normal text-4xl lg:text-5xl mb-5 text-black dark:text-white">
                            {group?.attributes.name}
                        </h4>
                        <p className="text-lg max-w-xl">
                            {group?.attributes.description}
                        </p>

                        <div className="mt-8 flex items-center gap-2 flex-wrap">
                            {
                                group?.attributes.website &&
                                <a
                                    href={group.attributes.website}
                                    target="_blank"
                                    className="btn bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md flex gap-x-1 items-center w-fit"
                                >
                                    <Iconify icon="mdi:web" />
                                    Website
                                </a>
                            }
                        </div>

                    </div>
                    {/*end grid*/}
                </div>
                {/*end container*/}
            </section>
            {
                group &&
                <section className="relative md:py-24 py-16">
                    <div className="container">
                        <div className="grid grid-cols-1 pb-8 text-center">
                            <h3 className="md:text-3xl text-2xl md:leading-normal leading-normal font-semibold">
                                Liên hệ
                            </h3>
                        </div>
                        <div className="flex justify-around items-center gap-[30px] mt-8">
                            {
                                group.attributes.website &&
                                <a className="w-full max-w-[25%]" target="_blank" href={group.attributes.website}>
                                    <div className="flex transition-all duration-500 hover:scale-105 shadow dark:shadow-gray-800 hover:shadow-md dark:hover:shadow-gray-700 ease-in-out items-center p-3 rounded-md bg-white dark:bg-slate-900">
                                        <div className="flex items-center justify-center h-[45px] min-w-[45px] bg-gradient-to-r from-transparent to-indigo-600/10 text-indigo-600 text-center rounded-full mr-3">
                                            <Iconify className="w-[24px] h-[24px]" icon={group.attributes.website.includes("facebook") ? "mingcute:facebook-line" : "mdi:web"} />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="mb-0 text-lg font-medium">Website</h4>
                                        </div>
                                    </div>
                                </a>
                            }
                            {
                                group.attributes.discord &&
                                <a className="w-full max-w-[25%]" target="_blank" href={`https://discord.gg/${group.attributes.discord}`}>
                                    <div className="flex transition-all duration-500 hover:scale-105 shadow dark:shadow-gray-800 hover:shadow-md dark:hover:shadow-gray-700 ease-in-out items-center p-3 rounded-md bg-white dark:bg-slate-900">
                                        <div className="flex items-center justify-center h-[45px] min-w-[45px] bg-gradient-to-r from-transparent to-indigo-600/10 text-indigo-600 text-center rounded-full mr-3">
                                            <Iconify className="w-[24px] h-[24px]" icon="teenyicons:discord-outline" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="mb-0 text-lg font-medium">Discord</h4>
                                        </div>
                                    </div>
                                </a>
                            }
                        </div>
                    </div>
                </section>
            }
        </>
    )
}