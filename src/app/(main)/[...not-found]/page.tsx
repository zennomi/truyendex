import Link from 'next/link'
import Image from 'next/image'

import TruyenDexLogo from '@/assets/truyendex-logo.png'
import routes from '@/routes'
import Iconify from '@/components/iconify'

export default function NotFound() {
    return (
        <div className="font-nunito text-base text-black dark:text-white dark:bg-slate-900">
            <section className="relative bg-indigo-600/5">
                <div className="container-fluid relative">
                    <div className="grid grid-cols-1">
                        <div className="flex flex-col min-h-screen justify-center md:px-10 py-10 px-4">
                            <div className="text-center">
                                <Link href="/">
                                    <Image
                                        src={TruyenDexLogo}
                                        className="mx-auto"
                                        alt="ruyendex logo"
                                        height={64}
                                    />
                                </Link>
                            </div>
                            <div className="title-heading text-center my-auto">
                                <Iconify className='mx-auto' width={200} icon="hugeicons:file-not-found" />
                                <h1 className="mt-3 mb-6 md:text-5xl text-3xl font-bold">
                                    4 lẻ 4 nót phao
                                </h1>
                                <p className="text-slate-400">
                                    Trang bạn đang truy cập không tồn tại
                                </p>
                                <div className="mt-4">
                                    <Link
                                        href="/"
                                        className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md"
                                    >
                                        Trở về trang chủ
                                    </Link>
                                </div>
                            </div>
                            <div className="text-center">
                                <p className="mb-0 text-slate-400">
                                    Hoặc bạn có thể báo lỗi{" "}
                                    <a
                                        href={routes.report}
                                        target="_blank"
                                        className="text-reset"
                                    >
                                        tại đây
                                    </a>
                                    .
                                </p>
                            </div>
                        </div>
                    </div>
                    {/*end grid*/}
                </div>
                {/*end container*/}
            </section>
            {/*end section*/}
            {/* End */}
            <div className="fixed bottom-3 end-3">
                <a
                    href=""
                    className="back-button size-9 inline-flex items-center justify-center tracking-wide border align-middle duration-500 text-base text-center bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-full"
                >
                    <i data-feather="arrow-left" className="size-4" />
                </a>
            </div>

        </div>
    )
}