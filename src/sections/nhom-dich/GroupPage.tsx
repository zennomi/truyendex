"use client"

import { useParams } from "next/navigation"
import PhotoAlbum from "react-photo-album";
import useSearchManga from "../../hooks/useSearchManga"
import { Includes } from "../../api/static"
import { useEffect } from "react"
import { useMangadex } from "../../contexts/mangadex"
import getCoverArt from "../../utils/getCoverArt";

export default function GroupPage() {
    const params = useParams()
    const groupId = params.groupId

    const { addMangas } = useMangadex()

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
                            
                        </h4>
                        <p className="text-lg max-w-xl">
                            We are a huge marketplace dedicated to connecting great artists of all
                            Techwind with their fans and unique token collectors!
                        </p>
                        <div className="mt-8">
                            <a
                                href=""
                                className="btn bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md"
                            >
                                Discover
                            </a>
                        </div>
                    </div>
                    {/*end grid*/}
                </div>
                {/*end container*/}
            </section>
        </>
    )
}