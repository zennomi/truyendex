import Link from "next/link";

import Iconify from "@/components/iconify";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="font-nunito text-base text-black dark:bg-slate-900 dark:text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-600/[0.02]" />
        <div className="container-fluid relative">
          <div className="items-center md:flex">
            <div className="md:w-1/2 lg:w-1/3 xl:w-[30%]">
              <div className="relative z-1 flex-col justify-center bg-white px-4 py-10 shadow md:flex md:min-h-screen md:px-10 dark:bg-slate-900 dark:shadow-gray-700">
                <div className="text-center">
                  <Link href="/">
                    <img
                      src={"/images/logo.png"}
                      className="mx-auto"
                      alt="truyendex logo"
                    />
                  </Link>
                </div>
                <div className="relative mt-2 block rounded-md border border-indigo-600/10 bg-indigo-600/10 px-4 py-2 font-medium text-indigo-600">
                  <Iconify
                    icon="uil:exclamation-circle"
                    className="me-1 inline"
                  />{" "}
                  Chức năng đăng nhập chưa được triển khai chính thức
                </div>
                <div className="title-heading my-20 text-center md:my-auto">
                  {children}
                </div>
                <div className="text-center">
                  <p className="mb-0 text-slate-400">© TruyenDex</p>
                </div>
              </div>
            </div>
            <div className="mx-6 my-20 flex justify-center md:my-auto md:w-1/2 lg:w-2/3 xl:w-[70%]">
              <div>
                <div className="relative">
                  <div className="absolute start-20 top-20 size-[1200px] rounded-full bg-indigo-600/[0.02]" />
                  <div className="absolute -end-20 bottom-20 size-[600px] rounded-full bg-indigo-600/[0.02]" />
                </div>
                <div className="text-center">
                  <div>
                    <img
                      src="/images/illustrations/contact.svg"
                      className="mx-auto max-w-xl"
                      alt=""
                    />
                    <div className="relative mx-auto max-w-xl text-start">
                      <div className="relative rounded-[30px] border-2 border-indigo-600 p-8 before:absolute before:-bottom-1 before:start-16 before:z-2 before:w-28 before:border-[6px] before:border-white before:content-[''] after:absolute after:-bottom-[80px] after:start-[60px] after:z-3 after:h-20 after:w-20 after:rounded-none after:rounded-e-[50px] after:border-2 after:border-b-0 after:border-s-0 after:border-indigo-600 after:content-[''] dark:before:border-slate-900">
                        <span className="font-semibold leading-normal">
                          Chức năng đăng nhập đang trong giai đoạn phát triển và
                          thử nghiệm. Sẽ sớm ra mắt trong tháng này (hoặc tháng
                          sau)...
                        </span>
                        <div className="absolute -top-0 start-4 -z-1 text-8xl text-indigo-600/10 dark:text-indigo-600/20">
                          <Iconify icon="mdi:format-quote-open" />
                        </div>
                      </div>
                      <div className="ms-44 mt-6 text-lg font-semibold">
                        - TruyenDex
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
