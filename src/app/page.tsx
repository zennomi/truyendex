import TopNav from "../components/home/topNav";
import Image from "next/image";
import Link from "next/link";
import routes from "../routes";
import Iconify from "../components/iconify";

import LaptopIllustration from "../assets/images/laptop.png"
import MangaDexHomepage from "../assets/images/mangadex-homepage.png"

export default function Home() {
  return (
    <div className=" text-base text-black dark:text-white dark:bg-slate-900">
      <TopNav />
      <section className="relative table w-full py-36 lg:py-44 overflow-hidden z-1">
        <div className="container">
          <div className="relative grid md:grid-cols-12 grid-cols-1 items-center mt-10 gap-[30px]">
            <div className="md:col-span-7">
              <div className="md:mr-6">
                <h4 className="font-bold lg:leading-normal leading-normal text-4xl lg:text-5xl mb-5 text-black dark:text-white relative">
                  Fast and clean help <br />{" "}
                  <span className="after:absolute after:right-0 after:left-0 after:bottom-3 after:lg:h-3 after:h-2 after:w-auto after:rounded-md after:bg-indigo-600/30 relative text-indigo-600">
                    NetTrom
                  </span>{" "}
                  your work
                </h4>
                <p className="text-slate-400 text-lg max-w-xl">
                  Launch your campaign and benefit from our expertise on designing
                  and managing conversion centered Tailwind CSS v3.x html page.
                </p>
                <div className="relative mt-8">
                  <Link
                    href={routes.nettrom.index}
                    className="btn bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md mr-2"
                  >
                    Đọc Trộm
                  </Link>
                  <a
                    href="https://github.com/zennomi/truyendex"
                    target="_blank"
                    data-id="yba7hPeTSjk"
                    className="btn btn-icon bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-full lightbox"
                  >
                    <Iconify icon="eva:github-outline" className="text-lg" />
                  </a>
                  <small className="text-sm font-semibold uppercase align-middle ml-2">
                    Source Code
                  </small>
                </div>
              </div>
            </div>
            {/*end col*/}
            <div className="md:col-span-5">
              <div className="relative after:content-[''] after:absolute after:md:bottom-12 after:-bottom-20 after:lg:-left-0 after:md:-left-20 after:-left-24 after:bg-indigo-600 after:shadow-2xl after:shadow-indigo-600/40 after:-z-1 after:rotate-[130deg] after:w-[75rem] after:md:h-[55rem] after:h-[30rem] after:rounded-[20rem]">
                <Image
                  src={LaptopIllustration}
                  className="lg:max-w-none md:max-w-md"
                  alt=""
                />
              </div>
            </div>
            {/*end col*/}
            <div className="overflow-hidden after:content-[''] after:absolute after:h-32 after:w-32 after:bg-indigo-600/5 after:top-16 after:left-0 after:-z-1 after:rounded-3xl after:animate-[spin_10s_linear_infinite]" />
          </div>
          {/*end grid*/}
        </div>
        {/*end container*/}
      </section>
      <section
        className="relative md:py-24 py-16 bg-gray-50 dark:bg-slate-800"
        id="features"
      >
        <div className="container lg mx-auto">
          <div className="grid grid-cols-1 pb-8 text-center">
            <h3 className="mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold">
              Features
            </h3>
            <p className="text-slate-400 max-w-xl mx-auto">
              Start working with Tailwind CSS that can provide everything you need to
              generate awareness, drive traffic, connect.
            </p>
          </div>
          {/*end grid*/}
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-4 gap-[30px]">
            {/* Content */}
            <div className="group relative lg:px-6 mt-4 transition duration-500 ease-in-out rounded-xl overflow-hidden text-center">
              <div className="relative overflow-hidden text-transparent -m-3">
                <Iconify icon="tabler:hexagon-filled" className="h-28 w-28 text-indigo-600/5 mx-auto rotate-[30deg]" />
                <div className="absolute top-2/4 -translate-y-2/4 left-0 right-0 mx-auto text-indigo-600 rounded-xl transition duration-500 ease-in-out text-3xl flex align-middle justify-center items-center">
                  <Iconify icon="uil:adjust-circle" />
                </div>
              </div>
              <div className="mt-6">
                <a
                  href=""
                  className="text-xl font-medium hover:text-indigo-600 duration-500 ease-in-out"
                >
                  Grow Your Business
                </a>
                <p className="text-slate-400 transition duration-500 ease-in-out mt-3">
                  If the distribution of letters and 'words' is random, the reader
                  will not be distracted from making.
                </p>
              </div>
            </div>
            {/* Content */}
            {/* Content */}
            <div className="group relative lg:px-6 mt-4 transition duration-500 ease-in-out rounded-xl overflow-hidden text-center">
              <div className="relative overflow-hidden text-transparent -m-3">
                <Iconify icon="tabler:hexagon-filled" className="h-28 w-28 text-indigo-600/5 mx-auto rotate-[30deg]" />
                <div className="absolute top-2/4 -translate-y-2/4 left-0 right-0 mx-auto text-indigo-600 rounded-xl transition duration-500 ease-in-out text-3xl flex align-middle justify-center items-center">
                  <Iconify icon="uil:circuit" />
                </div>
              </div>
              <div className="mt-6">
                <a
                  href=""
                  className="text-xl font-medium hover:text-indigo-600 duration-500 ease-in-out"
                >
                  Drive More Sales
                </a>
                <p className="text-slate-400 transition duration-500 ease-in-out mt-3">
                  If the distribution of letters and 'words' is random, the reader
                  will not be distracted from making.
                </p>
              </div>
            </div>
            {/* Content */}
            {/* Content */}
            <div className="group relative lg:px-6 mt-4 transition duration-500 ease-in-out rounded-xl overflow-hidden text-center">
              <div className="relative overflow-hidden text-transparent -m-3">
                <Iconify icon="tabler:hexagon-filled" className="h-28 w-28 text-indigo-600/5 mx-auto rotate-[30deg]" />
                <div className="absolute top-2/4 -translate-y-2/4 left-0 right-0 mx-auto text-indigo-600 rounded-xl transition duration-500 ease-in-out text-3xl flex align-middle justify-center items-center">
                  <Iconify icon="uil:fire" />
                </div>
              </div>
              <div className="mt-6">
                <a
                  href=""
                  className="text-xl font-medium hover:text-indigo-600 duration-500 ease-in-out"
                >
                  Handled By Expert
                </a>
                <p className="text-slate-400 transition duration-500 ease-in-out mt-3">
                  If the distribution of letters and 'words' is random, the reader
                  will not be distracted from making.
                </p>
              </div>
            </div>
            {/* Content */}
          </div>
          {/*end grid*/}
        </div>
        {/*end container*/}
        <div className="container md:mt-24 mt-16">
          <div className="grid md:grid-cols-2 grid-cols-1 items-center mt-16 gap-[30px]">
            <div className="relative">
              <div className="md:mr-10">
                <Image
                  src={MangaDexHomepage}
                  className="rounded-lg shadow-md dark:shadow-gray-800"
                  alt=""
                />
              </div>
              <div className="absolute -bottom-10 right-0 p-6 rounded-lg shadow-md dark:shadow-gray-800 bg-white dark:bg-slate-900 md:w-80 w-60">
                <h5 className="text-lg font-semibold mb-3">Helpcenter Software</h5>
                <p className="text-slate-400">
                  If the distribution of letters and 'words' is random
                </p>
                <div className="flex justify-between mt-3 mb-2">
                  <span className="text-slate-400">Work in progress</span>
                  <span className="text-slate-400">84%</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-[6px]">
                  <div
                    className="bg-indigo-600 h-[6px] rounded-full"
                    style={{ width: "84%" }}
                  />
                </div>
              </div>
            </div>
            <div className="lg:ml-8 mt-8 md:mt-0">
              <h4 className="mb-4 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold">
                Manage all your tasks <br /> on this one plateform
              </h4>
              <p className="text-slate-400">
                Due to its widespread use as filler text for layouts, non-readability
                is of great importance: human perception is tuned to recognize certain
                patterns and repetitions in texts. If the distribution of letters
                visual impact.
              </p>
              <div className="mt-4">
                <a
                  href="page-aboutus.html"
                  className="btn btn-link text-indigo-600 hover:text-indigo-600 after:bg-indigo-600 duration-500 ease-in-out"
                >
                  Find Out More <i className="uil uil-angle-right-b align-middle" />
                </a>
              </div>
            </div>
          </div>
          {/*end grid*/}
        </div>
        {/*end container*/}
        <div className="container md:mt-24 mt-16">
          <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-[30px]">
            <div className="relative order-1 md:order-2">
              <img
                src="assets/images/saas/classic03.png"
                className="rounded-lg shadow-md dark:shadow-gray-800"
                alt=""
              />
            </div>
            <div className="lg:mr-8 order-2 md:order-1">
              <h4 className="mb-4 text-2xl leading-normal font-medium">
                Get Notified About Importent Email
              </h4>
              <p className="text-slate-400">
                Due to its widespread use as filler text for layouts, non-readability
                is of great importance: human perception is tuned to recognize certain
                patterns and repetitions in texts. If the distribution of letters
                visual impact.
              </p>
              <ul className="list-none text-slate-400 mt-4">
                <li className="mb-1 flex">
                  <i className="uil uil-check-circle text-indigo-600 text-xl mr-2" />{" "}
                  Digital Marketing Solutions for Tomorrow
                </li>
                <li className="mb-1 flex">
                  <i className="uil uil-check-circle text-indigo-600 text-xl mr-2" />{" "}
                  Our Talented &amp; Experienced Marketing Agency
                </li>
                <li className="mb-1 flex">
                  <i className="uil uil-check-circle text-indigo-600 text-xl mr-2" />{" "}
                  Create your own skin to match your brand
                </li>
              </ul>
              <div className="mt-4">
                <a
                  href="page-aboutus.html"
                  className="btn btn-link text-indigo-600 hover:text-indigo-600 after:bg-indigo-600 duration-500 ease-in-out"
                >
                  Find Out More <i className="uil uil-angle-right-b align-middle" />
                </a>
              </div>
            </div>
          </div>
        </div>
        {/*end container*/}
      </section>
    </div>
  )
}
