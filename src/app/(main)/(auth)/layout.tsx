import Image from "next/image";
import Link from "next/link";

import Iconify from "@/components/iconify";
import TruyenDexLogo from "@/assets/truyendex-logo.png";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="font-nunito text-base text-black dark:text-white dark:bg-slate-900">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-600/[0.02]" />
        <div className="container-fluid relative">
          <div className="md:flex items-center">
            <div className="xl:w-[30%] lg:w-1/3 md:w-1/2">
              <div className="relative md:flex flex-col md:min-h-screen justify-center bg-white dark:bg-slate-900 shadow dark:shadow-gray-700 md:px-10 py-10 px-4 z-1">
                <div className="text-center">
                  <Link href="/">
                    <Image
                      src={TruyenDexLogo}
                      className="mx-auto"
                      alt="truyendex logo"
                    />
                  </Link>
                </div>
                <div className="title-heading text-center md:my-auto my-20">
                  {children}
                </div>
                <div className="text-center">
                  <p className="mb-0 text-slate-400">© TruyenDex</p>
                </div>
              </div>
            </div>
            <div className="xl:w-[70%] lg:w-2/3 md:w-1/2 flex justify-center mx-6 md:my-auto my-20">
              <div>
                <div className="relative">
                  <div className="absolute top-20 start-20 bg-indigo-600/[0.02] size-[1200px] rounded-full" />
                  <div className="absolute bottom-20 -end-20 bg-indigo-600/[0.02] size-[600px] rounded-full" />
                </div>
                <div className="text-center">
                  <div>
                    <Image
                      src="/images/illustrations/contact.svg"
                      className="max-w-xl mx-auto"
                      alt=""
                    />
                    <div className="relative max-w-xl mx-auto text-start">
                      <div className="relative p-8 border-2 border-indigo-600 rounded-[30px] before:content-[''] before:absolute before:w-28 before:border-[6px] before:border-white dark:before:border-slate-900 before:-bottom-1 before:start-16 before:z-2 after:content-[''] after:absolute after:border-2 after:border-indigo-600 after:rounded-none after:rounded-e-[50px] after:w-20 after:h-20 after:-bottom-[80px] after:start-[60px] after:z-3 after:border-s-0 after:border-b-0">
                        <span className="font-semibold leading-normal">
                          Launch your campaign and benefit from our expertise on
                          designing and managing conversion centered latest
                          Tailwind CSS html page.
                        </span>
                        <div className="absolute text-8xl -top-0 start-4 text-indigo-600/10 dark:text-indigo-600/20 -z-1">
                          <Iconify icon="mdi:format-quote-open" />
                        </div>
                      </div>
                      <div className="text-lg font-semibold mt-6 ms-44">
                        - Techwind
                      </div>
                    </div>
                    {/* <p class="text-slate-400 max-w-xl mx-auto">Start working with Tailwind CSS that can provide everything you need to generate awareness, drive traffic, connect. Dummy text is text that is used in the publishing industry or by web designers to occupy the space which will later be filled with 'real' content.</p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*end container*/}
      </section>
    </div>
  );
}
